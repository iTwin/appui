import { w as PrimitiveTool } from "./appui-react-DMgRmWeu.js";
import "./Key.enum-DIxXXS_n.js";
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
