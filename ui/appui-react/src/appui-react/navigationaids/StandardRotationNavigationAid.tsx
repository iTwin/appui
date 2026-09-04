/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module NavigationAids
 */

import { SvgCubeFaceBottom } from "../icons/cube-faces/SvgCubeFaceBottom.js";
import { SvgCubeFaceFront } from "../icons/cube-faces/SvgCubeFaceFront.js";
import { SvgCubeFaceIsoLeft } from "../icons/cube-faces/SvgCubeFaceIsoLeft.js";
import { SvgCubeFaceIsoRight } from "../icons/cube-faces/SvgCubeFaceIsoRight.js";
import { SvgCubeFaceLeft } from "../icons/cube-faces/SvgCubeFaceLeft.js";
import { SvgCubeFaceRear } from "../icons/cube-faces/SvgCubeFaceRear.js";
import { SvgCubeFaceRight } from "../icons/cube-faces/SvgCubeFaceRight.js";
import { SvgCubeFaceTop } from "../icons/cube-faces/SvgCubeFaceTop.js";
import { RelativePosition, ToolbarItemUtilities } from "@itwin/appui-abstract";
import {
  Columns,
  GroupColumn,
  GroupTool,
  Panel,
} from "@itwin/components-react/internal";
import { StandardViewId } from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { Popup } from "@itwin/core-react";
import { ViewportComponentEvents } from "@itwin/imodel-components-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl.js";
import { ExpandableButton as NZ_Expandable } from "../layout/widget/tools/button/Expandable.js";
import { ToolbarIcon as NZ_Icon } from "../layout/widget/tools/button/Icon.js";
import { NavigationAidControl } from "./NavigationAidControl.js";
import "./StandardRotationNavigationAid.scss";

/** A 3D Standard Rotation Navigation Aid control.
 * @public
 * @deprecated in 4.16.0. Use {@link StandardRotationNavigationAid} component instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class StandardRotationNavigationAidControl extends NavigationAidControl {
  public static navigationAidId = "StandardRotationNavigationAid";

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info: ConfigurableCreateInfo, options: any) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    super(info, options);
    this.reactNode = <StandardRotationNavigationAid />;
  }
}

interface RotationData {
  label: string;
  icon?: React.ReactNode;
}

interface StandardRotationNavigationAidState {
  element: HTMLDivElement | null;
  isExpanded: boolean;
  list: RotationData[];
  selected: StandardViewId;
}

/** A 3D Standard Rotation Navigation Aid.
 * @public
 */
export class StandardRotationNavigationAid extends React.Component<
  CommonProps, // eslint-disable-line @typescript-eslint/no-deprecated
  StandardRotationNavigationAidState
> {
  public override readonly state: Readonly<StandardRotationNavigationAidState>;

  constructor(props: any) {
    super(props);
    const list: RotationData[] = [
      {
        label: UiFramework.translate("rotations.top"),
        icon: <SvgCubeFaceTop />,
      },
      {
        label: UiFramework.translate("rotations.bottom"),
        icon: <SvgCubeFaceBottom />,
      },
      {
        label: UiFramework.translate("rotations.left"),
        icon: <SvgCubeFaceLeft />,
      },
      {
        label: UiFramework.translate("rotations.right"),
        icon: <SvgCubeFaceRight />,
      },
      {
        label: UiFramework.translate("rotations.front"),
        icon: <SvgCubeFaceFront />,
      },
      {
        label: UiFramework.translate("rotations.rear"),
        icon: <SvgCubeFaceRear />,
      },
      {
        label: UiFramework.translate("rotations.isoLeft"),
        icon: <SvgCubeFaceIsoLeft />,
      },
      {
        label: UiFramework.translate("rotations.isoRight"),
        icon: <SvgCubeFaceIsoRight />,
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
                {this.state.list[this.state.selected].icon}
              </span>
            }
            onClick={this._toggleIsExpanded}
            title={UiFramework.translate("standardRotationNavigationAid.title")}
          ></NZ_Icon>
        </NZ_Expandable>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
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
                  icon={item.icon}
                  isActive={this.state.selected.valueOf() === itemIndex}
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
