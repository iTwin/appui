/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { reuseOrCreatePromise } from "../../core-react/utils/reuseOrCreatePromise";
import * as sinon from "sinon";

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

    expect(result).to.eq("firstResult");
  });

  it("should not create but return existing on subsequent call", async () => {
    const cache = new Map<string, Promise<string>>();
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

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

    expect(first).to.eq("secondResult");
    expect(second).to.eq("secondResult");
    expect(spy1).has.been.calledOnce;
    expect(spy2).has.not.been.called;
  });

  it("should create new on failure", async () => {
    const cache = new Map<string, Promise<string>>();
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

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

    expect(first).to.eq("Error: Failure");
    expect(second).to.eq("secondResult");
    expect(spy1).has.been.calledOnce;
    expect(spy2).has.been.calledOnce;
  });
});
