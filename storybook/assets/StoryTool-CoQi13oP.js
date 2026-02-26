import { r as PrimitiveTool } from "./appui-react-CEufDDhs.js";
import "./Key.enum-CnwI7CFN.js";
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
