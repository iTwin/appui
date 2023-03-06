/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
const w: Widget = {
  id: "w-1",
  badgeType: BadgeType.New,
  label: "Widget 1",
  getWidgetContent: () => <WidgetContent />,
  onWidgetStateChanged: () => { },
  saveTransientState: () => { },
  restoreTransientState: () => { },
  allowedPanelTargets: ["left", "right"],
};
