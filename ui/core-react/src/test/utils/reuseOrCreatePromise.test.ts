/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { reuseOrCreatePromise } from "../../core-react/utils/reuseOrCreatePromise";

async function getString(str: string) {
  return str;
}

describe("reuseOrCreatePromise", () => {
  it("should create and return promise on new cache", async () => {
    const cache = new Map<string, Promise<string>>();

    const result = await reuseOrCreatePromise(
      "first",
      async () => getString("firstResult"),
      cache
    );

    expect(result).toEqual("firstResult");
  });

  it("should not create but return existing on subsequent call", async () => {
    const cache = new Map<string, Promise<string>>();
    const spy1 = vi.fn();
    const spy2 = vi.fn();

    const first = await reuseOrCreatePromise(
      "second",
      async () => {
        spy1();
        return getString("secondResult");
      },
      cache
    );

    const second = await reuseOrCreatePromise(
      "second",
      async () => {
        spy2();
        return getString("secondResult(not used)");
      },
      cache
    );

    expect(first).toEqual("secondResult");
    expect(second).toEqual("secondResult");
    expect(spy1).toHaveBeenCalledOnce();
    expect(spy2).not.toBeCalled();
  });

  it("should create new on failure", async () => {
    const cache = new Map<string, Promise<string>>();
    const spy1 = vi.fn();
    const spy2 = vi.fn();

    const first = await reuseOrCreatePromise(
      "second",
      async () => {
        spy1();
        throw new Error("Failure");
      },
      cache
    ).catch((e) => e.toString());

    const second = await reuseOrCreatePromise(
      "second",
      async () => {
        spy2();
        return getString("secondResult");
      },
      cache
    );

    expect(first).toEqual("Error: Failure");
    expect(second).toEqual("secondResult");
    expect(spy1).toHaveBeenCalledOnce();
    expect(spy2).toHaveBeenCalledOnce();
  });
});
