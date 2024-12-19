/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EnumerationChoice } from "@itwin/appui-abstract";
import type { ValueMetadata } from "../../../values/Metadata.js";
import * as React from "react";
import { isOldEditorMetadata } from "../../Metadata.js";

/**
 *
 */
export function useEnumChoices(metadata: ValueMetadata) {
  const [choices, setChoices] = React.useState<EnumerationChoice[]>([]);

  React.useEffect(() => {
    if (!isOldEditorMetadata(metadata)) {
      throw new Error("EnumButtonGroupEditor missing metadata.");
    }

    let disposed = false;
    const loadChoices = async () => {
      const loadedChoices =
        metadata.enum === undefined
          ? []
          : metadata.enum.choices instanceof Promise
          ? [...(await metadata.enum.choices)]
          : [...metadata.enum.choices];

      if (!disposed) {
        setChoices(loadedChoices);
      }
    };

    void loadChoices();

    return () => {
      disposed = true;
    };
  }, [metadata]);

  return choices;
}
