import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import { y as ConditionalStringValue, c as classnames, z as purify, D as DOMPurifyNS } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
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
  /** A work-around for instanceOf
   * @internal
   */
  static isConditionalIconItem(item) {
    if (!item || typeof item !== "object")
      return false;
    const itemPrototype = Object.getPrototypeOf(item);
    if (itemPrototype.constructor.name !== "ConditionalIconItem")
      return false;
    return true;
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
    if (void 0 === conditionalValue || !ConditionalIconItem.isConditionalIconItem(conditionalValue))
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
    if (ConditionalIconItem.isConditionalIconItem(conditionalValue)) {
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
  const iconString = typeof props.iconSpec === "string" || props.iconSpec instanceof ConditionalStringValue ? ConditionalStringValue.getValue(props.iconSpec) : void 0;
  if (iconString) {
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
  if (ConditionalIconItem.isConditionalIconItem(props.iconSpec)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "i",
      {
        className: classnames("icon", "core-svg-icon", props.className),
        style: props.style,
        children: ConditionalIconItem.getValue(props.iconSpec)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "i",
    {
      className: classnames("icon", "core-svg-icon", props.className),
      style: props.style,
      children: props.iconSpec instanceof ConditionalStringValue ? void 0 : props.iconSpec
    }
  );
}
try {
  Icon.displayName = "Icon";
  Icon.__docgenInfo = { "description": "Icon Functional component displays an icon based on an [[IconSpec]].", "displayName": "Icon", "props": { "iconSpec": { "defaultValue": null, "description": "CSS class name or SvgPath for icon. This is optional because it is improperly\nused to extend other interfaces and changing it would break existing API.", "name": "iconSpec", "required": false, "type": { "name": "IconSpec" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  Icon as I
};
