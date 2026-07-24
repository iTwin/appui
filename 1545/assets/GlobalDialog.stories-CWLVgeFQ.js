import { r as reactExports, j as jsxRuntimeExports, e as reactDomExports, T as ThemeProvider } from "./iframe-D8NJimLr.js";
import { D as Dialog } from "./Dialog-DMLpo0MT.js";
import { b as DialogButtonType } from "./Key.enum-BiZltsZP.js";
import "./preload-helper-UZRgTS1n.js";
import "./DivWithOutsideClick-CAZgJYYG.js";
import "./useTranslation-CpO_Srkx.js";
import "./UiCore-CPEuWbaV.js";
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
GlobalDialog.__docgenInfo = { "description": "GlobalDialog React component used to display a [[Dialog]] on the top of screen\n@public\n@deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/dialog iTwinUI dialog} instead.", "methods": [], "displayName": "GlobalDialog", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS style properties" }, "itemId": { "required": false, "tsType": { "name": "string" }, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id" }, "opened": { "required": true, "tsType": { "name": "boolean" }, "description": "Indicates whether to show dialog or not" }, "resizable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can resize dialog with cursor. Default: false" }, "movable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the user can move dialog with cursor. Default: false" }, "inset": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the content should be inset. Default: true" }, "trapFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the focus should be trapped within the dialog. Default: false" }, "hideHeader": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether the hide the header. Default: false" }, "header": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Override for the header" }, "title": { "required": false, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Title to show in title bar of dialog" }, "footer": { "required": false, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Footer to show at bottom of dialog. Note: will override buttonCluster" }, "buttonCluster": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "DialogButtonDef" }], "raw": "DialogButtonDef[]" }, "description": "List of DialogButtonDef objects specifying buttons and associated onClick events" }, "alignment": { "required": false, "tsType": { "name": "DialogAlignment" }, "description": "Default alignment of dialog." }, "x": { "required": false, "tsType": { "name": "number" }, "description": "Initial x/left position of dialog in px." }, "y": { "required": false, "tsType": { "name": "number" }, "description": "Initial y/top position of dialog in px." }, "onClose": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "onClick event for X button for dialog" }, "onEscape": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "'keyup' event for Esc key" }, "onOutsideClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: MouseEvent) => any", "signature": { "arguments": [{ "type": { "name": "MouseEvent" }, "name": "event" }], "return": { "name": "any" } } }, "description": "Triggered when a click is triggered outside of this dialog." }, "width": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": 'Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%"' }, "height": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "minWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px" }, "minHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 135px" }, "maxWidth": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100%" }, "maxHeight": { "required": false, "tsType": { "name": "union", "raw": "string | number", "elements": [{ "name": "string" }, { "name": "number" }] }, "description": "Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit." }, "modal": { "required": false, "tsType": { "name": "boolean" }, "description": "Whether to show background overlay. Default: true.\n@note Modeless dialogs require an id and an implementation of onModelessPointerDown." }, "modelessId": { "required": false, "tsType": { "name": "string" }, "description": "An id for a modeless dialog" }, "onModelessPointerDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.PointerEvent, id: string) => void", "signature": { "arguments": [{ "type": { "name": "ReactPointerEvent", "raw": "React.PointerEvent" }, "name": "event" }, { "type": { "name": "string" }, "name": "id" }], "return": { "name": "void" } } }, "description": "Pointer Down event handler when modeless (modal = false)" }, "backgroundStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for overlay" }, "titleStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for title" }, "footerStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for footer" }, "contentClassName": { "required": false, "tsType": { "name": "string" }, "description": "Custom CSS class name for the content" }, "contentStyle": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Custom CSS Style for the content" }, "identifier": { "required": false, "tsType": { "name": "string" }, "description": "" } }, "composes": ["Omit"] };
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
