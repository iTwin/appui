import { w as PrimitiveTool } from "./appui-react-D5aueqJ-.js";
import "./Key.enum-BuPNU8_r.js";
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
