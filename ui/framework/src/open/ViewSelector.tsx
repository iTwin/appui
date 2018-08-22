import * as React from "react";
import * as classnames from "classnames";
import { UiFramework } from "../UiFramework";
import { ViewQueryParams, ViewDefinitionProps } from "@bentley/imodeljs-common";
import { IModelInfo } from "../clientservices/IModelServices";
import { AccessToken } from "@bentley/imodeljs-clients/lib";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import "./Common.scss";
import "./ViewSelector.scss";

interface ViewCardProps {
  view: ViewDefinitionProps;
  onClick?: () => any;
}

interface ViewCardState {
  isSelected: boolean;
}

export class ViewCard extends React.Component<ViewCardProps, ViewCardState> {

  constructor(props?: any, context?: any) {
    super(props, context);

    this.state = { isSelected: false };
  }

  private onClicked = (_event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isSelected: !this.state.isSelected },
      () => {
        if (this.props.onClick)
          this.props.onClick ();
      },
    );
  }

  public render() {
    let name: string | undefined = this.props.view.code!.value;
    if (!name)
      return undefined;
    let lastIndex: number;
    if ((name.length > 30) && (-1 !== (lastIndex = name.lastIndexOf("\\"))))
      name = name.substring(lastIndex + 1);
    const cardClassName = classnames ("view-card", this.state.isSelected && "isActive");
    return (
      <div className={cardClassName} onClick={this.onClicked}>
          <div className="view-card-content">
            <img className="view-card-thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" />
            <div className="view-card-name">{name}</div>
          </div>
      </div>
    );
  }
}

interface ViewsProps {
  accessToken: AccessToken;
  iModel: IModelInfo;
  OnViewsSelected?: (iModel: IModelInfo, iModelConnection: IModelConnection, views: ViewDefinitionProps[]) => void;
  onClose: () => void;
}

interface ViewsState {
  views?: ViewDefinitionProps[];
  selectedViews: ViewDefinitionProps[];
  waitingForViews: boolean;
}

export class ViewSelector extends React.Component<ViewsProps, ViewsState> {
  private iModelConnection?: IModelConnection;

  constructor(props?: any, context?: any) {
    super(props, context);
    // start spinning
    this.state = { waitingForViews: true, selectedViews: [] };
  }

  // called when this component is first loaded
  public async componentDidMount() {
    this.startRetrieveViews();
  }

  private onClose = () => {
    if (this.props.onClose)
      this.props.onClose();
  }

  private onViewClick = (view: ViewDefinitionProps) => {
    const views = [...this.state.selectedViews];
    const index = views.findIndex((currentView) => currentView.id === view.id);
    if (index === -1)
      views.push(view); // selected, add the view
    else
      views.splice(index, 1); // unselected, remove the view
    this.setState({ selectedViews: views });
  }

  private onOKPressed = () => {
    if (this.props.OnViewsSelected && this.state.views)
      this.props.OnViewsSelected(this.props.iModel, this.iModelConnection!, this.state.selectedViews);
  }

  private async startRetrieveViews() {
    // TODO:  should be able to retrieve views w/o passing around accessToken!
    const accessToken = this.props.accessToken;
    const projectInfo = this.props.iModel.projectInfo;
    const iModelWsgId = this.props.iModel.wsgId;

    // this.setState({ waitingForViews: true });
    this.iModelConnection = await UiFramework.iModelServices.openIModel(accessToken, projectInfo, iModelWsgId);
    const viewQueryParams: ViewQueryParams = { wantPrivate: false };
    let viewProps: ViewDefinitionProps[] = [];
    try {
      viewProps = await this.iModelConnection.views.queryProps(viewQueryParams);
      this.setState({ views: viewProps, waitingForViews: false });
      for (const viewProp of viewProps) {
        // tslint:disable-next-line:no-console
        console.log(viewProp);
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log("error getting views", e);
    }
  }

  /*
  private onViewSelected(view: ViewDefinitionProps) {
    if (this.props.OnViewSelected)
      this.props.OnViewSelected!(view);
    // (this.props as any).dispatch({ type: "SELECTIMODEL", iModelInfo: selectedIModel });
  }
*/

  private renderViews() {
    if (this.state.waitingForViews) {
      return (
        <div className="loading"><div><i /><i /><i /><i /><i /><i /></div></div>
      );
    } else if (this.state.views && this.state.views.length > 0) {
      return (
        <div className="views-list">
          {this.state.views.map((view: ViewDefinitionProps, i: number) => (
            <ViewCard key={i} view={view} onClick={this.onViewClick.bind(this, view)} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="views-empty">
          There are no views defined.
        </div>
      );
    }
  }

  public render() {
    return (
      <div className="modal-background fade-in-fast">
        <div className="views animate">
          <div className="views-header">
            <h3>Select Views - {this.props.iModel.name}</h3>
            <span onClick={this.onClose.bind(this)} className="close icon icon-close" title="Close" />
          </div>
          {this.renderViews()}
          <div className="views-footer">
            <button data-tg-on={this.state.selectedViews.length} disabled={this.state.selectedViews.length === 0} onClick={this.onOKPressed}>Open</button>
          </div>
        </div>
      </div>
    );
  }
}
