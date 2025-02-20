/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import { Icon as CoreIcon } from "@itwin/core-react";
import { Badge } from "@itwin/core-react/internal";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { useActiveFrontstageId } from "../frontstage/FrontstageDef.js";
import { BackstageItem as NZ_BackstageItem } from "../layout/backstage/Item.js";
import { isProviderItem } from "../ui-items-provider/isProviderItem.js";
import type {
  BackstageActionItem,
  BackstageItem,
  BackstageStageLauncher,
  CommonBackstageItem,
} from "./BackstageItem.js";
import { isBackstageStageLauncher } from "./BackstageItem.js";
import { useBackstageManager } from "./BackstageManager.js";
import { Icon } from "@itwin/itwinui-react";

/** @internal */
export interface BackstageComposerActionItemProps {
  readonly item: BackstageActionItem;
}

/** @internal */
export function BackstageComposerActionItem({
  item,
}: BackstageComposerActionItemProps) {
  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    item.execute();
  }, [manager, item]);
  return (
    <NZ_BackstageItem
      itemId={item.id}
      providerId={isProviderItem(item) ? item.providerId : undefined}
      itemPriority={item.itemPriority}
      groupPriority={item.groupPriority}
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      icon={<ItemIcon iconNode={item.iconNode} icon={item.icon} />}
      isActive={ConditionalBooleanValue.getValue(item.isActive)}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      onClick={handleClick}
      subtitle={ConditionalStringValue.getValue(item.subtitle)}
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      badge={<Badge type={item.badgeKind || item.badge} />}
    >
      {ConditionalStringValue.getValue(item.label)}
    </NZ_BackstageItem>
  );
}

/** @internal */
export interface BackstageComposerStageLauncherProps {
  readonly item: BackstageStageLauncher;
}

/** @internal */
export function BackstageComposerStageLauncher({
  item,
}: BackstageComposerStageLauncherProps) {
  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    if (!UiFramework.frontstages.hasFrontstage(item.stageId))
      return Logger.logError(
        "BackstageComposerStageLauncher",
        `Frontstage with id '${item.stageId}' not found`
      );
    void UiFramework.frontstages.setActiveFrontstage(item.stageId);
  }, [manager, item.stageId]);
  const activeFrontstageId = useActiveFrontstageId();
  const isActive = ConditionalBooleanValue.getValue(
    item.isActive ?? item.stageId === activeFrontstageId
  );
  return (
    <NZ_BackstageItem
      itemId={item.id}
      providerId={isProviderItem(item) ? item.providerId : undefined}
      itemPriority={item.itemPriority}
      groupPriority={item.groupPriority}
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      icon={<ItemIcon iconNode={item.iconNode} icon={item.icon} />}
      isActive={isActive}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      onClick={handleClick}
      subtitle={ConditionalStringValue.getValue(item.subtitle)}
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      badge={<Badge type={item.badgeKind || item.badge} />}
    >
      {ConditionalStringValue.getValue(item.label)}
    </NZ_BackstageItem>
  );
}

/** Props of [[BackstageComposerItem]] component.
 * @internal
 */
export interface BackstageComposerItemProps {
  /** Backstage item to render */
  readonly item: BackstageItem;
}

/** Item of [[BackstageComposer]].
 * @internal
 */
export function BackstageComposerItem({ item }: BackstageComposerItemProps) {
  if (isBackstageStageLauncher(item)) {
    return <BackstageComposerStageLauncher item={item} />;
  }
  return <BackstageComposerActionItem item={item} />;
}

function ItemIcon({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  icon,
  iconNode,
}: {
  icon: CommonBackstageItem["icon"];
  iconNode: CommonBackstageItem["iconNode"];
}) {
  if (iconNode) {
    return <Icon>{iconNode}</Icon>;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <CoreIcon iconSpec={icon} />;
}
