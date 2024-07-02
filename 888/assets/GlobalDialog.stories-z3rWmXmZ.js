var _a, _b, _c;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { r as reactExports } from "./index-DM9bPmif.js";
import { r as reactDomExports } from "./index-EDRsojbr.js";
import { D as Dialog } from "./Dialog-GotAGQFX.js";
import { D as DialogButtonType, T as ThemeProvider } from "./Key.enum-BpJjJDFT.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./DivWithOutsideClick-DwNV55q9.js";
import "./useTranslation-DTiiDgd7.js";
import "./UiCore-CuzqhBtX.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./inheritsLoose-CwB_PDSN.js";
class GlobalDialog extends reactExports.Component {
  // eslint-disable-next-line deprecation/deprecation
  constructor(props) {
    super(props);
    this.state = {
      parentDocument: null
    };
    this._handleRefSet = (popupDiv) => {
      const parentDocument = (popupDiv == null ? void 0 : popupDiv.ownerDocument) ?? null;
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
  }
  componentWillUnmount() {
    if (this._container && this._container.parentElement) {
      this._container.parentElement.removeChild(this._container);
    }
  }
  render() {
    const { identifier, ...props } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: this._handleRefSet, children: this.state.parentDocument && reactDomExports.createPortal(
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props }),
      this.state.parentDocument.body
    ) });
  }
}
try {
  GlobalDialog.displayName = "GlobalDialog";
  GlobalDialog.__docgenInfo = { "description": "GlobalDialog React component used to display a [[Dialog]] on the top of screen", "displayName": "GlobalDialog", "props": { "identifier": { "defaultValue": null, "description": "", "name": "identifier", "required": false, "type": { "name": "string" } }, "opened": { "defaultValue": null, "description": "Indicates whether to show dialog or not", "name": "opened", "required": true, "type": { "name": "boolean" } }, "resizable": { "defaultValue": null, "description": "Indicates whether the user can resize dialog with cursor. Default: false", "name": "resizable", "required": false, "type": { "name": "boolean" } }, "movable": { "defaultValue": null, "description": "Indicates whether the user can move dialog with cursor. Default: false", "name": "movable", "required": false, "type": { "name": "boolean" } }, "inset": { "defaultValue": null, "description": "Indicates whether the content should be inset. Default: true", "name": "inset", "required": false, "type": { "name": "boolean" } }, "trapFocus": { "defaultValue": null, "description": "Indicates whether the focus should be trapped within the dialog. Default: false", "name": "trapFocus", "required": false, "type": { "name": "boolean" } }, "hideHeader": { "defaultValue": null, "description": "Whether the hide the header. Default: false", "name": "hideHeader", "required": false, "type": { "name": "boolean" } }, "header": { "defaultValue": null, "description": "Override for the header", "name": "header", "required": false, "type": { "name": "ReactNode" } }, "title": { "defaultValue": null, "description": "Title to show in title bar of dialog", "name": "title", "required": false, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "footer": { "defaultValue": null, "description": "Footer to show at bottom of dialog. Note: will override buttonCluster", "name": "footer", "required": false, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "buttonCluster": { "defaultValue": null, "description": "List of DialogButtonDef objects specifying buttons and associated onClick events", "name": "buttonCluster", "required": false, "type": { "name": "DialogButtonDef[]" } }, "alignment": { "defaultValue": null, "description": "Default alignment of dialog.", "name": "alignment", "required": false, "type": { "name": "enum", "value": [{ "value": '"top-left"' }, { "value": '"top"' }, { "value": '"top-right"' }, { "value": '"left"' }, { "value": '"center"' }, { "value": '"right"' }, { "value": '"bottom-left"' }, { "value": '"bottom"' }, { "value": '"bottom-right"' }] } }, "x": { "defaultValue": null, "description": "Initial x/left position of dialog in px.", "name": "x", "required": false, "type": { "name": "number" } }, "y": { "defaultValue": null, "description": "Initial y/top position of dialog in px.", "name": "y", "required": false, "type": { "name": "number" } }, "onClose": { "defaultValue": null, "description": "onClick event for X button for dialog", "name": "onClose", "required": false, "type": { "name": "(() => void)" } }, "onEscape": { "defaultValue": null, "description": "'keyup' event for Esc key", "name": "onEscape", "required": false, "type": { "name": "(() => void)" } }, "onOutsideClick": { "defaultValue": null, "description": "Triggered when a click is triggered outside of this dialog.", "name": "onOutsideClick", "required": false, "type": { "name": "((event: MouseEvent) => any)" } }, "width": { "defaultValue": null, "description": 'Initial width of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: "50%"', "name": "width", "required": false, "type": { "name": "string | number" } }, "height": { "defaultValue": null, "description": "Initial height of dialog. Displayed in px if value is a number; otherwise, displayed in specified CSS unit.", "name": "height", "required": false, "type": { "name": "string | number" } }, "minWidth": { "defaultValue": null, "description": "Minimum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 300px", "name": "minWidth", "required": false, "type": { "name": "string | number" } }, "minHeight": { "defaultValue": null, "description": "Minimum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 135px", "name": "minHeight", "required": false, "type": { "name": "string | number" } }, "maxWidth": { "defaultValue": null, "description": "Maximum width that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit. Default: 100%", "name": "maxWidth", "required": false, "type": { "name": "string | number" } }, "maxHeight": { "defaultValue": null, "description": "Maximum height that the dialog may be resized to. Displayed in px if value is a number; otherwise, displayed in specified CSS unit.", "name": "maxHeight", "required": false, "type": { "name": "string | number" } }, "modal": { "defaultValue": null, "description": "Whether to show background overlay. Default: true.\n@note Modeless dialogs require an id and an implementation of onModelessPointerDown.", "name": "modal", "required": false, "type": { "name": "boolean" } }, "modelessId": { "defaultValue": null, "description": "An id for a modeless dialog", "name": "modelessId", "required": false, "type": { "name": "string" } }, "onModelessPointerDown": { "defaultValue": null, "description": "Pointer Down event handler when modeless (modal = false)", "name": "onModelessPointerDown", "required": false, "type": { "name": "((event: PointerEvent<Element>, id: string) => void)" } }, "backgroundStyle": { "defaultValue": null, "description": "Custom CSS Style for overlay", "name": "backgroundStyle", "required": false, "type": { "name": "CSSProperties" } }, "titleStyle": { "defaultValue": null, "description": "Custom CSS Style for title", "name": "titleStyle", "required": false, "type": { "name": "CSSProperties" } }, "footerStyle": { "defaultValue": null, "description": "Custom CSS Style for footer", "name": "footerStyle", "required": false, "type": { "name": "CSSProperties" } }, "contentClassName": { "defaultValue": null, "description": "Custom CSS class name for the content", "name": "contentClassName", "required": false, "type": { "name": "string" } }, "contentStyle": { "defaultValue": null, "description": "Custom CSS Style for the content", "name": "contentStyle", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const StoryDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      id: "core-dialog-root"
    })]
  });
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
    ...(_a = Basic.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    opened: true,\n    title: "Title",\n    children: "Content",\n    buttonCluster: [{\n      type: DialogButtonType.Cancel,\n      onClick: () => undefined,\n      label: "Cancel"\n    }, {\n      type: DialogButtonType.OK,\n      onClick: () => undefined,\n      label: "OK"\n    }],\n    identifier: "my-dialog-1"\n  }\n}',
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
