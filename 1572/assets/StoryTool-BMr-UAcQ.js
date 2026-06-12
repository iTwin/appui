import { l as PrimitiveTool } from "./appui-react-D3IO1OPE.js";
import "./Key.enum-xIiRVwX2.js";
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
