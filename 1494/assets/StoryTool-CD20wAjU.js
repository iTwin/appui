import { q as PrimitiveTool } from "./appui-react-DlzUwJvs.js";
import "./Key.enum-DZrcflso.js";
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
