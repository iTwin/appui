import { r as reactExports, p as polymorphic, u as useControlledState, a as useSafeContext, B as Box, c as classnames, b as useIsomorphicLayoutEffect, d as useLatestRef, m as mergeEventHandlers, e as useMergedRefs, f as ButtonBase, g as useIsClient, h as useId } from "./iframe-MZ9GDAUV.js";
import { l as Icon, u as useContainerWidth } from "./appui-react-CxqBCL1K.js";
let TabsWrapper = reactExports.forwardRef((props, ref) => {
  let {
    children,
    orientation = "horizontal",
    type = "default",
    focusActivationMode = "auto",
    color = "blue",
    defaultValue,
    value: activeValueProp,
    onValueChange,
    ...rest
  } = props;
  let [activeValue, setActiveValue] = useControlledState(
    defaultValue,
    activeValueProp,
    onValueChange
  );
  let [stripeProperties, setStripeProperties] = reactExports.useState({});
  let [hasSublabel, setHasSublabel] = reactExports.useState(false);
  let idPrefix = useId();
  return reactExports.createElement(
    TabsWrapperPresentation,
    {
      ...rest,
      orientation,
      style: {
        ...stripeProperties,
        ...props?.style
      },
      ref
    },
    reactExports.createElement(
      TabsContext.Provider,
      {
        value: {
          orientation,
          type,
          activeValue,
          setActiveValue,
          setStripeProperties,
          idPrefix,
          focusActivationMode,
          hasSublabel,
          setHasSublabel,
          color
        }
      },
      children
    )
  );
});
let TabsWrapperPresentation = reactExports.forwardRef((props, forwardedRef) => {
  let { orientation = "horizontal", ...rest } = props;
  return reactExports.createElement(Box, {
    ...rest,
    className: classnames("iui-tabs-wrapper", `iui-${orientation}`, props.className),
    ref: forwardedRef
  });
});
let TabList = reactExports.forwardRef((props, ref) => {
  let { className, children, ...rest } = props;
  let { type, hasSublabel, color, orientation } = useSafeContext(TabsContext);
  let isClient = useIsClient();
  let tablistRef = reactExports.useRef(null);
  let [tablistSizeRef, tabsWidth] = useContainerWidth("default" !== type);
  let refs = useMergedRefs(
    ref,
    tablistRef,
    tablistSizeRef,
    useScrollbarGutter()
  );
  return reactExports.createElement(
    TabListPresentation,
    {
      className: classnames(
        {
          "iui-animated": "default" !== type && isClient
        },
        className
      ),
      "data-iui-orientation": orientation,
      role: "tablist",
      ref: refs,
      ...rest,
      type,
      color,
      size: hasSublabel ? "large" : void 0,
      orientation
    },
    reactExports.createElement(
      TabListContext.Provider,
      {
        value: {
          tabsWidth,
          tablistRef
        }
      },
      children
    )
  );
});
let TabListPresentation = reactExports.forwardRef((props, forwardedRef) => {
  let {
    type = "default",
    color,
    size,
    orientation = "horizontal",
    ...rest
  } = props;
  return reactExports.createElement(Box, {
    ...rest,
    className: classnames(
      "iui-tabs",
      `iui-${type}`,
      {
        "iui-green": "green" === color,
        "iui-large": "large" === size
      },
      props.className
    ),
    "data-iui-orientation": orientation,
    ref: forwardedRef
  });
});
let Tab = reactExports.forwardRef((props, forwardedRef) => {
  let { children, value, label, ...rest } = props;
  let {
    orientation,
    activeValue,
    setActiveValue,
    type,
    setStripeProperties,
    idPrefix,
    focusActivationMode
  } = useSafeContext(TabsContext);
  let { tabsWidth, tablistRef } = useSafeContext(TabListContext);
  let tabRef = reactExports.useRef(void 0);
  let isActive = activeValue === value;
  let isActiveRef = useLatestRef(isActive);
  useIsomorphicLayoutEffect(() => {
    if (isActiveRef.current)
      tabRef.current?.parentElement?.scrollTo({
        ["horizontal" === orientation ? "left" : "top"]: tabRef.current?.["horizontal" === orientation ? "offsetLeft" : "offsetTop"] - 4,
        behavior: "instant"
      });
  }, [isActiveRef, orientation]);
  useIsomorphicLayoutEffect(() => {
    let updateStripe = () => {
      let currentTabRect = tabRef.current?.getBoundingClientRect();
      let tabslistRect = tablistRef.current?.getBoundingClientRect();
      let currentTabLeftIncludingScroll = (currentTabRect?.x ?? 0) + (tablistRef.current?.scrollLeft ?? 0);
      let tabsStripePosition = null != currentTabRect && null != tabslistRect ? {
        horizontal: currentTabLeftIncludingScroll - tabslistRect.x,
        vertical: currentTabRect.y - tabslistRect.y
      } : {
        horizontal: 0,
        vertical: 0
      };
      setStripeProperties({
        "--iui-tabs-stripe-size": "horizontal" === orientation ? `${currentTabRect?.width}px` : `${currentTabRect?.height}px`,
        "--iui-tabs-stripe-position": "horizontal" === orientation ? `${tabsStripePosition.horizontal}px` : `${tabsStripePosition.vertical}px`
      });
    };
    if ("default" !== type && isActive) updateStripe();
  }, [
    type,
    orientation,
    isActive,
    tabsWidth,
    setStripeProperties,
    tablistRef,
    value
  ]);
  let onKeyDown = (event) => {
    if (event.altKey) return;
    let allTabs = Array.from(event.currentTarget.parentElement?.children ?? []);
    let nextTab = tabRef.current?.nextElementSibling ?? allTabs.at(0);
    let previousTab = tabRef.current?.previousElementSibling ?? allTabs.at(-1);
    switch (event.key) {
      case "ArrowDown":
        if ("vertical" === orientation) {
          nextTab?.focus();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if ("horizontal" === orientation) {
          nextTab?.focus();
          event.preventDefault();
        }
        break;
      case "ArrowUp":
        if ("vertical" === orientation) {
          previousTab?.focus();
          event.preventDefault();
        }
        break;
      case "ArrowLeft":
        if ("horizontal" === orientation) {
          previousTab?.focus();
          event.preventDefault();
        }
        break;
    }
  };
  let setInitialActiveRef = reactExports.useCallback(
    (element) => {
      if (void 0 !== activeValue) return;
      if (element?.matches(":first-of-type")) setActiveValue(value);
    },
    [activeValue, setActiveValue, value]
  );
  return reactExports.createElement(
    TabPresentation,
    {
      as: ButtonBase,
      role: "tab",
      tabIndex: isActive ? 0 : -1,
      "aria-selected": isActive,
      "aria-controls": `${idPrefix}-panel-${value.replaceAll(" ", "-")}`,
      ref: useMergedRefs(tabRef, forwardedRef, setInitialActiveRef),
      ...rest,
      id: `${idPrefix}-tab-${value.replaceAll(" ", "-")}`,
      onClick: mergeEventHandlers(props.onClick, () => setActiveValue(value)),
      onKeyDown: mergeEventHandlers(props.onKeyDown, onKeyDown),
      onFocus: mergeEventHandlers(props.onFocus, () => {
        tabRef.current?.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
        if ("auto" === focusActivationMode && !props.disabled)
          setActiveValue(value);
      })
    },
    label ? reactExports.createElement(Tabs.TabLabel, null, label) : children
  );
});
let TabPresentation = reactExports.forwardRef(
  (props, forwardedRef) => reactExports.createElement(Box, {
    as: "button",
    ...props,
    className: classnames("iui-tab", props.className),
    ref: forwardedRef
  })
);
let TabIcon = reactExports.forwardRef(
  (props, ref) => reactExports.createElement(Icon, {
    ...props,
    className: classnames("iui-tab-icon", props?.className),
    ref
  })
);
let TabLabel = polymorphic.span("iui-tab-label");
let TabDescription = reactExports.forwardRef((props, ref) => {
  let { className, children, ...rest } = props;
  let { hasSublabel, setHasSublabel } = useSafeContext(TabsContext);
  useIsomorphicLayoutEffect(() => {
    if (!hasSublabel) setHasSublabel(true);
  }, [hasSublabel, setHasSublabel]);
  return reactExports.createElement(
    Box,
    {
      as: "span",
      className: classnames("iui-tab-description", className),
      ref,
      ...rest
    },
    children
  );
});
let TabsActions = reactExports.forwardRef((props, ref) => {
  let { wrapperProps, className, children, ...rest } = props;
  return reactExports.createElement(
    Box,
    {
      ...wrapperProps,
      className: classnames("iui-tabs-actions-wrapper", wrapperProps?.className)
    },
    reactExports.createElement(
      Box,
      {
        className: classnames("iui-tabs-actions", className),
        ref,
        ...rest
      },
      children
    )
  );
});
let TabsPanel = reactExports.forwardRef((props, ref) => {
  let { value, className, children, ...rest } = props;
  let { activeValue, idPrefix } = useSafeContext(TabsContext);
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-tabs-content", className),
      "aria-labelledby": `${idPrefix}-tab-${value.replaceAll(" ", "-")}`,
      role: "tabpanel",
      hidden: activeValue !== value ? true : void 0,
      ref,
      ...rest,
      id: `${idPrefix}-panel-${value.replaceAll(" ", "-")}`
    },
    children
  );
});
let LegacyTabsComponent = reactExports.forwardRef((props, forwardedRef) => {
  let actions;
  if ("pill" !== props.type && props.actions) {
    actions = props.actions;
    props = {
      ...props
    };
    delete props.actions;
  }
  let {
    labels,
    onTabSelected,
    focusActivationMode,
    color,
    activeIndex: activeIndexProp,
    tabsClassName,
    contentClassName,
    wrapperClassName,
    children,
    ...rest
  } = props;
  let [activeIndex, setActiveIndex] = useControlledState(
    0,
    activeIndexProp,
    onTabSelected
  );
  return reactExports.createElement(
    TabsWrapper,
    {
      className: wrapperClassName,
      focusActivationMode,
      color,
      value: `${activeIndex}`,
      onValueChange: (value) => setActiveIndex(Number(value)),
      ...rest
    },
    reactExports.createElement(
      TabList,
      {
        className: tabsClassName,
        ref: forwardedRef
      },
      labels.map((label, index) => {
        let tabValue = `${index}`;
        return reactExports.isValidElement(label) ? reactExports.cloneElement(label, {
          value: tabValue
        }) : reactExports.createElement(LegacyTab, {
          key: index,
          value: tabValue,
          label
        });
      })
    ),
    actions && reactExports.createElement(TabsActions, null, actions),
    children && reactExports.createElement(
      TabsPanel,
      {
        value: `${activeIndex}`,
        className: contentClassName
      },
      children
    )
  );
});
let LegacyTab = reactExports.forwardRef((props, forwardedRef) => {
  let { label, sublabel, startIcon, children, value, ...rest } = props;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      Tab,
      {
        ...rest,
        value,
        ref: forwardedRef
      },
      startIcon && reactExports.createElement(TabIcon, null, startIcon),
      reactExports.createElement(TabLabel, null, label),
      sublabel && reactExports.createElement(TabDescription, null, sublabel),
      children
    )
  );
});
const Tabs = Object.assign(LegacyTabsComponent, {
  Wrapper: TabsWrapper,
  TabList,
  Tab,
  TabIcon,
  TabLabel,
  TabDescription,
  Actions: TabsActions,
  Panel: TabsPanel
});
let TabsContext = reactExports.createContext(void 0);
let TabListContext = reactExports.createContext(void 0);
let useScrollbarGutter = () => reactExports.useCallback((element) => {
  if (element) {
    if (element.scrollHeight > element.clientHeight) {
      element.style.scrollbarGutter = "stable";
      if (!CSS.supports("scrollbar-gutter: stable"))
        element.style.overflowY = "scroll";
    }
  }
}, []);
export {
  Tabs as T
};
