var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { r as reactExports } from "./index-R26Bfrts.js";
import { c as cx } from "./SvgCloseSmall-BizRFSWZ.js";
import { G as Guid, K as Key_enum } from "./Dialog-DD-cRevJ.js";
import { A as AppUiDecorator } from "./Decorators-CY7-4byT.js";
import "./index-CHBBkG1-.js";
import "./iframe-CVbTZ5MX.js";
import "../sb-preview/runtime.js";
import "./appui-react-NJEdfdgZ.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
const ListboxContext = reactExports.createContext({
  onListboxValueChange: (_newValue) => {
  }
});
function makeId(...args) {
  return args.filter((val) => val != null).join("--");
}
function getOptionValueArray(childNodes) {
  return reactExports.Children.toArray(childNodes).filter((node) => reactExports.isValidElement(node) && node.props.value).map(
    (optionNode) => optionNode.props
  );
}
function processKeyboardNavigation(optionValues, itemIndex, key) {
  let keyProcessed = false;
  let newIndex = itemIndex >= 0 ? itemIndex : 0;
  if (key === Key_enum.Key.ArrowDown.valueOf() || key === Key_enum.Key.PageDown.valueOf()) {
    for (let i = itemIndex + 1; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enum.Key.ArrowUp.valueOf() || key === Key_enum.Key.PageUp.valueOf()) {
    for (let i = itemIndex - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enum.Key.Home.valueOf()) {
    for (let i = 0; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enum.Key.End.valueOf()) {
    for (let i = optionValues.length - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  }
  return [newIndex, keyProcessed];
}
function Listbox(props) {
  const {
    ariaLabel,
    ariaLabelledBy,
    id,
    children,
    selectedValue,
    className,
    onListboxValueChange,
    onKeyDown,
    ...otherProps
  } = props;
  const listRef = reactExports.useRef(null);
  const [listId] = reactExports.useState(() => {
    return id ?? Guid.createValue();
  });
  const optionValues = reactExports.useMemo(
    () => getOptionValueArray(children),
    [children]
  );
  const classes = reactExports.useMemo(
    () => cx("core-listbox", className),
    [className]
  );
  const [currentValue, setCurrentValue] = reactExports.useState(selectedValue);
  const [focusValue, setFocusValue] = reactExports.useState(
    currentValue
  );
  reactExports.useEffect(() => {
    setCurrentValue(selectedValue);
    setFocusValue(selectedValue);
  }, [selectedValue]);
  const scrollTopRef = reactExports.useRef(0);
  const handleValueChange = reactExports.useCallback(
    (newValue, isControlOrCommandPressed) => {
      if (newValue !== currentValue) {
        setCurrentValue(newValue);
        setFocusValue(newValue);
        if (onListboxValueChange)
          onListboxValueChange(newValue, isControlOrCommandPressed);
      }
    },
    [setCurrentValue, currentValue, onListboxValueChange]
  );
  const focusOption = reactExports.useCallback(
    (itemIndex) => {
      if (itemIndex >= 0 && itemIndex < optionValues.length) {
        const newSelection = optionValues[itemIndex];
        const listElement = listRef.current;
        const optionToFocus = listElement.querySelector(
          `li[data-value="${newSelection.value}"]`
        );
        if (optionToFocus && listElement) {
          let newScrollTop = listElement.scrollTop;
          if (listElement.scrollHeight > listElement.clientHeight) {
            const scrollBottom = listElement.clientHeight + listElement.scrollTop;
            const elementBottom = optionToFocus.offsetTop + optionToFocus.offsetHeight;
            if (elementBottom > scrollBottom) {
              newScrollTop = elementBottom - listElement.clientHeight;
            } else if (optionToFocus.offsetTop < listElement.scrollTop) {
              newScrollTop = optionToFocus.offsetTop;
            }
            scrollTopRef.current = newScrollTop;
          }
          setFocusValue(newSelection.value);
        }
      }
    },
    [optionValues]
  );
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (optionValues.length < 1) return;
      const itemIndex = void 0 === focusValue ? -1 : optionValues.findIndex(
        (optionValue) => optionValue.value === focusValue
      );
      if (event.key === " ") {
        event.preventDefault();
        if (focusValue)
          handleValueChange(
            focusValue,
            event.getModifierState("Control") || event.getModifierState("Meta")
          );
        return;
      } else {
        const [newItemIndex, keyProcessed] = processKeyboardNavigation(
          optionValues,
          itemIndex,
          event.key
        );
        if (keyProcessed) {
          event.preventDefault();
          focusOption(newItemIndex);
          return;
        }
      }
      if (onKeyDown) onKeyDown(event);
    },
    [focusValue, optionValues, focusOption, onKeyDown, handleValueChange]
  );
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    const list = listRef.current;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (void 0 !== focusValue) {
        const itemIndex = optionValues.findIndex(
          (optionValue) => optionValue.value === focusValue
        );
        focusOption(itemIndex);
      }
    } else {
      list.scrollTop = scrollTopRef.current;
    }
  }, [focusValue, focusOption, optionValues]);
  const handleOnScroll = reactExports.useCallback(
    (_event) => {
      if (listRef.current) scrollTopRef.current = listRef.current.scrollTop;
    },
    []
  );
  const handleOnFocus = reactExports.useCallback(
    (_event) => {
      if (!focusValue || 0 === focusValue.length) {
        if (currentValue) {
          setFocusValue(currentValue);
        } else {
          if (optionValues.length > 0) setFocusValue(optionValues[0].value);
        }
      }
    },
    [currentValue, focusValue, optionValues]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: classes,
      "aria-labelledby": ariaLabel ? void 0 : ariaLabelledBy,
      "aria-label": ariaLabel,
      role: "listbox",
      tabIndex: 0,
      "aria-activedescendant": makeId(currentValue, listId),
      ...otherProps,
      ref: listRef,
      id: listId,
      onKeyDown: handleKeyDown,
      onScroll: handleOnScroll,
      "data-value": currentValue,
      "data-focusvalue": focusValue,
      onFocus: handleOnFocus,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ListboxContext.Provider,
        {
          value: {
            listboxValue: currentValue,
            focusValue,
            listboxId: listId,
            onListboxValueChange: handleValueChange,
            listboxRef: listRef
          },
          children
        }
      )
    }
  );
}
function ListboxItem(props) {
  const { children, value, className, disabled, ...otherProps } = props;
  const { listboxValue, focusValue, listboxId, onListboxValueChange } = reactExports.useContext(ListboxContext);
  const hasFocus = focusValue === value;
  const classes = reactExports.useMemo(
    () => cx("core-listbox-item", hasFocus && "focused", className),
    [className, hasFocus]
  );
  const itemRef = reactExports.useRef(null);
  const isSelected = listboxValue === value;
  const handleClick = reactExports.useCallback(
    (event) => {
      var _a2, _b2;
      event.preventDefault();
      const selectedValue = (_b2 = (_a2 = event.currentTarget) == null ? void 0 : _a2.dataset) == null ? void 0 : _b2.value;
      if (void 0 !== selectedValue) {
        onListboxValueChange(selectedValue, event.ctrlKey);
      }
    },
    [onListboxValueChange]
  );
  const getItemId = reactExports.useCallback(() => {
    return makeId(value, listboxId);
  }, [listboxId, value]);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        "aria-selected": isSelected,
        "aria-disabled": disabled || void 0,
        role: "option",
        className: classes,
        ...otherProps,
        ref: itemRef,
        id: getItemId(),
        "data-value": value,
        onClick: handleClick,
        children
      }
    )
  );
}
Listbox.__docgenInfo = { "description": "Single select `Listbox` component\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.", "methods": [], "displayName": "Listbox", "props": { "id": { "required": false, "tsType": { "name": "string" }, "description": "" }, "selectedValue": { "required": false, "tsType": { "name": "string" }, "description": "" }, "ariaLabel": { "required": false, "tsType": { "name": "any" }, "description": "" }, "ariaLabelledBy": { "required": false, "tsType": { "name": "any" }, "description": "" }, "onListboxValueChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  newValue: ListboxValue,\n  isControlOrCommandPressed?: boolean\n) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "newValue" }, { "type": { "name": "boolean" }, "name": "isControlOrCommandPressed" }], "return": { "name": "void" } } }, "description": "" } } };
ListboxItem.__docgenInfo = { "description": "`ListboxItem` component.\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.", "methods": [], "displayName": "ListboxItem", "props": { "value": { "required": true, "tsType": { "name": "string" }, "description": "The unique item's value." }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "set if item is disabled." } } };
const meta = {
  title: "Deprecated/Listbox",
  component: Listbox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListboxItem, { value: "1", children: "Item 1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListboxItem, { value: "2", children: "Item 2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListboxItem, { value: "3", children: "Item 3" })
    ] })
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <>\n        <ListboxItem value="1">Item 1</ListboxItem>\n        <ListboxItem value="2">Item 2</ListboxItem>\n        <ListboxItem value="3">Item 3</ListboxItem>\n      </>\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
