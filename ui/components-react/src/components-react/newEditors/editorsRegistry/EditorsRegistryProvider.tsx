/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useContext, useMemo } from "react";
import type { EditorSpec } from "../Types.js";
import { editorsRegistryContext } from "./EditorsRegistryContext.js";

/**
 * Provider that adds supplied editors into `EditorsRegistry`. Multiple providers can be nested together.
 * Editors added through the lowest level provider will have the highest priority.
 * @beta
 */
export function EditorsRegistryProvider({
  children,
  editors,
}: {
  children: React.ReactNode;
  editors: EditorSpec[];
}) {
  const parentContext = useContext(editorsRegistryContext);

  const value = useMemo(() => {
    return {
      editors: [...editors, ...parentContext.editors],
    };
  }, [parentContext, editors]);

  return (
    <editorsRegistryContext.Provider value={value}>
      {children}
    </editorsRegistryContext.Provider>
  );
}
