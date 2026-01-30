import { r as PrimitiveTool } from "./appui-react-CuxmpMO6.js";
import "./Key.enum-OlB0m7Wi.js";
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
