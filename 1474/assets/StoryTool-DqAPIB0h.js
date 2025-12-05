import { r as PrimitiveTool } from "./appui-react-WePxyzLf.js";
import "./Key.enum-MqV3Iuz-.js";
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
