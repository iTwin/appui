import { r as PrimitiveTool } from "./appui-react-Be32igjM.js";
import "./Key.enum-C7IyTHg1.js";
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
