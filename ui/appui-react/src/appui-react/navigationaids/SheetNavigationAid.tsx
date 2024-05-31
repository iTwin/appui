/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import "./SheetNavigationAid.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  IModelConnection,
  ScreenViewport,
  SelectedViewportChangedArgs,
} from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import type { ViewIdChangedEventArgs } from "@itwin/imodel-components-react";
import { ViewportComponentEvents } from "@itwin/imodel-components-react";
import type { CommonProps } from "@itwin/core-react";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import type { ModalFrontstageInfo } from "../framework/FrameworkFrontstages";
import { UiFramework } from "../UiFramework";
import { ViewUtilities } from "../utils/ViewUtilities";
import { NavigationAidControl } from "./NavigationAidControl";
import type { CardSelectedEventArgs } from "./SheetsModalFrontstage";
import { CardContainer, SheetsModalFrontstage } from "./SheetsModalFrontstage";
import { IconButton, ProgressRadial } from "@itwin/itwinui-react";
import { SvgChevronLeft, SvgChevronRight } from "@itwin/itwinui-icons-react";

/** A Sheet Navigation Aid control.
 * @alpha
 */
export class SheetNavigationAidControl extends NavigationAidControl {
  public static navigationAidId = "SheetNavigationAid";

  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = <SheetNavigationAid iModelConnection={options.imodel} />;
  }

  public override getSize(): string | undefined {
    return "96px";
  }
}

/** Data displayed about sheet
 * @alpha
 */
export interface SheetData {
  name: string;
  viewId: string;
}

/** Properties for the [[SheetNavigationAid]] component
 * @alpha
 */
export interface SheetNavigationProps extends CommonProps {
  iModelConnection: IModelConnection;
}

/** @internal */
interface SheetNavigationState {
  index: number;
  sheetData: SheetData[];
}

/** A Sheet Navigation Aid.
 * @alpha
 */
export class SheetNavigationAid extends React.Component<
  SheetNavigationProps,
  SheetNavigationState
