import { r as PrimitiveTool } from "./appui-react-C_1Z-tb4.js";
import "./Key.enum-D-1rx8MU.js";
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
