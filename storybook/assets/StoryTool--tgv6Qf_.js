import { w as PrimitiveTool } from "./appui-react-w3-SwpAO.js";
import "./Key.enum-Cpx2vBj7.js";
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
