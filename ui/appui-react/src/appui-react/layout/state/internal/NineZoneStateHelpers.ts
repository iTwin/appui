/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { Draft } from "immer";
import { Rectangle } from "@itwin/core-react/internal";
import type { NineZoneState } from "../NineZoneState.js";
import type { FloatingWidgetState } from "../WidgetState.js";
import {
  getWidgetState,
  updateFloatingWidgetState,
} from "./WidgetStateHelpers.js";
import type { SizeProps } from "../../../utils/SizeProps.js";
import type { RectangleProps } from "../../../utils/RectangleProps.js";

/** Same as XAndY from core-geometry, but reproduced here to avoid a breaking peer dependency change.
 * @internal
 */
export interface XAndY {
  readonly x: number;
  readonly y: number;
}

/** @internal */
export const category = "appui-react:layout";

/** Helper that returns a plain object. Prevents from adding an instance that is not `immerable` to the state.
 * @internal
 */
export function toRectangleProps(
  rectangle: RectangleProps | undefined
): RectangleProps {
  if (rectangle) {
    return {
      bottom: rectangle.bottom,
      left: rectangle.left,
      right: rectangle.right,
      top: rectangle.top,
    };
  }
  return new Rectangle().toProps();
}

/** @internal */
export function setRectangleProps(
  props: Draft<RectangleProps>,
  bounds: RectangleProps
) {
  props.left = bounds.left;
  props.right = bounds.right;
  props.top = bounds.top;
  props.bottom = bounds.bottom;
}

/** @internal */
export function setPointProps(props: Draft<XAndY>, point: XAndY) {
  props.x = point.x;
  props.y = point.y;
}

/** @internal */
export function setSizeProps(props: Draft<SizeProps>, size: SizeProps) {
  props.height = size.height;
  props.width = size.width;
}

type KeysOfType<T, Type> = {
  [K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];

/** @internal */
export function initSizeProps<
  T,
  K extends KeysOfType<T, SizeProps | undefined>
>(obj: T, key: K, size: SizeProps | undefined) {
  if (obj[key] && size) {
    setSizeProps(obj[key] as unknown as SizeProps, size);
    return;
  }
  (obj[key] as unknown as SizeProps | undefined) = size
    ? {
        height: size.height,
        width: size.width,
      }
    : undefined;
}

/** @internal */
export function initRectangleProps<
  T,
  K extends KeysOfType<T, RectangleProps | undefined>
>(obj: T, key: K, rectangle: T[K]) {
  const rect = rectangle as unknown as RectangleProps | undefined;
  if (obj[key] && rect) {
    setRectangleProps(obj[key] as unknown as RectangleProps, rect);
    return;
  }
  (obj[key] as unknown as RectangleProps | undefined) = rect
    ? {
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top,
      }
    : undefined;
}

/** @internal */
export function isToolSettingsFloatingWidget(
  state: NineZoneState,
  id: FloatingWidgetState["id"]
) {
  const widget = getWidgetState(state, id);
  const toolSettingsTabId = state.toolSettings?.tabId;
  return (
    widget.tabs.length === 1 &&
    widget.tabs[0] === toolSettingsTabId &&
    id in state.floatingWidgets.byId
  );
}

/** @internal */
export function updateHomeOfToolSettingsWidget(
  state: NineZoneState,
  id: FloatingWidgetState["id"],
  home: FloatingWidgetState["home"]
): NineZoneState {
  if (!isToolSettingsFloatingWidget(state, id)) return state;

  return updateFloatingWidgetState(state, id, {
    home,
  });
}
