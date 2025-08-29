import { w as PrimitiveTool } from "./appui-react-eiGJk34q.js";
import "./Key.enum-1GsSiffr.js";
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
