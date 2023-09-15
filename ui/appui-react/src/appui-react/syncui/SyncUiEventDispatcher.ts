/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SyncUi
 */

import { BeUiEvent, Logger } from "@itwin/core-bentley";
import type { IModelConnection } from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import { SessionStateActionId } from "../redux/SessionState";
import { UiFramework } from "../UiFramework";

// cSpell:ignore activecontentchanged, activitymessageupdated, activitymessagecancelled, backstageevent, contentlayoutactivated, contentcontrolactivated,
// cSpell:ignore elementtooltipchanged, frontstageactivated, inputfieldmessageadded, inputfieldmessageremoved, modalfrontstagechanged, modaldialogchanged
// cSpell:ignore navigationaidactivated, notificationmessageadded, toolactivated, taskactivated, widgetstatechanged, workflowactivated frontstageactivating
// cSpell:ignore frontstageready activeviewportchanged selectionsetchanged presentationselectionchanged viewstatechanged
// cSpell:ignore accudrawcompassmodechanged accudrawfieldlockchanged accudrawrotationchanged uisettingschanged configurableui

/** Event Id used to sync UI components. Used to refresh visibility or enable state of control.
 * @public
 */
export enum SyncUiEventId {
  /** AccuDraw compass mode has changed. */
  AccuDrawCompassModeChanged = "accudrawcompassmodechanged",
  /** AccuDraw rotation has changed. */
  AccuDrawRotationChanged = "accudrawrotationchanged",
  /** The active content as maintained by the ContentViewManager has changed. */
  ActiveContentChanged = "activecontentchanged",
  /** The active view maintained by the ViewManager has changed. */
  ActiveViewportChanged = "activeviewportchanged",
  /** Backstage has been toggled. */
  BackstageEvent = "backstageevent",
  /** A Content Layout has been activated.  */
  ContentLayoutActivated = "contentlayoutactivated",
  /** A Content Control maintained by UiFramework.frontstages has been activated. */
  ContentControlActivated = "contentcontrolactivated",
  /** A Frontstage is activating. */
  FrontstageActivating = "frontstageactivating",
  /** A Frontstage has been activated and the content has been assigned. */
  FrontstageReady = "frontstageready",
  /** A Modal Frontstage has been opened or closed. */
  ModalFrontstageChanged = "modalfrontstagechanged",
  /** A Modal Dialog has been opened or closed. */
  ModalDialogChanged = "modaldialogchanged",
  /** A NavigationAid has been activated. */
  NavigationAidActivated = "navigationaidactivated",
  /** An InteractiveTool has been activated via the ToolAdmin. */
  ToolActivated = "toolactivated",
  /** The state of a Widget has changed. */
  WidgetStateChanged = "widgetstatechanged",
  /** The SelectionSet for the active IModelConnection has changed. */
  SelectionSetChanged = "selectionsetchanged",
  /** The list of settings providers registered with SettingsManager has changed. */
  SettingsProvidersChanged = "settingsproviderschanged",
  /** The current view state has changed (used by view undo/redo toolbar buttons). */
  ViewStateChanged = "viewstatechanged",
  /** The current object the reads and write UI State has changed. */
  UiStateStorageChanged = "uistatestoragechanged",
  ShowHideManagerSettingChange = "show-hide-setting-change",
  /** The list of feature overrides applied has been changed */
  FeatureOverridesChanged = "featureoverrideschanged",
  ViewedModelsChanged = "viewedmodelschanged",
}

/**
 * UiSync Event arguments. Contains a set of lower case event Ids.
 * @public
 */
export interface UiSyncEventArgs {
  eventIds: Set<string>;
}

/** UiSync Event class.
 * @public
 */
export class UiSyncEvent extends BeUiEvent<UiSyncEventArgs> {}

/** This class is used to send eventIds to interested UI components so the component can determine if it needs
 * to refresh its display by calling setState on itself.
 * @public
 */
