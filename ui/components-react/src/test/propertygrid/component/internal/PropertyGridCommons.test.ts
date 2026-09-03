/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Orientation } from "@itwin/core-react";
import { PropertyGridCommons } from "../../../../components-react/propertygrid/component/PropertyGridCommons.js";

describe("PropertyGrid Commons", () => {
  describe("getLinks", () => {
    it("detects url link", () => {
      const testLinkWithIndexes = {
        link: "Link: https://www.testLink.com",
        linkIndexes: { start: 6, end: 30 },
      };
      const linkResult = PropertyGridCommons.getLinks(testLinkWithIndexes.link);
      expect(linkResult.length).toEqual(1);
      expect(linkResult[0].start).toEqual(
        testLinkWithIndexes.linkIndexes.start
      );
      expect(linkResult[0].end).toEqual(testLinkWithIndexes.linkIndexes.end);
    });
  });

  describe("getCurrentOrientation", () => {
    it("defaults to Orientation.Horizontal", () => {
      const currentOrientation = PropertyGridCommons.getCurrentOrientation(500);
      expect(currentOrientation).toEqual(Orientation.Horizontal);
    });
  });
});
