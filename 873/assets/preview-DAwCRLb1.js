function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./DocsRenderer-NNNQARDV-CXeA1G7K.js","./iframe-WFPHwrkb.js","./index-DM9bPmif.js","./_commonjsHelpers-LQfde5yM.js","./react-18-wiUuDfWn.js","./index-EDRsojbr.js","./index-DcLF_y_E.js","./getPrototypeOf-BiGzxcdS.js","./index-Cp4dr_sK.js","./inheritsLoose-CwB_PDSN.js","./index-ex9_VrIg.js","./index-BdOSk9or.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import { _ as __vitePreload } from "./iframe-WFPHwrkb.js";
import "../sb-preview/runtime.js";
var parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-NNNQARDV-CXeA1G7K.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url);
  return new DocsRenderer();
} } };
export {
  parameters
};
