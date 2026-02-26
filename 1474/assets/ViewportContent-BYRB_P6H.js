import { r as reactExports } from "./iframe-MZ9GDAUV.js";
import { U as UiFramework, m as IModelApp, V as ViewportComponent, n as DefaultViewOverlay } from "./appui-react-CxqBCL1K.js";
import "./Key.enum-BlUwKc_n.js";
function ViewportContent({ contentId, imodel, viewState, renderViewOverlay }) {
  let [iModel] = reactExports.useState(UiFramework.getIModelConnection());
  const [defaultViewState] = reactExports.useState(UiFramework.getDefaultViewState());
  const [viewport, setViewport] = reactExports.useState(void 0);
  const viewportRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    return IModelApp.viewManager.onSelectedViewportChanged.addListener((selectedViewport) => {
      if (!viewportRef.current)
        return;
      if (selectedViewport.current === viewportRef.current)
        return;
      const activeContentId = UiFramework.content.getActiveId();
      if (activeContentId !== contentId)
        return;
      void IModelApp.viewManager.setSelectedView(viewportRef.current);
    });
  }, [contentId, viewport]);
  iModel = imodel ?? iModel;
  viewState = viewState ?? defaultViewState;
  if (!iModel)
    return null;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(ViewportComponent, { viewState, imodel: iModel, viewportRef: (v) => {
      viewportRef.current = v;
      setViewport(v);
    } }),
    reactExports.createElement(ViewOverlayRenderer, { viewport, renderViewOverlay })
  );
}
function ViewOverlayRenderer({ viewport, renderViewOverlay }) {
  if (!viewport)
    return null;
  if (renderViewOverlay) {
    return renderViewOverlay(viewport);
  }
  return reactExports.createElement(DefaultViewOverlay, { viewport, analysisTimeline: true, solarTimeline: true, scheduleAnimation: true });
}
export {
  ViewportContent as V
};
