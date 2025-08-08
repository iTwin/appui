import { w as PrimitiveTool } from "./appui-react-If8DduuN.js";
import "./Key.enum-U_STwKJc.js";
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
