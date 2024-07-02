var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { c as classnames } from "./Key.enum-Nky5yUvk.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { A as AppUiDecorator } from "./Decorators-CXFrraVc.js";
import { E as ExpandableBlock } from "./DefaultToolSettingsProvider-BeaL6ll4.js";
import "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
import "./index-EDRsojbr.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
const _ExpandableList = class _ExpandableList extends reactExports.PureComponent {
  // eslint-disable-next-line deprecation/deprecation
  constructor(props) {
    super(props);
    this._handleBlockToggle = (index, onToggle) => {
      let activeBlock = index;
      if (this.props.singleIsCollapsible && index === this.state.activeBlock)
        activeBlock = -1;
      this.setState({ activeBlock });
      if (onToggle) {
        onToggle(activeBlock === index);
      }
    };
    this.state = { activeBlock: this.props.defaultActiveBlock };
  }
  renderBlocks() {
    return reactExports.Children.map(this.props.children, (child, i) => {
      return reactExports.cloneElement(child, {
        key: i,
        isExpanded: this.props.singleExpandOnly ? i === this.state.activeBlock : child.props.isExpanded,
        onToggle: this._handleBlockToggle.bind(this, i, child.props.onToggle)
      });
    });
  }
  /** @internal */
  // eslint-disable-next-line deprecation/deprecation
  componentDidUpdate(prevProps) {
    if (this.props.defaultActiveBlock !== prevProps.defaultActiveBlock && this.props.defaultActiveBlock !== this.state.activeBlock) {
      this.setState((_, props) => ({ activeBlock: props.defaultActiveBlock }));
    }
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames(
          "uicore-expandable-blocks-list",
          this.props.className
        ),
        style: this.props.style,
        children: this.renderBlocks()
      }
    );
  }
};
_ExpandableList.defaultProps = {
  singleExpandOnly: false,
  defaultActiveBlock: 0
};
let ExpandableList = _ExpandableList;
try {
  ExpandableList.displayName = "ExpandableList";
  ExpandableList.__docgenInfo = { "description": "ExpandableList React component is a container for ExpandableBlock components.", "displayName": "ExpandableList", "props": { "defaultActiveBlock": { "defaultValue": { value: "0" }, "description": "Index of the default active block", "name": "defaultActiveBlock", "required": false, "type": { "name": "number" } }, "singleExpandOnly": { "defaultValue": { value: "false" }, "description": "Indicates whether to allow only one expanded block", "name": "singleExpandOnly", "required": false, "type": { "name": "boolean" } }, "singleIsCollapsible": { "defaultValue": null, "description": "Indicates whether the single expanded block is collapsible", "name": "singleIsCollapsible", "required": false, "type": { "name": "boolean" } }, "children": { "defaultValue": null, "description": "Content", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const meta = {
  title: "Deprecated/ExpandableList",
  component: ExpandableList,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, {
      title: "Block 1",
      children: "Content 1"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, {
      title: "Block 2",
      children: "Content 2"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, {
      title: "Block 3",
      children: "Content 3"
    })]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    children: [<ExpandableBlock title="Block 1">Content 1</ExpandableBlock>, <ExpandableBlock title="Block 2">Content 2</ExpandableBlock>, <ExpandableBlock title="Block 3">Content 3</ExpandableBlock>]\n  }\n}',
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
