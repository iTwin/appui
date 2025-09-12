import { w as PrimitiveTool } from "./appui-react-J8mIGY7J.js";
import "./Key.enum-BlhmG3rp.js";
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
