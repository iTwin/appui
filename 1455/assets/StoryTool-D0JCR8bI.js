import { r as PrimitiveTool } from "./appui-react-C03ZSW7W.js";
import "./Key.enum-vvj7KXZL.js";
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
