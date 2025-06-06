/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ConfigurableUi
 */

import { UiError } from "@itwin/appui-abstract";
import { CubeNavigationAidControl } from "../navigationaids/CubeNavigationAidControl.js";
import { DrawingNavigationAidControl } from "../navigationaids/DrawingNavigationAidControl.js";
import { SheetNavigationAidControl } from "../navigationaids/SheetNavigationAid.js";
import { StandardRotationNavigationAidControl } from "../navigationaids/StandardRotationNavigationAid.js";
import { UiFramework } from "../UiFramework.js";
import type {
  ConfigurableUiControlConstructor,
  ConfigurableUiElement,
} from "./ConfigurableUiControl.js";
import { ConfigurableCreateInfo } from "./ConfigurableUiControl.js";
import { MessageManager } from "../messages/MessageManager.js";
import { PopupManager } from "../popup/PopupManager.js";
import { ActivityTracker } from "./ActivityTracker.js";
import { BeUiEvent } from "@itwin/core-bentley";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";
import { InternalToolSettingsManager } from "../toolsettings/InternalToolSettingsManager.js";
import { InternalModelessDialogManager } from "../dialog/InternalModelessDialogManager.js";
import { InternalContentDialogManager } from "../dialog/InternalContentDialogManager.js";
import { InternalKeyboardShortcutManager } from "../keyboardshortcut/InternalKeyboardShortcut.js";
import { InternalModalDialogManager } from "../dialog/InternalModalDialogManager.js";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Configurable Ui Manager maintains controls, Frontstages, Content Groups, Content Layouts, Tasks and Workflows.
 * @internal
 */
export class InternalConfigurableUiManager {
  private static _registeredControls = new Map<
    string,
    ConfigurableUiControlConstructor
  >();
  private static _initialized = false;

  /** @internal */
  public static readonly activityTracker = new ActivityTracker();
  /** @internal */
  public static readonly onUiActivityEvent = new BeUiEvent<{
    event: Event;
  }>();
  /** @internal */
  public static readonly onUiIntervalEvent = new BeUiEvent<{
    idleTimeout?: number;
  }>();

  /** Initializes the InternalConfigurableUiManager and registers core controls.
   * @internal
   */
  public static initialize() {
    if (this._initialized) return;

    // Register core controls
    InternalConfigurableUiManager.register(
      StandardRotationNavigationAidControl.navigationAidId,
      StandardRotationNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      SheetNavigationAidControl.navigationAidId,
      SheetNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      DrawingNavigationAidControl.navigationAidId,
      DrawingNavigationAidControl
    );
    InternalConfigurableUiManager.register(
      CubeNavigationAidControl.navigationAidId,
      CubeNavigationAidControl
    );

    // Initialize SyncUiEventDispatcher so it can register event callbacks.
    SyncUiEventDispatcher.initialize();

    // Initialize the FrontstageManager
    InternalFrontstageManager.initialize();

    // Initialize the ToolSettingsManager that manages Tool Settings properties.
    InternalToolSettingsManager.initialize();

    // Initialize dialog managers that allow one or more dialogs to be open at a time. These managers adjust the z-indexing
    // to ensure the most recently focused dialog of a specific type displays above its siblings.
    InternalModelessDialogManager.initialize();

    // ContentDialog have a z-index just above the fixed content views and below all other UI elements.
    InternalContentDialogManager.initialize();

    // Initialize the Keyboard Shortcut manager
    InternalKeyboardShortcutManager.initialize();

    this._initialized = true;
  }

  /** Registers a control implementing the [[ConfigurableUiElement]] interface.
   * These controls can be a
   * [[ContentControl]],
   * [[NavigationAidControl]],
   * [[StatusBarWidgetControl]],
   * [[WidgetControl]] or
   * [ToolUiProvider]($appui-react).
   * @param classId the class id of the control to register
   * @param constructor the constructor of the control to register
   */
  public static register(
    classId: string,
    constructor: ConfigurableUiControlConstructor
  ): void {
    if (this._registeredControls.get(classId) !== undefined) {
      throw new UiError(
        UiFramework.loggerCategory("InternalConfigurableUiManager"),
        `registerControl: classId '${classId}' already registered`
      );
    }

    this._registeredControls.set(classId, constructor);
  }

  /** Determines if a control has been registered based on its classId.
   * @param classId   the class id of the control to test
   * @returns  true if the control is registered or false if not
   */
  public static isRegistered(classId: string): boolean {
    const constructor = this._registeredControls.get(classId);
    return constructor !== undefined;
  }

  /** Determines if a control has been registered.
   * @internal
   */
  public static getConstructorClassId(
    constructor: ConfigurableUiControlConstructor
  ): string | undefined {
    for (const [key, value] of this._registeredControls.entries()) {
      if (value === constructor) return key;
    }

    return undefined;
  }

  /** Unregisters a control that has been registered.
   * @param classId   the class id of the control to unregister
   */
  public static unregister(classId: string): void {
    const constructor = this._registeredControls.get(classId);
    if (constructor) this._registeredControls.delete(classId);
  }

  /** Creates a control registered by calling registerControl.
   * @param classId   the class id of the control to create
   * @param uniqueId  a unique id for the control
   * @param options   options passed to the constructor of the control
   * @param controlId controlId which may not be unique across all control instances.
   * @returns  the created control
   */
  public static create(
    classId: string,
    uniqueId: string,
    options?: any,
    controlId?: string
  ): ConfigurableUiElement | undefined {
    const info = new ConfigurableCreateInfo(
      classId,
      uniqueId,
      controlId ?? uniqueId
    );
    const constructor = this._registeredControls.get(info.classId);
    if (!constructor) {
      throw new UiError(
        UiFramework.loggerCategory("InternalConfigurableUiManager"),
        `createControl: classId '${classId}' not registered`
      );
    }

    const control = new constructor(info, options);
    return control;
  }

  /** Gets the HTML wrapper element for Configurable UI */
  public static getWrapperElement(): HTMLElement {
    const wrapper = document.getElementById("uifw-configurableui-wrapper");
    const htmlElement = wrapper!;
    return htmlElement;
  }

  /** Assists in the transition to context wrapper exported from Configurable UI */
  public static getWrapperDocument(): Document {
    const wrapper = document.getElementById("uifw-configurableui-wrapper");
    return wrapper?.ownerDocument ?? document;
  }

  /** Closes all UI popups currently open */
  public static closeUi(): void {
    MessageManager.closeAllMessages();
    InternalModelessDialogManager.closeAll();
    InternalModalDialogManager.closeAll();
    InternalContentDialogManager.closeAll();
    UiFramework.keyboardShortcuts.closeMenu();
    UiFramework.closeCursorMenu();
    PopupManager.clearPopups();
  }
}
