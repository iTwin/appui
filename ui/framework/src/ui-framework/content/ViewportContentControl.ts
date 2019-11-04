/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ContentView */

import { ScreenViewport, IModelApp, IModelConnection, ViewState, SpatialViewState, OrthographicViewState, DrawingViewState, SheetViewState } from "@bentley/imodeljs-frontend";
import { Id64String } from "@bentley/bentleyjs-core";

import { ConfigurableUiControlType, ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import { ContentControl, SupportsViewSelectorChange } from "./ContentControl";
import { ViewUtilities } from "../utils/ViewUtilities";
import { ContentViewManager } from "./ContentViewManager";
import { SheetNavigationAidControl } from "../navigationaids/SheetNavigationAid";
import { DrawingNavigationAidControl } from "../navigationaids/DrawingNavigationAid";
import { CubeNavigationAidControl } from "../navigationaids/CubeNavigationAid";

/** The base class for Frontstage Viewport content controls.
 * @public
 */
export class ViewportContentControl extends ContentControl implements SupportsViewSelectorChange {
  private _viewport: ScreenViewport | undefined;
  private _isReady: Promise<void>;
  private _viewportReadyCallback?: () => void;

  /** Creates an instance of ViewportContentControl.
   * @param info         An object that the subclass must pass to this base class.
   * @param options      Options provided via the applicationData in a [[ContentProps]].
   */
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this._isReady = new Promise<void>((onSuccess: () => void, _onFailure: () => void): void => {
      this._viewportReadyCallback = onSuccess;
    });
  }

  /** Gets the type of ConfigurableUiControl, which is 'Viewport' in this case */
  public getType(): ConfigurableUiControlType { return ConfigurableUiControlType.Viewport; }

  /** Returns true if this control is a Viewport control. */
  public get isViewport(): boolean { return true; }
  /** Gets the ScreenViewport */
  public get viewport(): ScreenViewport | undefined { return this._viewport; }
  /** Sets the ScreenViewport */
  public set viewport(v: ScreenViewport | undefined) {
    this._viewport = v;
    this.setIsReady();
  }

  /** Returns a promise that resolves when the control is ready for usage.
   */
  public setIsReady(): void {
    // istanbul ignore else
    if (this._viewportReadyCallback) {
      this._viewportReadyCallback();
    }
  }

  /** Returns a promise that resolves when the control is ready for usage.
   */
  public get isReady(): Promise<void> { return this._isReady; }

  /** Called when this ContentControl is activated */
  public onActivated(): void {
    super.onActivated();
  }

  /** Get the NavigationAidControl associated with this ContentControl */
  public get navigationAidControl(): string {
    let navigationAidId = "";

    // istanbul ignore else
    if (this.viewport) {
      navigationAidId = this._getNavigationAid(this.viewport.view.classFullName);
    }

    return navigationAidId;
  }

  /**
   * Fetches appropriate NavigationAid based on the class of the current viewport.
   * @param classFullName The full name of the current viewport class.
   * @returns The ID of the navigation aid to be displayed.
   */
  private _getNavigationAid = (classFullName: string) => {
    const className = ViewUtilities.getBisBaseClass(classFullName);
    let navigationAidId = "";

    switch (className) {
      case SheetViewState.className:
        navigationAidId = SheetNavigationAidControl.navigationAidId;
        break;
      case DrawingViewState.className:
        navigationAidId = DrawingNavigationAidControl.navigationAidId;
        break;
      case SpatialViewState.className:
      case OrthographicViewState.className:
        navigationAidId = CubeNavigationAidControl.navigationAidId;
        break;
    }

    return navigationAidId;
  }

  /** Returns true if this control supports processing ViewSelector changes. */
  public get supportsViewSelectorChange(): boolean { return true; }

  /** Process a ViewSelector change. */
  // istanbul ignore next
  public async processViewSelectorChange(iModel: IModelConnection, viewDefinitionId: Id64String, viewState: ViewState, name: string): Promise<void> {
    if (this.viewport) {
      if (IModelApp.viewManager && this.viewport === IModelApp.viewManager.selectedView)
        this.viewport.changeView(viewState);
    } else {
      this.reactElement = this.getReactElementForViewSelectorChange(iModel, viewDefinitionId, viewState, name);
      ContentViewManager.refreshActiveContent(this.reactElement);
    }
  }

  /** Get the React.Element for a ViewSelector change. */
  // istanbul ignore next
  public getReactElementForViewSelectorChange(_iModel: IModelConnection, _viewDefinitionId: Id64String, _viewState: ViewState, _name: string): React.ReactNode { return null; }
}
