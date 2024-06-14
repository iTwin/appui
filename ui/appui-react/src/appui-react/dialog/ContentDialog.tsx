/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import "./ContentDialog.scss";
import * as React from "react";
import type { DialogProps } from "@itwin/core-react";
import { Dialog } from "@itwin/core-react";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher";
import { UiFramework } from "../UiFramework";
import classnames from "classnames";
import type { UiSyncEventArgs } from "../syncui/UiSyncEvent";

/**
 *@internal
 */
export function useActiveContentControlId(): string | undefined {
  const [activeContentId, setActiveContentId] = React.useState(
    // eslint-disable-next-line deprecation/deprecation
    UiFramework.content.getActiveContentControl()?.uniqueId
  );

  React.useEffect(() => {
    // IModelApp.viewManager.onSelectedViewportChanged will often fire before UI components have mounted
    // so use UiFramework.content.onActiveContentChangedEvent which will always trigger once all stage components
    // are loaded and when the IModelApp.viewManager.selectedView changes.
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (_args) => {
        setActiveContentId(
          // eslint-disable-next-line deprecation/deprecation
          UiFramework.content.getActiveContentControl()?.uniqueId
        );
      }
    );
  }, []);

  React.useEffect(() => {
    const syncIdsOfInterest = [
      SyncUiEventId.ActiveContentChanged,
      SyncUiEventId.ContentControlActivated,
      SyncUiEventId.FrontstageReady,
    ];
    // eslint-disable-next-line deprecation/deprecation
    const handleSyncUiEvent = (args: UiSyncEventArgs): void => {
      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value)
        )
      ) {
        setActiveContentId(
          // eslint-disable-next-line deprecation/deprecation
          UiFramework.content.getActiveContentControl()?.uniqueId
        );
      }
    };

    return SyncUiEventDispatcher.onSyncUiEvent.addListener(handleSyncUiEvent);
  }, []);

  return activeContentId;
}

/** Properties for the [[ContentDialog]] component
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ContentDialogProps extends DialogProps {
  dialogId: string;
  movable?: boolean;
  children: React.ReactNode;
}

/** Content Dialog React component uses the Dialog component with a modal={false} prop.
 * It controls the z-index to keep the focused dialog above content but below widgets.
 * @public
 */
export function ContentDialog(props: ContentDialogProps) {
  const {
    className,
    children,
    dialogId,
    style,
    modal,
    modelessId,
    onModelessPointerDown,
    ...otherProps
  } = props;
  const activeContentControlId = useActiveContentControlId();
  const dialogClassName = React.useMemo(
    () =>
      classnames(
        activeContentControlId === dialogId
          ? "active-content-dialog"
          : "inactive-content-dialog",
        className
      ),
    [activeContentControlId, className, dialogId]
  );

  const [zIndex, setZIndex] = React.useState(
    UiFramework.content.dialogs.getZIndex(dialogId)
  );
  const updateZIndex = React.useCallback(() => {
    const newZ = UiFramework.content.dialogs.getZIndex(dialogId);
    if (newZ !== zIndex) {
      setZIndex(newZ);
    }
  }, [dialogId, zIndex]);

  return (
    // eslint-disable-next-line deprecation/deprecation
    <Dialog
      className={dialogClassName}
      data-item-type="content-dialog"
      data-item-id={dialogId}
      resizable={true}
      movable={true}
      trapFocus={false}
      modal={false}
      {...otherProps}
      modelessId={dialogId}
      onModelessPointerDown={(event) =>
        UiFramework.content.dialogs.handlePointerDownEvent(
          event,
          dialogId,
          updateZIndex
        )
      }
      style={{ zIndex, ...style }}
    >
      {children}
    </Dialog>
  );
}
