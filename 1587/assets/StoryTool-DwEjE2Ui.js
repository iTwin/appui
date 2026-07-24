import { l as PrimitiveTool } from "./appui-react-BtU_mNFj.js";
import "./Key.enum-DCghlnp9.js";
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
