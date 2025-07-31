import { y as PrimitiveTool } from "./appui-react-CCwsTewB.js";
import "./Key.enum-CPqlhvPk.js";
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
