import { q as PrimitiveTool } from "./appui-react-D6ABwSZ-.js";
import "./Key.enum-BiZltsZP.js";
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
