import { q as PrimitiveTool } from "./appui-react-CwKstaKu.js";
import "./Key.enum-szt-ThaG.js";
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
