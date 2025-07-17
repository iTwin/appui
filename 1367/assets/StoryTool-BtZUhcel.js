import { y as PrimitiveTool } from "./appui-react-DM43Y0g2.js";
import "./Key.enum-xgF-LmbB.js";
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
