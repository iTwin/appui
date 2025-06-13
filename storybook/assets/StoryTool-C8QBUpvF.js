import { w as PrimitiveTool } from "./appui-react-Cn73l-Bp.js";
import "./Key.enum-jv_2YNFv.js";
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
