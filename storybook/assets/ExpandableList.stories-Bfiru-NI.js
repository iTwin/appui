import { r as reactExports, j as jsxRuntimeExports, c as classnames } from "./iframe-BENp4d1r.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { E as ExpandableBlock } from "./appui-react-CEufDDhs.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-CnwI7CFN.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
class ExpandableList extends reactExports.PureComponent {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
    this.state = { activeBlock: this.props.defaultActiveBlock };
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static defaultProps = {
    singleExpandOnly: false,
    defaultActiveBlock: 0
  };
  // set active block
  _handleBlockToggle = (index, onToggle) => {
    let activeBlock = index;
    if (this.props.singleIsCollapsible && index === this.state.activeBlock)
      activeBlock = -1;
    this.setState({ activeBlock });
    if (onToggle) {
      onToggle(activeBlock === index);
    }
  };
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
}
ExpandableList.__docgenInfo = { "description": "ExpandableList React component is a container for ExpandableBlock components.\n@public\n@deprecated in 4.12.0. Use a custom container and manage {@link https://itwinui.bentley.com/docs/expandableblock expandable block} state manually.", "methods": [], "displayName": "ExpandableList", "props": { "defaultActiveBlock": { "required": false, "tsType": { "name": "number" }, "description": "Index of the default active block", "defaultValue": { "value": "0", "computed": false } }, "singleExpandOnly": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to allow only one expanded block", "defaultValue": { "value": "false", "computed": false } }, "singleIsCollapsible": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the single expanded block is collapsible" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } }, "composes": ["CommonProps"] };
const meta = {
  title: "Deprecated/ExpandableList",
  component: ExpandableList,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, { title: "Block 1", children: "Content 1" }), /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, { title: "Block 2", children: "Content 2" }), /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock, { title: "Block 3", children: "Content 3" })]
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    children: [<ExpandableBlock title="Block 1">Content 1</ExpandableBlock>, <ExpandableBlock title="Block 2">Content 2</ExpandableBlock>, <ExpandableBlock title="Block 3">Content 3</ExpandableBlock>]\n  }\n}',
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
