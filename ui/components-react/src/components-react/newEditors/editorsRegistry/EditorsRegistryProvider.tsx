import * as React from "react";
import { useContext, useMemo } from "react";
import type { EditorSpec } from "../Types.js";
import { editorsRegistryContext } from "./EditorsRegistry.js";

/**
 *
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
      editors: [...parentContext.editors, ...editors],
    };
  }, [parentContext, editors]);

  return (
    <editorsRegistryContext.Provider value={value}>
      {children}
    </editorsRegistryContext.Provider>
  );
}
