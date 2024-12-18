/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { XAndY } from "@itwin/core-geometry";
import type { CursorMenuItemProps, MenuItemProps } from "../shared/MenuItem.js";
import type { ActionsUnion, DeepReadonly } from "./redux-ts.js";
import type { UiFramework } from "../UiFramework.js";
import { createAction } from "./redux-ts.js";
import type { useActiveIModelConnection } from "../hooks/useActiveIModelConnection.js";
import { SelectionScopeField } from "../statusfields/SelectionScope.js";

/** Definition of a cursor menu. If menuItems are empty the menu control is not displayed.
 * @public
 */
export interface CursorMenuPayload {
  position: XAndY;
  childWindowId?: string;
  items: CursorMenuItemProps[];
}

/* eslint-disable @typescript-eslint/no-deprecated */

/** PresentationSelectionScope holds the id and the localized label for a selection scope supported for a specific iModel.
 * Added to avoid an api-extract error caused by using SelectionScope.
 * @public
 * @deprecated in 4.15.0. Use `selectionScopes` prop of {@link SelectionScopeField} component.
 */
export interface PresentationSelectionScope {
  id: string;
  label: string;
}

/** Definition of data added to Redux store to define cursor menu.  If menuItems are empty the menu control is not displayed.
 * To close the menu clear the menuItems or pass in undefined as the CursorData.
 * @public
 * @deprecated in 4.11.0. Use {@link CursorMenuPayload} instead.
 */
export interface CursorMenuData {
  position: XAndY;
  childWindowId?: string;
  items: MenuItemProps[];
}

/** Action Ids used by Redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 * Since these are also used as sync ids they should be in lowercase.
 * @note This is used by sync UI event APIs.
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export enum SessionStateActionId {
  SetNumItemsSelected = "sessionstate:set-num-items-selected",
  SetAvailableSelectionScopes = "sessionstate:set-available-selection-scopes",
  SetSelectionScope = "sessionstate:set-selection-scope",
  SetActiveIModelId = "sessionstate:set-active-imodelid",
  SetIModelConnection = "sessionstate:set-imodel-connection",
  SetDefaultIModelViewportControlId = "sessionstate:set-default-viewportid",
  SetDefaultViewId = "sessionstate:set-default-viewid",
  SetDefaultViewState = "sessionstate:set-default-view-state",
  UpdateCursorMenu = "sessionstate:update-cursor-menu",
}

/** The portion of state managed by the SessionStateReducer.
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export interface SessionState {
  /** @deprecated in 4.15.0. Use {@link UiFramework.getNumItemsSelected} instead. */
  numItemsSelected: number;
  /** @deprecated in 4.15.0. Use `selectionScopes` prop of {@link SelectionScopeField} instead. */
  availableSelectionScopes: PresentationSelectionScope[];
  /** @deprecated in 4.15.0. Use `activeScope` prop of {@link SelectionScopeField} instead. */
  activeSelectionScope: string;
  /** @deprecated in 4.15.0. Not used by AppUI components. */
  iModelId: string;
  /** @deprecated in 4.15.0. Not used by AppUI components. */
  defaultIModelViewportControlId: string | undefined;
  /** @deprecated in 4.15.0. Not used by AppUI components. */
  defaultViewId: string | undefined;
  /** @deprecated in 4.15.0. Use {@link UiFramework.getDefaultViewState} or {@link useActiveIModelConnection} instead. */
  defaultViewState: any;
  /** @deprecated in 4.15.0. Use {@link UiFramework.getIModelConnection} or {@link useActiveIModelConnection} instead. */
  iModelConnection: any;
  /** @deprecated in 4.11.0. Use {@link CursorMenuPayload} instead */
  cursorMenuData: CursorMenuData | undefined;
  /** @deprecated in 4.15.0. Use cursor APIs of {@link UiFramework}. */
  cursorMenuPayload: CursorMenuPayload | undefined;
}

const defaultSelectionScope = {
  id: "element",
  label: "Element",
} as const satisfies PresentationSelectionScope;

/** Used on first call of SessionStateReducer. */
const initialSessionState: SessionState = {
  /** number of selected items in Presentation Selection */
  numItemsSelected: 0,
  /** initialize to only support "Element" scope, this will be overwritten when iModelConnection is established */
  availableSelectionScopes: [defaultSelectionScope],
  /** initialize to active selection scope to "Element", this will be overwritten when iModelConnection is established */
  activeSelectionScope: defaultSelectionScope.id,
  /** set to iModelId if an iModel is active else it is an empty string, so initialize to empty string */
  iModelId: "",
  defaultIModelViewportControlId: undefined,
  defaultViewId: undefined,
  defaultViewState: undefined,
  iModelConnection: undefined,
  cursorMenuData: undefined,
  cursorMenuPayload: undefined,
};

