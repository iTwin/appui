/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { renderHook } from "@testing-library/react-hooks";
import { LocalizationProvider } from "../../core-react";
import { usePackageTranslation } from "../../core-react";

type Localization = React.ComponentProps<
  typeof LocalizationProvider
>["localization"];

const localization: Localization = {
  getLocalizedString: () => {
    return "localized-string";
  },
  registerNamespace: async () => {},
};

describe.only("usePackageTranslation", () => {
  it("should use a localization context", () => {
    const spy = sinon.spy(localization, "getLocalizedString");
    const { result } = renderHook(
      () =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {},
        }),
      {
        wrapper: (props) => (
          <LocalizationProvider localization={localization} {...props} />
        ),
      }
    );

    expect(result.current.translate("prop.val")).to.eq("localized-string");
    sinon.assert.calledOnceWithExactly(spy, "test-namespace:prop.val");
  });

  it("should use a fallback function", () => {
    const fallback = sinon.spy((_key: string) => {
      return "fallback-value";
    });

    const { result } = renderHook(() =>
      usePackageTranslation({
        namespace: "test-namespace",
        fallback,
        defaults: {},
      })
    );

    expect(result.current.translate("prop.val")).to.eq("fallback-value");
    sinon.assert.calledOnceWithExactly(fallback, "prop.val");
  });

  it("should use default value", () => {
    const { result } = renderHook(() =>
      usePackageTranslation({
        namespace: "test-namespace",
        fallback: () => undefined,
        defaults: {
          prop1: {
            prop2: {
              val: "default-value",
            },
          },
        },
      })
    );

    expect(result.current.translate("prop1.prop2.val")).to.eq("default-value");
  });

  it("should fallback to key", () => {
    const { result } = renderHook(() =>
      usePackageTranslation({
        namespace: "test-namespace",
        fallback: () => undefined,
        defaults: {},
      })
    );

    expect(result.current.translate("prop.val")).to.eq("prop.val");
  });

  it("should use a localization context", () => {
    const { result, rerender } = renderHook(
      (_props: { localization: Localization }) =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {},
        }),
      {
        wrapper: (props) => <LocalizationProvider {...props} />,
      }
    );

    const newLocalization = {
      ...localization,
      getLocalizedString: (_key: string) => "updated-localized-string",
    };
    const spy = sinon.spy(newLocalization, "getLocalizedString");
    rerender({
      localization: newLocalization,
    });

    expect(result.current.translate("prop.val")).to.eq(
      "updated-localized-string"
    );
    sinon.assert.calledOnceWithExactly(spy, "test-namespace:prop.val");
  });
});
