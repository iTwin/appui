/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SyncUi
 */

import { Logger } from "@itwin/core-bentley";
import type { IModelConnection } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { UiFramework } from "../UiFramework.js";
import { SyncUiEventId, type UiSyncEvent } from "./UiSyncEvent.js";
import { InternalSyncUiEventDispatcher } from "./InternalSyncUiEventDispatcher.js";

/** This class is used to send eventIds to interested UI components so the component can determine if it needs
 * to refresh its display by calling setState on itself.
 * @public
 */
export class SyncUiEventDispatcher {
  private static _uiEventDispatcher = new InternalSyncUiEventDispatcher();
  private static _unregisterFuncs = new Array<() => void>();
  private static _connectionUnregisterFuncs = new Array<() => void>();
  private static _iModelConnection?: IModelConnection;

  public static setTimeoutPeriod(period: number): void {
    SyncUiEventDispatcher._uiEventDispatcher.setTimeoutPeriod(period);
  }

  /** Return set of event ids that will be sent to listeners/. */
  public static get syncEventIds(): Set<string> {
    return SyncUiEventDispatcher._uiEventDispatcher.syncEventIds;
  }

  /** Return SyncUiEvent so callers can register an event callback. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public static get onSyncUiEvent(): UiSyncEvent {
    return SyncUiEventDispatcher._uiEventDispatcher.onSyncUiEvent;
  }

  /** Immediately trigger sync event processing. */
  public static dispatchImmediateSyncUiEvent(eventId: string): void {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchImmediateSyncUiEvent(
      eventId
    );
  }

  /** Save eventId in Set for processing. */
  public static dispatchSyncUiEvent(eventId: string): void {
    if (0 === SyncUiEventDispatcher._uiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory("SyncUiEventDispatcher"),
        `[dispatchSyncUiEvent] not processed because timeoutPeriod=0`
      );
      return;
    }
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(eventId);
  }

  /** Save multiple eventIds in Set for processing. */
  public static dispatchSyncUiEvents(eventIds: string[]): void {
    if (0 === SyncUiEventDispatcher._uiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory("SyncUiEventDispatcher"),
        `[dispatchSyncUiEvents] not processed because _timeoutPeriod=0`
      );
    }
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvents(eventIds);
  }

  /** Checks to see if an eventId of interest is contained in the set of eventIds */
  public static hasEventOfInterest(
    eventIds: Set<string>,
    idsOfInterest: string[]
  ) {
    return SyncUiEventDispatcher._uiEventDispatcher.hasEventOfInterest(
      eventIds,
      idsOfInterest
    );
  }

  private static _dispatchViewChange() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.ViewStateChanged
    );
  }

  private static _dispatchFeatureOverridesChange() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.FeatureOverridesChanged
    );
  }

  private static _dispatchViewedModelsChanged() {
    SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.ViewedModelsChanged
    );
  }

  /** Initializes the Monitoring of Events that trigger dispatching sync events */
  public static initialize() {
    // clear any registered listeners - this should only be encountered in unit test scenarios
    this._unregisterFuncs.forEach((unregister) => unregister());
    this._unregisterFuncs = [];

    this._unregisterFuncs.push(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      UiFramework.frontstages.onContentControlActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          SyncUiEventId.ContentControlActivated
        );
      }),
      UiFramework.frontstages.onContentLayoutActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ContentLayoutActivated
        );
      }),
      UiFramework.frontstages.onFrontstageActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageActivating
        );
      }),
      UiFramework.frontstages.onFrontstageReadyEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageReady
        );
      }),
      UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ModalFrontstageChanged
        );
      }),
      UiFramework.frontstages.onNavigationAidActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.NavigationAidActivated
        );
      }),
      UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ToolActivated
        );
      }),
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.WidgetStateChanged
        );
      }),
      UiFramework.backstage.onToggled.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.BackstageEvent
        );
      }),
      UiFramework.content.onActiveContentChangedEvent.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ActiveContentChanged
        );
      }),
      IModelApp.viewManager.onSelectedViewportChanged.addListener((args) => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ActiveViewportChanged
        );

        // if this is the first view being opened up start the default tool so tool admin is happy.
        if (undefined === args.previous) {
          void IModelApp.toolAdmin.startDefaultTool();
        } else {
          args.previous.onViewChanged.removeListener(
            SyncUiEventDispatcher._dispatchViewChange
          );
          args.previous.onFeatureOverridesChanged.removeListener(
            SyncUiEventDispatcher._dispatchFeatureOverridesChange
          );
          args.previous.onViewedModelsChanged.removeListener(
            SyncUiEventDispatcher._dispatchViewedModelsChanged
          );
        }
        if (args.current) {
          args.current.onViewChanged.addListener(
            SyncUiEventDispatcher._dispatchViewChange
          );
          args.current.onFeatureOverridesChanged.addListener(
            SyncUiEventDispatcher._dispatchFeatureOverridesChange
          );
          args.current.onViewedModelsChanged.addListener(
            SyncUiEventDispatcher._dispatchViewedModelsChanged
          );
        }
      })
    );
  }

  /** This should be called by IModelApp when the active IModelConnection is closed. */
  public static clearConnectionEvents(iModelConnection: IModelConnection) {
    if (this._iModelConnection !== iModelConnection) return;
    this._connectionUnregisterFuncs.forEach((unregister) => unregister());
    this._connectionUnregisterFuncs = [];
  }

  /** This should be called by IModelApp when the active IModelConnection is established. */
  public static initializeConnectionEvents(iModelConnection: IModelConnection) {
    this._iModelConnection &&
      this.clearConnectionEvents(this._iModelConnection);
    this._iModelConnection = iModelConnection;

    this._connectionUnregisterFuncs.push(
      iModelConnection.selectionSet.onChanged.addListener(() => {
        SyncUiEventDispatcher._uiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.SelectionSetChanged
        );
      }),
      iModelConnection.selectionSet.onChanged.addListener((ev) => {
        const numSelected = ev.set.elements.size;
        UiFramework.setNumItemsSelected(numSelected);
      })
    );
  }
}
