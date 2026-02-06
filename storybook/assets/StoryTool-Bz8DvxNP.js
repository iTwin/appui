import { r as PrimitiveTool } from "./appui-react-DgImBujK.js";
import "./Key.enum-DiqAEzk8.js";
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
