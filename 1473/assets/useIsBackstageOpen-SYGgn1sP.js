import { j as jsxRuntimeExports } from "./iframe-BcAvbCVW.js";
import { useMDXComponents } from "./index-D9Bc3VNt.js";
import { M as Meta, S as Story2 } from "./blocks-DlWOLuJc.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BoIGZOl1.js";
import "./appui-react-DQI_0K9M.js";
import "./Key.enum-COMa1JTT.js";
import "./client-BZBZgC4q.js";
import "./AppUiStory-DIcxXI2k.js";
import "./Utils-FQrmyDjE.js";
import "./BackstageComposer-BWuk6YUq.js";
import "./BackstageAppButton-BFGpOodF.js";
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
