import { r as PrimitiveTool } from "./appui-react-DQI_0K9M.js";
import "./Key.enum-COMa1JTT.js";
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
