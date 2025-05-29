/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import "./QuantityFormatV2.scss";
import * as React from "react";
import { DeepCompare } from "@itwin/core-geometry";
import type { FormatDefinition, FormatProps, UnitsProvider } from "@itwin/core-quantity";
import { FormatType } from "@itwin/core-quantity";
import { QuantityFormatPanelV2 } from "@itwin/imodel-components-react";
import { UiFramework } from "../../UiFramework.js";
import { Button, Dialog, LabeledInput, LabeledSelect, LabeledTextarea, List, ListItem } from "@itwin/itwinui-react";
import { SvgMeasure } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../../hooks/useTranslation.js";
import type { SettingsTabEntry } from "../SettingsManager.js";
import type { FormatSet } from "@itwin/ecschema-metadata";
import { FormatSetSelector } from "./FormatSetSelector.js";
import { IModelApp } from "@itwin/core-frontend";

function formatAreEqual(obj1: FormatProps, obj2: FormatProps) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}

/** Options to initialize the settings page that allows users to set Quantity formatting overrides.
 * @beta
 */
export interface QuantityFormatterSettingsOptionsV2 {
  formatSets: FormatSet[];
}

/**
 * Return a SettingsTabEntry that can be used to define the available settings that can be set for an application.
 * @param itemPriority - Used to define the order of the entry in the Settings Stage
 * @param opts - Options to initialize the settings page that allows users to set Quantity formatting overrides.
 * @beta
 */
export function getQuantityFormatsSettingsManagerEntryV2(
  itemPriority: number,
  opts?: Partial<QuantityFormatterSettingsOptionsV2>
): SettingsTabEntry {
  const { formatSets } = { ...opts };
  return {
    itemPriority,
    tabId: "uifw:Quantity",
    label: UiFramework.translate("settings.quantity-formatting.label"),
    subLabel: UiFramework.translate("settings.quantity-formatting.subLabel"),
    page: <QuantityFormatSettingsPageV2 formatSets={formatSets ?? []} />,
    isDisabled: false,
    icon: <SvgMeasure />,
    tooltip: UiFramework.translate("settings.quantity-formatting.tooltip"),
    pageWillHandleCloseRequest: true,
  };
}

/** UI Component shown in settings page to set the active Presentation Unit System and to set format overrides.
 * @beta
 */
