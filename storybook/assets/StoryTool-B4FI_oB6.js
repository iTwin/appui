import { w as PrimitiveTool } from "./appui-react-B6-8uygV.js";
import "./Key.enum-C2x9ytFN.js";
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
