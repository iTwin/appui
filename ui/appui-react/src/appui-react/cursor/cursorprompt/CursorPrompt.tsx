/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./CursorPrompt.scss";
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import { Icon, Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import { Text } from "@itwin/itwinui-react";
import {
  CursorInformation,
  useCursorInformationStore,
} from "../CursorInformation.js";
import { CursorPopupManager } from "../cursorpopup/CursorPopupManager.js";
import { UiFramework } from "../../UiFramework.js";

interface UseCursorPromptArgs {
  show: boolean;
  timeout: number;
  iconSpec: string;
  instruction: string | undefined;
  fadeOut: boolean;
  promptAtContent: boolean;
}

const popupId = "cursor-prompt";
const category = UiFramework.loggerCategory("useCursorPrompt");

/** @internal */
export function useCursorPrompt(args: UseCursorPromptArgs) {
  const { show, timeout, instruction, iconSpec, promptAtContent } = args;
  const lastArgsRef = React.useRef(args);
  React.useEffect(() => {
    lastArgsRef.current = args;
  }, [args]);

  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const timerRef = React.useRef<Timer | undefined>();

  const contentHovered = useCursorInformationStore(
    (state) => state.contentHovered
  );

  const shouldOpen = React.useMemo(() => {
    if (!show) return false;
    if (!isOpen) return false;
    if (promptAtContent && !contentHovered) return false;
    return true;
  }, [show, isOpen, promptAtContent, contentHovered]);

  React.useEffect(() => {
    if (timeout === Number.POSITIVE_INFINITY) return;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const timer = new Timer(timeout);
    timer.setOnExecute(() => {
      Logger.logTrace(category, "timer expired");
      setIsOpen(false);
    });
    timer.delay = timeout;
    timerRef.current = timer;
    return () => {
      timer.stop();
    };
  }, [timeout]);
  React.useEffect(() => {
    if (!shouldOpen) return;
    if (!instruction) return;

    Logger.logTrace(category, "open");
    CursorPopupManager.open(
      popupId,
      <CursorPrompt iconSpec={iconSpec} instruction={instruction} />,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      RelativePosition.BottomRight,
      0,
      { shadow: true },
      CursorInformation.cursorDocument
    );
    return () => {
      Logger.logTrace(category, "close");
      CursorPopupManager.close(popupId, false, lastArgsRef.current.fadeOut);
    };
  }, [shouldOpen, instruction, iconSpec]);
  React.useEffect(() => {
    return CursorInformation.onCursorUpdatedEvent.addListener((args) => {
      CursorPopupManager.updatePosition(
        args.newPt,
        CursorInformation.cursorDocument
      );
    });
  }, []);

  const open = React.useCallback(() => {
    Logger.logTrace(category, "request open");
    setIsOpen(true);
    timerRef.current?.start();
  }, []);

  return { open };
}

function CursorPrompt({
  iconSpec,
  instruction,
}: {
  iconSpec: string;
  instruction: string;
}) {
  return (
    <div className="uifw-cursor-prompt">
      {iconSpec && (
        <span className="uifw-cursor-prompt-icon">
          {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
          <Icon iconSpec={iconSpec} />
        </span>
      )}
      <Text variant="body" className="uifw-cursor-prompt-text">
        {instruction}
      </Text>
    </div>
  );
}