export function QuantityFormatSettingsPageV2({
  formatSets,
}: QuantityFormatterSettingsOptionsV2) {
  const { translate } = useTranslation();
  const [activeFormatDefinition, setActiveFormatDefinition] = React.useState<
    FormatDefinition | undefined
  >(undefined);
  const [activeFormatDefinitionKey, setActiveFormatDefinitionKey] =
    React.useState<string | undefined>(undefined);
  const [activeFormatSet, setActiveFormatSet] = React.useState<
    FormatSet | undefined
  >(undefined);
  const [currentFormatSets, setFormatSets] = React.useState<FormatSet[]>(
    formatSets || []
  );
  const [saveEnabled, setSaveEnabled] = React.useState(false);

  // const saveChanges = React.useCallback(
  //   (afterSaveFunction: (args: any) => void, args?: any) => {
  //     if (activeFormatterSpec) {
  //       const formatProps = activeFormatterSpec.format.toJSON();
  //       const formatPropsInUse = IModelApp.quantityFormatter
  //         .findFormatterSpecByQuantityType(activeQuantityType)!
  //         .format.toJSON();
  //       if (
  //         formatPropsInUse &&
  //         !formatAreEqual(formatProps, formatPropsInUse)
  //       ) {
  //         UiFramework.dialogs.modal.open(
  //           <SaveFormatModalDialog
  //             formatProps={formatProps}
  //             quantityType={activeQuantityType}
  //             onDialogCloseArgs={args}
  //             onDialogClose={afterSaveFunction}
  //           />,
  //           "saveQuantityFormat"
  //         );
  //         return;
  //       }
  //     }
  //     afterSaveFunction(args);
  //   },
  //   [activeFormatterSpec, activeQuantityType]
  // );

  const updateFormatSet = React.useCallback(
    (formatSetToUpdate: FormatSet, key: string, formatDefinition: FormatDefinition) => {
      formatSetToUpdate.formats[key] =
        formatDefinition;
      // TODO: Figure out if want to call a passed in updateFormatSet() props function... If we do, then update deps of other react callbacks to include updateFormatSet.
    },
    []
  );

  const processListboxValueChange = React.useCallback(
    (newFormatDefinition: FormatDefinition, key: string) => {
      setActiveFormatDefinition(newFormatDefinition);
      setActiveFormatDefinitionKey(key);
      setSaveEnabled(false);
    },
    []
  );

  const onListItemChange = React.useCallback(
    (newFormatDefinition: FormatDefinition, key: string) => {
      // Handle old format definition, and new format definition.
      if (activeFormatSet && activeFormatDefinition && activeFormatDefinitionKey) {
        const originalFormatDefinition =
          activeFormatSet.formats[activeFormatDefinitionKey];
        if (
          activeFormatDefinitionKey !== key && originalFormatDefinition &&
          !formatAreEqual(originalFormatDefinition, activeFormatDefinition)
        ) {
          UiFramework.dialogs.modal.open(
            <SaveFormatModalDialog
              formatDefinition={activeFormatDefinition}
              onDialogClose={() => processListboxValueChange(newFormatDefinition, key)}
              onDialogOk={() =>{
                updateFormatSet(activeFormatSet, activeFormatDefinitionKey, activeFormatDefinition)
              }
              }
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      processListboxValueChange(newFormatDefinition, key);
    },
    [
      activeFormatSet,
      activeFormatDefinition,
      activeFormatDefinitionKey,
      updateFormatSet,
      processListboxValueChange,
    ]
  );

  const onFormatSetChanged = React.useCallback((newFormatSet: FormatSet) => {
    setActiveFormatSet(newFormatSet);
    setActiveFormatDefinition(undefined); // maybe add a clearActiveFormatDefinition method? If we need more handling...
    setActiveFormatDefinitionKey(undefined);
    setSaveEnabled(false);
  }, []);

  // TODO: Figure out if we can pass in/ specify a persistence unit for current format set. If we can, we can use the preview formatting option.
  const handleOnFormatChanged = React.useCallback(
    async (formatDefinition: FormatDefinition) => {
      setActiveFormatDefinition(formatDefinition);
      setSaveEnabled(true);
    },
    []
  );

  // If a mutable formatsProvider is available, use the addFormats there instead? Or alongside updating the formatSet...
  const handleOnFormatSave = React.useCallback(async () => {
    if (activeFormatSet && activeFormatDefinition && activeFormatDefinitionKey) {
      updateFormatSet(activeFormatSet, activeFormatDefinitionKey, activeFormatDefinition);
      setSaveEnabled(false);
    }
  }, [activeFormatSet, activeFormatDefinition, activeFormatDefinitionKey, updateFormatSet]);

  const handleOnFormatReset = React.useCallback(async () => {
    if (activeFormatDefinition && activeFormatSet) {
      const formatDefName = activeFormatDefinition.name ?? "temp";
      const originalFormatDefinition = activeFormatSet.formats[formatDefName];
      if (originalFormatDefinition) {
        setActiveFormatDefinition(originalFormatDefinition);
        setSaveEnabled(false);
      }
    }
  }, [activeFormatDefinition, activeFormatSet]);

  const addNewFormatSet = React.useCallback((newFormatSet: FormatSet) => {
    setFormatSets((prevSets: FormatSet[]) => {
      return [...prevSets, newFormatSet];
    });
    // TODO: Update existing passed in formatSet prop too?
  }, []);

  const openCreateFormatDialog = React.useCallback(() => {
    if (!activeFormatSet) {
      return;
    }
    UiFramework.dialogs.modal.open(
      <CreateFormatModalDialog
        onDialogOk={updateFormatSet}
        formatSet={activeFormatSet}
        onListItemChange={onListItemChange}
      />
    );
  }, [activeFormatSet, updateFormatSet, onListItemChange]);

  return (
    <div className="quantity-formatting-container">
      <FormatSetSelector
        selectedFormatSet={activeFormatSet}
        availableFormatSets={currentFormatSets}
        onFormatSetChanged={onFormatSetChanged}
        createNewFormatSet={addNewFormatSet}
      />
      <span className="uifw-quantity-format-section-label">
        {translate("settings.quantity-formatting.formatSectionLabel")}
      </span>
      <div className="uifw-quantity-formats-container">
        <div className="left-panel">
          {activeFormatSet && (
            <>
              <Button onClick={openCreateFormatDialog}><span>Add a Format</span></Button>
              <List id="uifw-formats-list" className="uifw-formats-list">
                {activeFormatSet.formats &&
                  Object.entries(activeFormatSet.formats).map(
                    ([key, formatDef]) => (
                      <ListItem
                        actionable
                        key={key}
                        className="format-list-entry"
                        onClick={() => onListItemChange(formatDef, key)} // Create a copy of the formatDef to avoid mutating the original.
                        active={activeFormatDefinitionKey === key}
                      >
                        <ListItem.Content className="format-list-entry-content">
                          <span className="format-list-entry-name">
                            {formatDef.label || key}
                          </span>
                          {formatDef.description && (
                            <ListItem.Description>
                              {formatDef.description}
                            </ListItem.Description>
                          )}
                        </ListItem.Content>
                      </ListItem>
                    )
                  )}
              </List>
            </>
          )}

          {/* TODO: Add a "Add Format" button and functionality */}
        </div>
        <div className="right-panel">
          {activeFormatDefinition && (
            <>
              <div className="uifw-quantity-types-right-top">
                {/* <div className="uifw-quantity-types-right-top-sample">
                  <FormatSample
                    formatSpec={activeFormatterSpec}
                    initialMagnitude={1234.56}
                    hideLabels
                  />
                </div> */}
              </div>
              <div className="uifw-quantity-types-formats">
                <QuantityFormatPanelV2
                  onFormatChange={handleOnFormatChanged}
                  formatDefinition={activeFormatDefinition}
                  initialMagnitude={1234.56}
                />
              </div>
              <div className="components-button-panel">
                <Button
                  styleType="cta"
                  onClick={handleOnFormatSave}
                  disabled={!saveEnabled}
                >
                  {translate("settings.quantity-formatting.setButtonLabel")}
                </Button>
                <Button
                  styleType="default"
                  onClick={handleOnFormatReset}
                  disabled={saveEnabled}
                >
                  {translate("settings.quantity-formatting.clearButtonLabel")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SaveFormatModalDialog({
  formatDefinition,
  onDialogClose,
  onDialogOk,
}: {
  formatDefinition: FormatDefinition;
  onDialogClose: (args?: any) => void;
  onDialogOk: (args?: any) => void;
}) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose();
  }, [onDialogClose]);

  const handleOK = React.useCallback(() => {
    onDialogOk && onDialogOk();
    handleClose();
  }, [onDialogOk, handleClose]);

  const handleCancel = React.useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleCancel}
      className="uifw-settings-quantityFormatting-saveFormatModalDialog"
      closeOnEsc
      closeOnExternalClick
      preventDocumentScroll
    >
      <Dialog.Backdrop />
      <Dialog.Main
        style={{ minWidth: 200, maxWidth: 400, minHeight: 150, maxHeight: 400 }}
      >
        <Dialog.TitleBar titleText={"Save Format Changes"} />
        <Dialog.Content>
          Do you want to save changes to {formatDefinition.label} before
          changing to another?
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType="high-visibility" onClick={handleOK}>
            {translate("dialog.yes")}
          </Button>
          <Button onClick={handleCancel}>{translate("dialog.no")}</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}

function CreateFormatModalDialog({
  onDialogOk,
  formatSet,
  onListItemChange,
}: {
  onDialogOk: (formatSet: FormatSet, key: string, formatDefinition: FormatDefinition) => void;
  formatSet: FormatSet;
  onListItemChange: (formatDefinition: FormatDefinition, key: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState<string| undefined>();
  const [label, setLabel] = React.useState<string | undefined>();
  const [description, setDescription] = React.useState<string | undefined>();
  const [type, setType] = React.useState<FormatType>(FormatType.Decimal);
  const [unitsProvider, setUnitsProvider] = React.useState<UnitsProvider>(IModelApp.quantityFormatter.unitsProvider);

  // TODO: Improve dialog to allow user to select a persistence unit from the unitsProvider, maybe by looking up by phenomenon? maintain a state of phenomenons available?
  React.useEffect(() => {
    const listener = () => {
      setUnitsProvider(IModelApp.quantityFormatter.unitsProvider);
    };
    IModelApp.quantityFormatter.onUnitsProviderChanged.addListener(listener);

    // Cleanup function to remove the listener on unmount
    return () => {
      IModelApp.quantityFormatter.onUnitsProviderChanged.removeListener(listener);
    };
  }, []);

  const handleOk = React.useCallback(() => {
    if (!name || !type) { // Alert user that name is required?
      return;
    }
    const newFormat: FormatDefinition = {
      name,
      label,
      description,
      type
    };
    onDialogOk(formatSet, name, newFormat);
    handleClose();
    onListItemChange(newFormat, name);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [name, label, description, onDialogOk]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
  }, []);
  return (
    <Dialog isOpen={isOpen}>
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText="New Format" />
        <Dialog.Content>
          <LabeledInput
            displayStyle="inline"
            data-testid="format-dialog-name"
            label="Format Name"
            placeholder="Enter Unique Name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            status={name ? "positive" : "negative"}
            value={name}
          />
          <LabeledInput
            displayStyle="inline"
            data-testid="format-dialog-label"
            label="Format Label"
            placeholder="Enter Label"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLabel(event.target.value)}
            value={label}
          />
          <LabeledSelect
            label="Format Type"
            data-testid="format-type-select"
            options={Object.values(FormatType).map((type) => ({
              value: type,
              label: type,
            }))}
            value={type}
            onChange={setType}
            placeholder="Select Format Type"
            required
          />
          <LabeledTextarea
            label="Description"
            message="Optional"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
          />
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button
            data-testid="format-add"
            styleType="high-visibility"
            disabled={!name || !type}
            onClick={handleOk}
          >
            Save
          </Button>
          <Button
            data-testid="format-set-cancel"
            styleType="default"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  )
}
