import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { N as ExpandableBlock, i as init_esm, qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region ../../ui/core-react/src/core-react/expandable/ExpandableList.tsx
var import_classnames, import_react, import_jsx_runtime$1, ExpandableList;
var init_ExpandableList = __esmMin((() => {
	import_classnames = /* @__PURE__ */ __toESM(require_classnames(), 1);
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	import_jsx_runtime$1 = require_jsx_runtime();
	ExpandableList = class extends import_react.PureComponent {
		constructor(props) {
			super(props);
			this.state = { activeBlock: this.props.defaultActiveBlock };
		}
		static defaultProps = {
			singleExpandOnly: false,
			defaultActiveBlock: 0
		};
		_handleBlockToggle = (index, onToggle) => {
			let activeBlock = index;
			if (this.props.singleIsCollapsible && index === this.state.activeBlock) activeBlock = -1;
			this.setState({ activeBlock });
			if (onToggle) onToggle(activeBlock === index);
		};
		renderBlocks() {
			return import_react.Children.map(this.props.children, (child, i) => {
				return import_react.cloneElement(child, {
					key: i,
					isExpanded: this.props.singleExpandOnly ? i === this.state.activeBlock : child.props.isExpanded,
					onToggle: this._handleBlockToggle.bind(this, i, child.props.onToggle)
				});
			});
		}
		/** @internal */
		componentDidUpdate(prevProps) {
			if (this.props.defaultActiveBlock !== prevProps.defaultActiveBlock && this.props.defaultActiveBlock !== this.state.activeBlock) this.setState((_, props) => ({ activeBlock: props.defaultActiveBlock }));
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
				className: (0, import_classnames.default)("uicore-expandable-blocks-list", this.props.className),
				style: this.props.style,
				children: this.renderBlocks()
			});
		}
	};
	ExpandableList.__docgenInfo = {
		"description": "ExpandableList React component is a container for ExpandableBlock components.\n@public\n@deprecated in 4.12.0. Use a custom container and manage {@link https://itwinui.bentley.com/docs/expandableblock expandable block} state manually.",
		"methods": [],
		"displayName": "ExpandableList",
		"props": {
			"className": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Custom CSS class name"
			},
			"style": {
				"required": false,
				"tsType": {
					"name": "ReactCSSProperties",
					"raw": "React.CSSProperties"
				},
				"description": "Custom CSS style properties"
			},
			"itemId": {
				"required": false,
				"tsType": { "name": "string" },
				"description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id"
			},
			"defaultActiveBlock": {
				"required": false,
				"tsType": { "name": "number" },
				"description": "Index of the default active block",
				"defaultValue": {
					"value": "0",
					"computed": false
				}
			},
			"singleExpandOnly": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether to allow only one expanded block",
				"defaultValue": {
					"value": "false",
					"computed": false
				}
			},
			"singleIsCollapsible": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Indicates whether the single expanded block is collapsible"
			},
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": "Content"
			}
		}
	};
}));
//#endregion
//#region src/deprecated/ExpandableList.stories.tsx
var import_jsx_runtime, meta, Basic, __namedExportsOrder;
//#endregion
__esmMin((() => {
	init_ExpandableList();
	init_esm();
	init_Decorators();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Deprecated/ExpandableList",
		component: ExpandableList,
		tags: ["autodocs"],
		decorators: [AppUiDecorator]
	};
	Basic = { args: { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableBlock, {
			title: "Block 1",
			children: "Content 1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableBlock, {
			title: "Block 2",
			children: "Content 2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpandableBlock, {
			title: "Block 3",
			children: "Content 3"
		})
	] } };
	Basic.parameters = {
		...Basic.parameters,
		docs: {
			...Basic.parameters?.docs,
			source: {
				originalSource: "{\n  args: {\n    children: [<ExpandableBlock title=\"Block 1\">Content 1</ExpandableBlock>, <ExpandableBlock title=\"Block 2\">Content 2</ExpandableBlock>, <ExpandableBlock title=\"Block 3\">Content 3</ExpandableBlock>]\n  }\n}",
				...Basic.parameters?.docs?.source
			}
		}
	};
	__namedExportsOrder = ["Basic"];
}))();
export { Basic, __namedExportsOrder, meta as default };
