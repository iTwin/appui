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
import type { QuantityTypeArg, QuantityTypeKey } from "@itwin/core-frontend";
import {
  getQuantityTypeKey,
  IModelApp,
  QuantityType,
} from "@itwin/core-frontend";
import type {
  FormatProps,
  FormatterSpec,
  UnitSystemKey,
} from "@itwin/core-quantity";
import {
  FormatSample,
  QuantityFormatPanel,
} from "@itwin/imodel-components-react";
import {
  Listbox,
  ListboxItem,
  useSaveBeforeActivatingNewSettingsTab,
  useSaveBeforeClosingSettingsContainer,
} from "@itwin/core-react";
import { UiFramework } from "../../UiFramework.js";
import { UnitSystemSelector } from "./UnitSystemSelector.js";
import { Button, Dialog } from "@itwin/itwinui-react";
import { SvgMeasure } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../../hooks/useTranslation.js";
import type { SettingsTabEntry } from "../SettingsManager.js";

function formatAreEqual(obj1: FormatProps, obj2: FormatProps) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}

/** Options to initialize the settings page that allows users to set Quantity formatting overrides.
 * @beta
 */
export interface QuantityFormatterSettingsOptions {
  initialQuantityType: QuantityTypeArg;
  availableUnitSystems: Set<UnitSystemKey>;
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
  const { availableUnitSystems, initialQuantityType } = { ...opts };
  return {
    itemPriority,
    tabId: "uifw:Quantity",
    label: UiFramework.translate("settings.quantity-formatting.label"),
    subLabel: UiFramework.translate("settings.quantity-formatting.subLabel"),
    page: (
      <QuantityFormatSettingsPage
        initialQuantityType={initialQuantityType ?? QuantityType.Length}
        availableUnitSystems={
          availableUnitSystems ??
          new Set(["metric", "imperial", "usCustomary", "usSurvey"])
        }
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
  initialQuantityType,
  availableUnitSystems,
}: QuantityFormatterSettingsOptions) {
  const { translate } = useTranslation();
  const [activeUnitSystemKey, setActiveUnitSystemKey] = React.useState(
    IModelApp.quantityFormatter.activeUnitSystem
  );
  const [activeQuantityType, setActiveQuantityType] = React.useState(
    getQuantityTypeKey(initialQuantityType)
  );
  const [activeFormatterSpec, setActiveFormatterSpec] = React.useState<
    FormatterSpec | undefined
  >(
    IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
      getQuantityTypeKey(activeQuantityType)
    )
  );
  const [saveEnabled, setSaveEnabled] = React.useState(false);
  const [clearEnabled, setClearEnabled] = React.useState(
    IModelApp.quantityFormatter.hasActiveOverride(initialQuantityType, true)
  );
  const newQuantityTypeRef = React.useRef<QuantityTypeKey>();

