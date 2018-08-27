/*---------------------------------------------------------------------------------------------
| $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { connect } from "react-redux";

import { SampleAppIModelApp, RootState } from "..";

import {
  Backstage,
  FrontstageLaunchBackstageItem,
  SeparatorBackstageItem,
  BackstageCloseEventArgs,
  ConfigurableUiManager,
  ToolUiProvider,
} from "@bentley/ui-framework";

import { Tool } from "@bentley/imodeljs-frontend";

// Tool that shows the backstage
export class BackstageShow extends Tool {
  public static toolId = "SampleApp.BackstageShow";

  public run(): boolean {
    // dispatch the action
    SampleAppIModelApp.store.dispatch({ type: "SampleApp:BACKSTAGESHOW" });
    return true;
  }
}

// Tool that hides the backstage
export class BackstageHide extends Tool {
  public static toolId = "SampleApp.BackstageHide";

  public run(): boolean {
    // dispatch the action
    SampleAppIModelApp.store.dispatch({ type: "SampleApp:BACKSTAGEHIDE" });
    return true;
  }
}

// Tool that toggles the backstage
export class BackstageToggle extends Tool {
  public static toolId = "SampleApp.BackstageToggle";

  public run(): boolean {
    // dispatch the action
    const state: RootState = SampleAppIModelApp.store.getState();
    const action: string = (state.sampleAppState!.backstageVisible) ? "SampleApp:BACKSTAGEHIDE" : "SampleApp:BACKSTAGESHOW";
    SampleAppIModelApp.store.dispatch({ type: action });
    return true;
  }
}

export interface AppBackstageProps {
  isVisible: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function mapStateToProps(state: RootState) {
  return { isVisible: state.sampleAppState!.backstageVisible };
}

class AppBackstage extends React.Component<AppBackstageProps> {

  constructor(props?: any, context?: any) {
    super(props, context);
  }

  public componentDidMount() {
    Backstage.BackstageCloseEventEvent.addListener(this._handleBackstageCloseEventEvent);
  }

  public componentWillUnmount() {
    Backstage.BackstageCloseEventEvent.removeListener(this._handleBackstageCloseEventEvent);
  }

  private _handleBackstageCloseEventEvent = (_args: BackstageCloseEventArgs) => {
    new BackstageHide().run();
  }

  public render(): React.ReactNode {

    return (
      <Backstage isVisible={this.props.isVisible} >
        <FrontstageLaunchBackstageItem frontstageId="Test1" labelKey="SampleApp:backstage.testFrontstage1" iconClass="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="Test2" labelKey="SampleApp:backstage.testFrontstage2" iconClass="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="Test3" labelKey="SampleApp:backstage.testFrontstage3" iconClass="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="Test4" labelKey="SampleApp:backstage.testFrontstage4" iconClass="icon-placeholder" />
        <FrontstageLaunchBackstageItem frontstageId="Test5" labelKey="SampleApp:backstage.testFrontstage5" iconClass="icon-placeholder" />
        <SeparatorBackstageItem />
        <FrontstageLaunchBackstageItem frontstageId="ViewsFrontstage" labelKey="Views Frontstage" iconClass="icon-placeholder" />
      </Backstage>
    );
  }
}

// makes a <Connect> react component
export default connect(mapStateToProps)(AppBackstage);

ConfigurableUiManager.registerControl("SampleApp.BackstageToggle", ToolUiProvider);
