import { j as jsxRuntimeExports, I as IconButton } from "./iframe-CLuD2P-S.js";
import { g as SvgPause, h as SvgPlay } from "./appui-react-CCwsTewB.js";
import { u as useTranslation } from "./useTranslation-KJMDb-JM.js";
function PlayButton({ isPlaying, onPlay, onPause }) {
  const { translate } = useTranslation();
  const label = translate(isPlaying ? "timeline.pause" : "timeline.play");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      styleType: "borderless",
      label,
      onClick: () => {
        if (isPlaying) {
          onPause == null ? void 0 : onPause();
          return;
        }
        onPlay == null ? void 0 : onPlay();
      },
      children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlay, {})
    }
  );
}
PlayButton.__docgenInfo = { "description": "Play/pause button used in timeline components.\n@internal", "methods": [], "displayName": "PlayButton", "props": { "isPlaying": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onPlay": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onPause": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } } };
export {
  PlayButton as P
};
