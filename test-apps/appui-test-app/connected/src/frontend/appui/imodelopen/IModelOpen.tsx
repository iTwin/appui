/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./IModelOpen.scss";
import "./Common.scss";
import * as React from "react";
import {
  ITwin,
  ITwinsAccessClient,
  ITwinsAPIResponse,
  ITwinSubClass,
} from "@itwin/itwins-client";
import { IModelApp } from "@itwin/core-frontend";
import { BasicIModelInfo, IModelInfo } from "../ExternalIModel";
import { ITwinDropdown } from "./ITwinDropdown";
import { IModelFull, IModelGrid } from "@itwin/imodel-browser-react";
import { UiFramework } from "@itwin/appui-react";

/** Properties for the [[IModelOpen]] component */
export interface IModelOpenProps {
  onIModelSelected?: (iModelInfo: BasicIModelInfo) => void;
  initialIModels?: IModelInfo[];
  urlPrefix?: "dev" | "qa" | "";
}

/**
 * Open component showing iTwins and iModels
 */
export function IModelOpen(props: IModelOpenProps) {
  const [recentITwins, setRecentITwins] = React.useState<Array<ITwin>>([]);
  const [currentITwin, setCurrentITwin] = React.useState<ITwin | undefined>();
  const [accessToken, setAccessToken] = React.useState("");
  const serverPrefix: "dev" | "qa" | "" | undefined = props.urlPrefix;

  React.useEffect(() => {
    async function fetchAccessToken() {
      const token = await IModelApp.getAccessToken();
      setAccessToken(token);
    }
    void fetchAccessToken();
  }, []);

  React.useEffect(() => {
    async function fetchProjects() {
      const client: ITwinsAccessClient = new ITwinsAccessClient();
      try {
        const iTwinsResponse: ITwinsAPIResponse<ITwin[]> =
          await client.queryAsync(accessToken, ITwinSubClass.Project, {
            skip: 0,
            top: 30,
          });
        const iTwins: ITwin[] = iTwinsResponse.data!;
        setRecentITwins(iTwins);
        if (iTwins.length) setCurrentITwin(iTwins[0]);
      } catch {}
    }
    void fetchProjects();
  }, [accessToken]);

  const selectITwin = React.useCallback(async (iTwin: ITwin) => {
    setCurrentITwin(iTwin);
  }, []);

  const onImodelSelect = React.useCallback(
    async (iModel: IModelFull) => {
      currentITwin &&
        props.onIModelSelected &&
        props.onIModelSelected({
          iTwinId: currentITwin.id ?? "",
          id: iModel.id,
          name: iModel.name ?? "unknown",
        });
    },
    [currentITwin, props]
  );

  return (
    <>
      <div className="open-content-container">
        <div className="open-appbar">
          <div className="backstage-icon">
            <span
              className="icon icon-home"
              onPointerUp={() =>
                UiFramework.backstage.getBackstageToggleCommand()?.execute()
              }
            />
          </div>
          <div className="itwin-picker-content">
            <span className="itwins-label">iTwins</span>
            <div className="itwin-picker">
              <ITwinDropdown
                currentITwin={currentITwin}
                recentITwins={recentITwins}
                onITwinClicked={selectITwin}
              />
            </div>
          </div>
        </div>
        <div className="open-content">
          <div className="idp-scrolling-content">
            {currentITwin && (
              <IModelGrid
                accessToken={accessToken}
                projectId={currentITwin.id}
                onThumbnailClick={onImodelSelect}
                apiOverrides={{ serverEnvironmentPrefix: serverPrefix }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
