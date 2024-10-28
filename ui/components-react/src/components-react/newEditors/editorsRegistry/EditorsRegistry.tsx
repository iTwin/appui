import { createContext, useContext } from "react";
import type { EditorSpec } from "../Types.js";

interface EditorsRegistry {
  editors: EditorSpec[];
}

export const editorsRegistryContext = createContext<EditorsRegistry>({
  editors: [],
});

/**
 *
 */
export function useEditorsRegistry() {
  return useContext(editorsRegistryContext);
}
