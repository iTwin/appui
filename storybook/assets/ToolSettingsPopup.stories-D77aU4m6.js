var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { I as InitializerDecorator } from "./Decorators-CU-vvLY2.js";
import { D as DialogLayoutDataProvider, S as StandardTypeNames, P as PropertyChangeStatus } from "./Key.enum-BB2gw-WQ.js";
import { U as UiFramework } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { A as AppUiStory } from "./AppUiStory-oEM4RWbs.js";
import { a as action } from "./chunk-WFFRPTHA-B_pzO8uN.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
import "./index-n0FlVOjm.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-DuWsADYF.js";
import "./preview-errors-C1TokqVJ.js";
const _TestUiDataProvider = class _TestUiDataProvider extends DialogLayoutDataProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "_sourceValue", {
      value: "unknown"
    });
    __publicField(this, "_onUpdate", action("onUpdate"));
    __publicField(this, "applyUiPropertyChange", (updatedValue) => {
      if (updatedValue.propertyName === _TestUiDataProvider._sourcePropertyName) {
        this.source = updatedValue.value.value ? updatedValue.value.value : "";
        this._onUpdate();
      }
    });
  }
  get source() {
    return this._sourceValue.value;
  }
  set source(option) {
    this._sourceValue.value = option;
  }
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
      property: _TestUiDataProvider._getSourceDescription(),
      editorPosition: {
        rowPriority: 1,
        columnIndex: 1
      }
    }];
  }
};
__publicField(_TestUiDataProvider, "_sourcePropertyName", "source");
__publicField(_TestUiDataProvider, "_getSourceDescription", () => {
  return {
    name: _TestUiDataProvider._sourcePropertyName,
    displayLabel: "Source",
    typename: StandardTypeNames.String
  };
});
let TestUiDataProvider = _TestUiDataProvider;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    id: "container-ref",
    ref: containerRef,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, {
      onInitialize: async () => {
        UiFramework.openToolSettingsPopup(dataProvider, location, offset, onCancel, placement, containerRef.current ?? void 0);
      }
    })
  });
}
const EscapeClosesPopup = {
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToolSettingsPopupComponent, {
    ...props,
    onCancel: action("onCancel")
  })
};
EscapeClosesPopup.parameters = {
  ...EscapeClosesPopup.parameters,
  docs: {
    ...(_a = EscapeClosesPopup.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  render: props => <ToolSettingsPopupComponent {...props} onCancel={action("onCancel")} />\n}',
      ...(_c = (_b = EscapeClosesPopup.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["EscapeClosesPopup"];
export {
  EscapeClosesPopup,
  __namedExportsOrder,
  meta as default
};
