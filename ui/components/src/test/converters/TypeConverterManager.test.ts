/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { TypeConverterManager, TypeConverter, StringTypeConverter } from "../../ui-components";

describe("TypeConverterManager", () => {

  class TestTypeConverter extends TypeConverter {
    public sortCompare({ }, { }, _ignoreCase?: boolean | undefined): number {
      throw new Error("Method not implemented.");
    }
  }

  it("registerConverter for typename already registered ", async () => {
    expect(() => TypeConverterManager.registerConverter("text", TestTypeConverter)).to.throw(Error);
  });

  it("getConverter with invalid typename returns StringTypeConverter", async () => {
    const converter = TypeConverterManager.getConverter("badtype");
    expect(converter).to.be.instanceof(StringTypeConverter);
  });

  it("registerConverter registers and getConverter returns the same Converter", async () => {
    TypeConverterManager.registerConverter("testtype", TestTypeConverter);
    const converter = TypeConverterManager.getConverter("testtype");
    expect(converter).to.be.instanceof(TestTypeConverter);
  });

});
