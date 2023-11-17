/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./SectionsField.scss";
import classnames from "classnames";
import * as React from "react";
import { Dialog, FooterPopup, TitleBar } from "@itwin/appui-layout-react";
import type { ClipEventType, Viewport } from "@itwin/core-frontend";
import {
  IModelApp,
  ViewClipClearTool,
  ViewClipDecoration,
  ViewClipDecorationProvider,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { Button, ToggleSwitch } from "@itwin/itwinui-react";
import { useActiveViewport } from "../hooks/useActiveViewport";
import { UiFramework } from "../UiFramework";
import { StatusBarLabelIndicator } from "../statusbar/LabelIndicator";
import svgSectionTool from "@bentley/icons-generic/icons/section-tool.svg";

/** Sections Status Field Props
 * @beta
 */
export interface SectionsStatusFieldProps extends CommonProps {
  hideWhenUnused?: boolean;
}

/** Status Field for showing section extra tools for clearing and showing manipulators
 * @beta
 */
export function SectionsStatusField(props: SectionsStatusFieldProps) {
  const [toolTip, clearLabel, showHandlesLabel] = React.useMemo(
    () => [
      UiFramework.translate("tools.sectionTools"),
      UiFramework.translate("tools.sectionClear"),
      UiFramework.translate("tools.sectionShowHandles"),
    ],
    []
  );
  const activeViewport = useActiveViewport();
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const targetDiv = React.useRef<HTMLDivElement>(null);
  const classes = showIndicator ? "uifw-field-fade-in" : "uifw-field-fade-out";
  const [hasManipulatorsShown, setHasManipulatorsShown] = React.useState(false);

  React.useEffect(() => {
    // istanbul ignore next
    const onClipChanged = (
      viewport: Viewport,
      _eventType: ClipEventType,
      _provider: ViewClipDecorationProvider
    ) => {
      if (viewport !== activeViewport) return;

      setHasManipulatorsShown(!!ViewClipDecoration.get(activeViewport));
      const isClipActive = !!activeViewport.view.getViewClip();
      setShowIndicator(isClipActive || !props.hideWhenUnused);
    };

    const clipActive =
      !!activeViewport &&
      /* istanbul ignore next */ !!activeViewport.view.getViewClip();
    setShowIndicator(clipActive || !props.hideWhenUnused);
    setHasManipulatorsShown(
      clipActive &&
        /* istanbul ignore next */ !!activeViewport &&
        /* istanbul ignore next */ !!ViewClipDecoration.get(activeViewport)
    );

    ViewClipDecorationProvider.create().onActiveClipChanged.addListener(
      onClipChanged
    );
    return () => {
      // Get or create static ViewClipDecorationProvider
      ViewClipDecorationProvider.create().onActiveClipChanged.removeListener(
        onClipChanged
      );
    };
  }, [activeViewport, props.hideWhenUnused, isPopupOpen]);

  // istanbul ignore next
  const toggleManipulators = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeViewport) {
      setHasManipulatorsShown(e.target.checked);
      await ViewClipDecorationProvider.create().toggleDecoration(
        activeViewport
      );
    }
  };

  // istanbul ignore next
  const handleClear = async () => {
    await IModelApp.tools.run(
      ViewClipClearTool.toolId,
      ViewClipDecorationProvider.create()
    );
    setPopupOpen(false);
  };

  return (
    <div className="uifw-section-footer-popup-container">
      {showIndicator && (
        <>
          <div ref={targetDiv} title={toolTip}>
            <StatusBarLabelIndicator
              className={classes}
              iconSpec={svgSectionTool}
              onClick={() => setPopupOpen(!isPopupOpen)}
            />
          </div>
          <FooterPopup
            target={targetDiv.current}
            onClose={() => setPopupOpen(false)}
            isOpen={isPopupOpen}
          >
            <Dialog titleBar={<TitleBar title={toolTip} />}>
              <div className="uifw-sections-footer-contents">
                <Button onClick={handleClear}>{clearLabel}</Button>
                <div className="uifw-uifw-sections-toggle-container">
                  <div className={classnames("uifw-sections-label")}>
                    {showHandlesLabel}
                  </div>
                  <ToggleSwitch
                    className="uifw-sections-toggle"
                    onChange={toggleManipulators}
                    checked={hasManipulatorsShown}
                  />
                </div>
              </div>
            </Dialog>
          </FooterPopup>
        </>
      )}
    </div>
  );
}
