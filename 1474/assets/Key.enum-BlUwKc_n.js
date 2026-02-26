import { r as reactExports, d as useLatestRef, J as useSyncExternalStore, K as getTranslateValuesFromElement, L as getBoundedValue, S as Svg, B as Box, c as classnames, M as ShadowRoot, V as VisuallyHidden, N as PopoverOpenContext, f as ButtonBase, p as polymorphic, m as mergeEventHandlers, I as IconButton, e as useMergedRefs, O as useResizeObserver, Q as getWindow, b as useIsomorphicLayoutEffect, U as Portal, W as PortalContainerContext } from "./iframe-MZ9GDAUV.js";
const useEventListener = (eventName, handler, element) => {
  let savedHandler = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  reactExports.useEffect(() => {
    if (!element) return;
    let eventListener = (event) => savedHandler.current?.(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
let tabbableElementsSelector = 'a[href], button, input, textarea, select, details, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';
const getTabbableElements = (container) => {
  if (!container) return [];
  let elements = container.querySelectorAll(tabbableElementsSelector);
  return Array.from(elements).filter(
    (el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled")
  );
};
const getFocusableElements = (container) => {
  if (!container) return [];
  let elements = container.querySelectorAll(
    `${tabbableElementsSelector}, [tabindex="-1"]`
  );
  return Array.from(elements).filter(
    (el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled")
  );
};
function useFocusableElements(root, extraOptions) {
  let focusableElementsRef = reactExports.useRef([]);
  let [focusableElements, setFocusableElements] = reactExports.useState(
    focusableElementsRef.current
  );
  let setFocusableElementsRefAndState = (newFocusableElements) => {
    focusableElementsRef.current = newFocusableElements;
    setFocusableElements(newFocusableElements);
  };
  let { filter: filterProp } = extraOptions ?? {};
  let filter = useLatestRef(filterProp);
  let returnValue = reactExports.useMemo(
    () => ({
      focusableElementsRef,
      focusableElements
    }),
    [focusableElementsRef, focusableElements]
  );
  return useSyncExternalStore(
    reactExports.useCallback(() => {
      if (!root) {
        setFocusableElementsRefAndState([]);
        return () => {
        };
      }
      updateFocusableElements();
      let observer = new MutationObserver(() => updateFocusableElements());
      observer.observe(root, {
        childList: true,
        subtree: true
      });
      return () => observer.disconnect();
      function updateFocusableElements() {
        let newFocusableElements = getFocusableElements(root);
        if (filter.current)
          newFocusableElements = filter.current?.(newFocusableElements);
        setFocusableElementsRefAndState(newFocusableElements);
      }
    }, [root, filter]),
    () => returnValue,
    () => returnValue
  );
}
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
const SvgCheckmarkSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m6 13.4-4.7-4.7 1.4-1.4 3.3 3.3 7.3-7.3 1.4 1.4z"
  })
);
const SvgImportantSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M6.25 1h3.5v3.19l-.676 6.408H6.91L6.25 4.19zm.12 10.572h3.268V15H6.37z"
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
const ProgressRadial = reactExports.forwardRef((props, forwardedRef) => {
  let {
    value,
    indeterminate = void 0 === value,
    status,
    size,
    className,
    style,
    children,
    ...rest
  } = props;
  let statusMap = {
    negative: reactExports.createElement(SvgImportantSmall, {
      "aria-hidden": true
    }),
    positive: reactExports.createElement(SvgCheckmarkSmall, {
      "aria-hidden": true
    }),
    warning: reactExports.createElement(SvgImportantSmall, {
      "aria-hidden": true
    })
  };
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-progress-indicator-radial", className),
      "data-iui-size": size,
      "data-iui-status": status,
      "data-iui-indeterminate": indeterminate ? "true" : void 0,
      ref: forwardedRef,
      style: {
        ...void 0 !== value && {
          "--iui-progress-percentage": `${getBoundedValue(value, 0, 100)}%`
        },
        ...style
      },
      ...rest
    },
    reactExports.createElement(
      ShadowRoot,
      null,
      100 !== value && reactExports.createElement(VisuallyHidden, null, "Loading."),
      reactExports.createElement("slot", null)
    ),
    "x-small" !== size ? children ?? (status ? statusMap[status] : null) : null
  );
});
const Button = reactExports.forwardRef((props, ref) => {
  let {
    children,
    className,
    size,
    styleType = "default",
    startIcon,
    endIcon,
    labelProps,
    startIconProps,
    endIconProps,
    stretched,
    loading,
    disabled: disabledProp,
    ...rest
  } = props;
  let hasPopoverOpen = reactExports.useContext(PopoverOpenContext);
  return reactExports.createElement(
    ButtonBase,
    {
      ref,
      className: classnames("iui-button", "iui-field", className),
      "data-iui-variant": "default" !== styleType ? styleType : void 0,
      "data-iui-size": size,
      "data-iui-loading": loading ? "true" : void 0,
      "data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
      disabled: disabledProp || loading,
      ...rest,
      style: {
        "--_iui-width": stretched ? "100%" : void 0,
        ...props.style
      }
    },
    startIcon && reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...startIconProps,
        className: classnames("iui-button-icon", startIconProps?.className)
      },
      startIcon
    ),
    children && reactExports.createElement(
      Box,
      {
        as: "span",
        ...labelProps,
        className: classnames("iui-button-label", labelProps?.className)
      },
      children
    ),
    endIcon && reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...endIconProps,
        className: classnames("iui-button-icon", endIconProps?.className)
      },
      endIcon
    ),
    loading && reactExports.createElement(ProgressRadial, {
      size: "small" === size ? "x-small" : "small",
      className: "iui-button-spinner",
      "aria-hidden": true
    })
  );
});
const DialogContext = reactExports.createContext(void 0);
const useDialogContext = () => reactExports.useContext(DialogContext);
const DialogMainContext = reactExports.createContext(null);
const useDialogMainContext = () => reactExports.useContext(DialogMainContext);
const DialogTitleBarTitle = polymorphic.div("iui-dialog-title");
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
function assert(condition, message) {
  return;
}
var OpenMode;
(function(OpenMode2) {
  OpenMode2[OpenMode2["Readonly"] = 1] = "Readonly";
  OpenMode2[OpenMode2["ReadWrite"] = 2] = "ReadWrite";
})(OpenMode || (OpenMode = {}));
var DbOpcode;
(function(DbOpcode2) {
  DbOpcode2[DbOpcode2["Delete"] = 9] = "Delete";
  DbOpcode2[DbOpcode2["Insert"] = 18] = "Insert";
  DbOpcode2[DbOpcode2["Update"] = 23] = "Update";
})(DbOpcode || (DbOpcode = {}));
var DbResult;
(function(DbResult2) {
  DbResult2[DbResult2["BE_SQLITE_OK"] = 0] = "BE_SQLITE_OK";
  DbResult2[DbResult2["BE_SQLITE_ERROR"] = 1] = "BE_SQLITE_ERROR";
  DbResult2[DbResult2["BE_SQLITE_INTERNAL"] = 2] = "BE_SQLITE_INTERNAL";
  DbResult2[DbResult2["BE_SQLITE_PERM"] = 3] = "BE_SQLITE_PERM";
  DbResult2[DbResult2["BE_SQLITE_ABORT"] = 4] = "BE_SQLITE_ABORT";
  DbResult2[DbResult2["BE_SQLITE_BUSY"] = 5] = "BE_SQLITE_BUSY";
  DbResult2[DbResult2["BE_SQLITE_LOCKED"] = 6] = "BE_SQLITE_LOCKED";
  DbResult2[DbResult2["BE_SQLITE_NOMEM"] = 7] = "BE_SQLITE_NOMEM";
  DbResult2[DbResult2["BE_SQLITE_READONLY"] = 8] = "BE_SQLITE_READONLY";
  DbResult2[DbResult2["BE_SQLITE_INTERRUPT"] = 9] = "BE_SQLITE_INTERRUPT";
  DbResult2[DbResult2["BE_SQLITE_IOERR"] = 10] = "BE_SQLITE_IOERR";
  DbResult2[DbResult2["BE_SQLITE_CORRUPT"] = 11] = "BE_SQLITE_CORRUPT";
  DbResult2[DbResult2["BE_SQLITE_NOTFOUND"] = 12] = "BE_SQLITE_NOTFOUND";
  DbResult2[DbResult2["BE_SQLITE_FULL"] = 13] = "BE_SQLITE_FULL";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN"] = 14] = "BE_SQLITE_CANTOPEN";
  DbResult2[DbResult2["BE_SQLITE_PROTOCOL"] = 15] = "BE_SQLITE_PROTOCOL";
  DbResult2[DbResult2["BE_SQLITE_EMPTY"] = 16] = "BE_SQLITE_EMPTY";
  DbResult2[DbResult2["BE_SQLITE_SCHEMA"] = 17] = "BE_SQLITE_SCHEMA";
  DbResult2[DbResult2["BE_SQLITE_TOOBIG"] = 18] = "BE_SQLITE_TOOBIG";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_BASE"] = 19] = "BE_SQLITE_CONSTRAINT_BASE";
  DbResult2[DbResult2["BE_SQLITE_MISMATCH"] = 20] = "BE_SQLITE_MISMATCH";
  DbResult2[DbResult2["BE_SQLITE_MISUSE"] = 21] = "BE_SQLITE_MISUSE";
  DbResult2[DbResult2["BE_SQLITE_NOLFS"] = 22] = "BE_SQLITE_NOLFS";
  DbResult2[DbResult2["BE_SQLITE_AUTH"] = 23] = "BE_SQLITE_AUTH";
  DbResult2[DbResult2["BE_SQLITE_FORMAT"] = 24] = "BE_SQLITE_FORMAT";
  DbResult2[DbResult2["BE_SQLITE_RANGE"] = 25] = "BE_SQLITE_RANGE";
  DbResult2[DbResult2["BE_SQLITE_NOTADB"] = 26] = "BE_SQLITE_NOTADB";
  DbResult2[DbResult2["BE_SQLITE_ROW"] = 100] = "BE_SQLITE_ROW";
  DbResult2[DbResult2["BE_SQLITE_DONE"] = 101] = "BE_SQLITE_DONE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_READ"] = 266] = "BE_SQLITE_IOERR_READ";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHORT_READ"] = 522] = "BE_SQLITE_IOERR_SHORT_READ";
  DbResult2[DbResult2["BE_SQLITE_IOERR_WRITE"] = 778] = "BE_SQLITE_IOERR_WRITE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_FSYNC"] = 1034] = "BE_SQLITE_IOERR_FSYNC";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DIR_FSYNC"] = 1290] = "BE_SQLITE_IOERR_DIR_FSYNC";
  DbResult2[DbResult2["BE_SQLITE_IOERR_TRUNCATE"] = 1546] = "BE_SQLITE_IOERR_TRUNCATE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_FSTAT"] = 1802] = "BE_SQLITE_IOERR_FSTAT";
  DbResult2[DbResult2["BE_SQLITE_IOERR_UNLOCK"] = 2058] = "BE_SQLITE_IOERR_UNLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_RDLOCK"] = 2314] = "BE_SQLITE_IOERR_RDLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DELETE"] = 2570] = "BE_SQLITE_IOERR_DELETE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_BLOCKED"] = 2826] = "BE_SQLITE_IOERR_BLOCKED";
  DbResult2[DbResult2["BE_SQLITE_IOERR_NOMEM"] = 3082] = "BE_SQLITE_IOERR_NOMEM";
  DbResult2[DbResult2["BE_SQLITE_IOERR_ACCESS"] = 3338] = "BE_SQLITE_IOERR_ACCESS";
  DbResult2[DbResult2["BE_SQLITE_IOERR_CHECKRESERVEDLOCK"] = 3594] = "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_LOCK"] = 3850] = "BE_SQLITE_IOERR_LOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_CLOSE"] = 4106] = "BE_SQLITE_IOERR_CLOSE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DIR_CLOSE"] = 4362] = "BE_SQLITE_IOERR_DIR_CLOSE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMOPEN"] = 4618] = "BE_SQLITE_IOERR_SHMOPEN";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMSIZE"] = 4874] = "BE_SQLITE_IOERR_SHMSIZE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMLOCK"] = 5130] = "BE_SQLITE_IOERR_SHMLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMMAP"] = 5386] = "BE_SQLITE_IOERR_SHMMAP";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SEEK"] = 5642] = "BE_SQLITE_IOERR_SEEK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DELETE_NOENT"] = 5898] = "BE_SQLITE_IOERR_DELETE_NOENT";
  DbResult2[DbResult2["BE_SQLITE_ERROR_FileExists"] = 16777226] = "BE_SQLITE_ERROR_FileExists";
  DbResult2[DbResult2["BE_SQLITE_ERROR_AlreadyOpen"] = 33554442] = "BE_SQLITE_ERROR_AlreadyOpen";
  DbResult2[DbResult2["BE_SQLITE_ERROR_NoPropertyTable"] = 50331658] = "BE_SQLITE_ERROR_NoPropertyTable";
  DbResult2[DbResult2["BE_SQLITE_ERROR_FileNotFound"] = 67108874] = "BE_SQLITE_ERROR_FileNotFound";
  DbResult2[DbResult2["BE_SQLITE_ERROR_NoTxnActive"] = 83886090] = "BE_SQLITE_ERROR_NoTxnActive";
  DbResult2[DbResult2["BE_SQLITE_ERROR_BadDbProfile"] = 100663306] = "BE_SQLITE_ERROR_BadDbProfile";
  DbResult2[DbResult2["BE_SQLITE_ERROR_InvalidProfileVersion"] = 117440522] = "BE_SQLITE_ERROR_InvalidProfileVersion";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileUpgradeFailed"] = 134217738] = "BE_SQLITE_ERROR_ProfileUpgradeFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooOldForReadWrite"] = 150994954] = "BE_SQLITE_ERROR_ProfileTooOldForReadWrite";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooOld"] = 167772170] = "BE_SQLITE_ERROR_ProfileTooOld";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooNewForReadWrite"] = 184549386] = "BE_SQLITE_ERROR_ProfileTooNewForReadWrite";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooNew"] = 201326602] = "BE_SQLITE_ERROR_ProfileTooNew";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ChangeTrackError"] = 218103818] = "BE_SQLITE_ERROR_ChangeTrackError";
  DbResult2[DbResult2["BE_SQLITE_ERROR_InvalidChangeSetVersion"] = 234881034] = "BE_SQLITE_ERROR_InvalidChangeSetVersion";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeRequired"] = 251658250] = "BE_SQLITE_ERROR_SchemaUpgradeRequired";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaTooNew"] = 268435466] = "BE_SQLITE_ERROR_SchemaTooNew";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaTooOld"] = 285212682] = "BE_SQLITE_ERROR_SchemaTooOld";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaLockFailed"] = 301989898] = "BE_SQLITE_ERROR_SchemaLockFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeFailed"] = 318767114] = "BE_SQLITE_ERROR_SchemaUpgradeFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaImportFailed"] = 335544330] = "BE_SQLITE_ERROR_SchemaImportFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes"] = 352321546] = "BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeRecommended"] = 369098762] = "BE_SQLITE_ERROR_SchemaUpgradeRecommended";
  DbResult2[DbResult2["BE_SQLITE_ERROR_DataTransformRequired"] = 385875978] = "BE_SQLITE_ERROR_DataTransformRequired";
  DbResult2[DbResult2["BE_SQLITE_LOCKED_SHAREDCACHE"] = 262] = "BE_SQLITE_LOCKED_SHAREDCACHE";
  DbResult2[DbResult2["BE_SQLITE_BUSY_RECOVERY"] = 261] = "BE_SQLITE_BUSY_RECOVERY";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_NOTEMPDIR"] = 270] = "BE_SQLITE_CANTOPEN_NOTEMPDIR";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_ISDIR"] = 526] = "BE_SQLITE_CANTOPEN_ISDIR";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_FULLPATH"] = 782] = "BE_SQLITE_CANTOPEN_FULLPATH";
  DbResult2[DbResult2["BE_SQLITE_CORRUPT_VTAB"] = 267] = "BE_SQLITE_CORRUPT_VTAB";
  DbResult2[DbResult2["BE_SQLITE_READONLY_RECOVERY"] = 264] = "BE_SQLITE_READONLY_RECOVERY";
  DbResult2[DbResult2["BE_SQLITE_READONLY_CANTLOCK"] = 520] = "BE_SQLITE_READONLY_CANTLOCK";
  DbResult2[DbResult2["BE_SQLITE_READONLY_ROLLBACK"] = 776] = "BE_SQLITE_READONLY_ROLLBACK";
  DbResult2[DbResult2["BE_SQLITE_ABORT_ROLLBACK"] = 516] = "BE_SQLITE_ABORT_ROLLBACK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_CHECK"] = 275] = "BE_SQLITE_CONSTRAINT_CHECK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_COMMITHOOK"] = 531] = "BE_SQLITE_CONSTRAINT_COMMITHOOK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_FOREIGNKEY"] = 787] = "BE_SQLITE_CONSTRAINT_FOREIGNKEY";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_FUNCTION"] = 1043] = "BE_SQLITE_CONSTRAINT_FUNCTION";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_NOTNULL"] = 1299] = "BE_SQLITE_CONSTRAINT_NOTNULL";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_PRIMARYKEY"] = 1555] = "BE_SQLITE_CONSTRAINT_PRIMARYKEY";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_TRIGGER"] = 1811] = "BE_SQLITE_CONSTRAINT_TRIGGER";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_UNIQUE"] = 2067] = "BE_SQLITE_CONSTRAINT_UNIQUE";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_VTAB"] = 2323] = "BE_SQLITE_CONSTRAINT_VTAB";
})(DbResult || (DbResult = {}));
var RepositoryStatus;
(function(RepositoryStatus2) {
  RepositoryStatus2[RepositoryStatus2["Success"] = 0] = "Success";
  RepositoryStatus2[RepositoryStatus2["ServerUnavailable"] = 86017] = "ServerUnavailable";
  RepositoryStatus2[RepositoryStatus2["LockAlreadyHeld"] = 86018] = "LockAlreadyHeld";
  RepositoryStatus2[RepositoryStatus2["SyncError"] = 86019] = "SyncError";
  RepositoryStatus2[RepositoryStatus2["InvalidResponse"] = 86020] = "InvalidResponse";
  RepositoryStatus2[RepositoryStatus2["PendingTransactions"] = 86021] = "PendingTransactions";
  RepositoryStatus2[RepositoryStatus2["LockUsed"] = 86022] = "LockUsed";
  RepositoryStatus2[RepositoryStatus2["CannotCreateChangeSet"] = 86023] = "CannotCreateChangeSet";
  RepositoryStatus2[RepositoryStatus2["InvalidRequest"] = 86024] = "InvalidRequest";
  RepositoryStatus2[RepositoryStatus2["ChangeSetRequired"] = 86025] = "ChangeSetRequired";
  RepositoryStatus2[RepositoryStatus2["CodeUnavailable"] = 86026] = "CodeUnavailable";
  RepositoryStatus2[RepositoryStatus2["CodeNotReserved"] = 86027] = "CodeNotReserved";
  RepositoryStatus2[RepositoryStatus2["CodeUsed"] = 86028] = "CodeUsed";
  RepositoryStatus2[RepositoryStatus2["LockNotHeld"] = 86029] = "LockNotHeld";
  RepositoryStatus2[RepositoryStatus2["RepositoryIsLocked"] = 86030] = "RepositoryIsLocked";
  RepositoryStatus2[RepositoryStatus2["ChannelConstraintViolation"] = 86031] = "ChannelConstraintViolation";
})(RepositoryStatus || (RepositoryStatus = {}));
var JsonUtils;
(function(JsonUtils2) {
  function asBool(json, defaultVal = false) {
    return isNullOrUndefined(json) ? defaultVal : !!json;
  }
  JsonUtils2.asBool = asBool;
  function asInt(json, defaultVal = 0) {
    return typeof json === "number" ? Math.trunc(json) : defaultVal;
  }
  JsonUtils2.asInt = asInt;
  function asDouble(json, defaultVal = 0) {
    return typeof json === "number" ? json : defaultVal;
  }
  JsonUtils2.asDouble = asDouble;
  function asString(json, defaultVal = "") {
    return isNullOrUndefined(json) ? defaultVal : json.toString();
  }
  JsonUtils2.asString = asString;
  function asArray(json) {
    return Array.isArray(json) ? json : void 0;
  }
  JsonUtils2.asArray = asArray;
  function asObject(json) {
    return "object" === typeof json ? json : void 0;
  }
  JsonUtils2.asObject = asObject;
  function setOrRemoveNumber(json, key, val, defaultVal) {
    if (val === defaultVal)
      delete json[key];
    else
      json[key] = val;
  }
  JsonUtils2.setOrRemoveNumber = setOrRemoveNumber;
  function setOrRemoveBoolean(json, key, val, defaultVal) {
    if (val === defaultVal)
      delete json[key];
    else
      json[key] = val;
  }
  JsonUtils2.setOrRemoveBoolean = setOrRemoveBoolean;
  function isObject(json) {
    return json !== null && "object" === typeof json;
  }
  JsonUtils2.isObject = isObject;
  function isEmptyObject(json) {
    return isObject(json) && 0 === Object.keys(json).length;
  }
  JsonUtils2.isEmptyObject = isEmptyObject;
  function isEmptyObjectOrUndefined(json) {
    return void 0 === json || isEmptyObject(json);
  }
  JsonUtils2.isEmptyObjectOrUndefined = isEmptyObjectOrUndefined;
  function isNullOrUndefined(json) {
    return null === json || void 0 === json;
  }
  function isNonEmptyObject(value) {
    return !isEmptyObjectOrUndefined(value);
  }
  JsonUtils2.isNonEmptyObject = isNonEmptyObject;
  function toObject(val) {
    if (typeof val === "boolean" || typeof val === "number" || typeof val === "string")
      return val;
    if (typeof val !== "object")
      return void 0;
    if (typeof val.toJSON !== "undefined")
      return toObject(val.toJSON());
    if (Array.isArray(val)) {
      const arr = new Array(val.length);
      val.forEach((el, i) => arr[i] = toObject(el));
      return arr;
    }
    const out = {};
    Object.getOwnPropertyNames(val).forEach((prop) => {
      const transformVal = toObject(val[prop]);
      if (transformVal !== void 0)
        out[prop] = transformVal;
    });
    return out;
  }
  JsonUtils2.toObject = toObject;
})(JsonUtils || (JsonUtils = {}));
var ITwinError;
(function(ITwinError2) {
  function create(args) {
    const err = new Error(args.message);
    Object.assign(err, args);
    err.name = args.iTwinErrorId.key;
    return err;
  }
  ITwinError2.create = create;
  function throwError(args) {
    throw create(args);
  }
  ITwinError2.throwError = throwError;
  function isError(error, scope, key) {
    return JsonUtils.isObject(error) && "iTwinErrorId" in error && JsonUtils.isObject(error.iTwinErrorId) && error.iTwinErrorId.scope === scope && (void 0 === key || error.iTwinErrorId.key === key);
  }
  ITwinError2.isError = isError;
})(ITwinError || (ITwinError = {}));
var BentleyStatus;
(function(BentleyStatus2) {
  BentleyStatus2[BentleyStatus2["SUCCESS"] = 0] = "SUCCESS";
  BentleyStatus2[BentleyStatus2["ERROR"] = 32768] = "ERROR";
})(BentleyStatus || (BentleyStatus = {}));
var IModelStatus;
(function(IModelStatus2) {
  IModelStatus2[IModelStatus2["IMODEL_ERROR_BASE"] = 65536] = "IMODEL_ERROR_BASE";
  IModelStatus2[IModelStatus2["Success"] = 0] = "Success";
  IModelStatus2[IModelStatus2["AlreadyLoaded"] = 65537] = "AlreadyLoaded";
  IModelStatus2[IModelStatus2["AlreadyOpen"] = 65538] = "AlreadyOpen";
  IModelStatus2[IModelStatus2["BadArg"] = 65539] = "BadArg";
  IModelStatus2[IModelStatus2["BadElement"] = 65540] = "BadElement";
  IModelStatus2[IModelStatus2["BadModel"] = 65541] = "BadModel";
  IModelStatus2[IModelStatus2["BadRequest"] = 65542] = "BadRequest";
  IModelStatus2[IModelStatus2["BadSchema"] = 65543] = "BadSchema";
  IModelStatus2[IModelStatus2["CannotUndo"] = 65544] = "CannotUndo";
  IModelStatus2[IModelStatus2["CodeNotReserved"] = 65545] = "CodeNotReserved";
  IModelStatus2[IModelStatus2["DeletionProhibited"] = 65546] = "DeletionProhibited";
  IModelStatus2[IModelStatus2["DuplicateCode"] = 65547] = "DuplicateCode";
  IModelStatus2[IModelStatus2["DuplicateName"] = 65548] = "DuplicateName";
  IModelStatus2[IModelStatus2["ElementBlockedChange"] = 65549] = "ElementBlockedChange";
  IModelStatus2[IModelStatus2["FileAlreadyExists"] = 65550] = "FileAlreadyExists";
  IModelStatus2[IModelStatus2["FileNotFound"] = 65551] = "FileNotFound";
  IModelStatus2[IModelStatus2["FileNotLoaded"] = 65552] = "FileNotLoaded";
  IModelStatus2[IModelStatus2["ForeignKeyConstraint"] = 65553] = "ForeignKeyConstraint";
  IModelStatus2[IModelStatus2["IdExists"] = 65554] = "IdExists";
  IModelStatus2[IModelStatus2["InDynamicTransaction"] = 65555] = "InDynamicTransaction";
  IModelStatus2[IModelStatus2["InvalidCategory"] = 65556] = "InvalidCategory";
  IModelStatus2[IModelStatus2["InvalidCode"] = 65557] = "InvalidCode";
  IModelStatus2[IModelStatus2["InvalidCodeSpec"] = 65558] = "InvalidCodeSpec";
  IModelStatus2[IModelStatus2["InvalidId"] = 65559] = "InvalidId";
  IModelStatus2[IModelStatus2["InvalidName"] = 65560] = "InvalidName";
  IModelStatus2[IModelStatus2["InvalidParent"] = 65561] = "InvalidParent";
  IModelStatus2[IModelStatus2["InvalidProfileVersion"] = 65562] = "InvalidProfileVersion";
  IModelStatus2[IModelStatus2["IsCreatingChangeSet"] = 65563] = "IsCreatingChangeSet";
  IModelStatus2[IModelStatus2["LockNotHeld"] = 65564] = "LockNotHeld";
  IModelStatus2[IModelStatus2["Mismatch2d3d"] = 65565] = "Mismatch2d3d";
  IModelStatus2[IModelStatus2["MismatchGcs"] = 65566] = "MismatchGcs";
  IModelStatus2[IModelStatus2["MissingDomain"] = 65567] = "MissingDomain";
  IModelStatus2[IModelStatus2["MissingHandler"] = 65568] = "MissingHandler";
  IModelStatus2[IModelStatus2["MissingId"] = 65569] = "MissingId";
  IModelStatus2[IModelStatus2["NoGeometry"] = 65570] = "NoGeometry";
  IModelStatus2[IModelStatus2["NoMultiTxnOperation"] = 65571] = "NoMultiTxnOperation";
  IModelStatus2[IModelStatus2["NotEnabled"] = 65573] = "NotEnabled";
  IModelStatus2[IModelStatus2["NotFound"] = 65574] = "NotFound";
  IModelStatus2[IModelStatus2["NotOpen"] = 65575] = "NotOpen";
  IModelStatus2[IModelStatus2["NotOpenForWrite"] = 65576] = "NotOpenForWrite";
  IModelStatus2[IModelStatus2["NotSameUnitBase"] = 65577] = "NotSameUnitBase";
  IModelStatus2[IModelStatus2["NothingToRedo"] = 65578] = "NothingToRedo";
  IModelStatus2[IModelStatus2["NothingToUndo"] = 65579] = "NothingToUndo";
  IModelStatus2[IModelStatus2["ParentBlockedChange"] = 65580] = "ParentBlockedChange";
  IModelStatus2[IModelStatus2["ReadError"] = 65581] = "ReadError";
  IModelStatus2[IModelStatus2["ReadOnly"] = 65582] = "ReadOnly";
  IModelStatus2[IModelStatus2["ReadOnlyDomain"] = 65583] = "ReadOnlyDomain";
  IModelStatus2[IModelStatus2["RepositoryManagerError"] = 65584] = "RepositoryManagerError";
  IModelStatus2[IModelStatus2["SQLiteError"] = 65585] = "SQLiteError";
  IModelStatus2[IModelStatus2["TransactionActive"] = 65586] = "TransactionActive";
  IModelStatus2[IModelStatus2["UnitsMissing"] = 65587] = "UnitsMissing";
  IModelStatus2[IModelStatus2["UnknownFormat"] = 65588] = "UnknownFormat";
  IModelStatus2[IModelStatus2["UpgradeFailed"] = 65589] = "UpgradeFailed";
  IModelStatus2[IModelStatus2["ValidationFailed"] = 65590] = "ValidationFailed";
  IModelStatus2[IModelStatus2["VersionTooNew"] = 65591] = "VersionTooNew";
  IModelStatus2[IModelStatus2["VersionTooOld"] = 65592] = "VersionTooOld";
  IModelStatus2[IModelStatus2["ViewNotFound"] = 65593] = "ViewNotFound";
  IModelStatus2[IModelStatus2["WriteError"] = 65594] = "WriteError";
  IModelStatus2[IModelStatus2["WrongClass"] = 65595] = "WrongClass";
  IModelStatus2[IModelStatus2["WrongIModel"] = 65596] = "WrongIModel";
  IModelStatus2[IModelStatus2["WrongDomain"] = 65597] = "WrongDomain";
  IModelStatus2[IModelStatus2["WrongElement"] = 65598] = "WrongElement";
  IModelStatus2[IModelStatus2["WrongHandler"] = 65599] = "WrongHandler";
  IModelStatus2[IModelStatus2["WrongModel"] = 65600] = "WrongModel";
  IModelStatus2[IModelStatus2["ConstraintNotUnique"] = 65601] = "ConstraintNotUnique";
  IModelStatus2[IModelStatus2["NoGeoLocation"] = 65602] = "NoGeoLocation";
  IModelStatus2[IModelStatus2["ServerTimeout"] = 65603] = "ServerTimeout";
  IModelStatus2[IModelStatus2["NoContent"] = 65604] = "NoContent";
  IModelStatus2[IModelStatus2["NotRegistered"] = 65605] = "NotRegistered";
  IModelStatus2[IModelStatus2["FunctionNotFound"] = 65606] = "FunctionNotFound";
  IModelStatus2[IModelStatus2["NoActiveCommand"] = 65607] = "NoActiveCommand";
  IModelStatus2[IModelStatus2["Aborted"] = 65608] = "Aborted";
})(IModelStatus || (IModelStatus = {}));
var BriefcaseStatus;
(function(BriefcaseStatus2) {
  BriefcaseStatus2[BriefcaseStatus2["BRIEFCASE_STATUS_BASE"] = 131072] = "BRIEFCASE_STATUS_BASE";
  BriefcaseStatus2[BriefcaseStatus2["CannotAcquire"] = 131072] = "CannotAcquire";
  BriefcaseStatus2[BriefcaseStatus2["CannotDownload"] = 131073] = "CannotDownload";
  BriefcaseStatus2[BriefcaseStatus2["CannotUpload"] = 131074] = "CannotUpload";
  BriefcaseStatus2[BriefcaseStatus2["CannotCopy"] = 131075] = "CannotCopy";
  BriefcaseStatus2[BriefcaseStatus2["CannotDelete"] = 131076] = "CannotDelete";
  BriefcaseStatus2[BriefcaseStatus2["VersionNotFound"] = 131077] = "VersionNotFound";
  BriefcaseStatus2[BriefcaseStatus2["CannotApplyChanges"] = 131078] = "CannotApplyChanges";
  BriefcaseStatus2[BriefcaseStatus2["DownloadCancelled"] = 131079] = "DownloadCancelled";
  BriefcaseStatus2[BriefcaseStatus2["ContainsDeletedChangeSets"] = 131080] = "ContainsDeletedChangeSets";
})(BriefcaseStatus || (BriefcaseStatus = {}));
var RpcInterfaceStatus;
(function(RpcInterfaceStatus2) {
  RpcInterfaceStatus2[RpcInterfaceStatus2["Success"] = 0] = "Success";
  RpcInterfaceStatus2[RpcInterfaceStatus2["RPC_INTERFACE_ERROR_BASE"] = 135168] = "RPC_INTERFACE_ERROR_BASE";
  RpcInterfaceStatus2[RpcInterfaceStatus2["IncompatibleVersion"] = 135168] = "IncompatibleVersion";
})(RpcInterfaceStatus || (RpcInterfaceStatus = {}));
var ChangeSetStatus;
(function(ChangeSetStatus2) {
  ChangeSetStatus2[ChangeSetStatus2["Success"] = 0] = "Success";
  ChangeSetStatus2[ChangeSetStatus2["CHANGESET_ERROR_BASE"] = 90112] = "CHANGESET_ERROR_BASE";
  ChangeSetStatus2[ChangeSetStatus2["ApplyError"] = 90113] = "ApplyError";
  ChangeSetStatus2[ChangeSetStatus2["ChangeTrackingNotEnabled"] = 90114] = "ChangeTrackingNotEnabled";
  ChangeSetStatus2[ChangeSetStatus2["CorruptedChangeStream"] = 90115] = "CorruptedChangeStream";
  ChangeSetStatus2[ChangeSetStatus2["FileNotFound"] = 90116] = "FileNotFound";
  ChangeSetStatus2[ChangeSetStatus2["FileWriteError"] = 90117] = "FileWriteError";
  ChangeSetStatus2[ChangeSetStatus2["HasLocalChanges"] = 90118] = "HasLocalChanges";
  ChangeSetStatus2[ChangeSetStatus2["HasUncommittedChanges"] = 90119] = "HasUncommittedChanges";
  ChangeSetStatus2[ChangeSetStatus2["InvalidId"] = 90120] = "InvalidId";
  ChangeSetStatus2[ChangeSetStatus2["InvalidVersion"] = 90121] = "InvalidVersion";
  ChangeSetStatus2[ChangeSetStatus2["InDynamicTransaction"] = 90122] = "InDynamicTransaction";
  ChangeSetStatus2[ChangeSetStatus2["IsCreatingChangeSet"] = 90123] = "IsCreatingChangeSet";
  ChangeSetStatus2[ChangeSetStatus2["IsNotCreatingChangeSet"] = 90124] = "IsNotCreatingChangeSet";
  ChangeSetStatus2[ChangeSetStatus2["MergePropagationError"] = 90125] = "MergePropagationError";
  ChangeSetStatus2[ChangeSetStatus2["NothingToMerge"] = 90126] = "NothingToMerge";
  ChangeSetStatus2[ChangeSetStatus2["NoTransactions"] = 90127] = "NoTransactions";
  ChangeSetStatus2[ChangeSetStatus2["ParentMismatch"] = 90128] = "ParentMismatch";
  ChangeSetStatus2[ChangeSetStatus2["SQLiteError"] = 90129] = "SQLiteError";
  ChangeSetStatus2[ChangeSetStatus2["WrongDgnDb"] = 90130] = "WrongDgnDb";
  ChangeSetStatus2[ChangeSetStatus2["CouldNotOpenDgnDb"] = 90131] = "CouldNotOpenDgnDb";
  ChangeSetStatus2[ChangeSetStatus2["MergeSchemaChangesOnOpen"] = 90132] = "MergeSchemaChangesOnOpen";
  ChangeSetStatus2[ChangeSetStatus2["ReverseOrReinstateSchemaChanges"] = 90133] = "ReverseOrReinstateSchemaChanges";
  ChangeSetStatus2[ChangeSetStatus2["ProcessSchemaChangesOnOpen"] = 90134] = "ProcessSchemaChangesOnOpen";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoReadonly"] = 90135] = "CannotMergeIntoReadonly";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoMaster"] = 90136] = "CannotMergeIntoMaster";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoReversed"] = 90137] = "CannotMergeIntoReversed";
  ChangeSetStatus2[ChangeSetStatus2["DownloadCancelled"] = 90138] = "DownloadCancelled";
})(ChangeSetStatus || (ChangeSetStatus = {}));
var HttpStatus;
(function(HttpStatus2) {
  HttpStatus2[HttpStatus2["Success"] = 0] = "Success";
  HttpStatus2[HttpStatus2["Info"] = 94209] = "Info";
  HttpStatus2[HttpStatus2["Redirection"] = 94210] = "Redirection";
  HttpStatus2[HttpStatus2["ClientError"] = 94211] = "ClientError";
  HttpStatus2[HttpStatus2["ServerError"] = 94212] = "ServerError";
})(HttpStatus || (HttpStatus = {}));
var IModelHubStatus;
(function(IModelHubStatus2) {
  IModelHubStatus2[IModelHubStatus2["Success"] = 0] = "Success";
  IModelHubStatus2[IModelHubStatus2["IMODELHUBERROR_BASE"] = 102400] = "IMODELHUBERROR_BASE";
  IModelHubStatus2[IModelHubStatus2["IMODELHUBERROR_REQUESTERRORBASE"] = 102656] = "IMODELHUBERROR_REQUESTERRORBASE";
  IModelHubStatus2[IModelHubStatus2["Unknown"] = 102401] = "Unknown";
  IModelHubStatus2[IModelHubStatus2["MissingRequiredProperties"] = 102402] = "MissingRequiredProperties";
  IModelHubStatus2[IModelHubStatus2["InvalidPropertiesValues"] = 102403] = "InvalidPropertiesValues";
  IModelHubStatus2[IModelHubStatus2["UserDoesNotHavePermission"] = 102404] = "UserDoesNotHavePermission";
  IModelHubStatus2[IModelHubStatus2["UserDoesNotHaveAccess"] = 102405] = "UserDoesNotHaveAccess";
  IModelHubStatus2[IModelHubStatus2["InvalidBriefcase"] = 102406] = "InvalidBriefcase";
  IModelHubStatus2[IModelHubStatus2["BriefcaseDoesNotExist"] = 102407] = "BriefcaseDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["BriefcaseDoesNotBelongToUser"] = 102408] = "BriefcaseDoesNotBelongToUser";
  IModelHubStatus2[IModelHubStatus2["AnotherUserPushing"] = 102409] = "AnotherUserPushing";
  IModelHubStatus2[IModelHubStatus2["ChangeSetAlreadyExists"] = 102410] = "ChangeSetAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["ChangeSetDoesNotExist"] = 102411] = "ChangeSetDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileIsNotUploaded"] = 102412] = "FileIsNotUploaded";
  IModelHubStatus2[IModelHubStatus2["iModelIsNotInitialized"] = 102413] = "iModelIsNotInitialized";
  IModelHubStatus2[IModelHubStatus2["ChangeSetPointsToBadSeed"] = 102414] = "ChangeSetPointsToBadSeed";
  IModelHubStatus2[IModelHubStatus2["OperationFailed"] = 102415] = "OperationFailed";
  IModelHubStatus2[IModelHubStatus2["PullIsRequired"] = 102416] = "PullIsRequired";
  IModelHubStatus2[IModelHubStatus2["MaximumNumberOfBriefcasesPerUser"] = 102417] = "MaximumNumberOfBriefcasesPerUser";
  IModelHubStatus2[IModelHubStatus2["MaximumNumberOfBriefcasesPerUserPerMinute"] = 102418] = "MaximumNumberOfBriefcasesPerUserPerMinute";
  IModelHubStatus2[IModelHubStatus2["DatabaseTemporarilyLocked"] = 102419] = "DatabaseTemporarilyLocked";
  IModelHubStatus2[IModelHubStatus2["iModelIsLocked"] = 102420] = "iModelIsLocked";
  IModelHubStatus2[IModelHubStatus2["CodesExist"] = 102421] = "CodesExist";
  IModelHubStatus2[IModelHubStatus2["LocksExist"] = 102422] = "LocksExist";
  IModelHubStatus2[IModelHubStatus2["iModelAlreadyExists"] = 102423] = "iModelAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["iModelDoesNotExist"] = 102424] = "iModelDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileDoesNotExist"] = 102425] = "FileDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileAlreadyExists"] = 102426] = "FileAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["LockDoesNotExist"] = 102427] = "LockDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["LockOwnedByAnotherBriefcase"] = 102428] = "LockOwnedByAnotherBriefcase";
  IModelHubStatus2[IModelHubStatus2["CodeStateInvalid"] = 102429] = "CodeStateInvalid";
  IModelHubStatus2[IModelHubStatus2["CodeReservedByAnotherBriefcase"] = 102430] = "CodeReservedByAnotherBriefcase";
  IModelHubStatus2[IModelHubStatus2["CodeDoesNotExist"] = 102431] = "CodeDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventTypeDoesNotExist"] = 102432] = "EventTypeDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventSubscriptionDoesNotExist"] = 102433] = "EventSubscriptionDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventSubscriptionAlreadyExists"] = 102434] = "EventSubscriptionAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["ITwinIdIsNotSpecified"] = 102435] = "ITwinIdIsNotSpecified";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinPermissions"] = 102436] = "FailedToGetITwinPermissions";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinMembers"] = 102437] = "FailedToGetITwinMembers";
  IModelHubStatus2[IModelHubStatus2["ChangeSetAlreadyHasVersion"] = 102438] = "ChangeSetAlreadyHasVersion";
  IModelHubStatus2[IModelHubStatus2["VersionAlreadyExists"] = 102439] = "VersionAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["JobSchedulingFailed"] = 102440] = "JobSchedulingFailed";
  IModelHubStatus2[IModelHubStatus2["ConflictsAggregate"] = 102441] = "ConflictsAggregate";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinById"] = 102442] = "FailedToGetITwinById";
  IModelHubStatus2[IModelHubStatus2["DatabaseOperationFailed"] = 102443] = "DatabaseOperationFailed";
  IModelHubStatus2[IModelHubStatus2["SeedFileInitializationFailed"] = 102444] = "SeedFileInitializationFailed";
  IModelHubStatus2[IModelHubStatus2["FailedToGetAssetPermissions"] = 102445] = "FailedToGetAssetPermissions";
  IModelHubStatus2[IModelHubStatus2["FailedToGetAssetMembers"] = 102446] = "FailedToGetAssetMembers";
  IModelHubStatus2[IModelHubStatus2["ITwinDoesNotExist"] = 102447] = "ITwinDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["LockChunkDoesNotExist"] = 102449] = "LockChunkDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["CheckpointAlreadyExists"] = 102450] = "CheckpointAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["CheckpointDoesNotExist"] = 102451] = "CheckpointDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["UndefinedArgumentError"] = 102657] = "UndefinedArgumentError";
  IModelHubStatus2[IModelHubStatus2["InvalidArgumentError"] = 102658] = "InvalidArgumentError";
  IModelHubStatus2[IModelHubStatus2["MissingDownloadUrlError"] = 102659] = "MissingDownloadUrlError";
  IModelHubStatus2[IModelHubStatus2["NotSupportedInBrowser"] = 102660] = "NotSupportedInBrowser";
  IModelHubStatus2[IModelHubStatus2["FileHandlerNotSet"] = 102661] = "FileHandlerNotSet";
  IModelHubStatus2[IModelHubStatus2["FileNotFound"] = 102662] = "FileNotFound";
  IModelHubStatus2[IModelHubStatus2["InitializationTimeout"] = 102663] = "InitializationTimeout";
})(IModelHubStatus || (IModelHubStatus = {}));
var GeoServiceStatus;
(function(GeoServiceStatus2) {
  GeoServiceStatus2[GeoServiceStatus2["Success"] = 0] = "Success";
  GeoServiceStatus2[GeoServiceStatus2["GEOSERVICESTATUS_BASE"] = 147456] = "GEOSERVICESTATUS_BASE";
  GeoServiceStatus2[GeoServiceStatus2["NoGeoLocation"] = 65602] = "NoGeoLocation";
  GeoServiceStatus2[GeoServiceStatus2["OutOfUsefulRange"] = 147457] = "OutOfUsefulRange";
  GeoServiceStatus2[GeoServiceStatus2["OutOfMathematicalDomain"] = 147458] = "OutOfMathematicalDomain";
  GeoServiceStatus2[GeoServiceStatus2["NoDatumConverter"] = 147459] = "NoDatumConverter";
  GeoServiceStatus2[GeoServiceStatus2["VerticalDatumConvertError"] = 147460] = "VerticalDatumConvertError";
  GeoServiceStatus2[GeoServiceStatus2["CSMapError"] = 147461] = "CSMapError";
  GeoServiceStatus2[GeoServiceStatus2["Pending"] = 147462] = "Pending";
})(GeoServiceStatus || (GeoServiceStatus = {}));
var RealityDataStatus;
(function(RealityDataStatus2) {
  RealityDataStatus2[RealityDataStatus2["Success"] = 0] = "Success";
  RealityDataStatus2[RealityDataStatus2["REALITYDATA_ERROR_BASE"] = 151552] = "REALITYDATA_ERROR_BASE";
  RealityDataStatus2[RealityDataStatus2["InvalidData"] = 151553] = "InvalidData";
})(RealityDataStatus || (RealityDataStatus = {}));
class BentleyError extends Error {
  errorNumber;
  static iTwinErrorScope = "bentley-error";
  _metaData;
  /**
   * @param errorNumber The a number that identifies of the problem.
   * @param message  message that describes the problem (should not be localized).
   * @param metaData metaData about the exception.
   */
  constructor(errorNumber, message, metaData) {
    super(message);
    this.errorNumber = errorNumber;
    this.errorNumber = errorNumber;
    this._metaData = metaData;
    this.name = this._initName();
  }
  /** supply the value for iTwinErrorId  */
  get iTwinErrorId() {
    return { scope: BentleyError.iTwinErrorScope, key: this.name };
  }
  /** value for logging metadata */
  get loggingMetadata() {
    return this.getMetaData();
  }
  /**
   * Determine if an error object implements the `LegacyITwinErrorWithNumber` interface.
   *
   * If the test succeeds, the type of `error` is coerced to `T`
   * @note this method does *not* test that the object is an `instanceOf BentleyError`.
   * @beta
   */
  static isError(error, errorNumber) {
    return ITwinError.isError(error, BentleyError.iTwinErrorScope) && typeof error.errorNumber === "number" && (errorNumber === void 0 || error.errorNumber === errorNumber);
  }
  /** Returns true if this BentleyError includes (optional) metadata. */
  get hasMetaData() {
    return void 0 !== this._metaData;
  }
  /** get the meta data associated with this BentleyError, if any. */
  getMetaData() {
    return BentleyError.getMetaData(this._metaData);
  }
  /** get the metadata object associated with an ExceptionMetaData, if any. */
  static getMetaData(metaData) {
    return typeof metaData === "function" ? metaData() : metaData;
  }
  /** This function returns the name of each error status. Override this method to handle more error status codes. */
  _initName() {
    return BentleyError.getErrorKey(this.errorNumber);
  }
  /** This function returns the name of each error status. */
  static getErrorKey(errorNumber) {
    switch (errorNumber) {
      case IModelStatus.AlreadyLoaded:
        return "Already Loaded";
      case IModelStatus.AlreadyOpen:
        return "Already Open";
      case IModelStatus.BadArg:
        return "Bad Arg";
      case IModelStatus.BadElement:
        return "Bad Element";
      case IModelStatus.BadModel:
        return "Bad Model";
      case IModelStatus.BadRequest:
        return "Bad Request";
      case IModelStatus.BadSchema:
        return "Bad Schema";
      case IModelStatus.CannotUndo:
        return "Can not Undo";
      case IModelStatus.CodeNotReserved:
        return "Code Not Reserved";
      case IModelStatus.DeletionProhibited:
        return "Deletion Prohibited";
      case IModelStatus.DuplicateCode:
        return "Duplicate Code";
      case IModelStatus.DuplicateName:
        return "Duplicate Name";
      case IModelStatus.ElementBlockedChange:
        return "Element Blocked Change";
      case IModelStatus.FileAlreadyExists:
        return "File Already Exists";
      case IModelStatus.FileNotFound:
        return "File Not Found";
      case IModelStatus.FileNotLoaded:
        return "File Not Loaded";
      case IModelStatus.ForeignKeyConstraint:
        return "ForeignKey Constraint";
      case IModelStatus.IdExists:
        return "Id Exists";
      case IModelStatus.InDynamicTransaction:
        return "InDynamicTransaction";
      case IModelStatus.InvalidCategory:
        return "Invalid Category";
      case IModelStatus.InvalidCode:
        return "Invalid Code";
      case IModelStatus.InvalidCodeSpec:
        return "Invalid CodeSpec";
      case IModelStatus.InvalidId:
        return "Invalid Id";
      case IModelStatus.InvalidName:
        return "Invalid Name";
      case IModelStatus.InvalidParent:
        return "Invalid Parent";
      case IModelStatus.InvalidProfileVersion:
        return "Invalid Profile Version";
      case IModelStatus.IsCreatingChangeSet:
        return "IsCreatingChangeSet";
      case IModelStatus.LockNotHeld:
        return "Lock Not Held";
      case IModelStatus.Mismatch2d3d:
        return "Mismatch 2d3d";
      case IModelStatus.MismatchGcs:
        return "Mismatch Gcs";
      case IModelStatus.MissingDomain:
        return "Missing Domain";
      case IModelStatus.MissingHandler:
        return "Missing Handler";
      case IModelStatus.MissingId:
        return "Missing Id";
      case IModelStatus.NoGeometry:
        return "No Geometry";
      case IModelStatus.NoMultiTxnOperation:
        return "NoMultiTxnOperation";
      case IModelStatus.NotEnabled:
        return "Not Enabled";
      case IModelStatus.NotFound:
        return "Not Found";
      case IModelStatus.NotOpen:
        return "Not Open";
      case IModelStatus.NotOpenForWrite:
        return "Not Open For Write";
      case IModelStatus.NotSameUnitBase:
        return "Not Same Unit Base";
      case IModelStatus.NothingToRedo:
        return "Nothing To Redo";
      case IModelStatus.NothingToUndo:
        return "Nothing To Undo";
      case IModelStatus.ParentBlockedChange:
        return "Parent Blocked Change";
      case IModelStatus.ReadError:
        return "Read Error";
      case IModelStatus.ReadOnly:
        return "ReadOnly";
      case IModelStatus.ReadOnlyDomain:
        return "ReadOnlyDomain";
      case IModelStatus.RepositoryManagerError:
        return "RepositoryManagerError";
      case IModelStatus.SQLiteError:
        return "SQLiteError";
      case IModelStatus.TransactionActive:
        return "Transaction Active";
      case IModelStatus.UnitsMissing:
        return "Units Missing";
      case IModelStatus.UnknownFormat:
        return "Unknown Format";
      case IModelStatus.UpgradeFailed:
        return "Upgrade Failed";
      case IModelStatus.ValidationFailed:
        return "Validation Failed";
      case IModelStatus.VersionTooNew:
        return "Version Too New";
      case IModelStatus.VersionTooOld:
        return "Version Too Old";
      case IModelStatus.ViewNotFound:
        return "View Not Found";
      case IModelStatus.WriteError:
        return "Write Error";
      case IModelStatus.WrongClass:
        return "Wrong Class";
      case IModelStatus.WrongIModel:
        return "Wrong IModel";
      case IModelStatus.WrongDomain:
        return "Wrong Domain";
      case IModelStatus.WrongElement:
        return "Wrong Element";
      case IModelStatus.WrongHandler:
        return "Wrong Handler";
      case IModelStatus.WrongModel:
        return "Wrong Model";
      case DbResult.BE_SQLITE_ERROR:
        return "BE_SQLITE_ERROR";
      case DbResult.BE_SQLITE_INTERNAL:
        return "BE_SQLITE_INTERNAL";
      case DbResult.BE_SQLITE_PERM:
        return "BE_SQLITE_PERM";
      case DbResult.BE_SQLITE_ABORT:
        return "BE_SQLITE_ABORT";
      case DbResult.BE_SQLITE_BUSY:
        return "Db is busy";
      case DbResult.BE_SQLITE_LOCKED:
        return "Db is Locked";
      case DbResult.BE_SQLITE_NOMEM:
        return "BE_SQLITE_NOMEM";
      case DbResult.BE_SQLITE_READONLY:
        return "Readonly";
      case DbResult.BE_SQLITE_INTERRUPT:
        return "BE_SQLITE_INTERRUPT";
      case DbResult.BE_SQLITE_IOERR:
        return "BE_SQLITE_IOERR";
      case DbResult.BE_SQLITE_CORRUPT:
        return "BE_SQLITE_CORRUPT";
      case DbResult.BE_SQLITE_NOTFOUND:
        return "Not Found";
      case DbResult.BE_SQLITE_FULL:
        return "BE_SQLITE_FULL";
      case DbResult.BE_SQLITE_CANTOPEN:
        return "Can't open";
      case DbResult.BE_SQLITE_PROTOCOL:
        return "BE_SQLITE_PROTOCOL";
      case DbResult.BE_SQLITE_EMPTY:
        return "BE_SQLITE_EMPTY";
      case DbResult.BE_SQLITE_SCHEMA:
        return "BE_SQLITE_SCHEMA";
      case DbResult.BE_SQLITE_TOOBIG:
        return "BE_SQLITE_TOOBIG";
      case DbResult.BE_SQLITE_MISMATCH:
        return "BE_SQLITE_MISMATCH";
      case DbResult.BE_SQLITE_MISUSE:
        return "BE_SQLITE_MISUSE";
      case DbResult.BE_SQLITE_NOLFS:
        return "BE_SQLITE_NOLFS";
      case DbResult.BE_SQLITE_AUTH:
        return "BE_SQLITE_AUTH";
      case DbResult.BE_SQLITE_FORMAT:
        return "BE_SQLITE_FORMAT";
      case DbResult.BE_SQLITE_RANGE:
        return "BE_SQLITE_RANGE";
      case DbResult.BE_SQLITE_NOTADB:
        return "Not a Database";
      case DbResult.BE_SQLITE_IOERR_READ:
        return "BE_SQLITE_IOERR_READ";
      case DbResult.BE_SQLITE_IOERR_SHORT_READ:
        return "BE_SQLITE_IOERR_SHORT_READ";
      case DbResult.BE_SQLITE_IOERR_WRITE:
        return "BE_SQLITE_IOERR_WRITE";
      case DbResult.BE_SQLITE_IOERR_FSYNC:
        return "BE_SQLITE_IOERR_FSYNC";
      case DbResult.BE_SQLITE_IOERR_DIR_FSYNC:
        return "BE_SQLITE_IOERR_DIR_FSYNC";
      case DbResult.BE_SQLITE_IOERR_TRUNCATE:
        return "BE_SQLITE_IOERR_TRUNCATE";
      case DbResult.BE_SQLITE_IOERR_FSTAT:
        return "BE_SQLITE_IOERR_FSTAT";
      case DbResult.BE_SQLITE_IOERR_UNLOCK:
        return "BE_SQLITE_IOERR_UNLOCK";
      case DbResult.BE_SQLITE_IOERR_RDLOCK:
        return "BE_SQLITE_IOERR_RDLOCK";
      case DbResult.BE_SQLITE_IOERR_DELETE:
        return "BE_SQLITE_IOERR_DELETE";
      case DbResult.BE_SQLITE_IOERR_BLOCKED:
        return "BE_SQLITE_IOERR_BLOCKED";
      case DbResult.BE_SQLITE_IOERR_NOMEM:
        return "BE_SQLITE_IOERR_NOMEM";
      case DbResult.BE_SQLITE_IOERR_ACCESS:
        return "BE_SQLITE_IOERR_ACCESS";
      case DbResult.BE_SQLITE_IOERR_CHECKRESERVEDLOCK:
        return "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
      case DbResult.BE_SQLITE_IOERR_LOCK:
        return "BE_SQLITE_IOERR_LOCK";
      case DbResult.BE_SQLITE_IOERR_CLOSE:
        return "BE_SQLITE_IOERR_CLOSE";
      case DbResult.BE_SQLITE_IOERR_DIR_CLOSE:
        return "BE_SQLITE_IOERR_DIR_CLOSE";
      case DbResult.BE_SQLITE_IOERR_SHMOPEN:
        return "BE_SQLITE_IOERR_SHMOPEN";
      case DbResult.BE_SQLITE_IOERR_SHMSIZE:
        return "BE_SQLITE_IOERR_SHMSIZE";
      case DbResult.BE_SQLITE_IOERR_SHMLOCK:
        return "BE_SQLITE_IOERR_SHMLOCK";
      case DbResult.BE_SQLITE_IOERR_SHMMAP:
        return "BE_SQLITE_IOERR_SHMMAP";
      case DbResult.BE_SQLITE_IOERR_SEEK:
        return "BE_SQLITE_IOERR_SEEK";
      case DbResult.BE_SQLITE_IOERR_DELETE_NOENT:
        return "BE_SQLITE_IOERR_DELETE_NOENT";
      case DbResult.BE_SQLITE_ERROR_DataTransformRequired:
        return "Schema update require to transform data";
      case DbResult.BE_SQLITE_ERROR_FileExists:
        return "File Exists";
      case DbResult.BE_SQLITE_ERROR_AlreadyOpen:
        return "Already Open";
      case DbResult.BE_SQLITE_ERROR_NoPropertyTable:
        return "No Property Table";
      case DbResult.BE_SQLITE_ERROR_FileNotFound:
        return "File Not Found";
      case DbResult.BE_SQLITE_ERROR_NoTxnActive:
        return "No Txn Active";
      case DbResult.BE_SQLITE_ERROR_BadDbProfile:
        return "Bad Db Profile";
      case DbResult.BE_SQLITE_ERROR_InvalidProfileVersion:
        return "Invalid Profile Version";
      case DbResult.BE_SQLITE_ERROR_ProfileUpgradeFailed:
        return "Profile Upgrade Failed";
      case DbResult.BE_SQLITE_ERROR_ProfileTooOldForReadWrite:
        return "Profile Too Old For ReadWrite";
      case DbResult.BE_SQLITE_ERROR_ProfileTooOld:
        return "Profile Too Old";
      case DbResult.BE_SQLITE_ERROR_ProfileTooNewForReadWrite:
        return "Profile Too New For ReadWrite";
      case DbResult.BE_SQLITE_ERROR_ProfileTooNew:
        return "Profile Too New";
      case DbResult.BE_SQLITE_ERROR_ChangeTrackError:
        return "ChangeTrack Error";
      case DbResult.BE_SQLITE_ERROR_InvalidChangeSetVersion:
        return "Invalid ChangeSet Version";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRequired:
        return "Schema Upgrade Required";
      case DbResult.BE_SQLITE_ERROR_SchemaTooNew:
        return "Schema Too New";
      case DbResult.BE_SQLITE_ERROR_SchemaTooOld:
        return "Schema Too Old";
      case DbResult.BE_SQLITE_ERROR_SchemaLockFailed:
        return "Schema Lock Failed";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeFailed:
        return "Schema Upgrade Failed";
      case DbResult.BE_SQLITE_ERROR_SchemaImportFailed:
        return "Schema Import Failed";
      case DbResult.BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes:
        return "Could Not Acquire Locks Or Codes";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRecommended:
        return "Recommended that the schemas found in the database be upgraded";
      case DbResult.BE_SQLITE_LOCKED_SHAREDCACHE:
        return "BE_SQLITE_LOCKED_SHAREDCACHE";
      case DbResult.BE_SQLITE_BUSY_RECOVERY:
        return "BE_SQLITE_BUSY_RECOVERY";
      case DbResult.BE_SQLITE_CANTOPEN_NOTEMPDIR:
        return "SQLite No Temp Dir";
      case DbResult.BE_SQLITE_CANTOPEN_ISDIR:
        return "BE_SQLITE_CANTOPEN_ISDIR";
      case DbResult.BE_SQLITE_CANTOPEN_FULLPATH:
        return "BE_SQLITE_CANTOPEN_FULLPATH";
      case DbResult.BE_SQLITE_CORRUPT_VTAB:
        return "BE_SQLITE_CORRUPT_VTAB";
      case DbResult.BE_SQLITE_READONLY_RECOVERY:
        return "BE_SQLITE_READONLY_RECOVERY";
      case DbResult.BE_SQLITE_READONLY_CANTLOCK:
        return "BE_SQLITE_READONLY_CANTLOCK";
      case DbResult.BE_SQLITE_READONLY_ROLLBACK:
        return "BE_SQLITE_READONLY_ROLLBACK";
      case DbResult.BE_SQLITE_ABORT_ROLLBACK:
        return "BE_SQLITE_ABORT_ROLLBACK";
      case DbResult.BE_SQLITE_CONSTRAINT_CHECK:
        return "BE_SQLITE_CONSTRAINT_CHECK";
      case DbResult.BE_SQLITE_CONSTRAINT_COMMITHOOK:
        return "CommitHook Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_FOREIGNKEY:
        return "Foreign Key Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_FUNCTION:
        return "Function Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_NOTNULL:
        return "NotNull Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_PRIMARYKEY:
        return "Primary Key Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_TRIGGER:
        return "Trigger Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_UNIQUE:
        return "Unique Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_VTAB:
        return "VTable Constraint Error";
      case BentleyStatus.ERROR:
        return "Error";
      case BriefcaseStatus.CannotAcquire:
        return "CannotAcquire";
      case BriefcaseStatus.CannotDownload:
        return "CannotDownload";
      case BriefcaseStatus.CannotCopy:
        return "CannotCopy";
      case BriefcaseStatus.CannotDelete:
        return "CannotDelete";
      case BriefcaseStatus.VersionNotFound:
        return "VersionNotFound";
      case BriefcaseStatus.DownloadCancelled:
        return "DownloadCancelled";
      case BriefcaseStatus.ContainsDeletedChangeSets:
        return "ContainsDeletedChangeSets";
      case RpcInterfaceStatus.IncompatibleVersion:
        return "RpcInterfaceStatus.IncompatibleVersion";
      case ChangeSetStatus.ApplyError:
        return "Error applying a change set";
      case ChangeSetStatus.ChangeTrackingNotEnabled:
        return "Change tracking has not been enabled. The ChangeSet API mandates this";
      case ChangeSetStatus.CorruptedChangeStream:
        return "Contents of the change stream are corrupted and does not match the ChangeSet";
      case ChangeSetStatus.FileNotFound:
        return "File containing the changes was not found";
      case ChangeSetStatus.FileWriteError:
        return "Error writing the contents of the change set to the backing change stream file";
      case ChangeSetStatus.HasLocalChanges:
        return "Cannot perform the operation since the Db has local changes";
      case ChangeSetStatus.HasUncommittedChanges:
        return "Cannot perform the operation since current transaction has uncommitted changes";
      case ChangeSetStatus.InvalidId:
        return "Invalid ChangeSet Id";
      case ChangeSetStatus.InvalidVersion:
        return "Invalid version of the change set";
      case ChangeSetStatus.InDynamicTransaction:
        return "Cannot perform the operation since system is in the middle of a dynamic transaction";
      case ChangeSetStatus.IsCreatingChangeSet:
        return "Cannot perform operation since system is in the middle of a creating a change set";
      case ChangeSetStatus.IsNotCreatingChangeSet:
        return "Cannot perform operation since the system is not creating a change set";
      case ChangeSetStatus.MergePropagationError:
        return "Error propagating the changes after the merge";
      case ChangeSetStatus.NothingToMerge:
        return "No change sets to merge";
      case ChangeSetStatus.NoTransactions:
        return "No transactions are available to create a change set";
      case ChangeSetStatus.ParentMismatch:
        return "Parent change set of the Db does not match the parent id of the change set";
      case ChangeSetStatus.SQLiteError:
        return "Error performing a SQLite operation on the Db";
      case ChangeSetStatus.WrongDgnDb:
        return "ChangeSet originated in a different Db";
      case ChangeSetStatus.CouldNotOpenDgnDb:
        return "Could not open the DgnDb to merge change set";
      case ChangeSetStatus.MergeSchemaChangesOnOpen:
        return "Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
      case ChangeSetStatus.ReverseOrReinstateSchemaChanges:
        return "Cannot reverse or reinstate schema changes.";
      case ChangeSetStatus.ProcessSchemaChangesOnOpen:
        return "Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
      case ChangeSetStatus.CannotMergeIntoReadonly:
        return "Cannot merge changes into a Readonly DgnDb";
      case ChangeSetStatus.CannotMergeIntoMaster:
        return "Cannot merge changes into a Master DgnDb";
      case ChangeSetStatus.CannotMergeIntoReversed:
        return "Cannot merge changes into a DgnDb that has reversed change sets";
      case ChangeSetStatus.DownloadCancelled:
        return "ChangeSet(s) download was cancelled.";
      case RepositoryStatus.ServerUnavailable:
        return "ServerUnavailable";
      case RepositoryStatus.LockAlreadyHeld:
        return "LockAlreadyHeld";
      case RepositoryStatus.SyncError:
        return "SyncError";
      case RepositoryStatus.InvalidResponse:
        return "InvalidResponse";
      case RepositoryStatus.PendingTransactions:
        return "PendingTransactions";
      case RepositoryStatus.LockUsed:
        return "LockUsed";
      case RepositoryStatus.CannotCreateChangeSet:
        return "CannotCreateChangeSet";
      case RepositoryStatus.InvalidRequest:
        return "InvalidRequest";
      case RepositoryStatus.ChangeSetRequired:
        return "ChangeSetRequired";
      case RepositoryStatus.CodeUnavailable:
        return "CodeUnavailable";
      case RepositoryStatus.CodeNotReserved:
        return "CodeNotReserved";
      case RepositoryStatus.CodeUsed:
        return "CodeUsed";
      case RepositoryStatus.LockNotHeld:
        return "LockNotHeld";
      case RepositoryStatus.RepositoryIsLocked:
        return "RepositoryIsLocked";
      case RepositoryStatus.ChannelConstraintViolation:
        return "ChannelConstraintViolation";
      case HttpStatus.Info:
        return "HTTP Info";
      case HttpStatus.Redirection:
        return "HTTP Redirection";
      case HttpStatus.ClientError:
        return "HTTP Client error";
      case HttpStatus.ServerError:
        return "HTTP Server error";
      case IModelHubStatus.Unknown:
        return "Unknown error";
      case IModelHubStatus.MissingRequiredProperties:
        return "Missing required properties";
      case IModelHubStatus.InvalidPropertiesValues:
        return "Invalid properties values";
      case IModelHubStatus.UserDoesNotHavePermission:
        return "User does not have permission";
      case IModelHubStatus.UserDoesNotHaveAccess:
        return "User does not have access";
      case IModelHubStatus.InvalidBriefcase:
        return "Invalid briefcase";
      case IModelHubStatus.BriefcaseDoesNotExist:
        return "Briefcase does not exist";
      case IModelHubStatus.BriefcaseDoesNotBelongToUser:
        return "Briefcase does not belong to user";
      case IModelHubStatus.AnotherUserPushing:
        return "Another user pushing";
      case IModelHubStatus.ChangeSetAlreadyExists:
        return "ChangeSet already exists";
      case IModelHubStatus.ChangeSetDoesNotExist:
        return "ChangeSet does not exist";
      case IModelHubStatus.FileIsNotUploaded:
        return "File is not uploaded";
      case IModelHubStatus.iModelIsNotInitialized:
        return "iModel is not initialized";
      case IModelHubStatus.ChangeSetPointsToBadSeed:
        return "ChangeSet points to a bad seed file";
      case IModelHubStatus.OperationFailed:
        return "iModelHub operation has failed";
      case IModelHubStatus.PullIsRequired:
        return "Pull is required";
      case IModelHubStatus.MaximumNumberOfBriefcasesPerUser:
        return "Limit of briefcases per user was reached";
      case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute:
        return "Limit of briefcases per user per minute was reached";
      case IModelHubStatus.DatabaseTemporarilyLocked:
        return "Database is temporarily locked";
      case IModelHubStatus.iModelIsLocked:
        return "iModel is locked";
      case IModelHubStatus.CodesExist:
        return "Code already exists";
      case IModelHubStatus.LocksExist:
        return "Lock already exists";
      case IModelHubStatus.iModelAlreadyExists:
        return "iModel already exists";
      case IModelHubStatus.iModelDoesNotExist:
        return "iModel does not exist";
      case IModelHubStatus.LockDoesNotExist:
        return "Lock does not exist";
      case IModelHubStatus.LockChunkDoesNotExist:
        return "Lock chunk does not exist";
      case IModelHubStatus.LockOwnedByAnotherBriefcase:
        return "Lock is owned by another briefcase";
      case IModelHubStatus.CodeStateInvalid:
        return "Code state is invalid";
      case IModelHubStatus.CodeReservedByAnotherBriefcase:
        return "Code is reserved by another briefcase";
      case IModelHubStatus.CodeDoesNotExist:
        return "Code does not exist";
      case IModelHubStatus.FileDoesNotExist:
        return "File does not exist";
      case IModelHubStatus.FileAlreadyExists:
        return "File already exists";
      case IModelHubStatus.EventTypeDoesNotExist:
        return "Event type does not exist";
      case IModelHubStatus.EventSubscriptionDoesNotExist:
        return "Event subscription does not exist";
      case IModelHubStatus.EventSubscriptionAlreadyExists:
        return "Event subscription already exists";
      case IModelHubStatus.ITwinIdIsNotSpecified:
        return "ITwin Id is not specified";
      case IModelHubStatus.FailedToGetITwinPermissions:
        return "Failed to get iTwin permissions";
      case IModelHubStatus.FailedToGetITwinMembers:
        return "Failed to get iTwin members";
      case IModelHubStatus.FailedToGetAssetPermissions:
        return "Failed to get asset permissions";
      case IModelHubStatus.FailedToGetAssetMembers:
        return "Failed to get asset members";
      case IModelHubStatus.ChangeSetAlreadyHasVersion:
        return "ChangeSet already has version";
      case IModelHubStatus.VersionAlreadyExists:
        return "Version already exists";
      case IModelHubStatus.JobSchedulingFailed:
        return "Failed to schedule a background job";
      case IModelHubStatus.ConflictsAggregate:
        return "Codes or locks are owned by another briefcase";
      case IModelHubStatus.FailedToGetITwinById:
        return "Failed to query iTwin by its id";
      case IModelHubStatus.DatabaseOperationFailed:
        return "Database operation has failed";
      case IModelHubStatus.ITwinDoesNotExist:
        return "ITwin does not exist";
      case IModelHubStatus.UndefinedArgumentError:
        return "Undefined argument";
      case IModelHubStatus.InvalidArgumentError:
        return "Invalid argument";
      case IModelHubStatus.MissingDownloadUrlError:
        return "Missing download url";
      case IModelHubStatus.NotSupportedInBrowser:
        return "Not supported in browser";
      case IModelHubStatus.FileHandlerNotSet:
        return "File handler is not set";
      case IModelHubStatus.FileNotFound:
        return "File not found";
      case GeoServiceStatus.NoGeoLocation:
        return "No GeoLocation";
      case GeoServiceStatus.OutOfUsefulRange:
        return "Out of useful range";
      case GeoServiceStatus.OutOfMathematicalDomain:
        return "Out of mathematical domain";
      case GeoServiceStatus.NoDatumConverter:
        return "No datum converter";
      case GeoServiceStatus.VerticalDatumConvertError:
        return "Vertical datum convert error";
      case GeoServiceStatus.CSMapError:
        return "CSMap error";
      case GeoServiceStatus.Pending:
        return "Pending";
      // eslint-disable-line @typescript-eslint/no-deprecated
      case RealityDataStatus.InvalidData:
        return "Invalid or unknown data";
      case DbResult.BE_SQLITE_OK:
      case DbResult.BE_SQLITE_ROW:
      case DbResult.BE_SQLITE_DONE:
      case BentleyStatus.SUCCESS:
        return "Success";
      default:
        return `Error (${errorNumber})`;
    }
  }
  /** Use run-time type checking to safely get a useful string summary of an unknown error value, or `""` if none exists.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
   * @public
   */
  static getErrorMessage(error) {
    if (typeof error === "string")
      return error;
    if (error instanceof Error)
      return error.toString();
    if (JsonUtils.isObject(error)) {
      if (typeof error.message === "string")
        return error.message;
      if (typeof error.msg === "string")
        return error.msg;
      if (error.toString() !== "[object Object]")
        return error.toString();
    }
    return "";
  }
  /** Use run-time type checking to safely get the call stack of an unknown error value, if possible.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
   * @public
   */
  static getErrorStack(error) {
    if (JsonUtils.isObject(error) && typeof error.stack === "string")
      return error.stack;
    return void 0;
  }
  /** Use run-time type checking to safely get the metadata with an unknown error value, if possible.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof BentleyError`
   * @see [[BentleyError.getMetaData]]
   * @public
   */
  static getErrorMetadata(error) {
    if (JsonUtils.isObject(error) && typeof error.getMetaData === "function") {
      const metadata = error.getMetaData();
      if (typeof metadata === "object" && metadata !== null)
        return metadata;
    }
    return void 0;
  }
  /** Returns a new `ErrorProps` object representing an unknown error value.  Useful for logging or wrapping/re-throwing caught errors.
   * @note Unlike `Error` objects (which lose messages and call stacks when serialized to JSON), objects
   *       returned by this are plain old JavaScript objects, and can be easily logged/serialized to JSON.
   * @public
   */
  static getErrorProps(error) {
    const serialized = {
      message: BentleyError.getErrorMessage(error)
    };
    const stack = BentleyError.getErrorStack(error);
    if (stack)
      serialized.stack = stack;
    const metadata = BentleyError.getErrorMetadata(error);
    if (metadata)
      serialized.metadata = metadata;
    return serialized;
  }
}
var BentleyLoggerCategory;
(function(BentleyLoggerCategory2) {
  BentleyLoggerCategory2["Performance"] = "Performance";
})(BentleyLoggerCategory || (BentleyLoggerCategory = {}));
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Trace"] = 0] = "Trace";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warning"] = 2] = "Warning";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["None"] = 4] = "None";
})(LogLevel || (LogLevel = {}));
class Logger {
  static _logError;
  static _logWarning;
  static _logInfo;
  static _logTrace;
  static _onLogLevelChanged;
  static _staticMetaData = /* @__PURE__ */ new Map();
  /** An event raised whenever [[setLevel]] or [[setLevelDefault]] is called. */
  static get onLogLevelChanged() {
    if (void 0 === Logger._onLogLevelChanged) {
      Logger._onLogLevelChanged = new BeEvent();
    }
    return Logger._onLogLevelChanged;
  }
  static _categoryFilter = {};
  /** Maps category names to the least severe level at which messages in that category should be displayed,
   * or `undefined` if a minimum has not been defined.
   * @see [[setLevel]] to change the minimum logging level for a category.
   */
  static get categoryFilter() {
    return this._categoryFilter;
  }
  static _minLevel;
  /** The least severe level at which messages should be displayed by default.
   * @see [[setLevelDefault]] to change this default.
   * @see [[setLevel]] to override this default for specific categories.
   */
  static get minLevel() {
    return this._minLevel;
  }
  /** Should the call stack be included when an exception is logged?  */
  static logExceptionCallstacks = false;
  /** Contains metadata that should be included with every logged message.
   * @beta
   */
  static get staticMetaData() {
    return this._staticMetaData;
  }
  /** Initialize the logger streams. Should be called at application initialization time. */
  static initialize(logError, logWarning, logInfo, logTrace) {
    Logger._logError = logError;
    Logger._logWarning = logWarning;
    Logger._logInfo = logInfo;
    Logger._logTrace = logTrace;
    Logger.turnOffLevelDefault();
    Logger.turnOffCategories();
  }
  /** Initialize the logger to output to the console. */
  static initializeToConsole() {
    const logConsole = (level) => (category, message, metaData) => console.log(`${level} | ${category} | ${message} ${Logger.stringifyMetaData(metaData)}`);
    Logger.initialize(logConsole("Error"), logConsole("Warning"), logConsole("Info"), logConsole("Trace"));
  }
  /** merge the supplied metadata with all static metadata into one object */
  static getMetaData(metaData) {
    const metaObj = {};
    for (const meta of this._staticMetaData) {
      const val = BentleyError.getMetaData(meta[1]);
      if (val)
        Object.assign(metaObj, val);
    }
    Object.assign(metaObj, BentleyError.getMetaData(metaData));
    return metaObj;
  }
  /** stringify the metadata for a log message by merging the supplied metadata with all static metadata into one object that is then `JSON.stringify`ed. */
  static stringifyMetaData(metaData) {
    const metaObj = this.getMetaData(metaData);
    return Object.keys(metaObj).length > 0 ? JSON.stringify(metaObj) : "";
  }
  /** Set the least severe level at which messages should be displayed by default. Call setLevel to override this default setting for specific categories. */
  static setLevelDefault(minLevel) {
    this._minLevel = minLevel;
    this.onLogLevelChanged.raiseEvent();
  }
  /** Set the minimum logging level for the specified category. The minimum level is least severe level at which messages in the
   * specified category should be displayed.
   */
  static setLevel(category, minLevel) {
    Logger._categoryFilter[category] = minLevel;
    this.onLogLevelChanged.raiseEvent();
  }
  /** Interpret a string as the name of a LogLevel */
  static parseLogLevel(str) {
    switch (str.toUpperCase()) {
      case "EXCEPTION":
        return LogLevel.Error;
      case "FATAL":
        return LogLevel.Error;
      case "ERROR":
        return LogLevel.Error;
      case "WARNING":
        return LogLevel.Warning;
      case "INFO":
        return LogLevel.Info;
      case "TRACE":
        return LogLevel.Trace;
      case "DEBUG":
        return LogLevel.Trace;
    }
    return LogLevel.None;
  }
  /** Set the log level for multiple categories at once. Also see [[validateProps]] */
  static configureLevels(cfg) {
    Logger.validateProps(cfg);
    if (cfg.defaultLevel !== void 0) {
      this.setLevelDefault(Logger.parseLogLevel(cfg.defaultLevel));
    }
    if (cfg.categoryLevels !== void 0) {
      for (const cl of cfg.categoryLevels) {
        this.setLevel(cl.category, Logger.parseLogLevel(cl.logLevel));
      }
    }
  }
  static isLogLevel(v) {
    return LogLevel.hasOwnProperty(v);
  }
  /** Check that the specified object is a valid LoggerLevelsConfig. This is useful when reading a config from a .json file. */
  static validateProps(config) {
    const validProps = ["defaultLevel", "categoryLevels"];
    for (const prop of Object.keys(config)) {
      if (!validProps.includes(prop))
        throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig - unrecognized property: ${prop}`);
      if (prop === "defaultLevel") {
        if (!Logger.isLogLevel(config.defaultLevel))
          throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.defaultLevel must be a LogLevel. Invalid value: ${JSON.stringify(config.defaultLevel)}`);
      } else if (prop === "categoryLevels") {
        const value = config[prop];
        if (!Array.isArray(value))
          throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels must be an array. Invalid value: ${JSON.stringify(value)}`);
        for (const item of config[prop]) {
          if (!item.hasOwnProperty("category") || !item.hasOwnProperty("logLevel"))
            throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item must be a LoggerCategoryAndLevel {category: logLevel:}. Invalid value: ${JSON.stringify(item)}`);
          if (!Logger.isLogLevel(item.logLevel))
            throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item's logLevel property must be a LogLevel. Invalid value: ${JSON.stringify(item.logLevel)}`);
        }
      }
    }
  }
  /** Get the minimum logging level for the specified category. */
  static getLevel(category) {
    const minLevelForThisCategory = Logger.categoryFilter[category];
    if (minLevelForThisCategory !== void 0)
      return minLevelForThisCategory;
    const parent = category.lastIndexOf(".");
    if (parent !== -1)
      return Logger.getLevel(category.slice(0, parent));
    return Logger.minLevel;
  }
  /** Turns off the least severe level at which messages should be displayed by default.
   * This turns off logging for all messages for which no category minimum level is defined.
   */
  static turnOffLevelDefault() {
    Logger._minLevel = void 0;
  }
  /** Turns off all category level filters previously defined with [[Logger.setLevel]].
   */
  static turnOffCategories() {
    Logger._categoryFilter = {};
  }
  /** Check if messages in the specified category should be displayed at this level of severity. */
  static isEnabled(category, level) {
    const minLevel = Logger.getLevel(category);
    return minLevel !== void 0 && level >= minLevel;
  }
  /** Log the specified message to the **error** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logError(category, message, metaData) {
    if (Logger._logError && Logger.isEnabled(category, LogLevel.Error))
      Logger._logError(category, message, metaData);
  }
  static getExceptionMessage(err) {
    if (err === void 0) {
      return "Error: err is undefined.";
    }
    if (err === null) {
      return "Error: err is null.";
    }
    const stack = Logger.logExceptionCallstacks ? `
${BentleyError.getErrorStack(err)}` : "";
    return BentleyError.getErrorMessage(err) + stack;
  }
  /** Log the specified exception.
   * For legacy [[BentleyError]] exceptions, the special "exceptionType" property will be added as metadata. Otherwise, all enumerable members of the exception are logged as metadata.
   * @param category  The category of the message.
   * @param err  The exception object.
   * @param log The logger output function to use - defaults to Logger.logError
   */
  static logException(category, err, log = (_category, message, metaData) => Logger.logError(_category, message, metaData)) {
    log(category, Logger.getExceptionMessage(err), () => {
      if (BentleyError.isError(err))
        return { ...BentleyError.getErrorMetadata(err), exceptionType: err?.constructor?.name ?? "<Unknown>" };
      return { ...err };
    });
  }
  /** Log the specified message to the **warning** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logWarning(category, message, metaData) {
    if (Logger._logWarning && Logger.isEnabled(category, LogLevel.Warning))
      Logger._logWarning(category, message, metaData);
  }
  /** Log the specified message to the **info** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logInfo(category, message, metaData) {
    if (Logger._logInfo && Logger.isEnabled(category, LogLevel.Info))
      Logger._logInfo(category, message, metaData);
  }
  /** Log the specified message to the **trace** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logTrace(category, message, metaData) {
    if (Logger._logTrace && Logger.isEnabled(category, LogLevel.Trace))
      Logger._logTrace(category, message, metaData);
  }
}
class PerfLogger {
  static _severity = LogLevel.Info;
  _operation;
  _metaData;
  _startTimeStamp;
  constructor(operation, metaData) {
    this._operation = operation;
    this._metaData = metaData;
    if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity)) {
      this._startTimeStamp = 0;
      return;
    }
    Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},START`, this._metaData);
    this._startTimeStamp = (/* @__PURE__ */ new Date()).getTime();
  }
  logMessage() {
    const endTimeStamp = (/* @__PURE__ */ new Date()).getTime();
    if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity))
      return;
    Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},END`, () => {
      const mdata = this._metaData ? BentleyError.getMetaData(this._metaData) : {};
      return {
        ...mdata,
        TimeElapsed: endTimeStamp - this._startTimeStamp
        // eslint-disable-line @typescript-eslint/naming-convention
      };
    });
  }
  [Symbol.dispose]() {
    this.logMessage();
  }
  /** @deprecated in 5.0 - will not be removed until after 2026-06-13. Use [Symbol.dispose] instead. */
  dispose() {
    this[Symbol.dispose]();
  }
}
class UnexpectedErrors {
  /** handler for re-throwing exceptions directly */
  static reThrowImmediate = (e) => {
    throw e;
  };
  /** handler for re-throwing exceptions from an asynchronous interval (so the current call stack is not aborted) */
  static reThrowDeferred = (e) => setTimeout(() => {
    throw e;
  }, 0);
  /** handler for logging exception to console */
  static consoleLog = (e) => console.error(e);
  // eslint-disable-line no-console
  /** handler for logging exception with [[Logger]] */
  static errorLog = (e) => Logger.logException("unhandled", e);
  static _telemetry = [];
  static _handler = this.errorLog;
  // default to error logging
  constructor() {
  }
  // this is a singleton
  /** Add a "telemetry tracker" for unexpected errors. Useful for tracking/reporting errors without changing handler.
   * @returns a method to remove the tracker
   */
  static addTelemetry(tracker) {
    this._telemetry.push(tracker);
    return () => this._telemetry.splice(this._telemetry.indexOf(tracker), 1);
  }
  /** call this method when an unexpected error happens so the global handler can process it.
   * @param error the unexpected error
   * @param notifyTelemetry if false, don't notify telemetry trackers. Use this for exceptions from third-party code, for example.
   */
  static handle(error, notifyTelemetry = true) {
    this._handler(error);
    if (notifyTelemetry) {
      this._telemetry.forEach((telemetry) => {
        try {
          telemetry(error);
        } catch {
        }
      });
    }
  }
  /** establish a new global *unexpected error* handler.
   * @param handler the new global handler. You may provide your own function or use one of the static members of this class.
   * The default is [[errorLog]].
   * @returns the previous handler. Useful to temporarily change the handler.
   */
  static setHandler(handler) {
    const oldHandler = this._handler;
    this._handler = handler;
    return oldHandler;
  }
}
class BeEvent {
  _listeners = [];
  _insideRaiseEvent = false;
  /** The number of listeners currently subscribed to the event. */
  get numberOfListeners() {
    return this._listeners.length;
  }
  /**
   * Registers a Listener to be executed whenever this event is raised.
   * @param listener The function to be executed when the event is raised.
   * @param scope An optional object scope to serve as the 'this' pointer when listener is invoked.
   * @returns A function that will remove this event listener.
   * @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
   */
  addListener(listener, scope) {
    this._listeners.push({ listener, scope, once: false });
    return () => this.removeListener(listener, scope);
  }
  /**
   * Registers a callback function to be executed *only once* when the event is raised.
   * @param listener The function to be executed once when the event is raised.
   * @param scope An optional object scope to serve as the `this` pointer in which the listener function will execute.
   * @returns A function that will remove this event listener.
   * @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
   */
  addOnce(listener, scope) {
    this._listeners.push({ listener, scope, once: true });
    return () => this.removeListener(listener, scope);
  }
  /**
   * Un-register a previously registered listener.
   * @param listener The listener to be unregistered.
   * @param  scope The scope that was originally passed to addListener.
   * @returns 'true' if the listener was removed; 'false' if the listener and scope are not registered with the event.
   * @see [[BeEvent.raiseEvent]], [[BeEvent.addListener]]
   */
  removeListener(listener, scope) {
    const listeners = this._listeners;
    for (let i = 0; i < listeners.length; ++i) {
      const context = listeners[i];
      if (context.listener === listener && context.scope === scope) {
        if (this._insideRaiseEvent) {
          context.listener = void 0;
        } else {
          listeners.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  }
  /**
   * Raises the event by calling each registered listener with the supplied arguments.
   * @param args This method takes any number of parameters and passes them through to the listeners.
   * @see [[BeEvent.removeListener]], [[BeEvent.addListener]]
   */
  raiseEvent(...args) {
    this._insideRaiseEvent = true;
    const listeners = this._listeners;
    const length = listeners.length;
    let dropped = false;
    for (let i = 0; i < length; ++i) {
      const context = listeners[i];
      if (!context.listener) {
        dropped = true;
      } else {
        try {
          context.listener.apply(context.scope, args);
        } catch (e) {
          UnexpectedErrors.handle(e);
        }
        if (context.once) {
          context.listener = void 0;
          dropped = true;
        }
      }
    }
    if (dropped)
      this._listeners = this._listeners.filter((ctx) => ctx.listener !== void 0);
    this._insideRaiseEvent = false;
  }
  /** Determine whether this BeEvent has a specified listener registered.
   * @param listener The listener to check.
   * @param scope optional scope argument to match call to addListener
   */
  has(listener, scope) {
    for (const ctx of this._listeners) {
      if (ctx.listener === listener && ctx.scope === scope) {
        return true;
      }
    }
    return false;
  }
  /** Clear all Listeners from this BeEvent. */
  clear() {
    this._listeners.length = 0;
  }
}
class BeUiEvent extends BeEvent {
  /** Raises event with single strongly typed argument. */
  emit(args) {
    this.raiseEvent(args);
  }
}
class BeEventList {
  _events = {};
  /**
   * Gets the event associated with the specified name, creating the event if it does not already exist.
   * @param name The name of the event.
   */
  get(name) {
    let event = this._events[name];
    if (event)
      return event;
    event = new BeEvent();
    this._events[name] = event;
    return event;
  }
  /**
   * Removes the event associated with a name.
   * @param name The name of the event.
   */
  remove(name) {
    this._events[name] = void 0;
  }
}
class StatusCategory {
  static handlers = /* @__PURE__ */ new Set();
  static for(error) {
    for (const handler of this.handlers) {
      const category = handler(error);
      if (category) {
        return category;
      }
    }
    const errorNumber = error.errorNumber;
    if (typeof errorNumber === "number")
      return lookupHttpStatusCategory(errorNumber);
    return new UnknownError();
  }
}
class SuccessCategory extends StatusCategory {
  error = false;
}
class ErrorCategory extends StatusCategory {
  error = true;
}
var HTTP;
(function(HTTP2) {
  class OK extends SuccessCategory {
    name = "OK";
    code = 200;
  }
  HTTP2.OK = OK;
  class Accepted extends SuccessCategory {
    name = "Accepted";
    code = 202;
  }
  HTTP2.Accepted = Accepted;
  class NoContent2 extends SuccessCategory {
    name = "NoContent";
    code = 204;
  }
  HTTP2.NoContent = NoContent2;
  class BadRequest2 extends ErrorCategory {
    name = "BadRequest";
    code = 400;
  }
  HTTP2.BadRequest = BadRequest2;
  class Unauthorized extends ErrorCategory {
    name = "Unauthorized";
    code = 401;
  }
  HTTP2.Unauthorized = Unauthorized;
  class Forbidden2 extends ErrorCategory {
    name = "Forbidden";
    code = 403;
  }
  HTTP2.Forbidden = Forbidden2;
  class NotFound2 extends ErrorCategory {
    name = "NotFound";
    code = 404;
  }
  HTTP2.NotFound = NotFound2;
  class RequestTimeout extends ErrorCategory {
    name = "RequestTimeout";
    code = 408;
  }
  HTTP2.RequestTimeout = RequestTimeout;
  class Conflict2 extends ErrorCategory {
    name = "Conflict";
    code = 409;
  }
  HTTP2.Conflict = Conflict2;
  class Gone extends ErrorCategory {
    name = "Gone";
    code = 410;
  }
  HTTP2.Gone = Gone;
  class PreconditionFailed extends ErrorCategory {
    name = "PreconditionFailed";
    code = 412;
  }
  HTTP2.PreconditionFailed = PreconditionFailed;
  class ExpectationFailed extends ErrorCategory {
    name = "ExpectationFailed";
    code = 417;
  }
  HTTP2.ExpectationFailed = ExpectationFailed;
  class MisdirectedRequest extends ErrorCategory {
    name = "MisdirectedRequest";
    code = 421;
  }
  HTTP2.MisdirectedRequest = MisdirectedRequest;
  class UnprocessableEntity extends ErrorCategory {
    name = "UnprocessableEntity";
    code = 422;
  }
  HTTP2.UnprocessableEntity = UnprocessableEntity;
  class UpgradeRequired extends ErrorCategory {
    name = "UpgradeRequired";
    code = 426;
  }
  HTTP2.UpgradeRequired = UpgradeRequired;
  class PreconditionRequired extends ErrorCategory {
    name = "PreconditionRequired";
    code = 428;
  }
  HTTP2.PreconditionRequired = PreconditionRequired;
  class TooManyRequests extends ErrorCategory {
    name = "TooManyRequests";
    code = 429;
  }
  HTTP2.TooManyRequests = TooManyRequests;
  class InternalServerError extends ErrorCategory {
    name = "InternalServerError";
    code = 500;
  }
  HTTP2.InternalServerError = InternalServerError;
  class NotImplemented2 extends ErrorCategory {
    name = "NotImplemented";
    code = 501;
  }
  HTTP2.NotImplemented = NotImplemented2;
})(HTTP || (HTTP = {}));
class Success extends HTTP.OK {
}
class Pending extends HTTP.Accepted {
}
class NoContent extends HTTP.NoContent {
}
class NothingToDo extends HTTP.NoContent {
}
class BadRequest extends HTTP.BadRequest {
}
class Forbidden extends HTTP.Forbidden {
}
class PermissionsViolation extends HTTP.Forbidden {
}
class ReadOnly extends HTTP.Forbidden {
}
class NotFound extends HTTP.NotFound {
}
class NotEnabled extends HTTP.UnprocessableEntity {
}
class NotSupported extends HTTP.UnprocessableEntity {
}
class ValidationError extends HTTP.BadRequest {
}
class Timeout extends HTTP.RequestTimeout {
}
class Conflict extends HTTP.Conflict {
}
class Cancelled extends HTTP.Gone {
}
class ConstraintViolation extends HTTP.Forbidden {
}
class VersioningViolation extends HTTP.Forbidden {
}
class Corruption extends HTTP.InternalServerError {
}
class InvalidData extends HTTP.InternalServerError {
}
class OperationFailed extends HTTP.InternalServerError {
}
class StateViolation extends HTTP.InternalServerError {
}
class Locked extends HTTP.Conflict {
}
class NetworkError extends HTTP.InternalServerError {
}
class Throttled extends HTTP.TooManyRequests {
}
class FileSystemError extends HTTP.InternalServerError {
}
class InternalError extends HTTP.InternalServerError {
}
class UnknownError extends HTTP.InternalServerError {
}
class NotImplemented extends HTTP.NotImplemented {
}
class Aborted extends HTTP.BadRequest {
}
function lookupHttpStatusCategory(statusCode) {
  switch (statusCode) {
    case BentleyStatus.SUCCESS:
      return new Success();
    case BentleyStatus.ERROR:
      return new UnknownError();
    case IModelStatus.Success:
      return new Success();
    case IModelStatus.AlreadyLoaded:
      return new StateViolation();
    case IModelStatus.AlreadyOpen:
      return new StateViolation();
    case IModelStatus.BadArg:
      return new ValidationError();
    case IModelStatus.BadElement:
      return new ValidationError();
    case IModelStatus.BadModel:
      return new ValidationError();
    case IModelStatus.BadRequest:
      return new BadRequest();
    case IModelStatus.BadSchema:
      return new ValidationError();
    case IModelStatus.CannotUndo:
      return new OperationFailed();
    case IModelStatus.CodeNotReserved:
      return new StateViolation();
    case IModelStatus.DeletionProhibited:
      return new Forbidden();
    case IModelStatus.DuplicateCode:
      return new Conflict();
    case IModelStatus.DuplicateName:
      return new Conflict();
    case IModelStatus.ElementBlockedChange:
      return new ConstraintViolation();
    case IModelStatus.FileAlreadyExists:
      return new Conflict();
    case IModelStatus.FileNotFound:
      return new NotFound();
    case IModelStatus.FileNotLoaded:
      return new FileSystemError();
    case IModelStatus.ForeignKeyConstraint:
      return new ConstraintViolation();
    case IModelStatus.IdExists:
      return new Conflict();
    case IModelStatus.InDynamicTransaction:
      return new StateViolation();
    case IModelStatus.InvalidCategory:
      return new ValidationError();
    case IModelStatus.InvalidCode:
      return new ValidationError();
    case IModelStatus.InvalidCodeSpec:
      return new ValidationError();
    case IModelStatus.InvalidId:
      return new ValidationError();
    case IModelStatus.InvalidName:
      return new ValidationError();
    case IModelStatus.InvalidParent:
      return new Conflict();
    case IModelStatus.InvalidProfileVersion:
      return new InvalidData();
    case IModelStatus.IsCreatingChangeSet:
      return new StateViolation();
    case IModelStatus.LockNotHeld:
      return new Forbidden();
    case IModelStatus.Mismatch2d3d:
      return new ValidationError();
    case IModelStatus.MismatchGcs:
      return new ValidationError();
    case IModelStatus.MissingDomain:
      return new ValidationError();
    case IModelStatus.MissingHandler:
      return new ValidationError();
    case IModelStatus.MissingId:
      return new ValidationError();
    case IModelStatus.NoGeometry:
      return new NoContent();
    case IModelStatus.NoMultiTxnOperation:
      return new StateViolation();
    case IModelStatus.NotEnabled:
      return new NotEnabled();
    case IModelStatus.NotFound:
      return new NotFound();
    case IModelStatus.NotOpen:
      return new StateViolation();
    case IModelStatus.NotOpenForWrite:
      return new Forbidden();
    case IModelStatus.NotSameUnitBase:
      return new ValidationError();
    case IModelStatus.NothingToRedo:
      return new NothingToDo();
    case IModelStatus.NothingToUndo:
      return new NothingToDo();
    case IModelStatus.ParentBlockedChange:
      return new Forbidden();
    case IModelStatus.ReadError:
      return new FileSystemError();
    case IModelStatus.ReadOnly:
      return new ReadOnly();
    case IModelStatus.ReadOnlyDomain:
      return new ReadOnly();
    case IModelStatus.RepositoryManagerError:
      return new NetworkError();
    case IModelStatus.SQLiteError:
      return new InternalError();
    case IModelStatus.TransactionActive:
      return new StateViolation();
    case IModelStatus.UnitsMissing:
      return new ValidationError();
    case IModelStatus.UnknownFormat:
      return new InvalidData();
    case IModelStatus.UpgradeFailed:
      return new OperationFailed();
    case IModelStatus.ValidationFailed:
      return new ValidationError();
    case IModelStatus.VersionTooNew:
      return new VersioningViolation();
    case IModelStatus.VersionTooOld:
      return new VersioningViolation();
    case IModelStatus.ViewNotFound:
      return new NotFound();
    case IModelStatus.WriteError:
      return new FileSystemError();
    case IModelStatus.WrongClass:
      return new ValidationError();
    case IModelStatus.WrongIModel:
      return new ValidationError();
    case IModelStatus.WrongDomain:
      return new ValidationError();
    case IModelStatus.WrongElement:
      return new ValidationError();
    case IModelStatus.WrongHandler:
      return new ValidationError();
    case IModelStatus.WrongModel:
      return new ValidationError();
    case IModelStatus.ConstraintNotUnique:
      return new ConstraintViolation();
    case IModelStatus.NoGeoLocation:
      return new ValidationError();
    case IModelStatus.ServerTimeout:
      return new Timeout();
    case IModelStatus.NoContent:
      return new NoContent();
    case IModelStatus.NotRegistered:
      return new NotImplemented();
    case IModelStatus.FunctionNotFound:
      return new NotImplemented();
    case IModelStatus.NoActiveCommand:
      return new StateViolation();
    case IModelStatus.Aborted:
      return new Aborted();
    case BriefcaseStatus.CannotAcquire:
      return new OperationFailed();
    case BriefcaseStatus.CannotDownload:
      return new OperationFailed();
    case BriefcaseStatus.CannotUpload:
      return new OperationFailed();
    case BriefcaseStatus.CannotCopy:
      return new OperationFailed();
    case BriefcaseStatus.CannotDelete:
      return new OperationFailed();
    case BriefcaseStatus.VersionNotFound:
      return new NotFound();
    case BriefcaseStatus.CannotApplyChanges:
      return new OperationFailed();
    case BriefcaseStatus.DownloadCancelled:
      return new Cancelled();
    case BriefcaseStatus.ContainsDeletedChangeSets:
      return new ValidationError();
    case RpcInterfaceStatus.Success:
      return new Success();
    case RpcInterfaceStatus.IncompatibleVersion:
      return new VersioningViolation();
    case ChangeSetStatus.Success:
      return new Success();
    case ChangeSetStatus.ApplyError:
      return new OperationFailed();
    case ChangeSetStatus.ChangeTrackingNotEnabled:
      return new NotEnabled();
    case ChangeSetStatus.CorruptedChangeStream:
      return new Corruption();
    case ChangeSetStatus.FileNotFound:
      return new NotFound();
    case ChangeSetStatus.FileWriteError:
      return new FileSystemError();
    case ChangeSetStatus.HasLocalChanges:
      return new StateViolation();
    case ChangeSetStatus.HasUncommittedChanges:
      return new StateViolation();
    case ChangeSetStatus.InvalidId:
      return new Corruption();
    case ChangeSetStatus.InvalidVersion:
      return new Corruption();
    case ChangeSetStatus.InDynamicTransaction:
      return new StateViolation();
    case ChangeSetStatus.IsCreatingChangeSet:
      return new StateViolation();
    case ChangeSetStatus.IsNotCreatingChangeSet:
      return new StateViolation();
    case ChangeSetStatus.MergePropagationError:
      return new OperationFailed();
    case ChangeSetStatus.NothingToMerge:
      return new NothingToDo();
    case ChangeSetStatus.NoTransactions:
      return new OperationFailed();
    case ChangeSetStatus.ParentMismatch:
      return new ValidationError();
    case ChangeSetStatus.SQLiteError:
      return new InternalError();
    case ChangeSetStatus.WrongDgnDb:
      return new ValidationError();
    case ChangeSetStatus.CouldNotOpenDgnDb:
      return new OperationFailed();
    case ChangeSetStatus.MergeSchemaChangesOnOpen:
      return new BadRequest();
    case ChangeSetStatus.ReverseOrReinstateSchemaChanges:
      return new Conflict();
    case ChangeSetStatus.ProcessSchemaChangesOnOpen:
      return new BadRequest();
    case ChangeSetStatus.CannotMergeIntoReadonly:
      return new ValidationError();
    case ChangeSetStatus.CannotMergeIntoMaster:
      return new ValidationError();
    case ChangeSetStatus.CannotMergeIntoReversed:
      return new ValidationError();
    case RepositoryStatus.Success:
      return new Success();
    case RepositoryStatus.ServerUnavailable:
      return new NetworkError();
    case RepositoryStatus.LockAlreadyHeld:
      return new Conflict();
    case RepositoryStatus.SyncError:
      return new NetworkError();
    case RepositoryStatus.InvalidResponse:
      return new NetworkError();
    case RepositoryStatus.PendingTransactions:
      return new StateViolation();
    case RepositoryStatus.LockUsed:
      return new StateViolation();
    case RepositoryStatus.CannotCreateChangeSet:
      return new InternalError();
    case RepositoryStatus.InvalidRequest:
      return new NetworkError();
    case RepositoryStatus.ChangeSetRequired:
      return new StateViolation();
    case RepositoryStatus.CodeUnavailable:
      return new Conflict();
    case RepositoryStatus.CodeNotReserved:
      return new StateViolation();
    case RepositoryStatus.CodeUsed:
      return new StateViolation();
    case RepositoryStatus.LockNotHeld:
      return new Forbidden();
    case RepositoryStatus.RepositoryIsLocked:
      return new Locked();
    case RepositoryStatus.ChannelConstraintViolation:
      return new ConstraintViolation();
    case HttpStatus.Success:
      return new Success();
    case IModelHubStatus.Success:
      return new Success();
    case IModelHubStatus.Unknown:
      return new UnknownError();
    case IModelHubStatus.MissingRequiredProperties:
      return new ValidationError();
    case IModelHubStatus.InvalidPropertiesValues:
      return new ValidationError();
    case IModelHubStatus.UserDoesNotHavePermission:
      return new PermissionsViolation();
    case IModelHubStatus.UserDoesNotHaveAccess:
      return new PermissionsViolation();
    case IModelHubStatus.InvalidBriefcase:
      return new ValidationError();
    case IModelHubStatus.BriefcaseDoesNotExist:
      return new NotFound();
    case IModelHubStatus.BriefcaseDoesNotBelongToUser:
      return new PermissionsViolation();
    case IModelHubStatus.AnotherUserPushing:
      return new StateViolation();
    case IModelHubStatus.ChangeSetAlreadyExists:
      return new Conflict();
    case IModelHubStatus.ChangeSetDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileIsNotUploaded:
      return new StateViolation();
    case IModelHubStatus.iModelIsNotInitialized:
      return new StateViolation();
    case IModelHubStatus.ChangeSetPointsToBadSeed:
      return new InvalidData();
    case IModelHubStatus.OperationFailed:
      return new OperationFailed();
    case IModelHubStatus.PullIsRequired:
      return new StateViolation();
    case IModelHubStatus.MaximumNumberOfBriefcasesPerUser:
      return new Throttled();
    case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute:
      return new Throttled();
    case IModelHubStatus.DatabaseTemporarilyLocked:
      return new Locked();
    case IModelHubStatus.iModelIsLocked:
      return new Locked();
    case IModelHubStatus.CodesExist:
      return new Conflict();
    case IModelHubStatus.LocksExist:
      return new Conflict();
    case IModelHubStatus.iModelAlreadyExists:
      return new Conflict();
    case IModelHubStatus.iModelDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileAlreadyExists:
      return new Conflict();
    case IModelHubStatus.LockDoesNotExist:
      return new NotFound();
    case IModelHubStatus.LockOwnedByAnotherBriefcase:
      return new Conflict();
    case IModelHubStatus.CodeStateInvalid:
      return new StateViolation();
    case IModelHubStatus.CodeReservedByAnotherBriefcase:
      return new Conflict();
    case IModelHubStatus.CodeDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventTypeDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventSubscriptionDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventSubscriptionAlreadyExists:
      return new StateViolation();
    case IModelHubStatus.ITwinIdIsNotSpecified:
      return new ValidationError();
    case IModelHubStatus.FailedToGetITwinPermissions:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetITwinMembers:
      return new OperationFailed();
    case IModelHubStatus.ChangeSetAlreadyHasVersion:
      return new Conflict();
    case IModelHubStatus.VersionAlreadyExists:
      return new Conflict();
    case IModelHubStatus.JobSchedulingFailed:
      return new InternalError();
    case IModelHubStatus.ConflictsAggregate:
      return new Conflict();
    case IModelHubStatus.FailedToGetITwinById:
      return new OperationFailed();
    case IModelHubStatus.DatabaseOperationFailed:
      return new OperationFailed();
    case IModelHubStatus.SeedFileInitializationFailed:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetAssetPermissions:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetAssetMembers:
      return new OperationFailed();
    case IModelHubStatus.ITwinDoesNotExist:
      return new NotFound();
    case IModelHubStatus.LockChunkDoesNotExist:
      return new NotFound();
    case IModelHubStatus.CheckpointAlreadyExists:
      return new Conflict();
    case IModelHubStatus.CheckpointDoesNotExist:
      return new NotFound();
    case IModelHubStatus.UndefinedArgumentError:
      return new ValidationError();
    case IModelHubStatus.InvalidArgumentError:
      return new ValidationError();
    case IModelHubStatus.MissingDownloadUrlError:
      return new ValidationError();
    case IModelHubStatus.NotSupportedInBrowser:
      return new NotSupported();
    case IModelHubStatus.FileHandlerNotSet:
      return new NotImplemented();
    case IModelHubStatus.FileNotFound:
      return new NotFound();
    case IModelHubStatus.InitializationTimeout:
      return new Timeout();
    case GeoServiceStatus.Success:
      return new Success();
    case GeoServiceStatus.NoGeoLocation:
      return new ValidationError();
    case GeoServiceStatus.OutOfUsefulRange:
      return new ValidationError();
    case GeoServiceStatus.OutOfMathematicalDomain:
      return new ValidationError();
    case GeoServiceStatus.NoDatumConverter:
      return new OperationFailed();
    case GeoServiceStatus.VerticalDatumConvertError:
      return new OperationFailed();
    case GeoServiceStatus.CSMapError:
      return new InternalError();
    case GeoServiceStatus.Pending:
      return new Pending();
    // eslint-disable-line @typescript-eslint/no-deprecated
    case RealityDataStatus.Success:
      return new Success();
    case RealityDataStatus.InvalidData:
      return new InvalidData();
    default:
      return new UnknownError();
  }
}
function toHex(str) {
  const v = parseInt(str, 16);
  return Number.isNaN(v) ? 0 : v;
}
function isLowerCaseNonZeroHexDigit(str, index) {
  return isLowerCaseHexDigit(str, index, false);
}
function isLowerCaseHexDigit(str, index, allowZero = true) {
  const charCode = str.charCodeAt(index);
  const minDecimalDigit = allowZero ? 48 : 49;
  return charCode >= minDecimalDigit && charCode <= 57 || charCode >= 97 && charCode <= 102;
}
function isValidHexString(id, startIndex, len) {
  if (len === 0)
    return false;
  if (!isLowerCaseNonZeroHexDigit(id, startIndex))
    return false;
  for (let i = 1; i < len; i++)
    if (!isLowerCaseHexDigit(id, startIndex + i))
      return false;
  return true;
}
var Id64;
(function(Id642) {
  function getLocalId(id) {
    if (isInvalid(id))
      return 0;
    const len = id.length;
    const start = len > 12 ? len - 10 : 2;
    return toHex(id.slice(start));
  }
  Id642.getLocalId = getLocalId;
  function getBriefcaseId(id) {
    if (isInvalid(id))
      return 0;
    const len = id.length;
    return len <= 12 ? 0 : toHex(id.slice(2, len - 10));
  }
  Id642.getBriefcaseId = getBriefcaseId;
  function fromJSON(prop) {
    return typeof prop === "string" ? Id642.fromString(prop) : Id642.invalid;
  }
  Id642.fromJSON = fromJSON;
  function fromString(val) {
    if (typeof val !== "string")
      return Id642.invalid;
    if (Id642.isId64(val))
      return val;
    val = val.toLowerCase().trim();
    const len = val.length;
    if (len < 2 || val[0] !== "0" || val[1] !== "x")
      return Id642.invalid;
    let low = 0;
    let high = 0;
    let start = 2;
    if (len > 12) {
      start = len - 10;
      high = toHex(val.slice(2, start));
    }
    low = toHex(val.slice(start));
    return fromLocalAndBriefcaseIds(low, high);
  }
  Id642.fromString = fromString;
  const _localIdPrefixByLocalIdLength = [
    "0000000000",
    "000000000",
    "00000000",
    "0000000",
    "000000",
    "00000",
    "0000",
    "000",
    "00",
    "0",
    ""
  ];
  function fromLocalAndBriefcaseIds(localId, briefcaseId) {
    if (typeof localId !== "number" || typeof briefcaseId !== "number")
      return Id642.invalid;
    localId = Math.floor(localId);
    if (0 === localId)
      return Id642.invalid;
    briefcaseId = Math.floor(briefcaseId);
    const lowStr = localId.toString(16);
    return `0x${briefcaseId === 0 ? lowStr : briefcaseId.toString(16) + (_localIdPrefixByLocalIdLength[lowStr.length] + lowStr)}`;
  }
  Id642.fromLocalAndBriefcaseIds = fromLocalAndBriefcaseIds;
  const scratchCharCodes = [
    48,
    // "0"
    120,
    // "x"
    48,
    // "0"
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48
  ];
  function uint4ToCharCode(uint4) {
    return uint4 + (uint4 < 10 ? 48 : 87);
  }
  function charCodeToUint4(char) {
    return char - (char >= 87 ? 87 : 48);
  }
  function substringToUint32(id, start, end) {
    let uint32 = 0;
    for (let i = start; i < end; i++) {
      const uint4 = charCodeToUint4(id.charCodeAt(i));
      const shift = end - i - 1 << 2;
      const mask = uint4 << shift;
      uint32 = (uint32 | mask) >>> 0;
    }
    return uint32;
  }
  function fromUint32Pair(lowBytes, highBytes) {
    const localIdLow = lowBytes >>> 0;
    const localIdHigh = (highBytes & 255) * (4294967295 + 1);
    const localId = localIdLow + localIdHigh;
    if (0 === localId)
      return Id642.invalid;
    const buffer = scratchCharCodes;
    let index = 2;
    for (let i = 7; i >= 0; i--) {
      const shift = i << 2;
      const mask = 15 << shift;
      const uint4 = (highBytes & mask) >>> shift;
      if (index > 2 || 0 !== uint4)
        buffer[index++] = uint4ToCharCode(uint4);
    }
    for (let i = 7; i >= 0; i--) {
      const shift = i << 2;
      const mask = 15 << shift;
      const uint4 = (lowBytes & mask) >>> shift;
      if (index > 2 || 0 !== uint4)
        buffer[index++] = uint4ToCharCode(uint4);
    }
    if (buffer.length !== index)
      buffer.length = index;
    return String.fromCharCode(...scratchCharCodes);
  }
  Id642.fromUint32Pair = fromUint32Pair;
  function fromUint32PairObject(pair) {
    return fromUint32Pair(pair.lower, pair.upper);
  }
  Id642.fromUint32PairObject = fromUint32PairObject;
  function isValidUint32Pair(lowBytes, highBytes) {
    return 0 !== lowBytes || 0 !== (highBytes & 255);
  }
  Id642.isValidUint32Pair = isValidUint32Pair;
  function getUint32Pair(id, out) {
    if (!out)
      out = { lower: 0, upper: 0 };
    out.lower = getLowerUint32(id);
    out.upper = getUpperUint32(id);
    return out;
  }
  Id642.getUint32Pair = getUint32Pair;
  function getLowerUint32(id) {
    if (isInvalid(id))
      return 0;
    const end = id.length;
    const start = end > 10 ? end - 8 : 2;
    return substringToUint32(id, start, end);
  }
  Id642.getLowerUint32 = getLowerUint32;
  function getUpperUint32(id) {
    const len = id.length;
    if (len <= 10 || isInvalid(id))
      return 0;
    return substringToUint32(id, 2, len - 8);
  }
  Id642.getUpperUint32 = getUpperUint32;
  function toIdSet(arg, makeCopy = false) {
    if (arg instanceof Set)
      return makeCopy ? new Set(arg) : arg;
    const ids = /* @__PURE__ */ new Set();
    if (typeof arg === "string")
      ids.add(arg);
    else if (Array.isArray(arg)) {
      arg.forEach((id) => {
        if (typeof id === "string")
          ids.add(id);
      });
    }
    return ids;
  }
  Id642.toIdSet = toIdSet;
  function* iterator(ids) {
    if (typeof ids === "string") {
      yield ids;
    } else {
      for (const id of ids)
        yield id;
    }
  }
  Id642.iterator = iterator;
  function iterable(ids) {
    return {
      [Symbol.iterator]: () => iterator(ids)
    };
  }
  Id642.iterable = iterable;
  function getFirst(arg) {
    return typeof arg === "string" ? arg : (Array.isArray(arg) ? arg[0] : arg.values().next().value) ?? Id642.invalid;
  }
  Id642.getFirst = getFirst;
  function sizeOf(arg) {
    return typeof arg === "string" ? 1 : Array.isArray(arg) ? arg.length : arg.size;
  }
  Id642.sizeOf = sizeOf;
  function has(arg, id) {
    if (typeof arg === "string")
      return arg === id;
    if (Array.isArray(arg))
      return -1 !== arg.indexOf(id);
    return arg.has(id);
  }
  Id642.has = has;
  Id642.invalid = "0";
  function isTransient(id) {
    return 18 === id.length && id.startsWith("0xffffff");
  }
  Id642.isTransient = isTransient;
  function isTransientId64(id) {
    return isValidId64(id) && isTransient(id);
  }
  Id642.isTransientId64 = isTransientId64;
  function isId64(id) {
    const len = id.length;
    if (0 === len || 18 < len)
      return false;
    if ("0" !== id[0])
      return false;
    if (1 === len)
      return true;
    if (2 === len || "x" !== id[1])
      return false;
    let localIdStart = 2;
    if (len > 12) {
      localIdStart = len - 10;
      if (!isValidHexString(id, 2, localIdStart - 2))
        return false;
      for (let i = localIdStart; i < len; i++) {
        if (48 !== id.charCodeAt(i))
          break;
        else
          localIdStart++;
      }
      if (localIdStart >= len)
        return false;
    }
    return isValidHexString(id, localIdStart, len - localIdStart);
  }
  Id642.isId64 = isId64;
  function isValid(id) {
    return Id642.invalid !== id;
  }
  Id642.isValid = isValid;
  function isValidId64(id) {
    return Id642.invalid !== id && Id642.isId64(id);
  }
  Id642.isValidId64 = isValidId64;
  function isInvalid(id) {
    return Id642.invalid === id;
  }
  Id642.isInvalid = isInvalid;
  class Uint32Set {
    _map = /* @__PURE__ */ new Map();
    /** Construct a new Uint32Set.
     * @param ids If supplied, all of the specified Ids will be added to the new set.
     */
    constructor(ids) {
      if (void 0 !== ids)
        this.addIds(ids);
    }
    /** Return true if `this` and `other` contain the same set of Ids. */
    equals(other) {
      if (this === other) {
        return true;
      }
      if (this.size !== other.size) {
        return false;
      }
      for (const [key, thisValue] of this._map) {
        const otherValue = other._map.get(key);
        if (!otherValue || thisValue.size !== otherValue.size) {
          return false;
        }
        for (const value of thisValue) {
          if (!otherValue.has(value)) {
            return false;
          }
        }
      }
      return true;
    }
    /** Remove all contents of this set. */
    clear() {
      this._map.clear();
    }
    /** Add an Id to the set. */
    addId(id) {
      this.add(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Add any number of Ids to the set. */
    addIds(ids) {
      for (const id of Id642.iterable(ids))
        this.addId(id);
    }
    /** Returns true if the set contains the specified Id. */
    hasId(id) {
      return this.has(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Add an Id to the set. */
    add(low, high) {
      let set = this._map.get(high);
      if (void 0 === set) {
        set = /* @__PURE__ */ new Set();
        this._map.set(high, set);
      }
      set.add(low);
    }
    /** Remove an Id from the set. */
    deleteId(id) {
      this.delete(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Remove any number of Ids from the set. */
    deleteIds(ids) {
      for (const id of Id642.iterable(ids))
        this.deleteId(id);
    }
    /** Remove an Id from the set. */
    delete(low, high) {
      const set = this._map.get(high);
      if (void 0 !== set) {
        set.delete(low);
        if (set.size === 0)
          this._map.delete(high);
      }
    }
    /** Returns true if the set contains the specified Id. */
    has(low, high) {
      const set = this._map.get(high);
      return void 0 !== set && set.has(low);
    }
    /** Returns true if the set contains the Id specified by `pair`. */
    hasPair(pair) {
      return this.has(pair.lower, pair.upper);
    }
    /** Returns true if the set contains no Ids. */
    get isEmpty() {
      return 0 === this._map.size;
    }
    /** Returns the number of Ids contained in the set. */
    get size() {
      let size = 0;
      for (const entry of this._map)
        size += entry[1].size;
      return size;
    }
    /** Populates and returns an array of all Ids contained in the set. */
    toId64Array() {
      const ids = [];
      for (const entry of this._map)
        for (const low of entry[1])
          ids.push(Id642.fromUint32Pair(low, entry[0]));
      return ids;
    }
    /** Populates and returns a set of all Ids contained in the set. */
    toId64Set() {
      const ids = /* @__PURE__ */ new Set();
      for (const entry of this._map)
        for (const low of entry[1])
          ids.add(Id642.fromUint32Pair(low, entry[0]));
      return ids;
    }
    /** Execute a function against each Id in this set. */
    forEach(func) {
      for (const entry of this._map)
        for (const lo of entry[1])
          func(lo, entry[0]);
    }
  }
  Id642.Uint32Set = Uint32Set;
  class Uint32Map {
    _map = /* @__PURE__ */ new Map();
    /** Remove all entries from the map. */
    clear() {
      this._map.clear();
    }
    /** Find an entry in the map by Id. */
    getById(id) {
      return this.get(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Set an entry in the map by Id. */
    setById(id, value) {
      this.set(Id642.getLowerUint32(id), Id642.getUpperUint32(id), value);
    }
    /** Set an entry in the map by Id components. */
    set(low, high, value) {
      let map = this._map.get(high);
      if (void 0 === map) {
        map = /* @__PURE__ */ new Map();
        this._map.set(high, map);
      }
      map.set(low, value);
    }
    /** Get an entry from the map by Id components. */
    get(low, high) {
      const map = this._map.get(high);
      return void 0 !== map ? map.get(low) : void 0;
    }
    /** Returns true if the map contains no entries. */
    get isEmpty() {
      return 0 === this._map.size;
    }
    /** Returns the number of entries in the map. */
    get size() {
      let size = 0;
      for (const entry of this._map)
        size += entry[1].size;
      return size;
    }
    /** Execute a function against each entry in this map. */
    forEach(func) {
      for (const outerEntry of this._map)
        for (const innerEntry of outerEntry[1])
          func(innerEntry[0], outerEntry[0], innerEntry[1]);
    }
  }
  Id642.Uint32Map = Uint32Map;
})(Id64 || (Id64 = {}));
function validateLocalId(num) {
  if (num < 0 || Math.round(num) !== num) {
    throw new Error("Local Id must be a non-negative integer");
  }
}
class TransientIdSequence {
  /** The starting local Id provided to the constructor. The sequence begins at `initialLocalId + 1`. */
  initialLocalId;
  _localId;
  /** Constructor.
   * @param initialLocalId The starting local Id. The local Id of the first [[Id64String]] generated by [[getNext]] will be `initialLocalId + 1`.
   */
  constructor(initialLocalId = 0) {
    validateLocalId(initialLocalId);
    this.initialLocalId = initialLocalId;
    this._localId = initialLocalId;
  }
  /** The maximum local Id generated by the sequence thus far. It is never less than [[initialLocalId]]. If it is equal to [[initialLocalId]], then the sequence has
   * not yet generated any Ids.
   * Each call to [[getNext]] increments this by 1 and uses it as the local Id of the generated [[Id64String]].
   */
  get currentLocalId() {
    return this._localId;
  }
  /** Generate and return the next transient Id64String in the sequence. */
  getNext() {
    return Id64.fromLocalAndBriefcaseIds(++this._localId, 16777215);
  }
  /** Preview the transient Id64String that will be returned by the next call to [[getNext]].
   * This is primarily useful for tests.
   */
  peekNext() {
    return Id64.fromLocalAndBriefcaseIds(this._localId + 1, 16777215);
  }
  /** Convert this sequence to its JSON representation. */
  toJSON() {
    return {
      initialLocalId: this.initialLocalId,
      currentLocalId: this.currentLocalId
    };
  }
  /** Create a sequence from its JSON representation. */
  static fromJSON(props) {
    validateLocalId(props.currentLocalId);
    const sequence = new TransientIdSequence(props.initialLocalId);
    sequence._localId = props.currentLocalId;
    return sequence;
  }
  /** Obtain the JSON representation of a new sequence that diverges from this sequence, with its [[initialLocalId]] set to this sequence's [[currentLocalId]].
   * The two sequences can generate Ids independently. Later, you can [[merge]] the sequences, resolving conflicts where the two sequences generated identical Ids.
   * This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
   */
  fork() {
    return {
      initialLocalId: this.currentLocalId,
      currentLocalId: this.currentLocalId
    };
  }
  /** Integrate the Ids generated by a [[fork]] of this sequence. All of the Ids generated by `source` will be remapped to Ids at the end of this sequence.
   * This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
   * @param source The JSON representation of the [[fork]]ed sequence to be merged with this one.
   * @returns a function that permits you to remap the local Ids generated by `source` into the corresponding local Ids assigned by this sequence.
   * @throws Error if `source` is not a fork of this sequence or is malformed (e.g., contains negative and/or non-integer local Ids).
   */
  merge(source) {
    const { initialLocalId, currentLocalId } = source;
    validateLocalId(initialLocalId);
    validateLocalId(currentLocalId);
    if (initialLocalId > this.currentLocalId) {
      throw new Error("Transient Id sequences do not intersect");
    }
    if (initialLocalId > currentLocalId) {
      throw new Error("Current local Id cannot be less than initial local Id");
    }
    const delta = this.currentLocalId - initialLocalId;
    this._localId += currentLocalId - initialLocalId;
    return (sourceLocalId) => {
      if (sourceLocalId > initialLocalId && sourceLocalId <= currentLocalId) {
        return sourceLocalId + delta;
      }
      return sourceLocalId;
    };
  }
}
var Guid;
(function(Guid2) {
  const uuidPattern = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
  Guid2.empty = "00000000-0000-0000-0000-000000000000";
  function isGuid(value) {
    return uuidPattern.test(value);
  }
  Guid2.isGuid = isGuid;
  function isV4Guid(value) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
  }
  Guid2.isV4Guid = isV4Guid;
  function createValue() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  Guid2.createValue = createValue;
  function normalize(value) {
    const lowerValue = value.toLowerCase().trim();
    if (isGuid(lowerValue))
      return lowerValue;
    const noDashValue = lowerValue.replace(/-/g, "");
    const noDashPattern = /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/;
    if (noDashPattern.test(noDashValue)) {
      return noDashValue.replace(noDashPattern, (_match, p1, p2, p3, p4, p5) => `${p1}-${p2}-${p3}-${p4}-${p5}`);
    }
    return value;
  }
  Guid2.normalize = normalize;
})(Guid || (Guid = {}));
var OrderedId64Iterable;
(function(OrderedId64Iterable2) {
  function compare(lhs, rhs) {
    if (lhs.length !== rhs.length)
      return lhs.length < rhs.length ? -1 : 1;
    if (lhs !== rhs)
      return lhs < rhs ? -1 : 1;
    return 0;
  }
  OrderedId64Iterable2.compare = compare;
  function sortArray(ids) {
    ids.sort((x, y) => compare(x, y));
    return ids;
  }
  OrderedId64Iterable2.sortArray = sortArray;
  function areEqualSets(ids1, ids2) {
    const leftIter = uniqueIterator(ids1);
    const rightIter = uniqueIterator(ids2);
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    while (!leftState.done && !rightState.done) {
      const left = leftState.value;
      const right = rightState.value;
      if (0 !== compare(left, right))
        return false;
      leftState = leftIter.next();
      rightState = rightIter.next();
    }
    if (leftState.done && rightState.done)
      return true;
    return false;
  }
  OrderedId64Iterable2.areEqualSets = areEqualSets;
  function isEmptySet(ids) {
    if (typeof ids === "string")
      return "" === ids;
    return true === ids[Symbol.iterator]().next().done;
  }
  OrderedId64Iterable2.isEmptySet = isEmptySet;
  function unique(ids) {
    return { [Symbol.iterator]: () => uniqueIterator(ids) };
  }
  OrderedId64Iterable2.unique = unique;
  function* uniqueIterator(ids) {
    const iter = ids[Symbol.iterator]();
    let state = iter.next();
    let prev;
    while (!state.done) {
      const id = state.value;
      state = iter.next();
      if (id !== prev) {
        prev = id;
        yield id;
      }
    }
  }
  OrderedId64Iterable2.uniqueIterator = uniqueIterator;
  function union(ids1, ids2) {
    return { [Symbol.iterator]: () => unionIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.union = union;
  function intersection(ids1, ids2) {
    return { [Symbol.iterator]: () => intersectionIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.intersection = intersection;
  function difference(ids1, ids2) {
    return { [Symbol.iterator]: () => differenceIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.difference = difference;
  function* unionIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done || !rightState.done) {
      const left = leftState.done ? void 0 : leftState.value;
      const right = rightState.done ? void 0 : rightState.value;
      if (void 0 === left && void 0 === right)
        break;
      let next;
      if (void 0 === left) {
        next = right;
        rightState = rightIter.next();
      } else if (void 0 === right) {
        next = left;
        leftState = leftIter.next();
      } else {
        const cmp = compare(left, right);
        if (cmp <= 0) {
          next = left;
          leftState = leftIter.next();
          if (0 === cmp)
            rightState = rightIter.next();
        } else {
          next = right;
          rightState = rightIter.next();
        }
      }
      if (prev === next)
        continue;
      prev = next;
      yield next;
    }
  }
  OrderedId64Iterable2.unionIterator = unionIterator;
  function* intersectionIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done && !rightState.done) {
      const left = leftState.value;
      leftState = leftIter.next();
      if (left === prev)
        continue;
      prev = left;
      let right = rightState.value;
      let cmp = compare(left, right);
      while (cmp > 0) {
        rightState = rightIter.next();
        if (rightState.done)
          return;
        right = rightState.value;
        cmp = compare(left, right);
      }
      if (0 === cmp)
        yield left;
    }
  }
  OrderedId64Iterable2.intersectionIterator = intersectionIterator;
  function* differenceIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done) {
      const left = leftState.value;
      leftState = leftIter.next();
      if (left === prev)
        continue;
      else if (rightState.done) {
        yield prev = left;
        continue;
      }
      let right = rightState.value;
      let cmp = compare(left, right);
      while (cmp > 0 && !rightState.done) {
        rightState = rightIter.next();
        if (rightState.done) {
          yield prev = left;
          continue;
        }
        right = rightState.value;
        cmp = compare(left, right);
      }
      if (cmp < 0)
        yield prev = left;
    }
  }
  OrderedId64Iterable2.differenceIterator = differenceIterator;
})(OrderedId64Iterable || (OrderedId64Iterable = {}));
function shallowClone(value) {
  return value;
}
function lowerBound(value, list, compare) {
  return lowerBoundOfEquivalent(list, (element) => compare(value, element));
}
function lowerBoundOfEquivalent(list, criterion) {
  let low = 0;
  let high = list.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const comp = criterion(list[mid]);
    if (0 === comp)
      return { index: mid, equal: true };
    else if (comp < 0)
      high = mid;
    else
      low = mid + 1;
  }
  return { index: low, equal: false };
}
var DuplicatePolicy;
(function(DuplicatePolicy2) {
  DuplicatePolicy2[DuplicatePolicy2["Allow"] = 0] = "Allow";
  DuplicatePolicy2[DuplicatePolicy2["Retain"] = 1] = "Retain";
  DuplicatePolicy2[DuplicatePolicy2["Replace"] = 2] = "Replace";
})(DuplicatePolicy || (DuplicatePolicy = {}));
class ReadonlySortedArray {
  _array = [];
  _compare;
  _clone;
  _duplicatePolicy;
  /**
   * Construct a new ReadonlySortedArray<T>.
   * @param compare The function used to compare elements within the array.
   * @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
   * @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
   */
  constructor(compare, duplicatePolicy = false, clone = shallowClone) {
    this._compare = compare;
    this._clone = clone;
    if (typeof duplicatePolicy === "boolean")
      duplicatePolicy = duplicatePolicy ? DuplicatePolicy.Allow : DuplicatePolicy.Retain;
    this._duplicatePolicy = duplicatePolicy;
  }
  /** The number of elements in the array */
  get length() {
    return this._array.length;
  }
  /** Returns true if the array contains no elements. */
  get isEmpty() {
    return 0 === this.length;
  }
  /** Returns an iterator over the contents of the array in sorted order, suitable for use in `for-of` loops. */
  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }
  /**
   * Looks up the index of an element comparing equal to the specified value using binary search.
   * @param value The value to search for
   * @returns the index of the first equivalent element found in the array, or -1 if no such element exists.
   */
  indexOf(value) {
    const bound = this.lowerBound(value);
    return bound.equal ? bound.index : -1;
  }
  /**
   * Returns true if this array contains at least one value comparing equal to the specified value.
   * @param value The value to search for
   * @returns true if an equivalent element exists in the array.
   */
  contains(value) {
    return -1 !== this.indexOf(value);
  }
  /**
   * Looks up an element comparing equal to the specified value using binary search.
   * @param value The value to search for
   * @returns the first equivalent element found in the array, or undefined if no such element exists.
   */
  findEqual(value) {
    const index = this.indexOf(value);
    return -1 !== index ? this._array[index] : void 0;
  }
  /** Find an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
   * As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find a model by its Id,
   * use `sortedArray.findEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
   * @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if it compares as "less-than", or a positive value if it compares as "greater-than".
   * @returns The first element found that meets the criterion, or `undefined` if no elements meet the criterion.
   * @see [[indexOfEquivalent]].
   * @public
   */
  findEquivalent(criterion) {
    const index = this.indexOfEquivalent(criterion);
    return -1 !== index ? this._array[index] : void 0;
  }
  /** Find the index of an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
   * As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find the index of a model by its Id,
   * use `sortedArray.indexOfEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
   * @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if the element compares as "less-than", or a positive value if the element compares as "greater-than".
   * @returns The index of the first element found that meets the criterion, or -1 if no elements meet the criterion.
   * @public
   */
  indexOfEquivalent(criterion) {
    const bound = lowerBoundOfEquivalent(this._array, (elem) => 0 - criterion(elem));
    return bound.equal ? bound.index : -1;
  }
  /**
   * Looks up an element by its index in the array.
   * @param index The array index
   * @returns the element corresponding to that position in the array, or undefined if the supplied index exceeds the length of the array.
   */
  get(index) {
    return index < this.length ? this._array[index] : void 0;
  }
  /** Apply a function to each element in the array, in sorted order.
   * @param func The function to be applied.
   */
  forEach(func) {
    for (let i = 0; i < this.length; i++)
      func(this._array[i]);
  }
  /** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
  slice(start, end) {
    const slice = new ReadonlySortedArray(this._compare, this._duplicatePolicy, this._clone);
    slice._array = this._array.slice(start, end);
    return slice;
  }
  /**
   * Computes the position at which the specified value should be inserted to maintain sorted order.
   * @param value The value whose position is to be computed.
   * @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent element already exists at that index.
   */
  lowerBound(value) {
    return lowerBound(value, this._array, this._compare);
  }
  /** Clears the contents of the sorted array. */
  _clear() {
    this._array.length = 0;
  }
  /** Extracts the sorted array as a T[] and empties the contents of this ReadonlySortedArray.
   * @returns the contents of this ReadonlySortedArray as a T[].
   */
  _extractArray() {
    const result = this._array;
    this._array = [];
    return result;
  }
  /**
   * Attempts to insert a new value into the array at a position determined by the ordering.
   * The behavior differs based on the array's [[DuplicatePolicy]]:
   * If duplicates are **not** permitted, then:
   *  - If an equivalent element already exists in the array:
   *    - [[DuplicatePolicy.Retain]]: nothing will be inserted and the index of the existing element will be returned.
   *    - [[DuplicatePolicy.Replace]]: the input value will overwrite the existing element at the same index and that index will be returned.
   *  - Otherwise, the element is inserted and its index is returned.
   * If duplicates **are** permitted, then:
   *  - The element will be inserted in a correct position based on the sorting criterion;
   *  - The position of the element relative to other elements comparing as equal to it is unspecified; and
   *  - The actual index of the newly-inserted element is returned.
   * If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
   * @param value The value to insert
   * @param onInsert The optional callback method to call if insertion occurs with the inserted value
   * @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
   */
  _insert(value, onInsert) {
    const bound = this.lowerBound(value);
    if (bound.equal) {
      switch (this._duplicatePolicy) {
        case DuplicatePolicy.Retain:
          return bound.index;
        case DuplicatePolicy.Replace:
          this._array[bound.index] = this._clone(value);
          if (onInsert)
            onInsert(value);
          return bound.index;
      }
    }
    this._array.splice(bound.index, 0, this._clone(value));
    if (void 0 !== onInsert)
      onInsert(value);
    return bound.index;
  }
  /**
   * Removes the first occurrence of a value comparing equal to the specified value from the array.
   * @param value The value of the element to delete
   * @returns the index of the deleted value, or -1 if no such element exists.
   */
  _remove(value) {
    const bound = this.lowerBound(value);
    if (bound.equal) {
      this._array.splice(bound.index, 1);
      return bound.index;
    } else {
      return -1;
    }
  }
}
class SortedArray extends ReadonlySortedArray {
  /**
   * Construct a new SortedArray<T>.
   * @param compare The function used to compare elements within the array.
   * @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
   * @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
   */
  constructor(compare, duplicatePolicy = false, clone = shallowClone) {
    super(compare, duplicatePolicy, clone);
  }
  /** Clears the contents of the sorted array. */
  clear() {
    this._clear();
  }
  /** Extracts the sorted array as a T[] and empties the contents of this SortedArray.
   * @returns the contents of this SortedArray as a T[].
   */
  extractArray() {
    return this._extractArray();
  }
  /**
   * Attempts to insert a new value into the array at a position determined by the ordering.
   * The behavior differs based on whether or not duplicate elements are permitted.
   * If duplicates are **not** permitted, then:
   *  - If an equivalent element already exists in the array, nothing will be inserted and the index of the existing element will be returned.
   *  - Otherwise, the element is inserted and its index is returned.
   * If duplicates **are** permitted, then:
   *  - The element will be inserted in a correct position based on the sorting criterion;
   *  - The position of the element relative to other elements comparing as equal to it is unspecified; and
   *  - The actual index of the newly-inserted element is returned.
   * If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
   * @param value The value to insert
   * @param onInsert The optional callback method to call if insertion occurs with the inserted value
   * @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
   */
  insert(value, onInsert) {
    return this._insert(value, onInsert);
  }
  /**
   * Removes the first occurrence of a value comparing equal to the specified value from the array.
   * @param value The value of the element to delete
   * @returns the index of the deleted value, or -1 if no such element exists.
   */
  remove(value) {
    return this._remove(value);
  }
  /** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
  slice(start, end) {
    const slice = new SortedArray(this._compare, this._duplicatePolicy, this._clone);
    slice._array = this._array.slice(start, end);
    return slice;
  }
}
var CompressedId64Set;
(function(CompressedId64Set2) {
  function isHexDigit(ch) {
    return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70;
  }
  function compactRange(increment, length) {
    const inc = `+${increment.toString()}`;
    if (length <= 1)
      return inc;
    const len = length.toString(16).toUpperCase();
    return `${inc}*${len}`;
  }
  function compressSet(ids) {
    return sortAndCompress(ids);
  }
  CompressedId64Set2.compressSet = compressSet;
  function sortAndCompress(ids) {
    const arr = typeof ids === "string" ? [ids] : Array.from(ids);
    OrderedId64Iterable.sortArray(arr);
    return compressArray(arr);
  }
  CompressedId64Set2.sortAndCompress = sortAndCompress;
  function compressArray(ids) {
    return compressIds(ids);
  }
  CompressedId64Set2.compressArray = compressArray;
  function compressIds(ids) {
    if ("string" === typeof ids)
      return ids;
    let str = "";
    const prevId = new Uint64();
    const rangeIncrement = new Uint64();
    let rangeLen = 0;
    const curId = new Uint64();
    const curIncrement = new Uint64();
    for (const id of ids) {
      if (!Id64.isValidId64(id))
        continue;
      curId.setFromId(id);
      curIncrement.setFromDifference(curId, prevId);
      const cmp = prevId.compare(curId);
      if (0 === cmp)
        continue;
      else if (cmp > 0)
        throw new Error("CompressedId64Set.compressArray requires a sorted array as input");
      prevId.copyFrom(curId);
      if (0 === rangeLen) {
        rangeIncrement.copyFrom(curIncrement);
        rangeLen = 1;
      } else if (curIncrement.equals(rangeIncrement)) {
        ++rangeLen;
      } else {
        str += compactRange(rangeIncrement, rangeLen);
        rangeIncrement.copyFrom(curIncrement);
        rangeLen = 1;
      }
    }
    if (0 < rangeLen)
      str += compactRange(rangeIncrement, rangeLen);
    return str;
  }
  CompressedId64Set2.compressIds = compressIds;
  class Uint64 {
    lower;
    upper;
    static _base = 4294967296;
    static assertUint32(num) {
    }
    assertConstraints() {
      Uint64.assertUint32(this.lower);
      Uint64.assertUint32(this.upper);
    }
    constructor(lower = 0, upper = 0) {
      this.lower = lower;
      this.upper = upper;
      this.assertConstraints();
    }
    compare(rhs) {
      const diff = this.upper - rhs.upper;
      return 0 === diff ? this.lower - rhs.lower : diff;
    }
    equals(rhs) {
      return 0 === this.compare(rhs);
    }
    isLessThan(rhs) {
      return this.compare(rhs) < 0;
    }
    isGreaterThan(rhs) {
      return this.compare(rhs) > 0;
    }
    get isZero() {
      return 0 === this.lower && 0 === this.upper;
    }
    setFromDifference(lhs, rhs) {
      assert(!rhs.isGreaterThan(lhs));
      this.lower = lhs.lower - rhs.lower;
      this.upper = lhs.upper - rhs.upper;
      if (this.lower < 0) {
        this.lower += Uint64._base;
        this.upper -= 1;
      }
    }
    add(rhs) {
      let lower = rhs.lower;
      let upper = rhs.upper;
      if (lower + this.lower >= Uint64._base) {
        lower -= Uint64._base;
        upper += 1;
      }
      this.lower += lower;
      this.upper += upper;
      this.assertConstraints();
    }
    setFromId(id) {
      Id64.getUint32Pair(id, this);
    }
    copyFrom(other) {
      this.lower = other.lower;
      this.upper = other.upper;
    }
    toString() {
      if (0 === this.upper)
        return this.lower.toString(16).toUpperCase();
      const upper = this.upper.toString(16);
      const lower = this.lower.toString(16).padStart(8, "0");
      assert(lower.length === 8);
      return `${upper}${lower}`.toUpperCase();
    }
    toId64String() {
      return Id64.fromUint32Pair(this.lower, this.upper);
    }
  }
  function* iterator(ids) {
    if (0 === ids.length)
      return;
    if ("+" !== ids[0])
      throw new Error("Invalid CompressedId64Set");
    let curIndex = 1;
    const curId = new Uint64();
    function parseUint32() {
      let value = 0;
      let nChars = 0;
      while (curIndex < ids.length && nChars < 8) {
        ++nChars;
        const ch = ids.charCodeAt(curIndex);
        if (!isHexDigit(ch))
          break;
        value <<= 4;
        value |= ch >= 65 ? ch - 65 + 10 : ch - 48;
        value = value >>> 0;
        ++curIndex;
      }
      return value;
    }
    function parseUint64(uint64) {
      let lower = 0;
      let upper = 0;
      const startIndex = curIndex;
      const first = parseUint32();
      const nFirstDigits = curIndex - startIndex;
      if (8 === nFirstDigits && curIndex + 1 < ids.length && isHexDigit(ids.charCodeAt(curIndex + 1))) {
        const secondIndex = curIndex;
        const second = parseUint32();
        const nSecondDigits = curIndex - secondIndex;
        const nDigitsToTransfer = 8 - nSecondDigits;
        upper = first >>> 4 * nDigitsToTransfer;
        const transfer = first - (upper << 4 * nDigitsToTransfer >>> 0);
        lower = (second | transfer << 4 * nSecondDigits >>> 0) >>> 0;
      } else {
        lower = first;
      }
      uint64.lower = lower;
      uint64.upper = upper;
    }
    const increment = new Uint64();
    while (curIndex < ids.length) {
      let multiplier = 1;
      parseUint64(increment);
      if (increment.isZero)
        throw new Error("Invalid CompressedId64Set");
      if (curIndex < ids.length) {
        switch (ids[curIndex++]) {
          case "*":
            multiplier = parseUint32();
            if (0 === multiplier)
              throw new Error("Invalid CompressedId64Set");
            if (curIndex !== ids.length && ids[curIndex++] !== "+")
              return;
            break;
          case "+":
            break;
          default:
            throw new Error("Invalid CompressedId64Set");
        }
      }
      for (let i = 0; i < multiplier; i++) {
        curId.add(increment);
        yield curId.toId64String();
      }
    }
  }
  CompressedId64Set2.iterator = iterator;
  function iterable(ids) {
    return {
      [Symbol.iterator]: () => iterator(ids)
    };
  }
  CompressedId64Set2.iterable = iterable;
  function decompressSet(compressedIds, out) {
    const set = out ?? /* @__PURE__ */ new Set();
    for (const id of iterable(compressedIds))
      set.add(id);
    return set;
  }
  CompressedId64Set2.decompressSet = decompressSet;
  function decompressArray(compressedIds, out) {
    const arr = out ?? [];
    for (const id of iterable(compressedIds))
      arr.push(id);
    return arr;
  }
  CompressedId64Set2.decompressArray = decompressArray;
})(CompressedId64Set || (CompressedId64Set = {}));
class OrderedId64Array extends SortedArray {
  /** Construct a new, empty array. */
  constructor() {
    super((lhs, rhs) => OrderedId64Iterable.compare(lhs, rhs));
  }
  /** An iterable that iterates over the Ids in sorted order. */
  get ids() {
    return this._array;
  }
  /** The underlying array of Ids. */
  get array() {
    return this._array;
  }
}
class MutableCompressedId64Set {
  _ids;
  _inserted = new OrderedId64Array();
  _deleted = new OrderedId64Array();
  /** Construct a new set, optionally initialized to contain the Ids represented by `ids`. */
  constructor(ids) {
    this._ids = ids ?? "";
  }
  /** Obtain the compact string representation of the contents of this set. If any insertions or removals are pending, they will be applied and the string recomputed. */
  get ids() {
    this.updateIds();
    return this._ids;
  }
  /** Add the specified Id to the set.
   * @throws Error if `id` is not a valid [[Id64String]].
   */
  add(id) {
    if (!Id64.isValidId64(id))
      throw new Error("MutableCompressedId64Set.add: invalid Id");
    this._deleted.remove(id);
    this._inserted.insert(id);
  }
  /** Remove the specified Id from the set.
   * @throws Error if `id` is not a valid [[Id64String]].
   */
  delete(id) {
    if (!Id64.isValidId64(id))
      throw new Error("MutableCompressedId64Set.delete: invalid Id");
    this._inserted.remove(id);
    this._deleted.insert(id);
  }
  /** Remove all Ids from the set. */
  clear() {
    this._ids = "";
    this._inserted.clear();
    this._deleted.clear();
  }
  /** Remove all Ids from the set, then add the specified Ids. */
  reset(ids) {
    this.clear();
    this._ids = ids ?? "";
  }
  /** Obtain an iterator over the Ids in this set. The Ids are returned in ascending order based on their unsigned 64-bit integer values. */
  [Symbol.iterator]() {
    return CompressedId64Set.iterator(this.ids);
  }
  /** Compute a compact string representation of the union of this and another set of Ids - i.e., those Ids present in either this and/or the other set. */
  computeUnion(ids) {
    if (this.isEmpty)
      return CompressedId64Set.compressIds(ids);
    else if (OrderedId64Iterable.isEmptySet(ids) || this.equals(ids))
      return this.ids;
    return CompressedId64Set.compressIds(OrderedId64Iterable.union(this, ids));
  }
  /** Compute a compact string representation of the intersection of this and another set of Ids - i.e., those Ids present in both this and the other set. */
  computeIntersection(ids) {
    if (this.equals(ids))
      return this.ids;
    else if (this.isEmpty || OrderedId64Iterable.isEmptySet(ids))
      return "";
    return CompressedId64Set.compressIds(OrderedId64Iterable.intersection(this, ids));
  }
  /** Compute a compact string representation of the difference between this and another set - i.e., those Ids present in this but not in the other set. */
  computeDifference(ids) {
    if (this.isEmpty || this.equals(ids))
      return "";
    return CompressedId64Set.compressIds(OrderedId64Iterable.difference(this, ids));
  }
  /** Return true if this set contains no Ids. */
  get isEmpty() {
    return OrderedId64Iterable.isEmptySet(this.ids);
  }
  /** Return true if the set of Ids represented by `other` is identical to those in this set.
   * @note This considers only the **distinct** Ids in `other` - duplicates are ignored.
   */
  equals(other) {
    if (other instanceof MutableCompressedId64Set) {
      if (other === this)
        return true;
      if (typeof other !== "string")
        other = other.ids;
    }
    if (typeof other === "string")
      return other === this.ids;
    this.updateIds();
    return OrderedId64Iterable.areEqualSets(this, other);
  }
  get _isDirty() {
    return !this._inserted.isEmpty || !this._deleted.isEmpty;
  }
  updateIds() {
    if (!this._isDirty)
      return;
    const difference = OrderedId64Iterable.difference(CompressedId64Set.iterable(this._ids), this._deleted.ids);
    const union = { [Symbol.iterator]: () => OrderedId64Iterable.unionIterator(difference, this._inserted.ids) };
    this._ids = CompressedId64Set.compressIds(union);
    this._inserted.clear();
    this._deleted.clear();
  }
}
Symbol.dispose ??= Symbol("Symbol.dispose");
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
function isIDisposable(obj) {
  return !!obj && obj instanceof Object && !!obj.dispose && typeof obj.dispose === "function";
}
function isDisposable(obj) {
  return !!obj && obj instanceof Object && !!obj[Symbol.dispose] && typeof obj[Symbol.dispose] === "function";
}
function dispose(disposable) {
  if (void 0 !== disposable) {
    if (Symbol.dispose in disposable)
      disposable[Symbol.dispose]();
    else
      disposable.dispose();
  }
  return void 0;
}
function disposeArray(list) {
  if (void 0 === list)
    return void 0;
  for (const entry of list) {
    if (Symbol.dispose in entry)
      entry[Symbol.dispose]();
    else
      entry.dispose();
  }
  list.length = 0;
  return void 0;
}
function using(resources, func) {
  if (!Array.isArray(resources))
    return using([resources], func);
  const doDispose = () => resources.forEach((disposable) => disposable.dispose());
  let shouldDisposeImmediately = true;
  try {
    const result = func(...resources);
    if (result instanceof Promise) {
      shouldDisposeImmediately = false;
      result.then(doDispose, doDispose);
    }
    return result;
  } finally {
    if (shouldDisposeImmediately)
      doDispose();
  }
}
class FuncDisposable {
  _disposeFunc;
  constructor(disposeFunc) {
    this._disposeFunc = disposeFunc;
  }
  dispose() {
    this._disposeFunc();
  }
}
class DisposableList {
  _disposables;
  /** Creates a disposable list. */
  constructor(disposables = []) {
    this._disposables = [];
    disposables.forEach((disposable) => {
      this.add(disposable);
    });
  }
  isDisposable(x) {
    return x.dispose !== void 0;
  }
  /** Register an object for disposal. */
  add(disposable) {
    if (this.isDisposable(disposable))
      this._disposables.push(disposable);
    else
      this._disposables.push(new FuncDisposable(disposable));
  }
  /** Unregister disposable object. */
  remove(disposable) {
    const idx = this._disposables.indexOf(disposable);
    if (-1 !== idx)
      this._disposables.splice(idx, 1);
  }
  /** Disposes all registered objects. */
  dispose() {
    for (const disposable of this._disposables)
      disposable.dispose();
  }
}
var SpanKind;
(function(SpanKind2) {
  SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
  SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
  SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
  SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
  SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind || (SpanKind = {}));
function isValidPrimitive(val) {
  return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
function isValidPrimitiveArray(val) {
  if (!Array.isArray(val))
    return false;
  let itemType;
  for (const x of val) {
    if (x === void 0 || x === null)
      continue;
    if (!itemType) {
      itemType = typeof x;
      if (!isValidPrimitive(x))
        return false;
    }
    if (typeof x !== itemType)
      return false;
  }
  return true;
}
function isPlainObject(obj) {
  return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function* getFlatEntries(obj, path = "") {
  if (isValidPrimitiveArray(obj)) {
    yield [path, obj];
    return;
  }
  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    yield [path, isValidPrimitive(obj) ? obj : JSON.stringify(obj)];
    return;
  }
  const entries = Object.entries(obj);
  if (entries.length === 0)
    yield [path, []];
  for (const [key, val] of entries)
    yield* getFlatEntries(val, path === "" ? key : `${path}.${key}`);
}
function flattenObject(obj) {
  return Object.fromEntries(getFlatEntries(obj));
}
class Tracing {
  static _tracer;
  static _openTelemetry;
  /**
   * If OpenTelemetry tracing is enabled, creates a new span and runs the provided function in it.
   * If OpenTelemetry tracing is _not_ enabled, runs the provided function.
   * @param name name of the new span
   * @param fn function to run inside the new span
   * @param options span options
   * @param parentContext optional context used to retrieve parent span id
   */
  static async withSpan(name, fn, options, parentContext) {
    if (Tracing._tracer === void 0 || Tracing._openTelemetry === void 0)
      return fn();
    const parent = parentContext === void 0 ? Tracing._openTelemetry.context.active() : Tracing._openTelemetry.trace.setSpanContext(Tracing._openTelemetry.context.active(), parentContext);
    return Tracing._openTelemetry.context.with(Tracing._openTelemetry.trace.setSpan(parent, Tracing._tracer.startSpan(name, options, Tracing._openTelemetry.context.active())), async () => {
      try {
        return await fn();
      } catch (err) {
        if (err instanceof Error)
          Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttribute("error", true);
        throw err;
      } finally {
        Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.end();
      }
    });
  }
  /**
   * Adds a span event describing a runtime exception, as advised in OpenTelemetry documentation
   * @param e error (exception) object
   */
  static recordException(e) {
    Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.recordException(e);
  }
  /**
   * Enable logging to OpenTelemetry. [[Tracing.withSpan]] will be enabled, all log entries will be attached to active span as span events.
   * [IModelHost.startup]($backend) will call this automatically if the `enableOpenTelemetry` option is enabled and it succeeds in requiring `@opentelemetry/api`.
   * @note Node.js OpenTelemetry SDK should be initialized by the user.
   */
  static enableOpenTelemetry(tracer, api) {
    Tracing._tracer = tracer;
    Tracing._openTelemetry = api;
    Logger.logTrace = Tracing.withOpenTelemetry(LogLevel.Trace, Logger.logTrace.bind(Logger)).bind(Logger);
    Logger.logInfo = Tracing.withOpenTelemetry(LogLevel.Info, Logger.logInfo.bind(Logger)).bind(Logger);
    Logger.logWarning = Tracing.withOpenTelemetry(LogLevel.Warning, Logger.logWarning.bind(Logger)).bind(Logger);
    Logger.logError = Tracing.withOpenTelemetry(LogLevel.Error, Logger.logError.bind(Logger)).bind(Logger);
  }
  static withOpenTelemetry(level, base, isError = false) {
    return (category, message, metaData) => {
      const oTelContext = Tracing._openTelemetry?.context.active();
      if (Tracing._openTelemetry === void 0 || oTelContext === void 0)
        return base(category, message, metaData);
      const serializedMetadata = Logger.getMetaData(metaData);
      if (Logger.isEnabled(category, level)) {
        try {
          Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.addEvent(message, {
            ...flattenObject(serializedMetadata),
            error: isError,
            loggerCategory: category
          });
        } catch {
        }
        const spanContext = Tracing._openTelemetry.trace.getSpan(oTelContext)?.spanContext();
        base(category, message, {
          ...serializedMetadata,
          /* eslint-disable @typescript-eslint/naming-convention */
          trace_id: spanContext?.traceId,
          span_id: spanContext?.spanId,
          trace_flags: spanContext?.traceFlags
          /* eslint-enable @typescript-eslint/naming-convention */
        });
      }
    };
  }
  /** Set attributes on currently active openTelemetry span. Doesn't do anything if openTelemetry logging is not initialized.
   * @param attributes The attributes to set
   */
  static setAttributes(attributes) {
    Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttributes(attributes);
  }
}
var DbChangeStage;
(function(DbChangeStage2) {
  DbChangeStage2[DbChangeStage2["Old"] = 0] = "Old";
  DbChangeStage2[DbChangeStage2["New"] = 1] = "New";
})(DbChangeStage || (DbChangeStage = {}));
var DbValueType;
(function(DbValueType2) {
  DbValueType2[DbValueType2["IntegerVal"] = 1] = "IntegerVal";
  DbValueType2[DbValueType2["FloatVal"] = 2] = "FloatVal";
  DbValueType2[DbValueType2["TextVal"] = 3] = "TextVal";
  DbValueType2[DbValueType2["BlobVal"] = 4] = "BlobVal";
  DbValueType2[DbValueType2["NullVal"] = 5] = "NullVal";
})(DbValueType || (DbValueType = {}));
var DbConflictCause;
(function(DbConflictCause2) {
  DbConflictCause2[DbConflictCause2["Data"] = 1] = "Data";
  DbConflictCause2[DbConflictCause2["NotFound"] = 2] = "NotFound";
  DbConflictCause2[DbConflictCause2["Conflict"] = 3] = "Conflict";
  DbConflictCause2[DbConflictCause2["Constraint"] = 4] = "Constraint";
  DbConflictCause2[DbConflictCause2["ForeignKey"] = 5] = "ForeignKey";
})(DbConflictCause || (DbConflictCause = {}));
var DbConflictResolution;
(function(DbConflictResolution2) {
  DbConflictResolution2[DbConflictResolution2["Skip"] = 0] = "Skip";
  DbConflictResolution2[DbConflictResolution2["Replace"] = 1] = "Replace";
  DbConflictResolution2[DbConflictResolution2["Abort"] = 2] = "Abort";
})(DbConflictResolution || (DbConflictResolution = {}));
var FunctionKey;
(function(FunctionKey2) {
  FunctionKey2["F1"] = "F1";
  FunctionKey2["F2"] = "F2";
  FunctionKey2["F3"] = "F3";
  FunctionKey2["F4"] = "F4";
  FunctionKey2["F5"] = "F5";
  FunctionKey2["F6"] = "F6";
  FunctionKey2["F7"] = "F7";
  FunctionKey2["F8"] = "F8";
  FunctionKey2["F9"] = "F9";
  FunctionKey2["F10"] = "F10";
  FunctionKey2["F11"] = "F11";
  FunctionKey2["F12"] = "F12";
})(FunctionKey || (FunctionKey = {}));
var SpecialKey;
(function(SpecialKey2) {
  SpecialKey2["Home"] = "Home";
  SpecialKey2["End"] = "End";
  SpecialKey2["PageUp"] = "PageUp";
  SpecialKey2["PageDown"] = "PageDown";
  SpecialKey2["Escape"] = "Escape";
  SpecialKey2["Delete"] = "Delete";
  SpecialKey2["Insert"] = "Insert";
  SpecialKey2["Tab"] = "Tab";
  SpecialKey2["ArrowLeft"] = "ArrowLeft";
  SpecialKey2["ArrowRight"] = "ArrowRight";
  SpecialKey2["ArrowUp"] = "ArrowUp";
  SpecialKey2["ArrowDown"] = "ArrowDown";
  SpecialKey2["Enter"] = "Enter";
  SpecialKey2["Return"] = "Enter";
  SpecialKey2["Space"] = " ";
  SpecialKey2["Backspace"] = "Backspace";
  SpecialKey2["Clear"] = "Clear";
  SpecialKey2["Divide"] = "Divide";
  SpecialKey2["Multiply"] = "Multiply";
  SpecialKey2["Subtract"] = "Subtract";
  SpecialKey2["Add"] = "Add";
  SpecialKey2["Decimal"] = "Decimal";
})(SpecialKey || (SpecialKey = {}));
function isArrowKey(key) {
  return key === SpecialKey.ArrowLeft || key === SpecialKey.ArrowRight || key === SpecialKey.ArrowUp || key === SpecialKey.ArrowDown;
}
class StandardContentLayouts {
  static singleView = {
    id: "uia:singleView",
    description: "Single Content View"
  };
  static fourQuadrants = {
    id: "uia:fourQuadrants",
    description: "Four Views, two stacked on the left, two stacked on the right",
    verticalSplit: {
      id: "uia:fourQuadrantVerticalSplit",
      percentage: 0.5,
      lock: false,
      minSizeLeft: 100,
      minSizeRight: 100,
      left: { horizontalSplit: { id: "uia:fourQuadrantsLeftHorizontal", percentage: 0.5, top: 0, bottom: 1, lock: false, minSizeTop: 50, minSizeBottom: 50 } },
      right: { horizontalSplit: { id: "uia:fourQuadrantsRightHorizontal", percentage: 0.5, top: 2, bottom: 3, lock: false, minSizeTop: 50, minSizeBottom: 50 } }
    }
  };
  static twoVerticalSplit = {
    id: "uia:twoVerticalSplit",
    description: "Two Views, side by side",
    verticalSplit: {
      id: "uia:twoViewsVerticalSplit",
      percentage: 0.5,
      left: 0,
      right: 1
    }
  };
  static twoHorizontalSplit = {
    id: "uia:twoHorizontalSplit",
    description: "Two views, stack one on top of the other",
    horizontalSplit: {
      id: "uia:twoViewsHorizontalSplit",
      percentage: 0.5,
      lock: false,
      top: 0,
      bottom: 1
    }
  };
  static threeViewsTwoOnLeft = {
    id: "uia:threeViewsTwoOnLeft",
    description: "Three views, one on the right with the two on the left stacked one of top of the other",
    verticalSplit: {
      id: "uia:twoViewsOnLeftSplit",
      percentage: 0.5,
      left: { horizontalSplit: { id: "uia:twoViewsOnLeftHorizontal", percentage: 0.5, top: 0, bottom: 1, lock: false, minSizeTop: 50, minSizeBottom: 50 } },
      right: 2
    }
  };
  static threeViewsTwoOnRight = {
    id: "uia:threeViewsTwoOnRight",
    description: "Three views, one on the left with the two on the right stacked one of top of the other",
    verticalSplit: {
      id: "uia:twoViewsOnRightSplit",
      percentage: 0.5,
      left: 0,
      right: { horizontalSplit: { id: "uia:twoViewsOnRightHorizontal", percentage: 0.5, top: 1, bottom: 2, lock: false, minSizeTop: 50, minSizeBottom: 50 } }
    }
  };
  static threeViewsTwoOnBottom = {
    id: "uia:threeViewsTwoOnBottom",
    description: "Three Views, one on top and two side by side on the bottom",
    horizontalSplit: {
      id: "uia:threeViewsTwoOnBottomHorizontal",
      percentage: 0.5,
      lock: false,
      top: 0,
      bottom: { verticalSplit: { id: "uia:twoViewsOnBottomVertical", percentage: 0.5, left: 1, right: 2, lock: false, minSizeLeft: 50, minSizeRight: 50 } }
    }
  };
  static threeViewsTwoOnTop = {
    id: "uia:threeViewsTwoOnTop",
    description: "Three Views, two side by side on top and one on the bottom",
    horizontalSplit: {
      id: "uia:twoViewsOnTopHorizontal",
      percentage: 0.5,
      lock: false,
      top: { verticalSplit: { id: "uia:twoViewsOnTopVertical", percentage: 0.5, left: 0, right: 1, lock: false, minSizeLeft: 50, minSizeRight: 50 } },
      bottom: 2
    }
  };
  // provides and iterable list of standard content layouts
  static availableLayouts = [
    StandardContentLayouts.singleView,
    StandardContentLayouts.fourQuadrants,
    StandardContentLayouts.twoVerticalSplit,
    StandardContentLayouts.twoHorizontalSplit,
    StandardContentLayouts.threeViewsTwoOnLeft,
    StandardContentLayouts.threeViewsTwoOnRight,
    StandardContentLayouts.threeViewsTwoOnBottom,
    StandardContentLayouts.threeViewsTwoOnTop
  ];
}
var AlternateDateFormats;
(function(AlternateDateFormats2) {
  AlternateDateFormats2[AlternateDateFormats2["None"] = 0] = "None";
  AlternateDateFormats2[AlternateDateFormats2["IsoShort"] = 1] = "IsoShort";
  AlternateDateFormats2[AlternateDateFormats2["IsoDateTime"] = 2] = "IsoDateTime";
  AlternateDateFormats2[AlternateDateFormats2["UtcShort"] = 3] = "UtcShort";
  AlternateDateFormats2[AlternateDateFormats2["UtcDateTime"] = 4] = "UtcDateTime";
  AlternateDateFormats2[AlternateDateFormats2["UtcShortWithDay"] = 5] = "UtcShortWithDay";
  AlternateDateFormats2[AlternateDateFormats2["UtcDateTimeWithDay"] = 6] = "UtcDateTimeWithDay";
})(AlternateDateFormats || (AlternateDateFormats = {}));
var TimeDisplay;
(function(TimeDisplay2) {
  TimeDisplay2["H12MC"] = "hh:mm aa";
  TimeDisplay2["H12MSC"] = "hh:mm:ss aa";
  TimeDisplay2["H24M"] = "hh:mm";
  TimeDisplay2["H24MS"] = "hh:mm:ss";
})(TimeDisplay || (TimeDisplay = {}));
var PropertyEditorParamTypes;
(function(PropertyEditorParamTypes2) {
  PropertyEditorParamTypes2["ButtonGroupData"] = "UiAbstract-ButtonGroupData";
  PropertyEditorParamTypes2["CheckBoxIcons"] = "UiAbstract-CheckBoxIcons";
  PropertyEditorParamTypes2["Icon"] = "UiAbstract-Icon";
  PropertyEditorParamTypes2["InputEditorSize"] = "UiAbstract-InputEditorSize";
  PropertyEditorParamTypes2["ColorData"] = "UiAbstract-ColorData";
  PropertyEditorParamTypes2["CustomFormattedNumber"] = "UiAbstract-CustomFormattedNumber";
  PropertyEditorParamTypes2["IconListData"] = "UiAbstract-IconListData";
  PropertyEditorParamTypes2["MultilineText"] = "UiAbstract-MultilineText";
  PropertyEditorParamTypes2["Range"] = "UiAbstract-Range";
  PropertyEditorParamTypes2["Slider"] = "UiAbstract-Slider";
  PropertyEditorParamTypes2["SuppressEditorLabel"] = "UiAbstract-SuppressEditorLabel";
  PropertyEditorParamTypes2["CheckBoxImages"] = "UiAbstract-CheckBoxImages";
})(PropertyEditorParamTypes || (PropertyEditorParamTypes = {}));
const isInputEditorSizeParams = (item) => {
  return item.type === PropertyEditorParamTypes.InputEditorSize;
};
const isColorEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.ColorData;
};
const isIconListEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.IconListData;
};
const isButtonGroupEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.ButtonGroupData;
};
const isSuppressLabelEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.SuppressEditorLabel;
};
const isCustomFormattedNumberParams = (item) => {
  return item.type === PropertyEditorParamTypes.CustomFormattedNumber;
};
var StandardTypeNames;
(function(StandardTypeNames2) {
  StandardTypeNames2["Text"] = "text";
  StandardTypeNames2["String"] = "string";
  StandardTypeNames2["DateTime"] = "dateTime";
  StandardTypeNames2["ShortDate"] = "shortdate";
  StandardTypeNames2["Boolean"] = "boolean";
  StandardTypeNames2["Bool"] = "bool";
  StandardTypeNames2["Float"] = "float";
  StandardTypeNames2["Double"] = "double";
  StandardTypeNames2["Int"] = "int";
  StandardTypeNames2["Integer"] = "integer";
  StandardTypeNames2["Number"] = "number";
  StandardTypeNames2["Hexadecimal"] = "hexadecimal";
  StandardTypeNames2["Hex"] = "hex";
  StandardTypeNames2["Enum"] = "enum";
  StandardTypeNames2["Point2d"] = "point2d";
  StandardTypeNames2["Point3d"] = "point3d";
  StandardTypeNames2["Navigation"] = "navigation";
  StandardTypeNames2["Composite"] = "composite";
  StandardTypeNames2["Array"] = "array";
  StandardTypeNames2["Struct"] = "struct";
  StandardTypeNames2["URL"] = "url";
})(StandardTypeNames || (StandardTypeNames = {}));
var PropertyValueFormat;
(function(PropertyValueFormat2) {
  PropertyValueFormat2[PropertyValueFormat2["Primitive"] = 0] = "Primitive";
  PropertyValueFormat2[PropertyValueFormat2["Array"] = 1] = "Array";
  PropertyValueFormat2[PropertyValueFormat2["Struct"] = 2] = "Struct";
})(PropertyValueFormat || (PropertyValueFormat = {}));
class PropertyRecord {
  /** Value for the property */
  value;
  /** The property description containing metadata for the property */
  property;
  /** Description for the property */
  description;
  /** Indicates if the property is read-only */
  isReadonly;
  /** Indicates if the property is disabled */
  isDisabled;
  /** Indicates if the property record represents merged properties */
  isMerged;
  /** Indicates if the property should be automatically expanded */
  autoExpand;
  /** Map containing any additional data */
  extendedData;
  /** Properties for link logic */
  links;
  /** Constructs a PropertyRecord instance */
  constructor(value, property) {
    this.value = value;
    this.property = property;
  }
  /** Creates a copy of this PropertyRecord with a new value and optionally a new PropertyDescription */
  copyWithNewValue(newValue, newDescription) {
    const rec = new PropertyRecord(newValue, newDescription ? newDescription : this.property);
    assignMemberIfExists(rec, this, "description");
    assignMemberIfExists(rec, this, "isReadonly");
    assignMemberIfExists(rec, this, "isDisabled");
    assignMemberIfExists(rec, this, "isMerged");
    assignMemberIfExists(rec, this, "autoExpand");
    assignMemberIfExists(rec, this, "extendedData");
    assignMemberIfExists(rec, this, "links");
    return rec;
  }
  /** Gets this property record value children records */
  getChildrenRecords() {
    switch (this.value.valueFormat) {
      case PropertyValueFormat.Primitive:
        return [];
      case PropertyValueFormat.Struct:
        return Object.values(this.value.members);
      case PropertyValueFormat.Array:
        return this.value.items;
    }
  }
  /** Creates a PropertyRecord based on a value string and an optional property description or name */
  static fromString(value, descriptionOrName) {
    let description;
    if (descriptionOrName && typeof descriptionOrName === "object") {
      description = descriptionOrName;
    } else if (descriptionOrName && typeof descriptionOrName === "string") {
      description = {
        name: descriptionOrName,
        displayLabel: descriptionOrName,
        typename: StandardTypeNames.String
      };
    } else {
      description = {
        name: "string_value",
        displayLabel: "String Value",
        typename: StandardTypeNames.String
      };
    }
    return new PropertyRecord({
      valueFormat: PropertyValueFormat.Primitive,
      value,
      displayValue: value
    }, description);
  }
}
function assignMemberIfExists(target, source, memberName) {
  if (source.hasOwnProperty(memberName))
    target[memberName] = source[memberName];
}
class SyncPropertiesChangeEvent extends BeUiEvent {
}
class UiDataProvider {
  /** Called by UI to inform data provider of changes. */
  processChangesInUi(_properties) {
    throw new Error("Derived UiDataProvider must implement this method to apply changes to a bulk set of properties.");
  }
  /** Get Sync UI Control Properties Event */
  onSyncPropertiesChangeEvent = new SyncPropertiesChangeEvent();
  onItemsReloadedEvent = new BeUiEvent();
  /** Called by UI to validate a property value */
  validateProperty(_item) {
    return { status: PropertyChangeStatus.Success };
  }
  /** Called to sync properties synchronously if a UiDataProvider is active for the UI */
  syncProperties(syncProperties) {
    this.fireSyncPropertiesEvent(syncProperties);
  }
  /** Called to inform listener that the UiDataProvider has updated values for the UI */
  fireSyncPropertiesEvent(syncProperties) {
    this.onSyncPropertiesChangeEvent.emit({ properties: syncProperties });
  }
  /** Called to inform listeners that new properties are ready for display in UI.
   */
  fireItemsReloadedEvent() {
    this.onItemsReloadedEvent.emit();
  }
  /** Used to pass properties between a tool and an explicity defined UI dialog. See method supplyDialogItems in [[UiLayoutDataProvider]] for supplying
   * properties that will be used to dynamically create and layout control in a Dialog or Widget.
   */
  supplyAvailableProperties() {
    throw new Error("Derived UiDataProvider that want to use DialogPropertyItems must implement this method. Not for use with dynamic UI controls.");
  }
}
var PropertyChangeStatus;
(function(PropertyChangeStatus2) {
  PropertyChangeStatus2[PropertyChangeStatus2["Success"] = 0] = "Success";
  PropertyChangeStatus2[PropertyChangeStatus2["Error"] = 2] = "Error";
})(PropertyChangeStatus || (PropertyChangeStatus = {}));
var DialogButtonType;
(function(DialogButtonType2) {
  DialogButtonType2["None"] = "";
  DialogButtonType2["Close"] = "close";
  DialogButtonType2["OK"] = "ok";
  DialogButtonType2["Cancel"] = "cancel";
  DialogButtonType2["Yes"] = "yes";
  DialogButtonType2["No"] = "no";
  DialogButtonType2["Retry"] = "retry";
  DialogButtonType2["Next"] = "next";
  DialogButtonType2["Previous"] = "previous";
})(DialogButtonType || (DialogButtonType = {}));
var DialogButtonStyle;
(function(DialogButtonStyle2) {
  DialogButtonStyle2["None"] = "";
  DialogButtonStyle2["Primary"] = "iui-cta";
  DialogButtonStyle2["Hollow"] = "iui-default";
  DialogButtonStyle2["Blue"] = "iui-high-visibility";
})(DialogButtonStyle || (DialogButtonStyle = {}));
class UiLayoutDataProvider extends UiDataProvider {
  _items;
  /** Applies changes from one or more properties - some dialogs will use this to send a bulk set of changes back to the provider */
  processChangesInUi(properties) {
    properties.forEach((property) => this.applyUiPropertyChange(property));
    return { status: PropertyChangeStatus.Success };
  }
  /** Applies change of a single property - this is the default method used when property editors are dynamically generated. */
  // istanbul ignore next
  applyUiPropertyChange = (_updatedValue) => {
    throw new Error("Derived UiDataProvider should implement this to apply change to a single property.");
  };
  _rows;
  /** Array of dialog rows */
  get rows() {
    if (!this._rows) {
      this._rows = this.layoutDialogRows();
    }
    return this._rows;
  }
  loadItemsInternal(items) {
    this._items = items ? items : [];
    this._rows = this.layoutDialogRows();
  }
  /** Called by UI to request available properties that can be bound to user supplied UI components (See Tool1UiProvider for example). */
  // istanbul ignore next
  supplyDialogItems() {
    throw new Error("Derived UiDataProvider must implement this method to supply set of properties.");
  }
  get items() {
    if (void 0 === this._items) {
      this.loadItemsInternal(this.supplyDialogItems());
    }
    return this._items;
  }
  /** Called to inform listeners that new properties are ready for display in UI. */
  reloadDialogItems(emitEvent = true) {
    this.loadItemsInternal(this.supplyDialogItems());
    if (emitEvent)
      this.fireItemsReloadedEvent();
  }
  /**
   * @internal
   */
  layoutDialogRows() {
    const rows = [];
    this.items.forEach((item) => {
      const row = rows.find((value) => value.priority === item.editorPosition.rowPriority);
      if (row) {
        row.items.push(item);
      } else {
        rows.push({ priority: item.editorPosition.rowPriority, items: [item] });
      }
    });
    rows.sort((a, b) => a.priority - b.priority);
    rows.forEach((row) => row.items.sort((a, b) => a.editorPosition.columnIndex - b.editorPosition.columnIndex));
    return rows;
  }
  /** Determines if a dialog item editor wants a label */
  static editorWantsLabel(item) {
    if (item.property.editor && item.property.editor.params) {
      const params = item.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.SuppressEditorLabel);
      if (params)
        return false;
    }
    return true;
  }
  /** Determines if a dialog items has an associated lock property */
  static hasAssociatedLockProperty(item) {
    return !!item.lockProperty;
  }
  /** Gets the disabled state for a given dialog item */
  static getItemDisabledState(baseDialogItem) {
    const dialogItem = baseDialogItem;
    if (dialogItem === void 0 || dialogItem.lockProperty === void 0)
      return !!baseDialogItem.isDisabled;
    const value = dialogItem.lockProperty.value;
    if (value === void 0)
      return !!baseDialogItem.isDisabled;
    return !value.value;
  }
  /** Gets a property record for a given dialog item */
  static getPropertyRecord = (dialogItem) => {
    const propertyValue = { valueFormat: PropertyValueFormat.Primitive, value: dialogItem.value.value, displayValue: dialogItem.value.displayValue };
    const record = new PropertyRecord(propertyValue, dialogItem.property);
    record.isDisabled = UiLayoutDataProvider.getItemDisabledState(dialogItem);
    return record;
  };
  /** Determines if a dialog row only contains button group editors */
  static onlyContainButtonGroupEditors(row) {
    for (const item of row.items) {
      if (UiLayoutDataProvider.hasAssociatedLockProperty(item) || void 0 === item.property.editor || "enum-buttongroup" !== item.property.editor.name || UiLayoutDataProvider.editorWantsLabel(item))
        return false;
    }
    return true;
  }
}
class DialogLayoutDataProvider extends UiLayoutDataProvider {
  onButtonsReloadedEvent = new BeUiEvent();
  /** Called to inform listeners that modal dialog button data needs to be refreshed. */
  fireDialogButtonsReloadEvent() {
    this.onButtonsReloadedEvent.emit();
  }
  supplyButtonData() {
    const buttons = [];
    buttons.push({ type: DialogButtonType.OK, onClick: () => {
    } });
    buttons.push({ type: DialogButtonType.Cancel, onClick: () => {
    } });
    return buttons;
  }
}
var BadgeType;
(function(BadgeType2) {
  BadgeType2[BadgeType2["None"] = 0] = "None";
  BadgeType2[BadgeType2["TechnicalPreview"] = 1] = "TechnicalPreview";
  BadgeType2[BadgeType2["New"] = 2] = "New";
})(BadgeType || (BadgeType = {}));
var RelativePosition;
(function(RelativePosition2) {
  RelativePosition2[RelativePosition2["Left"] = 0] = "Left";
  RelativePosition2[RelativePosition2["Top"] = 1] = "Top";
  RelativePosition2[RelativePosition2["Right"] = 2] = "Right";
  RelativePosition2[RelativePosition2["Bottom"] = 3] = "Bottom";
  RelativePosition2[RelativePosition2["TopLeft"] = 4] = "TopLeft";
  RelativePosition2[RelativePosition2["TopRight"] = 5] = "TopRight";
  RelativePosition2[RelativePosition2["BottomLeft"] = 6] = "BottomLeft";
  RelativePosition2[RelativePosition2["BottomRight"] = 7] = "BottomRight";
  RelativePosition2[RelativePosition2["RightTop"] = 8] = "RightTop";
  RelativePosition2[RelativePosition2["LeftTop"] = 9] = "LeftTop";
})(RelativePosition || (RelativePosition = {}));
var DisplayMessageType;
(function(DisplayMessageType2) {
  DisplayMessageType2[DisplayMessageType2["Toast"] = 0] = "Toast";
  DisplayMessageType2[DisplayMessageType2["Sticky"] = 2] = "Sticky";
  DisplayMessageType2[DisplayMessageType2["InputField"] = 3] = "InputField";
  DisplayMessageType2[DisplayMessageType2["Alert"] = 4] = "Alert";
})(DisplayMessageType || (DisplayMessageType = {}));
var MessageSeverity;
(function(MessageSeverity2) {
  MessageSeverity2[MessageSeverity2["None"] = 0] = "None";
  MessageSeverity2[MessageSeverity2["Information"] = 1] = "Information";
  MessageSeverity2[MessageSeverity2["Question"] = 2] = "Question";
  MessageSeverity2[MessageSeverity2["Warning"] = 3] = "Warning";
  MessageSeverity2[MessageSeverity2["Error"] = 4] = "Error";
  MessageSeverity2[MessageSeverity2["Fatal"] = 5] = "Fatal";
  MessageSeverity2[MessageSeverity2["Success"] = 6] = "Success";
})(MessageSeverity || (MessageSeverity = {}));
var StandardEditorNames;
(function(StandardEditorNames2) {
  StandardEditorNames2["ColorPicker"] = "color-picker";
  StandardEditorNames2["LongDate"] = "long-date-picker";
  StandardEditorNames2["ShortDate"] = "short-date-picker";
  StandardEditorNames2["EnumButtonGroup"] = "enum-buttongroup";
  StandardEditorNames2["IconPicker"] = "icon-picker";
  StandardEditorNames2["MultiLine"] = "multi-line";
  StandardEditorNames2["NumberCustom"] = "number-custom";
  StandardEditorNames2["NumericInput"] = "numeric-input";
  StandardEditorNames2["Slider"] = "slider";
  StandardEditorNames2["Toggle"] = "toggle";
  StandardEditorNames2["WeightPicker"] = "weight-picker";
  StandardEditorNames2["ImageCheckBox"] = "image-check-box";
  StandardEditorNames2["ThemedEnum"] = "themed-enum";
})(StandardEditorNames || (StandardEditorNames = {}));
var CharCode;
(function(CharCode2) {
  CharCode2[CharCode2["Space"] = 32] = "Space";
  CharCode2[CharCode2["Tab"] = 9] = "Tab";
  CharCode2[CharCode2["LineFeed"] = 10] = "LineFeed";
  CharCode2[CharCode2["CarriageReturn"] = 13] = "CarriageReturn";
})(CharCode || (CharCode = {}));
function isWhitespace(code) {
  return code === CharCode.Space || code === CharCode.Tab || code === CharCode.LineFeed || code === CharCode.CarriageReturn;
}
const wordSeparators = /* @__PURE__ */ new Set();
"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?".split("").forEach((s) => wordSeparators.add(s.charCodeAt(0)));
function isWordSeparator(code) {
  return isWhitespace(code) || wordSeparators.has(code);
}
function charactersMatch(codeA, codeB) {
  return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}
