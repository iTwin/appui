/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetSizeProvider
 */

import "./WidgetSizeProvider.scss";
import classNames from "classnames";
import React from "react";

import type {
  Breakpoints,
  BreakpointSize,
} from "../../../hooks/useElementSize.js";
import { useElementSize } from "../../../hooks/useElementSize.js";

/**
 *
 */
export interface WidgetSizeProviderProps {
  /**
   * Class name for the root element.
   */
  className?: string;

  /**
   * ID for the widget size provider. Used for CSS class names.
   * i.e. for an id of widget-id, we have `@container widget-id style(--layout-size: [xs|sm|m|l|xl])`.
   */
  id?: string;
  /**
   * Custom breakpoints for the widget size.
   * @default { xs: 0, sm: 320, md: 640, lg: 1024, xl: 1280, 2xl: 1536 }
   */
  breakpoints?: Omit<Partial<Breakpoints>, "xs">;
}

interface WidgetSizeContextProps {
  size: BreakpointSize;
  dimension: { width: number; height: number };
}

const WidgetSizeContext = React.createContext<WidgetSizeContextProps>({
  size: "md",
  dimension: { width: 0, height: 0 },
});

/**
 * A provider component that supplies the size and dimensions (width and height) of a widget to its children.
 */
export const WidgetSizeProvider: React.FC<
  React.PropsWithChildren<WidgetSizeProviderProps>
> = (props) => {
  const { ref, size, dimension } = useElementSize(props.breakpoints);
  if (props.id || !!props.breakpoints)
    ref.current?.style.setProperty("--layout-size", size);

  return (
    <div
      id={props.id}
      ref={ref}
      className={classNames("nz-widget-size-provider", props.className)}
      style={{
        container: props.id ? `${props.id} / inline-size` : undefined,
      }}
    >
      {props.id ? (
        <WidgetSizeContext.Provider value={{ size, dimension }}>
          {props.children}
        </WidgetSizeContext.Provider>
      ) : (
        props.children
      )}
    </div>
  );
};

/**
 * A hook to use the widget size context.
 */
export const useWidgetSize = (): WidgetSizeContextProps => {
  return React.useContext(WidgetSizeContext);
};
