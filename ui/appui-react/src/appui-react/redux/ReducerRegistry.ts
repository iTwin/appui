/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { UiError } from "@itwin/appui-abstract";
import { UiFramework } from "../UiFramework.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** NameToReducerMap used by Reducer Registry
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export interface NameToReducerMap {
  [name: string]: (state: any, action: any) => any;
}

/** Redux Reducer Registry.
 * Follows the example at http://nicolasgallagher.com/redux-modules-and-code-splitting/
 * Allows for small modules to provide their own reducers so that the they can manage their own state
 * @public
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export class ReducerRegistry {
  private _onReducerListChanged:
    | ((reducers: NameToReducerMap) => void)
    | undefined;
  private _reducers: NameToReducerMap;

  /** ReducerRegistry constructor that initializes an empty reducer map to be populated by called to registerReducer. */
  constructor() {
    this._reducers = {};
  }

  /** Call to register a reducer and its name. */
  public registerReducer(
    name: string,
    reducer: (state: any, action: any) => any
  ) {
    if (this._reducers[name]) {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      throw new UiError(
        UiFramework.loggerCategory("ReducerRegistry"),
        `Redux Reducer with matching name of '${name}' is already registered`
      );
    }

    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._onReducerListChanged) {
      this._onReducerListChanged(this._reducers);
    }
  }

  /** Supports a single listener which should be the Redux store, see [[StoreManager]].
   * @internal
   */
  public setChangeListener(listener: (reducers: NameToReducerMap) => void) {
    this._onReducerListChanged = listener;
  }

  /** Returns map of registered Reducers. */
  public getReducers() {
    return this._reducers;
  }

  /** Clear reducers only required for unit testing
   * @internal
   */
  public clearReducers() {
    this._reducers = {};
    if (this._onReducerListChanged) {
      this._onReducerListChanged(this._reducers);
    }
  }
}

/** ReducerRegistryInstance singleton instance of Reducer Registry
 * @beta
 * @deprecated in 4.15.0. Use your preferred state management library instead.
 */
export const ReducerRegistryInstance = new ReducerRegistry();