export class SyncUiEventDispatcher {
  private static _unregisterFuncs = new Array<() => void>();
  private static _connectionUnregisterFuncs = new Array<() => void>();
  private static _iModelConnection?: IModelConnection;
  private static _syncEventTimerId: number | undefined;
  private static _eventIds = new Set<string>();
  private static _eventIdAdded = false;
  private static _uiSyncEvent = new UiSyncEvent();
  private static _timeoutPeriod = 100;
  private static _secondaryTimeoutPeriod = 50;

  /** @internal - used for testing only */
  /* istanbul ignore next */
  public static setTimeoutPeriod(period: number): void {
    SyncUiEventDispatcher._timeoutPeriod = period;
    SyncUiEventDispatcher._secondaryTimeoutPeriod = Math.floor(
      SyncUiEventDispatcher._timeoutPeriod / 2
    );
    if (SyncUiEventDispatcher._secondaryTimeoutPeriod < 1)
      SyncUiEventDispatcher._secondaryTimeoutPeriod = 1;
    if (SyncUiEventDispatcher._syncEventTimerId) {
      window.clearTimeout(SyncUiEventDispatcher._syncEventTimerId);
      SyncUiEventDispatcher._syncEventTimerId = undefined;
    }
    if (SyncUiEventDispatcher._eventIds)
      SyncUiEventDispatcher._eventIds.clear();

    SyncUiEventDispatcher._eventIdAdded = false;
  }

  /** The current timeout period */
  public static get timeoutPeriod(): number {
    return SyncUiEventDispatcher._timeoutPeriod;
  }

  /** Return set of event ids that will be sent to listeners/. */
  public static get syncEventIds(): Set<string> {
    return SyncUiEventDispatcher._eventIds;
  }

  /** Return SyncUiEvent so callers can register an event callback. */
  public static get onSyncUiEvent(): UiSyncEvent {
    return SyncUiEventDispatcher._uiSyncEvent;
  }

  /** Immediately trigger sync event processing. */
  public static dispatchImmediateSyncUiEvent(eventId: string): void {
    const eventIds = new Set<string>();
    eventIds.add(eventId.toLowerCase());
    SyncUiEventDispatcher.onSyncUiEvent.emit({ eventIds });
  }

  /** Save eventId in Set for processing. */
  public static dispatchSyncUiEvent(eventId: string): void {
    if (0 === SyncUiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory(this),
        `[dispatchSyncUiEvent] not processed because timeoutPeriod=0`
      );
      return;
    }

