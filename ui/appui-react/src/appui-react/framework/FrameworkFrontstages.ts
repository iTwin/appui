/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */
import { UiEvent } from "@itwin/appui-abstract";
import type { IModelConnection, Tool } from "@itwin/core-frontend";
import type { ToolInformation } from "../toolsettings/ToolInformation.js";
import type { TimeTracker } from "../configurableui/TimeTracker.js";
import { type ContentControlActivatedEvent } from "../content/ContentControl.js";
import type { ContentLayoutActivatedEvent } from "../content/ContentLayout.js";
import type { FrontstageDef } from "../frontstage/FrontstageDef.js";
import type { FrontstageProvider } from "../frontstage/FrontstageProvider.js";
import type { NavigationAidActivatedEvent } from "../navigationaids/NavigationAidControl.js";
import type {
  PanelPinnedChangedEventArgs,
  PanelStateChangedEvent,
} from "../stagepanels/StagePanelDef.js";
import type {
  WidgetDef,
  WidgetStateChangedEvent,
} from "../widgets/WidgetDef.js";
import type { WidgetState } from "../widgets/WidgetState.js";
import type { Frontstage } from "../frontstage/Frontstage.js";
import { FrameworkContent } from "./FrameworkContent.js";
import type { ModalFrontstageButton } from "../frontstage/ModalFrontstageButton.js";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";

/** Frontstage Activated Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface FrontstageActivatedEventArgs {
  deactivatedFrontstageDef?: FrontstageDef;
  activatedFrontstageDef: FrontstageDef;
}

/** Frontstage Activated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class FrontstageActivatedEvent extends UiEvent<FrontstageActivatedEventArgs> {}

/** Frontstage Deactivated Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface FrontstageDeactivatedEventArgs {
  /** Frontstage being deactivated */
  deactivatedFrontstageDef: FrontstageDef;
  /** Frontstage being activated */
  activatedFrontstageDef?: FrontstageDef;

  /** Total time spent in frontstage */
  totalTime: number;
  /** Engagement time spent in frontstage */
  engagementTime: number;
  /** Idle time spent in frontstage */
  idleTime: number;
}

/** Frontstage Deactivated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class FrontstageDeactivatedEvent extends UiEvent<FrontstageDeactivatedEventArgs> {}

/** Frontstage Ready Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface FrontstageReadyEventArgs {
  frontstageDef: FrontstageDef;
}

/** Frontstage Ready Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class FrontstageReadyEvent extends UiEvent<FrontstageReadyEventArgs> {}

/** Modal Frontstage Changed Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ModalFrontstageChangedEventArgs {
  modalFrontstageCount: number;
}

/** Modal Frontstage Stack Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ModalFrontstageChangedEvent extends UiEvent<ModalFrontstageChangedEventArgs> {}

/** Modal Frontstage Closed Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ModalFrontstageClosedEventArgs {
  /** Modal Frontstage being closed */
  modalFrontstage: ModalFrontstageInfo;

  /** Total time spent in frontstage */
  totalTime: number;
  /** Engagement time spent in frontstage */
  engagementTime: number;
  /** Idle time spent in frontstage */
  idleTime: number;
}

/** Modal Frontstage Requested Close Event class. Notifies the modal stage that the close button was
 * pressed and passes the function to actually close the modal stage. This allows stage to do any
 * saving of unsaved data prior to closing the stage. If the ModalFrontstageInfo sets notifyCloseRequest
 * to true it is up to the stage to register for this event and call the stageCloseFunc once it has saved
 * any unsaved data.
 * @alpha
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ModalFrontstageRequestedCloseEvent extends UiEvent<ModalFrontstageRequestedCloseEventArgs> {}

/** Modal Frontstage RequestedClose Event Args interface.
 * @alpha
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ModalFrontstageRequestedCloseEventArgs {
  /** Modal Frontstage that is to be closed */
  modalFrontstage: ModalFrontstageInfo;
  /** Function to call to close the stage */
  stageCloseFunc: () => void;
}

