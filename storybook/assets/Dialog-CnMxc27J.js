import { r as reactExports, v as getTranslateValuesFromElement, x as getBoundedValue, S as Svg, B as Box, c as classnames, y as polymorphic, z as mergeEventHandlers, I as IconButton, A as useMergedRefs, C as useResizeObserver, D as getWindow, E as useIsomorphicLayoutEffect, F as ShadowRoot, G as Portal, J as PortalContainerContext } from "./iframe-D6etZYKx.js";
import { j as getTabbableElements, u as useEventListener } from "./Key.enum-DxiaZ4K2.js";
const Resizer = (props) => reactExports.createElement(
  "div",
  {
    style: {
      position: "absolute",
      inset: -6,
      display: "grid",
      pointerEvents: "none"
    }
  },
  reactExports.createElement(ResizerStyles, null),
  reactExports.createElement(Resizers, props)
);
let Resizers = (props) => {
  let { elementRef, containerRef, onResizeStart, onResizeEnd } = props;
  let isResizing = reactExports.useRef(false);
  let onResizePointerDown = (event) => {
    if (!elementRef.current || 0 !== event.button) return;
    let initialPointerX = event.clientX;
    let initialPointerY = event.clientY;
    let [initialTranslateX, initialTranslateY] = getTranslateValuesFromElement(
      elementRef.current
    );
    let { width: initialWidth, height: initialHeight } = elementRef.current.getBoundingClientRect();
    let width = `${initialWidth}px`;
    let height = `${initialHeight}px`;
    let translateX = initialTranslateX;
    let translateY = initialTranslateY;
    let minWidth = parseFloat(getComputedStyle(elementRef.current).minWidth);
    if (Number.isNaN(minWidth)) minWidth = 380;
    let minHeight = parseFloat(getComputedStyle(elementRef.current).minHeight);
    let resizer = event.currentTarget.dataset.iuiResizer;
    let ownerDocument = elementRef.current.ownerDocument || document;
    let originalUserSelect = ownerDocument.body.style.userSelect;
    ownerDocument.body.style.userSelect = "none";
    let onResizePointerMove = (event2) => {
      if (!elementRef.current) return;
      if (!isResizing.current) {
        isResizing.current = true;
        onResizeStart?.();
      }
      let containerRect = containerRef?.current?.getBoundingClientRect();
      let clientX = getBoundedValue(
        event2.clientX,
        containerRect?.left ?? 0,
        containerRect?.right ?? ownerDocument.documentElement.clientWidth ?? 0
      );
      let clientY = getBoundedValue(
        event2.clientY,
        containerRect?.top ?? 0,
        containerRect?.bottom ?? ownerDocument.documentElement.clientHeight ?? 0
      );
      let diffX = initialPointerX - clientX;
      let diffY = initialPointerY - clientY;
      switch (resizer) {
        case "top-left": {
          let newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          let newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "top": {
          let newHeight = initialHeight + diffY;
          if (newHeight < minHeight) break;
          height = elementRef.current.style.height = `${newHeight}px`;
          translateY = initialTranslateY - diffY;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "top-right": {
          let newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "right":
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom-right":
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom":
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom-left": {
          let newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "left": {
          let newWidth = initialWidth + diffX;
          if (newWidth < minWidth) break;
          width = elementRef.current.style.width = `${newWidth}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          translateX = initialTranslateX - diffX;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
      }
    };
    ownerDocument.addEventListener("pointermove", onResizePointerMove);
    ownerDocument.addEventListener(
      "pointerup",
      () => {
        ownerDocument.removeEventListener("pointermove", onResizePointerMove);
        if (elementRef.current) {
          ownerDocument.body.style.userSelect = originalUserSelect;
          isResizing.current = false;
          onResizeEnd?.({
            width,
            height,
            transform: `translate(${translateX}px, ${translateY}px)`
          });
        }
      },
      {
        once: true
      }
    );
  };
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("div", {
      "data-iui-resizer": "top-left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "nw-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "top",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "n-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "top-right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "ne-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "e-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom-right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "se-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "s-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom-left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "sw-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "w-resize"
      }
    })
  );
};
let ResizerStyles = reactExports.memo(
  () => reactExports.createElement("style", null, resizerStyles)
);
let resizerStyles = `
[data-iui-resizer] {
  pointer-events: auto;
  grid-area: 1 / 1 / -1 / -1;
  width: 12px;
  height: 12px;
  z-index: 1;
}
[data-iui-resizer='top'],
[data-iui-resizer='bottom'] {
  height: 8px;
  width: auto;
  z-index: 0;
}
[data-iui-resizer='left'],
[data-iui-resizer='right'] {
  height: auto;
  width: 8px;
  z-index: 0;
}
[data-iui-resizer^='top'] {
  align-self: start;
}
[data-iui-resizer^='bottom'] {
  align-self: end;
}
[data-iui-resizer$='left'] {
  justify-self: start;
}
[data-iui-resizer$='right'] {
  justify-self: end;
}`;
const FocusTrap = (props) => {
  let { children } = props;
  let firstFocusTrapRef = reactExports.useRef(null);
  let getFirstLastFocusables = reactExports.useCallback(() => {
    let childrenElement = firstFocusTrapRef.current?.nextElementSibling;
    let elements = getTabbableElements(childrenElement);
    let firstElement = elements[0];
    let lastElement = elements[(elements.length || 1) - 1];
    return [firstElement, lastElement];
  }, []);
  let onFirstFocus = reactExports.useCallback(
    (event) => {
      let [firstElement, lastElement] = getFirstLastFocusables();
      if (event.relatedTarget === firstElement) lastElement?.focus();
      else firstElement?.focus();
    },
    [getFirstLastFocusables]
  );
  let onLastFocus = reactExports.useCallback(
    (event) => {
      let [firstElement, lastElement] = getFirstLastFocusables();
      if (event.relatedTarget === lastElement) firstElement?.focus();
      else lastElement?.focus();
    },
    [getFirstLastFocusables]
  );
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("div", {
      ref: firstFocusTrapRef,
      tabIndex: 0,
      onFocus: onFirstFocus,
      "aria-hidden": true
    }),
    children,
    reactExports.createElement("div", {
      tabIndex: 0,
      onFocus: onLastFocus,
      "aria-hidden": true
    })
  );
};
const SvgClose = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6"
  })
);
const Backdrop = reactExports.forwardRef((props, ref) => {
  let { isVisible = true, className, ...rest } = props;
  return reactExports.createElement(Box, {
    className: classnames(
      "iui-backdrop",
      {
        "iui-backdrop-visible": isVisible
      },
      className
    ),
    ref,
    ...rest
  });
});
const DialogContext = reactExports.createContext(void 0);
const useDialogContext = () => reactExports.useContext(DialogContext);
const DialogMainContext = reactExports.createContext(null);
const useDialogMainContext = () => reactExports.useContext(DialogMainContext);
const DialogTitleBarTitle = polymorphic.h2("iui-dialog-title");
const DialogDragContext = reactExports.createContext(void 0);
const useDialogDragContext = () => {
  let context = reactExports.useContext(DialogDragContext);
  return {
    ...context
  };
};
const DialogTitleBar = Object.assign(
  reactExports.forwardRef((props, ref) => {
    let dialogContext = useDialogContext();
    let dialogMainContext = useDialogMainContext();
    let {
      children,
      titleText,
      isDismissible = dialogContext?.isDismissible,
      onClose = dialogContext?.onClose,
      isDraggable = dialogContext?.isDraggable,
      className,
      onPointerDown: onPointerDownProp,
      ...rest
    } = props;
    let { onPointerDown } = useDialogDragContext();
    let onClick = reactExports.useCallback(
      (e) => {
        dialogMainContext?.beforeClose();
        onClose?.(e);
      },
      [dialogMainContext, onClose]
    );
    return reactExports.createElement(
      Box,
      {
        className: classnames("iui-dialog-title-bar", className, {
          "iui-dialog-title-bar-filled": isDraggable
        }),
        ref,
        onPointerDown: mergeEventHandlers(onPointerDownProp, onPointerDown),
        ...rest
      },
      children ? children : reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(DialogTitleBarTitle, null, titleText),
        isDismissible && reactExports.createElement(
          IconButton,
          {
            size: "small",
            styleType: "borderless",
            onClick,
            "aria-label": "Close",
            "data-iui-shift": "right"
          },
          reactExports.createElement(SvgClose, null)
        )
      )
    );
  }),
  {
    Title: DialogTitleBarTitle
  }
);
const DialogContent = polymorphic.div("iui-dialog-content");
const DialogBackdrop = reactExports.forwardRef((props, ref) => {
  let dialogContext = useDialogContext();
  let dialogMainContext = useDialogMainContext();
  let {
    isVisible = dialogContext?.isOpen,
    isDismissible = dialogContext?.isDismissible,
    onClose = dialogContext?.onClose,
    closeOnExternalClick = dialogContext?.closeOnExternalClick,
    relativeTo = dialogContext?.relativeTo,
    onMouseDown,
    className,
    style,
    ...rest
  } = props;
  let backdropRef = reactExports.useRef(null);
  let refs = useMergedRefs(backdropRef, ref);
  let handleMouseDown = (event) => {
    event.persist();
    if (event.target !== backdropRef.current) return;
    if (isDismissible && closeOnExternalClick && onClose) {
      dialogMainContext?.beforeClose();
      onClose(event);
    }
    onMouseDown?.(event);
  };
  return reactExports.createElement(Backdrop, {
    isVisible,
    className: classnames(
      {
        "iui-backdrop-fixed": "viewport" === relativeTo
      },
      className
    ),
    ref: refs,
    onMouseDown: handleMouseDown,
    style: {
      pointerEvents: "auto",
      ...style
    },
    ...rest
  });
});
const DialogButtonBar = polymorphic.div("iui-dialog-button-bar");
let getContainerRect = (containerRef) => {
  let containerRect = containerRef?.current?.getBoundingClientRect();
  return {
    top: containerRect?.top ?? 0,
    right: containerRect?.right ?? getWindow()?.innerWidth ?? 0,
    bottom: containerRect?.bottom ?? getWindow()?.innerHeight ?? 0,
    left: containerRect?.left ?? 0
  };
};
const useDragAndDrop = (elementRef, containerRef, enabled = true) => {
  let grabOffsetX = reactExports.useRef(0);
  let grabOffsetY = reactExports.useRef(0);
  let translateX = reactExports.useRef(void 0);
  let translateY = reactExports.useRef(void 0);
  let containerRectRef = reactExports.useRef(getContainerRect(containerRef));
  let adjustTransform = reactExports.useCallback(() => {
    if (!elementRef.current || !enabled) return;
    let { top, right, bottom, left } = elementRef.current?.getBoundingClientRect();
    let [newTranslateX, newTranslateY] = getTranslateValuesFromElement(
      elementRef.current
    );
    containerRectRef.current = getContainerRect(containerRef);
    if (bottom > containerRectRef.current.bottom)
      newTranslateY -= bottom - containerRectRef.current.bottom;
    if (top < containerRectRef.current.top)
      newTranslateY += containerRectRef.current.top - top;
    if (right > containerRectRef.current.right)
      newTranslateX -= right - containerRectRef.current.right;
    if (left < containerRectRef.current.left)
      newTranslateX += containerRectRef.current.left - left;
    translateX.current = newTranslateX;
    translateY.current = newTranslateY;
    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
  }, [containerRef, elementRef, enabled]);
  let [resizeRef, resizeObserver] = useResizeObserver(adjustTransform);
  resizeRef(containerRef?.current);
  reactExports.useEffect(
    () => () => {
      resizeObserver?.disconnect();
    },
    [resizeObserver]
  );
  useEventListener(
    "resize",
    () => {
      adjustTransform();
      if (null != translateX.current && null != translateY.current)
        setTransform(
          `translate(${translateX.current}px, ${translateY.current}px)`
        );
    },
    getWindow()
  );
  let [transform, setTransform] = reactExports.useState("");
  let onPointerMove = reactExports.useRef((event) => {
    if (!elementRef.current) return;
    let newTranslateX = event.clientX - grabOffsetX.current;
    let newTranslateY = event.clientY - grabOffsetY.current;
    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    adjustTransform();
  });
  let originalUserSelect = reactExports.useRef("");
  let onPointerDown = reactExports.useCallback(
    (e) => {
      if (!elementRef.current || 0 !== e.button || !enabled) return;
      let [x, y] = getTranslateValuesFromElement(elementRef.current);
      grabOffsetX.current = e.clientX - x;
      grabOffsetY.current = e.clientY - y;
      originalUserSelect.current = elementRef.current.style.userSelect;
      elementRef.current.style.userSelect = "none";
      let ownerDocument = elementRef.current.ownerDocument || document;
      ownerDocument.addEventListener("pointermove", onPointerMove.current);
      ownerDocument.addEventListener(
        "pointerup",
        () => {
          setTransform(
            `translate(${translateX.current}px, ${translateY.current}px)`
          );
          ownerDocument.removeEventListener(
            "pointermove",
            onPointerMove.current
          );
          if (elementRef.current)
            elementRef.current.style.userSelect = originalUserSelect.current;
        },
        {
          once: true
        }
      );
    },
    [elementRef, enabled]
  );
  return {
    onPointerDown,
    transform
  };
};
const DialogMain = reactExports.forwardRef((props, forwardedRef) => {
  let dialogContext = useDialogContext();
  let {
    className,
    children,
    styleType = "default",
    isOpen = dialogContext?.isOpen,
    isDismissible = dialogContext?.isDismissible,
    onClose = dialogContext?.onClose,
    closeOnEsc = dialogContext?.closeOnEsc,
    trapFocus = dialogContext?.trapFocus,
    setFocus = dialogContext?.setFocus,
    preventDocumentScroll = dialogContext?.preventDocumentScroll,
    onKeyDown,
    isDraggable = dialogContext?.isDraggable,
    isResizable = dialogContext?.isResizable,
    style: propStyle,
    placement = dialogContext?.placement,
    ...rest
  } = props;
  let { dialogRootRef, setDialogElement } = dialogContext || {};
  let dialogRef = reactExports.useRef(null);
  let previousFocusedElement = reactExports.useRef(null);
  let [style, setStyle] = reactExports.useState();
  let hasBeenResized = reactExports.useRef(false);
  let originalBodyOverflow = reactExports.useRef("");
  useIsomorphicLayoutEffect(() => {
    if (isOpen) originalBodyOverflow.current = document.body.style.overflow;
  }, [isOpen]);
  reactExports.useEffect(() => {
    let ownerDocument = dialogRef.current?.ownerDocument;
    if (!ownerDocument || !preventDocumentScroll || "hidden" === originalBodyOverflow.current)
      return;
    if (isOpen) ownerDocument.body.style.overflow = "hidden";
    else ownerDocument.body.style.overflow = originalBodyOverflow.current;
    return () => {
      ownerDocument.body.style.overflow = originalBodyOverflow.current;
    };
  }, [dialogRef, isOpen, preventDocumentScroll]);
  let handleKeyDown = (event) => {
    if (event.altKey) return;
    event.persist();
    if (isDismissible && closeOnEsc && "Escape" === event.key && onClose) {
      beforeClose();
      onClose(event);
    }
    onKeyDown?.(event);
  };
  let { onPointerDown, transform } = useDragAndDrop(
    dialogRef,
    dialogRootRef,
    isDraggable
  );
  let handlePointerDown = reactExports.useCallback(
    (event) => {
      if (isDraggable) onPointerDown(event);
    },
    [isDraggable, onPointerDown]
  );
  useIsomorphicLayoutEffect(() => {
    if (!isDraggable || !isOpen) return;
    let [translateX, translateY] = getTranslateValuesFromElement(
      dialogRef.current
    );
    setStyle((oldStyle) => ({
      ...oldStyle,
      insetInlineStart: dialogRef.current?.offsetLeft,
      insetBlockStart: dialogRef.current?.offsetTop,
      transform: `translate(${translateX}px,${translateY}px)`
    }));
  }, [dialogRef, isDraggable, isOpen]);
  let setResizeStyle = reactExports.useCallback((newStyle) => {
    setStyle((oldStyle) => ({
      ...oldStyle,
      ...newStyle
    }));
  }, []);
  let onEnter = reactExports.useCallback(() => {
    previousFocusedElement.current = dialogRef.current?.ownerDocument.activeElement;
    if (setFocus)
      dialogRef.current?.focus({
        preventScroll: true
      });
  }, [setFocus]);
  let beforeClose = reactExports.useCallback(() => {
    if (dialogRef.current?.contains(
      dialogRef.current?.ownerDocument.activeElement
    ))
      previousFocusedElement.current?.focus();
  }, [dialogRef, previousFocusedElement]);
  let mountRef = reactExports.useCallback(
    (element) => {
      if (element) onEnter();
    },
    [onEnter]
  );
  let content = reactExports.createElement(
    Box,
    {
      className: classnames(
        "iui-dialog",
        {
          "iui-dialog-default": "default" === styleType,
          "iui-dialog-full-page": "fullPage" === styleType,
          "iui-dialog-visible": isOpen,
          "iui-dialog-draggable": isDraggable
        },
        className
      ),
      role: "dialog",
      ref: useMergedRefs(dialogRef, mountRef, setDialogElement, forwardedRef),
      onKeyDown: handleKeyDown,
      tabIndex: -1,
      "data-iui-placement": placement,
      style: {
        transform,
        ...style,
        ...propStyle
      },
      ...rest
    },
    reactExports.createElement(
      ShadowRoot,
      null,
      reactExports.createElement("slot", null),
      isResizable && reactExports.createElement(Resizer, {
        elementRef: dialogRef,
        containerRef: dialogRootRef,
        onResizeStart: () => {
          if (!hasBeenResized.current) {
            hasBeenResized.current = true;
            setResizeStyle({
              maxInlineSize: "100%"
            });
          }
        },
        onResizeEnd: setResizeStyle
      })
    ),
    children
  );
  return reactExports.createElement(
    DialogMainContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          beforeClose
        }),
        [beforeClose]
      )
    },
    reactExports.createElement(
      DialogDragContext.Provider,
      {
        value: {
          onPointerDown: handlePointerDown
        }
      },
      trapFocus && reactExports.createElement(FocusTrap, null, content),
      !trapFocus && content
    )
  );
});
let DialogComponent = reactExports.forwardRef((props, forwardedRef) => {
  let {
    trapFocus = false,
    setFocus = trapFocus,
    preventDocumentScroll = false,
    isOpen = false,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = false,
    onClose,
    isDraggable = false,
    isResizable = false,
    relativeTo = "viewport",
    placement,
    className,
    portal = false,
    ...rest
  } = props;
  let dialogRootRef = reactExports.useRef(null);
  let [dialogElement, setDialogElement] = reactExports.useState(null);
  let mergedRefs = useMergedRefs(forwardedRef, dialogRootRef);
  return isOpen ? reactExports.createElement(
    DialogContext.Provider,
    {
      value: {
        isOpen,
        onClose,
        closeOnEsc,
        closeOnExternalClick,
        isDismissible,
        preventDocumentScroll,
        trapFocus,
        setFocus,
        isDraggable,
        isResizable,
        relativeTo,
        placement,
        dialogRootRef,
        setDialogElement
      }
    },
    reactExports.createElement(
      Portal,
      {
        portal
      },
      reactExports.createElement(
        PortalContainerContext.Provider,
        {
          value: dialogElement
        },
        reactExports.createElement(Box, {
          className: classnames("iui-dialog-wrapper", className),
          "data-iui-relative": "container" === relativeTo,
          ref: mergedRefs,
          ...rest
        })
      )
    )
  ) : null;
});
const Dialog$1 = Object.assign(DialogComponent, {
  Backdrop: DialogBackdrop,
  Main: DialogMain,
  TitleBar: DialogTitleBar,
  Content: DialogContent,
  ButtonBar: DialogButtonBar
});
export {
  Dialog$1 as D
};
