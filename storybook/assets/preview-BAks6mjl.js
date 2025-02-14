import { d as demoIModelGlobalType, w as withDemoIModel } from "./DemoIModel-B8H6_QN-.js";
import { r as resizerGlobalType } from "./Resizer-uUjcpciD.js";
import "./jsx-runtime-CC5-Dj7Q.js";
import "./index-DDLqOySG.js";
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "background",
      values: [
        {
          name: "background",
          value: "white"
        },
        {
          name: "background-backdrop",
          value: "#eef0f1"
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Components",
          "Frontstage",
          "Widget",
          "Hooks",
          "PreviewFeatures",
          "Deprecated"
        ]
      }
    }
  },
  globalTypes: {
    iModel: demoIModelGlobalType,
    resizer: resizerGlobalType
  },
  decorators: [withDemoIModel]
};
export {
  preview as default
};
