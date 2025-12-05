import { j as jsxRuntimeExports } from "./iframe-Bhm6mZpx.js";
import { useMDXComponents } from "./index-Cd2tKMA-.js";
import { M as Meta, S as Story2 } from "./blocks-CxyOTo72.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-Cx-XYbfR.js";
import "./appui-react-WePxyzLf.js";
import "./Key.enum-MqV3Iuz-.js";
import "./client-BV4YAMRx.js";
import "./AppUiStory-CM3lQLMB.js";
import "./Utils-DSDTm9HV.js";
import "./BackstageComposer-Cs3PemmL.js";
import "./BackstageAppButton-BpvT_B5t.js";
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
