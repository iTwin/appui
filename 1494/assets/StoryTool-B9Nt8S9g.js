import { q as PrimitiveTool } from "./appui-react-nOGh2M21.js";
import "./Key.enum-DdwJ-Wkg.js";
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
