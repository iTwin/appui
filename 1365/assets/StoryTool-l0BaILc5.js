import { w as PrimitiveTool } from "./appui-react-Bkdl7eTp.js";
import "./Key.enum-D8YSRJHT.js";
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
