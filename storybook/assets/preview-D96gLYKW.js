function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./DocsRenderer-NNNQARDV-DegUdxQG.js","./iframe-vMT8xG5O.js","./index-DM9bPmif.js","./_commonjsHelpers-LQfde5yM.js","./react-18-wiUuDfWn.js","./index-EDRsojbr.js","./index-_WnuOxD8.js","./getPrototypeOf-BiGzxcdS.js","./index-Cp4dr_sK.js","./inheritsLoose-CwB_PDSN.js","./index-ex9_VrIg.js","./index-BdOSk9or.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import { _ as __vitePreload } from "./iframe-vMT8xG5O.js";
import "../sb-preview/runtime.js";
var parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-NNNQARDV-DegUdxQG.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url);
  return new DocsRenderer();
} } };
export {
  parameters
};
