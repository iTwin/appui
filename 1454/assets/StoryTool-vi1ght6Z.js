import { r as PrimitiveTool } from "./appui-react-nLGuzzO4.js";
import "./Key.enum-C6kR_Rex.js";
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
