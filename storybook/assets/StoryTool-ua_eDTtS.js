import { r as PrimitiveTool } from "./appui-react-DIW3BCK3.js";
import "./Key.enum-Dnr03nyZ.js";
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