  React.useEffect(() => {
    return IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(
      () => {
        if (
          activeUnitSystemKey !== IModelApp.quantityFormatter.activeUnitSystem
        ) {
          setActiveUnitSystemKey(IModelApp.quantityFormatter.activeUnitSystem);
          setActiveFormatterSpec(
            IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
              activeQuantityType
            )
          );
          setSaveEnabled(false);
          setClearEnabled(
            IModelApp.quantityFormatter.hasActiveOverride(
              activeQuantityType,
              true
            )
          );
        }
      }
    );
  }, [activeQuantityType, activeUnitSystemKey]);

  React.useEffect(() => {
    return IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener(
      (args) => {
        if (!newQuantityTypeRef.current) {
          const quantityKey =
            IModelApp.quantityFormatter.getQuantityTypeKey(activeQuantityType);
          if (args.quantityType === quantityKey) {
            setActiveFormatterSpec(
              IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
                activeQuantityType
              )
            );
            setSaveEnabled(false);
            setClearEnabled(
              IModelApp.quantityFormatter.hasActiveOverride(
                activeQuantityType,
                true
              )
            );
          }
        }
        newQuantityTypeRef.current = undefined;
      }
    );
  }, [activeQuantityType]);

  const saveChanges = React.useCallback(
    (afterSaveFunction: (args: any) => void, args?: any) => {
      if (activeFormatterSpec) {
        const formatProps = activeFormatterSpec.format.toJSON();
        const formatPropsInUse = IModelApp.quantityFormatter
          .findFormatterSpecByQuantityType(activeQuantityType)!
          .format.toJSON();
        if (
          formatPropsInUse &&
          !formatAreEqual(formatProps, formatPropsInUse)
        ) {
          UiFramework.dialogs.modal.open(
            <SaveFormatModalDialog
              formatProps={formatProps}
              quantityType={activeQuantityType}
              onDialogCloseArgs={args}
              onDialogClose={afterSaveFunction}
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      afterSaveFunction(args);
    },
    [activeFormatterSpec, activeQuantityType]
  );

  // eslint-disable-next-line deprecation/deprecation
  useSaveBeforeActivatingNewSettingsTab(
    UiFramework.settingsManager,
    saveChanges
  );
  // eslint-disable-next-line deprecation/deprecation
  useSaveBeforeClosingSettingsContainer(
    UiFramework.settingsManager,
    saveChanges
  );

  const processListboxValueChange = React.useCallback(
    (newQuantityType: QuantityTypeKey) => {
      const volumeFormatterSpec =
        IModelApp.quantityFormatter.findFormatterSpecByQuantityType(
          newQuantityType
        );
      setActiveFormatterSpec(volumeFormatterSpec);
      setActiveQuantityType(newQuantityType);
      setSaveEnabled(false);
      setClearEnabled(
        IModelApp.quantityFormatter.hasActiveOverride(newQuantityType, true)
      );
    },
    []
  );

  const onListboxValueChange = React.useCallback(
    (newQuantityType: string) => {
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
            />,
            "saveQuantityFormat"
          );
          return;
        }
      }
      processListboxValueChange(newQuantityType);
    },
    [activeFormatterSpec, activeQuantityType, processListboxValueChange]
  );

  const handleOnFormatChanged = React.useCallback(
    async (formatProps: FormatProps) => {
      if (activeFormatterSpec) {
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
    [activeFormatterSpec, activeQuantityType]
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

  const processNewUnitSystem = React.useCallback(
    async (unitSystem: UnitSystemKey) => {
      await IModelApp.quantityFormatter.setActiveUnitSystem(unitSystem);
    },
    []
  );

  const handleUnitSystemSelected = React.useCallback(
    async (unitSystem: UnitSystemKey) => {
      if (unitSystem === activeUnitSystemKey) return;
      saveChanges(processNewUnitSystem, unitSystem);
    },
    [activeUnitSystemKey, processNewUnitSystem, saveChanges]
  );

  return (
    <div className="quantity-formatting-container">
      <UnitSystemSelector
        selectedUnitSystemKey={activeUnitSystemKey}
        availableUnitSystems={availableUnitSystems}
        onUnitSystemSelected={handleUnitSystemSelected}
      />
      <span className="uifw-quantity-format-section-label">
        {translate("settings.quantity-formatting.formatSectionLabel")}
      </span>
      <div className="uifw-quantity-types-container">
        <div className="left-panel">
          {/* eslint-disable-next-line deprecation/deprecation */}
          <Listbox
            id="uifw-quantity-types-list"
            className="uifw-quantity-types"
            onListboxValueChange={onListboxValueChange}
            selectedValue={activeQuantityType}
          >
            {[...IModelApp.quantityFormatter.quantityTypesRegistry.keys()].map(
              (key) => {
                const entry =
                  IModelApp.quantityFormatter.quantityTypesRegistry.get(key)!;
                const description = entry.description;
                const label = entry.label;
                return (
                  // eslint-disable-next-line deprecation/deprecation
                  <ListboxItem
                    key={entry.key}
                    className="quantity-type-list-entry"
                    value={entry.key}
                  >
                    <span
                      className="map-source-list-entry-name"
                      title={description}
                    >
                      {label}
                    </span>
                  </ListboxItem>
                );
              }
            )}
          </Listbox>
        </div>
        <div className="right-panel">
          {activeFormatterSpec && (
            <>
              <div className="uifw-quantity-types-right-top">
                <div className="uifw-quantity-types-right-top-sample">
                  <FormatSample
                    formatSpec={activeFormatterSpec}
                    initialMagnitude={1234.56}
                    hideLabels
                  />
                </div>
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
                  disabled={!clearEnabled}
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
  formatProps,
  quantityType,
  onDialogCloseArgs,
  onDialogClose,
}: {
  formatProps: FormatProps;
  quantityType: QuantityTypeKey;
  onDialogCloseArgs?: any;
  onDialogClose: (args?: any) => void;
}) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose(onDialogCloseArgs);
  }, [onDialogClose, onDialogCloseArgs]);

  const handleOK = React.useCallback(() => {
    void IModelApp.quantityFormatter.setOverrideFormat(
      quantityType,
      formatProps
    );
    handleClose();
  }, [formatProps, handleClose, quantityType]);

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
          Do you want to save changes to format before changing to another type?
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
