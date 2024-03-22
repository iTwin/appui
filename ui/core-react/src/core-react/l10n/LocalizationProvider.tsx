/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import * as React from "react";
import type { Localization as CoreLocalization } from "@itwin/core-common";

type Localization = Pick<CoreLocalization, "getLocalizedString">;

const LocalizationContext = React.createContext<Localization | undefined>(
  undefined
);

interface LocalizationProviderProps {
  children?: React.ReactNode;
  localization: Localization;
}

/** Provides localization capability to the components.
 * @alpha
 */
export function LocalizationProvider(props: LocalizationProviderProps) {
  const { children, localization } = props;
  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
}

/** Returns localization context.
 * @internal
 */
export function useLocalization() {
  const localization = React.useContext(LocalizationContext);
  return localization;
}
