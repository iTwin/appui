import { w as PrimitiveTool } from "./appui-react-CDe2sd1_.js";
import "./Dialog-BMqOLAkC.js";
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
