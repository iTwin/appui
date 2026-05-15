import { l as PrimitiveTool } from "./appui-react-DQPnIqIU.js";
import "./Key.enum-DxiaZ4K2.js";
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
