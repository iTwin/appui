import { d as demoIModelGlobalType, w as withDemoIModel } from "./DemoIModel-DuWsADYF.js";
import { r as resizerGlobalType } from "./Resizer-oL6qocnZ.js";
import "./jsx-runtime-D2-sc1j1.js";
import "./index-DM9bPmif.js";
import "./_commonjsHelpers-LQfde5yM.js";
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
