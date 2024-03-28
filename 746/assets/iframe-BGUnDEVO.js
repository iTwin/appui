function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Introduction-BXlxx_Lr.js","./jsx-runtime-_iMjpMZ4.js","./index-DlkhCVTf.js","./_commonjsHelpers-LQfde5yM.js","./index-z82J1YTj.js","./getPrototypeOf-BmmMfuHC.js","./index-Cm_5MPU1.js","./index-Cp4dr_sK.js","./index-ex9_VrIg.js","./index-BdOSk9or.js","./index-rfIeqBSq.js","./AutoSuggest.stories-DVHkOXBv.js","./Decorators-B2adf99T.js","./DefaultToolSettingsProvider-BMCl5D3j.js","./index-B47T7vRo.js","./DefaultToolSettingsProvider-CUwqPa7I.css","./Decorators-CyEEumUI.css","./AutoSuggest-vXsAO2pe.css","./ContextMenu.stories-CLF9KnGC.js","./IconComponent-BqW2EcKA.js","./IconComponent-VNtKStHV.css","./ContextMenu-Clh6uStC.css","./Editors.stories-C0aPSA_K.js","./AppUiStory-JB1HrQrm.js","./ToolbarComposer-BAliddVT.js","./DemoIModel-4Lmk67sy.js","./AppUiStory-D8QL0NRj.css","./ExpandableList.stories-RjB1POKv.js","./FilterBuilder.stories-BI9gYoQd.js","./IconInput.stories-CsIerdyj.js","./2D-x8v64Bdm.js","./IconInput-3RKlrnUP.css","./InputLabel.stories-CqW_hs8V.js","./MessageCenterField.stories-CEJGINYI.js","./NumberInput.stories-DyYM5Bnx.js","./NumberInput-BIP1Efbc.css","./PropertyGrid.stories-CbzogCZY.js","./tap-BxS24wgy.js","./PropertyGrid-tYUSgFwm.css","./SolarTimeline.stories-CrdS-El-.js","./PlayButton-CTZKbDW2.js","./SolarTimeline-DVO5F3J2.css","./Timeline.stories-DL3XdDCD.js","./chunk-WFFRPTHA-B_pzO8uN.js","./preview-errors-C1TokqVJ.js","./Timeline-Cy7WowhC.css","./ToolbarComposer.stories-Bfaih_Hl.js","./Clipboard-D7Qxcpyi.js","./Resizer-KKflzMRu.js","./TreeWidget.stories-COsJ_PPD.js","./Frontstage.stories-B5eH9hDK.js","./SplitViewport.stories-CKFosMy8.js","./ToolSettings.stories-BzMiMPkK.js","./useIsBackstageOpen-CrKZF2uw.js","./useIsBackstageOpen.stories-C0R3ozbl.js","./KeyboardShortcuts.stories-B-PZV1lN.js","./EnableMaximizedWidget.stories-BuHmPPtH.js","./WidgetActionDropdown.stories-4LypWrI0.js","./CanFloat.stories-CF3lzJ3V.js","./CanPopout.stories-DzCeAfxl.js","./EmptyState.stories-BIQgr1fv.js","./Widget.stories-Xg9FQaSo.js","./entry-preview-Q_sJ3nah.js","./react-16-CTl29GW6.js","./entry-preview-docs-DKawCtck.js","./preview-Ckll7LWR.js","./preview-39qbk_x8.js","./preview-bL4x2zrN.js","./preview-3kSipVgK.js","./preview-DY3rZFpy.js","./preview-CQOcE4HF.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import "../sb-preview/runtime.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.all(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen)
        return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      const isBaseRelative = !!importerUrl;
      if (isBaseRelative) {
        for (let i = links.length - 1; i >= 0; i--) {
          const link2 = links[i];
          if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
            return;
          }
        }
      } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
        return;
      }
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) {
        link.as = "script";
        link.crossOrigin = "";
      }
      link.href = dep;
      if (cspNonce) {
        link.setAttribute("nonce", cspNonce);
      }
      document.head.appendChild(link);
      if (isCss) {
        return new Promise((res, rej) => {
          link.addEventListener("load", res);
          link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
        });
      }
    }));
  }
  return promise.then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
