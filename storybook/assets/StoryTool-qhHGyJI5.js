import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
import { Vn as PrimitiveTool, xn as init_core_frontend } from "./appui-react-CpKk3CrH.js";
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
