/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { getObjectClassName } from "../../core-react/utils/getObjectClassName";

describe("getObjectClassName", () => {
  class NamedClass {
    constructor() {
      expect(getObjectClassName(this)).to.eq("NamedClass");
    }
  }

  class ClassWithStatic {
    public static testMethod1() {
      expect(getObjectClassName(ClassWithStatic)).to.eq("ClassWithStatic");
    }

    public static testMethod2() {
      expect(getObjectClassName(this)).to.eq("ClassWithStatic");
    }
  }

  it("should be the name of the regular class", () => {
    const namedClass = new NamedClass();
    expect(getObjectClassName(namedClass)).to.eq("NamedClass");
  });

  it("should be the name of the class containing a static method", () => {
    ClassWithStatic.testMethod1();
    ClassWithStatic.testMethod2();
    expect(getObjectClassName(ClassWithStatic)).to.eq("ClassWithStatic");
  });

  it("should be blank if passed null or undefined", () => {
    expect(getObjectClassName(null)).to.eq("");
    expect(getObjectClassName(undefined)).to.eq("");
  });

  it("should be Object if passed an empty object", () => {
    expect(getObjectClassName({})).to.eq("Object");
  });

  it("should be Number if passed a numeric value", () => {
    expect(getObjectClassName(123)).to.eq("Number");
  });
});
