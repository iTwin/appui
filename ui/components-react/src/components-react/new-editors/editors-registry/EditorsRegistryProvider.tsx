/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import { useContext, useMemo } from "react";
import type { EditorSpec } from "../Types.js";
import { EditorsRegistryContext } from "./EditorsRegistryContext.js";

/**
 * Provider that adds supplied editors into `EditorsRegistry`.
 * Multiple providers can be nested, with editors from the innermost provider taking the highest priority.
 * You can either supply a list of editors or provide a function that customizes the current list of editors,
 * allowing full control over the final set of editors.
 * @beta
 */
export function EditorsRegistryProvider({
  children,
  editors,
}: {
  children: React.ReactNode;
  editors: EditorSpec[] | ((editors: EditorSpec[]) => EditorSpec[]);
}) {
  const parentContext = useContext(EditorsRegistryContext);

  const value = useMemo(() => {
    if (typeof editors === "function") {
      return { editors: editors(parentContext.editors) };
    }
    return {
      editors: [...editors, ...parentContext.editors],
    };
  }, [parentContext, editors]);

  return (
    <EditorsRegistryContext.Provider value={value}>
      {children}
    </EditorsRegistryContext.Provider>
  );
}
