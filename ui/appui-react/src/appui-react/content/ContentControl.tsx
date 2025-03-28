/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import * as React from "react";
import type { Id64String } from "@itwin/core-bentley";
import type {
  IModelConnection,
  ScreenViewport,
  ViewState,
} from "@itwin/core-frontend";
import { UiEvent } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo,
  ConfigurableUiControl,
  ConfigurableUiControlType,
} from "../configurableui/ConfigurableUiControl.js";
import { Widget } from "../widgets/Widget.js";
import { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import { ContentOverlay } from "./ContentOverlay.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** ControlControl Activated Event Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ContentControlActivatedEventArgs {
  activeContentControl: ContentControl;
  oldContentControl?: ContentControl;
}

/** ContentControl Activated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ContentControlActivatedEvent extends UiEvent<ContentControlActivatedEventArgs> {}

/** Interface to be implemented when the ContentControl supports ViewSelector changes
 * @public
 * @deprecated in 4.16.0. Implemented by classes derived from a deprecated {@link ContentControl}.
 */
export interface SupportsViewSelectorChange {
  /** Returns true if this control supports reacting to ViewSelector changes. */
  supportsViewSelectorChange: boolean;
  /** Process a ViewSelector change. */
  processViewSelectorChange(
    iModel: IModelConnection,
    viewDefinitionId: Id64String,
    viewState: ViewState,
    name: string
  ): Promise<void>;
}

/** The base class for Frontstage content controls.
 * @public
 * @deprecated in 4.16.0. Extends a deprecated class {@link ConfigurableUiControl}.
 */
export class ContentControl extends ConfigurableUiControl {
  protected _reactNode: React.ReactNode;
  private _keyAdded = false;

  /** Creates an instance of ContentControl.
   * @param info         An object that the subclass must pass to this base class.
   * @param options      Options provided via the applicationData in a [[ContentProps]].
   */
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  /** Called when this ContentControl is activated */
  public onActivated(): void {}

  /** Called when this ContentControl is deactivated */
  public onDeactivated(): void {}

  /** Gets the type of ConfigurableUiControl, which is 'Content' in this case */
  public getType(): ConfigurableUiControlType {
    return ConfigurableUiControlType.Content;
  }

  /** Returns true if this control is a Viewport control. */
  public get isViewport(): boolean {
    return false;
  }
  /** Returns the ScreenViewport if isViewport is true */
  public get viewport(): ScreenViewport | undefined {
    return undefined;
  }

  protected getKeyedReactNode(): React.ReactNode {
    if (!this._keyAdded && React.isValidElement(this._reactNode)) {
      if (!(this._reactNode as React.ReactElement<any>).key) {
        const additionalProps: any = { key: this.uniqueId };
        this._reactNode = React.cloneElement(this._reactNode, additionalProps);
      }
      this._keyAdded = true;
    }

    return this._reactNode;
  }

  protected getReactNode(): React.ReactNode {
    return this.getKeyedReactNode();
  }

  /** The React node associated with this control. */
  public get reactNode(): React.ReactNode {
    return this.getReactNode();
  }

  public set reactNode(r: React.ReactNode) {
    this._reactNode = r;
  }

  /** Get the NavigationAidControl associated with this ContentControl */
  public get navigationAidControl(): string {
    return "";
  }
}

/**
 * @beta
 * @deprecated in 4.16.0. Use {@link UiItemsProvider} to provide a floating {@link Widget} instead.
 * Additionally, use {@link ContentOverlay} component to display the active content indicator.
 */
export class FloatingContentControl extends ContentControl {
  constructor(uniqueId: string, name: string, node: React.ReactNode) {
    super(new ConfigurableCreateInfo(name, uniqueId, name), undefined);
    this._reactNode = node;
  }
}
