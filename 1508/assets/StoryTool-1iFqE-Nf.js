import { r as PrimitiveTool } from "./appui-react-B7iNJbV5.js";
import "./Key.enum-B3pThNWo.js";
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
