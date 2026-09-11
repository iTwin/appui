import { q as PrimitiveTool } from "./appui-react-CRF-9igQ.js";
import "./Key.enum-DEi28OI6.js";
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
