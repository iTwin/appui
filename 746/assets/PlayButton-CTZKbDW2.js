import { j as jsxRuntimeExports } from "./jsx-runtime-_iMjpMZ4.js";
import "./index-DlkhCVTf.js";
import { I as IconButton, S as SvgPause, a as SvgPlay } from "./DefaultToolSettingsProvider-BMCl5D3j.js";
import { U as UiIModelComponents } from "./Decorators-B2adf99T.js";
function useTranslation() {
  const translate = (key) => {
    return UiIModelComponents.translate(key);
  };
  return { translate };
}
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
try {
  PlayButton.displayName = "PlayButton";
  PlayButton.__docgenInfo = { "description": "Play/pause button used in timeline components.", "displayName": "PlayButton", "props": { "isPlaying": { "defaultValue": null, "description": "", "name": "isPlaying", "required": true, "type": { "name": "boolean" } }, "onPlay": { "defaultValue": null, "description": "", "name": "onPlay", "required": false, "type": { "name": "(() => void)" } }, "onPause": { "defaultValue": null, "description": "", "name": "onPause", "required": false, "type": { "name": "(() => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
export {
  PlayButton as P,
  useTranslation as u
};
