import { r as PrimitiveTool } from "./appui-react-Cc0nytPC.js";
import "./Key.enum-CHcihfJj.js";
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
