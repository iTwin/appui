import { x as PrimitiveTool } from "./appui-react-CvaqSdj1.js";
import "./Key.enum-D5EC_Md2.js";
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
