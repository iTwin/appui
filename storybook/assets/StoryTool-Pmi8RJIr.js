import { w as PrimitiveTool } from "./appui-react-CJ4WPLAk.js";
import "./Key.enum-IWU58BJQ.js";
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
