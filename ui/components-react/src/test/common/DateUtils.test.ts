/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  toDateString,
  toTimeString,
} from "../../components-react/common/DateUtils";

describe("DateUtils", () => {
  it("toDateString", () => {
    expect(toDateString(new Date(2021, 1, 1))).toBeTruthy();
    expect(toDateString(new Date(2021, 1, 1), 12)).toBeTruthy();
  });

  it("toTimeString", () => {
    expect(toTimeString(new Date(2021, 1, 1))).toBeTruthy();
    expect(toTimeString(new Date(2021, 1, 1), 12)).toBeTruthy();
  });

  it("toDateString with options", () => {
    expect(
      toDateString(new Date("June 30, 2016, 00:00:00 GMT -0000"), 0, {
        locales: "en-US",
        options: { year: "numeric", month: "short", day: "numeric" },
      })
    ).toEqual("Jun 30, 2016");
    // cannot test string value because of different time zones
    expect(
      toDateString(new Date("June 30, 2016, 00:00:00 GMT -0000"), undefined, {
        locales: "en-US",
        options: { year: "numeric", month: "short", day: "numeric" },
      })
    ).toBeTruthy();
  });

  it("toTimeString with options", () => {
    expect(
      toTimeString(new Date("June 30, 2016, 00:00:00 GMT -0000"), 0, {
        locales: "en-US",
        options: {
          hour: "2-digit",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        },
      }).replace("\u202f", " ")
    ).to.equal("12:00:00 AM");
    expect(
      toTimeString(new Date("June 30, 2016, 00:00:00 GMT -0000"), undefined, {
        locales: "en-US",
        options: {
          hour: "2-digit",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        },
      }).replace("\u202f", " ")
    ).to.match(/\d{2}:\d{2}:\d{2} (AM|PM)/);
  });
});