const { createBrowserChannel } = __STORYBOOK_MODULE_CHANNELS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const channel = createBrowserChannel({ page: "preview" });
addons.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
if (window.CONFIG_TYPE === "DEVELOPMENT") {
  window.__STORYBOOK_SERVER_CHANNEL__ = channel;
}
const importers = {
  "./src/Introduction.mdx": async () => __vitePreload(() => import("./Introduction-BXlxx_Lr.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0, import.meta.url),
  "./src/components/AutoSuggest.stories.tsx": async () => __vitePreload(() => import("./AutoSuggest.stories-DVHkOXBv.js"), true ? __vite__mapDeps([11,12,1,2,3,13,6,5,14,15,16,17]) : void 0, import.meta.url),
  "./src/components/ContextMenu.stories.tsx": async () => __vitePreload(() => import("./ContextMenu.stories-CLF9KnGC.js"), true ? __vite__mapDeps([18,1,2,3,13,6,5,14,15,19,20,12,16,21]) : void 0, import.meta.url),
  "./src/components/Editors.stories.tsx": async () => __vitePreload(() => import("./Editors.stories-C0aPSA_K.js"), true ? __vite__mapDeps([22,1,2,3,23,13,6,5,14,15,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/components/ExpandableList.stories.tsx": async () => __vitePreload(() => import("./ExpandableList.stories-RjB1POKv.js"), true ? __vite__mapDeps([27,1,2,3,13,6,5,14,15,12,16]) : void 0, import.meta.url),
  "./src/components/FilterBuilder.stories.tsx": async () => __vitePreload(() => import("./FilterBuilder.stories-BI9gYoQd.js"), true ? __vite__mapDeps([28,13,2,3,6,5,14,15,12,1,16]) : void 0, import.meta.url),
  "./src/components/IconInput.stories.tsx": async () => __vitePreload(() => import("./IconInput.stories-CsIerdyj.js"), true ? __vite__mapDeps([29,1,2,3,13,6,5,14,15,30,12,16,31]) : void 0, import.meta.url),
  "./src/components/InputLabel.stories.tsx": async () => __vitePreload(() => import("./InputLabel.stories-CqW_hs8V.js"), true ? __vite__mapDeps([32,1,2,3,13,6,5,14,15,19,20,12,16]) : void 0, import.meta.url),
  "./src/components/MessageCenterField.stories.tsx": async () => __vitePreload(() => import("./MessageCenterField.stories-CEJGINYI.js"), true ? __vite__mapDeps([33,1,2,3,12,13,6,5,14,15,16]) : void 0, import.meta.url),
  "./src/components/NumberInput.stories.tsx": async () => __vitePreload(() => import("./NumberInput.stories-DyYM5Bnx.js"), true ? __vite__mapDeps([34,1,2,3,13,6,5,14,15,19,20,12,16,35]) : void 0, import.meta.url),
  "./src/components/PropertyGrid.stories.tsx": async () => __vitePreload(() => import("./PropertyGrid.stories-CbzogCZY.js"), true ? __vite__mapDeps([36,1,2,3,13,6,5,14,15,37,12,16,38]) : void 0, import.meta.url),
  "./src/components/SolarTimeline.stories.tsx": async () => __vitePreload(() => import("./SolarTimeline.stories-CrdS-El-.js"), true ? __vite__mapDeps([39,1,2,3,12,13,6,5,14,15,16,40,41]) : void 0, import.meta.url),
  "./src/components/Timeline.stories.tsx": async () => __vitePreload(() => import("./Timeline.stories-DL3XdDCD.js"), true ? __vite__mapDeps([42,1,2,3,13,6,5,14,15,40,12,16,43,44,9,45]) : void 0, import.meta.url),
  "./src/components/ToolbarComposer.stories.tsx": async () => __vitePreload(() => import("./ToolbarComposer.stories-Bfaih_Hl.js"), true ? __vite__mapDeps([46,1,2,3,43,44,9,13,6,5,14,15,30,47,24,12,16,48]) : void 0, import.meta.url),
  "./src/components/TreeWidget.stories.tsx": async () => __vitePreload(() => import("./TreeWidget.stories-COsJ_PPD.js"), true ? __vite__mapDeps([49,1,2,3,13,6,5,14,15,37,12,16]) : void 0, import.meta.url),
  "./src/frontstage/Frontstage.stories.tsx": async () => __vitePreload(() => import("./Frontstage.stories-B5eH9hDK.js"), true ? __vite__mapDeps([50,1,2,3,13,6,5,14,15,23,4,7,8,9,24,25,26,12,16]) : void 0, import.meta.url),
  "./src/frontstage/SplitViewport.stories.tsx": async () => __vitePreload(() => import("./SplitViewport.stories-CKFosMy8.js"), true ? __vite__mapDeps([51,1,2,3,13,6,5,14,15,30,47,12,16,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/frontstage/ToolSettings.stories.tsx": async () => __vitePreload(() => import("./ToolSettings.stories-BzMiMPkK.js"), true ? __vite__mapDeps([52,1,2,3,13,6,5,14,15,12,16,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/hooks/useIsBackstageOpen.mdx": async () => __vitePreload(() => import("./useIsBackstageOpen-CrKZF2uw.js"), true ? __vite__mapDeps([53,1,2,3,4,5,6,7,8,9,54,13,14,15,23,24,25,26,10]) : void 0, import.meta.url),
  "./src/hooks/useIsBackstageOpen.stories.tsx": async () => __vitePreload(() => import("./useIsBackstageOpen.stories-C0R3ozbl.js").then((n) => n.s), true ? __vite__mapDeps([54,1,2,3,13,6,5,14,15,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/keyboard/KeyboardShortcuts.stories.tsx": async () => __vitePreload(() => import("./KeyboardShortcuts.stories-B-PZV1lN.js"), true ? __vite__mapDeps([55,1,2,3,12,13,6,5,14,15,16,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/preview/EnableMaximizedWidget.stories.tsx": async () => __vitePreload(() => import("./EnableMaximizedWidget.stories-BuHmPPtH.js"), true ? __vite__mapDeps([56,1,2,3,12,13,6,5,14,15,16,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/preview/WidgetActionDropdown.stories.tsx": async () => __vitePreload(() => import("./WidgetActionDropdown.stories-4LypWrI0.js"), true ? __vite__mapDeps([57,1,2,3,12,13,6,5,14,15,16,23,4,7,8,9,24,25,26]) : void 0, import.meta.url),
  "./src/widget/CanFloat.stories.tsx": async () => __vitePreload(() => import("./CanFloat.stories-CF3lzJ3V.js"), true ? __vite__mapDeps([58,1,2,3,13,6,5,14,15,23,4,7,8,9,24,25,26,12,16]) : void 0, import.meta.url),
  "./src/widget/CanPopout.stories.tsx": async () => __vitePreload(() => import("./CanPopout.stories-DzCeAfxl.js"), true ? __vite__mapDeps([59,1,2,3,13,6,5,14,15,23,4,7,8,9,24,25,26,12,16]) : void 0, import.meta.url),
  "./src/widget/EmptyState.stories.tsx": async () => __vitePreload(() => import("./EmptyState.stories-BIQgr1fv.js"), true ? __vite__mapDeps([60,1,2,3,13,6,5,14,15,23,4,7,8,9,24,25,26,12,16]) : void 0, import.meta.url),
  "./src/widget/Widget.stories.tsx": async () => __vitePreload(() => import("./Widget.stories-Xg9FQaSo.js"), true ? __vite__mapDeps([61,1,2,3,13,6,5,14,15,12,16,23,4,7,8,9,24,25,26,43,44]) : void 0, import.meta.url)
};
async function importFn(path) {
  return importers[path]();
}
const { composeConfigs, PreviewWeb, ClientApi } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async () => {
  const configs = await Promise.all([
    __vitePreload(() => import("./entry-preview-Q_sJ3nah.js"), true ? __vite__mapDeps([62,2,3,63,6]) : void 0, import.meta.url),
    __vitePreload(() => import("./entry-preview-docs-DKawCtck.js"), true ? __vite__mapDeps([64,8,3,14,9,2]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-Ckll7LWR.js"), true ? __vite__mapDeps([65,7]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-D0x3gOOs.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-39qbk_x8.js"), true ? __vite__mapDeps([66,44,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-bL4x2zrN.js"), true ? __vite__mapDeps([67,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-BeQelhbu.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-3kSipVgK.js"), true ? __vite__mapDeps([68,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-B4rAxPmB.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-DY3rZFpy.js"), true ? __vite__mapDeps([69,3]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-CQOcE4HF.js"), true ? __vite__mapDeps([70,25,1,2,3,48]) : void 0, import.meta.url)
  ]);
  return composeConfigs(configs);
};
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb();
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
window.__STORYBOOK_CLIENT_API__ = window.__STORYBOOK_CLIENT_API__ || new ClientApi({ storyStore: window.__STORYBOOK_PREVIEW__.storyStore });
window.__STORYBOOK_PREVIEW__.initialize({ importFn, getProjectAnnotations });
export {
  __vitePreload as _
};
