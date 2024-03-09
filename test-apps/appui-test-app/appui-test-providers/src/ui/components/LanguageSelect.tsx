/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Select } from "@itwin/itwinui-react";
import { IModelApp } from "@itwin/core-frontend";

export function LanguageSelect() {
  const [language, setLanguage] = React.useState("en-US");
  return (
    <Select
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
      onChange={async (newLanguage) => {
        await IModelApp.localization.changeLanguage(newLanguage);
        setLanguage(newLanguage);
      }}
    />
  );
}
