const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-CuxcezkH.js","./iframe-VzH-w8ke.js","./index-DDLqOySG.js","./index-CGxIGJ0x.js","./jsx-runtime-CC5-Dj7Q.js","./index-BwI9SQDf.js","./index-DLlB04eo.js","./_commonjs-dynamic-modules-DTCOR0lh.js","./inheritsLoose-HEqISCW8.js","./index-BZDuRpLS.js","./index-BdOSk9or.js","./react-18-CwOcAOSR.js","./client-D6MDPju-.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-VzH-w8ke.js";
import "../sb-preview/runtime.js";
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var excludeTags = Object.entries(global.TAGS_OPTIONS ?? {}).reduce((acc, entry) => {
  let [tag, option] = entry;
  return option.excludeFromDocsStories && (acc[tag] = true), acc;
}, {}), parameters = { docs: { renderer: async () => {
  let { DocsRenderer } = await __vitePreload(() => import("./DocsRenderer-CFRXHY34-CuxcezkH.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0, import.meta.url);
  return new DocsRenderer();
}, stories: { filter: (story) => {
  var _a;
  return (story.tags || []).filter((tag) => excludeTags[tag]).length === 0 && !((_a = story.parameters.docs) == null ? void 0 : _a.disable);
} } } };
export {
  parameters
};
