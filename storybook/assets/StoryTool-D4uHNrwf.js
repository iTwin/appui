import { w as PrimitiveTool } from "./appui-react-BhnF3Zrq.js";
import "./Dialog-DI2PG4iL.js";
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
