/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import "./QuantityFormat.scss";
import * as React from "react";
import { DeepCompare } from "@itwin/core-geometry";
import type { FormatDefinition, FormatProps } from "@itwin/core-quantity";
import { QuantityFormatPanelV2 } from "@itwin/imodel-components-react";
import { UiFramework } from "../../UiFramework.js";
import { Button, Dialog, List, ListItem } from "@itwin/itwinui-react";
import { SvgMeasure } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../../hooks/useTranslation.js";
import type { SettingsTabEntry } from "../SettingsManager.js";
import type { FormatSet } from "@itwin/ecschema-metadata";
import { FormatSetSelector } from "./FormatSetSelector.js";

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
    (formatSetToUpdate: FormatSet, formatDefinition: FormatDefinition) => {
      formatSetToUpdate.formats[formatDefinition.name ?? "temp"] =
        formatDefinition;
      // TODO: Figure out if want to call a passed in updateFormatSet() props function... If we do, then update deps of other react callbacks to include updateFormatSet.
    },
    []
  );

  const processListboxValueChange = React.useCallback(
    (newFormatDefinition: FormatDefinition) => {
      setActiveFormatDefinition(newFormatDefinition);
      setSaveEnabled(false);
    },
    []
  );

  const onListItemChange = React.useCallback(
    (newFormatDefinition: FormatDefinition) => {
      // Handle old format definition, and new format definition.
      if (activeFormatSet && activeFormatDefinition) {
        const originalFormatDefinition =
          activeFormatSet.formats[activeFormatDefinition.name ?? "temp"];
        if (
          originalFormatDefinition &&
          !formatAreEqual(originalFormatDefinition, newFormatDefinition)
        ) {
          UiFramework.dialogs.modal.open(
            <SaveFormatModalDialog
              formatDefinition={activeFormatDefinition}
              onDialogCloseArgs={newFormatDefinition}
              onDialogClose={processListboxValueChange}
              onDialogOk={() =>
                updateFormatSet(activeFormatSet, newFormatDefinition)
              }
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      processListboxValueChange(newFormatDefinition);
    },
    [
      activeFormatSet,
      activeFormatDefinition,
      updateFormatSet,
      processListboxValueChange,
    ]
  );

  const onFormatSetChanged = React.useCallback((newFormatSet: FormatSet) => {
    setActiveFormatSet(newFormatSet);
    setActiveFormatDefinition(undefined); // maybe add a clearActiveFormatDefinition method? If we need more handling...
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
    if (activeFormatSet && activeFormatDefinition) {
      updateFormatSet(activeFormatSet, activeFormatDefinition);
      setSaveEnabled(false);
    }
  }, [activeFormatDefinition, activeFormatSet, updateFormatSet]);

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
      <div className="uifw-quantity-types-container">
        <div className="left-panel">
          <List id="uifw-quantity-types-list" className="uifw-quantity-types">
            {activeFormatSet &&
              activeFormatSet.formats &&
              Object.entries(activeFormatSet.formats).map(
                ([key, formatDef]) => (
                  <ListItem
                    key={key}
                    className="quantity-type-list-entry"
                    onClick={() => onListItemChange(formatDef)} // Create a copy of the formatDef to avoid mutating the original.
                    active={activeFormatDefinition?.name === key}
                  >
                    <ListItem.Content className="quantity-type-list-entry">
                      <span className="map-source-list-entry-name">
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
  onDialogCloseArgs,
  onDialogClose,
  onDialogOk,
}: {
  formatDefinition: FormatDefinition;
  onDialogCloseArgs?: any;
  onDialogClose: (args?: any) => void;
  onDialogOk: (args?: any) => void;
}) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose(onDialogCloseArgs);
  }, [onDialogClose, onDialogCloseArgs]);

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
