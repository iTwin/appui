/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import "./BackstageComposerItem.scss";
import * as React from "react";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import { Icon as CoreIcon } from "@itwin/core-react";
import { Badge } from "@itwin/core-react/internal";
import { Icon, ListItem } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework.js";
import { useActiveFrontstageId } from "../frontstage/FrontstageDef.js";
import { isProviderItem } from "../ui-items-provider/isProviderItem.js";
import { isBackstageStageLauncher } from "./BackstageItem.js";
import { useBackstageManager } from "./BackstageManager.js";

import type {
  BackstageActionItem,
  BackstageItem,
  BackstageStageLauncher,
  CommonBackstageItem,
} from "./BackstageItem.js";

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
  return <BackstageComposerCommonItem item={item} onClick={handleClick} />;
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
    <BackstageComposerCommonItem
      item={item}
      isActive={isActive}
      onClick={handleClick}
    />
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
  icon,
  iconNode,
}: {
  icon: CommonBackstageItem["icon"];
  iconNode: CommonBackstageItem["iconNode"];
}) {
  if (iconNode) {
    return <Icon aria-hidden="true">{iconNode}</Icon>;
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return <CoreIcon iconSpec={icon} />;
}

interface BackstageComposerCommonItemProps {
  item: BackstageItem;
  isActive?: boolean;
  onClick?: () => void;
}

function BackstageComposerCommonItem(props: BackstageComposerCommonItemProps) {
  const { item, isActive, onClick, ...rest } = props;

  const descriptionId = React.useId();

  const description = ConditionalStringValue.getValue(item.subtitle);
  const label = ConditionalStringValue.getValue(item.label);
  const disabled = ConditionalBooleanValue.getValue(item.isDisabled);
  return (
    <ListItem
      data-item-id={item.id}
      data-item-type="backstage-item"
      data-item-group-priority={item.groupPriority}
      data-item-priority={item.itemPriority}
      data-item-provider-id={isProviderItem(item) ? item.providerId : undefined}
      disabled={disabled}
      size="large"
      active={isActive}
      actionable
      className="uifw-backstage-backstageComposerItem"
      {...rest}
    >
      <div className="uifw-backstage-backstageComposerItem_badge">
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Badge type={item.badgeKind || item.badge} />
      </div>
      <ListItem.Icon>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <ItemIcon iconNode={item.iconNode} icon={item.icon} />
      </ListItem.Icon>
      <ListItem.Content>
        <button
          className="uifw-backstage-backstageComposerItem_button"
          onClick={onClick}
          aria-describedby={descriptionId}
        >
          {label}
        </button>
        <ListItem.Description id={descriptionId}>
          {description}
        </ListItem.Description>
      </ListItem.Content>
    </ListItem>
  );
}
