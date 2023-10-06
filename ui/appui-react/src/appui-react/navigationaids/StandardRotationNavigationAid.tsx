/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import "./StandardRotationNavigationAid.scss";
import classnames from "classnames";
import * as React from "react";
import { StandardViewId } from "@itwin/core-frontend";
import { RelativePosition, ToolbarItemUtilities } from "@itwin/appui-abstract";
import { ViewportComponentEvents } from "@itwin/imodel-components-react";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import { Icon, Popup } from "@itwin/core-react";
import {
  ExpandableButton as NZ_Expandable,
  ToolbarIcon as NZ_Icon,
} from "@itwin/appui-layout-react";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import { UiFramework } from "../UiFramework";
import { NavigationAidControl } from "./NavigationAidControl";
import {
  Columns,
  GroupColumn,
  GroupTool,
  Panel,
} from "@itwin/components-react";
import svgCubeFacesTop from "@bentley/icons-generic/icons/cube-faces/top.svg";
import svgCubeFacesBottom from "@bentley/icons-generic/icons/cube-faces/bottom.svg";
import svgCubeFacesLeft from "@bentley/icons-generic/icons/cube-faces/left.svg";
import svgCubeFacesRight from "@bentley/icons-generic/icons/cube-faces/right.svg";
import svgCubeFacesFront from "@bentley/icons-generic/icons/cube-faces/front.svg";
import svgCubeFacesRear from "@bentley/icons-generic/icons/cube-faces/rear.svg";
import svgCubeFacesIsoLeft from "@bentley/icons-generic/icons/cube-faces/iso-left.svg";
import svgCubeFacesIsoRight from "@bentley/icons-generic/icons/cube-faces/iso-right.svg";
import { createWebComponentIconSpec } from "../utils/IconHelper";

/** A 3D Standard Rotation Navigation Aid control.
 * @alpha
 */
export class StandardRotationNavigationAidControl extends NavigationAidControl {
  public static navigationAidId = "StandardRotationNavigationAid";

  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this.reactNode = <StandardRotationNavigationAid />;
  }
}

/** @internal */
export interface RotationData {
  label: string;
  iconsSpec?: IconSpec;
}

/** @internal */
interface StandardRotationNavigationAidState {
  element: HTMLDivElement | null;
  isExpanded: boolean;
  list: RotationData[];
  selected: StandardViewId;
}

/** A 3D Standard Rotation Navigation Aid.
 * @alpha
 */
export class StandardRotationNavigationAid extends React.Component<
  CommonProps,
  StandardRotationNavigationAidState
> {
  private _title = UiFramework.translate("standardRotationNavigationAid.title");

  /** @internal */
  public override readonly state: Readonly<StandardRotationNavigationAidState>;

  constructor(props: any) {
    super(props);
    const list: RotationData[] = [
      {
        label: UiFramework.translate("rotations.top"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesTop),
      },
      {
        label: UiFramework.translate("rotations.bottom"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesBottom),
      },
      {
        label: UiFramework.translate("rotations.left"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesLeft),
      },
      {
        label: UiFramework.translate("rotations.right"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesRight),
      },
      {
        label: UiFramework.translate("rotations.front"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesFront),
      },
      {
        label: UiFramework.translate("rotations.rear"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesRear),
      },
      {
        label: UiFramework.translate("rotations.isoLeft"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesIsoLeft),
      },
      {
        label: UiFramework.translate("rotations.isoRight"),
        iconsSpec: createWebComponentIconSpec(svgCubeFacesIsoRight),
      },
    ];
    this.state = {
      element: null,
      isExpanded: false,
      list,
      selected: StandardViewId.Top,
    };
  }

  public override render(): React.ReactNode {
    const className = classnames(
      "uifw-standard-rotation-navigation",
      this.props.className
    );

    return (
      <div className={className} style={this.props.style} ref={this._handleRef}>
        <NZ_Expandable className={"expandable"}>
          <NZ_Icon
            className={"icon-button"}
            icon={
              <span className={classnames("three-d-icon", "icon")}>
                <Icon
                  iconSpec={this.state.list[this.state.selected].iconsSpec}
                />
              </span>
            }
            onClick={this._toggleIsExpanded}
            title={this._title}
          ></NZ_Icon>
        </NZ_Expandable>
        <Popup
          isOpen={this.state.isExpanded}
          offset={0}
          onClose={this._handlePopupClose}
          position={RelativePosition.Bottom}
          target={this.state.element}
        >
          {this.getExpandedContent()}
        </Popup>
      </div>
    );
  }

  private _handleRef = (element: HTMLDivElement | null) => {
    this.setState(() => ({ element }));
  };

  private _handlePopupClose = () => {
    this.setState(() => ({ isExpanded: false }));
  };

  private _toggleIsExpanded = () => {
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
  };

  private _handleListItemClicked = (item: number) => {
    const selected = item;

    this.setState(
      () => ({ isExpanded: false, selected }),
      () => ViewportComponentEvents.setStandardRotation(selected)
    );
  };

  private getExpandedContent(): React.ReactNode {
    if (!this.state.isExpanded) return undefined;

    return (
      <Panel>
        <Columns>
          <GroupColumn>
            {this.state.list.map((item, itemIndex) => {
              return (
                <GroupTool
                  key={itemIndex.toString()}
                  label={item.label}
                  icon={<Icon iconSpec={item.iconsSpec} />}
                  isActive={this.state.selected === itemIndex}
                  onClick={() => this._handleListItemClicked(itemIndex)}
                  item={ToolbarItemUtilities.createActionButton(
                    "",
                    0,
                    "",
                    "",
                    () => {}
                  )}
                />
              );
            })}
          </GroupColumn>
        </Columns>
      </Panel>
    );
  }
}
