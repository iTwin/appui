/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Backstage */

import * as React from "react";

import { UiFramework } from "../UiFramework";
import { SignOutModalFrontstage } from "../oidc/SignOut";
import { ItemDefBase } from "./ItemDefBase";
import { ItemProps, CommandHandler } from "./ItemProps";
import { FrontstageManager } from "./FrontstageManager";
import { Icon } from "./IconComponent";
import { WorkflowManager } from "./Workflow";

import { UiEvent } from "@bentley/ui-core";

import NZ_Backstage from "@bentley/ui-ninezone/lib/backstage/Backstage";
import NZ_BackstageItem from "@bentley/ui-ninezone/lib/backstage/Item";
import NZ_BackstageSeparator from "@bentley/ui-ninezone/lib/backstage/Separator";
import NZ_UserProfile from "@bentley/ui-ninezone/lib/backstage/UserProfile";

import { AccessToken } from "@bentley/imodeljs-clients";

// -----------------------------------------------------------------------------
// BackstageItemDef and sub-interfaces
// -----------------------------------------------------------------------------

/** Base properties for a [[Backstage]] item.
 */
export interface BackstageItemProps extends ItemProps {
  subtitleId?: string;
  subtitleExpr?: string;
}

/** Properties for a Frontstage launch Backstage item.
 */
export interface FrontstageLaunchBackstageItemProps extends BackstageItemProps {
  frontstageId: string;
}

/** Properties for a Command launch Backstage item.
 */
export interface CommandLaunchBackstageItemProps extends BackstageItemProps, CommandHandler {
  commandId: string;
}

/** Properties for a Task launch Backstage item.
 */
export interface TaskLaunchBackstageItemProps extends BackstageItemProps {
  workflowId: string;
  taskId: string;
}

// -----------------------------------------------------------------------------
// BackstageItem and subclasses
// -----------------------------------------------------------------------------

/** Base class for a [[Backstage]] item definition.
 */
export abstract class BackstageItemDef extends ItemDefBase {
  public subtitle: string = "";
  public abstract execute(): void;

  constructor(backstageItemDef: BackstageItemProps) {
    super(backstageItemDef);

    if (backstageItemDef) {
      this.subtitle = (backstageItemDef.subtitleId !== undefined) ? UiFramework.i18n.translate(backstageItemDef.subtitleId) : "";
    }

    this.execute = this.execute.bind(this);
  }

  public toolbarReactNode(_index: number): React.ReactNode { return null; }
}

/** Frontstage launch Backstage item definition.
 */
export class FrontstageLaunchBackstageItemDef extends BackstageItemDef {
  private _frontstageId: string = "";

  constructor(frontstageLauncherItemProps: FrontstageLaunchBackstageItemProps) {
    super(frontstageLauncherItemProps);

    if (frontstageLauncherItemProps)
      this._frontstageId = frontstageLauncherItemProps.frontstageId;
  }

  public execute(): void {
    Backstage.hide();

    const frontstageDef = FrontstageManager.findFrontstageDef(this._frontstageId);
    if (frontstageDef)
      FrontstageManager.setActiveFrontstageDef(frontstageDef); // tslint:disable-line:no-floating-promises
  }

  public get id(): string {
    return this._frontstageId;
  }

  public get isActive(): boolean {
    return FrontstageManager.activeFrontstageId === this._frontstageId;
  }
}

/** Command launch Backstage item definition.
 */
export class CommandLaunchBackstageItemDef extends BackstageItemDef {
  private _commandId: string = "";
  private _commandHandler?: CommandHandler;

  constructor(commandBackstageItemProps: CommandLaunchBackstageItemProps) {
    super(commandBackstageItemProps);

    if (commandBackstageItemProps && commandBackstageItemProps.execute) {
      this._commandHandler = { execute: commandBackstageItemProps.execute, parameters: commandBackstageItemProps.parameters, getCommandArgs: commandBackstageItemProps.getCommandArgs };
    }
  }

  public execute(): void {
    Backstage.hide();

    if (this._commandHandler && this._commandHandler.execute) {
      if (this._commandHandler.getCommandArgs)
        this._commandHandler.execute(this._commandHandler.getCommandArgs());
      else
        this._commandHandler.execute(this._commandHandler.parameters);
    }
  }

  public get id(): string {
    return this._commandId;
  }
}

/** Task launch Backstage item definition.
 */
export class TaskLaunchBackstageItemDef extends BackstageItemDef {
  private _taskId: string = "";
  private _workflowId: string = "";

  constructor(taskLaunchBackstageItemProps: TaskLaunchBackstageItemProps) {
    super(taskLaunchBackstageItemProps);

    if (taskLaunchBackstageItemProps) {
      this._taskId = taskLaunchBackstageItemProps.taskId;
      this._workflowId = taskLaunchBackstageItemProps.workflowId;
    }
  }

  public execute(): void {
    Backstage.hide();

    const workflow = WorkflowManager.findWorkflow(this._workflowId);
    if (workflow) {
      const task = workflow.getTask(this._taskId);
      if (task) {
        WorkflowManager.setActiveWorkflowAndTask(workflow, task); // tslint:disable-line:no-floating-promises
      }
    }
  }

  public get id(): string {
    return this._workflowId + ":" + this._taskId;
  }
}

/** Separator Backstage item definition.
 */
export class SeparatorBackstageItemDef extends BackstageItemDef {

  constructor(separatorBackstageItemProps: BackstageItemProps) {
    super(separatorBackstageItemProps);

    this.isEnabled = false;
  }

