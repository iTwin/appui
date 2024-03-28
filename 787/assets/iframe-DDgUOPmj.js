function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./Introduction-SLPs4u03.js","./jsx-runtime-_iMjpMZ4.js","./index-DlkhCVTf.js","./_commonjsHelpers-LQfde5yM.js","./index-Dr-11776.js","./getPrototypeOf-BmmMfuHC.js","./index-Cm_5MPU1.js","./index-Cp4dr_sK.js","./index-ex9_VrIg.js","./index-BdOSk9or.js","./index-rfIeqBSq.js","./AutoSuggest.stories-Bu1-b5F6.js","./Decorators-C3AIcKoW.js","./DefaultToolSettingsProvider-DnwPMY8p.js","./index-B47T7vRo.js","./DefaultToolSettingsProvider-C0KyKG9m.css","./Decorators-CyEEumUI.css","./UiCore-BZgqUpyf.js","./UiCore-CdwZCuYS.css","./AutoSuggest-D6-v3SwU.css","./ContextMenu.stories-BdVRxTUC.js","./IconComponent-PJjAyWwi.js","./IconComponent-VNtKStHV.css","./ContextMenu-Clh6uStC.css","./Editors.stories-C5rc_Ijp.js","./AppUiStory-BtwpH1aH.js","./ToolbarComposer-BHflxGDg.js","./DemoIModel-4Lmk67sy.js","./AppUiStory-D8QL0NRj.css","./ExpandableList.stories-ChBb5H3F.js","./FilterBuilder.stories-u1r-Ok4m.js","./IconInput.stories-Bs5MWzic.js","./2D-x8v64Bdm.js","./IconInput-3RKlrnUP.css","./InputLabel.stories-Cw2pUJKS.js","./MessageCenterField.stories-CuEtrNuv.js","./MessageCenterField-XxGtg1DZ.css","./NumberInput.stories-CJJYHaSa.js","./NumberInput-BIP1Efbc.css","./PropertyGrid.stories-DM1TaZWY.js","./tap-h0Ibaa9b.js","./PropertyGrid-tYUSgFwm.css","./SearchBox.stories-CXWrfVyY.js","./chunk-WFFRPTHA-B_pzO8uN.js","./preview-errors-C1TokqVJ.js","./SearchBox-D_EturUm.css","./SolarTimeline.stories-BNpoC--B.js","./PlayButton-fIx-7sTI.js","./SolarTimeline-DVO5F3J2.css","./Timeline.stories-BqXxEJJh.js","./Timeline-Cy7WowhC.css","./ToolbarComposer.stories-D6KwdRdJ.js","./Clipboard-D7Qxcpyi.js","./Resizer-KKflzMRu.js","./TreeWidget.stories-CDfkoGds.js","./Frontstage.stories-Di5EHxgj.js","./SplitViewport.stories-BI5aHMRe.js","./ToolSettings.stories-BZeUJhcX.js","./useIsBackstageOpen-CHbwVMpO.js","./useIsBackstageOpen.stories-tyDAs4WX.js","./KeyboardShortcuts.stories-BHzbEcl1.js","./EnableMaximizedWidget.stories-CkYGue-V.js","./WidgetActionDropdown.stories-DXwA7arc.js","./CanFloat.stories-CnujqZD3.js","./CanPopout.stories-BRP_uHgH.js","./EmptyState.stories-k7z289Bm.js","./Widget.stories--MFyAWji.js","./entry-preview-Q_sJ3nah.js","./react-16-CTl29GW6.js","./entry-preview-docs-DKawCtck.js","./preview-Ckll7LWR.js","./preview-39qbk_x8.js","./preview-bL4x2zrN.js","./preview-3kSipVgK.js","./preview-DY3rZFpy.js","./preview-CQOcE4HF.js"]
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
  "./src/Introduction.mdx": async () => __vitePreload(() => import("./Introduction-SLPs4u03.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0, import.meta.url),
  "./src/components/AutoSuggest.stories.tsx": async () => __vitePreload(() => import("./AutoSuggest.stories-Bu1-b5F6.js"), true ? __vite__mapDeps([11,12,1,2,3,13,6,5,14,15,16,17,18,19]) : void 0, import.meta.url),
  "./src/components/ContextMenu.stories.tsx": async () => __vitePreload(() => import("./ContextMenu.stories-BdVRxTUC.js"), true ? __vite__mapDeps([20,1,2,3,13,6,5,14,15,21,22,12,16,23]) : void 0, import.meta.url),
  "./src/components/Editors.stories.tsx": async () => __vitePreload(() => import("./Editors.stories-C5rc_Ijp.js"), true ? __vite__mapDeps([24,1,2,3,25,13,6,5,14,15,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/components/ExpandableList.stories.tsx": async () => __vitePreload(() => import("./ExpandableList.stories-ChBb5H3F.js"), true ? __vite__mapDeps([29,1,2,3,13,6,5,14,15,12,16]) : void 0, import.meta.url),
  "./src/components/FilterBuilder.stories.tsx": async () => __vitePreload(() => import("./FilterBuilder.stories-u1r-Ok4m.js"), true ? __vite__mapDeps([30,13,2,3,6,5,14,15,12,1,16]) : void 0, import.meta.url),
  "./src/components/IconInput.stories.tsx": async () => __vitePreload(() => import("./IconInput.stories-Bs5MWzic.js"), true ? __vite__mapDeps([31,1,2,3,13,6,5,14,15,32,12,16,33]) : void 0, import.meta.url),
  "./src/components/InputLabel.stories.tsx": async () => __vitePreload(() => import("./InputLabel.stories-Cw2pUJKS.js"), true ? __vite__mapDeps([34,1,2,3,13,6,5,14,15,21,22,12,16]) : void 0, import.meta.url),
  "./src/components/MessageCenterField.stories.tsx": async () => __vitePreload(() => import("./MessageCenterField.stories-CuEtrNuv.js"), true ? __vite__mapDeps([35,1,2,3,12,13,6,5,14,15,16,36]) : void 0, import.meta.url),
  "./src/components/NumberInput.stories.tsx": async () => __vitePreload(() => import("./NumberInput.stories-CJJYHaSa.js"), true ? __vite__mapDeps([37,1,2,3,13,6,5,14,15,21,22,12,16,38]) : void 0, import.meta.url),
  "./src/components/PropertyGrid.stories.tsx": async () => __vitePreload(() => import("./PropertyGrid.stories-DM1TaZWY.js"), true ? __vite__mapDeps([39,1,2,3,13,6,5,14,15,40,12,16,41]) : void 0, import.meta.url),
  "./src/components/SearchBox.stories.tsx": async () => __vitePreload(() => import("./SearchBox.stories-CXWrfVyY.js"), true ? __vite__mapDeps([42,12,1,2,3,13,6,5,14,15,16,21,22,17,18,43,44,9,45]) : void 0, import.meta.url),
  "./src/components/SolarTimeline.stories.tsx": async () => __vitePreload(() => import("./SolarTimeline.stories-BNpoC--B.js"), true ? __vite__mapDeps([46,1,2,3,12,13,6,5,14,15,16,47,48]) : void 0, import.meta.url),
  "./src/components/Timeline.stories.tsx": async () => __vitePreload(() => import("./Timeline.stories-BqXxEJJh.js"), true ? __vite__mapDeps([49,1,2,3,13,6,5,14,15,47,12,16,43,44,9,50]) : void 0, import.meta.url),
  "./src/components/ToolbarComposer.stories.tsx": async () => __vitePreload(() => import("./ToolbarComposer.stories-D6KwdRdJ.js"), true ? __vite__mapDeps([51,1,2,3,43,44,9,13,6,5,14,15,32,52,26,12,16,53]) : void 0, import.meta.url),
  "./src/components/TreeWidget.stories.tsx": async () => __vitePreload(() => import("./TreeWidget.stories-CDfkoGds.js"), true ? __vite__mapDeps([54,1,2,3,13,6,5,14,15,40,12,16]) : void 0, import.meta.url),
  "./src/frontstage/Frontstage.stories.tsx": async () => __vitePreload(() => import("./Frontstage.stories-Di5EHxgj.js"), true ? __vite__mapDeps([55,1,2,3,13,6,5,14,15,25,4,7,8,9,26,27,28,12,16]) : void 0, import.meta.url),
  "./src/frontstage/SplitViewport.stories.tsx": async () => __vitePreload(() => import("./SplitViewport.stories-BI5aHMRe.js"), true ? __vite__mapDeps([56,1,2,3,13,6,5,14,15,32,52,12,16,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/frontstage/ToolSettings.stories.tsx": async () => __vitePreload(() => import("./ToolSettings.stories-BZeUJhcX.js"), true ? __vite__mapDeps([57,1,2,3,13,6,5,14,15,12,16,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/hooks/useIsBackstageOpen.mdx": async () => __vitePreload(() => import("./useIsBackstageOpen-CHbwVMpO.js"), true ? __vite__mapDeps([58,1,2,3,4,5,6,7,8,9,59,13,14,15,25,26,27,28,10]) : void 0, import.meta.url),
  "./src/hooks/useIsBackstageOpen.stories.tsx": async () => __vitePreload(() => import("./useIsBackstageOpen.stories-tyDAs4WX.js").then((n) => n.s), true ? __vite__mapDeps([59,1,2,3,13,6,5,14,15,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/keyboard/KeyboardShortcuts.stories.tsx": async () => __vitePreload(() => import("./KeyboardShortcuts.stories-BHzbEcl1.js"), true ? __vite__mapDeps([60,1,2,3,12,13,6,5,14,15,16,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/preview/EnableMaximizedWidget.stories.tsx": async () => __vitePreload(() => import("./EnableMaximizedWidget.stories-CkYGue-V.js"), true ? __vite__mapDeps([61,1,2,3,12,13,6,5,14,15,16,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/preview/WidgetActionDropdown.stories.tsx": async () => __vitePreload(() => import("./WidgetActionDropdown.stories-DXwA7arc.js"), true ? __vite__mapDeps([62,1,2,3,12,13,6,5,14,15,16,25,4,7,8,9,26,27,28]) : void 0, import.meta.url),
  "./src/widget/CanFloat.stories.tsx": async () => __vitePreload(() => import("./CanFloat.stories-CnujqZD3.js"), true ? __vite__mapDeps([63,1,2,3,13,6,5,14,15,25,4,7,8,9,26,27,28,12,16]) : void 0, import.meta.url),
  "./src/widget/CanPopout.stories.tsx": async () => __vitePreload(() => import("./CanPopout.stories-BRP_uHgH.js"), true ? __vite__mapDeps([64,1,2,3,13,6,5,14,15,25,4,7,8,9,26,27,28,12,16]) : void 0, import.meta.url),
  "./src/widget/EmptyState.stories.tsx": async () => __vitePreload(() => import("./EmptyState.stories-k7z289Bm.js"), true ? __vite__mapDeps([65,1,2,3,13,6,5,14,15,25,4,7,8,9,26,27,28,12,16]) : void 0, import.meta.url),
  "./src/widget/Widget.stories.tsx": async () => __vitePreload(() => import("./Widget.stories--MFyAWji.js"), true ? __vite__mapDeps([66,1,2,3,13,6,5,14,15,12,16,25,4,7,8,9,26,27,28,43,44]) : void 0, import.meta.url)
};
async function importFn(path) {
  return importers[path]();
}
const { composeConfigs, PreviewWeb, ClientApi } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async () => {
  const configs = await Promise.all([
    __vitePreload(() => import("./entry-preview-Q_sJ3nah.js"), true ? __vite__mapDeps([67,2,3,68,6]) : void 0, import.meta.url),
    __vitePreload(() => import("./entry-preview-docs-DKawCtck.js"), true ? __vite__mapDeps([69,8,3,14,9,2]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-Ckll7LWR.js"), true ? __vite__mapDeps([70,7]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-CQuDNnvn.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-39qbk_x8.js"), true ? __vite__mapDeps([71,44,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-bL4x2zrN.js"), true ? __vite__mapDeps([72,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-BeQelhbu.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-3kSipVgK.js"), true ? __vite__mapDeps([73,9]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-B4rAxPmB.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-DY3rZFpy.js"), true ? __vite__mapDeps([74,3]) : void 0, import.meta.url),
    __vitePreload(() => import("./preview-CQOcE4HF.js"), true ? __vite__mapDeps([75,27,1,2,3,53]) : void 0, import.meta.url)
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
