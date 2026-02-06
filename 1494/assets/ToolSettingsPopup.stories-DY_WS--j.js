import { j as jsxRuntimeExports, r as reactExports } from "./iframe-BmX5H014.js";
import { I as InitializerDecorator } from "./Decorators-BplH5p6g.js";
import { D as DialogLayoutDataProvider, S as StandardTypeNames, P as PropertyChangeStatus } from "./Key.enum-DvCHltQ0.js";
import { U as UiFramework } from "./appui-react-DXkFctUx.js";
import { A as AppUiStory } from "./AppUiStory-Cv85Pvas.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-M2bM1T3-.js";
import "./index-D95LU0cB.js";
import "./blocks-CrcdVEJ9.js";
import "./Utils-C4oq2jmg.js";
const { action } = __STORYBOOK_MODULE_ACTIONS__;
class TestUiDataProvider extends DialogLayoutDataProvider {
  static _sourcePropertyName = "source";
  static _getSourceDescription = () => {
    return {
      name: TestUiDataProvider._sourcePropertyName,
      displayLabel: "Source",
      typename: StandardTypeNames.String
    };
  };
  _sourceValue = {
    value: "unknown"
  };
  _onUpdate = action("onUpdate");
  get source() {
    return this._sourceValue.value;
  }
  set source(option) {
    this._sourceValue.value = option;
  }
  applyUiPropertyChange = (updatedValue) => {
    if (updatedValue.propertyName === TestUiDataProvider._sourcePropertyName) {
      this.source = updatedValue.value.value ? updatedValue.value.value : "";
      this._onUpdate();
    }
  };
  processChangesInUi(properties) {
    if (properties.length > 0) {
      for (const prop of properties) {
        this.applyUiPropertyChange(prop);
      }
    }
    return {
      status: PropertyChangeStatus.Success
    };
  }
  supplyDialogItems() {
    return [{
      value: this._sourceValue,
      property: TestUiDataProvider._getSourceDescription(),
      editorPosition: {
        rowPriority: 1,
        columnIndex: 1
      }
    }];
  }
}
const testDataProvider = new TestUiDataProvider();
const meta = {
  title: "Components/ToolSettingsPopup",
  component: ToolSettingsPopupComponent,
  tags: ["autodocs"],
  decorators: [InitializerDecorator],
  args: {
    dataProvider: testDataProvider,
    location: {
      x: 300,
      y: 200
    },
    offset: {
      x: 0,
      y: 0
    },
    placement: "top"
  }
};
function ToolSettingsPopupComponent({
  dataProvider,
  location,
  offset,
  onCancel,
  placement
}) {
  const containerRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "container-ref", ref: containerRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { onInitialize: async () => {
    UiFramework.openToolSettingsPopup(dataProvider, location, offset, onCancel, placement, containerRef.current ?? void 0);
  } }) });
}
const EscapeClosesPopup = {
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsPopupComponent, { ...props, onCancel: action("onCancel") })
};
EscapeClosesPopup.parameters = {
  ...EscapeClosesPopup.parameters,
  docs: {
    ...EscapeClosesPopup.parameters?.docs,
    source: {
      originalSource: '{\n  render: props => <ToolSettingsPopupComponent {...props} onCancel={action("onCancel")} />\n}',
      ...EscapeClosesPopup.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["EscapeClosesPopup"];
export {
  EscapeClosesPopup,
  __namedExportsOrder,
  meta as default
};
