import { r as reactExports, j as jsxRuntimeExports, n as reactDomExports, T as ThemeProvider } from "./iframe-BnF7kxuI.js";
import { D as Dialog } from "./Dialog-BtEdehll.js";
import { b as DialogButtonType } from "./Key.enum-B3pThNWo.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-D8WYj5fV.js";
import "./useTranslation-CaOQgx2C.js";
import "./UiCore-C9WXyKH4.js";
class GlobalDialog extends reactExports.Component {
  _container;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  state = {
    parentDocument: null
  };
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
  }
  _handleRefSet = (popupDiv) => {
    const parentDocument = popupDiv?.ownerDocument ?? null;
    if (parentDocument) {
      this._container = parentDocument.createElement("div");
      this._container.id = this.props.identifier !== void 0 ? `dialog-${this.props.identifier}` : "core-dialog";
      let rt = parentDocument.getElementById(
        "core-dialog-root"
      );
      if (!rt) {
        rt = parentDocument.createElement("div");
        rt.id = "core-dialog-root";
        parentDocument.body.appendChild(rt);
      }
      rt.appendChild(this._container);
      this.setState({ parentDocument });
    }
  };
  componentWillUnmount() {
    if (this._container && this._container.parentElement) {
      this._container.parentElement.removeChild(this._container);
    }
  }
  render() {
    const { identifier, ...props } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: this._handleRefSet, children: this.state.parentDocument && reactDomExports.createPortal(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props }),
      this.state.parentDocument.body
    ) });
  }
}
GlobalDialog.__docgenInfo = { "description": "GlobalDialog React component used to display a [[Dialog]] on the top of screen\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI dialog} instead.", "methods": [], "displayName": "GlobalDialog", "props": { "identifier": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["DialogProps"] };
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "core-dialog-root" })
  ] });
};
const meta = {
  title: "Deprecated/GlobalDialog",
  component: GlobalDialog,
  tags: ["autodocs"],
  decorators: [StoryDecorator]
};
const Basic = {
  args: {
    opened: true,
    title: "Title",
    children: "Content",
    buttonCluster: [{
      type: DialogButtonType.Cancel,
      onClick: () => void 0,
      label: "Cancel"
    }, {
      type: DialogButtonType.OK,
      onClick: () => void 0,
      label: "OK"
    }],
    identifier: "my-dialog-1"
  }
};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }],\n    identifier: "my-dialog-1"\n  }\n}',
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
