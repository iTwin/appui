import { j as jsxRuntimeExports, c as classnames } from "./iframe-Dq7NZ5f-.js";
import "./Key.enum-C6kR_Rex.js";
import { aY as ConditionalStringValue, aZ as purify } from "./appui-react-nLGuzzO4.js";
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
  _value;
  /** The current IconSpec according to conditions */
  get value() {
    if (void 0 !== this._value) return this._value;
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
    if (void 0 === conditionalValue) return void 0;
    if (conditionalValue instanceof ConditionalIconItem) {
      const iconItem = conditionalValue;
      return iconItem.value;
    }
    return conditionalValue;
  }
}
function getWebComponentSource(iconSpec) {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }
  return void 0;
}
function Icon(props) {
  const { iconSpec, ...rest } = props;
  const iconSpecValue = useIconSpecValue(iconSpec);
  if (!iconSpec) return void 0;
  const typedValue = getTypedValue(iconSpecValue);
  if (typedValue.type === "css-icon") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "i",
      {
        ...rest,
        className: classnames(
          "icon",
          "core-css-icon",
          typedValue.iconName,
          props.className
        )
      }
    );
  }
  if (typedValue.type === "svg-loader") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "i",
      {
        ...rest,
        className: classnames("icon", "core-svg-icon", props.className),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgLoader, { src: typedValue.src })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "i",
    {
      ...rest,
      className: classnames("icon", "core-svg-icon", props.className),
      style: props.style,
      children: typedValue.node
    }
  );
}
function useIconSpecValue(iconSpec) {
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
function getTypedValue(value) {
  if (typeof value === "string") {
    const webComponentSource = getWebComponentSource(value);
    if (value.startsWith("data:") || value.endsWith(".svg") || webComponentSource) {
      const src = webComponentSource ? webComponentSource : value;
      return {
        type: "svg-loader",
        src
      };
    }
    return {
      type: "css-icon",
      iconName: value
    };
  }
  return {
    type: "react-node",
    node: value
  };
}
function SvgLoader(props) {
  const { src, ...rest } = props;
  const svgLoader = `<svg-loader src="${src}"></svg-loader>`;
  const svgDiv = `<div>${svgLoader}</div>`;
  const sanitizerConfig = {
    ALLOWED_TAGS: ["svg-loader"],
    ADD_URI_SAFE_ATTR: src.startsWith("data:") ? ["src"] : []
  };
  const sanitizedIconString = purify.sanitize(svgDiv, sanitizerConfig);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ...rest,
      dangerouslySetInnerHTML: { __html: sanitizedIconString }
    }
  );
}
Icon.__docgenInfo = { "description": "Icon Functional component displays an icon based on an [[IconSpec]].\n@public\n@deprecated in 4.16.0. Used to render a deprecated {@link IconSpec} type. Use {@link https://itwinui.bentley.com/ iTwinUI Icon} instead.", "methods": [], "displayName": "Icon", "props": { "iconSpec": { "required": false, "tsType": { "name": "union", "raw": "| string\n| ConditionalStringValue\n| React.ReactNode\n| ConditionalIconItem", "elements": [{ "name": "string" }, { "name": "ConditionalStringValue" }, { "name": "ReactReactNode", "raw": "React.ReactNode" }, { "name": "ConditionalIconItem" }] }, "description": "CSS class name or SvgPath for icon. This is optional because it is improperly\nused to extend other interfaces and changing it would break existing API." } }, "composes": ["CommonProps"] };
SvgLoader.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "SvgLoader", "props": { "src": { "required": true, "tsType": { "name": "string" }, "description": "" } } };
export {
  ConditionalIconItem as C,
  Icon as I
};
