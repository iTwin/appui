var _a, _b, _c;
import { j as jsxRuntimeExports } from "./index-C8SlDwFz.js";
import { ac as Label, bE as StatusMessage, bF as InputWithDecorations, bG as InputWithIcon, aw as Select, aa as Input, bH as Textarea, bI as ComboBox, p as Icon, I as IModelApp, U as UiFramework, $ as SvgAdd, J as useTranslation, bJ as List, bK as ListItem, bL as FormatType } from "./appui-react-Dl7Zotdf.js";
import { r as reactExports } from "./index-DVOlmhHI.js";
import { F as FormatPanel, D as DeepCompare } from "./FormatPanel-C1U6KRvz.js";
import { B as Box, c as cx, j as cloneElementWithRef, h as useId, S as StatusIconMap, I as IconButton } from "./SvgCloseSmall-DMa1Cocg.js";
import { c as Dialog$1, B as Button } from "./Dialog-D8X5n1Ze.js";
import { A as AppUiStory } from "./AppUiStory-RiJNuQz6.js";
import { c as createFrontstage } from "./Utils-A70xa9OL.js";
import "./index-CdGyBOBZ.js";
import "./iframe-CMr3liut.js";
import "./client-DmvY241V.js";
import "./index-jG0EcXCq.js";
import "./index-XG6mIJUL.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-selgNRA5.js";
const InputGrid = reactExports.forwardRef((props, ref) => {
  let { children: childrenProp, className, labelPlacement, ...rest } = props;
  let children = useChildrenWithIds(childrenProp);
  return reactExports.createElement(
    Box,
    {
      className: cx("iui-input-grid", className),
      "data-iui-label-placement": labelPlacement,
      ref,
      ...rest
    },
    children
  );
});
let useChildrenWithIds = (children) => {
  let { labelId, inputId, messageId } = useSetup(children);
  return reactExports.useMemo(
    () => reactExports.Children.map(children, (child) => {
      if (!reactExports.isValidElement(child)) return child;
      if (child.type === Label || "label" === child.type)
        return cloneElementWithRef(child, (child2) => ({
          ...child2.props,
          htmlFor: child2.props.htmlFor || inputId,
          id: child2.props.id || labelId
        }));
      if (child.type === StatusMessage)
        return cloneElementWithRef(child, (child2) => ({
          ...child2.props,
          id: child2.props.id || messageId
        }));
      if (isInput(child) || child.type === InputWithDecorations || child.type === InputWithIcon)
        return handleCloningInputs(child, {
          labelId,
          inputId,
          messageId
        });
      return child;
    }),
    [children, inputId, labelId, messageId]
  );
};
let useSetup = (children) => {
  let idPrefix = useId();
  let labelId;
  let inputId;
  let messageId;
  let hasLabel = false;
  let hasSelect = false;
  let findInputId = (child) => {
    var _a2;
    if (!reactExports.isValidElement(child)) return;
    if (child.type === ComboBox)
      return ((_a2 = child.props.inputProps) == null ? void 0 : _a2.id) || `${idPrefix}--input`;
    if (child.type !== Select) return child.props.id || `${idPrefix}--input`;
  };
  reactExports.Children.forEach(children, (child) => {
    if (!reactExports.isValidElement(child)) return;
    if (child.type === Label || "label" === child.type) {
      hasLabel = true;
      labelId || (labelId = child.props.id || `${idPrefix}--label`);
    }
    if (child.type === StatusMessage)
      messageId || (messageId = child.props.id || `${idPrefix}--message`);
    if (child.type === InputWithDecorations || child.type === InputWithIcon)
      reactExports.Children.forEach(child.props.children, (child2) => {
        if (isInput(child2)) inputId || (inputId = findInputId(child2));
      });
    else if (isInput(child)) inputId || (inputId = findInputId(child));
    if (child.type === Select) hasSelect = true;
  });
  return {
    labelId: hasSelect ? labelId : void 0,
    inputId: hasLabel && !hasSelect ? inputId : void 0,
    messageId
  };
};
let handleCloningInputs = (child, { labelId, inputId, messageId }) => {
  let inputProps = (props = {}) => {
    let ariaDescribedBy = [props["aria-describedby"], messageId].filter(Boolean).join(" ");
    return {
      ...props,
      ...child.type !== Select && {
        id: props.id || inputId
      },
      "aria-describedby": (ariaDescribedBy == null ? void 0 : ariaDescribedBy.trim()) || void 0
    };
  };
  let cloneInput = (child2) => {
    if (child2.type === ComboBox)
      return cloneElementWithRef(child2, (child3) => ({
        inputProps: inputProps(child3.props.inputProps)
      }));
    if (child2.type === Select)
      return cloneElementWithRef(child2, (child3) => ({
        triggerProps: {
          "aria-labelledby": labelId,
          ...inputProps(child3.props.triggerProps)
        }
      }));
    return cloneElementWithRef(child2, (child3) => inputProps(child3.props));
  };
  if (child.type === InputWithDecorations || child.type === InputWithIcon)
    return cloneElementWithRef(child, (child2) => ({
      children: reactExports.Children.map(child2.props.children, (child3) => {
        if (reactExports.isValidElement(child3) && isInput(child3))
          return cloneInput(child3);
        return child3;
      })
    }));
  return cloneInput(child);
};
let isInput = (child) => reactExports.isValidElement(child) && ("input" === child.type || "textarea" === child.type || "select" === child.type || child.type === Input || child.type === Textarea || child.type === InputWithDecorations.Input || child.type === Select || child.type === ComboBox);
const LabeledInput = reactExports.forwardRef((props, ref) => {
  let {
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    wrapperProps,
    labelProps,
    messageContentProps,
    iconProps,
    inputWrapperProps,
    displayStyle = "default",
    required = false,
    ...rest
  } = props;
  let icon = svgIcon ?? (status && StatusIconMap[status]());
  let shouldShowIcon = null !== svgIcon && (svgIcon || status && !message);
  return reactExports.createElement(
    InputGrid,
    {
      labelPlacement: displayStyle,
      "data-iui-status": status,
      ...wrapperProps
    },
    label && reactExports.createElement(
      Label,
      {
        as: "label",
        required,
        disabled,
        ...labelProps
      },
      label
    ),
    reactExports.createElement(
      InputWithIcon,
      inputWrapperProps,
      reactExports.createElement(Input, {
        disabled,
        required,
        ref,
        ...rest
      }),
      shouldShowIcon && reactExports.createElement(
        Icon,
        {
          fill: status,
          ...iconProps,
          className: cx("iui-end-icon", iconProps == null ? void 0 : iconProps.className)
        },
        icon
      )
    ),
    "string" == typeof message ? reactExports.createElement(
      StatusMessage,
      {
        status,
        iconProps,
        contentProps: messageContentProps
      },
      message
    ) : message
  );
});
const LabeledSelect = reactExports.forwardRef((props, forwardedRef) => {
  let {
    className,
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    displayStyle = "default",
    style,
    required = false,
    wrapperProps,
    labelProps,
    messageContentProps,
    messageIconProps,
    ...rest
  } = props;
  return reactExports.createElement(
    InputGrid,
    {
      labelPlacement: displayStyle,
      "data-iui-status": status,
      ...wrapperProps
    },
    label && reactExports.createElement(
      Label,
      {
        as: "div",
        required,
        disabled,
        ...labelProps
      },
      label
    ),
    reactExports.createElement(Select, {
      disabled,
      className,
      style,
      required: props.native ? required : void 0,
      ...rest,
      ref: forwardedRef,
      ...{
        styleType: "default"
      }
    }),
    "string" == typeof message ? reactExports.createElement(
      StatusMessage,
      {
        status,
        startIcon: svgIcon,
        iconProps: messageIconProps,
        contentProps: messageContentProps
      },
      message
    ) : message
  );
});
const LabeledTextarea = reactExports.forwardRef(
  (props, forwardedRef) => reactExports.createElement(LabeledInput, {
    as: "textarea",
    rows: 3,
    ref: forwardedRef,
    ...props
  })
);
function QuantityFormatPanelV2({ formatDefinition, onFormatChange, initialMagnitude }) {
  const handleOnFormatChanged = reactExports.useCallback(async (newProps) => {
    onFormatChange && onFormatChange(newProps);
  }, [onFormatChange]);
  const provideFormatSpec = reactExports.useCallback(async (inProps, _persistenceUnit, _unitsProvider) => {
    return IModelApp.quantityFormatter.createFormatterSpec({
      formatProps: inProps,
      persistenceUnitName: _persistenceUnit.name
    });
  }, []);
  return reactExports.createElement(
    "div",
    { className: "components-quantityFormat-quantityPanel" },
    reactExports.createElement(FormatPanel, { onFormatChange: handleOnFormatChanged, initialFormat: formatDefinition, initialMagnitude, unitsProvider: IModelApp.quantityFormatter.unitsProvider, provideFormatSpec })
  );
}
function FormatSetSelector(props) {
  const { selectedFormatSet, onFormatSetChanged, availableFormatSets, createNewFormatSet } = props;
  const handleFormatSetChanged = reactExports.useCallback((formatSetName) => {
    const foundFormatSet = availableFormatSets.find((formatSet) => formatSet.name === formatSetName);
    foundFormatSet && onFormatSetChanged && onFormatSetChanged(foundFormatSet);
  }, [availableFormatSets, onFormatSetChanged]);
  const formatSetOptions = availableFormatSets.map((formatSet) => ({
    value: formatSet.name,
    label: formatSet.label ?? formatSet.name
  }));
  const openCreateFormatSetDialog = reactExports.useCallback(() => {
    if (!createNewFormatSet) {
      return;
    }
    UiFramework.dialogs.modal.open(reactExports.createElement(CreateFormatSetDialog, { createNewFormatSet }));
  }, [createNewFormatSet]);
  return reactExports.createElement(
    "div",
    { className: "quantity-format-set-selector-container" },
    reactExports.createElement("span", { className: "uicore-label" }, "Available Format Sets"),
    reactExports.createElement(
      "div",
      { className: "format-set-selector-row" },
      reactExports.createElement(Select, { "data-testid": "format-set-selector", options: formatSetOptions, onChange: handleFormatSetChanged, className: "format-set-selector" }),
      createNewFormatSet && reactExports.createElement(
        IconButton,
        { "data-testid": "open-format-set-dialog", onClick: openCreateFormatSetDialog, label: "Create new Format Set" },
        reactExports.createElement(SvgAdd, null)
      )
    )
  );
}
function CreateFormatSetDialog({ createNewFormatSet }) {
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const [name, setName] = reactExports.useState(void 0);
  const [label, setLabel] = reactExports.useState(void 0);
  const onNameChange = reactExports.useCallback((event) => {
    setName(event.target.value);
  }, []);
  const onLabelChange = reactExports.useCallback((event) => {
    setLabel(event.target.value);
  }, []);
  const readyToSave = reactExports.useCallback(() => {
    return !!name && !!label;
  }, [name, label]);
  const handleOk = reactExports.useCallback(() => {
    if (readyToSave()) {
      const newFormatSet = {
        name,
        label,
        formats: {}
      };
      createNewFormatSet(newFormatSet);
    }
    setIsOpen(false);
    handleClose();
  }, [readyToSave]);
  const handleClose = reactExports.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
  }, []);
  return reactExports.createElement(
    Dialog$1,
    { isOpen },
    reactExports.createElement(Dialog$1.Backdrop, null),
    reactExports.createElement(
      Dialog$1.Main,
      null,
      reactExports.createElement(Dialog$1.TitleBar, { titleText: "New Format Set" }),
      reactExports.createElement(
        Dialog$1.Content,
        null,
        reactExports.createElement(LabeledInput, { displayStyle: "inline", "data-testid": "format-set-dialog-name", label: "Format Set Name", placeholder: "Enter Unique Name", message: "Required", onChange: onNameChange, status: name ? "positive" : "negative", value: name, required: true }),
        reactExports.createElement(LabeledInput, { displayStyle: "inline", "data-testid": "format-set-dialog-label", label: "Format Set Label", placeholder: "Enter Label", message: "Required", status: label ? "positive" : "negative", onChange: onLabelChange, value: label, required: true })
      ),
      reactExports.createElement(
        Dialog$1.ButtonBar,
        null,
        reactExports.createElement(Button, { "data-testid": "format-set-add", styleType: "high-visibility", disabled: !readyToSave(), onClick: handleOk }, "Save"),
        reactExports.createElement(Button, { "data-testid": "format-set-cancel", styleType: "default", onClick: handleClose }, "Cancel")
      )
    )
  );
}
function formatAreEqual(obj1, obj2) {
  const compare = new DeepCompare();
  return compare.compare(obj1, obj2);
}
function QuantityFormatSettingsPageV2({ formatSets }) {
  const { translate } = useTranslation();
  const [activeFormatDefinition, setActiveFormatDefinition] = reactExports.useState(void 0);
  const [activeFormatDefinitionKey, setActiveFormatDefinitionKey] = reactExports.useState(void 0);
  const [activeFormatSet, setActiveFormatSet] = reactExports.useState(void 0);
  const [currentFormatSets, setFormatSets] = reactExports.useState(formatSets || []);
  const [saveEnabled, setSaveEnabled] = reactExports.useState(false);
  const updateFormatSet = reactExports.useCallback((formatSetToUpdate, key, formatDefinition) => {
    formatSetToUpdate.formats[key] = formatDefinition;
  }, []);
  const processListboxValueChange = reactExports.useCallback((newFormatDefinition, key) => {
    setActiveFormatDefinition(newFormatDefinition);
    setActiveFormatDefinitionKey(key);
    setSaveEnabled(false);
  }, []);
  const onListItemChange = reactExports.useCallback((newFormatDefinition, key) => {
    if (activeFormatSet && activeFormatDefinition && activeFormatDefinitionKey) {
      const originalFormatDefinition = activeFormatSet.formats[activeFormatDefinitionKey];
      if (activeFormatDefinitionKey !== key && originalFormatDefinition && !formatAreEqual(originalFormatDefinition, activeFormatDefinition)) {
        UiFramework.dialogs.modal.open(reactExports.createElement(SaveFormatModalDialog, { formatDefinition: activeFormatDefinition, onDialogClose: () => processListboxValueChange(newFormatDefinition, key), onDialogOk: () => {
          updateFormatSet(activeFormatSet, activeFormatDefinitionKey, activeFormatDefinition);
        } }), "saveQuantityFormat");
        return;
      }
    }
    processListboxValueChange(newFormatDefinition, key);
  }, [
    activeFormatSet,
    activeFormatDefinition,
    activeFormatDefinitionKey,
    updateFormatSet,
    processListboxValueChange
  ]);
  const onFormatSetChanged = reactExports.useCallback((newFormatSet) => {
    setActiveFormatSet(newFormatSet);
    setActiveFormatDefinition(void 0);
    setActiveFormatDefinitionKey(void 0);
    setSaveEnabled(false);
  }, []);
  const handleOnFormatChanged = reactExports.useCallback(async (formatDefinition) => {
    setActiveFormatDefinition(formatDefinition);
    setSaveEnabled(true);
  }, []);
  const handleOnFormatSave = reactExports.useCallback(async () => {
    if (activeFormatSet && activeFormatDefinition && activeFormatDefinitionKey) {
      updateFormatSet(activeFormatSet, activeFormatDefinitionKey, activeFormatDefinition);
      setSaveEnabled(false);
    }
  }, [activeFormatSet, activeFormatDefinition, activeFormatDefinitionKey, updateFormatSet]);
  const handleOnFormatReset = reactExports.useCallback(async () => {
    if (activeFormatDefinition && activeFormatSet) {
      const formatDefName = activeFormatDefinition.name ?? "temp";
      const originalFormatDefinition = activeFormatSet.formats[formatDefName];
      if (originalFormatDefinition) {
        setActiveFormatDefinition(originalFormatDefinition);
        setSaveEnabled(false);
      }
    }
  }, [activeFormatDefinition, activeFormatSet]);
  const addNewFormatSet = reactExports.useCallback((newFormatSet) => {
    setFormatSets((prevSets) => {
      return [...prevSets, newFormatSet];
    });
  }, []);
  const openCreateFormatDialog = reactExports.useCallback(() => {
    if (!activeFormatSet) {
      return;
    }
    UiFramework.dialogs.modal.open(reactExports.createElement(CreateFormatModalDialog, { onDialogOk: updateFormatSet, formatSet: activeFormatSet, onListItemChange }));
  }, [activeFormatSet, updateFormatSet, onListItemChange]);
  return reactExports.createElement(
    "div",
    { className: "quantity-formatting-container" },
    reactExports.createElement(FormatSetSelector, { selectedFormatSet: activeFormatSet, availableFormatSets: currentFormatSets, onFormatSetChanged, createNewFormatSet: addNewFormatSet }),
    reactExports.createElement("span", { className: "uifw-quantity-format-section-label" }, translate("settings.quantity-formatting.formatSectionLabel")),
    reactExports.createElement(
      "div",
      { className: "uifw-quantity-formats-container" },
      reactExports.createElement("div", { className: "left-panel" }, activeFormatSet && reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(
          Button,
          { onClick: openCreateFormatDialog },
          reactExports.createElement("span", null, "Add a Format")
        ),
        reactExports.createElement(List, { id: "uifw-formats-list", className: "uifw-formats-list" }, activeFormatSet.formats && Object.entries(activeFormatSet.formats).map(([key, formatDef]) => reactExports.createElement(
          ListItem,
          { actionable: true, key, className: "format-list-entry", onClick: () => onListItemChange(formatDef, key), active: activeFormatDefinitionKey === key },
          reactExports.createElement(
            ListItem.Content,
            { className: "format-list-entry-content" },
            reactExports.createElement("span", { className: "format-list-entry-name" }, formatDef.label || key),
            formatDef.description && reactExports.createElement(ListItem.Description, null, formatDef.description)
          )
        )))
      )),
      reactExports.createElement("div", { className: "right-panel" }, activeFormatDefinition && reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement("div", { className: "uifw-quantity-types-right-top" }),
        reactExports.createElement(
          "div",
          { className: "uifw-quantity-types-formats" },
          reactExports.createElement(QuantityFormatPanelV2, { onFormatChange: handleOnFormatChanged, formatDefinition: activeFormatDefinition, initialMagnitude: 1234.56 })
        ),
        reactExports.createElement(
          "div",
          { className: "components-button-panel" },
          reactExports.createElement(Button, { styleType: "cta", onClick: handleOnFormatSave, disabled: !saveEnabled }, translate("settings.quantity-formatting.setButtonLabel")),
          reactExports.createElement(Button, { styleType: "default", onClick: handleOnFormatReset, disabled: saveEnabled }, translate("settings.quantity-formatting.clearButtonLabel"))
        )
      ))
    )
  );
}
function SaveFormatModalDialog({ formatDefinition, onDialogClose, onDialogOk }) {
  const { translate } = useTranslation();
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const handleClose = reactExports.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
    onDialogClose && onDialogClose();
  }, [onDialogClose]);
  const handleOK = reactExports.useCallback(() => {
    onDialogOk && onDialogOk();
    handleClose();
  }, [onDialogOk, handleClose]);
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
      reactExports.createElement(
        Dialog$1.Content,
        null,
        "Do you want to save changes to ",
        formatDefinition.label,
        " before changing to another?"
      ),
      reactExports.createElement(
        Dialog$1.ButtonBar,
        null,
        reactExports.createElement(Button, { styleType: "high-visibility", onClick: handleOK }, translate("dialog.yes")),
        reactExports.createElement(Button, { onClick: handleCancel }, translate("dialog.no"))
      )
    )
  );
}
function CreateFormatModalDialog({ onDialogOk, formatSet, onListItemChange }) {
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const [name, setName] = reactExports.useState();
  const [label, setLabel] = reactExports.useState();
  const [description, setDescription] = reactExports.useState();
  const [type, setType] = reactExports.useState(FormatType.Decimal);
  const [unitsProvider, setUnitsProvider] = reactExports.useState(IModelApp.quantityFormatter.unitsProvider);
  reactExports.useEffect(() => {
    const listener = () => {
      setUnitsProvider(IModelApp.quantityFormatter.unitsProvider);
    };
    IModelApp.quantityFormatter.onUnitsProviderChanged.addListener(listener);
    return () => {
      IModelApp.quantityFormatter.onUnitsProviderChanged.removeListener(listener);
    };
  }, []);
  const handleOk = reactExports.useCallback(
    () => {
      if (!name || !type) {
        return;
      }
      const newFormat = {
        name,
        label,
        description,
        type
      };
      onDialogOk(formatSet, name, newFormat);
      handleClose();
      onListItemChange(newFormat, name);
    },
    [name, label, description, onDialogOk]
  );
  const handleClose = reactExports.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
  }, []);
  return reactExports.createElement(
    Dialog$1,
    { isOpen },
    reactExports.createElement(Dialog$1.Backdrop, null),
    reactExports.createElement(
      Dialog$1.Main,
      null,
      reactExports.createElement(Dialog$1.TitleBar, { titleText: "New Format" }),
      reactExports.createElement(
        Dialog$1.Content,
        null,
        reactExports.createElement(LabeledInput, { displayStyle: "inline", "data-testid": "format-dialog-name", label: "Format Name", placeholder: "Enter Unique Name", onChange: (event) => setName(event.target.value), status: name ? "positive" : "negative", value: name }),
        reactExports.createElement(LabeledInput, { displayStyle: "inline", "data-testid": "format-dialog-label", label: "Format Label", placeholder: "Enter Label", onChange: (event) => setLabel(event.target.value), value: label }),
        reactExports.createElement(LabeledSelect, { label: "Format Type", "data-testid": "format-type-select", options: Object.values(FormatType).map((type2) => ({
          value: type2,
          label: type2
        })), value: type, onChange: setType, placeholder: "Select Format Type", required: true }),
        reactExports.createElement(LabeledTextarea, { label: "Description", message: "Optional", onChange: (event) => setDescription(event.target.value) })
      ),
      reactExports.createElement(
        Dialog$1.ButtonBar,
        null,
        reactExports.createElement(Button, { "data-testid": "format-add", styleType: "high-visibility", disabled: !name || !type, onClick: handleOk }, "Save"),
        reactExports.createElement(Button, { "data-testid": "format-set-cancel", styleType: "default", onClick: handleClose }, "Cancel")
      )
    )
  );
}
function QuantityFormatStory(props) {
  const { formatSets, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuantityFormatSettingsPageV2,
    {
      formatSets,
      ...rest
    }
  );
}
QuantityFormatStory.__docgenInfo = { "description": "", "methods": [], "displayName": "QuantityFormatStory" };
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { onInitialize: async () => {
    UiFramework.hideToolbar();
  }, frontstages: [createFrontstage({
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  })] });
};
const meta = {
  title: "Components/QuantityFormatV2",
  component: QuantityFormatStory,
  tags: ["autodocs"],
  decorators: [StoryDecorator]
};
const Default = {
  args: {
    formatSets: [{
      name: "imperial",
      label: "Imperial",
      formats: {
        "AecUnits.LENGTH": {
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "'",
              "name": "Units.FT"
            }, {
              "label": '"',
              "name": "Units.IN"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 4,
          type: "Decimal"
        },
        "AecUnits.ANGLE": {
          description: "degrees minutes seconds (labeled) 0 decimal places",
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "°",
              "name": "Units.ARC_DEG"
            }, {
              "label": "'",
              "name": "Units.ARC_MINUTE"
            }, {
              "label": '"',
              "name": "Units.ARC_SECOND"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 2,
          type: "Decimal",
          uomSeparator: ""
        }
      }
    }, {
      name: "metric",
      label: "Metric",
      formats: {
        "AecUnits.LENGTH": {
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "m",
              "name": "Units.M"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 4,
          type: "Decimal",
          decimalSeparator: "."
        },
        "AecUnits.ANGLE": {
          description: "degrees (labeled) 2 decimal places",
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "°",
              "name": "Units.ARC_DEG"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 2,
          type: "Decimal",
          uomSeparator: ""
        }
      }
    }]
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...(_a = Default.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: `{
  args: {
    formatSets: [{
      name: "imperial",
      label: "Imperial",
      formats: {
        "AecUnits.LENGTH": {
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "'",
              "name": "Units.FT"
            }, {
              "label": "\\"",
              "name": "Units.IN"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 4,
          type: "Decimal"
        },
        "AecUnits.ANGLE": {
          description: "degrees minutes seconds (labeled) 0 decimal places",
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "°",
              "name": "Units.ARC_DEG"
            }, {
              "label": "'",
              "name": "Units.ARC_MINUTE"
            }, {
              "label": "\\"",
              "name": "Units.ARC_SECOND"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 2,
          type: "Decimal",
          uomSeparator: ""
        }
      }
    }, {
      name: "metric",
      label: "Metric",
      formats: {
        "AecUnits.LENGTH": {
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "m",
              "name": "Units.M"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 4,
          type: "Decimal",
          decimalSeparator: "."
        },
        "AecUnits.ANGLE": {
          description: "degrees (labeled) 2 decimal places",
          composite: {
            includeZero: true,
            spacer: "",
            units: [{
              "label": "°",
              "name": "Units.ARC_DEG"
            }]
          },
          formatTraits: ["keepSingleZero", "showUnitLabel"],
          precision: 2,
          type: "Decimal",
          uomSeparator: ""
        }
      }
    }]
  }
}`,
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
