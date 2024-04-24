/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
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

describe("usePackageTranslation", () => {
  it("should use a localization context", async () => {
    const spy = vi.spyOn(localization, "getLocalizedString");
    const { result, waitFor } = renderHook(
      () =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {},
        }),
      {
        wrapper: (props: any) => (
          <LocalizationProvider localization={localization} {...props} />
        ),
      }
    );

    await waitFor(() => {
      expect(result.current.translate("prop.val")).to.eq("localized-string");
      expect(spy).toHaveBeenCalledWith("test-namespace:prop.val");
    });
  });

  it("should use a fallback function", () => {
    const fallback = vi.fn((_key: string) => {
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
    expect(fallback).toHaveBeenCalledWith("prop.val");
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

  it("should update translations when localization context changes", async () => {
    const { result, rerender, waitFor } = renderHook(
      () =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {},
        }),
      {
        wrapper: (props: { localization: Localization }) => (
          <LocalizationProvider {...props} />
        ),
        initialProps: {
          localization,
        },
      }
    );

    const newLocalization = {
      ...localization,
      getLocalizedString: (_key: string) => "updated-localized-string",
    };
    const spy = vi.spyOn(newLocalization, "getLocalizedString");
    rerender({
      localization: newLocalization,
    });

    await waitFor(() => {
      expect(result.current.translate("prop.val")).to.eq(
        "updated-localized-string"
      );
      expect(spy).toHaveBeenCalledWith("test-namespace:prop.val");
    });
  });

  it("should register a namespace", async () => {
    const spy = vi.spyOn(localization, "registerNamespace");

    renderHook(
      () =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {},
        }),
      {
        wrapper: (props: any) => (
          <LocalizationProvider localization={localization} {...props} />
        ),
      }
    );

    expect(spy).toHaveBeenCalledWith("test-namespace");
  });

  it("should update translation when namespace is registered", async () => {
    let resolvePromise: (() => void) | undefined;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    vi.spyOn(localization, "registerNamespace").mockReturnValue(promise);

    const { result, waitFor } = renderHook(
      () =>
        usePackageTranslation({
          namespace: "test-namespace",
          fallback: () => undefined,
          defaults: {
            val: "default-value",
          },
        }),
      {
        wrapper: (props: any) => (
          <LocalizationProvider localization={localization} {...props} />
        ),
      }
    );

    await expect(
      waitFor(() => {
        expect(result.current.translate("val")).to.eq("localized-string");
      })
    ).rejects.toThrow();
    expect(result.current.translate("val")).to.eq("default-value");

    resolvePromise?.();

    await waitFor(() => {
      expect(result.current.translate("val")).to.eq("localized-string");
    });
  });
});
