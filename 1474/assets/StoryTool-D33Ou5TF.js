import { r as PrimitiveTool } from "./appui-react-CxqBCL1K.js";
import "./Key.enum-BlUwKc_n.js";
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
