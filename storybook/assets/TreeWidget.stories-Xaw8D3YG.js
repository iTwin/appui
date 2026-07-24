import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { An as IModelApp, st as UiFramework, t as init_appui_react, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
import { P as PropertyRecord, r as init_appui_abstract } from "./Key.enum-DhBIjxOv.js";
import { a as useTreeEventsHandler, c as useTreeNodeLoader, gn as SelectionMode, n as ControlledTree, o as useTreeModel, s as useTreeModelSource, t as init_components_react, v as SimpleTreeDataProvider } from "./components-react-DigDa1CF.js";
import { r as init_Decorators, t as AppUiDecorator } from "./Decorators-CA-ZE0kv.js";
//#region src/components/TreeWidget.stories.tsx
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
//#endregion
__esmMin((() => {
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
}))();
export { Basic, __namedExportsOrder, meta as default };
