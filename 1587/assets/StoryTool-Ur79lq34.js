import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { Hn as PrimitiveTool, Sn as init_core_frontend } from "./appui-react-CMpxCalk.js";
//#region src/tools/StoryTool.ts
var StoryPrimitiveTool;
var init_StoryTool = __esmMin((() => {
	init_core_frontend();
	StoryPrimitiveTool = class extends PrimitiveTool {
		requireWriteableTarget() {
			return false;
		}
		onRestartTool() {
			return this.exitTool();
		}
	};
}));
//#endregion
export { init_StoryTool as n, StoryPrimitiveTool as t };
