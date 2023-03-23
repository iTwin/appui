/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import "./CubeContent.scss";
import * as React from "react";
import { Matrix3d } from "@itwin/core-geometry";
import { Cube, CubeRotationChangeEventArgs, ViewportComponentEvents } from "@itwin/imodel-components-react";
import { ConfigurableCreateInfo, ContentControl } from "@itwin/appui-react";

class CubeContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <CubeContent />;
  }

  /** Get the NavigationAidControl associated with this ContentControl */
  public override get navigationAidControl(): string {
    return "CubeNavigationAid";
  }
}

interface CubeContentState {
  rotMatrix: Matrix3d;
}

class CubeContent extends React.Component<{}, CubeContentState> {

  public override readonly state: CubeContentState = {
    rotMatrix: Matrix3d.createIdentity(),
  };

  public override render(): React.ReactNode {
    return (
      <div className={"example-cube-container"}>
        <Cube
          className="example-cube"
          rotMatrix={this.state.rotMatrix} />
      </div>
    );
  }

  public override componentDidMount() {
    ViewportComponentEvents.onCubeRotationChangeEvent.addListener(this._handleCubeRotationChangeEvent);
  }

  public override componentWillUnmount() {
    ViewportComponentEvents.onCubeRotationChangeEvent.removeListener(this._handleCubeRotationChangeEvent);
  }

  private _handleCubeRotationChangeEvent = (args: CubeRotationChangeEventArgs) => {
    this.setState({ rotMatrix: args.rotMatrix });
  };
}

UiFramework.controls.register("CubeContent", CubeContentControl);
