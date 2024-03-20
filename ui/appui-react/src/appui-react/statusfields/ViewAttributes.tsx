/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./ViewAttributes.scss";
import * as React from "react";
import type { ViewFlagProps } from "@itwin/core-common";
import { ViewFlags } from "@itwin/core-common";
import { IModelApp } from "@itwin/core-frontend";
import { Checkbox } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import type { CommonProps } from "@itwin/core-react";
import { StatusBarLabelIndicator } from "../statusbar/LabelIndicator";
import { StatusBarDialog } from "../statusbar/dialog/Dialog";
import { SvgWindowSettings } from "@itwin/itwinui-icons-react";

interface ViewAttributesStatusFieldState {
  viewFlags: ViewFlagProps;
  cameraOn: boolean;
  target: HTMLElement | null;
}

/** Widget for showing Checkboxes for View Attributes
 * @beta
 */
export class ViewAttributesStatusField extends React.Component<
  CommonProps,
  ViewAttributesStatusFieldState
> {
  private _title = UiFramework.translate("listTools.viewAttributes");

  constructor(props: CommonProps) {
    super(props);

    this.state = {
      cameraOn: false,
      viewFlags: {},
      target: null,
    };
  }

  public override componentDidMount() {
    this.updateState();
  }

  // istanbul ignore next
  private updateState() {
    if (IModelApp.viewManager.selectedView) {
      const viewFlags: ViewFlagProps = {
        ...IModelApp.viewManager.selectedView.view.viewFlags.toJSON(),
      };
      const cameraOn = IModelApp.viewManager.selectedView.isCameraOn;

      this.setState({
        viewFlags,
        cameraOn,
      });
    }
  }

  // istanbul ignore next
  private _handleViewFlagClick = (flagName: string) => {
    if (IModelApp.viewManager.selectedView) {
      const props: ViewFlagProps =
        IModelApp.viewManager.selectedView.viewFlags.toJSON();
      (props as any)[flagName] =
        (props as any)[flagName] === undefined
          ? true
          : !(props as any)[flagName];
      const viewFlags = ViewFlags.fromJSON(props);
      IModelApp.viewManager.selectedView.viewFlags = viewFlags;
      this.updateState();
    }
  };

  private _handleToggleCamera = async () => {
    await IModelApp.tools.run(
      "View.ToggleCamera",
      IModelApp.viewManager.selectedView
    );
    this.updateState();
  };

  private getViewFlagItem(flagName: string, value: boolean, labelKey: string) {
    return (
      <Checkbox
        key={flagName}
        label={UiFramework.translate(labelKey)}
        onClick={() => this._handleViewFlagClick(flagName)}
        defaultChecked={value}
      />
    );
  }

  private getFlagState(flagName: string) {
    return this.state.viewFlags.hasOwnProperty(flagName)
      ? /* istanbul ignore next */ (this.state.viewFlags as any)[flagName]
      : false;
  }

  private getToggleCameraItem() {
    return (
      <Checkbox
        key={"toggleCamera"}
        label={UiFramework.translate("listTools.camera")}
        onClick={this._handleToggleCamera}
        defaultChecked={this.state.cameraOn}
      />
    );
  }

  private getViewFlags() {
    const items: React.ReactElement[] = [];
    items.push(
      this.getViewFlagItem("acs", this.getFlagState("acs"), "listTools.acs")
    );
    items.push(this.getToggleCameraItem());
    items.push(
      this.getViewFlagItem(
        "noConstruct",
        !this.getFlagState("noConstruct"),
        "listTools.constructions"
      )
    );
    items.push(
      this.getViewFlagItem(
        "hidEdges",
        this.getFlagState("hidEdges"),
        "listTools.hidEdges"
      )
    );
    items.push(
      this.getViewFlagItem(
        "monochrome",
        this.getFlagState("monochrome"),
        "listTools.monochrome"
      )
    );
    items.push(
      this.getViewFlagItem(
        "visEdges",
        this.getFlagState("visEdges"),
        "listTools.visEdges"
      )
    );
    items.push(
      this.getViewFlagItem(
        "ambientOcclusion",
        this.getFlagState("ambientOcclusion"),
        "listTools.ambientOcclusion"
      )
    );
    items.push(
      this.getViewFlagItem(
        "shadows",
        this.getFlagState("shadows"),
        "listTools.shadows"
      )
    );
    items.push(
      this.getViewFlagItem(
        "backgroundMap",
        this.getFlagState("backgroundMap"),
        "listTools.backgroundMap"
      )
    );
    return <div className="uifw-view-attributes-contents">{items}</div>;
  }

  public override render() {
    return (
      <StatusBarLabelIndicator
        iconSpec={<SvgWindowSettings />}
        title={this._title}
        popup={
          <StatusBarDialog
            titleBar={<StatusBarDialog.TitleBar title={this._title} />}
          >
            {this.getViewFlags()}
          </StatusBarDialog>
        }
      />
    );
  }
}
