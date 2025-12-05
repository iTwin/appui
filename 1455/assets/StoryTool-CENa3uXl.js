import { r as PrimitiveTool } from "./appui-react-CPCdSJxc.js";
import "./Key.enum-Cu1f0CYO.js";
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
