/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import * as React from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { ViewStateProp } from "@itwin/imodel-components-react";
import { ViewportComponent } from "@itwin/imodel-components-react";
import { FloatingViewportContentControl } from "./ViewportContentControl";
import { ContentWrapper } from "./ContentLayout";
import { UiFramework } from "../UiFramework";
import { useRefs } from "@itwin/core-react";

/* eslint-disable deprecation/deprecation */

/**
 * @beta
 * @deprecated in 4.15.0. TODO
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

/**
 * @beta
 * @deprecated in 4.15.0. TODO
 */
export function FloatingViewportContent(props: FloatingViewportContentProps) {
  const { viewportControl } = useFloatingViewport(props);
  return (
    <FloatingViewportContentWrapper>
      {viewportControl}
    </FloatingViewportContentWrapper>
  );
}

/**
 * @public
 * @deprecated in 4.15.0. TODO
 */
export interface FloatingViewportContentWrapperProps {
  readonly children?: React.ReactNode;
}

/**
 * @public
 * @deprecated in 4.15.0. TODO
 */
export function FloatingViewportContentWrapper({
  children,
}: FloatingViewportContentWrapperProps) {
  return (
    <div
      onMouseMove={UiFramework.visibility.handleContentMouseMove}
      className="uifw-dialog-imodel-content"
      style={{ height: "100%", position: "relative" }}
    >
      <ContentWrapper
        content={children}
        style={{ height: "100%", position: "relative" }}
      />
    </div>
  );
}

/**
 * @alpha
 * @deprecated in 4.15.0. TODO
 */
export function useFloatingViewport(args: FloatingViewportContentProps) {
  const { contentId, initialViewState, onContextMenu, viewportRef } = args;
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>();
  const contentControl = React.useRef<
    // eslint-disable-next-line deprecation/deprecation
    FloatingViewportContentControl | undefined
  >();

  const viewState = React.useMemo(
    () =>
      typeof initialViewState === "function"
        ? initialViewState()
        : initialViewState,
    [initialViewState]
  );
  const ref = React.useCallback((v: ScreenViewport) => {
    setViewport(v);
  }, []);

  const refs = useRefs(ref, viewportRef);
  const viewportControl = React.useMemo(() => {
    const node = (
      <ViewportComponent
        key={contentId}
        imodel={viewState.iModel}
        viewState={viewState}
        controlId={contentId}
        onContextMenu={onContextMenu}
        viewportRef={refs}
      />
    );
    return node;
  }, [refs, onContextMenu, viewState, contentId]);

  React.useEffect(() => {
    if (!contentControl.current) {
      // eslint-disable-next-line deprecation/deprecation
      contentControl.current = new FloatingViewportContentControl(
        contentId,
        contentId,
        null
      );
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.content.addFloatingContentControl(contentControl.current);
    }
    return () => {
      if (contentControl.current) {
        // eslint-disable-next-line deprecation/deprecation
        UiFramework.content.dropFloatingContentControl(contentControl.current);
        contentControl.current = undefined;
      }
    };
  }, [contentId]);

  React.useEffect(() => {
    if (viewport && contentControl.current) {
      contentControl.current.viewport = viewport;
      if (null === contentControl.current.reactNode) {
        contentControl.current.reactNode = viewportControl;
      }
    }
  }, [viewport, viewportControl]);

  React.useEffect(() => {
    return IModelApp.viewManager.onViewClose.addListener((vp) => {
      if (contentControl.current?.viewport === vp) {
        // eslint-disable-next-line deprecation/deprecation
        UiFramework.content.dropFloatingContentControl(contentControl.current);
        contentControl.current = undefined;
      }
    });
  }, []);

  return {
    viewportControl,
  };
}
