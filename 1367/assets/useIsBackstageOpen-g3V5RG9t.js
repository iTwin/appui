import { j as jsxRuntimeExports } from "./iframe-CLuD2P-S.js";
import { useMDXComponents } from "./index-BOw-xNcH.js";
import { M as Meta, S as Story2 } from "./blocks-BV6oatAL.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DkirfRqi.js";
import "./appui-react-CCwsTewB.js";
import "./Key.enum-CPqlhvPk.js";
import "./client-DjW6bisg.js";
import "./AppUiStory-Bvz1DJ69.js";
import "./Utils-DxFuKMXZ.js";
import "./Divider-DwuTYpqA.js";
import "./BackstageComposer-308NguMc.js";
import "./BackstageAppButton-CDC9E4yT.js";
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
