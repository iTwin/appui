/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import { BeUiEvent } from "@itwin/core-bentley";
import type { BeButtonEvent, ItemField } from "@itwin/core-frontend";
import {
  AccuDraw,
  CompassMode,
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  RotationMode,
} from "@itwin/core-frontend";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import type { UserSettingsProvider } from "../UiFramework.js";
import { UiFramework } from "../UiFramework.js";
import {
  SyncUiEventDispatcher,
  SyncUiEventId,
} from "../syncui/SyncUiEventDispatcher.js";
import type { AccuDrawUiSettings } from "./AccuDrawUiSettings.js";
import type { UiStateStorage } from "../uistate/UiStateStorage.js";
import { UiStateStorageStatus } from "../uistate/UiStateStorage.js";

const compassModeToKeyMap = new Map<CompassMode, string>([
  [CompassMode.Polar, "polar"],
  [CompassMode.Rectangular, "rectangular"],
]);

const rotationModeToKeyMap = new Map<RotationMode, string>([
  [RotationMode.Top, "top"],
  [RotationMode.Front, "front"],
  [RotationMode.Side, "side"],
  [RotationMode.View, "view"],
  [RotationMode.ACS, "ACS"],
  [RotationMode.Context, "context"],
]);

/** Arguments for [[AccuDrawSetFieldFocusEvent]]
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface AccuDrawSetFieldFocusEventArgs {
  field: ItemField;
}

/** AccuDraw Set Field Focus event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AccuDrawSetFieldFocusEvent extends BeUiEvent<AccuDrawSetFieldFocusEventArgs> {}

/** Arguments for [[AccuDrawSetFieldValueToUiEvent]]
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface AccuDrawSetFieldValueToUiEventArgs {
  field: ItemField;
  value: number;
  formattedValue: string;
}

/** AccuDraw Set Field Value to Ui event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AccuDrawSetFieldValueToUiEvent extends BeUiEvent<AccuDrawSetFieldValueToUiEventArgs> {}

/** Arguments for [[AccuDrawSetFieldValueFromUiEvent]]
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface AccuDrawSetFieldValueFromUiEventArgs {
  field: ItemField;
  stringValue: string;
}

/** AccuDraw Set Field Value from Ui event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AccuDrawSetFieldValueFromUiEvent extends BeUiEvent<AccuDrawSetFieldValueFromUiEventArgs> {}

/** Arguments for [[AccuDrawSetFieldLockEvent]]
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface AccuDrawSetFieldLockEventArgs {
  field: ItemField;
  lock: boolean;
}

/** AccuDraw Set Field Lock event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AccuDrawSetFieldLockEvent extends BeUiEvent<AccuDrawSetFieldLockEventArgs> {}

/** Arguments for [[AccuDrawSetCompassModeEvent]]
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface AccuDrawSetCompassModeEventArgs {
  mode: CompassMode;
}

/** AccuDraw Set Compass Mode event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class AccuDrawSetCompassModeEvent extends BeUiEvent<AccuDrawSetCompassModeEventArgs> {}

/** AccuDraw Grab Input Focus event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
export class AccuDrawGrabInputFocusEvent extends BeUiEvent<object> {}

/** AccuDraw Ui Settings Changed event
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
export class AccuDrawUiSettingsChangedEvent extends BeUiEvent<object> {}

/** Subclass of `AccuDraw` in `@itwin/core-frontend` to be used to initialize `IModelApp`.
 *
 * This implementation will generate the required events for the AppUI provided UI to update correctly.
 *
 * ```ts
 * await IModelApp.startup({
 *   accuDraw: new FrameworkAccuDraw()
 * });
 * ```
 * @public
 */
