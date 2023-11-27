/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { UiError } from "@itwin/appui-abstract";
import { getObjectClassName } from "@itwin/core-react";
import { UiComponents } from "../UiComponents";
import React from "react";

/** @internal */
export function createContextWithMandatoryProvider<T>(
  contextName: string
): [
  React.ProviderExoticComponent<React.ProviderProps<T>>,
  React.ExoticComponent<React.ConsumerProps<T>>,
  <P>(component: React.ComponentType<P>) => T
] {
  const context = React.createContext<T>(undefined as any as T);
  function useContextWithoutDefaultValue<P>(
    ConsumingComponent: React.ComponentType<P>
  ) {
    const value = React.useContext(context);
    /* istanbul ignore if */
    if (value === undefined) {
      throw new UiError(
        UiComponents.loggerCategory(ConsumingComponent),
        `'${getObjectClassName(
          ConsumingComponent
        )}' expects to be wrapped by a '${contextName}' provider.`
      );
    }
    return value;
  }
  return [context.Provider, context.Consumer, useContextWithoutDefaultValue];
}
