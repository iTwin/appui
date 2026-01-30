import { j as jsxRuntimeExports } from "./iframe-A-daL9dH.js";
import { useMDXComponents } from "./index-D88RpEn-.js";
import { M as Meta, S as Story2 } from "./blocks-Cpp__keO.js";
import { s as stories, B as Basic } from "./useIsBackstageOpen.stories-DYDN-Bum.js";
import "./preload-helper-UZRgTS1n.js";
import "./index-Cv1bF3Cl.js";
import "./appui-react-DFr32jNI.js";
import "./Key.enum-CiB4OVGn.js";
import "./client-BinWtdfJ.js";
import "./AppUiStory-BzeGt--P.js";
import "./Utils-DpvN-rTe.js";
import "./BackstageComposer-8CNaOFTU.js";
import "./BackstageAppButton-CBNtx62c.js";
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
