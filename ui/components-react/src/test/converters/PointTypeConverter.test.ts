/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Primitives } from "@itwin/appui-abstract";
import { isPromiseLike } from "@itwin/core-react";
import type { ConvertedPrimitives } from "../../components-react";
import {
  Point2dTypeConverter,
  Point3dTypeConverter,
} from "../../components-react";
import { TypeConverter } from "../../components-react/converters/TypeConverter";
import { TypeConverterManager } from "../../components-react/converters/TypeConverterManager";

describe("Point2dTypeConverter", () => {
  let converter: Point2dTypeConverter;

  beforeEach(() => {
    registerTestConverters();
    converter = new Point2dTypeConverter(TestSyncComponentConverter.NAME);
  });

  afterEach(() => {
    unregisterTestConverters();
  });

  describe("convertToString", () => {
    const runTests = (mode: "sync" | "async" | "partial-async") => {
      describe(`with ${mode} component converter`, () => {
        beforeEach(() => {
          switch (mode) {
            case "sync":
              converter.componentConverterName =
                TestSyncComponentConverter.NAME;
              break;
            case "async":
              converter.componentConverterName =
                TestAsyncComponentConverter.NAME;
              break;
            case "partial-async":
              converter.componentConverterName =
                TestPartialAsyncComponentConverter.NAME;
              break;
          }
        });

        it("returns correct string for strings' array input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString(["50", "100"]),
            "_50_, _100_"
          );
        });

        it("returns correct string for numbers' array input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString([50, 100]),
            "_50_, _100_"
          );
        });

        it("returns correct string for object input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString({ x: 50, y: 100 }),
            "_50_, _100_"
          );
        });

        it("returns empty string if value is undefined", async () => {
          await expectOptionalPromiseLikeEq(
            "sync",
            converter.convertToString(undefined),
            ""
          );
        });

        it("returns empty string if value is an empty array", async () => {
          await expectOptionalPromiseLikeEq(
            "sync",
            converter.convertToString([]),
            ""
          );
        });
      });
    };

    runTests("sync");
    runTests("async");
    runTests("partial-async");
  });

  describe("convertFromString", () => {
    it("returns correct object", () => {
      const point2d = converter.convertFromString("50, 100");
      expect(point2d).toBeTruthy();
      expect(point2d!.x).to.equal(50);
      expect(point2d!.y).to.equal(100);
    });

    it("returns undefined if string is wrong", () => {
      expect(converter.convertFromString("50, 100, 150")).toEqual(undefined);
    });
  });

  describe("sortCompare", () => {
    it("returns less than 0 when first value is invalid", () => {
      expect(converter.sortCompare(["a", "b", "c"], ["1", "2"])).to.be.lessThan(
        0
      );
    });

    it("returns greater than 0 when second value is invalid", () => {
      expect(
        converter.sortCompare(["1", "2"], ["a", "b", "c"])
      ).to.be.greaterThan(0);
    });

    it("returns 0 if points are mirrored", () => {
      expect(converter.sortCompare(["1", "1"], ["-1", "-1"])).to.be.eq(0);
      expect(converter.sortCompare({ x: 1, y: 1 }, { x: -1, y: -1 })).to.be.eq(
        0
      );
    });

    it("returns less than 0 if second point is further from [0,0]", () => {
      expect(converter.sortCompare(["1", "1"], ["2", "2"])).to.be.lessThan(0);
    });

    it("returns greater than 0 if first point is further from [0,0]", () => {
      expect(converter.sortCompare(["2", "2"], ["1", "1"])).to.be.greaterThan(
        0
      );
    });
  });
});

