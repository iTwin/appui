import { x as PrimitiveTool } from "./appui-react-CNLcJNb9.js";
import "./Key.enum-B-WhjwuV.js";
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
