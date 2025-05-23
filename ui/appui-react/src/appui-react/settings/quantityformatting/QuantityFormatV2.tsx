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
import type { QuantityTypeKey } from "@itwin/core-frontend";
import {
  IModelApp,
} from "@itwin/core-frontend";
import type {
  FormatDefinition,
  FormatProps,
} from "@itwin/core-quantity";
import {
  FormatSample,
  QuantityFormatPanel,
} from "@itwin/imodel-components-react";
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
export interface QuantityFormatterSettingsOptions {
  formatSets: FormatSet[];
}

/**
 * Return a SettingsTabEntry that can be used to define the available settings that can be set for an application.
 * @param itemPriority - Used to define the order of the entry in the Settings Stage
 * @param opts - Options to initialize the settings page that allows users to set Quantity formatting overrides.
 * @beta
 */
export function getQuantityFormatsSettingsManagerEntry(
  itemPriority: number,
  opts?: Partial<QuantityFormatterSettingsOptions>
): SettingsTabEntry {
  const { formatSets } = { ...opts };
  return {
    itemPriority,
    tabId: "uifw:Quantity",
    label: UiFramework.translate("settings.quantity-formatting.label"),
    subLabel: UiFramework.translate("settings.quantity-formatting.subLabel"),
    page: (
      <QuantityFormatSettingsPage
        formatSets={formatSets ?? []}
      />
    ),
    isDisabled: false,
    icon: <SvgMeasure />,
    tooltip: UiFramework.translate("settings.quantity-formatting.tooltip"),
    pageWillHandleCloseRequest: true,
  };
}

/** UI Component shown in settings page to set the active Presentation Unit System and to set format overrides.
 * @beta
 */