> {
  private _isMounted = false;

  /** @internal */
  public override readonly state: Readonly<SheetNavigationState> = {
    index: 0,
    sheetData: [],
  };

  private _viewport: ScreenViewport | undefined;

  constructor(props: SheetNavigationProps) {
    super(props);

    this._viewport = IModelApp.viewManager.selectedView;
  }

  /** Adds listeners when components mounts */
  public override async componentDidMount() {
    this._isMounted = true;

    CardContainer.onCardSelectedEvent.addListener(this._handleCardSelected);
    ViewportComponentEvents.onViewIdChangedEvent.addListener(
      this._handleViewIdChanged
    );

    IModelApp.viewManager.onSelectedViewportChanged.addListener(
      this._handleSelectedViewportChanged
    );

    const stateData = await this._setupSheets();

    if (this._isMounted) this.setState(stateData);
  }

  /** Removes listeners when component will unmount */
  public override componentWillUnmount() {
    this._isMounted = false;

    CardContainer.onCardSelectedEvent.removeListener(this._handleCardSelected);
    ViewportComponentEvents.onViewIdChangedEvent.removeListener(
      this._handleViewIdChanged
    );

    IModelApp.viewManager.onSelectedViewportChanged.removeListener(
      this._handleSelectedViewportChanged
    );
  }

  /** Queries for sheet info and sets as sheetData */
  private async _setupSheets(): Promise<SheetNavigationState> {
    const stateData: SheetNavigationState = {
      index: 0,
      sheetData: [],
    };

    if (
      !this.props.iModelConnection ||
      !this.props.iModelConnection.views.getViewList
    )
      return stateData;

    let viewId = "";
    if (this._viewport) {
      viewId = this._viewport.view.id.toString();
    }

    const sheets = await this.props.iModelConnection.views.getViewList({
      from: "BisCore.SheetViewDefinition",
    });
    sheets.forEach((viewSpec: IModelConnection.ViewSpec, index: number) => {
      stateData.sheetData.push({ name: viewSpec.name, viewId: viewSpec.id });
      if (viewSpec.id === viewId) stateData.index = index;
    });

    return stateData;
  }

  /** @internal */
  public override render(): React.ReactNode {
    const name =
      this.state.sheetData.length > 0
        ? this.state.sheetData[this.state.index].name
        : "";
    const leftIndex =
      this.state.index === 0
        ? this.state.sheetData.length - 1
        : this.state.index - 1;
    const rightIndex =
      this.state.index >= this.state.sheetData.length - 1
        ? 0
        : this.state.index + 1;
    const leftTitle = this.state.sheetData[leftIndex]
      ? this.state.sheetData[leftIndex].name
      : undefined;
    const rightTitle = this.state.sheetData[rightIndex]
      ? this.state.sheetData[rightIndex].name
      : undefined;

    let content: React.ReactNode;
    // istanbul ignore if
    if (this.state.sheetData.length > 0) {
      content = (
        <>
          <div className="sheet-title">
            {UiFramework.translate("general.sheet")}
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className="sheet-name"
            title={name}
            onClick={this._handleOnClickSheetName}
            role="button"
            tabIndex={-1}
          >
            {name}
          </div>
          <div className="sheet-container">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <IconButton
              size="small"
              styleType="borderless"
              onClick={this._handleOnClickLeftArrow}
              tabIndex={-1}
              title={leftTitle}
            >
              <SvgChevronLeft />
            </IconButton>
            <div>
              {this.state.index + 1} {UiFramework.translate("general.of")}
              {this.state.sheetData.length}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <IconButton
              size="small"
              styleType="borderless"
              onClick={this._handleOnClickRightArrow}
              role="button"
              tabIndex={-1}
              title={rightTitle}
            >
              <SvgChevronRight />
            </IconButton>
          </div>
        </>
      );
    } else {
      content = <ProgressRadial size="x-small" indeterminate />;
    }

    return (
      <div
        className={classnames("uifw-sheet-navigation", this.props.className)}
        style={this.props.style}
      >
        {content}
      </div>
    );
  }

  /** Sets index of newly selected card */
  // eslint-disable-next-line deprecation/deprecation
  private _handleCardSelected = (event: CardSelectedEventArgs) => {
    event &&
      this.setState({
        index: event.index,
      });
  };

  /** Updates view to the next lowest index in sheetData */
  private _handleOnClickLeftArrow = () => {
    this.setState(
      (prevState) => ({
        index:
          prevState.index <= 0
            ? prevState.sheetData.length - 1
            : prevState.index - 1,
      }),
      async () => this._updateView()
    );
  };

  /** Updates view to next highest index in sheetData */
  private _handleOnClickRightArrow = () => {
    this.setState(
      (prevState) => ({
        index: (prevState.index + 1) % prevState.sheetData.length,
      }),
      async () => this._updateView()
    );
  };

  /** Handles a Viewport change & synchs the index */
  private _handleSelectedViewportChanged = (
    args: SelectedViewportChangedArgs
  ) => {
    if (args.current) {
      this._handleViewportChanged(args.current);
    }
  };

  // eslint-disable-next-line deprecation/deprecation
  private _handleViewIdChanged = (args: ViewIdChangedEventArgs) => {
    if (this._viewport === args.viewport)
      this._handleViewportChanged(args.viewport as ScreenViewport);
  };

  /** Handles a Viewport change & synchs the index */
  private _handleViewportChanged = (viewport: ScreenViewport) => {
    const className = ViewUtilities.getBisBaseClass(
      viewport.view.classFullName
    );

    if (ViewUtilities.isSheet(className)) {
      this._viewport = viewport;

      const viewId = this._viewport.view.id.toString();

      const index = this.state.sheetData.findIndex((sheetData: SheetData) => {
        return viewId === sheetData.viewId;
      });

      if (index >= 0) this.setState({ index });
    }
  };

  /** Updates view to currently set sheet */
  private async _updateView() {
    const viewState = await this.props.iModelConnection.views.load(
      this.state.sheetData[this.state.index].viewId
    );
    if (this._viewport) this._viewport.changeView(viewState);
  }

  /** Creates a new SheetsModalFrontstage */
  private modalFrontstage(): ModalFrontstageInfo {
    return new SheetsModalFrontstage(
      this.state.sheetData,
      this.props.iModelConnection,
      this.state.index
    );
  }

  /** Opens a new SheetsModelFrontstage on sheetName click */
  private _handleOnClickSheetName = () => {
    UiFramework.frontstages.openModalFrontstage(this.modalFrontstage());
  };
}
