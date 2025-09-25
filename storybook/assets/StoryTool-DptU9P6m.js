import { w as PrimitiveTool } from "./appui-react-BJc9EwXU.js";
import "./Key.enum-BDsF8giz.js";
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
