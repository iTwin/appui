/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import * as React from "react";
import { IModelApp, ScreenViewport } from "@itwin/core-frontend";
import { ViewportComponent, ViewStateProp } from "@itwin/imodel-components-react";
import { FloatingViewportContentControl } from "./ViewportContentControl";
import { ContentWrapper } from "./ContentLayout";
import { useRefs } from "@itwin/core-react";
import { UiFramework } from "../UiFramework";

/**
 * @beta
 */
export interface FloatingViewportContentProps {
  /** callback used to construct context menu when user right-clicks on canvas/viewport */
  onContextMenu?: (e: React.MouseEvent) => boolean;
  /** viewport/content control uniqueId */
  contentId: string;
  /** The initial view state used to create the viewport, or a function that returns it (will refresh when the function changes) */
  initialViewState: ViewStateProp;
  /** Function to get a reference to the ScreenViewport */
  viewportRef?: React.Ref<ScreenViewport>;
}

/** @beta */
export function FloatingViewportContent(props: FloatingViewportContentProps) {
  const { contentId, initialViewState, viewportRef, onContextMenu } = props;
  const { viewState, viewportRef: floatingViewportRef } = useFloatingViewport({
    contentId,
    initialViewState,
  });
  const refs = useRefs(viewportRef, floatingViewportRef);
  return (
    <FloatingViewportContentWrapper>
      <ViewportComponent
        key={contentId}
        imodel={viewState.iModel}
        viewState={viewState}
        controlId={contentId}
        onContextMenu={onContextMenu}
        viewportRef={refs}
      />
    </FloatingViewportContentWrapper>
  );
}

/** @alpha */
export interface FloatingViewportContentWrapperProps {
  readonly children?: React.ReactNode;
}

/** @alpha */
export function FloatingViewportContentWrapper({ children }: FloatingViewportContentWrapperProps) {
  return (
    <div onMouseMove={UiFramework.visibility.handleContentMouseMove} className="uifw-dialog-imodel-content" style={{ height: "100%", position: "relative" }}>
      <ContentWrapper content={children} style={{ height: "100%", position: "relative" }} />
    </div>
  );
}

/** @alpha */
export interface UseFloatingViewportArgs {
  /** viewport/content control uniqueId */
  contentId: string;
  /** The initial view state used to create the viewport, or a function that returns it (will refresh when the function changes) */
  initialViewState: ViewStateProp;
}

/** @alpha */
export function useFloatingViewport(args: UseFloatingViewportArgs) {
  const { contentId, initialViewState } = args;
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>();
  const contentControl = React.useRef<FloatingViewportContentControl | undefined>();

  const viewState = React.useMemo(() => typeof initialViewState === "function" ? initialViewState() : initialViewState, [initialViewState]);
  const viewportRef = React.useCallback((v: ScreenViewport) => {
    setViewport(v);
  }, []);

  React.useEffect(() => {
    if (!contentControl.current) {
      contentControl.current = new FloatingViewportContentControl(contentId, contentId, null);
      UiFramework.content.addFloatingContentControl(contentControl.current);
    }
    return () => {
      if (contentControl.current) {
        UiFramework.content.dropFloatingContentControl(contentControl.current);
        contentControl.current = undefined;
      }
    };
  }, [contentId]);

  React.useEffect(() => {
    if (viewport && contentControl.current) {
      contentControl.current.viewport = viewport;
      void contentControl.current.viewport.changeView(viewState);
    }
  }, [viewState, viewport]);

  React.useEffect(() => {
    const onViewClose = (vp: ScreenViewport) => {
      if (contentControl.current?.viewport === vp) {
        UiFramework.content.dropFloatingContentControl(contentControl.current);
        contentControl.current = undefined;
      }
    };
    return IModelApp.viewManager.onViewClose.addListener(onViewClose);
  }, []);

  return {
    viewportRef,
    viewState,
  };
}
