/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import * as React from "react";
import { Logger } from "@itwin/core-bentley";
import { ConditionalBooleanValue, ConditionalStringValue } from "@itwin/appui-abstract";
import { BadgeUtilities, Icon } from "@itwin/core-react";
import { BackstageItem as NZ_BackstageItem } from "@itwin/appui-layout-react";
import { useBackstageManager } from "./BackstageManager";
import { UiFramework } from "../UiFramework";
import { useActiveFrontstageId } from "../frontstage/FrontstageDef";
import type { BackstageActionItem, BackstageItem, BackstageStageLauncher} from "./BackstageItem";
import { isBackstageStageLauncher } from "./BackstageItem";
import { isProviderItem } from "../ui-items-provider/isProviderItem";

/** @internal */
export interface BackstageComposerActionItemProps {
  readonly item: BackstageActionItem;
}

/** @internal */
export function BackstageComposerActionItem({ item }: BackstageComposerActionItemProps) {
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
      icon={<Icon iconSpec={item.icon} />}
      isActive={ConditionalBooleanValue.getValue(item.isActive)}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      onClick={handleClick}
      subtitle={ConditionalStringValue.getValue(item.subtitle)}
      badge={BadgeUtilities.getComponentForBadgeType(item.badge)}
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
export function BackstageComposerStageLauncher({ item }: BackstageComposerStageLauncherProps) {
  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    if (!UiFramework.frontstages.hasFrontstage(item.stageId))
      return Logger.logError("BackstageComposerStageLauncher", `Frontstage with id '${item.stageId}' not found`);
    void UiFramework.frontstages.setActiveFrontstage(item.stageId);
  }, [manager, item.stageId]);
  const activeFrontstageId = useActiveFrontstageId();
  const isActive = ConditionalBooleanValue.getValue(item.isActive ?? item.stageId === activeFrontstageId);
  return (
    <NZ_BackstageItem
      itemId={item.id}
      providerId={isProviderItem(item) ? item.providerId : undefined}
      itemPriority={item.itemPriority}
      groupPriority={item.groupPriority}
      icon={<Icon iconSpec={item.icon} />}
      isActive={isActive}
      isDisabled={ConditionalBooleanValue.getValue(item.isDisabled)}
      onClick={handleClick}
      subtitle={ConditionalStringValue.getValue(item.subtitle)}
      badge={BadgeUtilities.getComponentForBadgeType(item.badge)}
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
    return (
      <BackstageComposerStageLauncher
        item={item}
      />
    );
  }
  return (
    <BackstageComposerActionItem
      item={item}
    />
  );
}
