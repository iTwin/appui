import { l as PrimitiveTool } from "./appui-react-B0bJ_Skp.js";
import "./Key.enum-D1Zc0n-Y.js";
class StoryPrimitiveTool extends PrimitiveTool {
  requireWriteableTarget() {
    return false;
  }
  onRestartTool() {
    return this.exitTool();
  }
}
export {
  StoryPrimitiveTool as S
};
