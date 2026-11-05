import { n as __esmMin } from "./rolldown-runtime-BdGkqNEt.js";
import { Mn as init_core_frontend, tr as PrimitiveTool } from "./appui-react-BuxNaod2.js";
//#region src/tools/StoryTool.ts
var StoryPrimitiveTool;
function init_StoryTool() {
	return (init_StoryTool = __esmMin((() => {
		init_core_frontend();
		StoryPrimitiveTool = class extends PrimitiveTool {
			requireWriteableTarget() {
				return false;
			}
			onRestartTool() {
				return this.exitTool();
			}
		};
	})))();
}
//#endregion
export { init_StoryTool as n, StoryPrimitiveTool as t };
