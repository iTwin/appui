/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { LocalizationProvider } from "@itwin/core-react";
import { IModelApp } from "@itwin/core-frontend";
import { Localization } from "@itwin/core-common";
import { Language, LanguageSelect } from "@itwin/appui-test-providers";

export const LanguageContext = React.createContext<
  | {
      language: Language;
      onChange: (newLanguage: Language) => void;
    }
  | undefined
>(undefined);

export const AppLocalizationContext = React.createContext<
  Localization | undefined
>(undefined);

type LocalizationProviderProps = React.ComponentProps<
  typeof LocalizationProvider
>;

export function AppLocalizationProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [language, setLanguage] = React.useState<Language>("en-US");
  const [localization, setLocalization] = React.useState<
    LocalizationProviderProps["localization"]
  >(IModelApp.localization);
  return (
    <LanguageContext.Provider
      value={{
        language,
        onChange: async (newLanguage) => {
          setLanguage(newLanguage);
          await IModelApp.localization.changeLanguage(newLanguage);
          setLocalization({
            getLocalizedString: (...args) =>
              IModelApp.localization.getLocalizedString(...args),
            registerNamespace: async (...args) =>
              IModelApp.localization.registerNamespace(...args),
          });
        },
      }}
    >
      <LocalizationProvider localization={localization}>
        {children}
      </LocalizationProvider>
    </LanguageContext.Provider>
  );
}

export function AppLanguageSelect() {
  const { language, onChange } = React.useContext(LanguageContext)!;
  return <LanguageSelect language={language} onChange={onChange} />;
}
