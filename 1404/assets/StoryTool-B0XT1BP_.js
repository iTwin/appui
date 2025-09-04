import { w as PrimitiveTool } from "./appui-react-DH8at8DD.js";
import "./Key.enum-oRjsNWTu.js";
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
