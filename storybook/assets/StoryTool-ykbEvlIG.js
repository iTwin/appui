import { w as PrimitiveTool } from "./appui-react-B7LIxGJK.js";
import "./Key.enum-BxJht1U4.js";
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
