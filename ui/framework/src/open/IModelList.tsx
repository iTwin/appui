import * as React from "react";
import { IModelCard } from "./IModelCard";
import { IModelInfo } from "../clientservices/IModelServices";
import { AccessToken } from "@bentley/imodeljs-clients";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { ViewDefinitionProps } from "@bentley/imodeljs-common";
import { Id64Props } from "@bentley/bentleyjs-core";
import { IModelViewsSelectedFunc } from "../openimodel/IModelPanel";
import * as classnames from "classnames";
import { ProjectDialog } from "./ProjectDialog";
import { SwitchControl } from "./SwitchControl";
import { SearchBox } from "@bentley/ui-core";

import "./IModelList.scss";

export interface IModelListProps {
  accessToken: AccessToken;
  iModels?: IModelInfo[];
  onIModelSelected?: (iModelInfo: IModelInfo) => any;
  onIModelViewsSelected: IModelViewsSelectedFunc;

  // actions:
  setSelectedViews: (viewsSelected: Id64Props[]) => any;
}

interface IModelListState {
  showDescriptions: boolean;
  showProjectDialog: boolean;
  waitingForIModelConnection: boolean;
  currentIModel?: IModelInfo;
  currentViews: ViewDefinitionProps[];
  iModelConnection?: IModelConnection;
  showDetails: boolean;
  filter: string;
}

export class IModelList extends React.Component<IModelListProps, IModelListState> {

  constructor(props?: any, context?: any) {
    super(props, context);

    this.state = {
      showDescriptions: true, /* show descriptions by default */
      showProjectDialog: false,
      waitingForIModelConnection: true,
      currentViews: [],
      showDetails: false,
      filter: "",
    };
  }

  private onIModelSelected(iModelInfo: IModelInfo) {
    if (this.props.onIModelSelected)
      this.props.onIModelSelected!(iModelInfo);
  }

  private onShowThumbnails = () => {
    this.setState({ showDetails: false });
  }

  private onShowDetails = () => {
    this.setState({ showDetails: true });
  }

  private onShowProjectsSelector = () => {
    this.setState({ showProjectDialog: true });
  }

  private onProjectsSelectorClose = () => {
    this.setState({ showProjectDialog: false });
  }

  private handleSearchValueChanged = (value: string): void => {
    this.setState( { filter: value} );
  }

  private onIModelOfflineChange = (checked: boolean): void => {
    if (checked) {
    } else {
    }
  }

  private getFilteredIModels(): IModelInfo[] {
    let iModels: IModelInfo[] = [];
    if (this.props.iModels) {
      iModels = this.props.iModels!.filter((iModel) => iModel.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    }
    return iModels;
  }

  private renderIModel(iModelInfo: IModelInfo) {
    const size = Math.floor(Math.random() * 100).toString() + " MB";
    const checked = Math.random() > .5;
    return (
      <tr>
        <td><span className="icon icon-imodel-2" />{iModelInfo.name}</td>
        <td>{size}</td>
        <td>This device</td>
        <td>{iModelInfo.createdDate.toLocaleString()}</td>
        <td>
          <SwitchControl id={iModelInfo.wsgId} defaultValue={checked} onChange={this.onIModelOfflineChange}/>
        </td>
      </tr>
    );
  }

  private renderThumbnails(iModels: IModelInfo[]) {
    return  (
      <div className="cards">
        {iModels.map((iModelInfo: IModelInfo) => (
          <IModelCard key={iModelInfo.wsgId}
            accessToken={this.props.accessToken}
            iModel={iModelInfo}
            showDescription={this.state.showDescriptions}
            onIModelViewsSelected={this.props.onIModelViewsSelected}
            setSelectedViews={this.props.setSelectedViews}
            selectModel={this.onIModelSelected.bind(this, iModelInfo)} />
        ))}
      </div>
    );
  }

  private renderList(iModels: IModelInfo[]) {
    return (
      <div className="table-container fade-in-fast">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Location</th>
              <th>Opened</th>
              <th>Offline</th>
            </tr>
          </thead>
          <tbody>
            {iModels.map((iModelInfo: IModelInfo) => (this.renderIModel(iModelInfo)))}
          </tbody>
        </table>
      </div>
    );
  }

  private renderContent() {
    if (!this.props.iModels || this.props.iModels.length === 0) {
      return (
        <div className="cards-empty">
          <div className="fade-in-fast">
            There are no iModels associated to this project.
            <button onClick={this.onShowProjectsSelector}>Search for active projects in your Organization?</button>
          </div>
        {this.state.showProjectDialog && <ProjectDialog accessToken={this.props.accessToken} onClose={this.onProjectsSelectorClose}/>}
      </div>
      );
    } else {
      const filteredIModels = this.getFilteredIModels();
      return (
        <div>
          {!this.state.showDetails && this.renderThumbnails(filteredIModels)}
          {this.state.showDetails && this.renderList(filteredIModels)}
          {filteredIModels.length === 0 &&
            <span className="cards-noresults fade-in-fast">No matches found for '{this.state.filter}'.</span>
          }
        </div>
      );
    }
  }

  public render() {
    const classThumbnails = classnames("viewtype icon icon-app-launcher", !this.state.showDetails && "active");
    const classList = classnames("viewtype icon icon-list", this.state.showDetails && "active");
    return (
      <div className="cards-content">
        <div className="header">
          <span className="title">Recent</span>
          <SearchBox placeholder="Search ..." onValueChanged={this.handleSearchValueChanged} valueChangedDelay={300} />
          <span className={classThumbnails} title="Thumbnails" onClick={this.onShowThumbnails} />
          <span className={classList} title="List" onClick={this.onShowDetails} />
        </div>
        <div className="cards-scroll-y">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