/** An interface that allows redux connected object to dispatch changes to the SessionState reducer.
 * @beta
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export interface SessionStateActionsProps {
  setActiveIModelId: typeof SessionStateActions.setActiveIModelId;
  setAvailableSelectionScopes: typeof SessionStateActions.setAvailableSelectionScopes;
  setDefaultIModelViewportControlId: typeof SessionStateActions.setDefaultIModelViewportControlId;
  setDefaultViewId: typeof SessionStateActions.setDefaultViewId;
  setDefaultViewState: typeof SessionStateActions.setDefaultViewState;
  setIModelConnection: typeof SessionStateActions.setIModelConnection;
  setNumItemsSelected: typeof SessionStateActions.setNumItemsSelected;
  setSelectionScope: typeof SessionStateActions.setSelectionScope;
  updateCursorMenu: typeof SessionStateActions.updateCursorMenu;
}

/** An object with a function that creates each SessionStateReducer that can be handled by our reducer.
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export const SessionStateActions = {
  setActiveIModelId: (iModelId: string) =>
    createAction(SessionStateActionId.SetActiveIModelId, iModelId),
  setAvailableSelectionScopes: (
    availableSelectionScopes: PresentationSelectionScope[]
  ) =>
    createAction(
      SessionStateActionId.SetAvailableSelectionScopes,
      availableSelectionScopes
    ),
  setDefaultIModelViewportControlId: (iModelViewportControlId: string) =>
    createAction(
      SessionStateActionId.SetDefaultIModelViewportControlId,
      iModelViewportControlId
    ),
  setDefaultViewId: (viewId: string) =>
    createAction(SessionStateActionId.SetDefaultViewId, viewId),
  setDefaultViewState: (viewState: any) =>
    createAction(SessionStateActionId.SetDefaultViewState, viewState),
  setNumItemsSelected: (numSelected: number) =>
    createAction(SessionStateActionId.SetNumItemsSelected, numSelected),
  setIModelConnection: (iModelConnection: any) =>
    createAction(SessionStateActionId.SetIModelConnection, iModelConnection),
  setSelectionScope: (activeSelectionScope: string) =>
    createAction(SessionStateActionId.SetSelectionScope, activeSelectionScope),
  updateCursorMenu: (cursorMenuData: CursorMenuData | CursorMenuPayload) =>
    createAction(SessionStateActionId.UpdateCursorMenu, cursorMenuData),
};

/** Object that contains available actions that modify SessionState. Parent control's props should
 * extend from SessionStateActionsProps before using this in Redux 'connect' function.
 * @beta
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export const sessionStateMapDispatchToProps = { ...SessionStateActions };

/** Union of SessionState Redux actions
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export type SessionStateActionsUnion = ActionsUnion<typeof SessionStateActions>;

/** Handles actions to update SessionState.
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export function SessionStateReducer(
  state: SessionState = initialSessionState,
  action: SessionStateActionsUnion
): DeepReadonly<SessionState> {
  switch (action.type) {
    case SessionStateActionId.SetNumItemsSelected: {
      if (undefined !== action.payload)
        return { ...state, numItemsSelected: action.payload };
      else return { ...state, numItemsSelected: 0 };
    }
    case SessionStateActionId.SetAvailableSelectionScopes: {
      const payloadArray: PresentationSelectionScope[] = [];
      action.payload.forEach((scope) => payloadArray.push(scope));
      if (undefined !== action.payload)
        return { ...state, availableSelectionScopes: payloadArray };
      else
        return { ...state, availableSelectionScopes: [defaultSelectionScope] };
    }
    case SessionStateActionId.SetSelectionScope: {
      if (undefined !== action.payload)
        return { ...state, activeSelectionScope: action.payload };
      else return { ...state, activeSelectionScope: defaultSelectionScope.id };
    }
    case SessionStateActionId.SetActiveIModelId: {
      if (undefined !== action.payload)
        return { ...state, iModelId: action.payload };
      else return { ...state, iModelId: "" };
    }
    case SessionStateActionId.SetDefaultIModelViewportControlId: {
      return { ...state, defaultIModelViewportControlId: action.payload };
    }
    case SessionStateActionId.SetDefaultViewId: {
      return { ...state, defaultViewId: action.payload };
    }
    case SessionStateActionId.SetDefaultViewState: {
      return { ...state, defaultViewState: action.payload };
    }
    case SessionStateActionId.SetIModelConnection: {
      return { ...state, iModelConnection: action.payload };
    }
    case SessionStateActionId.UpdateCursorMenu: {
      return {
        ...state,
        cursorMenuPayload: action.payload as CursorMenuPayload,
        cursorMenuData: action.payload as CursorMenuData,
      };
    }
  }

  return state;
}
