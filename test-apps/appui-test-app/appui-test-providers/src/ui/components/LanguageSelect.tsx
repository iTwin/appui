/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { LabeledSelect } from "@itwin/itwinui-react";
import { useTranslation } from "../../useTranslation";
import "./LanguageSelect.scss";

export type Language = "en-US" | "en-PSEUDO";

export function LanguageSelect({
  language,
  onChange,
}: {
  language: Language;
  onChange?: (newLanguage: Language) => void;
}) {
  const { translate } = useTranslation();
  return (
    <LabeledSelect
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
      onChange={onChange}
      label={`${translate("statusFields.languageSelect.label")}:`}
      labelProps={{ className: "uifw-statusFields-languageSelect-label" }}
      displayStyle="inline"
      popoverProps={{ placement: "top" }}
    />
  );
}
