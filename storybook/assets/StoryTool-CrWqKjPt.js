import { r as PrimitiveTool } from "./appui-react-DC9EfscU.js";
import "./Key.enum-BciO7xwH.js";
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
