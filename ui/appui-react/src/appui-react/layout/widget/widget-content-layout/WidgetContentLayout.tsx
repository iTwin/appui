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
import type { ToggleSwitch } from "@itwin/itwinui-react";

import { HeaderLayout } from "./header/HeaderLayout.js";

/**
 * Type union for icon menu items.
 */
export type IconMenu = IconMenuButton | IconMenuDivider;

/** Interface for icon menu button items */
interface IconMenuButton {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  type?: "button";
  disabled?: boolean;
  isActive?: boolean;
}

/** Interface for icon menu divider items */
export interface IconMenuDivider {
  type: "divider";
  key?: string;
}

/**
 * Props for the [[WidgetContentLayout.Header]] component.
 * @public
 */
export interface WidgetContentLayoutHeaderProps
  extends ComponentPropsWithRef<"div"> {
  /**
   * Toggle switch in the header.
   */
  toggle?: React.ComponentProps<typeof ToggleSwitch>;
  /**
   * Array of buttons to display in the header.
   */
  buttons?: React.ReactNode[];
  /**
   * Menu in the header.
   */
  menu?: {
    title: string;
    items: { label: string; onClick: () => void }[];
  };
  /**
   * Title to display in the header.
   */
  title?: string;
  /**
   * Callback function for search functionality.
   */
  onSearch?: (value: string) => void;
  /**
   * Array of icon menu items to display in the header.
   */
  icons?: IconMenu[];
  /**
   * Size of the icons.
   */
  iconSize?: "small" | "large";
  /**
   * Child elements to render within the header.
   */
  children?: React.ReactNode;
}

const Header = React.forwardRef<HTMLDivElement, WidgetContentLayoutHeaderProps>(
  function Header(props, ref) {
    const {
      className,
      children,
      toggle,
      buttons,
      menu,
      title,
      onSearch,
      icons,
      iconSize,
      ...divProps
    } = props;
    const headerLayoutProps = {
      toggle,
      buttons,
      menu,
      title,
      onSearch,
      icons,
      iconSize,
    };

    return (
      <div
        className={classNames(
          "nz-widget-widgetContentLayout-header",
          className
        )}
        {...divProps}
        ref={ref}
      >
        <HeaderLayout {...headerLayoutProps} />
        {children}
      </div>
    );
  }
);

Header.displayName = "appui:WidgetContentLayout.Header";

/**
 * Props for the [[WidgetContentLayout.Body]] component.
 * @public
 */
export interface WidgetContentLayoutBodyProps
  extends ComponentPropsWithRef<"div"> {
  /**
   * Whether the body is in a loading state.
   */
  isLoading?: boolean;
  /**
   * Whether to show a non-blocking loading indicator.
   */
  isNonBlockingLoading?: boolean;
  /**
   * Child elements to render within the body.
   */
  children?: React.ReactNode;
}

const Body = React.forwardRef<HTMLDivElement, WidgetContentLayoutBodyProps>(
  function Body(props, ref) {
    const { isNonBlockingLoading, isLoading, className, children, ...rest } =
      props;
    return (
      <div
        className={classNames(
          "nz-widget-widgetContentLayout-body",
          !isLoading && isNonBlockingLoading && "nz-nonBlockingLoading"
        )}
      >
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          isNonBlockingLoading && <ProgressLinear />
        )}
        <div className={classNames("nz-inner", className)} {...rest} ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);
Body.displayName = "appui:WidgetContentLayout.Body";

/**
 * Props for the [[WidgetContentLayout.Footer]] component.
 * @public
 */
export interface WidgetContentLayoutFooterProps
  extends ComponentPropsWithRef<"div"> {
  /**
   * Child elements to render within the footer.
   */
  children?: React.ReactNode;
}

const Footer = React.forwardRef<HTMLDivElement, WidgetContentLayoutFooterProps>(
  function Footer(props, ref) {
    const { className, children, ...rest } = props;
    return (
      <div
        className={classNames(
          "nz-widget-widgetContentLayout-footer",
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
Footer.displayName = "appui:WidgetContentLayout.Footer";

function LoadingOverlay() {
  return (
    <div className="nz-widget-widgetContentLayout-loadingOverlay">
      <ProgressRadial />
    </div>
  );
}

/**
 * Props for the [[WidgetContentLayout]] component.
 * @public
 */
export interface WidgetContentLayoutProps extends ComponentPropsWithRef<"div"> {
  /**
   * Whether the entire layout is in a loading state.
   */
  isLoading?: boolean;
  /**
   * Whether to hide dividers between sections.
   */
  hideDividers?: boolean;
  /**
   * Child elements (Header, Body, Footer) to render.
   */
  children?: React.ReactNode;
}

const WidgetContentLayoutInner = React.forwardRef<
  HTMLDivElement,
  WidgetContentLayoutProps
>(function WidgetContentLayoutInner(props, ref) {
  const { isLoading, hideDividers, children, className, ...divProps } = props;
  const [headerElement, setHeaderElement] = React.useState<React.ReactNode>();
  const [bodyElement, setBodyElement] = React.useState<React.ReactNode>();
  const [footerElement, setFooterElement] = React.useState<React.ReactNode>();

  React.useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === Header) setHeaderElement(child);
      else if (child.type === Body) setBodyElement(child);
      else if (child.type === Footer) setFooterElement(child);
    });
  }, [children]);

  const widgetComponents = [headerElement, bodyElement, footerElement].filter(
    Boolean
  );

  return (
    <div
      className={classNames("nz-widget-widgetContentLayout", className)}
      {...divProps}
      ref={ref}
    >
      {isLoading && <LoadingOverlay />}
      {widgetComponents.map((component, index) => (
        <React.Fragment key={index}>
          {component}
          {index < widgetComponents.length - 1 && !hideDividers && (
            <Divider className="nz-widget-widgetContentLayout-divider" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

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