describe("Point3dTypeConverter", () => {
  let converter: Point3dTypeConverter;

  beforeEach(() => {
    registerTestConverters();
    converter = new Point3dTypeConverter(TestSyncComponentConverter.NAME);
  });

  afterEach(() => {
    unregisterTestConverters();
  });

  describe("convertToString", () => {
    const runTests = (mode: "sync" | "async" | "partial-async") => {
      describe(`with ${mode} component converter`, () => {
        beforeEach(() => {
          switch (mode) {
            case "sync":
              converter.componentConverterName =
                TestSyncComponentConverter.NAME;
              break;
            case "async":
              converter.componentConverterName =
                TestAsyncComponentConverter.NAME;
              break;
            case "partial-async":
              converter.componentConverterName =
                TestPartialAsyncComponentConverter.NAME;
              break;
          }
        });

        it("returns correct string for strings' array input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString(["50", "100", "150"]),
            "_50_, _100_, _150_"
          );
        });

        it("returns correct string for numbers' array input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString([50, 100, 150]),
            "_50_, _100_, _150_"
          );
        });

        it("returns correct string for object input", async () => {
          await expectOptionalPromiseLikeEq(
            mode,
            converter.convertToString({ x: 50, y: 100, z: 150 }),
            "_50_, _100_, _150_"
          );
        });

        it("returns empty string if value is undefined", async () => {
          await expectOptionalPromiseLikeEq(
            "sync",
            converter.convertToString(undefined),
            ""
          );
        });
      });
    };

    runTests("sync");
    runTests("async");
    runTests("partial-async");
  });

  describe("convertFromString", () => {
    it("returns correct object", () => {
      const point3d = converter.convertFromString(
        "50, 100, 150"
      ) as ConvertedPrimitives.Point3d;
      expect(point3d).toBeTruthy();
      expect(point3d.x).to.equal(50);
      expect(point3d.y).to.equal(100);
      expect(point3d.z).to.equal(150);
    });

    it("returns undefined if string is wrong", () => {
      expect(converter.convertFromString("50, 100")).toEqual(undefined);
    });
  });

  describe("sortCompare", () => {
    it("returns less than 0 when first value is invalid", () => {
      expect(
        converter.sortCompare(["a", "b", "c"], ["1", "2", "1"])
      ).to.be.lessThan(0);
    });

    it("returns 0 if points are mirrored", () => {
      expect(
        converter.sortCompare(["1", "1", "-2"], ["-1", "-1", "2"])
      ).to.be.eq(0);
      expect(
        converter.sortCompare({ x: 1, y: 1, z: -2 }, { x: -1, y: -1, z: 2 })
      ).to.be.eq(0);
    });

    it("returns less than 0 if second point is further from [0,0,0]", () => {
      expect(
        converter.sortCompare(["1", "1", "1"], ["2", "2", "2"])
      ).to.be.lessThan(0);
    });

    it("returns greater than 0 if first point is further from [0,0,0]", () => {
      expect(
        converter.sortCompare(["2", "2", "2"], ["1", "1", "1"])
      ).to.be.greaterThan(0);
    });

    it("returns 0 if 2d points are mirrored", () => {
      expect(converter.sortCompare(["1", "1"], ["-1", "-1"])).to.be.eq(0);
      expect(converter.sortCompare({ x: 1, y: 1 }, { x: -1, y: -1 })).to.be.eq(
        0
      );
    });
  });
});

class TestSyncComponentConverter extends TypeConverter {
  public static NAME = "test-sync-component-converter";
  public override convertToString(value?: Primitives.Value) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return `_${(value ?? "").toString()}_`;
  }
  public sortCompare() {
    return 0;
  }
}

class TestAsyncComponentConverter extends TypeConverter {
  public static NAME = "test-async-component-converter";
  public override async convertToString(value?: Primitives.Value) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return `_${(value ?? "").toString()}_`;
  }
  public sortCompare(): number {
    return 0;
  }
}

class TestPartialAsyncComponentConverter extends TypeConverter {
  public static NAME = "test-partial-async-component-converter";
  public override convertToString(
    value?: Primitives.Value
  ): string | Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const result = `_${(value ?? "").toString()}_`;
    return value && value.toString() === "100" // eslint-disable-line @typescript-eslint/no-base-to-string
      ? Promise.resolve(result)
      : result;
  }
  public sortCompare(): number {
    return 0;
  }
}

const registerTestConverters = () => {
  TypeConverterManager.registerConverter(
    TestSyncComponentConverter.NAME,
    TestSyncComponentConverter
  );
  TypeConverterManager.registerConverter(
    TestAsyncComponentConverter.NAME,
    TestAsyncComponentConverter
  );
  TypeConverterManager.registerConverter(
    TestPartialAsyncComponentConverter.NAME,
    TestPartialAsyncComponentConverter
  );
};
const unregisterTestConverters = () => {
  TypeConverterManager.unregisterConverter(TestSyncComponentConverter.NAME);
  TypeConverterManager.unregisterConverter(TestAsyncComponentConverter.NAME);
  TypeConverterManager.unregisterConverter(
    TestPartialAsyncComponentConverter.NAME
  );
};

const expectOptionalPromiseLikeEq = async (
  mode: "sync" | "async" | "partial-async",
  actual: string | Promise<string>,
  expected: string
) => {
  if (mode === "sync") {
    expect(isPromiseLike(actual)).toEqual(false);
    expect(actual).toEqual(expected);
  } else {
    expect(isPromiseLike(actual)).toEqual(true);
    await expect(actual).resolves.toEqual(expected);
  }
};
