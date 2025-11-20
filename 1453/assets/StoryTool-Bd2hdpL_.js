import { r as PrimitiveTool } from "./appui-react-CmcDt8M8.js";
import "./Key.enum-q6sQ_7Ej.js";
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
