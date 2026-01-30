import { r as PrimitiveTool } from "./appui-react-vckN5W79.js";
import "./Key.enum-DJvycrum.js";
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
