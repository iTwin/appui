import { j as jsxRuntimeExports } from "./iframe-of9jHZvl.js";
import { useMDXComponents } from "./index-CvJ0wLED.js";
import { M as Meta, S as Story2 } from "./blocks-C3OMpOH7.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-BxzQX1Nf.js";
import "./appui-react-BowZ5tTD.js";
import "./Key.enum-BBhL30hZ.js";
import "./client-CuoNahFE.js";
import "./AppUiStory-DgXCkYSf.js";
import "./Utils-CqtNvucg.js";
import "./BackstageComposer-C_Owk69h.js";
import "./BackstageAppButton-BpRUAPB7.js";
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