    SyncUiEventDispatcher.syncEventIds.add(eventId.toLowerCase());
    if (!SyncUiEventDispatcher._syncEventTimerId) {
      // if there is not a timer active, create one
      SyncUiEventDispatcher._syncEventTimerId = window.setTimeout(() => {
        SyncUiEventDispatcher.checkForAdditionalIds();
      }, SyncUiEventDispatcher._timeoutPeriod);
    } else {
      this._eventIdAdded = true;
    }
  }

  /** Save multiple eventIds in Set for processing. */
  public static dispatchSyncUiEvents(eventIds: string[]): void {
    // istanbul ignore if
    if (0 === SyncUiEventDispatcher.timeoutPeriod) {
      Logger.logInfo(
        UiFramework.loggerCategory(this),
        `[dispatchSyncUiEvents] not processed because _timeoutPeriod=0`
      );
    }

    eventIds.forEach((id) =>
      SyncUiEventDispatcher.syncEventIds.add(id.toLowerCase())
    );
    // istanbul ignore else
    if (!SyncUiEventDispatcher._syncEventTimerId) {
      // if there is not a timer active, create one
      SyncUiEventDispatcher._syncEventTimerId = window.setTimeout(() => {
        SyncUiEventDispatcher.checkForAdditionalIds();
      }, SyncUiEventDispatcher._timeoutPeriod);
    } else {
      SyncUiEventDispatcher._eventIdAdded = true;
    }
  }

  /** Trigger registered event processing when timer has expired and no addition eventId are added. */
  public static checkForAdditionalIds() {
    /* istanbul ignore else */
    if (!SyncUiEventDispatcher._eventIdAdded) {
      // istanbul ignore else
      if (SyncUiEventDispatcher._syncEventTimerId) {
        window.clearTimeout(SyncUiEventDispatcher._syncEventTimerId);
        SyncUiEventDispatcher._syncEventTimerId = undefined;
      }
      SyncUiEventDispatcher._eventIdAdded = false;
      // istanbul ignore else
      if (SyncUiEventDispatcher.syncEventIds.size > 0) {
        const eventIds = new Set<string>();
        SyncUiEventDispatcher.syncEventIds.forEach((value) =>
          eventIds.add(value)
        );
        SyncUiEventDispatcher._eventIds.clear();
        SyncUiEventDispatcher.onSyncUiEvent.emit({ eventIds });
      }
      return;
    }

    // istanbul ignore next
    if (SyncUiEventDispatcher._syncEventTimerId) {
      window.clearTimeout(SyncUiEventDispatcher._syncEventTimerId);
      SyncUiEventDispatcher._syncEventTimerId = undefined;
    }
    // istanbul ignore next
    SyncUiEventDispatcher._eventIdAdded = false;
    // if events have been added before the initial timer expired wait half that time to see if events are still being added.
    // istanbul ignore next
    SyncUiEventDispatcher._syncEventTimerId = window.setTimeout(() => {
      SyncUiEventDispatcher.checkForAdditionalIds();
    }, SyncUiEventDispatcher._secondaryTimeoutPeriod);
  }

  /** Checks to see if an eventId of interest is contained in the set of eventIds */
  public static hasEventOfInterest(
    eventIds: Set<string>,
    idsOfInterest: string[]
  ) {
    return (
      idsOfInterest.length > 0 &&
      idsOfInterest.some((value) => eventIds.has(value.toLowerCase()))
    );
  }

  // istanbul ignore next
  private static _dispatchViewChange() {
    SyncUiEventDispatcher.dispatchSyncUiEvent(SyncUiEventId.ViewStateChanged);
  }

  // istanbul ignore next
  private static _dispatchFeatureOverridesChange() {
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.FeatureOverridesChanged
    );
  }

  // istanbul ignore next
  private static _dispatchViewedModelsChanged() {
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.ViewedModelsChanged
    );
  }

  /** Initializes the Monitoring of Events that trigger dispatching sync events */
  public static initialize() {
    // clear any registered listeners - this should only be encountered in unit test scenarios
    this._unregisterFuncs.forEach((unregister) => unregister());
    this._unregisterFuncs = [];

    this._unregisterFuncs.push(
      UiFramework.frontstages.onContentControlActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ContentControlActivated
        );
      }),
      UiFramework.frontstages.onContentLayoutActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ContentLayoutActivated
        );
      }),
      UiFramework.frontstages.onFrontstageActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageActivating
        );
      }),
      UiFramework.frontstages.onFrontstageReadyEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.FrontstageReady
        );
      }),
      UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ModalFrontstageChanged
        );
      }),
      UiFramework.frontstages.onNavigationAidActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.NavigationAidActivated
        );
      }),
      UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(SyncUiEventId.ToolActivated);
      }),
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.WidgetStateChanged
        );
      }),
      UiFramework.backstage.onToggled.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(SyncUiEventId.BackstageEvent);
      }),
      UiFramework.content.onActiveContentChangedEvent.addListener(() => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.ActiveContentChanged
        );
      }),
      IModelApp.viewManager.onSelectedViewportChanged.addListener((args) => {
        SyncUiEventDispatcher.dispatchSyncUiEvent(
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
        // istanbul ignore next
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
        SyncUiEventDispatcher.dispatchSyncUiEvent(
          SyncUiEventId.SelectionSetChanged
        );
      }),
      iModelConnection.selectionSet.onChanged.addListener((ev) => {
        const numSelected = ev.set.elements.size;
        UiFramework.dispatchActionToStore(
          SessionStateActionId.SetNumItemsSelected,
          numSelected
        );
      })
    );
  }
}
