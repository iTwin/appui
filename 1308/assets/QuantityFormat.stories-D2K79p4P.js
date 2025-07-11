var _a, _b, _c;
import { I as IModelApp, bf as getQuantityTypeKey, bg as isCustomQuantityTypeDefinition, aQ as Checkbox, aw as Select, aa as Input, J as useTranslation, U as UiFramework, bh as useSaveBeforeActivatingNewSettingsTab, bi as useSaveBeforeClosingSettingsContainer, bj as Listbox, bk as ListboxItem, bl as QuantityType } from "./appui-react-Dl7Zotdf.js";
import { B as Button, c as Dialog$1 } from "./Dialog-D8X5n1Ze.js";
import { A as AppUiDecorator, I as InitializerDecorator } from "./Decorators-vyHBC2Po.js";
import { e as enumArgType } from "./Utils-A70xa9OL.js";
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { F as FormatPanel, D as DeepCompare, a as FormatSample } from "./FormatPanel-C1U6KRvz.js";
import "./iframe-CMr3liut.js";
import "./SvgCloseSmall-DMa1Cocg.js";
import "./client-DmvY241V.js";
import "./index-CdGyBOBZ.js";
const isCheckboxFormatPropEditorSpec = (item) => {
  return item.editorType === "checkbox";
};
const isTextInputFormatPropEditorSpec = (item) => {
  return item.editorType === "text";
};
const isTextSelectFormatPropEditorSpec = (item) => {
  return item.editorType === "select";
};
function createTextInputFormatPropEditor(key, label, inProps, getString, setString, fireFormatChange) {
  const value = getString(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Input, { "data-testid": `${key}-editor`, key: `${key}-editor`, value, size: "small", onChange: (e) => {
      const newProps = setString(inProps, e.currentTarget.value);
      fireFormatChange(newProps);
    } })
  );
}
function createSelectFormatPropEditor(key, label, options, inProps, getString, setString, fireFormatChange) {
  const value = getString(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Select, { "data-testid": `${key}-editor`, key: `${key}-editor`, value, options, size: "small", onChange: (newValue) => {
      const newProps = setString(inProps, newValue);
      fireFormatChange(newProps);
    } })
  );
}
function createCheckboxFormatPropEditor(key, label, inProps, getBool, setBool, fireFormatChange) {
  const isChecked = getBool(inProps);
  return reactExports.createElement(
    reactExports.Fragment,
    { key: `${key}` },
    reactExports.createElement("span", { key: `${key}-label`, className: "uicore-label" }, label),
    reactExports.createElement(Checkbox, { "data-testid": `${key}-editor`, key: `${key}-editor`, checked: isChecked, onChange: (e) => {
      const newProps = setBool(inProps, e.target.checked);
      fireFormatChange(newProps);
    } })
  );
}
function formatAreEqual$1(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatPanel(props) {
  const { quantityType, onFormatChange, ...otherProps } = props;
  const [formatProps, setFormatProps] = reactExports.useState();
  const initialFormatProps = reactExports.useRef();
  const [persistenceUnit, setPersistenceUnit] = reactExports.useState();
  reactExports.useEffect(() => {
    const newFormatProps = IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (!initialFormatProps.current)
      initialFormatProps.current = newFormatProps;
    setFormatProps(newFormatProps);
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition)
      setPersistenceUnit(quantityTypeDefinition.persistenceUnit);
    else
      throw Error(`Unable to locate a quantity type with type ${quantityType}`);
  }, [quantityType]);
  reactExports.useEffect(() => {
    const newFormatProps = IModelApp.quantityFormatter.getFormatPropsByQuantityType(quantityType);
    if (initialFormatProps.current && newFormatProps) {
      if (!formatAreEqual$1(newFormatProps, initialFormatProps.current)) {
        initialFormatProps.current = newFormatProps;
        setFormatProps(newFormatProps);
      }
    }
  });
  const handleOnFormatChanged = reactExports.useCallback(async (newProps) => {
    setFormatProps(newProps);
    onFormatChange && onFormatChange(newProps);
  }, [onFormatChange]);
  const createCustomPropEditors = reactExports.useCallback((specs, inProps, fireFormatChange) => {
    return specs.map((spec, index) => {
      if (isCheckboxFormatPropEditorSpec(spec))
        return createCheckboxFormatPropEditor(`${spec.editorType}-${index}`, spec.label, inProps, spec.getBool, spec.setBool, fireFormatChange);
      if (isTextSelectFormatPropEditorSpec(spec))
        return createSelectFormatPropEditor(`${spec.editorType}-${index}`, spec.label, spec.selectOptions, inProps, spec.getString, spec.setString, fireFormatChange);
      if (isTextInputFormatPropEditorSpec(spec))
        return createTextInputFormatPropEditor(`${spec.editorType}-${index}`, spec.label, inProps, spec.getString, spec.setString, fireFormatChange);
      return reactExports.createElement("div", { key: index });
    });
  }, []);
  const providePrimaryChildren = reactExports.useCallback((inProps, fireFormatChange) => {
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition && isCustomQuantityTypeDefinition(quantityTypeDefinition) && quantityTypeDefinition.isCompatibleFormatProps(inProps)) {
      if (quantityTypeDefinition.primaryPropEditorSpecs)
        return createCustomPropEditors(quantityTypeDefinition.primaryPropEditorSpecs, inProps, fireFormatChange);
    }
    return null;
  }, [createCustomPropEditors, quantityType]);
  const provideSecondaryChildren = reactExports.useCallback((inProps, fireFormatChange) => {
    const quantityTypeKey = getQuantityTypeKey(quantityType);
    const quantityTypeDefinition = IModelApp.quantityFormatter.quantityTypesRegistry.get(quantityTypeKey);
    if (quantityTypeDefinition && isCustomQuantityTypeDefinition(quantityTypeDefinition) && quantityTypeDefinition.isCompatibleFormatProps(inProps)) {
      if (quantityTypeDefinition.secondaryPropEditorSpecs)
        return createCustomPropEditors(quantityTypeDefinition.secondaryPropEditorSpecs, inProps, fireFormatChange);
    }
    return null;
  }, [createCustomPropEditors, quantityType]);
  const provideFormatSpec = reactExports.useCallback(async (inProps, _persistenceUnit, _unitsProvider) => {
    return IModelApp.quantityFormatter.generateFormatterSpecByType(quantityType, inProps);
  }, [quantityType]);
  return reactExports.createElement("div", { className: "components-quantityFormat-quantityPanel" }, persistenceUnit && formatProps && reactExports.createElement(FormatPanel, { onFormatChange: handleOnFormatChanged, ...otherProps, initialFormat: formatProps, unitsProvider: IModelApp.quantityFormatter.unitsProvider, persistenceUnit, providePrimaryChildren, provideSecondaryChildren, provideFormatSpec }));
}
function UnitSystemSelector(props) {
  const { translate } = useTranslation();
  const { selectedUnitSystemKey, onUnitSystemSelected, availableUnitSystems } = props;
  const handleUnitSystemSelected = reactExports.useCallback((newValue) => {
    onUnitSystemSelected && onUnitSystemSelected(newValue);
  }, [onUnitSystemSelected]);
  const displayUnitSystems = [
    ...availableUnitSystems.values()
  ].map((sys) => {
    switch (sys) {
      case "imperial":
        return {
          value: "imperial",
          label: translate("presentationUnitSystem.BritishImperial")
        };
      case "usCustomary":
        return {
          value: "usCustomary",
          label: translate("presentationUnitSystem.USCustomary")
        };
      case "usSurvey":
        return {
          value: "usSurvey",
          label: translate("presentationUnitSystem.USSurvey")
        };
      case "metric":
      default:
        return {
          value: "metric",
          label: translate("presentationUnitSystem.Metric")
        };
    }
  });
  const unitSystemKey = availableUnitSystems.has(selectedUnitSystemKey) ? selectedUnitSystemKey : displayUnitSystems[0].value;
  return reactExports.createElement(
    "div",
    { className: "quantity-unit-system-selector-container" },
    reactExports.createElement("span", { className: "uicore-label" }, translate("presentationUnitSystem.selector-label")),
    reactExports.createElement(Select, { "data-testid": "unitSystemSelector", value: unitSystemKey, options: displayUnitSystems, onChange: handleUnitSystemSelected, size: "small" })
  );
}
function formatAreEqual(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatSettingsPage({ initialQuantityType, availableUnitSystems }) {
  const { translate } = useTranslation();
  const [activeUnitSystemKey, setActiveUnitSystemKey] = reactExports.useState(IModelApp.quantityFormatter.activeUnitSystem);
  const [activeQuantityType, setActiveQuantityType] = reactExports.useState(getQuantityTypeKey(initialQuantityType));
  const [activeFormatterSpec, setActiveFormatterSpec] = reactExports.useState(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(getQuantityTypeKey(activeQuantityType)));
  const [saveEnabled, setSaveEnabled] = reactExports.useState(false);
  const [clearEnabled, setClearEnabled] = reactExports.useState(IModelApp.quantityFormatter.hasActiveOverride(initialQuantityType, true));
  const newQuantityTypeRef = reactExports.useRef();
  reactExports.useEffect(() => {
    return IModelApp.quantityFormatter.onActiveFormattingUnitSystemChanged.addListener(() => {
      if (activeUnitSystemKey !== IModelApp.quantityFormatter.activeUnitSystem) {
        setActiveUnitSystemKey(IModelApp.quantityFormatter.activeUnitSystem);
        setActiveFormatterSpec(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType));
        setSaveEnabled(false);
        setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(activeQuantityType, true));
      }
    });
  }, [activeQuantityType, activeUnitSystemKey]);
  reactExports.useEffect(() => {
    return IModelApp.quantityFormatter.onQuantityFormatsChanged.addListener((args) => {
      if (!newQuantityTypeRef.current) {
        const quantityKey = IModelApp.quantityFormatter.getQuantityTypeKey(activeQuantityType);
        if (args.quantityType === quantityKey) {
          setActiveFormatterSpec(IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType));
          setSaveEnabled(false);
          setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(activeQuantityType, true));
        }
      }
      newQuantityTypeRef.current = void 0;
    });
  }, [activeQuantityType]);
  const saveChanges = reactExports.useCallback((afterSaveFunction, args) => {
    if (activeFormatterSpec) {
      const formatProps = activeFormatterSpec.format.toJSON();
      const formatPropsInUse = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType).format.toJSON();
      if (formatPropsInUse && !formatAreEqual(formatProps, formatPropsInUse)) {
        UiFramework.dialogs.modal.open(reactExports.createElement(SaveFormatModalDialog, { formatProps, quantityType: activeQuantityType, onDialogCloseArgs: args, onDialogClose: afterSaveFunction }), "saveQuantityFormat");
        return;
      }
    }
    afterSaveFunction(args);
  }, [activeFormatterSpec, activeQuantityType]);
  useSaveBeforeActivatingNewSettingsTab(UiFramework.settingsManager, saveChanges);
  useSaveBeforeClosingSettingsContainer(UiFramework.settingsManager, saveChanges);
  const processListboxValueChange = reactExports.useCallback((newQuantityType) => {
    const volumeFormatterSpec = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(newQuantityType);
    setActiveFormatterSpec(volumeFormatterSpec);
    setActiveQuantityType(newQuantityType);
    setSaveEnabled(false);
    setClearEnabled(IModelApp.quantityFormatter.hasActiveOverride(newQuantityType, true));
  }, []);
  const onListboxValueChange = reactExports.useCallback((newQuantityType) => {
    if (activeFormatterSpec) {
      const formatProps = activeFormatterSpec.format.toJSON();
      const formatPropsInUse = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(activeQuantityType).format.toJSON();
      if (formatPropsInUse && !formatAreEqual(formatProps, formatPropsInUse)) {
        newQuantityTypeRef.current = newQuantityType;
        UiFramework.dialogs.modal.open(reactExports.createElement(SaveFormatModalDialog, { formatProps, quantityType: activeQuantityType, onDialogCloseArgs: newQuantityType, onDialogClose: processListboxValueChange }), "saveQuantityFormat");
        return;
      }
    }
    processListboxValueChange(newQuantityType);
  }, [activeFormatterSpec, activeQuantityType, processListboxValueChange]);
  const handleOnFormatChanged = reactExports.useCallback(async (formatProps) => {
    if (activeFormatterSpec) {
      const newSpec = await IModelApp.quantityFormatter.generateFormatterSpecByType(activeQuantityType, formatProps);
      const formatPropsInUse = IModelApp.quantityFormatter.getFormatPropsByQuantityType(activeQuantityType);
      if (formatPropsInUse)
        setSaveEnabled(!formatAreEqual(formatProps, formatPropsInUse));
      setActiveFormatterSpec(newSpec);
    }
  }, [activeFormatterSpec, activeQuantityType]);
  const handleOnFormatSave = reactExports.useCallback(async () => {
    if (activeFormatterSpec) {
      const format = activeFormatterSpec.format.toJSON();
      await IModelApp.quantityFormatter.setOverrideFormat(activeQuantityType, format);
      setClearEnabled(true);
    }
  }, [activeFormatterSpec, activeQuantityType]);
  const handleOnFormatReset = reactExports.useCallback(async () => {
    await IModelApp.quantityFormatter.clearOverrideFormats(activeQuantityType);
    setClearEnabled(false);
  }, [activeQuantityType]);
  const processNewUnitSystem = reactExports.useCallback(async (unitSystem) => {
    await IModelApp.quantityFormatter.setActiveUnitSystem(unitSystem);
  }, []);
  const handleUnitSystemSelected = reactExports.useCallback(async (unitSystem) => {
    if (unitSystem === activeUnitSystemKey)
      return;
    saveChanges(processNewUnitSystem, unitSystem);
  }, [activeUnitSystemKey, processNewUnitSystem, saveChanges]);
  return reactExports.createElement(
    "div",
    { className: "quantity-formatting-container" },
    reactExports.createElement(UnitSystemSelector, { selectedUnitSystemKey: activeUnitSystemKey, availableUnitSystems, onUnitSystemSelected: handleUnitSystemSelected }),
    reactExports.createElement("span", { className: "uifw-quantity-format-section-label" }, translate("settings.quantity-formatting.formatSectionLabel")),
    reactExports.createElement(
      "div",
      { className: "uifw-quantity-types-container" },
      reactExports.createElement(
        "div",
        { className: "left-panel" },
        reactExports.createElement(Listbox, { id: "uifw-quantity-types-list", className: "uifw-quantity-types", onListboxValueChange, selectedValue: activeQuantityType }, [...IModelApp.quantityFormatter.quantityTypesRegistry.keys()].map((key) => {
          const entry = IModelApp.quantityFormatter.quantityTypesRegistry.get(key);
          const description = entry.description;
          const label = entry.label;
          return (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            reactExports.createElement(
              ListboxItem,
              { key: entry.key, className: "quantity-type-list-entry", value: entry.key },
              reactExports.createElement("span", { className: "map-source-list-entry-name", title: description }, label)
            )
          );
        }))
      ),
      reactExports.createElement("div", { className: "right-panel" }, activeFormatterSpec && reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(
          "div",
          { className: "uifw-quantity-types-right-top" },
          reactExports.createElement(
            "div",
            { className: "uifw-quantity-types-right-top-sample" },
            reactExports.createElement(FormatSample, { formatSpec: activeFormatterSpec, initialMagnitude: 1234.56, hideLabels: true })
          )
        ),
        reactExports.createElement(
          "div",
          { className: "uifw-quantity-types-formats" },
          reactExports.createElement(QuantityFormatPanel, { onFormatChange: handleOnFormatChanged, quantityType: activeQuantityType })
        ),
        reactExports.createElement(
          "div",
          { className: "components-button-panel" },
          reactExports.createElement(Button, { styleType: "cta", onClick: handleOnFormatSave, disabled: !saveEnabled }, translate("settings.quantity-formatting.setButtonLabel")),
          reactExports.createElement(Button, { styleType: "default", onClick: handleOnFormatReset, disabled: !clearEnabled }, translate("settings.quantity-formatting.clearButtonLabel"))
        )
      ))
    )
  );
}
function SaveFormatModalDialog({ formatProps, quantityType, onDialogCloseArgs, onDialogClose }) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const handleClose = reactExports.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose(onDialogCloseArgs);
  }, [onDialogClose, onDialogCloseArgs]);
  const handleOK = reactExports.useCallback(() => {
    void IModelApp.quantityFormatter.setOverrideFormat(quantityType, formatProps);
    handleClose();
  }, [formatProps, handleClose, quantityType]);
  const handleCancel = reactExports.useCallback(() => {
    handleClose();
  }, [handleClose]);
  return reactExports.createElement(
    Dialog$1,
    { isOpen, onClose: handleCancel, className: "uifw-settings-quantityFormatting-saveFormatModalDialog", closeOnEsc: true, closeOnExternalClick: true, preventDocumentScroll: true },
    reactExports.createElement(Dialog$1.Backdrop, null),
    reactExports.createElement(
      Dialog$1.Main,
      { style: { minWidth: 200, maxWidth: 400, minHeight: 150, maxHeight: 400 } },
      reactExports.createElement(Dialog$1.TitleBar, { titleText: "Save Format Changes" }),
      reactExports.createElement(Dialog$1.Content, null, "Do you want to save changes to format before changing to another type?"),
      reactExports.createElement(
        Dialog$1.ButtonBar,
        null,
        reactExports.createElement(Button, { styleType: "high-visibility", onClick: handleOK }, translate("dialog.yes")),
        reactExports.createElement(Button, { onClick: handleCancel }, translate("dialog.no"))
      )
    )
  );
}
function QuantityFormatStory(props) {
  const { availableUnitSystems, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuantityFormatSettingsPage,
    {
      availableUnitSystems: new Set(availableUnitSystems),
      ...rest
    },
    rest.initialQuantityType
  );
}
QuantityFormatStory.__docgenInfo = { "description": "", "methods": [], "displayName": "QuantityFormatStory", "props": { "availableUnitSystems": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "UnitSystemKey" }], "raw": "UnitSystemKey[]" }, "description": "" } }, "composes": ["Omit"] };
const meta = {
  title: "Components/QuantityFormat",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  args: {
    initialQuantityType: QuantityType.Length,
    availableUnitSystems: ["metric", "imperial", "usCustomary", "usSurvey"]
  },
  argTypes: {
    initialQuantityType: enumArgType(QuantityType)
  }
};
const Default = {};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
      ...(_c = (_b = Default.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Default"];
export {
  Default,
  __namedExportsOrder,
  meta as default
};
