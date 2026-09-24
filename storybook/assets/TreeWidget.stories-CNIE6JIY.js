import { a as __toESM, n as __esmMin, r as __exportAll } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { a as useTreeEventsHandler, c as useTreeNodeLoader, dn as SelectionMode, n as ControlledTree, o as useTreeModel, s as useTreeModelSource, t as init_components_react } from "./components-react-CHXB-2a9.js";
import { P as PropertyRecord, r as init_appui_abstract } from "./Key.enum-1tPeVDEH.js";
import { Nn as init_core_frontend, Wn as IModelApp, lt as UiFramework, t as init_appui_react } from "./appui-react-B4bFXMth.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-DbQYdZs9.js";
//#region ../../ui/components-react/lib/components-react/tree/SimpleTreeDataProvider.js
var SimpleTreeDataProvider;
function init_SimpleTreeDataProvider() {
	return (init_SimpleTreeDataProvider = __esmMin((() => {
		SimpleTreeDataProvider = class {
			_hierarchy;
			constructor(hierarchy) {
				this._hierarchy = hierarchy;
			}
			getNodesByParentId(parentId, pageOptions) {
				const nodes = this._hierarchy.get(parentId);
				if (!nodes) return [];
				if (!pageOptions) return [...nodes];
				let pageEndIndex;
				if (pageOptions.size !== void 0 && pageOptions.size !== 0) {
					pageEndIndex = pageOptions.size;
					pageEndIndex += pageOptions.start ? pageOptions.start : 0;
				}
				return nodes.slice(pageOptions.start, pageEndIndex);
			}
			async getNodes(parent, pageOptions) {
				return this.getNodesByParentId(parent ? parent.id : void 0, pageOptions);
			}
			async getNodesCount(parent) {
				return this.getNodesByParentId(parent ? parent.id : void 0).length;
			}
		};
	})))();
}
//#endregion
//#region src/components/TreeWidget.stories.tsx
var TreeWidget_stories_exports = /* @__PURE__ */ __exportAll({
	Basic: () => Basic,
	__namedExportsOrder: () => __namedExportsOrder,
	default: () => meta
});
function TreeWidgetComponent(props) {
	const [initialized, setInitialized] = import_react.useState(false);
	import_react.useEffect(() => {
		(async function() {
			await IModelApp.startup();
			await UiFramework.initialize(void 0);
			setInitialized(true);
		})();
	}, []);
	const [dataProvider] = import_react.useState(() => new SimpleTreeDataProvider(hierarchyTest));
	const modelSource = useTreeModelSource(dataProvider);
	const nodeLoader = useTreeNodeLoader(dataProvider, modelSource);
	const eventsHandler = useTreeEventsHandler(import_react.useMemo(() => ({
		modelSource,
		nodeLoader
	}), [modelSource, nodeLoader]));
	const defaultProps = {
		model: useTreeModel(modelSource),
		nodeLoader,
		eventsHandler,
		selectionMode: SelectionMode.Single,
		width: props.width,
		height: props.height
	};
	if (!initialized) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlledTree, { ...defaultProps });
}
var import_react, import_jsx_runtime, meta, Basic, createTreeNodeItem, createHierarchy, hierarchyTest, __namedExportsOrder;
function init_TreeWidget_stories() {
	return (init_TreeWidget_stories = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_abstract();
		init_appui_react();
		init_components_react();
		init_core_frontend();
		init_Decorators();
		import_jsx_runtime = require_jsx_runtime();
		meta = {
			title: "Components/ControlledTree",
			component: TreeWidgetComponent,
			tags: ["autodocs"],
			decorators: [AppUiDecorator]
		};
		Basic = {
			args: {
				width: 300,
				height: 300
			},
			render: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeWidgetComponent, { ...props })
		};
		createTreeNodeItem = (id, parentId) => {
			return {
				id,
				parentId,
				label: PropertyRecord.fromString(id, id)
			};
		};
		createHierarchy = (rootNodeCount, childrenNodeCount) => {
			const hierarchy = /* @__PURE__ */ new Map();
			const rootNodes = [];
			for (let i = 0; i < rootNodeCount; i++) {
				rootNodes[i] = createTreeNodeItem(`Node ${i.toString()}`);
				const nodes = [];
				if (i !== 1) {
					for (let x = 0; x < childrenNodeCount; x++) {
						nodes[x] = createTreeNodeItem(`Node ${i.toString()}-${x.toString()}`, rootNodes[i].id);
						const innerNodes = [];
						if (x !== 1) {
							for (let y = 0; y < 3; y++) innerNodes[y] = createTreeNodeItem(`Node ${i}-${x}-${y}`, rootNodes[i].id);
							nodes[x].children = innerNodes;
						}
					}
					rootNodes[i].children = nodes;
					hierarchy.set(rootNodes[i].id, nodes);
				}
			}
			hierarchy.set(void 0, rootNodes);
			return hierarchy;
		};
		hierarchyTest = createHierarchy(3, 3);
		Basic.parameters = {
			...Basic.parameters,
			docs: {
				...Basic.parameters?.docs,
				source: {
					originalSource: "{\n  args: {\n    width: 300,\n    height: 300\n  },\n  render: props => <TreeWidgetComponent {...props} />\n}",
					...Basic.parameters?.docs?.source
				}
			}
		};
		__namedExportsOrder = ["Basic"];
	})))();
}
//#endregion
export { init_TreeWidget_stories as n, init_SimpleTreeDataProvider as r, TreeWidget_stories_exports as t };
