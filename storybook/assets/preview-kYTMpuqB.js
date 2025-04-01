const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-z4IhKGGC.js","./iframe-pbfpR55Y.js","./index-R26Bfrts.js","./index-B8O1LG-6.js","./jsx-runtime-f7WWSPSb.js","./index-CHBBkG1-.js","./index-DLlB04eo.js","./_commonjs-dynamic-modules-lq-lihFa.js","./index-Brmgc-W4.js","./index-BdOSk9or.js","./react-18-BJPHa9L5.js","./client-DRUEp2wC.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-pbfpR55Y.js";
import "../sb-preview/runtime.js";
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var excludeTags = Object.entries(global.TAGS_OPTIONS ?? {}).reduce((acc, entry) => {
  let [tag, option] = entry;
  return option.excludeFromDocsStories && (acc[tag] = true), acc;
}, {}), parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-CFRXHY34-z4IhKGGC.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url);
  return new DocsRenderer();
}, stories: { filter: (story) => {
  var _a;
  return (story.tags || []).filter((tag) => excludeTags[tag]).length === 0 && !((_a = story.parameters.docs) == null ? void 0 : _a.disable);
} } } };
export {
  parameters
};
