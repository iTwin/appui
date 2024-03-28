function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./DocsRenderer-NNNQARDV-DBB55Rwf.js","./iframe-DDgUOPmj.js","./index-DlkhCVTf.js","./_commonjsHelpers-LQfde5yM.js","./react-16-CTl29GW6.js","./index-Cm_5MPU1.js","./index-Dr-11776.js","./getPrototypeOf-BmmMfuHC.js","./index-Cp4dr_sK.js","./index-ex9_VrIg.js","./index-BdOSk9or.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import { _ as __vitePreload } from "./iframe-DDgUOPmj.js";
import "../sb-preview/runtime.js";
var parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-NNNQARDV-DBB55Rwf.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0, import.meta.url);
  return new DocsRenderer();
} } };
export {
  parameters
};
