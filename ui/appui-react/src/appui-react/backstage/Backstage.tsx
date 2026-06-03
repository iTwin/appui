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
import { Dialog, Divider, Icon, List, ListItem } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework.js";
import { useActiveFrontstageId } from "../frontstage/FrontstageDef.js";
import { isProviderItem } from "../ui-items-provider/isProviderItem.js";
import { useBackstageManager } from "./BackstageManager.js";
import { useTranslation } from "../hooks/useTranslation.js";

import type {
  BackstageActionItem as BackstageActionItemDef,
  BackstageItem as BackstageItemDef,
  BackstageStageLauncher as BackstageStageLauncherDef,
  CommonBackstageItem,
} from "./BackstageItem.js";

interface BackstageProps extends React.ComponentProps<"div"> {
  isOpen: boolean;
  onClose: () => void;
  showOverlay: boolean;
}

/** @internal */
export function Backstage(props: BackstageProps) {
  const { isOpen, onClose, showOverlay, ...rest } = props;

  const { translate } = useTranslation();

  return (
    <Dialog
      className="uifw-backstage-backstage_wrapper"
      isOpen={isOpen}
      onClose={onClose}
      closeOnExternalClick
      preventDocumentScroll
      trapFocus
      setFocus={false}
    >
      <Dialog.Backdrop
        className={classnames(
          "uifw-backstage-backstage_backdrop",
          !showOverlay && "uifw-transparent"
        )}
      />
      <Dialog.Main
        aria-label={translate("backstage.label")}
        {...rest}
        className={classnames("uifw-backstage-backstage", props.className)}
      >
        <Dialog.Content className="uifw-backstage-backstage_content">
          {props.children}
        </Dialog.Content>
      </Dialog.Main>
    </Dialog>
  );
}

function BackstageDivider() {
  return <Divider className="uifw-backstage-backstage_divider" />;
}

interface BackstageGroupProps {
  children?: React.ReactNode;
  index: number;
}

/** @internal */
export function BackstageGroup(props: BackstageGroupProps) {
  const { index, ...rest } = props;
  return (
    <>
      {index > 0 ? <BackstageDivider /> : null}
      <List {...rest}>{props.children}</List>
    </>
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

type ListItemProps = React.ComponentProps<typeof ListItem>;

interface BackstageItemProps
  extends Pick<ListItemProps, "active" | "onClick" | "autoFocus"> {
  item: BackstageItemDef;
  onClick?: () => void;
}

function BackstageItem(props: BackstageItemProps) {
  const { item, active, onClick, autoFocus, ...rest } = props;

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
      active={active}
      aria-current={active ? "true" : undefined}
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
        <ListItem.Action
          onClick={onClick}
          aria-describedby={descriptionId}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
        >
          {label}
        </ListItem.Action>
        <ListItem.Description id={descriptionId}>
          {description}
        </ListItem.Description>
      </ListItem.Content>
    </ListItem>
  );
}

interface BackstageActionItemProps extends Pick<ListItemProps, "autoFocus"> {
  readonly item: BackstageActionItemDef;
}

/** @internal */
export function BackstageActionItem(props: BackstageActionItemProps) {
  const { item, ...rest } = props;

  const manager = useBackstageManager();
  const handleClick = React.useCallback(() => {
    manager.close();
    item.execute();
  }, [manager, item]);
  return <BackstageItem item={item} onClick={handleClick} {...rest} />;
}

interface BackstageStageLauncherProps extends Pick<ListItemProps, "autoFocus"> {
  readonly item: BackstageStageLauncherDef;
}

/** @internal */
export function BackstageStageLauncher(props: BackstageStageLauncherProps) {
  const { item, ...rest } = props;

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
    <BackstageItem
      item={item}
      active={isActive}
      onClick={handleClick}
      {...rest}
    />
  );
}
