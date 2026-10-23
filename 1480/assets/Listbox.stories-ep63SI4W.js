import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
import { G as Guid, K as Key_enumExports } from "./Key.enum-YmMvjtrc.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import "./preload-helper-UZRgTS1n.js";
import "./appui-react-glMK-yaN.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
const ListboxContext = reactExports.createContext({
  onListboxValueChange: (_newValue) => {
  }
});
function makeId(...args) {
  return args.filter((val) => val != null).join("--");
}
function getOptionValueArray(childNodes) {
  return reactExports.Children.toArray(childNodes).filter(
    (node) => reactExports.isValidElement(node) && !!node.props.value
  ).map((optionNode) => optionNode.props);
}
function processKeyboardNavigation(optionValues, itemIndex, key) {
  let keyProcessed = false;
  let newIndex = itemIndex >= 0 ? itemIndex : 0;
  if (key === Key_enumExports.Key.ArrowDown.valueOf() || key === Key_enumExports.Key.PageDown.valueOf()) {
    for (let i = itemIndex + 1; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.ArrowUp.valueOf() || key === Key_enumExports.Key.PageUp.valueOf()) {
    for (let i = itemIndex - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.Home.valueOf()) {
    for (let i = 0; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.End.valueOf()) {
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
    () => classnames("core-listbox", className),
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
    () => classnames("core-listbox-item", hasFocus && "focused", className),
    [className, hasFocus]
  );
  const itemRef = reactExports.useRef(null);
  const isSelected = listboxValue === value;
  const handleClick = reactExports.useCallback(
    (event) => {
      event.preventDefault();
      const selectedValue = event.currentTarget?.dataset?.value;
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <>\n        <ListboxItem value="1">Item 1</ListboxItem>\n        <ListboxItem value="2">Item 2</ListboxItem>\n        <ListboxItem value="3">Item 3</ListboxItem>\n      </>\n  }\n}',
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
