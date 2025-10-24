import { x as PrimitiveTool } from "./appui-react-CLN8J6gc.js";
import "./Key.enum-bWQ0azWJ.js";
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