/** Modal Frontstage Closed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ModalFrontstageClosedEvent extends UiEvent<ModalFrontstageClosedEventArgs> {}

/** Tool Activated Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ToolActivatedEventArgs {
  toolId: string;
}

/** Tool Activated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ToolActivatedEvent extends UiEvent<ToolActivatedEventArgs> {}

/** Tool Icon Changed Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ToolIconChangedEventArgs {
  iconSpec: string;
}

/** Tool Icon Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ToolIconChangedEvent extends UiEvent<ToolIconChangedEventArgs> {}

/** Modal Frontstage information interface.
 * @public
 */
export interface ModalFrontstageInfo {
  title: string;
  content: React.ReactNode;
  appBarRight?: React.ReactNode;
  /** Set notifyCloseRequest to true on stages that register to listen for `onCloseModalFrontstageRequestedEvent` so
   * that the stage can save unsaved data before closing. Used by the ModalSettingsStage.
   * @alpha */
  notifyCloseRequest?: boolean;
  /** If specified overrides the default back button. See {@link ModalFrontstageButton}. */
  backButton?: React.ReactNode;
}

/** Modal Frontstage array item interface.
 * @internal
 */
export interface ModalFrontstageItem {
  modalFrontstage: ModalFrontstageInfo;
  timeTracker: TimeTracker;
}

/** [[UiFramework.frontstages]] interface
 * @public
 */
export interface FrameworkFrontstages {
  /** Returns true if Frontstage is loading its controls. If false the Frontstage content and controls have been created. */
  readonly isLoading: boolean;

  /** Get Frontstage Deactivated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onFrontstageDeactivatedEvent: FrontstageDeactivatedEvent;

  /** Get Frontstage Activated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onFrontstageActivatedEvent: FrontstageActivatedEvent;

  /** Get Frontstage Activated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onFrontstageReadyEvent: FrontstageReadyEvent;

  /** Get Modal Frontstage Changed event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onModalFrontstageChangedEvent: ModalFrontstageChangedEvent;

  /** Get Modal Frontstage Closed event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onModalFrontstageClosedEvent: ModalFrontstageClosedEvent;

  /** Get Modal Frontstage Requested Closed event.
   * @alpha
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onCloseModalFrontstageRequestedEvent: ModalFrontstageRequestedCloseEvent;

  /** Get Tool Activated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onToolActivatedEvent: ToolActivatedEvent;

  /** Get ToolSetting Reload event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onToolSettingsReloadEvent: UiEvent<void>;

  /** Get Tool Icon Changed event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onToolIconChangedEvent: ToolIconChangedEvent;

  /** Get Content Layout Activated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onContentLayoutActivatedEvent: ContentLayoutActivatedEvent;

  /** Get Content Control Activated event.
   * @deprecated in 4.16.0. Use {@link FrameworkContent.onActiveContentChangedEvent} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onContentControlActivatedEvent: ContentControlActivatedEvent;

  /** Get Navigation Aid Activated event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onNavigationAidActivatedEvent: NavigationAidActivatedEvent;

  /** Get Widget State Changed event. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onWidgetStateChangedEvent: WidgetStateChangedEvent;

  /** Get panel state changed event.
   * @alpha
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onPanelStateChangedEvent: PanelStateChangedEvent;

  /** Get panel pinned changed event.
   * @alpha
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onPanelPinnedChangedEvent: UiEvent<PanelPinnedChangedEventArgs>;

  /** Clears the Frontstage map.
   */
  clearFrontstageDefs(): void;

  /** Clears the Frontstage Providers and the defs that may have been created from them.
   * @deprecated in 4.17.0. Use {@link FrameworkFrontstages.clearFrontstages} instead.
   */
  clearFrontstageProviders(): void;

