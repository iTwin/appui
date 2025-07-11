import { w as PrimitiveTool } from "./appui-react-Dl7Zotdf.js";
import "./Dialog-D8X5n1Ze.js";
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
