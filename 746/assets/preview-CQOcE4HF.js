import { d as demoIModelGlobalType, w as withDemoIModel } from "./DemoIModel-4Lmk67sy.js";
import { r as resizerGlobalType } from "./Resizer-KKflzMRu.js";
import "./jsx-runtime-_iMjpMZ4.js";
import "./index-DlkhCVTf.js";
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
          "Preview Features"
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