  /** Clears the Frontstages. */
  clearFrontstages(): void;

  /** Adds a frontstage provider.
   * @param frontstageProvider  FrontstageProvider representing the Frontstage to add
   * @deprecated in 4.15.0. Use {@link FrameworkFrontstages.addFrontstage} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  addFrontstageProvider(frontstageProvider: FrontstageProvider): void;

  /** Adds a frontstage. */
  addFrontstage(frontstage: Frontstage): void;

  /** Find a loaded Frontstage with a given id. If the id is not provided, the active Frontstage is returned. If
   * no cached FrontstageDef is found but a FrontstageProvider is registered a FrontstageDef will be created, cached, and
   * returned.
   * @param id  Id of the Frontstage to find
   * @returns  FrontstageDef with a given id if found, or undefined if not found.
   */
  getFrontstageDef(id?: string): Promise<FrontstageDef | undefined>;

  /** Gets the active FrontstageDef. If a Frontstage is not active, undefined is returned.
   * @return  Active FrontstageDef, or undefined if one is not active.
   */
  readonly activeFrontstageDef: FrontstageDef | undefined;

  /** Gets the Id of the active FrontstageDef. If a Frontstage is not active, blank is returned.
   * @return  Id of the active FrontstageDef, or blank if one is not active.
   */
  readonly activeFrontstageId: string;

  hasFrontstage(frontstageId: string): boolean;

  /** Sets the active FrontstageDef give the stageId.
   * @param  frontstageId  Id of the Frontstage to set active.
   * @returns A Promise that is fulfilled when the Frontstage is ready.
   */
  setActiveFrontstage(frontstageId: string): Promise<void>;

  /** Sets the active FrontstageDef.
   * @param  frontstageDef  FrontstageDef to set active.
   * @returns A Promise that is fulfilled when the [[FrontstageDef]] is ready.
   */
  setActiveFrontstageDef(
    frontstageDef: FrontstageDef | undefined
  ): Promise<void>;

  /** Deactivates the active FrontstageDef.
   */
  deactivateFrontstageDef(): Promise<void>;

  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  readonly activeToolId: string;

  /** Sets the active tool id */
  setActiveToolId(toolId: string): void;

  /** Sets the active tool */
  setActiveTool(tool: Tool): void;

  /** Gets the active tool's [[ToolInformation]].
   * @deprecated in 4.16.0. Uses a deprecated class {@link ToolInformation}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly activeToolInformation: ToolInformation | undefined;

  /** Opens a modal Frontstage. Modal Frontstages can be stacked.
   * @param modalFrontstage  Information about the modal Frontstage
   */
  openModalFrontstage(modalFrontstage: ModalFrontstageInfo): void;

  /** Closes the top-most modal Frontstage.
   */
  closeModalFrontstage(): void;

  /** Updates the top-most modal Frontstage.
   */
  updateModalFrontstage(): void;

  /** Gets the top-most modal Frontstage.
   * @returns Top-most modal Frontstage, or undefined if there is none.
   */
  readonly activeModalFrontstage: ModalFrontstageInfo | undefined;

  /** Gets the number of modal Frontstages.
   * @returns Modal Frontstage count
   */
  readonly modalFrontstageCount: number;

  /** Sets the active Navigation Aid via its Id.
   * @param navigationAidId  Id of the Navigation Aid to set as active
   * @param iModelConnection IModelConnection to query for view data
   */
  setActiveNavigationAid(
    navigationAidId: string,
    iModelConnection: IModelConnection
  ): void;

  /** Sets the state of the widget with the given id
   * @param widgetId  Id of the Widget for which to set the state
   * @param state     New state of the widget
   * @returns true if the widget state was set successfully, or false if not.
   */
  setWidgetState(widgetId: string, state: WidgetState): boolean;

