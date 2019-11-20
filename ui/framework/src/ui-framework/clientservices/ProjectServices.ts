/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ClientServices */

// This file defines the Project-related service interface that applications can provide if they want to override the default behavior.

/** The possible status values for reading ProjectInfo from CONNECT.
 * @internal
 */
export enum ProjectReadStatus {
  NotRead,
  Reading,
  DoneReading,
}

/** The possible values for Project scope in the CONNECT environment.
 * @internal
 */
export enum ProjectScope {
  Favorites,
  MostRecentlyUsed,
  Invited,
  All,
}

/** Information required to display a CONNECT Project to the user.
 * @internal
 */
export interface ProjectInfo {
  name: string;
  projectNumber: string;
  wsgId: string;
  readStatus: ProjectReadStatus;
}

/** Interface for Project services
 * @internal
 */
export interface ProjectServices {

  /**
   * Retrieve the Projects for the specified ProjectScope to which the logged in user has access.
   * The top and skip arguments are used for paging when there are large numbers of projects.
   */
  getProjects(projectScope: ProjectScope, top: number, skip: number, filter?: string): Promise<ProjectInfo[]>;
}
