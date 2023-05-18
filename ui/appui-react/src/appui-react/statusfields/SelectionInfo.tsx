/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./SelectionInfo.scss";
import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import type { CommonProps} from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { FooterIndicator } from "@itwin/appui-layout-react";
import { UiFramework } from "../UiFramework";
import { SvgCursor } from "@itwin/itwinui-icons-react";

/** Defines properties supported by the SelectionInfo Field Component.
 */
interface SelectionInfoFieldProps extends CommonProps {
  selectionCount: number;
}

/**
 * Status Field React component. This component is designed to be specified in a status bar definition.
 * It is used to display the number of selected items based on the Presentation Rules Selection Manager.
 */
class SelectionInfoFieldComponent extends React.Component<SelectionInfoFieldProps> {

  constructor(props: SelectionInfoFieldProps) {
    super(props);
  }

  public override render(): React.ReactNode {
    return (
      <FooterIndicator
        className={classnames("uifw-statusFields-selectionInfo", this.props.className)}
        style={this.props.style}
      >
        {<Icon iconSpec={<SvgCursor />} />}
        {this.props.selectionCount.toString()}
      </FooterIndicator>
    );
  }
}

/** Function used by Redux to map state data in Redux store to props that are used to render this component. */
function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey];  // since app sets up key, don't hard-code name
  /* istanbul ignore next */
  if (!frameworkState)
    return undefined;

  return { selectionCount: frameworkState.sessionState.numItemsSelected };
}

// we declare the variable and export that rather than using export default.
/**
 * SelectionInfo Status Field React component. This component is designed to be specified in a status bar definition.
 * It is used to display the number of selected items based on the Presentation Rules Selection Manager.
 * This React component is Redux connected.
 * @public
 */ // eslint-disable-next-line @typescript-eslint/naming-convention
export const SelectionInfoField = connect(mapStateToProps)(SelectionInfoFieldComponent);
