/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import {
  AccuDrawChangeModeTool,
  AccuDrawRotateAxesTool,
  AccuDrawRotateCycleTool,
  AccuDrawRotateElementTool,
  AccuDrawRotateFrontTool,
  AccuDrawRotateSideTool,
  AccuDrawRotateTopTool,
  AccuDrawRotateViewTool,
  AccuDrawSetLockAngleTool,
  AccuDrawSetLockDistanceTool,
  AccuDrawSetLockSmartTool,
  AccuDrawSetLockXTool,
  AccuDrawSetLockYTool,
  AccuDrawSetLockZTool,
  AccuDrawSetOriginTool,
} from "@itwin/core-frontend";
import { FrameworkAccuDraw } from "./FrameworkAccuDraw.js";
import { BumpToolSetting } from "../tools/ToolSettingsTools.js";
import type { KeyboardShortcutProps } from "../keyboardshortcut/KeyboardShortcutProps.js";
import { KeyboardShortcutUtilities } from "../keyboardshortcut/KeyboardShortcutUtilities.js";

/** Default AccuDraw Keyboard Shortcuts
 *
 * Expected to be used with [[UiFramework.keyboardShortcuts]].
 *
 * ```ts
 * UiFramework.keyboardShortcuts.loadShortcuts(
 *   AccuDrawKeyboardShortcuts.getDefaultShortcuts()
 * );
 * ```
 * @public
 */
export class AccuDrawKeyboardShortcuts {
  /** Get default AccuDraw Keyboard Shortcuts list.
   */
  public static getDefaultShortcuts(): KeyboardShortcutProps[] {
    const keyboardShortcutList: KeyboardShortcutProps[] = [
      {
        key: "a",
        labelKey: "UiFramework:accuDraw.subMenu",
        shortcuts: [
          KeyboardShortcutUtilities.createForTool(
            "s",
            AccuDrawSetLockSmartTool
          ),
          KeyboardShortcutUtilities.createForTool("r", AccuDrawSetOriginTool),
          KeyboardShortcutUtilities.createForTool("t", AccuDrawChangeModeTool),
          KeyboardShortcutUtilities.createForTool("x", AccuDrawSetLockXTool, {
            isHidden: FrameworkAccuDraw.isPolarModeConditional,
          }),
          KeyboardShortcutUtilities.createForTool("y", AccuDrawSetLockYTool, {
            isHidden: FrameworkAccuDraw.isPolarModeConditional,
          }),
          KeyboardShortcutUtilities.createForTool("z", AccuDrawSetLockZTool, {
            isHidden: FrameworkAccuDraw.isPolarModeConditional,
          }),
          KeyboardShortcutUtilities.createForTool(
            "a",
            AccuDrawSetLockAngleTool,
            {
              isHidden: FrameworkAccuDraw.isRectangularModeConditional,
            }
          ),
          KeyboardShortcutUtilities.createForTool(
            "d",
            AccuDrawSetLockDistanceTool,
            {
              isHidden: FrameworkAccuDraw.isRectangularModeConditional,
            }
          ),
          KeyboardShortcutUtilities.createForTool("b", BumpToolSetting),
        ],
      },
      {
        key: "r",
        labelKey: "UiFramework:accuDraw.rotateSubMenu",
        shortcuts: [
          KeyboardShortcutUtilities.createForTool("t", AccuDrawRotateTopTool, {
            isDisabled: FrameworkAccuDraw.isTopRotationConditional,
          }),
          KeyboardShortcutUtilities.createForTool("s", AccuDrawRotateSideTool, {
            isDisabled: FrameworkAccuDraw.isSideRotationConditional,
          }),
          KeyboardShortcutUtilities.createForTool(
            "f",
            AccuDrawRotateFrontTool,
            {
              isDisabled: FrameworkAccuDraw.isFrontRotationConditional,
            }
          ),
          KeyboardShortcutUtilities.createForTool("v", AccuDrawRotateViewTool, {
            isDisabled: FrameworkAccuDraw.isViewRotationConditional,
          }),
          KeyboardShortcutUtilities.createForTool("c", AccuDrawRotateCycleTool),
          KeyboardShortcutUtilities.createForTool("a", AccuDrawRotateAxesTool),
          KeyboardShortcutUtilities.createForTool(
            "e",
            AccuDrawRotateElementTool
          ),
        ],
      },
    ];

    return keyboardShortcutList;
  }
}
