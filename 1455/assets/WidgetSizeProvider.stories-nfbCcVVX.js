import { j as jsxRuntimeExports } from "./iframe-BxVIzreG.js";
import { G as StagePanelState, K as WidgetSizeProvider, L as useWidgetSize, Q as defaultBreakpoints } from "./appui-react-CvaqSdj1.js";
import { I as InitializerDecorator, A as AppUiDecorator } from "./Decorators-QJAbI6jH.js";
import { P as Page, S as SimpleAppUiStory } from "./AppUiStory-DdY_3lSg.js";
import { c as createFrontstage, a as createWidget } from "./Utils-CwcTKaa4.js";
import "./Key.enum-D5EC_Md2.js";
import "./client-DWlsoIYR.js";
import "./blocks-mHkI2uPk.js";
function WidgetSizeProviderStory(props) {
  const {
    id = "widget-size-demo",
    breakpoints
  } = props;
  const provider = {
    id: "widget-layout-provider",
    getWidgets: () => [createWidget(1, {
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetSizeProvider, { id, breakpoints, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContent, { breakpoints }) }),
      label: "Widget Layout Demo"
    })]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleAppUiStory, { itemProviders: [provider], frontstages: [createFrontstage({
    leftPanelProps: {
      defaultState: StagePanelState.Open,
      pinned: true
    }
  })] });
}
function WidgetContent({
  breakpoints
}) {
  const {
    size,
    dimension
  } = useWidgetSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "4px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "16px",
      backgroundColor: getSizeColor(size),
      color: "white",
      borderRadius: "4px",
      fontWeight: "bold",
      fontSize: "24px",
      textAlign: "center"
    }, children: [
      "Current Size: ",
      size
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "16px",
      backgroundColor: "#e8e8e8",
      borderRadius: "4px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: {
        marginTop: 0
      }, children: "Dimensions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { style: {
        margin: 0
      }, children: [
        "Width: ",
        dimension.width,
        "px",
        "\n",
        "Height: ",
        dimension.height,
        "px"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "16px",
      backgroundColor: "#e8e8e8",
      borderRadius: "4px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: {
        marginTop: 0
      }, children: "Breakpoint Info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: {
        margin: 0,
        paddingLeft: "20px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "xs: 0px - ",
          (breakpoints?.sm ?? defaultBreakpoints.sm) - 1,
          "px"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "sm: 300px - ",
          (breakpoints?.md ?? defaultBreakpoints.md) - 1,
          "px"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "md: 600px - ",
          (breakpoints?.lg ?? defaultBreakpoints.lg) - 1,
          "px"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "lg: 1024px - ",
          (breakpoints?.xl ?? defaultBreakpoints.xl) - 1,
          "px"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "xl: 1280px -",
          " ",
          (breakpoints?.["2xl"] ?? defaultBreakpoints["2xl"]) - 1,
          "px"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "2xl: 1536px+" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContent, {})
  ] });
}
function ResponsiveContent() {
  const {
    size
  } = useWidgetSize();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    padding: "16px",
    backgroundColor: "#e8e8e8",
    borderRadius: "4px",
    flex: 1
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: {
      marginTop: 0
    }, children: "Responsive Content" }),
    size === "xs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Extra Small:" }),
      " Minimal content displayed for very narrow widgets."
    ] }),
    size === "sm" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Small:" }),
      " Compact layout with essential information only."
    ] }),
    size === "md" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Medium:" }),
      " Standard layout with balanced content and spacing."
    ] }),
    size === "lg" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Large:" }),
      " Expanded layout with additional details and features."
    ] }),
    size === "xl" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Extra Large:" }),
      " Full-featured layout with maximum content visibility."
    ] }),
    size === "2xl" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2X Large:" }),
      " Ultra-wide layout optimized for large displays."
    ] })
  ] });
}
function getSizeColor(size) {
  const colors = {
    xs: "#dc2626",
    sm: "#ea580c",
    md: "#ca8a04",
    lg: "#16a34a",
    xl: "#2563eb",
    "2xl": "#7c3aed"
  };
  return colors[size] || "#6b7280";
}
const meta = {
  title: "Widget/WidgetSizeProvider",
  component: WidgetSizeProviderStory,
  tags: ["autodocs"],
  decorators: [InitializerDecorator, AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    }
  },
  argTypes: {
    width: {
      control: "text",
      description: "Width of the container"
    },
    height: {
      control: "text",
      description: "Height of the container"
    }
  }
};
const Default = {};
const CustomBreakpoints = {
  args: {
    breakpoints: {
      sm: 200,
      md: 300,
      lg: 400,
      xl: 500,
      "2xl": 600
    }
  }
};
Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Default.parameters?.docs?.source
    }
  }
};
CustomBreakpoints.parameters = {
  ...CustomBreakpoints.parameters,
  docs: {
    ...CustomBreakpoints.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    breakpoints: {\n      sm: 200,\n      md: 300,\n      lg: 400,\n      xl: 500,\n      "2xl": 600\n    }\n  }\n}',
      ...CustomBreakpoints.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Default", "CustomBreakpoints"];
export {
  CustomBreakpoints,
  Default,
  __namedExportsOrder,
  meta as default
};
