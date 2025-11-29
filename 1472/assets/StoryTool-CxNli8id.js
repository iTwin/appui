import { r as PrimitiveTool } from "./appui-react-B4QxuTrb.js";
import "./Key.enum-CJ9HrJPR.js";
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
