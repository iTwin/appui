import { w as PrimitiveTool } from "./appui-react-BkfSqS8X.js";
import "./Dialog-DgXpX9Dj.js";
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
