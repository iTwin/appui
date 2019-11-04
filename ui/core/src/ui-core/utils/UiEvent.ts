/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utilities */

import { BeUiEvent } from "@bentley/bentleyjs-core";

/** iModel.js UI UiEvent class is a subclass of BeEvent with argument type safety.
 * @public
 */
export class UiEvent<TEventArgs> extends BeUiEvent<TEventArgs> { }
