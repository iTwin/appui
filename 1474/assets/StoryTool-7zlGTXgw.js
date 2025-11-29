import { r as PrimitiveTool } from "./appui-react-C9QUNdjL.js";
import "./Key.enum-B-HWoSA2.js";
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
