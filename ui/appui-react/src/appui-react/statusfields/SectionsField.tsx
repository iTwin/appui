/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import { SectionTool } from "../icons/SectionTool.js";
import {
  IModelApp,
  ViewClipClearTool,
  ViewClipDecoration,
  ViewClipDecorationProvider,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { Button, IconButton, ToggleSwitch } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { useActiveViewport } from "../hooks/useActiveViewport.js";
import { StatusBarDialog } from "../statusbar/dialog/Dialog.js";
import "./SectionsField.scss";
import { useTranslation } from "../hooks/useTranslation.js";
import { StatusBarPopover } from "../statusbar/popup/StatusBarPopover.js";

/** Sections Status Field Props
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface SectionsStatusFieldProps extends CommonProps {
  hideWhenUnused?: boolean;
}

/** Status Field for showing section extra tools for clearing and showing manipulators
 * @beta
 */
export function SectionsStatusField(props: SectionsStatusFieldProps) {
  const { translate } = useTranslation();
  const tooltip = translate("tools.sectionTools");

  const activeViewport = useActiveViewport();
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [hasManipulatorsShown, setHasManipulatorsShown] = React.useState(false);

  React.useEffect(() => {
    const clipActive = !!activeViewport && !!activeViewport.view.getViewClip();
    setShowIndicator(clipActive || !props.hideWhenUnused);
    setHasManipulatorsShown(
      clipActive && !!activeViewport && !!ViewClipDecoration.get(activeViewport)
    );

    return ViewClipDecorationProvider.create().onActiveClipChanged.addListener(
      (viewport) => {
        if (viewport !== activeViewport) return;

        setHasManipulatorsShown(!!ViewClipDecoration.get(activeViewport));
        const isClipActive = !!activeViewport.view.getViewClip();
        setShowIndicator(isClipActive || !props.hideWhenUnused);
      }
    );
  }, [activeViewport, props.hideWhenUnused, isPopupOpen]);

  const toggleManipulators = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeViewport) {
      setHasManipulatorsShown(e.target.checked);
      await ViewClipDecorationProvider.create().toggleDecoration(
        activeViewport
      );
    }
  };

  const handleClear = async () => {
    await IModelApp.tools.run(
      ViewClipClearTool.toolId,
      ViewClipDecorationProvider.create()
    );
    setPopupOpen(false);
  };

  return (
    <>
      {showIndicator && (
        <StatusBarPopover
          visible={isPopupOpen}
          onVisibleChange={setPopupOpen}
          content={
            <StatusBarDialog
              titleBar={<StatusBarDialog.TitleBar title={tooltip} />}
            >
              <div className="uifw-sections-footer-contents">
                <Button onClick={handleClear}>
                  {translate("tools.sectionClear")}
                </Button>
                <div className="uifw-uifw-sections-toggle-container">
                  <div className={classnames("uifw-sections-label")}>
                    {translate("tools.sectionShowHandles")}
                  </div>
                  <ToggleSwitch
                    className="uifw-sections-toggle"
                    onChange={toggleManipulators}
                    checked={hasManipulatorsShown}
                  />
                </div>
              </div>
            </StatusBarDialog>
          }
        >
          <IconButton
            label={tooltip}
            styleType="borderless"
            data-testid="sections-status-field-button"
          >
            {/* eslint-disable-next-line deprecation/deprecation */}
            <Icon iconSpec={<SectionTool />} />
            <StatusBarPopover.ExpandIndicator />
          </IconButton>
        </StatusBarPopover>
      )}
    </>
  );
}
