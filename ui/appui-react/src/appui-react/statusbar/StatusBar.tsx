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
import classnames from "classnames";
import { UiFramework } from "../UiFramework";
import { SafeAreaContext } from "../safearea/SafeAreaContext";
import { StatusBarField } from "./Field";
import { StatusBarPopup } from "./popup/Popup";
import "./StatusBar.scss";
import type { StatusBarWidgetControl } from "./StatusBarWidgetControl";
import { SafeAreaInsetsHelpers } from "../layout/base/SafeAreaInsets";
import { DockedBar } from "../widget-panels/DockedBar";
import { StatusBarComposer } from "./StatusBarComposer";

/* eslint-disable deprecation/deprecation */

/** Properties for the [[StatusBar]] React component
 * @public
 * @deprecated in 4.15.0. Used in a deprecated component {@link StatusBar}.
 */
export interface StatusBarProps extends CommonProps {
  children?: React.ReactNode;
  widgetControl?: StatusBarWidgetControl;
}

/** Status Bar React component.
 * @public
 * @deprecated in 4.14.0. Use {@link StatusBarComposer} instead.
 */
export function StatusBar(props: StatusBarProps) {
  const safeAreaInsets = React.useContext(SafeAreaContext);
  const className = classnames(
    "uifw-statusBar",
    safeAreaInsets && SafeAreaInsetsHelpers.getCssClassNames(safeAreaInsets),
    props.className
  );

  return (
    <DockedBar
      placement="bottom"
      className={className}
      style={props.style}
      onMouseEnter={UiFramework.visibility.handleWidgetMouseEnter}
    >
      {props.widgetControl?.getReactNode?.() ?? null}
      {props.children}
    </DockedBar>
  );
}

/** StatusBar With Space Between Items React functional component
 * @public
 */
export function StatusBarSpaceBetween(props: CommonDivProps) {
  const { className, ...divProps } = props;
  return (
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
    <Div
      {...divProps}
      mainClassName={className ? className : "uifw-statusbar-right"}
    />
  );
}

/** Components used in a [[StatusBar]].
 * @public
 * @deprecated in 4.14.0. Please use components directly.
 */
export namespace StatusBar {
  /** Field of a [[StatusBar]].
   * @beta
   * @deprecated in 4.14.0. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) instead.
   */
  export const Field = StatusBarField;

  /** Popup of a [[StatusBar]].
   * @beta
   * @deprecated in 4.14.0. Use `StatusBarPopover` instead.
   */
  export const Popup = StatusBarPopup;
}
