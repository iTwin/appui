import { r as PrimitiveTool } from "./appui-react-DFr32jNI.js";
import "./Key.enum-CiB4OVGn.js";
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
