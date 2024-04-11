/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getObjectClassName } from "../../core-react/utils/getObjectClassName";

describe("getObjectClassName", () => {
  class NamedClass {
    constructor() {
      expect(getObjectClassName(this)).toEqual("NamedClass");
    }
  }

  class ClassWithStatic {
    public static testMethod1() {
      expect(getObjectClassName(ClassWithStatic)).toEqual("ClassWithStatic");
    }

    public static testMethod2() {
      expect(getObjectClassName(this)).toEqual("ClassWithStatic");
    }
  }

  it("should be the name of the regular class", () => {
    const namedClass = new NamedClass();
    expect(getObjectClassName(namedClass)).toEqual("NamedClass");
  });

  it("should be the name of the class containing a static method", () => {
    ClassWithStatic.testMethod1();
    ClassWithStatic.testMethod2();
    expect(getObjectClassName(ClassWithStatic)).toEqual("ClassWithStatic");
  });

  it("should be blank if passed null or undefined", () => {
    expect(getObjectClassName(null)).toEqual("");
    expect(getObjectClassName(undefined)).toEqual("");
  });

  it("should be Object if passed an empty object", () => {
    expect(getObjectClassName({})).toEqual("Object");
  });

  it("should be Number if passed a numeric value", () => {
    expect(getObjectClassName(123)).toEqual("Number");
  });
});
