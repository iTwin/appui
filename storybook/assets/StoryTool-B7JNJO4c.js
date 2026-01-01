import { r as PrimitiveTool } from "./appui-react-Cz4Q9cY4.js";
import "./Key.enum-DpqfsKm8.js";
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
