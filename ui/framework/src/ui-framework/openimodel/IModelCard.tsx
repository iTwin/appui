/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module OpenIModel */

import * as React from "react";
import { UiFramework } from "../UiFramework";
import { IModelInfo } from "../clientservices/IModelServices";
import { AccessToken } from "@bentley/imodeljs-clients";
import { IModelViewPicker } from "./IModelViewPicker";
import { ViewDefinitionProps } from "@bentley/imodeljs-common";
import { Popup, Position } from "@bentley/ui-core";
import { PopupTest } from "./PopupTest";
import "./IModelCard.scss";

/** Properties for the [[IModelCard]] component */
export interface IModelCardProps {
  showDescription?: boolean;
  iModel: IModelInfo;
  accessToken: AccessToken;
  onSelectIModel?: (iModelInfo: IModelInfo, views: ViewDefinitionProps[]) => void;
}

interface IModelCardState {
  waitingForThumbnail: boolean;
  showViews: boolean;
  showOptions: boolean;
  showPopupTest: boolean;
}

/**
 * Card representing a single IModel
 */
export class IModelCard extends React.Component<IModelCardProps, IModelCardState> {

  constructor(props: IModelCardProps, context?: any) {
    super(props, context);
    this.state = { waitingForThumbnail: false, showViews: false, showOptions: false, showPopupTest: false };
  }

  public static defaultProps: Partial<IModelCardProps> = {
    showDescription: true,
  };

  // called when this component is first loaded
  public async componentDidMount() {
    // we don't get the thumbnail until it's needed.
    if (!this.props.iModel.thumbnail)
      this.startRetrieveThumbnail(this.props.iModel); // tslint:disable-line:no-floating-promises
  }

  // retrieves the IModels for a Project. Called when first mounted and when a new Project is selected.
  private async startRetrieveThumbnail(thisIModel: IModelInfo) {
    this.setState({ waitingForThumbnail: true });
    thisIModel.thumbnail = await UiFramework.iModelServices.getThumbnail(this.props.accessToken, thisIModel.projectInfo.wsgId, thisIModel.wsgId);
    this.setState({ waitingForThumbnail: false });
  }

  private _onCardClicked = () => {
    this.setState({ showViews: true });
  }

  private _onShowOptions = () => {
    this.setState({ showOptions: !this.state.showOptions });
  }

  private _onClose = () => {
    this.setState((_prevState) => ({ showOptions: false }));
  }

  private _onViewsClose = () => {
    this.setState({ showViews: false });
  }

  private _onViewsSelected = (views: ViewDefinitionProps[]) => {
    this._onViewsClose();
    if (this.props.onSelectIModel)
      this.props.onSelectIModel(this.props.iModel, views);
  }

  private _onViewsClicked = () => {
    this._onCloseOptions();
    this.setState({ showViews: true });
  }

  private _onPopupTestClicked = () => {
    this._onCloseOptions();
    this.setState({ showPopupTest: true });
  }

  private _onCloseOptions = () => {
    this.setState({ showOptions: false });
  }

  private _onClosePopupTest = () => {
    this.setState({ showPopupTest: false });
  }

  private renderDescription() {
    if (this.props.iModel.description && this.props.iModel.description.length > 0) {
      return (
        <span className="imodel-card-description">{this.props.iModel.description}</span>
      );
    } else {
      return (
        <span className="imodel-card-description" style={{ fontStyle: "italic" }}>No description</span>
      );
    }
  }

  public renderThumbnail() {
    if (this.state.waitingForThumbnail) {
      return (
        <div className="preview-loader">
          <span><i /><i /><i /><i /><i /><i /></span>
        </div>
      );
    } else if (this.props.iModel.thumbnail) {
      return (
        <div className="preview-container">
          <img className="thumbnail" id="base64image" src={this.props.iModel.thumbnail} />
          <span className="open">Open</span>
        </div>
      );
    } else {
      return (
        <div className="preview-container">
          <span className="icon icon-placeholder" />
          <span className="open">Open</span>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="imodel-card" >
        <div className="imodel-card-content" >
          <div className="imodel-card-preview" onClick={this._onCardClicked}>
            {this.renderThumbnail()}
          </div>
          <div className="imodel-card-name">
            <span className="text">{this.props.iModel.name}</span>
            <div className="options" >
              <span className="icon icon-more-2" onClick={this._onShowOptions}></span>
              <Popup isShown={this.state.showOptions} position={Position.BottomRight}
                onClose={this._onClose}>
                <ul className="options-dropdown">
                  <li onClick={this._onViewsClicked}><span className="icon icon-visibility" />Views</li>
                  <li onClick={this._onPopupTestClicked}><span className="icon icon-placeholder" />Details</li>
                </ul>
              </Popup>
            </div>
          </div>
          {this.props.showDescription && this.renderDescription()}
        </div>
        {this.state.showViews &&
          <IModelViewPicker accessToken={this.props.accessToken} iModel={this.props.iModel} onClose={this._onViewsClose.bind(this)} OnViewsSelected={this._onViewsSelected.bind(this)} />}
        {this.state.showPopupTest && <PopupTest onClose={this._onClosePopupTest} />}
      </div>
    );
  }
}
