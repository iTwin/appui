import { r as PrimitiveTool } from "./appui-react-glMK-yaN.js";
import "./Key.enum-YmMvjtrc.js";
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