  public execute(): void { }
  public get id(): string { return ""; }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Frontstage launch Backstage item.
 */
export class FrontstageLaunchBackstageItem extends React.Component<FrontstageLaunchBackstageItemProps> {
  private _backstageItem: FrontstageLaunchBackstageItemDef;

  constructor(frontstageLauncherItemProps: FrontstageLaunchBackstageItemProps) {
    super(frontstageLauncherItemProps);

    this._backstageItem = new FrontstageLaunchBackstageItemDef(frontstageLauncherItemProps);
  }

  public render(): React.ReactNode {
    if (!this._backstageItem.isVisible)
      return null;

    const icon = <Icon iconSpec={this._backstageItem.iconSpec} />;
    return (
      <NZ_BackstageItem key={this._backstageItem.id}
        isActive={this._backstageItem.isActive}
        isDisabled={!this._backstageItem.isEnabled}
        label={this._backstageItem.label}
        icon={icon}
        onClick={this._backstageItem.execute} />
    );
  }
}

/** Command launch Backstage item.
 */
export class CommandLaunchBackstageItem extends React.Component<CommandLaunchBackstageItemProps> {
  private _backstageItem: CommandLaunchBackstageItemDef;

  constructor(commandBackstageItemProps: CommandLaunchBackstageItemProps) {
    super(commandBackstageItemProps);

    this._backstageItem = new CommandLaunchBackstageItemDef(commandBackstageItemProps);
  }

  public render(): React.ReactNode {
    if (!this._backstageItem.isVisible)
      return null;

    const icon = <Icon iconSpec={this._backstageItem.iconSpec} />;
    return (
      <NZ_BackstageItem key={this._backstageItem.id} label={this._backstageItem.label} icon={icon} onClick={this._backstageItem.execute} />
    );
  }
}

/** Task launch Backstage item.
 */
export class TaskLaunchBackstageItem extends React.Component<TaskLaunchBackstageItemProps> {
  private _backstageItem: TaskLaunchBackstageItemDef;

  constructor(taskLaunchBackstageProps: TaskLaunchBackstageItemProps) {
    super(taskLaunchBackstageProps);

    this._backstageItem = new TaskLaunchBackstageItemDef(taskLaunchBackstageProps);
  }

  public render(): React.ReactNode {
    if (!this._backstageItem.isVisible)
      return null;

    const icon = <Icon iconSpec={this._backstageItem.iconSpec} />;
    return (
      <NZ_BackstageItem key={this._backstageItem.id} label={this._backstageItem.label} icon={icon} onClick={this._backstageItem.execute} />
    );
  }
}

/** Separator Backstage item.
 */
export class SeparatorBackstageItem extends React.Component<BackstageItemProps> {
  private static _sSeparatorBackstageItemKey: number;
  private _key: number;
  private _backstageItem: SeparatorBackstageItemDef;

  constructor(separatorBackstageItemDef: BackstageItemProps) {
    super(separatorBackstageItemDef);

    SeparatorBackstageItem._sSeparatorBackstageItemKey++;
    this._key = SeparatorBackstageItem._sSeparatorBackstageItemKey;

    this._backstageItem = new SeparatorBackstageItemDef(separatorBackstageItemDef);

    this._backstageItem.isEnabled = false;
  }

  public render(): React.ReactNode {
    if (!this._backstageItem.isVisible)
      return null;

    return (
      <NZ_BackstageSeparator key={this._key} />
    );
  }
}

/** [[BackstageCloseEventEvent]] arguments.
 */
export interface BackstageCloseEventArgs {
  isVisible: boolean;
}

/** Backstage Close Event class.
 */
export class BackstageCloseEventEvent extends UiEvent<BackstageCloseEventArgs> { }

function closeBackStage() {
  Backstage.onBackstageCloseEventEvent.emit({ isVisible: false });
}

/** Properties for the [[Backstage]] React component.
 */
export interface BackstageProps {
  accessToken?: AccessToken;
  isVisible: boolean;
  className?: string;
  showOverlay?: boolean;
  style?: React.CSSProperties;
  onClose?: () => void;
}

/** Backstage React component.
 */
export class Backstage extends React.Component<BackstageProps> {
  private static _backstageCloseEventEvent: BackstageCloseEventEvent = new BackstageCloseEventEvent();
  public static get onBackstageCloseEventEvent(): BackstageCloseEventEvent { return Backstage._backstageCloseEventEvent; }

  constructor(props?: any, context?: any) {
    super(props, context);
  }

  public static hide(): void {
    closeBackStage();
  }

  private _onSignOut = () => {
    closeBackStage();
    FrontstageManager.openModalFrontstage(new SignOutModalFrontstage(this.props.accessToken));
  }

  private _getUserInfo(): React.ReactNode | undefined {
    if (this.props.accessToken) {
      const userInfo = this.props.accessToken.getUserInfo();
      if (userInfo) {
        return (
          <NZ_UserProfile firstName={userInfo.profile!.firstName} lastName={userInfo.profile!.lastName} email={userInfo.email!.id}
            onClick={this._onSignOut.bind(this)} />
        );
      }
    }

    return undefined;
  }

  public render(): React.ReactNode {
    return (
      <>
        <NZ_Backstage
          isOpen={this.props.isVisible}
          showOverlay={this.props.showOverlay}
          onClose={closeBackStage}
          header={this._getUserInfo()}
          items={this.props.children}
        />
      </>
    );
  }
}

// -----------------------------------------------------------------------------
// export default
// -----------------------------------------------------------------------------
export default Backstage;
