/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module ClientServices */

import { ConnectClient, Project, ConnectRequestQueryOptions } from "@bentley/imodeljs-clients";
import { Logger } from "@bentley/bentleyjs-core";

import { ProjectServices, ProjectScope, ProjectInfo, ProjectReadStatus } from "./ProjectServices";
import { UiFramework } from "../UiFramework";
import { AuthorizedFrontendRequestContext } from "@bentley/imodeljs-frontend";

// istanbul ignore next
class ProjectInfoImpl implements ProjectInfo {
  public readStatus: ProjectReadStatus;

  constructor(public name: string, public projectNumber: string, public wsgId: string) {
    this.readStatus = ProjectReadStatus.NotRead;
  }
}

/**
 * Provides default [[ProjectServices]]
 * @internal
 */
// istanbul ignore next
export class DefaultProjectServices implements ProjectServices {
  private _connectClient: ConnectClient;

  constructor() {
    this._connectClient = new ConnectClient();
  }

  private createProjectInfo(thisProject: Project): ProjectInfo {
    Logger.logTrace(UiFramework.loggerCategory(this), `Working on project '${thisProject.name}'`);
    const thisProjectInfo: ProjectInfo = new ProjectInfoImpl(thisProject.name ? thisProject.name : "", thisProject.number ? thisProject.number : "", thisProject.wsgId);
    return thisProjectInfo;
  }

  /** Get projects accessible to the user based on various scopes/criteria */
  public async getProjects(projectScope: ProjectScope, top: number, skip: number, filter?: string): Promise<ProjectInfo[]> {
    const requestContext = await AuthorizedFrontendRequestContext.create();

    const queryOptions: ConnectRequestQueryOptions = {
      $select: "*", // TODO: Get Name,Number,AssetType to work
      $top: top,
      $skip: skip,
      $filter: filter,
    };

    let projectList: Project[];
    try {
      if (projectScope === ProjectScope.Invited) {
        projectList = await this._connectClient.getInvitedProjects(requestContext, queryOptions);
      } else {
        if (projectScope === ProjectScope.Favorites) {
          queryOptions.isFavorite = true;
        } else if (projectScope === ProjectScope.MostRecentlyUsed) {
          queryOptions.isMRU = true;
        }
        projectList = await this._connectClient.getProjects(requestContext, queryOptions);
      }
    } catch (e) {
      alert(JSON.stringify(e));
      return Promise.reject(e);
    }

    const projects: ProjectInfo[] = [];
    for (const thisProject of projectList) {
      projects.push(this.createProjectInfo(thisProject));
    }
    return projects;
  }
}
