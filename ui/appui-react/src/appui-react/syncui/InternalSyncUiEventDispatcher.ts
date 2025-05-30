/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SyncUi
 */

import { BeUiEvent } from "@itwin/core-bentley";
import type { UiSyncEventArgs } from "./UiSyncEvent.js";

/** This class is used to send eventIds to interested UI components so the component can determine if it needs
 * to refresh its display by calling setState on itself.
 * @internal
 */
export class InternalSyncUiEventDispatcher {
  private _syncEventTimerId: number | undefined;
  private _eventIds: Set<string>;
  private _eventIdAdded;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _uiSyncEvent: BeUiEvent<UiSyncEventArgs>;
  private _timeoutPeriod;
  private _secondaryTimeoutPeriod;

  constructor() {
    this._eventIds = new Set<string>();
    this._eventIdAdded = false;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._uiSyncEvent = new BeUiEvent<UiSyncEventArgs>();
    this._timeoutPeriod = 100;
    this._secondaryTimeoutPeriod = this._timeoutPeriod / 2;
  }

  /** @internal - used for testing only */

  public setTimeoutPeriod(period: number): void {
    this._timeoutPeriod = period;
    this._secondaryTimeoutPeriod = Math.floor(this._timeoutPeriod / 2);
    if (this._secondaryTimeoutPeriod < 1) this._secondaryTimeoutPeriod = 1;
    if (this._syncEventTimerId) {
      window.clearTimeout(this._syncEventTimerId);
      this._syncEventTimerId = undefined;
    }
    if (this._eventIds) this._eventIds.clear();

    this._eventIdAdded = false;
  }

  /** The current timeout period */
  public get timeoutPeriod(): number {
    return this._timeoutPeriod;
  }
  /** Return set of event ids that will be sent to listeners/. */
  public get syncEventIds(): Set<string> {
    return this._eventIds;
  }

  /** Return UiSyncEvent so callers can register an event callback. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public get onSyncUiEvent(): BeUiEvent<UiSyncEventArgs> {
    return this._uiSyncEvent;
  }

  /** Immediately trigger sync event processing. */
  public dispatchImmediateSyncUiEvent(eventId: string): void {
    const eventIds = new Set<string>();
    eventIds.add(eventId.toLowerCase());
    this.onSyncUiEvent.emit({ eventIds });
  }

  /** Save eventId in Set for processing. */
  public dispatchSyncUiEvent(eventId: string): void {
    if (0 === this._timeoutPeriod) {
      return;
    }

    this.syncEventIds.add(eventId.toLowerCase());
    if (!this._syncEventTimerId) {
      // if there is not a timer active, create one
      this._syncEventTimerId = window.setTimeout(() => {
        this.checkForAdditionalIds();
      }, this._timeoutPeriod);
    } else {
      this._eventIdAdded = true;
    }
  }

  /** Save multiple eventIds in Set for processing. */
  public dispatchSyncUiEvents(eventIds: string[]): void {
    if (0 === this._timeoutPeriod) {
      return;
    }

    eventIds.forEach((id) => this.syncEventIds.add(id.toLowerCase()));
    if (!this._syncEventTimerId) {
      // if there is not a timer active, create one
      this._syncEventTimerId = window.setTimeout(() => {
        this.checkForAdditionalIds();
      }, this._timeoutPeriod);
    } else {
      this._eventIdAdded = true;
    }
  }

  /** Trigger registered event processing when timer has expired and no addition eventId are added. */
  public checkForAdditionalIds() {
    if (!this._eventIdAdded) {
      if (this._syncEventTimerId) {
        window.clearTimeout(this._syncEventTimerId);
        this._syncEventTimerId = undefined;
      }
      this._eventIdAdded = false;
      if (this.syncEventIds.size > 0) {
        const eventIds = new Set<string>();
        this.syncEventIds.forEach((value) => eventIds.add(value));
        this._eventIds.clear();
        this.onSyncUiEvent.emit({ eventIds });
      }
      return;
    }

    if (this._syncEventTimerId) {
      window.clearTimeout(this._syncEventTimerId);
      this._syncEventTimerId = undefined;
    }
    this._eventIdAdded = false;
    // if events have been added before the initial timer expired wait half that time to see if events are still being added.
    this._syncEventTimerId = window.setTimeout(() => {
      this.checkForAdditionalIds();
    }, this._secondaryTimeoutPeriod);
  }

  /** Checks to see if an eventId of interest is contained in the set of eventIds */
  public hasEventOfInterest(eventIds: Set<string>, idsOfInterest: string[]) {
    if (
      idsOfInterest.length > 0 &&
      idsOfInterest.some((value: string): boolean =>
        eventIds.has(value.toLowerCase())
      )
    )
      return true;
    return false;
  }
}
