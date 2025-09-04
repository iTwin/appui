import { w as PrimitiveTool } from "./appui-react-DY_MpVZu.js";
import "./Key.enum-CmhcI3db.js";
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
