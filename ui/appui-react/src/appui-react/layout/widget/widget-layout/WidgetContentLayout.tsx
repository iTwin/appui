/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetContentLayout
 */

import "./WidgetContentLayout.scss";
import classNames from "classnames";
import React from "react";

import { Divider, ProgressLinear, ProgressRadial } from "@itwin/itwinui-react";

import type { HeaderLayoutProps } from "./header/HeaderLayout.js";
import { HeaderLayout } from "./header/HeaderLayout.js";
import type { WidgetSizeProviderProps } from "./WidgetSizeProvider.js";
import { WidgetSizeProvider } from "./WidgetSizeProvider.js";

const Header: React.FC<React.PropsWithChildren<HeaderLayoutProps>> = ({
  className,
  children,
  ...headerLayoutProps
}) => {
  return (
    <div className={classNames("nz-widget-content-layout-header", className)}>
      <HeaderLayout {...headerLayoutProps} />
      {children}
    </div>
  );
};

const Content = React.forwardRef<HTMLDivElement,
  React.PropsWithChildren<{
    isLoading?: boolean;
    isNonBlockingLoading?: boolean;
    centerContent?: boolean;
    className?: string;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
  }>
>(function Content(props, ref) {
  return (
    <div className={classNames("nz-widget-content-layout-content", props.isNonBlockingLoading && "nz-widget-content-layout-non-blocking-loading")}
    >
      {props.isLoading ? <LoadingOverlay /> : props.isNonBlockingLoading && <ProgressLinear />}
      <div ref={ref} onScroll={props.onScroll} className={classNames("nz-widget-content-layout-content-inner", props.className, {
        center: props.centerContent,
      })}
      >
        {props.children}
      </div>
    </div>
  );
});

const Footer: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames("nz-widget-content-layout-footer", className)}>
      {children}
    </div>
  );
};

const LoadingOverlay: React.FC = () => {
  return (
    <div className="nz-widget-content-layout-loading-overlay">
      <ProgressRadial indeterminate size="large" />
    </div>
  );
};

/**
 * A layout component for widgets that provides a top section for buttons, a content section and a footer section.
 * @example
 * <WidgetContentLayout>
 *  <WidgetContentLayout.Header />
 *  <WidgetContentLayout.Content>
 *   <ContentComponent />
 *  </WidgetContentLayout.Content>
 *  <WidgetContentLayout.Footer>
 *   <FooterComponent />
 *  </WidgetContentLayout.Footer>
 * </WidgetContentLayout>
 */

type WidgetContentLayoutInnerProps = React.PropsWithChildren<{
  className?: string;
  isLoading?: boolean;
}>;

const WidgetContentLayoutInner: React.FC<WidgetContentLayoutInnerProps> = ({
  children,
  className,
  isLoading,
}) => {
  const [headerElement, setHeaderElement] = React.useState<React.ReactNode>();
  const [contentElement, setContentElement] = React.useState<React.ReactNode>();
  const [footerElement, setFooterElement] = React.useState<React.ReactNode>();

  React.useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child))
        return;
      if (child.type === Header)
        setHeaderElement(child);
      else if (child.type === Content)
        setContentElement(child);
      else if (child.type === Footer)
        setFooterElement(child);
    });
  }, [children]);

  const widgetComponents = [
    headerElement,
    contentElement,
    footerElement,
  ].filter(Boolean);

  return (
    <div className={classNames("nz-widget-content-layout-root", className)}>
      {isLoading && <LoadingOverlay />}
      {widgetComponents.map((component, index) => (
        <React.Fragment key={index}>
          {component}
          {index < widgetComponents.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 *
 */
export type WidgetContentLayoutProps = WidgetSizeProviderProps & WidgetContentLayoutInnerProps;

/**
 *
 */
export const WidgetContentLayout: React.FC<WidgetContentLayoutProps> & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
} = ({ children, isLoading, className, ...widgetSizeProviderProps }) => {
  return (
    <WidgetSizeProvider {...widgetSizeProviderProps}>
      <WidgetContentLayoutInner className={className} isLoading={isLoading}>{children}</WidgetContentLayoutInner>
    </WidgetSizeProvider>
  );
};

WidgetContentLayout.displayName = "WidgetContentLayout";

WidgetContentLayout.Header = Header;
WidgetContentLayout.Content = Content;
WidgetContentLayout.Footer = Footer;