  /** Finds a widget with the given id in the active frontstage
   * @param widgetId  Id of the Widget to find
   * @returns The WidgetDef with the given id, or undefined if not found.
   */
  findWidget(widgetId: string): WidgetDef | undefined;

  /** Opens a nested Frontstage. Nested Frontstages can be stacked.
   * @param nestedFrontstage  Information about the nested Frontstage
   */
  openNestedFrontstage(nestedFrontstage: FrontstageDef): Promise<void>;

  /** Closes the top-most nested Frontstage.
   */
  closeNestedFrontstage(): Promise<void>;

  /** Gets the top-most nested Frontstage.
   * @returns Top-most nested Frontstage, or undefined if there is none.
   */
  readonly activeNestedFrontstage: FrontstageDef | undefined;

  /** Gets the number of nested Frontstages.
   * @returns Nested Frontstage count
   */
  readonly nestedFrontstageCount: number;
}

/** @alpha */
export class DefaultFrameworkFrontstages implements FrameworkFrontstages {
  public get isLoading() {
    return InternalFrontstageManager.isLoading;
  }
  public get onFrontstageDeactivatedEvent() {
    return InternalFrontstageManager.onFrontstageDeactivatedEvent;
  }
  public get onFrontstageActivatedEvent() {
    return InternalFrontstageManager.onFrontstageActivatedEvent;
  }
  public get onFrontstageReadyEvent() {
    return InternalFrontstageManager.onFrontstageReadyEvent;
  }
  public get onModalFrontstageChangedEvent() {
    return InternalFrontstageManager.onModalFrontstageChangedEvent;
  }
  public get onModalFrontstageClosedEvent() {
    return InternalFrontstageManager.onModalFrontstageClosedEvent;
  }
  public get onCloseModalFrontstageRequestedEvent() {
    return InternalFrontstageManager.onCloseModalFrontstageRequestedEvent;
  }
  public get onToolActivatedEvent() {
    return InternalFrontstageManager.onToolActivatedEvent;
  }
  public get onToolSettingsReloadEvent() {
    return InternalFrontstageManager.onToolSettingsReloadEvent;
  }
  public get onToolIconChangedEvent() {
    return InternalFrontstageManager.onToolIconChangedEvent;
  }
  public get onContentLayoutActivatedEvent() {
    return InternalFrontstageManager.onContentLayoutActivatedEvent;
  }
  public get onContentControlActivatedEvent() {
    return InternalFrontstageManager.onContentControlActivatedEvent;
  }
  public get onNavigationAidActivatedEvent() {
    return InternalFrontstageManager.onNavigationAidActivatedEvent;
  }
  public get onWidgetStateChangedEvent() {
    return InternalFrontstageManager.onWidgetStateChangedEvent;
  }
  public get onPanelStateChangedEvent() {
    return InternalFrontstageManager.onPanelStateChangedEvent;
  }
  public get onPanelPinnedChangedEvent() {
    return InternalFrontstageManager.onPanelPinnedChangedEvent;
  }
  public get activeFrontstageDef() {
    return InternalFrontstageManager.activeFrontstageDef;
  }
  public get activeFrontstageId() {
    return InternalFrontstageManager.activeFrontstageId;
  }
  public get activeToolId() {
    return InternalFrontstageManager.activeToolId;
  }
  public get activeToolInformation() {
    return InternalFrontstageManager.activeToolInformation;
  }
  public get activeModalFrontstage() {
    return InternalFrontstageManager.activeModalFrontstage;
  }
  public get modalFrontstageCount() {
    return InternalFrontstageManager.modalFrontstageCount;
  }
  public get activeNestedFrontstage() {
    return InternalFrontstageManager.activeNestedFrontstage;
  }
  public get nestedFrontstageCount() {
    return InternalFrontstageManager.nestedFrontstageCount;
  }
  public clearFrontstageDefs(
    ...args: Parameters<FrameworkFrontstages["clearFrontstageDefs"]>
  ) {
    return InternalFrontstageManager.clearFrontstageDefs(...args);
  }
  public clearFrontstageProviders(
    ...args: Parameters<FrameworkFrontstages["clearFrontstageProviders"]>
  ) {
    return InternalFrontstageManager.clearFrontstageProviders(...args);
  }
  public clearFrontstages(
    ...args: Parameters<FrameworkFrontstages["clearFrontstages"]>
  ) {
    return InternalFrontstageManager.clearFrontstages(...args);
  }
  public addFrontstageProvider(
    ...args: Parameters<FrameworkFrontstages["addFrontstageProvider"]>
  ) {
    return InternalFrontstageManager.addFrontstageProvider(...args);
  }
  public addFrontstage(
    ...args: Parameters<FrameworkFrontstages["addFrontstage"]>
  ) {
    return InternalFrontstageManager.addFrontstage(...args);
  }
  public async getFrontstageDef(
    ...args: Parameters<FrameworkFrontstages["getFrontstageDef"]>
  ) {
    return InternalFrontstageManager.getFrontstageDef(...args);
  }
  public hasFrontstage(
    ...args: Parameters<FrameworkFrontstages["hasFrontstage"]>
  ) {
    return InternalFrontstageManager.hasFrontstage(...args);
  }
  public async setActiveFrontstage(
    ...args: Parameters<FrameworkFrontstages["setActiveFrontstage"]>
  ) {
    return InternalFrontstageManager.setActiveFrontstage(...args);
  }
  public async setActiveFrontstageDef(
    ...args: Parameters<FrameworkFrontstages["setActiveFrontstageDef"]>
  ) {
    return InternalFrontstageManager.setActiveFrontstageDef(...args);
  }
  public async deactivateFrontstageDef(
    ...args: Parameters<FrameworkFrontstages["deactivateFrontstageDef"]>
  ) {
    return InternalFrontstageManager.deactivateFrontstageDef(...args);
  }
  public setActiveToolId(
    ...args: Parameters<FrameworkFrontstages["setActiveToolId"]>
  ) {
    return InternalFrontstageManager.setActiveToolId(...args);
  }
  public setActiveTool(
    ...args: Parameters<FrameworkFrontstages["setActiveTool"]>
  ) {
    return InternalFrontstageManager.setActiveTool(...args);
  }
  public openModalFrontstage(
    ...args: Parameters<FrameworkFrontstages["openModalFrontstage"]>
  ) {
    return InternalFrontstageManager.openModalFrontstage(...args);
  }
  public closeModalFrontstage(
    ...args: Parameters<FrameworkFrontstages["closeModalFrontstage"]>
  ) {
    return InternalFrontstageManager.closeModalFrontstage(...args);
  }
  public updateModalFrontstage(
    ...args: Parameters<FrameworkFrontstages["updateModalFrontstage"]>
  ) {
    return InternalFrontstageManager.updateModalFrontstage(...args);
  }
  public setActiveNavigationAid(
    ...args: Parameters<FrameworkFrontstages["setActiveNavigationAid"]>
  ) {
    return InternalFrontstageManager.setActiveNavigationAid(...args);
  }
  public setWidgetState(
    ...args: Parameters<FrameworkFrontstages["setWidgetState"]>
  ) {
    return InternalFrontstageManager.setWidgetState(...args);
  }
  public findWidget(...args: Parameters<FrameworkFrontstages["findWidget"]>) {
    return InternalFrontstageManager.findWidget(...args);
  }
  public async openNestedFrontstage(
    ...args: Parameters<FrameworkFrontstages["openNestedFrontstage"]>
  ) {
    return InternalFrontstageManager.openNestedFrontstage(...args);
  }
  public async closeNestedFrontstage(
    ...args: Parameters<FrameworkFrontstages["closeNestedFrontstage"]>
  ) {
    return InternalFrontstageManager.closeNestedFrontstage(...args);
  }
}
