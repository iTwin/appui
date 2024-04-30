/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import { UiFramework } from "@itwin/appui-react";
import { Text } from "@itwin/itwinui-react";
import { AppUiStory } from "../AppUiStory";

type ShowCardParams = Parameters<typeof UiFramework.showCard>;

export interface CardPopupStoryProps {
  title?: string;
  toolbarProps: ShowCardParams[2];
  location: ShowCardParams[3];
  offset: ShowCardParams[4];
  placement: ShowCardParams[7];
}

/** [showCard](https://www.itwinjs.org/reference/appui-react/admin/frameworkuiadmin/showcard/) API can be used to show a card-at-cursor popup. */
export function CardPopupStory({
  title,
  toolbarProps,
  location,
  offset,
  placement,
}: CardPopupStoryProps) {
  return (
    <AppUiStory
      onInitialize={async () => {
        UiFramework.showCard(
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 10,
            }}
          >
            <Text isMuted style={{ textAlign: "end" }}>
              Model:
            </Text>
            <Text>A613 V02</Text>
            <Text isMuted style={{ textAlign: "end" }}>
              Category:
            </Text>
            <Text>A-43CB-EZT</Text>
          </div>,
          title,
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
