/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { IModelInfo } from "../clientservices/IModelServices";
import { AccessToken } from "@bentley/imodeljs-clients";
import { ViewSelector } from "./ViewSelector";
import { ViewDefinitionProps } from "@bentley/imodeljs-common";
import { IModelConnection } from "@bentley/imodeljs-frontend/lib/frontend";
import "./IModelCard.scss";
import { IModelViewsSelectedFunc } from "../openimodel/IModelPanel";
import { Id64Props } from "@bentley/bentleyjs-core";
import { Popup} from "./Popup";

export interface IModelCardProps {
  showDescription?: boolean;
  iModel: IModelInfo;
  cardClassName?: string;
  thumbnailClassName?: string;
  fallbackIconClassName?: string;
  nameClassName?: string;
  accessToken: AccessToken;
  onViewsClicked?: () => any;
  selectModel: () => void;
  onIModelViewsSelected: IModelViewsSelectedFunc;

   // actions:
   setSelectedViews: (viewsSelected: Id64Props[]) => any;
}

interface IModelCardState {
  waitingForThumbnail: boolean;
  showViews: boolean;
  showOptions: boolean;
}

export class IModelCard extends React.Component<IModelCardProps, IModelCardState> {

  constructor(props: IModelCardProps, context?: any) {
    super(props, context);
    this.state = {
      waitingForThumbnail: false, showViews: false, showOptions: false,
    };
  }

  public static defaultProps: Partial<IModelCardProps> = {
    showDescription: true,
  };

  // called when this component is first loaded
  public async componentDidMount() {
    // we don't get the thumbnail until it's needed.
    if (!this.props.iModel.thumbnail)
      this.startRetrieveThumbnail(this.props.iModel);
  }

  // retrieves the IModels for a Project. Called when first mounted and when a new Project is selected.
  private async startRetrieveThumbnail(thisIModel: IModelInfo) {
    this.setState({ waitingForThumbnail: true });
    thisIModel.thumbnail = await UiFramework.iModelServices.getThumbnail(this.props.accessToken, thisIModel.projectInfo.wsgId, thisIModel.wsgId);
    this.setState({ waitingForThumbnail: false });
  }

  private _onCardClicked = () => {
    // if (this.props.selectModel)
    //  this.props.selectModel();
    this.setState({ showViews: true });
  }

  private _onShowOptions = () => {
    this.setState({ showOptions: true });
  }

  private _handleOnOutsideClick = () => {
    this.setState((_prevState) => ({ showOptions: false }));
  }

  private _onViewsClose = () => {
    this.setState({ showViews: false });
  }

  private _onViewsSelected = (iModelInfo: IModelInfo, iModelConnection: IModelConnection, views: ViewDefinitionProps[]) => {
    const viewIds: Id64Props[] = new Array<Id64Props>();
    for (const view of views ) {
      viewIds.push (view.id!);
    }

    this.props.onIModelViewsSelected(iModelInfo.projectInfo, iModelConnection, viewIds);
    this.props.setSelectedViews(viewIds);
  }

  private _onViewsClicked = () => {
    this._onCloseOptions();
    this.setState({ showViews: true });
  }

  private _onCloseOptions = () => {
    this.setState({ showOptions: false });
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
          <span className="icon icon-imodel-hollow-2" />
          <span className="open">Open</span>
        </div>
      );
    }
  }

  private renderDropdown() {
    return (
      <Popup className="options-dropdown fade-in-fast" showShadow={true} onClose={this._handleOnOutsideClick}>
        <ul>
          <li onClick={this._onViewsClicked}><span className="icon icon-visibility"/>Views</li>
        </ul>
      </Popup>
    );
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
            <div className="options">
              <span className="icon icon-more-2" onClick={this._onShowOptions}></span>
              {this.state.showOptions && this.renderDropdown()}
            </div>
          </div>
          {this.props.showDescription && this.renderDescription()}
        </div>
        {this.state.showViews &&
          <ViewSelector accessToken={this.props.accessToken} iModel={this.props.iModel} onClose={this._onViewsClose.bind(this)} OnViewsSelected={this._onViewsSelected.bind(this)} />}
      </div>
    );
  }
}
