/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import TestProps from "./TestProps";
import { NineZone } from "../../../ui-ninezone";

describe("Widget", () => {
  describe("equals", () => {
    it("should return true for same widgets", () => {
      const nineZone = new NineZone(TestProps.defaultProps);
      nineZone.getWidget(1).equals(nineZone.getWidget(1)).should.true;
    });

    it("should return false for different widgets", () => {
      const nineZone = new NineZone(TestProps.defaultProps);
      nineZone.getWidget(1).equals(nineZone.getWidget(2)).should.false;
    });
  });
});