export function QuantityFormatSettingsPage({
  formatSets
}: QuantityFormatterSettingsOptions) {
  const { translate } = useTranslation();
  const [activeFormatDefinition, setActiveFormatDefinition] = React.useState<FormatDefinition | undefined>(undefined);
  const [activeFormatSet, setActiveFormatSet] = React.useState<FormatSet | undefined>(undefined);
  const [currentFormatSets, setFormatSets] = React.useState<FormatSet[]>(formatSets || []);
  const [saveEnabled, setSaveEnabled] = React.useState(false);
  const newQuantityTypeRef = React.useRef<QuantityTypeKey>();

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

  const updateFormatSet = React.useCallback((formatSetToUpdate: FormatSet, formatDefinition: FormatDefinition) => {
    formatSetToUpdate.formats[formatDefinition.name ?? "temp"] = formatDefinition;
    // TODO: Figure out if want to call a passed in updateFormatSet() props function... If we do, then update deps of other react callbacks to include updateFormatSet.
  }, []);

  const saveChanges = React.useCallback(
    (afterSaveFunction: (args: any) => void, args?: any) => {
      if (activeFormatDefinition && activeFormatSet) {
        const foundFormat = activeFormatSet.formats[activeFormatDefinition.name ??  ""];

        if (
          foundFormat &&
          !formatAreEqual(foundFormat, activeFormatDefinition)
        ) {
          UiFramework.dialogs.modal.open(
            <SaveFormatModalDialog
              formatDefinition={activeFormatDefinition}
              onDialogCloseArgs={args}
              onDialogClose={afterSaveFunction}
              onDialogOk={() => updateFormatSet(activeFormatSet, activeFormatDefinition)}
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      afterSaveFunction(args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeFormatDefinition, activeFormatSet]
  );

  const processListboxValueChange = React.useCallback(
    (newFormatDefinition: FormatDefinition) => {

      setActiveFormatDefinition(newFormatDefinition);
      setSaveEnabled(false);
      // setClearEnabled(
      //   IModelApp.quantityFormatter.hasActiveOverride(newQuantityType, true)
      // );
    },
    []
  );

  const onListboxValueChange = React.useCallback(
    (newQuantityType: string) => {
      // Handle old format definition, and new format definition.
      if (activeFormatterSpec) {
        const formatProps = activeFormatterSpec.format.toJSON();
        const formatPropsInUse = IModelApp.quantityFormatter
          .findFormatterSpecByQuantityType(activeQuantityType)!
          .format.toJSON();
        if (
          formatPropsInUse &&
          !formatAreEqual(formatProps, formatPropsInUse)
        ) {
          newQuantityTypeRef.current = newQuantityType;
          UiFramework.dialogs.modal.open(
            <SaveFormatModalDialog
              formatProps={formatProps}
              quantityType={activeQuantityType}
              onDialogCloseArgs={newQuantityType}
              onDialogClose={processListboxValueChange}
              onDialogOk={}
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      processListboxValueChange(newQuantityType);
    },
    [activeFormatDefinition, activeQuantityType, processListboxValueChange]
  );


  const onFormatSetChanged = React.useCallback(
    (newFormatSet: FormatSet) => {
      setActiveFormatSet(newFormatSet);
      setActiveFormatDefinition(undefined); // maybe add a clearActiveFormatDefinition method? If we need more handling...
      setSaveEnabled(false);
    },
    []
  );

  // TODO: Figure out if we can pass in/ specify a persistence unit for current format set. If we can, we can use the preview formatting option.
  const handleOnFormatChanged = React.useCallback(
    async (formatProps: FormatProps) => {
      if (activeFormatDefinition) {
        const newSpec =
          await IModelApp.quantityFormatter.generateFormatterSpecByType(
            activeQuantityType,
            formatProps
          );
        const formatPropsInUse =
          IModelApp.quantityFormatter.getFormatPropsByQuantityType(
            activeQuantityType
          );
        if (formatPropsInUse)
          setSaveEnabled(!formatAreEqual(formatProps, formatPropsInUse));
        setActiveFormatterSpec(newSpec);
      }
    },
    [activeFormatDefinition, activeQuantityType]
  );

  const handleOnFormatSave = React.useCallback(async () => {
    if (activeFormatterSpec) {
      const format = activeFormatterSpec.format.toJSON();
      await IModelApp.quantityFormatter.setOverrideFormat(
        activeQuantityType,
        format
      );
      setClearEnabled(true);
    }
  }, [activeFormatterSpec, activeQuantityType]);

  const handleOnFormatReset = React.useCallback(async () => {
    await IModelApp.quantityFormatter.clearOverrideFormats(activeQuantityType);
    setClearEnabled(false);
  }, [activeQuantityType]);

  return (
    <div className="quantity-formatting-container">
      <FormatSetSelector
        selectedFormatSet={activeFormatSet}
        availableFormatSets={currentFormatSets}
        onFormatSetChanged={onFormatSetChanged}
      />
      <span className="uifw-quantity-format-section-label">
        {translate("settings.quantity-formatting.formatSectionLabel")}
      </span>
      <div className="uifw-quantity-types-container">
        <div className="left-panel">
          <List
            id="uifw-quantity-types-list"
            className="uifw-quantity-types"
          >
            {activeFormatSet && activeFormatSet.formats &&
              Object.entries(activeFormatSet.formats).map(([key, formatDef]) => (
              <ListItem
                key={key}
                className="quantity-type-list-entry"
                onClick={() => setActiveFormatDefinition(formatDef)}
                active={activeFormatDefinition?.name === key}
              >

                <ListItem.Content className="quantity-type-list-entry">
                  <span className="map-source-list-entry-name">{formatDef.label || key}</span>
                  {formatDef.description && (
                    <ListItem.Description>{formatDef.description}</ListItem.Description>
                  )}
                </ListItem.Content>
              </ListItem>
              ))
            }
          </List>
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
                <QuantityFormatPanel
                  onFormatChange={handleOnFormatChanged}
                  quantityType={activeQuantityType}
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
  onDialogOk
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
          Do you want to save changes to {formatDefinition.label} before changing to another?
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
