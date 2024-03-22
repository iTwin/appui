/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Select } from "@itwin/itwinui-react";

export type Language = "en-US" | "en-PSEUDO";

export function LanguageSelect({
  language,
  onChange,
}: {
  language: Language;
  onChange?: (newLanguage: Language) => void;
}) {
  return (
    <Select<Language>
      options={[
        {
          label: "US",
          value: "en-US",
        },
        {
          label: "Pseudo",
          value: "en-PSEUDO",
        },
      ]}
      value={language}
      size="small"
      onChange={(newLanguage) => {
        onChange?.(newLanguage);
      }}
    />
  );
}
