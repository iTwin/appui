import { L as Logger, R as RelativePosition, B as Button } from "./Key.enum-BlUwKc_n.js";
import { ca as useDraggedItem, U as UiFramework, cb as Timer, cc as useCursorInformationStore, cd as CursorPopupManager, ce as CursorInformation, b7 as Point, H as Icon, R as Text, cf as Dialog, bg as TitleBar, cg as UiStateStorageContext, G as useTranslation, ch as useActiveTool, ci as UiStateStorageStatus, M as MessageManager, cj as ProcessDetector, bf as StatusBarPopover, ck as StatusBarDialog, b9 as SvgClose, cl as SvgPin, h as ToggleSwitch, cm as ToolAssistanceInputMethod, f as ToolAssistanceImage, cn as FillCentered, bm as SvgAdd } from "./appui-react-CxqBCL1K.js";
import { r as reactExports, c as classnames } from "./iframe-MZ9GDAUV.js";
import { T as Tabs } from "./Tabs-B0G2K9Ma.js";
const SvgCursorClick = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M2.5 5h3a.5.5 0 010 1h-3a.5.5 0 010-1zm5-5a.5.5 0 01.5.5v3a.5.5 0 11-1 0v-3a.5.5 0 01.5-.5zM3.17 9.85a.59.59 0 010-.8l1.74-1.87a.5.5 0 01.74 0 .59.59 0 010 .8L3.91 9.85a.5.5 0 01-.74 0zm.74-8.67L5.65 3a.59.59 0 010 .8.5.5 0 01-.74 0L3.17 2a.59.59 0 010-.8.5.5 0 01.74-.02zm7.95 0a.59.59 0 010 .8l-1.74 1.87a.5.5 0 01-.74 0 .59.59 0 010-.8l1.74-1.87a.5.5 0 01.74 0zM9.5 5h3a.5.5 0 010 1h-3a.5.5 0 010-1zm-2.37 8.5a.24.24 0 00.27 0l1.89-.81 1.23 3.1a.28.28 0 00.27.18h.12l1.09-.46a.32.32 0 00.16-.4L10.92 12l1.89-.81A.3.3 0 0013 11a.31.31 0 00-.08-.28L7.5 5.06A.28.28 0 007.19 5a.3.3 0 00-.19.28v8a.32.32 0 00.13.22z" })
  );
};
const SvgGestureOneFingerDrag = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M7.018 7H1V1h8v2.002L9.016 3a1.973 1.973 0 01.984.27V0H0v8h7.018z", opacity: 0.55 }),
    reactExports.createElement("path", { d: "M16 10.16a1.05 1.05 0 00-1.084-1.016 1.027 1.027 0 00-.907.491v-.034a1.063 1.063 0 00-1.084-1.032 1.051 1.051 0 00-.907.474v-.017a1.063 1.063 0 00-1.084-1.032 1.05 1.05 0 00-.906.474l-.013.018V5a.999.999 0 10-1.997 0v6.281a.12.12 0 01-.128-.035l-1.068-1a1.084 1.084 0 00-1.343-.115.998.998 0 00-.447.689.952.952 0 00.24.787l2.635 3.032A3.942 3.942 0 0010.921 16h1.635a3.472 3.472 0 002.428-.967A3.175 3.175 0 0016 12.72z" })
  );
};
const SvgGestureOneFingerTapDouble = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14 10.16a1.05 1.05 0 00-1.084-1.016 1.027 1.027 0 00-.907.491v-.034a1.063 1.063 0 00-1.084-1.032 1.051 1.051 0 00-.907.474v-.017a1.063 1.063 0 00-1.084-1.032 1.05 1.05 0 00-.906.474l-.013.018V5a.999.999 0 10-1.997 0v6.281a.12.12 0 01-.128-.035l-1.068-1a1.084 1.084 0 00-1.343-.115.998.998 0 00-.447.689.952.952 0 00.24.787l2.635 3.032A3.942 3.942 0 008.921 16h1.635a3.472 3.472 0 002.428-.967A3.175 3.175 0 0014 12.72z" }),
    reactExports.createElement("path", { d: "M1.999 5a5 5 0 119.251 2.602 2.108 2.108 0 00-.325-.033 2.207 2.207 0 00-.487.054 2.08 2.08 0 00-.26-.221A3.961 3.961 0 0010.998 5a4 4 0 10-5.981 3.454v.718a2.074 2.074 0 00-.935-.221c-.033 0-.065.013-.099.014A4.975 4.975 0 012 5zm5-3a2.99 2.99 0 00-1.981 5.237V5.183c-.006-.061-.019-.12-.019-.183a2.002 2.002 0 012-2h.017a2.002 2.002 0 011.999 2v1.995c.064.003.125.018.188.026A2.99 2.99 0 007 2z", opacity: 0.55 })
  );
};
const SvgGestureOneFingerTap = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14 9.16a1.05 1.05 0 00-1.084-1.016 1.027 1.027 0 00-.907.491v-.034a1.063 1.063 0 00-1.084-1.032 1.051 1.051 0 00-.907.474v-.017a1.063 1.063 0 00-1.084-1.032 1.05 1.05 0 00-.906.474l-.013.018V4a.999.999 0 10-1.997 0v6.281a.12.12 0 01-.128-.035l-1.068-1A1.084 1.084 0 003.48 9.13a.998.998 0 00-.447.689.952.952 0 00.24.787l2.635 3.032A3.942 3.942 0 008.921 15h1.635a3.472 3.472 0 002.428-.967A3.175 3.175 0 0014 11.72z" }),
    reactExports.createElement("path", { d: "M6.999 1a2.99 2.99 0 00-1.982 5.237V4.183C5.013 4.122 5 4.063 5 4a2.002 2.002 0 012-2h.017a2.002 2.002 0 011.999 2v1.995c.064.003.125.018.188.026A2.99 2.99 0 007 1z", opacity: 0.55 })
  );
};
const SvgGesturePinch = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M16 9.16a1.05 1.05 0 00-1.087-1.016 1.03 1.03 0 00-.908.491v-.034a1.065 1.065 0 00-1.087-1.032 1.054 1.054 0 00-.908.474v-.017a1.064 1.064 0 00-1.087-1.032 1.053 1.053 0 00-.908.473l-.013.019V5c0-.024-.012-.044-.013-.067a.98.98 0 00-.035-.17.973.973 0 00-.071-.212c-.008-.017-.008-.035-.017-.05a.933.933 0 00-.073-.083.972.972 0 00-.148-.168 1.352 1.352 0 00-.325-.186.972.972 0 00-.195-.04A.941.941 0 009 4c-.021 0-.039.01-.06.012a1.588 1.588 0 00-.382.102c-.02.01-.04.01-.06.02l-2.597 1.5A1 1 0 005.536 7a1 1 0 001.366.366L8 6.732v3.55a.121.121 0 01-.128-.036l-1.07-1a1.088 1.088 0 00-1.346-.115.998.998 0 00-.449.689.95.95 0 00.242.787l2.64 3.032A3.953 3.953 0 0010.91 15h1.639a3.483 3.483 0 002.433-.967A3.172 3.172 0 0016 11.72z", fillRule: "evenodd" }),
    reactExports.createElement("path", { d: "M7.354 1.354l-1.5 1.5L7 4H4V1l1.146 1.146 1.5-1.5a.5.5 0 01.707.707zM2.147 5.147l-1.5 1.5a.5.5 0 00.707.707l1.5-1.5L4 7V4H1z", opacity: 0.55 })
  );
};
const SvgGestureTwoFingerDrag = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M6.008 7H1V1h10v.5h.007a1.974 1.974 0 01.993.275V0H0v8h6.008z", opacity: 0.55 }),
    reactExports.createElement("path", { d: "M10.008 3.5a.999.999 0 111.997 0v4.986l.013-.019a1.05 1.05 0 01.907-.473 1.063 1.063 0 011.084 1.032v.017a1.051 1.051 0 01.907-.474A1.063 1.063 0 0116 9.601v.034l-.01 3.086a3.172 3.172 0 01-1.017 2.312A3.483 3.483 0 0112.54 16H9.91a3.941 3.941 0 01-3.013-1.36l-2.635-3.033a.951.951 0 01-.24-.787.998.998 0 01.447-.689 1.084 1.084 0 011.343.115l1.068 1a.12.12 0 00.127.035V5a.992.992 0 011.983-.073V8.5a.5.5 0 001 0z" })
  );
};
const SvgGestureTwoFingerTap = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M8.008 3.5a.999.999 0 111.997 0v4.986l.013-.019a1.05 1.05 0 01.907-.473 1.063 1.063 0 011.084 1.032v.017a1.051 1.051 0 01.907-.474A1.063 1.063 0 0114 9.601v.034l-.01 3.086a3.172 3.172 0 01-1.017 2.312A3.483 3.483 0 0110.54 16H7.91a3.941 3.941 0 01-3.013-1.36l-2.635-3.033a.951.951 0 01-.24-.787.998.998 0 01.447-.689 1.084 1.084 0 011.343.115l1.068 1a.12.12 0 00.127.035V5a.992.992 0 011.983-.073V8.5a.5.5 0 001 0z" }),
    reactExports.createElement("path", { d: "M4.008 7.228V5.082C4.008 5.054 4 5.028 4 5a2.002 2.002 0 012-2h.007c.009 0 .017.003.026.004.05.003.1.01.15.016l.08.011.671.09.283-.504a2 2 0 01.361-.504l.018-.019a2.002 2.002 0 01.401-.315l.013-.007a1.984 1.984 0 01.411-.176 1.92 1.92 0 01.11-.032 1.977 1.977 0 01.454-.062L9 1.5h.007a2.002 2.002 0 011.998 2v2.217a2.99 2.99 0 10-4.61-3.677A2.962 2.962 0 006 2a2.99 2.99 0 00-1.992 5.228z", opacity: 0.55 })
  );
};
const SvgMouseClickLeft = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M6 9H4V8h2zm7-3.5v5a5.5 5.5 0 01-11 0v-5a5.5 5.5 0 0111 0zM8 1.05v1.042A1.496 1.496 0 019 3.5V6h3v-.5a4.49 4.49 0 00-4-4.45zM7.5 3a.5.5 0 00-.5.5v3a.5.5 0 001 0v-3a.5.5 0 00-.5-.5zm4.5 7.5V7H8.908a1.492 1.492 0 01-2.816 0H3v3.5a4.5 4.5 0 009 0z" })
  );
};
const SvgMouseClickRight = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M9 9h2V8H9zM2 5.5v5a5.5 5.5 0 0011 0v-5a5.5 5.5 0 00-11 0zm5-4.45v1.042A1.496 1.496 0 006 3.5V6H3v-.5a4.49 4.49 0 014-4.45zM7.5 3a.5.5 0 01.5.5v3a.5.5 0 01-1 0v-3a.5.5 0 01.5-.5zM3 10.5V7h3.092a1.492 1.492 0 002.816 0H12v3.5a4.5 4.5 0 01-9 0z" })
  );
};
const SvgMouseClickWheel = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M7.5 0A5.5 5.5 0 002 5.5v5a5.5 5.5 0 0011 0v-5A5.5 5.5 0 007.5 0zM12 5.5V6H9V3.5a1.496 1.496 0 00-1-1.408V1.05a4.49 4.49 0 014 4.45zM7 1.05v1.042A1.496 1.496 0 006 3.5V6H3v-.5a4.49 4.49 0 014-4.45zM7.5 15A4.505 4.505 0 013 10.5V7h3.092a1.492 1.492 0 002.816 0H12v3.5A4.505 4.505 0 017.5 15zM6 10h3V9H6z" })
  );
};
const popupId = "cursor-prompt";
const getCategory = () => UiFramework.loggerCategory("useCursorPrompt");
function useCursorPrompt(args) {
  const { show, timeout, instruction, iconSpec, promptAtContent } = args;
  const lastArgsRef = reactExports.useRef(args);
  reactExports.useEffect(() => {
    lastArgsRef.current = args;
  }, [args]);
  const timerRef = reactExports.useRef(void 0);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const dragged = !!useDraggedItem();
  const [draggedRecently, setDraggedRecently] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (dragged) {
      Logger.logTrace(getCategory(), "dragged recently");
      setDraggedRecently(true);
      return;
    }
    const timer = new Timer(250);
    timer.setOnExecute(() => {
      Logger.logTrace(getCategory(), "reset dragged recently");
      setDraggedRecently(false);
    });
    timer.start();
    return () => {
      timer.stop();
    };
  }, [dragged]);
  const contentHovered = useCursorInformationStore((state) => state.contentHovered);
  const shouldOpen = reactExports.useMemo(() => {
    if (!show)
      return false;
    if (!isOpen)
      return false;
    if (promptAtContent && (dragged || draggedRecently))
      return false;
    if (promptAtContent && !contentHovered)
      return false;
    return true;
  }, [show, isOpen, dragged, draggedRecently, promptAtContent, contentHovered]);
  reactExports.useEffect(() => {
    if (timeout === Number.POSITIVE_INFINITY)
      return;
    const timer = new Timer(timeout);
    timer.setOnExecute(() => {
      Logger.logTrace(getCategory(), "timer expired");
      setIsOpen(false);
    });
    timer.delay = timeout;
    timerRef.current = timer;
    return () => {
      timer.stop();
    };
  }, [timeout]);
  reactExports.useEffect(() => {
    if (!shouldOpen)
      return;
    if (!instruction)
      return;
    Logger.logTrace(getCategory(), "open");
    CursorPopupManager.open(popupId, reactExports.createElement(CursorPrompt, { iconSpec, instruction }), CursorInformation.cursorPosition, new Point(20, 20), RelativePosition.BottomRight, 0, { shadow: true }, CursorInformation.cursorDocument);
    return () => {
      Logger.logTrace(getCategory(), "close");
      CursorPopupManager.close(popupId, false, lastArgsRef.current.fadeOut);
    };
  }, [shouldOpen, instruction, iconSpec]);
  reactExports.useEffect(() => {
    return CursorInformation.onCursorUpdatedEvent.addListener((args2) => {
      CursorPopupManager.updatePosition(args2.newPt, CursorInformation.cursorDocument);
    });
  }, []);
  const open = reactExports.useCallback(() => {
    Logger.logTrace(getCategory(), "request open");
    setIsOpen(true);
    timerRef.current?.start();
  }, []);
  return { open };
}
function CursorPrompt({ iconSpec, instruction }) {
  return reactExports.createElement(
    "div",
    { className: "uifw-cursor-prompt" },
    iconSpec && reactExports.createElement(
      "span",
      { className: "uifw-cursor-prompt-icon" },
      reactExports.createElement(Icon, { iconSpec })
    ),
    reactExports.createElement(Text, { variant: "body", className: "uifw-cursor-prompt-text" }, instruction)
  );
}
class ToolAssistanceDialog extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-toolAssistance-dialog", this.props.className);
    return reactExports.createElement(
      Dialog,
      { className, style: this.props.style, titleBar: reactExports.createElement(TitleBar, { title: this.props.title }, this.props.buttons) },
      reactExports.createElement("div", { className: "nz-content" }, this.props.children)
    );
  }
}
class ToolAssistanceItem extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-toolAssistance-item", this.props.className);
    return reactExports.createElement("div", { className, style: this.props.style }, this.props.children);
  }
}
class NewDot extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-toolAssistance-newDot", this.props.className);
    return reactExports.createElement("span", { className, style: this.props.style });
  }
}
class ToolAssistanceInstruction extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-toolAssistance-instruction", this.props.className);
    const textClassName = this.props.isNew ? "nz-text-new" : void 0;
    return reactExports.createElement(
      ToolAssistanceItem,
      { className, style: this.props.style },
      reactExports.createElement(
        "span",
        { className: "nz-image" },
        this.props.isNew && reactExports.createElement(NewDot, null),
        this.props.image
      ),
      reactExports.createElement("span", { className: textClassName }, this.props.text)
    );
  }
}
class ToolAssistanceSeparator extends reactExports.PureComponent {
  render() {
    const className = classnames("nz-footer-toolAssistance-separator", this.props.className);
    return reactExports.createElement(
      "div",
      { className, style: this.props.style },
      reactExports.createElement("div", { className: "nz-label" }, this.props.children),
      reactExports.createElement("div", { className: "nz-separator" })
    );
  }
}
function SvgTouchCursorPoint() {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m12.25 11.6h-.00153c-.01447-1.33768-1.31731-3.41344-1.72356-4.02776-.39718-.59747-1.75891-2.57224-2.51929-2.57224s-2.1221 1.97477-2.53062 2.58238c-.40523.60273-1.70223 2.67945-1.723 4.01762h-.002l.0006.02462-.00049.0085h.00071a4.32523 4.32523 0 0 0 4.24918 4.36688 4.32575 4.32575 0 0 0 4.24945-4.377h.00039l-.00028-.00448zm-4.25 2.79583a2.75081 2.75081 0 1 1 2.68421-2.75 2.7177 2.7177 0 0 1 -2.68421 2.75z", fillRule: "evenodd" }),
    reactExports.createElement("path", { d: "m6.01337 5.23242a6.4677 6.4677 0 0 1 .71655-.7005 2 2 0 1 1 2.54669-.00537 6.37772 6.37772 0 0 1 .72077.697 3.00043 3.00043 0 1 0 -3.984.00885z", opacity: ".55" }),
    reactExports.createElement("circle", { cx: "8", cy: "3", r: "1" })
  );
}
function SvgTouchCursorPan() {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m11.86364 9h-.00139a9.06327 9.06327 0 0 0 -1.56688-3.6616c-.36107-.54315-1.59904-2.3384-2.29026-2.3384s-1.92918 1.79525-2.30053 2.34762a9.041 9.041 0 0 0 -1.56638 3.65238h-.00184l.00055.02238-.00045.00773h.00065a3.932 3.932 0 0 0 3.86289 3.96989 3.93249 3.93249 0 0 0 3.86314-3.97909h.00035l-.00025-.00406zm-3.86364 2.54167a2.50073 2.50073 0 1 1 2.44019-2.5 2.47063 2.47063 0 0 1 -2.44019 2.5z", fillRule: "evenodd" }),
    reactExports.createElement("path", { d: "m3.16931 8.6875h-1.10681v1.375l-2.0625-2.0625 2.0625-2.0625v1.375h1.46783a5.5664 5.5664 0 0 0 -.36102 1.375zm12.83069-.6875-2.0625-2.0625v1.375h-1.45776a5.476 5.476 0 0 1 .35333 1.375h1.10443v1.375z", opacity: ".55" })
  );
}
function SvgMouseClickLeftDrag() {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 22 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m0 8 2.0625-2.0625v1.375h2.75v1.375h-2.75v1.375zm22 0-2.0625 2.0625v-1.375h-2.75v-1.375h2.75v-1.375z", fillRule: "evenodd", opacity: ".55" }),
    reactExports.createElement("path", { d: "m9.5 9h-2v-1h2zm7-3.5v5a5.5 5.5 0 0 1 -11 0v-5a5.5 5.5 0 0 1 11 0zm-5-4.4494v1.0412a1.49569 1.49569 0 0 1 1 1.4082v2.5h3v-.5a4.49037 4.49037 0 0 0 -4-4.4494zm-.5 1.9494a.50057.50057 0 0 0 -.5.5v3a.5.5 0 0 0 1 0v-3a.50057.50057 0 0 0 -.5-.5zm4.5 7.5v-3.5h-3.0918a1.49151 1.49151 0 0 1 -2.8164 0h-3.0918v3.5a4.5 4.5 0 0 0 9 0z" })
  );
}
function SvgMouseClickRightDrag() {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 22 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m0 8 2.0625-2.0625v1.375h2.75v1.375h-2.75v1.375zm22 0-2.0625 2.0625v-1.375h-2.75v-1.375h2.75v-1.375z", fillRule: "evenodd", opacity: ".55" }),
    reactExports.createElement("path", { d: "m12.5 9h2v-1h-2zm-7-3.5v5a5.5 5.5 0 0 0 11 0v-5a5.5 5.5 0 0 0 -11 0zm5-4.4494v1.0412a1.49569 1.49569 0 0 0 -1 1.4082v2.5h-3v-.5a4.49037 4.49037 0 0 1 4-4.4494zm.5 1.9494a.50057.50057 0 0 1 .5.5v3a.5.5 0 0 1 -1 0v-3a.50057.50057 0 0 1 .5-.5zm-4.5 7.5v-3.5h3.0918a1.49151 1.49151 0 0 0 2.8164 0h3.0918v3.5a4.5 4.5 0 0 1 -9 0z" })
  );
}
function SvgMouseClickWheelDrag() {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 22 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m0 8 2.0625-2.0625v1.375h2.75v1.375h-2.75v1.375zm22 0-2.0625 2.0625v-1.375h-2.75v-1.375h2.75v-1.375z", fillRule: "evenodd", opacity: ".55" }),
    reactExports.createElement("path", { d: "m11 0a5.5 5.5 0 0 0 -5.5 5.5v5a5.5 5.5 0 0 0 11 0v-5a5.5 5.5 0 0 0 -5.5-5.5zm4.5 5.5v.5h-3v-2.5a1.49569 1.49569 0 0 0 -1-1.4082v-1.0412a4.49037 4.49037 0 0 1 4 4.4494zm-5-4.4494v1.0412a1.49569 1.49569 0 0 0 -1 1.4082v2.5h-3v-.5a4.49037 4.49037 0 0 1 4-4.4494zm.5 13.9494a4.50508 4.50508 0 0 1 -4.5-4.5v-3.5h3.0918a1.49151 1.49151 0 0 0 2.8164 0h3.0918v3.5a4.50508 4.50508 0 0 1 -4.5 4.5zm-1.5-5h3v-1h-3z" })
  );
}
function useControlledState(initialValue, controlledState, setControlledState) {
  const [uncontrolledState, setUncontrolledState] = reactExports.useState(initialValue);
  const state = reactExports.useMemo(() => controlledState !== void 0 ? controlledState : uncontrolledState, [controlledState, uncontrolledState]);
  const setState = reactExports.useCallback((value) => {
    setUncontrolledState(value);
    setControlledState?.(value);
  }, [setControlledState, setUncontrolledState]);
  return [state, setState];
}
const toolAssistanceKey = "ToolAssistance";
const showPromptAtCursorKey = "showPromptAtCursor";
const mouseTouchTabIndexKey = "mouseTouchTabIndex";
function ToolAssistanceField(props) {
  const { includePromptAtCursor = true, cursorPromptTimeout = 5e3, fadeOutCursorPrompt = true, defaultPromptAtCursor = false, uiStateStorage: uiStateStorageProp, promptAtContent = false, visible: visibleProp, onVisibleChange, pinned: pinnedProp, onPinnedChange } = props;
  const uiStateStorageCtx = reactExports.useContext(UiStateStorageContext);
  const uiStateStorage = uiStateStorageProp ?? uiStateStorageCtx;
  const { translate } = useTranslation();
  const activeTool = useActiveTool();
  const [state, setState] = reactExports.useState(() => {
    return {
      instructions: void 0,
      toolIconSpec: "",
      showPromptAtCursor: defaultPromptAtCursor,
      mouseTouchTabIndex: 0
    };
  });
  const { showPromptAtCursor, toolIconSpec, mouseTouchTabIndex, instructions } = state;
  const mainInstruction = state.instructions?.mainInstruction.text;
  const { open } = useCursorPrompt({
    show: showPromptAtCursor,
    timeout: cursorPromptTimeout,
    iconSpec: toolIconSpec,
    instruction: mainInstruction,
    fadeOut: fadeOutCursorPrompt,
    promptAtContent
  });
  const handleClose = () => {
    if (pinned) {
      setPinned(false);
    }
    setVisible(false);
  };
  const getDisplayableInstructions = (section) => {
    const displayableInstructions = section.instructions.filter((instruction) => {
      const includeMouseInstructions = showMouseTouchTabs ? mouseTouchTabIndex === 0 && showMouseInstructions : showMouseInstructions;
      const includeTouchInstructions = showMouseTouchTabs ? mouseTouchTabIndex === 1 && showTouchInstructions : showTouchInstructions;
      return isBothInstruction(instruction) || includeMouseInstructions && isMouseInstruction(instruction) || includeTouchInstructions && isTouchInstruction(instruction);
    });
    return displayableInstructions;
  };
  reactExports.useEffect(() => {
    void (async () => {
      const result = await uiStateStorage.getSetting(toolAssistanceKey, showPromptAtCursorKey);
      if (result.status !== UiStateStorageStatus.Success)
        return;
      setState((prev) => ({
        ...prev,
        showPromptAtCursor: result.setting
      }));
    })();
  }, [uiStateStorage]);
  reactExports.useEffect(() => {
    void (async () => {
      const result = await uiStateStorage.getSetting(toolAssistanceKey, mouseTouchTabIndexKey);
      if (result.status !== UiStateStorageStatus.Success)
        return;
      setState((prev) => ({
        ...prev,
        mouseTouchTabIndex: result.setting
      }));
    })();
  }, [uiStateStorage]);
  reactExports.useEffect(() => {
    return MessageManager.onToolAssistanceChangedEvent.addListener((args) => {
      setState((prev) => ({
        ...prev,
        instructions: args.instructions
      }));
      open();
    });
  }, [open]);
  reactExports.useEffect(() => {
    return UiFramework.frontstages.onToolIconChangedEvent.addListener((args) => {
      setState((prev) => ({
        ...prev,
        toolIconSpec: args.iconSpec
      }));
      open();
    });
  }, [open]);
  const hasMouseInstructions = !!instructions?.sections?.some((section) => {
    return section.instructions.some((instruction) => isMouseInstruction(instruction));
  });
  const hasTouchInstructions = !!instructions?.sections?.some((section) => {
    return section.instructions.some((instruction) => isTouchInstruction(instruction));
  });
  const isMobileBrowser = reactExports.useMemo(() => {
    return ProcessDetector.isMobileBrowser;
  }, []);
  const showMouseInstructions = !isMobileBrowser && hasMouseInstructions;
  const showTouchInstructions = hasTouchInstructions;
  const showMouseTouchTabs = showMouseInstructions && showTouchInstructions;
  const sectionInstructions = (instructions?.sections ?? []).map((section) => {
    const displayableInstructions = getDisplayableInstructions(section);
    return {
      displayableInstructions,
      section
    };
  }).filter((section) => {
    return section.displayableInstructions.length > 0;
  });
  const prompt = instructions?.mainInstruction.text;
  const tooltip = reactExports.useMemo(() => {
    const lineBreak = "\r\n";
    const moreInfo = translate("toolAssistance.moreInfo");
    const postfix = `${lineBreak}${moreInfo}`;
    if (activeTool) {
      return `${activeTool.flyover}${prompt ? ` > ${prompt}` : ""}${postfix}`;
    }
    if (prompt) {
      return `${prompt}${postfix}`;
    }
    return moreInfo;
  }, [prompt, activeTool, translate]);
  const dialogTitle = activeTool?.flyover ?? translate("toolAssistance.title");
  const tabs = [
    translate("toolAssistance.mouse"),
    translate("toolAssistance.touch")
  ];
  const [visible, setVisible] = useControlledState(false, visibleProp, onVisibleChange);
  const [pinned, setPinned] = useControlledState(false, pinnedProp, onPinnedChange);
  return reactExports.createElement(
    StatusBarPopover,
    { visible, onVisibleChange: setVisible, closeOnOutsideClick: !pinned, content: reactExports.createElement(
      ToolAssistanceDialog,
      { buttons: reactExports.createElement(StatusBarDialog.TitleBarButton, { onClick: () => {
        if (pinned) {
          handleClose();
          return;
        }
        setPinned(true);
      }, title: translate(pinned ? "dialog.close" : "toolAssistance.pin") }, pinned ? reactExports.createElement(SvgClose, null) : reactExports.createElement(SvgPin, null)), title: dialogTitle },
      reactExports.createElement(
        "div",
        null,
        showMouseTouchTabs && reactExports.createElement(
          Tabs.Wrapper,
          { type: "pill", value: String(mouseTouchTabIndex) },
          reactExports.createElement(Tabs.TabList, { className: "uifw-toolAssistance-tabs" }, tabs.map((tab, index) => reactExports.createElement(Tabs.Tab, { key: index, className: "uifw-tab", value: String(index), label: tab, onClick: async () => {
            setState((prev) => ({
              ...prev,
              mouseTouchTabIndex: index
            }));
            void uiStateStorage.saveSetting(toolAssistanceKey, mouseTouchTabIndexKey, index);
          } })))
        ),
        instructions ? reactExports.createElement(
          "div",
          { className: "uifw-toolAssistance-content" },
          reactExports.createElement(ToolAssistanceInstruction, { key: "main", image: reactExports.createElement(InstructionImage, { instruction: instructions.mainInstruction }), text: instructions.mainInstruction.text, isNew: instructions.mainInstruction.isNew }),
          sectionInstructions.map((sectionInstruction, index) => {
            const { section, displayableInstructions } = sectionInstruction;
            return reactExports.createElement(
              reactExports.Fragment,
              { key: index.toString() },
              reactExports.createElement(ToolAssistanceSeparator, null, section.label),
              displayableInstructions.map((instruction, index1) => {
                return reactExports.createElement(ToolAssistanceInstruction, { key: `${index1.toString()}-${index.toString()}`, image: reactExports.createElement(InstructionImage, { instruction }), text: instruction.text, isNew: instruction.isNew });
              })
            );
          }),
          includePromptAtCursor && reactExports.createElement(
            reactExports.Fragment,
            null,
            reactExports.createElement(ToolAssistanceSeparator, { key: "prompt-sep" }),
            reactExports.createElement(
              ToolAssistanceItem,
              { key: "prompt-item" },
              reactExports.createElement(ToggleSwitch, { label: translate("toolAssistance.promptAtCursor"), labelPosition: "right", checked: state.showPromptAtCursor, onChange: (e) => {
                const checked = e.target.checked;
                setState((prev) => ({
                  ...prev,
                  showPromptAtCursor: checked
                }));
                void uiStateStorage.saveSetting(toolAssistanceKey, showPromptAtCursorKey, checked);
              } })
            )
          )
        ) : void 0
      )
    ) },
    reactExports.createElement(
      Button,
      { styleType: "borderless", startIcon: instructions ? (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        reactExports.createElement(Icon, { iconSpec: state.toolIconSpec })
      ) : reactExports.createElement(reactExports.Fragment, null), className: classnames("uifw-statusFields-toolAssistance-toolAssistanceField", props.className), title: tooltip, style: props.style, labelProps: { className: "prompt" } },
      prompt,
      reactExports.createElement(StatusBarPopover.ExpandIndicator, null)
    )
  );
}
function isBothInstruction(instruction) {
  return instruction.inputMethod === void 0 || instruction.inputMethod === ToolAssistanceInputMethod.Both;
}
function isMouseInstruction(instruction) {
  return instruction.inputMethod === ToolAssistanceInputMethod.Mouse;
}
function isTouchInstruction(instruction) {
  return instruction.inputMethod === ToolAssistanceInputMethod.Touch;
}
function getWebComponentSource(iconSpec) {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }
  return void 0;
}
function InstructionImage({ instruction }) {
  let image;
  if (instruction.iconElement)
    return instruction.iconElement;
  if ((typeof instruction.image === "string" || instruction.image !== ToolAssistanceImage.Keyboard) && instruction.keyboardInfo) {
    if (instruction.keyboardInfo.keys.length === 1 && !instruction.keyboardInfo.bottomKeys) {
      const key = instruction.keyboardInfo.keys[0];
      const rightImage = typeof instruction.image === "string" ? reactExports.createElement(
        "div",
        { className: "uifw-toolassistance-icon-medium" },
        reactExports.createElement(Icon, { iconSpec: instruction.image })
      ) : reactExports.createElement(InstructionSvgImage, { instruction, mediumSize: true });
      image = // eslint-disable-next-line @typescript-eslint/no-deprecated
      reactExports.createElement(
        FillCentered,
        null,
        reactExports.createElement(KeyNode, { keyboardKey: key, className: "uifw-toolassistance-key-modifier" }),
        rightImage
      );
    } else {
      Logger.logError(UiFramework.loggerCategory("ToolAssistanceField"), `getInstructionImage: Invalid keyboardInfo provided with image`);
    }
  } else if (typeof instruction.image === "string") {
    if (instruction.image.length > 0) {
      const svgSource = getWebComponentSource(instruction.image);
      const className = svgSource !== void 0 ? "uifw-toolassistance-svg" : "uifw-toolassistance-icon-large";
      image = reactExports.createElement(
        "div",
        { className },
        reactExports.createElement(Icon, { iconSpec: svgSource ?? instruction.image })
      );
    }
  } else if (instruction.image === ToolAssistanceImage.Keyboard) {
    if (instruction.keyboardInfo) {
      image = reactExports.createElement(InstructionKeyboardImage, { keyboardInfo: instruction.keyboardInfo });
    } else {
      Logger.logError(UiFramework.loggerCategory("ToolAssistanceField"), `getInstructionImage: ToolAssistanceImage.Keyboard specified but no keyboardInfo provided`);
    }
  } else {
    image = reactExports.createElement(InstructionSvgImage, { instruction, mediumSize: false });
  }
  return image;
}
function InstructionSvgImage({ instruction, mediumSize }) {
  let image;
  let className = mediumSize ? "uifw-toolassistance-svg-medium" : "uifw-toolassistance-svg";
  if (typeof instruction.image !== "string" && instruction.image !== ToolAssistanceImage.Keyboard) {
    const toolAssistanceImage = instruction.image;
    let svgImage;
    switch (toolAssistanceImage) {
      case ToolAssistanceImage.AcceptPoint:
        svgImage = reactExports.createElement(SvgAdd, null);
        break;
      case ToolAssistanceImage.CursorClick:
        svgImage = reactExports.createElement(SvgCursorClick, null);
        break;
      case ToolAssistanceImage.LeftClick:
        svgImage = reactExports.createElement(SvgMouseClickLeft, null);
        break;
      case ToolAssistanceImage.RightClick:
        svgImage = reactExports.createElement(SvgMouseClickRight, null);
        break;
      case ToolAssistanceImage.MouseWheel:
        svgImage = reactExports.createElement(SvgMouseClickWheel, null);
        break;
      case ToolAssistanceImage.LeftClickDrag:
        svgImage = reactExports.createElement(SvgMouseClickLeftDrag, null);
        className = mediumSize ? "uifw-toolassistance-svg-medium-wide" : "uifw-toolassistance-svg-wide";
        break;
      case ToolAssistanceImage.RightClickDrag:
        svgImage = reactExports.createElement(SvgMouseClickRightDrag, null);
        className = mediumSize ? "uifw-toolassistance-svg-medium-wide" : "uifw-toolassistance-svg-wide";
        break;
      case ToolAssistanceImage.MouseWheelClickDrag:
        svgImage = reactExports.createElement(SvgMouseClickWheelDrag, null);
        className = mediumSize ? "uifw-toolassistance-svg-medium-wide" : "uifw-toolassistance-svg-wide";
        break;
      case ToolAssistanceImage.OneTouchTap:
        svgImage = reactExports.createElement(SvgGestureOneFingerTap, null);
        break;
      case ToolAssistanceImage.OneTouchDoubleTap:
        svgImage = reactExports.createElement(SvgGestureOneFingerTapDouble, null);
        break;
      case ToolAssistanceImage.OneTouchDrag:
        svgImage = reactExports.createElement(SvgGestureOneFingerDrag, null);
        break;
      case ToolAssistanceImage.TwoTouchTap:
        svgImage = reactExports.createElement(SvgGestureTwoFingerTap, null);
        break;
      case ToolAssistanceImage.TwoTouchDrag:
        svgImage = reactExports.createElement(SvgGestureTwoFingerDrag, null);
        break;
      case ToolAssistanceImage.TwoTouchPinch:
        svgImage = reactExports.createElement(SvgGesturePinch, null);
        break;
      case ToolAssistanceImage.TouchCursorTap:
        svgImage = reactExports.createElement(SvgTouchCursorPoint, null);
        break;
      case ToolAssistanceImage.TouchCursorDrag:
        svgImage = reactExports.createElement(SvgTouchCursorPan, null);
        className = mediumSize ? "uifw-toolassistance-svg-medium-wide" : "uifw-toolassistance-svg-wide";
        break;
    }
    image = reactExports.createElement("div", { className }, svgImage && reactExports.createElement(Icon, { iconSpec: svgImage }));
  }
  return image;
}
function InstructionKeyboardImage({ keyboardInfo }) {
  let image;
  if (keyboardInfo.bottomKeys !== void 0) {
    image = reactExports.createElement(
      "div",
      { className: "uifw-toolassistance-key-group" },
      reactExports.createElement("span", { className: "row1" }, keyboardInfo.keys.map((key, index) => {
        return reactExports.createElement(KeyNode, { key: index, keyboardKey: key, className: "uifw-toolassistance-key-small" });
      })),
      reactExports.createElement("br", null),
      reactExports.createElement("span", { className: "row2" }, keyboardInfo.bottomKeys.map((key, index) => {
        return reactExports.createElement(KeyNode, { key: index, keyboardKey: key, className: "uifw-toolassistance-key-small" });
      }))
    );
  } else if (keyboardInfo.keys.length === 2) {
    image = // eslint-disable-next-line @typescript-eslint/no-deprecated
    reactExports.createElement(FillCentered, null, keyboardInfo.keys.map((key, index) => {
      let className = "uifw-toolassistance-key-medium";
      if (key.length > 1)
        className = "uifw-toolassistance-key-modifier";
      return reactExports.createElement(KeyNode, { key: index, keyboardKey: key, className });
    }));
  } else if (keyboardInfo.keys[0]) {
    if (keyboardInfo.keys[0].length > 1)
      image = reactExports.createElement(KeyNode, { keyboardKey: keyboardInfo.keys[0], className: "uifw-toolassistance-key-large" });
    else
      image = reactExports.createElement(KeyNode, { keyboardKey: keyboardInfo.keys[0] });
  } else {
    Logger.logError(UiFramework.loggerCategory("ToolAssistanceField"), `ToolAssistanceImage.Keyboard specified but ToolAssistanceKeyboardInfo not valid`);
  }
  return image;
}
function KeyNode({ keyboardKey, className }) {
  return reactExports.createElement(
    "div",
    { className: classnames("uifw-toolassistance-key", className) },
    reactExports.createElement(FillCentered, null, keyboardKey)
  );
}
export {
  ToolAssistanceField as T
};
