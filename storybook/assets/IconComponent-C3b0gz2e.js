import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-BB2gw-WQ.js";
import { ax as ConditionalStringValue, ay as purify, az as DOMPurifyNS } from "./DefaultToolSettingsProvider-B6B80iEN.js";
class ConditionalIconItem {
  /** Constructor for ConditionalIconItem
   * @param iconGetter Function to retrieve the icon that matches the condition. Returns an IconSpec.
   * @param syncEventIds The array of event ids to be monitored. These events are triggered when the condition(s) that control the icon change.
   * @param value The default IconSpec. If this is not specified, the function is run to get the initial value.
   */
  constructor(iconGetter, syncEventIds, value) {
    this.iconGetter = iconGetter;
    this.syncEventIds = syncEventIds;
    this._value = value;
  }
  /** The current IconSpec according to conditions */
  get value() {
    if (void 0 !== this._value)
      return this._value;
    this._value = this.iconGetter();
    return this._value;
  }
  /** Called to update the value by running the iconGetter */
  refresh() {
    const newValue = this.iconGetter();
    if (newValue !== this._value) {
      this._value = newValue;
      return true;
    }
    return false;
  }
  /** A helper function that updates the IconSpec value when the specified events are triggered */
  static refreshValue(conditionalValue, eventIds) {
    if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalIconItem))
      return false;
    const iconItem = conditionalValue;
    if (iconItem.syncEventIds.some(
      (value) => eventIds.has(value.toLowerCase())
    ))
      return iconItem.refresh();
    return false;
  }
  /** helper function to get the iconSpec from a ConditionIconItem as IconSpec | undefined*/
  static getValue(conditionalValue) {
    if (void 0 === conditionalValue)
      return void 0;
    if (conditionalValue instanceof ConditionalIconItem) {
      const iconItem = conditionalValue;
      return iconItem.value;
    }
    return conditionalValue;
  }
}
try {
  ConditionalIconItem.displayName = "ConditionalIconItem";
  ConditionalIconItem.__docgenInfo = { "description": "Class used to return an icon. The icon is variable and can be changed in response to subscribed event ids.", "displayName": "ConditionalIconItem", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function getWebComponentSource(iconSpec) {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }
  return void 0;
}
function Icon(props) {
  if (!props.iconSpec)
    return null;
  const iconSpecValue = getIconSpecValue(props.iconSpec);
  if (typeof iconSpecValue === "string") {
    const iconString = iconSpecValue;
    const webComponentString = getWebComponentSource(iconString);
    if (iconString.startsWith("data:") || iconString.endsWith(".svg") || webComponentString) {
      const definitiveIconString = webComponentString ? webComponentString : iconString;
      const svgLoader = `<svg-loader src="${definitiveIconString}"></svg-loader>`;
      const svgDiv = `<div>${svgLoader}</div>`;
      const sanitizer = purify ?? DOMPurifyNS;
      const sanitizerConfig = {
        ALLOWED_TAGS: ["svg-loader"],
        ADD_URI_SAFE_ATTR: definitiveIconString.startsWith("data:") ? ["src"] : []
      };
      const sanitizedIconString = sanitizer.sanitize(svgDiv, sanitizerConfig);
      const webComponentNode = (
        // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
        // eslint-disable-next-line jam3/no-sanitizer-with-danger
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: sanitizedIconString } })
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: classnames("icon", "core-svg-icon", props.className), children: webComponentNode });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "i",
      {
        className: classnames("icon", iconString, props.className),
        style: props.style
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "i",
    {
      className: classnames("icon", "core-svg-icon", props.className),
      style: props.style,
      children: iconSpecValue
    }
  );
}
function getIconSpecValue(iconSpec) {
  let value = iconSpec;
  while (true) {
    if (value instanceof ConditionalIconItem) {
      value = ConditionalIconItem.getValue(value);
      continue;
    }
    if (value instanceof ConditionalStringValue) {
      value = ConditionalStringValue.getValue(value);
      break;
    }
    break;
  }
  return value;
}
try {
  Icon.displayName = "Icon";
  Icon.__docgenInfo = { "description": "Icon Functional component displays an icon based on an [[IconSpec]].", "displayName": "Icon", "props": { "iconSpec": { "defaultValue": null, "description": "CSS class name or SvgPath for icon. This is optional because it is improperly\nused to extend other interfaces and changing it would break existing API.", "name": "iconSpec", "required": false, "type": { "name": "IconSpec" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  ConditionalIconItem as C,
  Icon as I
};