function join(head, tail) {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }
  return tail;
}
function matchesWords(word, target, contiguous = false) {
  if (!target || target.length === 0) {
    return null;
  }
  let result = null;
  let i = 0;
  word = word.toLowerCase();
  target = target.toLowerCase();
  while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) {
    i = nextWord(target, i + 1);
  }
  return result;
}
function _matchesWords(word, target, i, j, contiguous) {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    let result = null;
    let nextWordIndex = j + 1;
    result = _matchesWords(word, target, i + 1, j + 1, contiguous);
    if (!contiguous) {
      while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
        result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
        nextWordIndex++;
      }
    }
    return result === null ? null : join({ start: j, end: j + 1 }, result);
  }
}
function nextWord(word, start) {
  for (let i = start; i < word.length; i++) {
    if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) {
      return i;
    }
  }
  return word.length;
}
var Key_enum = {};
var hasRequiredKey_enum;
function requireKey_enum() {
  if (hasRequiredKey_enum) return Key_enum;
  hasRequiredKey_enum = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    (function(Key) {
      Key["Unidentified"] = "Unidentified";
      Key["Alt"] = "Alt";
      Key["AltGraph"] = "AltGraph";
      Key["CapsLock"] = "CapsLock";
      Key["Control"] = "Control";
      Key["Fn"] = "Fn";
      Key["FnLock"] = "FnLock";
      Key["Hyper"] = "Hyper";
      Key["Meta"] = "Meta";
      Key["NumLock"] = "NumLock";
      Key["ScrollLock"] = "ScrollLock";
      Key["Shift"] = "Shift";
      Key["Super"] = "Super";
      Key["Symbol"] = "Symbol";
      Key["SymbolLock"] = "SymbolLock";
      Key["Enter"] = "Enter";
      Key["Tab"] = "Tab";
      Key["ArrowDown"] = "ArrowDown";
      Key["ArrowLeft"] = "ArrowLeft";
      Key["ArrowRight"] = "ArrowRight";
      Key["ArrowUp"] = "ArrowUp";
      Key["End"] = "End";
      Key["Home"] = "Home";
      Key["PageDown"] = "PageDown";
      Key["PageUp"] = "PageUp";
      Key["Backspace"] = "Backspace";
      Key["Clear"] = "Clear";
      Key["Copy"] = "Copy";
      Key["CrSel"] = "CrSel";
      Key["Cut"] = "Cut";
      Key["Delete"] = "Delete";
      Key["EraseEof"] = "EraseEof";
      Key["ExSel"] = "ExSel";
      Key["Insert"] = "Insert";
      Key["Paste"] = "Paste";
      Key["Redo"] = "Redo";
      Key["Undo"] = "Undo";
      Key["Accept"] = "Accept";
      Key["Again"] = "Again";
      Key["Attn"] = "Attn";
      Key["Cancel"] = "Cancel";
      Key["ContextMenu"] = "ContextMenu";
      Key["Escape"] = "Escape";
      Key["Execute"] = "Execute";
      Key["Find"] = "Find";
      Key["Finish"] = "Finish";
      Key["Help"] = "Help";
      Key["Pause"] = "Pause";
      Key["Play"] = "Play";
      Key["Props"] = "Props";
      Key["Select"] = "Select";
      Key["ZoomIn"] = "ZoomIn";
      Key["ZoomOut"] = "ZoomOut";
      Key["BrightnessDown"] = "BrightnessDown";
      Key["BrightnessUp"] = "BrightnessUp";
      Key["Eject"] = "Eject";
      Key["LogOff"] = "LogOff";
      Key["Power"] = "Power";
      Key["PowerOff"] = "PowerOff";
      Key["PrintScreen"] = "PrintScreen";
      Key["Hibernate"] = "Hibernate";
      Key["Standby"] = "Standby";
      Key["WakeUp"] = "WakeUp";
      Key["AllCandidates"] = "AllCandidates";
      Key["Alphanumeric"] = "Alphanumeric";
      Key["CodeInput"] = "CodeInput";
      Key["Compose"] = "Compose";
      Key["Convert"] = "Convert";
      Key["Dead"] = "Dead";
      Key["FinalMode"] = "FinalMode";
      Key["GroupFirst"] = "GroupFirst";
      Key["GroupLast"] = "GroupLast";
      Key["GroupNext"] = "GroupNext";
      Key["GroupPrevious"] = "GroupPrevious";
      Key["ModeChange"] = "ModeChange";
      Key["NextCandidate"] = "NextCandidate";
      Key["NonConvert"] = "NonConvert";
      Key["PreviousCandidate"] = "PreviousCandidate";
      Key["Process"] = "Process";
      Key["SingleCandidate"] = "SingleCandidate";
      Key["HangulMode"] = "HangulMode";
      Key["HanjaMode"] = "HanjaMode";
      Key["JunjaMode"] = "JunjaMode";
      Key["Eisu"] = "Eisu";
      Key["Hankaku"] = "Hankaku";
      Key["Hiragana"] = "Hiragana";
      Key["HiraganaKatakana"] = "HiraganaKatakana";
      Key["KanaMode"] = "KanaMode";
      Key["KanjiMode"] = "KanjiMode";
      Key["Katakana"] = "Katakana";
      Key["Romaji"] = "Romaji";
      Key["Zenkaku"] = "Zenkaku";
      Key["ZenkakuHanaku"] = "ZenkakuHanaku";
      Key["F1"] = "F1";
      Key["F2"] = "F2";
      Key["F3"] = "F3";
      Key["F4"] = "F4";
      Key["F5"] = "F5";
      Key["F6"] = "F6";
      Key["F7"] = "F7";
      Key["F8"] = "F8";
      Key["F9"] = "F9";
      Key["F10"] = "F10";
      Key["F11"] = "F11";
      Key["F12"] = "F12";
      Key["F13"] = "F13";
      Key["F14"] = "F14";
      Key["F15"] = "F15";
      Key["F16"] = "F16";
      Key["F17"] = "F17";
      Key["F18"] = "F18";
      Key["F19"] = "F19";
      Key["F20"] = "F20";
      Key["Soft1"] = "Soft1";
      Key["Soft2"] = "Soft2";
      Key["Soft3"] = "Soft3";
      Key["Soft4"] = "Soft4";
      Key["AppSwitch"] = "AppSwitch";
      Key["Call"] = "Call";
      Key["Camera"] = "Camera";
      Key["CameraFocus"] = "CameraFocus";
      Key["EndCall"] = "EndCall";
      Key["GoBack"] = "GoBack";
      Key["GoHome"] = "GoHome";
      Key["HeadsetHook"] = "HeadsetHook";
      Key["LastNumberRedial"] = "LastNumberRedial";
      Key["Notification"] = "Notification";
      Key["MannerMode"] = "MannerMode";
      Key["VoiceDial"] = "VoiceDial";
      Key["ChannelDown"] = "ChannelDown";
      Key["ChannelUp"] = "ChannelUp";
      Key["MediaFastForward"] = "MediaFastForward";
      Key["MediaPause"] = "MediaPause";
      Key["MediaPlay"] = "MediaPlay";
      Key["MediaPlayPause"] = "MediaPlayPause";
      Key["MediaRecord"] = "MediaRecord";
      Key["MediaRewind"] = "MediaRewind";
      Key["MediaStop"] = "MediaStop";
      Key["MediaTrackNext"] = "MediaTrackNext";
      Key["MediaTrackPrevious"] = "MediaTrackPrevious";
      Key["AudioBalanceLeft"] = "AudioBalanceLeft";
      Key["AudioBalanceRight"] = "AudioBalanceRight";
      Key["AudioBassDown"] = "AudioBassDown";
      Key["AudioBassBoostDown"] = "AudioBassBoostDown";
      Key["AudioBassBoostToggle"] = "AudioBassBoostToggle";
      Key["AudioBassBoostUp"] = "AudioBassBoostUp";
      Key["AudioBassUp"] = "AudioBassUp";
      Key["AudioFaderFront"] = "AudioFaderFront";
      Key["AudioFaderRear"] = "AudioFaderRear";
      Key["AudioSurroundModeNext"] = "AudioSurroundModeNext";
      Key["AudioTrebleDown"] = "AudioTrebleDown";
      Key["AudioTrebleUp"] = "AudioTrebleUp";
      Key["AudioVolumeDown"] = "AudioVolumeDown";
      Key["AudioVolumeMute"] = "AudioVolumeMute";
      Key["AudioVolumeUp"] = "AudioVolumeUp";
      Key["MicrophoneToggle"] = "MicrophoneToggle";
      Key["MicrophoneVolumeDown"] = "MicrophoneVolumeDown";
      Key["MicrophoneVolumeMute"] = "MicrophoneVolumeMute";
      Key["MicrophoneVolumeUp"] = "MicrophoneVolumeUp";
      Key["TV"] = "TV";
      Key["TV3DMode"] = "TV3DMode";
      Key["TVAntennaCable"] = "TVAntennaCable";
      Key["TVAudioDescription"] = "TVAudioDescription";
      Key["TVAudioDescriptionMixDown"] = "TVAudioDescriptionMixDown";
      Key["TVAudioDescriptionMixUp"] = "TVAudioDescriptionMixUp";
      Key["TVContentsMenu"] = "TVContentsMenu";
      Key["TVDataService"] = "TVDataService";
      Key["TVInput"] = "TVInput";
      Key["TVInputComponent1"] = "TVInputComponent1";
      Key["TVInputComponent2"] = "TVInputComponent2";
      Key["TVInputComposite1"] = "TVInputComposite1";
      Key["TVInputComposite2"] = "TVInputComposite2";
      Key["TVInputHDMI1"] = "TVInputHDMI1";
      Key["TVInputHDMI2"] = "TVInputHDMI2";
      Key["TVInputHDMI3"] = "TVInputHDMI3";
      Key["TVInputHDMI4"] = "TVInputHDMI4";
      Key["TVInputVGA1"] = "TVInputVGA1";
      Key["TVMediaContext"] = "TVMediaContext";
      Key["TVNetwork"] = "TVNetwork";
      Key["TVNumberEntry"] = "TVNumberEntry";
      Key["TVPower"] = "TVPower";
      Key["TVRadioService"] = "TVRadioService";
      Key["TVSatellite"] = "TVSatellite";
      Key["TVSatelliteBS"] = "TVSatelliteBS";
      Key["TVSatelliteCS"] = "TVSatelliteCS";
      Key["TVSatelliteToggle"] = "TVSatelliteToggle";
      Key["TVTerrestrialAnalog"] = "TVTerrestrialAnalog";
      Key["TVTerrestrialDigital"] = "TVTerrestrialDigital";
      Key["TVTimer"] = "TVTimer";
      Key["AVRInput"] = "AVRInput";
      Key["AVRPower"] = "AVRPower";
      Key["ColorF0Red"] = "ColorF0Red";
      Key["ColorF1Green"] = "ColorF1Green";
      Key["ColorF2Yellow"] = "ColorF2Yellow";
      Key["ColorF3Blue"] = "ColorF3Blue";
      Key["ColorF4Grey"] = "ColorF4Grey";
      Key["ColorF5Brown"] = "ColorF5Brown";
      Key["ClosedCaptionToggle"] = "ClosedCaptionToggle";
      Key["Dimmer"] = "Dimmer";
      Key["DisplaySwap"] = "DisplaySwap";
      Key["DVR"] = "DVR";
      Key["Exit"] = "Exit";
      Key["FavoriteClear0"] = "FavoriteClear0";
      Key["FavoriteClear1"] = "FavoriteClear1";
      Key["FavoriteClear2"] = "FavoriteClear2";
      Key["FavoriteClear3"] = "FavoriteClear3";
      Key["FavoriteRecall0"] = "FavoriteRecall0";
      Key["FavoriteRecall1"] = "FavoriteRecall1";
      Key["FavoriteRecall2"] = "FavoriteRecall2";
      Key["FavoriteRecall3"] = "FavoriteRecall3";
      Key["FavoriteStore0"] = "FavoriteStore0";
      Key["FavoriteStore1"] = "FavoriteStore1";
      Key["FavoriteStore2"] = "FavoriteStore2";
      Key["FavoriteStore3"] = "FavoriteStore3";
      Key["Guide"] = "Guide";
      Key["GuideNextDay"] = "GuideNextDay";
      Key["GuidePreviousDay"] = "GuidePreviousDay";
      Key["Info"] = "Info";
      Key["InstantReplay"] = "InstantReplay";
      Key["Link"] = "Link";
      Key["ListProgram"] = "ListProgram";
      Key["LiveContent"] = "LiveContent";
      Key["Lock"] = "Lock";
      Key["MediaApps"] = "MediaApps";
      Key["MediaAudioTrack"] = "MediaAudioTrack";
      Key["MediaLast"] = "MediaLast";
      Key["MediaSkipBackward"] = "MediaSkipBackward";
      Key["MediaSkipForward"] = "MediaSkipForward";
      Key["MediaStepBackward"] = "MediaStepBackward";
      Key["MediaStepForward"] = "MediaStepForward";
      Key["MediaTopMenu"] = "MediaTopMenu";
      Key["NavigateIn"] = "NavigateIn";
      Key["NavigateNext"] = "NavigateNext";
      Key["NavigateOut"] = "NavigateOut";
      Key["NavigatePrevious"] = "NavigatePrevious";
      Key["NextFavoriteChannel"] = "NextFavoriteChannel";
      Key["NextUserProfile"] = "NextUserProfile";
      Key["OnDemand"] = "OnDemand";
      Key["Pairing"] = "Pairing";
      Key["PinPDown"] = "PinPDown";
      Key["PinPMove"] = "PinPMove";
      Key["PinPToggle"] = "PinPToggle";
      Key["PinPUp"] = "PinPUp";
      Key["PlaySpeedDown"] = "PlaySpeedDown";
      Key["PlaySpeedReset"] = "PlaySpeedReset";
      Key["PlaySpeedUp"] = "PlaySpeedUp";
      Key["RandomToggle"] = "RandomToggle";
      Key["RcLowBattery"] = "RcLowBattery";
      Key["RecordSpeedNext"] = "RecordSpeedNext";
      Key["RfBypass"] = "RfBypass";
      Key["ScanChannelsToggle"] = "ScanChannelsToggle";
      Key["ScreenModeNext"] = "ScreenModeNext";
      Key["Settings"] = "Settings";
      Key["SplitScreenToggle"] = "SplitScreenToggle";
      Key["STBInput"] = "STBInput";
      Key["STBPower"] = "STBPower";
      Key["Subtitle"] = "Subtitle";
      Key["Teletext"] = "Teletext";
      Key["VideoModeNext"] = "VideoModeNext";
      Key["Wink"] = "Wink";
      Key["ZoomToggle"] = "ZoomToggle";
      Key["SpeechCorrectionList"] = "SpeechCorrectionList";
      Key["SpeechInputToggle"] = "SpeechInputToggle";
      Key["Close"] = "Close";
      Key["New"] = "New";
      Key["Open"] = "Open";
      Key["Print"] = "Print";
      Key["Save"] = "Save";
      Key["SpellCheck"] = "SpellCheck";
      Key["MailForward"] = "MailForward";
      Key["MailReply"] = "MailReply";
      Key["MailSend"] = "MailSend";
      Key["LaunchCalculator"] = "LaunchCalculator";
      Key["LaunchCalendar"] = "LaunchCalendar";
      Key["LaunchContacts"] = "LaunchContacts";
      Key["LaunchMail"] = "LaunchMail";
      Key["LaunchMediaPlayer"] = "LaunchMediaPlayer";
      Key["LaunchMusicPlayer"] = "LaunchMusicPlayer";
      Key["LaunchMyComputer"] = "LaunchMyComputer";
      Key["LaunchPhone"] = "LaunchPhone";
      Key["LaunchScreenSaver"] = "LaunchScreenSaver";
      Key["LaunchSpreadsheet"] = "LaunchSpreadsheet";
      Key["LaunchWebBrowser"] = "LaunchWebBrowser";
      Key["LaunchWebCam"] = "LaunchWebCam";
      Key["LaunchWordProcessor"] = "LaunchWordProcessor";
      Key["LaunchApplication1"] = "LaunchApplication1";
      Key["LaunchApplication2"] = "LaunchApplication2";
      Key["LaunchApplication3"] = "LaunchApplication3";
      Key["LaunchApplication4"] = "LaunchApplication4";
      Key["LaunchApplication5"] = "LaunchApplication5";
      Key["LaunchApplication6"] = "LaunchApplication6";
      Key["LaunchApplication7"] = "LaunchApplication7";
      Key["LaunchApplication8"] = "LaunchApplication8";
      Key["LaunchApplication9"] = "LaunchApplication9";
      Key["LaunchApplication10"] = "LaunchApplication10";
      Key["LaunchApplication11"] = "LaunchApplication11";
      Key["LaunchApplication12"] = "LaunchApplication12";
      Key["LaunchApplication13"] = "LaunchApplication13";
      Key["LaunchApplication14"] = "LaunchApplication14";
      Key["LaunchApplication15"] = "LaunchApplication15";
      Key["LaunchApplication16"] = "LaunchApplication16";
      Key["BrowserBack"] = "BrowserBack";
      Key["BrowserFavorites"] = "BrowserFavorites";
      Key["BrowserForward"] = "BrowserForward";
      Key["BrowserHome"] = "BrowserHome";
      Key["BrowserRefresh"] = "BrowserRefresh";
      Key["BrowserSearch"] = "BrowserSearch";
      Key["BrowserStop"] = "BrowserStop";
      Key["Decimal"] = "Decimal";
      Key["Key11"] = "Key11";
      Key["Key12"] = "Key12";
      Key["Multiply"] = "Multiply";
      Key["Add"] = "Add";
      Key["Divide"] = "Divide";
      Key["Subtract"] = "Subtract";
      Key["Separator"] = "Separator";
    })(exports.Key || (exports.Key = {}));
  })(Key_enum);
  return Key_enum;
}
var Key_enumExports = requireKey_enum();
export {
  SortedArray as $,
  GeoServiceStatus as A,
  Button as B,
  ChangeSetStatus as C,
  DialogLayoutDataProvider as D,
  ErrorCategory as E,
  IModelStatus as F,
  Guid as G,
  HttpStatus as H,
  IModelHubStatus as I,
  ITwinError as J,
  Key_enumExports as K,
  Logger as L,
  Id64 as M,
  JsonUtils as N,
  LogLevel as O,
  PropertyChangeStatus as P,
  MutableCompressedId64Set as Q,
  RelativePosition as R,
  StandardTypeNames as S,
  OpenMode as T,
  OrderedId64Array as U,
  OrderedId64Iterable as V,
  PerfLogger as W,
  ReadonlySortedArray as X,
  RealityDataStatus as Y,
  RepositoryStatus as Z,
  RpcInterfaceStatus as _,
  BeEvent as a,
  SpanKind as a0,
  StatusCategory as a1,
  SuccessCategory as a2,
  Tracing as a3,
  TransientIdSequence as a4,
  UnexpectedErrors as a5,
  dispose as a6,
  disposeArray as a7,
  isDisposable as a8,
  isIDisposable as a9,
  lowerBound as aa,
  shallowClone as ab,
  using as ac,
  useFocusableElements as ad,
  useEventListener as ae,
  AlternateDateFormats as af,
  DialogButtonStyle as ag,
  DisplayMessageType as ah,
  FunctionKey as ai,
  MessageSeverity as aj,
  SpecialKey as ak,
  SyncPropertiesChangeEvent as al,
  TimeDisplay as am,
  UiDataProvider as an,
  UiLayoutDataProvider as ao,
  isArrowKey as ap,
  isButtonGroupEditorParams as aq,
  isColorEditorParams as ar,
  isCustomFormattedNumberParams as as,
  isIconListEditorParams as at,
  isInputEditorSizeParams as au,
  isSuppressLabelEditorParams as av,
  matchesWords as aw,
  DialogButtonType as b,
  Dialog$1 as c,
  ProgressRadial as d,
  PropertyEditorParamTypes as e,
  StandardEditorNames as f,
  PropertyValueFormat as g,
  BeUiEvent as h,
  assert as i,
  StandardContentLayouts as j,
  BadgeType as k,
  BentleyError as l,
  BentleyStatus as m,
  PropertyRecord as n,
  BeEventList as o,
  BentleyLoggerCategory as p,
  BriefcaseStatus as q,
  CompressedId64Set as r,
  DbChangeStage as s,
  DbConflictCause as t,
  DbConflictResolution as u,
  DbOpcode as v,
  DbResult as w,
  DbValueType as x,
  DisposableList as y,
  DuplicatePolicy as z
};
