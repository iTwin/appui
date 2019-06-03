/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { connect } from "react-redux";

import {
  SampleAppIModelApp, SampleAppUiActionId, RootState,
} from "..";
import { SettingsModalFrontstage } from "../appui/frontstages/Settings";
import {
  Backstage,
  FrontstageManager,
  FrontstageLaunchBackstageItem,
  CommandLaunchBackstageItem,
  SeparatorBackstageItem,
  BooleanSyncUiListener,
} from "@bentley/ui-framework";
import { AccessToken } from "@bentley/imodeljs-clients";
import { LocalFileOpenFrontstage } from "./frontstages/LocalFileStage";

interface AppBackstageProps {
  /** AccessToken from sign-in */
  accessToken: AccessToken | undefined;
}

function mapStateToProps(state: RootState) {
  const appState = state.sampleAppState;

  if (!appState)
    return undefined;

  return { accessToken: appState.accessToken };
}

class AppBackstageComponent extends React.Component<AppBackstageProps> {

  public render(): React.ReactNode {
    return (
      <Backstage accessToken={this.props.accessToken} >
        <FrontstageLaunchBackstageItem frontstageId="Test1" labelKey="SampleApp:backstage.testFrontstage1" iconSpec="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="Test2" labelKey="SampleApp:backstage.testFrontstage2" iconSpec="icon-placeholder" />
        <BooleanSyncUiListener eventIds={[SampleAppUiActionId.setTestProperty]} boolFunc={(): boolean => SampleAppIModelApp.getTestProperty() !== "HIDE"}>
          {(isVisible: boolean) => isVisible && <FrontstageLaunchBackstageItem frontstageId="Test3" labelKey="SampleApp:backstage.testFrontstage3" iconSpec="icon-placeholder" />}
        </BooleanSyncUiListener>
        <BooleanSyncUiListener eventIds={[SampleAppUiActionId.setTestProperty]} boolFunc={(): boolean => SampleAppIModelApp.getTestProperty() === "HIDE"} defaultValue={false}>
          {(isEnabled: boolean) => <FrontstageLaunchBackstageItem frontstageId="Test4" labelKey="SampleApp:backstage.testFrontstage4" iconSpec="icon-placeholder" isEnabled={isEnabled} />}
        </BooleanSyncUiListener>
        <SeparatorBackstageItem />
        <FrontstageLaunchBackstageItem frontstageId="IModelOpen" labelKey="SampleApp:backstage.imodelopen" iconSpec="icon-folder-opened" />
        <BooleanSyncUiListener eventIds={[SampleAppUiActionId.setIsIModelLocal]} boolFunc={(): boolean => !SampleAppIModelApp.isIModelLocal} defaultValue={true}>
          {(isEnabled: boolean) => <FrontstageLaunchBackstageItem frontstageId="IModelIndex" labelKey="SampleApp:backstage.imodelindex" iconSpec="icon-placeholder" isEnabled={isEnabled} />}
        </BooleanSyncUiListener>
        <CommandLaunchBackstageItem labelKey="SampleApp:backstage:fileSelect" iconSpec="icon-placeholder"
          commandId="SampleApp:backstage:fileSelect" execute={() => LocalFileOpenFrontstage.open()} />
        <SeparatorBackstageItem />
        <CommandLaunchBackstageItem labelKey="SampleApp:backstage.testFrontstage6" iconSpec="icon-settings"
          commandId="SampleApp:backstage.testFrontstage6" execute={() => FrontstageManager.openModalFrontstage(new SettingsModalFrontstage())} />
        <SeparatorBackstageItem />
        <FrontstageLaunchBackstageItem frontstageId="ViewsFrontstage" labelKey="SampleApp:backstage.viewIModel" descriptionKey="SampleApp:backstage.iModelStage" iconSpec="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="xyz" label="bad frontstage launch" iconSpec="icon-placeholder" />
      </Backstage>
    );
  }
}

/**
 * Application Backstage.
 * This React component is Redux connected.
 */
export const AppBackstage = connect(mapStateToProps)(AppBackstageComponent); // tslint:disable-line:variable-name