export class FrameworkAccuDraw
  extends AccuDraw
  implements UserSettingsProvider
{
  private static _displayNotifications = false;
  private static _uiSettings: AccuDrawUiSettings | undefined;
  private static _settingsNamespace = "AppUiSettings";
  private static _notificationsKey = "AccuDrawNotifications";
  public readonly providerId = "FrameworkAccuDraw";

  /** AccuDraw Set Field Focus event. */
  public static readonly onAccuDrawSetFieldFocusEvent =
    new AccuDrawSetFieldFocusEvent(); // eslint-disable-line @typescript-eslint/no-deprecated
  /** AccuDraw Set Field Value to Ui event. */
  public static readonly onAccuDrawSetFieldValueToUiEvent =
    new AccuDrawSetFieldValueToUiEvent(); // eslint-disable-line @typescript-eslint/no-deprecated
  /** AccuDraw Set Field Value from Ui event. */
  public static readonly onAccuDrawSetFieldValueFromUiEvent =
    new AccuDrawSetFieldValueFromUiEvent(); // eslint-disable-line @typescript-eslint/no-deprecated
  /** AccuDraw Set Field Lock event. */
  public static readonly onAccuDrawSetFieldLockEvent =
    new AccuDrawSetFieldLockEvent(); // eslint-disable-line @typescript-eslint/no-deprecated
  /** AccuDraw Set Mode event. */
  public static readonly onAccuDrawSetCompassModeEvent =
    new AccuDrawSetCompassModeEvent(); // eslint-disable-line @typescript-eslint/no-deprecated
  /** AccuDraw Grab Input Focus event. */
  public static readonly onAccuDrawGrabInputFocusEvent =
    new AccuDrawGrabInputFocusEvent(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Determines if AccuDraw.rotationMode === RotationMode.Top */
  public static readonly isTopRotationConditional = new ConditionalBooleanValue(
    () => IModelApp.accuDraw.rotationMode === RotationMode.Top,
    [SyncUiEventId.AccuDrawRotationChanged]
  );
  /** Determines if AccuDraw.rotationMode === RotationMode.Front */
  public static readonly isFrontRotationConditional =
    new ConditionalBooleanValue(
      () => IModelApp.accuDraw.rotationMode === RotationMode.Front,
      [SyncUiEventId.AccuDrawRotationChanged]
    );
  /** Determines if AccuDraw.rotationMode === RotationMode.Side */
  public static readonly isSideRotationConditional =
    new ConditionalBooleanValue(
      () => IModelApp.accuDraw.rotationMode === RotationMode.Side,
      [SyncUiEventId.AccuDrawRotationChanged]
    );
  /** Determines if AccuDraw.rotationMode === RotationMode.View */
  public static readonly isViewRotationConditional =
    new ConditionalBooleanValue(
      () => IModelApp.accuDraw.rotationMode === RotationMode.View,
      [SyncUiEventId.AccuDrawRotationChanged]
    );
  /** Determines if AccuDraw.rotationMode === RotationMode.ACS */
  public static readonly isACSRotationConditional = new ConditionalBooleanValue(
    () => IModelApp.accuDraw.rotationMode === RotationMode.ACS,
    [SyncUiEventId.AccuDrawRotationChanged]
  );
  /** Determines if AccuDraw.rotationMode === RotationMode.Context */
  public static readonly isContextRotationConditional =
    new ConditionalBooleanValue(
      () => IModelApp.accuDraw.rotationMode === RotationMode.Context,
      [SyncUiEventId.AccuDrawRotationChanged]
    );
  /** Determines if AccuDraw.compassMode === CompassMode.Polar */
  public static readonly isPolarModeConditional = new ConditionalBooleanValue(
    () => IModelApp.accuDraw.compassMode === CompassMode.Polar,
    [SyncUiEventId.AccuDrawCompassModeChanged]
  );
  /** Determines if AccuDraw.compassMode === CompassMode.Rectangular */
  public static readonly isRectangularModeConditional =
    new ConditionalBooleanValue(
      () => IModelApp.accuDraw.compassMode === CompassMode.Rectangular,
      [SyncUiEventId.AccuDrawCompassModeChanged]
    );

  /** AccuDraw Grab Input Focus event. */
  public static readonly onAccuDrawUiSettingsChangedEvent =
    new AccuDrawUiSettingsChangedEvent(); // eslint-disable-line @typescript-eslint/no-deprecated

  /** Determines if notifications should be displayed for AccuDraw changes */
  public static get displayNotifications(): boolean {
    return FrameworkAccuDraw._displayNotifications;
  }
  public static set displayNotifications(v: boolean) {
    FrameworkAccuDraw._displayNotifications = v;
    void UiFramework.getUiStateStorage().saveSetting(
      this._settingsNamespace,
      this._notificationsKey,
      v
    );
  }

  /* @internal */
  public async loadUserSettings(storage: UiStateStorage): Promise<void> {
    const result = await storage.getSetting(
      FrameworkAccuDraw._settingsNamespace,
      FrameworkAccuDraw._notificationsKey
    );
    if (result.status === UiStateStorageStatus.Success)
      FrameworkAccuDraw._displayNotifications = result.setting;
  }

  /** AccuDraw User Interface settings */
  public static get uiStateStorage(): AccuDrawUiSettings | undefined {
    return FrameworkAccuDraw._uiSettings;
  }
  public static set uiStateStorage(v: AccuDrawUiSettings | undefined) {
    FrameworkAccuDraw._uiSettings = v;
    FrameworkAccuDraw.onAccuDrawUiSettingsChangedEvent.emit({});
  }

  constructor() {
    super();
    FrameworkAccuDraw.onAccuDrawSetFieldValueFromUiEvent.addListener(
      this.handleSetFieldValueFromUiEvent
    );
    UiFramework.registerUserSettingsProvider(this);
  }

  private handleSetFieldValueFromUiEvent = async (
    args: AccuDrawSetFieldValueFromUiEventArgs // eslint-disable-line @typescript-eslint/no-deprecated
  ) => {
    return this.processFieldInput(args.field, args.stringValue, false);
  };

  public override onCompassModeChange(): void {
    FrameworkAccuDraw.onAccuDrawSetCompassModeEvent.emit({
      mode: this.compassMode,
    });
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.AccuDrawCompassModeChanged
    );

    this.outputCompassModeMessage();
  }

  public override onRotationModeChange(): void {
    SyncUiEventDispatcher.dispatchSyncUiEvent(
      SyncUiEventId.AccuDrawRotationChanged
    );

    this.outputRotationMessage();
  }

  public override onFieldLockChange(index: ItemField): void {
    FrameworkAccuDraw.onAccuDrawSetFieldLockEvent.emit({
      field: index,
      lock: this.getFieldLock(index),
    });
  }

  public override onFieldValueChange(index: ItemField): void {
    const value = this.getValueByIndex(index);
    const formattedValue = IModelApp.accuDraw.getFormattedValueByIndex(index);
    FrameworkAccuDraw.onAccuDrawSetFieldValueToUiEvent.emit({
      field: index,
      value,
      formattedValue,
    });
  }

  public override setFocusItem(index: ItemField): void {
    FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.emit({ field: index });
  }

  public override onMotion(_ev: BeButtonEvent): void {
    if (UiFramework.isContextMenuOpen) return;
    this.processMotion();
  }

  /** Determine if the AccuDraw UI has focus. */
  public override get hasInputFocus(): boolean {
    let hasFocus = false;
    const el = document.querySelector("div.uifw-accudraw-field-container");
    if (el) hasFocus = el.contains(document.activeElement);
    return hasFocus;
  }

  /** Implement this method to set focus to the AccuDraw UI. */
  public override grabInputFocus(): void {
    FrameworkAccuDraw.onAccuDrawGrabInputFocusEvent.emit({});
  }

  /** AccuDraw Set Field Value from Ui. */
  public static setFieldValueFromUi(
    field: ItemField,
    stringValue: string
  ): void {
    FrameworkAccuDraw.onAccuDrawSetFieldValueFromUiEvent.emit({
      field,
      stringValue,
    });
  }

  private outputInfoMessage(message: string): void {
    if (FrameworkAccuDraw.displayNotifications)
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(OutputMessagePriority.Info, message)
      );
  }

  private outputCompassModeMessage(): void {
    if (FrameworkAccuDraw.displayNotifications) {
      const modeKey = compassModeToKeyMap.get(this.compassMode) ?? "polar";
      const modeString = UiFramework.translate(
        `accuDraw.compassMode.${modeKey}`
      );
      const modeMessage = UiFramework.translate("accuDraw.compassModeSet", {
        modeString,
      });
      this.outputInfoMessage(modeMessage);
    }
  }

  private outputRotationMessage(): void {
    if (FrameworkAccuDraw.displayNotifications) {
      const rotationKey = rotationModeToKeyMap.get(this.rotationMode) ?? "top";
      const rotationString = UiFramework.translate(
        `accuDraw.rotation.${rotationKey}`
      );
      const rotationMessage = UiFramework.translate("accuDraw.rotationSet", {
        rotationString,
      });
      this.outputInfoMessage(rotationMessage);
    }
  }
}
