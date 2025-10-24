import { r as reactExports, j as jsxRuntimeExports } from "./iframe-qZqPc1fv.js";
import { M as MessageManager, N as NotifyMessageDetails, p as FrontstageUtilities, l as StandardContentLayouts, q as StageUsage, r as StagePanelSection, s as StagePanelLocation, S as SvgPlaceholder } from "./appui-react-CLN8J6gc.js";
import "./Key.enum-bWQ0azWJ.js";
function createFrontstage(overrides) {
  const {
    content,
    contentProps,
    contentManipulation,
    layout,
    toolSettings,
    ...rest
  } = overrides ?? {};
  const config = FrontstageUtilities.createStandardFrontstage({
    id: "main-frontstage",
    usage: StageUsage.Private,
    version: Math.random(),
    contentGroupProps: {
      id: "ContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "Content",
          classId: "",
          content: content ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              style: {
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              },
              children: "Content"
            }
          ),
          ...contentProps
        }
      ]
    },
    hideStatusBar: true,
    hideToolSettings: true,
    hideNavigationAid: true,
    ...rest
  });
  return {
    ...config,
    layout,
    contentManipulation: contentManipulation ?? config.contentManipulation,
    toolSettings: toolSettings ?? config.toolSettings
  };
}
function removeProperty() {
  return {
    table: {
      disable: true
    }
  };
}
function enumArgType(_enum) {
  const options = Object.values(_enum).filter(
    (value) => typeof value === "number"
  );
  return {
    options,
    control: {
      type: "select",
      labels: _enum
    }
  };
}
function createWidget(id, overrides) {
  return {
    id: `w${id}`,
    label: `Widget ${id}`,
    content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Widget ",
      id,
      " content"
    ] }),
    iconNode: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}),
    layouts: {
      standard: {
        location: StagePanelLocation.Left,
        section: StagePanelSection.Start
      }
    },
    ...overrides
  };
}
function createMessageDecorator({
  priority,
  briefMessage = "Message",
  detailedMessage
}) {
  return (Story) => {
    reactExports.useEffect(() => {
      MessageManager.clearMessages();
      Array.from({ length: 4 }).forEach((_, index) => {
        const id = index + 1;
        briefMessage = briefMessage ?? "Message";
        MessageManager.addToMessageCenter(
          new NotifyMessageDetails(
            priority,
            `${briefMessage} ${id}`,
            detailedMessage ? `${detailedMessage} ${id}` : void 0
          )
        );
      });
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {});
  };
}
export {
  createMessageDecorator as a,
  createWidget as b,
  createFrontstage as c,
  enumArgType as e,
  removeProperty as r
};
