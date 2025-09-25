import { w as PrimitiveTool } from "./appui-react-B5el9kXP.js";
import "./Key.enum-D1wYTD-A.js";
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
