import { w as PrimitiveTool } from "./appui-react-BDcfJuOl.js";
import "./Key.enum-BcIdq5Js.js";
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
