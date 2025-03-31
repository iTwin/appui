/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import { UiFramework } from "@itwin/appui-react";
import { AppUiStory } from "../AppUiStory";

type ShowToolbarParams = Parameters<typeof UiFramework.showToolbar>;

export interface CardPopupStoryProps {
  title?: string;
  toolbarProps: ShowToolbarParams[0];
  location: ShowToolbarParams[1];
  offset: ShowToolbarParams[2];
  placement: ShowToolbarParams[5];
}

/** [showCard](https://www.itwinjs.org/reference/appui-react/admin/frameworkuiadmin/showcard/) API can be used to show a card-at-cursor popup. */
export function ToolbarPopupStory({
  toolbarProps,
  location,
  offset,
  placement,
}: CardPopupStoryProps) {
  return (
    <AppUiStory
      onInitialize={async () => {
        UiFramework.showToolbar(
          toolbarProps,
          location,
          offset,
          action("onItemExecuted"),
          action("onCancel"),
          placement
        );
      }}
    />
  );
}
