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
import type {
  ViewportProps,
  ViewStateProp,
} from "@itwin/imodel-components-react";
import { ViewportComponent } from "@itwin/imodel-components-react";
import { FillCentered } from "@itwin/core-react";

import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import { UiFramework } from "../UiFramework.js";
import { DefaultViewOverlay } from "./DefaultViewOverlay.js";
import { ViewportContentControl } from "./ViewportContentControl.js";
import { StandardRotationNavigationAidControl } from "../navigationaids/StandardRotationNavigationAid.js";
import { UiError } from "@itwin/appui-abstract";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState.js";
import { ConfigurableUiContext } from "../configurableui/ConfigurableUiContent.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Viewport that is connected to the IModelConnection property in the Redux store. The application must set up the Redux store and include the FrameworkReducer.
 * @note Requires redux provider.
 * @public
 * @deprecated in 4.15.0. Use {@link @itwin/imodel-components-react#ViewportComponent} instead.
 */
export function IModelConnectedViewport(
  props: Omit<ViewportProps, "imodel" | "viewState">
) {
  const iModel = useReduxFrameworkState(
    (state) => state?.sessionState.iModelConnection
  );
  const viewState = useReduxFrameworkState(
    (state) => state?.sessionState.defaultViewState
  );
  if (!iModel) return null;
  return <ViewportComponent imodel={iModel} viewState={viewState} {...props} />;
}

/** [[IModelViewportControl]] options. These options are set in the applicationData property of the [[ContentProps]].
 * @public
 * @deprecated in 4.16.0. Used in a deprecated class {@link IModelViewportControl}.
 */
export interface IModelViewportControlOptions {
  /** ViewState or a function to return a ViewState */
  viewState?: ViewStateProp;
  /** IModelConnection of data in Viewport */
  iModelConnection?: IModelConnection | (() => IModelConnection);
  /** Map of options that can be used to enable/disable features within the view */
  featureOptions?: { [key: string]: any };
  /** Optional background color which may be used if viewState and iModelConnection are undefined */
  bgColor?: string;
  /** Optional property to always use the supplied `viewState` property instead of using viewport.view when set */
  alwaysUseSuppliedViewState?: boolean;
  /** Optional property to supply custom view overlay. Uses when caller want to supply custom overlay component. */
  supplyViewOverlay?: (_viewport: ScreenViewport) => React.ReactNode;
  /** Optional property to defer reactNode initialization until first reactNode property is needed. Useful when subClassing the `IModelViewportControl`. */
  deferNodeInitialization?: boolean;
}

interface ViewOverlayHostProps {
  viewport: ScreenViewport;
  featureOptions?: { [key: string]: any };
  userSuppliedOverlay?: (_viewport: ScreenViewport) => React.ReactNode;
}

/** @internal */
export function ViewOverlayHost({
  viewport,
  featureOptions,
  userSuppliedOverlay,
}: ViewOverlayHostProps) {
  const reduxDisplayViewOverlay = useReduxFrameworkState(
    (state) => state?.configurableUiState.viewOverlayDisplay
  );
  const configurableUi = React.useContext(ConfigurableUiContext);
  const displayViewOverlay =
    configurableUi?.viewOverlay ?? reduxDisplayViewOverlay ?? true;
  if (!displayViewOverlay) return null;
  return userSuppliedOverlay ? (
    <React.Fragment>{userSuppliedOverlay(viewport)}</React.Fragment>
  ) : (
    <DefaultViewOverlay viewport={viewport} featureOptions={featureOptions} />
  );
}

/** iModel Viewport Control
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/imodel-components-react#ViewportComponent} component instead.
 */
export class IModelViewportControl extends ViewportContentControl {
  public static get id() {
    return "UiFramework.IModelViewportControl";
  }
  protected _featureOptions: { [key: string]: boolean | string } = {};
  protected _viewState: ViewStateProp | undefined;
  protected _iModelConnection: IModelConnection | undefined;
  protected _alwaysUseSuppliedViewState: boolean;
  private _userSuppliedViewOverlay?: (
    _viewport: ScreenViewport
  ) => React.ReactNode;

  constructor(
    info: ConfigurableCreateInfo,
    protected _options: IModelViewportControlOptions
  ) {
    _options = _options ?? {};
    super(info, _options);
    this._options = _options;

    if (_options.featureOptions) this._featureOptions = _options.featureOptions;
    this._alwaysUseSuppliedViewState =
      _options.alwaysUseSuppliedViewState ?? false;
    this._userSuppliedViewOverlay = _options.supplyViewOverlay;

    if (!_options.deferNodeInitialization) this.initializeReactNode();
  }

  protected initializeReactNode() {
    const options = this._options;

    if (options.viewState) this._viewState = options.viewState;

    const iModelConnection =
      typeof options.iModelConnection === "function"
        ? options.iModelConnection()
        : options.iModelConnection;

    if (this._viewState && iModelConnection) {
      /** Passing _determineViewState as a function reference; it is not called here. */
      this._reactNode = this.getImodelViewportReactElement(
        iModelConnection,
        this._determineViewState
      );
    } else {
      if (
        UiFramework.getIModelConnection() &&
        UiFramework.getDefaultViewState()
      ) {
        this._reactNode = this.getImodelConnectedViewportReactElement();
      } else {
        this._reactNode = this.getNoContentReactElement(options);
        this.setIsReady();
      }
    }
  }

  protected override getReactNode(): React.ReactNode {
    if (
      !React.isValidElement(this._reactNode) &&
      this._options.deferNodeInitialization
    )
      this.initializeReactNode();

    return this.getKeyedReactNode();
  }

  /**
   * This is passed as a function to the ViewportComponent as the `viewState` prop in getImodelViewportReactElement().
   * It is called by ViewportComponent on a mount to resolve the viewState.
   */
  private _determineViewState = (): ViewState => {
    let viewState: ViewState;

    if (this.viewport && !this._alwaysUseSuppliedViewState)
      viewState = this.viewport.view;
    else if (this._viewState) {
      if (typeof this._viewState === "function") viewState = this._viewState();
      else viewState = this._viewState;
    } else
      throw new UiError(
        UiFramework.loggerCategory("IModelViewport"),
        "No ViewState could be determined"
      );

    return viewState!;
  };

  /** Get the React component that will contain the Viewport */
  protected getImodelConnectedViewportReactElement(): React.ReactNode {
    return (
      <IModelConnectedViewport
        viewportRef={(v) => {
          this.viewport = v;
          // for convenience, if window defined bind viewport to window
          if (undefined !== window) (window as any).viewport = v;
          if (!UiFramework.frontstages.isLoading)
            UiFramework.frontstages.activeFrontstageDef?.setActiveViewFromViewport(
              v
            );
        }}
        getViewOverlay={this._getViewOverlay}
      />
    );
  }

  /** Get the React component that will contain the Viewport */
  protected getImodelViewportReactElement(
    iModelConnection: IModelConnection,
    viewState: ViewStateProp
  ): React.ReactNode {
    return (
      <ViewportComponent
        viewState={viewState}
        imodel={iModelConnection}
        controlId={this.controlId}
        viewportRef={(v) => {
          this.viewport = v;
          // for convenience, if window defined bind viewport to window
          if (undefined !== window) (window as any).viewport = v;
          if (!UiFramework.frontstages.isLoading)
            UiFramework.frontstages.activeFrontstageDef?.setActiveViewFromViewport(
              v
            );
        }}
        getViewOverlay={this._getViewOverlay}
      />
    );
  }

  /** Get the React component that will be shown when no iModel data is available */
  protected getNoContentReactElement(
    _options: IModelViewportControlOptions
  ): React.ReactNode {
    return (
      <FillCentered>{UiFramework.translate("general.no-content")}</FillCentered>
    );
  }

  /** Get the React.Element for a ViewSelector change. */
  public override getReactElementForViewSelectorChange(
    iModelConnection: IModelConnection,
    _unusedViewDefinitionId: Id64String,
    viewState: ViewState,
    _name: string
  ): React.ReactNode {
    return this.getImodelViewportReactElement(iModelConnection, viewState);
  }

  /** Get the default ViewOverlay unless parameter is set to not use it. May be override in an application specific sub-class  */
  protected _getViewOverlay = (vp: ScreenViewport): React.ReactNode => {
    return (
      <ViewOverlayHost
        viewport={vp}
        featureOptions={this._featureOptions}
        userSuppliedOverlay={this._userSuppliedViewOverlay}
        data-testid="ViewOverlay"
      />
    );
  };

  /** Get the NavigationAidControl associated with this ContentControl */
  public override get navigationAidControl(): string {
    if (this.viewport) return super.navigationAidControl;
    else return StandardRotationNavigationAidControl.navigationAidId;
  }
}
