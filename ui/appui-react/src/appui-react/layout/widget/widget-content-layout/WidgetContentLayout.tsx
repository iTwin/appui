/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetContentLayout
 */

import "./WidgetContentLayout.scss";
import classNames from "classnames";
import type { ComponentProps, ComponentPropsWithRef } from "react";
import React from "react";

import { Divider, ProgressLinear, ProgressRadial } from "@itwin/itwinui-react";

import type { HeaderLayoutProps } from "./header/HeaderLayout.js";
import { HeaderLayout } from "./header/HeaderLayout.js";

function Header(props: React.PropsWithChildren<HeaderLayoutProps>) {
  const { className, children, ...headerLayoutProps } = props;
  return (
    <div
      className={classNames("nz-widget-widgetContentLayout-header", className)}
    >
      <HeaderLayout {...headerLayoutProps} />
      {children}
    </div>
  );
}

Header.displayName = "WidgetContentLayout.Header";

type BodyProps = {
  isLoading?: boolean;
  isNonBlockingLoading?: boolean;
  children?: React.ReactNode;
} & ComponentPropsWithRef<"div">;

const Body = React.forwardRef<HTMLDivElement, BodyProps>(function Body(
  props,
  ref
) {
  const { isNonBlockingLoading, isLoading, className, children, ...rest } =
    props;
  return (
    <div
      className={classNames(
        "nz-widget-widgetContentLayout-body",
        props.isNonBlockingLoading && "nz-nonBlockingLoading"
      )}
    >
      {props.isLoading ? (
        <LoadingOverlay />
      ) : (
        props.isNonBlockingLoading && <ProgressLinear />
      )}
      <div
        className={classNames("nz-inner", props.className)}
        {...rest}
        ref={ref}
      >
        {props.children}
      </div>
    </div>
  );
});
Body.displayName = "WidgetContentLayout.Body";

type FooterProps = {
  children?: React.ReactNode;
} & ComponentProps<"div">;

function Footer(props: FooterProps) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={classNames("nz-widget-widgetContentLayout-footer", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
Footer.displayName = "WidgetContentLayout.Footer";

function LoadingOverlay() {
  return (
    <div className="nz-widget-widgetContentLayout-loadingOverlay">
      <ProgressRadial />
    </div>
  );
}

type WidgetContentLayoutProps = React.PropsWithChildren<{
  className?: string;
  isLoading?: boolean;
  hideDividers?: boolean;
}>;

function WidgetContentLayoutInner(props: WidgetContentLayoutProps) {
  const [headerElement, setHeaderElement] = React.useState<React.ReactNode>();
  const [bodyElement, setBodyElement] = React.useState<React.ReactNode>();
  const [footerElement, setFooterElement] = React.useState<React.ReactNode>();

  React.useEffect(() => {
    React.Children.forEach(props.children, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === Header) setHeaderElement(child);
      else if (child.type === Body) setBodyElement(child);
      else if (child.type === Footer) setFooterElement(child);
    });
  }, [props.children]);

  const widgetComponents = [headerElement, bodyElement, footerElement].filter(
    Boolean
  );

  return (
    <div
      className={classNames("nz-widget-widgetContentLayout", props.className)}
    >
      {props.isLoading && <LoadingOverlay />}
      {widgetComponents.map((component, index) => (
        <React.Fragment key={index}>
          {component}
          {index < widgetComponents.length - 1 && !props.hideDividers && (
            <Divider className="nz-widget-widgetContentLayout-divider" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * A layout component for widgets that provides a top section for buttons, a body section and a footer section.
 * @example
 * <WidgetContentLayout>
 *  <WidgetContentLayout.Header />
 *  <WidgetContentLayout.Body>
 *   <ContentComponent />
 *  </WidgetContentLayout.Body>
 *  <WidgetContentLayout.Footer>
 *   <FooterComponent />
 *  </WidgetContentLayout.Footer>
 * </WidgetContentLayout>
 *  @public
 */
export const WidgetContentLayout = Object.assign(WidgetContentLayoutInner, {
  Header,
  Body,
  Footer,
});

WidgetContentLayout.Header = Header;
WidgetContentLayout.Body = Body;
WidgetContentLayout.Footer = Footer;
