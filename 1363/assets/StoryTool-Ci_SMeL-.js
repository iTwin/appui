import { w as PrimitiveTool } from "./appui-react-BowZ5tTD.js";
import "./Key.enum-BBhL30hZ.js";
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
