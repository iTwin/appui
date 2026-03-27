import { q as PrimitiveTool } from "./appui-react-k-E-MyO7.js";
import "./Key.enum-D6GPPVF7.js";
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
