/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { render } from "@testing-library/react";
import {
  defaultNamespace as coreDefaultNamespace,
  LocalizationProvider,
} from "@itwin/core-react";
import { useTranslation as useCoreTranslation } from "@itwin/core-react/lib/cjs/core-react/l10n/useTranslation";
import {
  defaultNamespace as componentsDefaultNamespace,
  useTranslation as useComponentsTranslation,
} from "../components-react";

function LocalizedCoreComponent() {
  const { translate } = useCoreTranslation();
  return <div>{translate("dialog.yes")}</div>;
}

function LocalizedComponentsComponent() {
  const { translate } = useComponentsTranslation();
  return <div>{translate("dialog.ok")}</div>;
}

type Localization = React.ComponentProps<
  typeof LocalizationProvider
>["localization"];

export const localization: Localization = {
  getLocalizedString: (keys) => {
    const key = typeof keys === "string" ? keys : keys[0];
    return key;
  },
};

describe.only("translation", () => {
  it("application should register namespace", () => {
    // Application should use `IModelApp.localization` to register namespaces.
    expect([coreDefaultNamespace, componentsDefaultNamespace]).to.eql([
      "UiCore",
      "UiComponents",
    ]);
  });

  it("should localize", () => {
    const component = render(
      <LocalizationProvider localization={localization}>
        <LocalizedCoreComponent />
        <LocalizedComponentsComponent />
      </LocalizationProvider>
    );
    component.getByText("UiCore:dialog.yes");
    component.getByText("UiComponents:dialog.ok");
  });

  it("should update translations", () => {
    const component = render(
      <LocalizationProvider localization={localization}>
        <LocalizedCoreComponent />
        <LocalizedComponentsComponent />
      </LocalizationProvider>
    );

    const updatedLocalization: Localization = {
      getLocalizedString: (keys) => {
        const localized = localization.getLocalizedString(keys);
        return `x:${localized}`;
      },
    };
    component.rerender(
      <LocalizationProvider localization={updatedLocalization}>
        <LocalizedCoreComponent />
        <LocalizedComponentsComponent />
      </LocalizationProvider>
    );
    component.getByText("x:UiCore:dialog.yes");
    component.getByText("x:UiComponents:dialog.ok");
  });

  it("should use default translations", () => {
    const component = render(
      <>
        <LocalizedCoreComponent />
        <LocalizedComponentsComponent />
      </>
    );
    component.getByText("Yes");
    component.getByText("OK");
  });
});
