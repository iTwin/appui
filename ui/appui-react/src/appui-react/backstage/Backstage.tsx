/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import "./Backstage.scss";
import * as React from "react";
import classnames from "classnames";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { Logger } from "@itwin/core-bentley";
import { Icon as CoreIcon } from "@itwin/core-react";
import { Badge } from "@itwin/core-react/internal";
import { Icon, ListItem, Modal, ModalContent } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework.js";
import { useActiveFrontstageId } from "../frontstage/FrontstageDef.js";
import { isProviderItem } from "../ui-items-provider/isProviderItem.js";
import { useBackstageManager } from "./BackstageManager.js";

import type {
  BackstageActionItem as BackstageActionItemDef,
  BackstageItem as BackstageItemDef,
  BackstageStageLauncher as BackstageStageLauncherDef,
  CommonBackstageItem,
} from "./BackstageItem.js";

interface BackstageProps extends React.ComponentProps<"div"> {
  isOpen: boolean;
  onClose: () => void;
}

/** @internal */
export function Backstage(props: BackstageProps) {
  const { isOpen, onClose, ...rest } = props;

  return (
    <Modal
      title="Backstage"
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
      className={classnames("uifw-backstage-backstage", props.className)}
      // header={props.header}
      // showOverlay={props.showOverlay}
    >
      <ModalContent className="uifw-backstage-backstage_content">
        {props.children}
      </ModalContent>
    </Modal>
  );
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

interface BackstageItemProps {
  item: BackstageItemDef;
  isActive?: boolean;
  onClick?: () => void;
}

function BackstageItem(props: BackstageItemProps) {
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
      {...rest}
    >
      <div className="uifw-backstage-backstage_badge">
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Badge type={item.badgeKind || item.badge} />
      </div>
      <ListItem.Icon>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <ItemIcon iconNode={item.iconNode} icon={item.icon} />
      </ListItem.Icon>
      <ListItem.Content>
        <button
          className="uifw-backstage-backstage_button"
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

interface BackstageActionItemProps {
  readonly item: BackstageActionItemDef;
}

/** @internal */
export function BackstageActionItem({ item }: BackstageActionItemProps) {
  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    item.execute();
  }, [manager, item]);
  return <BackstageItem item={item} onClick={handleClick} />;
}

interface BackstageStageLauncherProps {
  readonly item: BackstageStageLauncherDef;
}

/** @internal */
export function BackstageStageLauncher({ item }: BackstageStageLauncherProps) {
  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    if (!UiFramework.frontstages.hasFrontstage(item.stageId))
      return Logger.logError(
        "BackstageStageLauncher",
        `Frontstage with id '${item.stageId}' not found`
      );
    void UiFramework.frontstages.setActiveFrontstage(item.stageId);
  }, [manager, item.stageId]);
  const activeFrontstageId = useActiveFrontstageId();
  const isActive = ConditionalBooleanValue.getValue(
    item.isActive ?? item.stageId === activeFrontstageId
  );
  return (
    <BackstageItem item={item} isActive={isActive} onClick={handleClick} />
  );
}
