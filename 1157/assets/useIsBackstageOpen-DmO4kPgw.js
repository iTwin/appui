import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { useMDXComponents } from "./index-C92vVcek.js";
import { ae as Meta, af as Story2 } from "./index-B9CpaEkv.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DVdh7vGj.js";
import "./index-DDLqOySG.js";
import "./iframe-Fr9Z2WEJ.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./index-DLlB04eo.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./inheritsLoose-HEqISCW8.js";
import "./index-BZDuRpLS.js";
import "./index-BdOSk9or.js";
import "./appui-react-CGyWeAly.js";
import "./Dialog-9BWhrN4d.js";
import "./index-BZqLgkBR.js";
import "./client-D6MDPju-.js";
import "./AppUiStory-CAnkot57.js";
import "./DemoIModel-B8H6_QN-.js";
import "./BackstageComposer-CYnyi0RZ.js";
import "./BackstageAppButton-GT8TzqFJ.js";
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    p: "p",
    ...useMDXComponents(),
    ...props.components
  };
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsx(Meta, {
      of: stories
    }), "\n", jsxRuntimeExports.jsx(_components.h1, {
      id: "useisbackstageopen",
      children: "useIsBackstageOpen"
    }), "\n", jsxRuntimeExports.jsx(_components.p, {
      children: "React hook that returns whether the backstage is open."
    }), "\n", jsxRuntimeExports.jsx(Story2, {
      of: Basic
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = {
    ...useMDXComponents(),
    ...props.components
  };
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, {
    ...props,
    children: jsxRuntimeExports.jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default
};
