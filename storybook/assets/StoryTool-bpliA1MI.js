import { w as PrimitiveTool } from "./appui-react-BMIkHgLG.js";
import "./Key.enum-B1r-IJYZ.js";
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
