import { q as PrimitiveTool } from "./appui-react-DXkFctUx.js";
import "./Key.enum-DvCHltQ0.js";
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
