/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonDivProps, CommonProps } from "@itwin/core-react";
import { Div } from "@itwin/core-react";
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { Footer } from "../layout/footer/Footer";
import { SafeAreaContext } from "../safearea/SafeAreaContext";
import { StatusBarField } from "./Field";
import { StatusBarPopup } from "./popup/Popup";
import "./StatusBar.scss";
import type { StatusBarWidgetControl } from "./StatusBarWidgetControl";

// cspell:ignore safearea

/** Properties for the [[StatusBar]] React component
 * @public
 */
export interface StatusBarProps extends CommonProps {
  children?: React.ReactNode;
  widgetControl?: StatusBarWidgetControl;
}

/** Status Bar React component.
 * @public
 */
export class StatusBar extends React.Component<StatusBarProps> {
  public override render(): React.ReactNode {
    return (
      <SafeAreaContext.Consumer>
        {(safeAreaInsets) => (
          <Footer
            className={this.props.className}
            onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
            safeAreaInsets={safeAreaInsets}
            style={this.props.style}
          >
            {this.props.widgetControl?.getReactNode?.() ?? null}
            {this.props.children}
          </Footer>
        )}
      </SafeAreaContext.Consumer>
    );
  }
}

/** StatusBar With Space Between Items React functional component
 * @public
 */
export function StatusBarSpaceBetween(props: CommonDivProps) {
  const { className, ...divProps } = props;
  return (
    // eslint-disable-next-line deprecation/deprecation
    <Div
      {...divProps}
      mainClassName={className ? className : "uifw-statusbar-space-between"}
    />
  );
}

/** StatusBar Left Section React functional component
 * @public
 */
export function StatusBarLeftSection(props: CommonDivProps) {
  const { className, ...divProps } = props;
  return (
    // eslint-disable-next-line deprecation/deprecation
    <Div
      {...divProps}
      mainClassName={className ? className : "uifw-statusbar-left"}
    />
  );
}

/** StatusBar Center Section React functional component
 * @public
 */
export function StatusBarCenterSection(props: CommonDivProps) {
  const { className, ...divProps } = props;
  return (
    // eslint-disable-next-line deprecation/deprecation
    <Div
      {...divProps}
      mainClassName={className ? className : "uifw-statusbar-center"}
    />
  );
}

/** StatusBar Right Section React functional component
 * @public
 */
export function StatusBarRightSection(props: CommonDivProps) {
  const { className, ...divProps } = props;
  return (
    // eslint-disable-next-line deprecation/deprecation
    <Div
      {...divProps}
      mainClassName={className ? className : "uifw-statusbar-right"}
    />
  );
}

/** Components used in a [[StatusBar]].
 * @public
 */
export namespace StatusBar {
  /** Field of a [[StatusBar]].
   * @beta
   */
  export const Field = StatusBarField;

  /** Popup of a [[StatusBar]].
   * @beta
   */
  export const Popup = StatusBarPopup;
}
