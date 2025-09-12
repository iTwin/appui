import { j as jsxRuntimeExports } from "./iframe-6wCQlzbQ.js";
import { useMDXComponents } from "./index-BgjaGa-f.js";
import { M as Meta, S as Story2 } from "./blocks-D5BbEkRZ.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-C513rzX7.js";
import "./appui-react-J8mIGY7J.js";
import "./Key.enum-BlhmG3rp.js";
import "./client-BEc9SNOE.js";
import "./AppUiStory-BAOH6QaT.js";
import "./Utils--AFg1FSw.js";
import "./BackstageComposer-nPkozD5g.js";
import "./BackstageAppButton-CNLFqwhH.js";
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
