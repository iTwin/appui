import { r as reactExports, c as classnames, j as jsxRuntimeExports, R as React } from "./iframe-B5XhNadd.js";
import { i as IModelApp, a6 as ItemField, a7 as useAccuDrawStore, a8 as FrameworkAccuDraw, a9 as CompassMode, U as UiFramework, aa as Orientation, ab as AccuDrawInputField, ac as SvgDistance, ad as SvgAngle, ae as getCSSColorFromDef, af as useResizeObserver, S as SvgPlaceholder } from "./appui-react-CwKstaKu.js";
import { A as AppUiStory } from "./AppUiStory-iS4J_UUr.js";
import { c as createFrontstage } from "./Utils-98Mhw6iN.js";
import "./Key.enum-szt-ThaG.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-H2bURNxP.js";
import "./index-B5vH9_xk.js";
import "./blocks-CGJKxwwC.js";
let AccuDrawContainerIndex = 0;
const defaultXLabel = "X";
const defaultYLabel = "Y";
const defaultZLabel = "Z";
function AccuDrawFieldContainer(props) {
  const { className, style, orientation, uiSettingsStorage, isBearingAngle = false, ...otherProps } = props;
  const [containerIndex] = reactExports.useState(() => ++AccuDrawContainerIndex);
  const xInputRef = reactExports.useRef(null);
  const yInputRef = reactExports.useRef(null);
  const zInputRef = reactExports.useRef(null);
  const angleInputRef = reactExports.useRef(null);
  const distanceInputRef = reactExports.useRef(null);
  const focusField = reactExports.useRef(void 0);
  const [mode, setMode] = reactExports.useState(() => IModelApp.accuDraw.compassMode);
  const [xLock, setXLock] = reactExports.useState(() => IModelApp.accuDraw.getFieldLock(ItemField.X_Item));
  const [yLock, setYLock] = reactExports.useState(() => IModelApp.accuDraw.getFieldLock(ItemField.Y_Item));
  const [zLock, setZLock] = reactExports.useState(() => IModelApp.accuDraw.getFieldLock(ItemField.Z_Item));
  const [angleLock, setAngleLock] = reactExports.useState(() => IModelApp.accuDraw.getFieldLock(ItemField.ANGLE_Item));
  const [distanceLock, setDistanceLock] = reactExports.useState(() => IModelApp.accuDraw.getFieldLock(ItemField.DIST_Item));
  const is3d = useAccuDrawStore((state) => state.is3d);
  const [uiSettings, setUiSettings] = reactExports.useState(FrameworkAccuDraw.uiStateStorage);
  reactExports.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawUiSettingsChangedEvent.addListener(() => {
      setUiSettings(FrameworkAccuDraw.uiStateStorage);
    });
  }, []);
  const getFieldInput = (field) => {
    switch (field) {
      case ItemField.X_Item:
        return getCurrent(xInputRef);
      case ItemField.Y_Item:
        return getCurrent(yInputRef);
      case ItemField.Z_Item:
        return getCurrent(zInputRef);
      case ItemField.ANGLE_Item:
        return getCurrent(angleInputRef);
      case ItemField.DIST_Item:
        return getCurrent(distanceInputRef);
    }
  };
  const getInputToFocus = reactExports.useCallback((field) => {
    const fieldInput = field === void 0 ? void 0 : getFieldInput(field);
    if (fieldInput) {
      if (document.activeElement === fieldInput)
        return void 0;
      return fieldInput;
    }
    const focusedInput = [
      xInputRef,
      yInputRef,
      zInputRef,
      angleInputRef,
      distanceInputRef
    ].find((inputRef) => document.activeElement === inputRef.current);
    if (focusedInput)
      return void 0;
    let fallbackInput = getFieldInput(ItemField.DIST_Item);
    if (fallbackInput)
      return fallbackInput;
    fallbackInput = getFieldInput(ItemField.X_Item);
    return fallbackInput;
  }, []);
  const setFocusToField = reactExports.useCallback((field) => {
    const input = getInputToFocus(field);
    if (!input)
      return;
    input.focus();
    input.select();
  }, [getInputToFocus]);
  reactExports.useEffect(() => {
    const itemToFocus = mode === CompassMode.Polar ? ItemField.DIST_Item : ItemField.X_Item;
    IModelApp.accuDraw.setFocusItem(itemToFocus);
    setFocusToField(itemToFocus);
    const inputToFocus = mode === CompassMode.Rectangular ? getFieldInput(ItemField.X_Item) : getFieldInput(ItemField.DIST_Item);
    if (!inputToFocus)
      return;
    const timeoutId = setTimeout(() => {
      inputToFocus.focus();
      inputToFocus.select();
    }, 1);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [mode, setFocusToField]);
  reactExports.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldLockEvent.addListener((args) => {
      switch (args.field) {
        case ItemField.X_Item:
          setXLock(args.lock);
          break;
        case ItemField.Y_Item:
          setYLock(args.lock);
          break;
        case ItemField.Z_Item:
          setZLock(args.lock);
          break;
        case ItemField.ANGLE_Item:
          setAngleLock(args.lock);
          break;
        case ItemField.DIST_Item:
          setDistanceLock(args.lock);
          break;
      }
    });
  }, []);
  reactExports.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener((args) => {
      focusField.current = args.field;
      setFocusToField(focusField.current);
    });
  }, [setFocusToField]);
  reactExports.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawGrabInputFocusEvent.addListener(() => {
      setFocusToField(focusField.current);
    });
  }, [setFocusToField]);
  reactExports.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetCompassModeEvent.addListener((args) => {
      setMode(args.mode);
    });
  }, []);
  const handleValueChanged = reactExports.useCallback((field, stringValue) => {
    FrameworkAccuDraw.setFieldValueFromUi(field, stringValue);
  }, []);
  const handleEscPressed = reactExports.useCallback(() => {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }, []);
  const createFieldStyle = (inStyle, backgroundColor, foregroundColor) => {
    let fieldStyle;
    let rgbaString = "";
    if (inStyle || backgroundColor || foregroundColor) {
      fieldStyle = inStyle ? inStyle : {};
      if (backgroundColor) {
        rgbaString = typeof backgroundColor === "string" ? backgroundColor : getCSSColorFromDef(backgroundColor);
        fieldStyle = { ...fieldStyle, backgroundColor: rgbaString };
      }
      if (foregroundColor) {
        rgbaString = typeof foregroundColor === "string" ? foregroundColor : getCSSColorFromDef(foregroundColor);
        fieldStyle = { ...fieldStyle, color: rgbaString };
      }
    }
    return fieldStyle;
  };
  const xStyle = reactExports.useMemo(() => {
    if (!uiSettings)
      return void 0;
    return createFieldStyle(uiSettings.xStyle, uiSettings.xBackgroundColor, uiSettings.xForegroundColor);
  }, [uiSettings]);
  const yStyle = reactExports.useMemo(() => {
    if (!uiSettings)
      return void 0;
    return createFieldStyle(uiSettings.yStyle, uiSettings.yBackgroundColor, uiSettings.yForegroundColor);
  }, [uiSettings]);
  const zStyle = reactExports.useMemo(() => {
    if (!uiSettings)
      return void 0;
    return createFieldStyle(uiSettings.zStyle, uiSettings.zBackgroundColor, uiSettings.zForegroundColor);
  }, [uiSettings]);
  const angleStyle = reactExports.useMemo(() => {
    if (!uiSettings)
      return void 0;
    return createFieldStyle(uiSettings.angleStyle, uiSettings.angleBackgroundColor, uiSettings.angleForegroundColor);
  }, [uiSettings]);
  const distanceStyle = reactExports.useMemo(() => {
    if (!uiSettings)
      return void 0;
    return createFieldStyle(uiSettings.distanceStyle, uiSettings.distanceBackgroundColor, uiSettings.distanceForegroundColor);
  }, [uiSettings]);
  const xLabel = uiSettings?.xLabel ?? defaultXLabel;
  const yLabel = uiSettings?.yLabel ?? defaultYLabel;
  const zLabel = uiSettings?.zLabel ?? defaultZLabel;
  const angleLabel = uiSettings?.angleLabel;
  const distanceLabel = uiSettings?.distanceLabel;
  const classNames = classnames("uifw-accudraw-field-container", orientation === Orientation.Vertical ? "uifw-vertical" : "uifw-horizontal", className);
  const labelCentered = xLabel !== void 0 && xLabel.length === 1 && yLabel !== void 0 && yLabel.length === 1 && zLabel !== void 0 && zLabel.length === 1;
  return reactExports.createElement(
    "div",
    { className: classNames, style, ...otherProps },
    mode === CompassMode.Rectangular && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(AccuDrawInputField, {
        ref: xInputRef,
        isLocked: xLock,
        style: xStyle,
        field: ItemField.X_Item,
        id: `uifw-accudraw-x-${containerIndex}`,
        "data-testid": "uifw-accudraw-x",
        label: xLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.xIcon,
        icon: uiSettings?.xIconNode,
        labelCentered,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.X_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(ItemField.Y_Item)
      }),
      reactExports.createElement(AccuDrawInputField, {
        ref: yInputRef,
        isLocked: yLock,
        style: yStyle,
        field: ItemField.Y_Item,
        id: `uifw-accudraw-y-${containerIndex}`,
        "data-testid": "uifw-accudraw-y",
        label: yLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.yIcon,
        icon: uiSettings?.yIconNode,
        labelCentered,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.Y_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(is3d ? ItemField.Z_Item : ItemField.X_Item)
      }),
      is3d && reactExports.createElement(AccuDrawInputField, {
        ref: zInputRef,
        isLocked: zLock,
        style: zStyle,
        field: ItemField.Z_Item,
        id: `uifw-accudraw-z-${containerIndex}`,
        "data-testid": "uifw-accudraw-z",
        label: zLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.zIcon,
        icon: uiSettings?.zIconNode,
        labelCentered,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.Z_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(ItemField.X_Item)
      })
    ),
    mode === CompassMode.Polar && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(AccuDrawInputField, {
        ref: distanceInputRef,
        isLocked: distanceLock,
        style: distanceStyle,
        field: ItemField.DIST_Item,
        id: `uifw-accudraw-distance-${containerIndex}`,
        "data-testid": "uifw-accudraw-distance",
        label: distanceLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.distanceIcon ?? reactExports.createElement(SvgDistance, null),
        icon: uiSettings?.distanceIconNode,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.DIST_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(ItemField.ANGLE_Item)
      }),
      reactExports.createElement(AccuDrawInputField, {
        ref: angleInputRef,
        isLocked: angleLock,
        isBearingAngle,
        style: angleStyle,
        field: ItemField.ANGLE_Item,
        id: `uifw-accudraw-angle-${containerIndex}`,
        "data-testid": "uifw-accudraw-angle",
        label: angleLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.angleIcon ?? reactExports.createElement(SvgAngle, null),
        icon: uiSettings?.angleIconNode,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.ANGLE_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(is3d ? ItemField.Z_Item : ItemField.DIST_Item)
      }),
      is3d && reactExports.createElement(AccuDrawInputField, {
        ref: zInputRef,
        isLocked: zLock,
        style: zStyle,
        field: ItemField.Z_Item,
        id: `uifw-accudraw-z-${containerIndex}`,
        "data-testid": "uifw-accudraw-z",
        label: zLabel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        iconSpec: uiSettings?.zIcon,
        icon: uiSettings?.zIconNode,
        labelCentered,
        onValueChanged: (stringValue) => handleValueChanged(ItemField.Z_Item, stringValue),
        onEscPressed: handleEscPressed,
        onTabPressed: () => IModelApp.accuDraw.setFocusItem(ItemField.DIST_Item)
      })
    )
  );
}
function getCurrent(ref) {
  if (ref.current === null)
    return void 0;
  return ref.current;
}
function AccuDrawWidget() {
  const [orientation, setOrientation] = reactExports.useState(Orientation.Vertical);
  const breakpoint = 400;
  const handleResize = reactExports.useCallback((w, _h) => {
    setOrientation(w <= breakpoint ? Orientation.Vertical : Orientation.Horizontal);
  }, []);
  const ref = useResizeObserver(handleResize);
  return reactExports.createElement(
    "div",
    { ref },
    reactExports.createElement(AccuDrawFieldContainer, { orientation })
  );
}
function StoryWrapper(props) {
  React.useEffect(() => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    FrameworkAccuDraw.uiStateStorage = {
      ...FrameworkAccuDraw.uiStateStorage,
      xIcon: "icon-placeholder",
      xIconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {})
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: props.children });
}
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { frontstages: [createFrontstage({
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(StoryWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })
  })] });
};
const meta = {
  title: "Components/AccuDrawWidget",
  component: AccuDrawWidget,
  tags: ["autodocs"],
  decorators: [StoryDecorator]
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
