import { r as PrimitiveTool } from "./appui-react-CRWgJbNo.js";
import "./Key.enum-DQFIldn9.js";
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
