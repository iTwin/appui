/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type {
  EnumValueMetadata,
  ValueMetadata,
} from "../../../values/Metadata.js";
import * as React from "react";
import { isOldEditorMetadata } from "../../Metadata.js";

/**
 * Converts old enum metadata definition into the new one. It takes care of lazy loaded choices.
 * @internal
 */
export function useEnumMetadata(oldMetadata: ValueMetadata): EnumValueMetadata {
  const [metadata, setMetadata] = React.useState<EnumValueMetadata>(() => ({
    type: "enum",
    choices: [],
    isStrict: false,
  }));

  React.useEffect(() => {
    if (!isOldEditorMetadata(oldMetadata)) {
      throw new Error("EnumButtonGroupEditor missing metadata.");
    }

    let disposed = false;
    const loadChoices = async () => {
      const loadedChoices =
        oldMetadata.enum === undefined
          ? []
          : oldMetadata.enum.choices instanceof Promise
          ? [...(await oldMetadata.enum.choices)]
          : [...oldMetadata.enum.choices];

      if (!disposed) {
        setMetadata({
          type: "enum",
          choices: loadedChoices,
          isStrict: oldMetadata.enum?.isStrict ?? false,
        });
      }
    };

    void loadChoices();

    return () => {
      disposed = true;
    };
  }, [oldMetadata]);

  return metadata;
}
