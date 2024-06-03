/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Orientation } from "@itwin/core-react";
import * as moq from "typemoq";
import { PropertyGridCommons } from "../../../../components-react/propertygrid/component/PropertyGridCommons";

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

  describe("handleLinkClick", () => {
    const originalLocation = location;
    const locationMockRef: moq.IMock<Location> = moq.Mock.ofInstance(location);
    beforeEach(() => {
      location = locationMockRef.object;
    });

    afterEach(() => {
      location = originalLocation;
      locationMockRef.reset();
    });

    it("opens new window if the link text was found without http schema", async () => {
      const spy = vi.spyOn(window, "open");
      spy.mockReturnValue(null);

      PropertyGridCommons.handleLinkClick("www.testLink.com");
      expect(spy).toHaveBeenCalledWith("http://www.testLink.com", "_blank");
    });

    it("opens new window if the link text was found in record with http schema", async () => {
      const spy = vi.spyOn(window, "open");
      spy.mockReturnValue(null);

      PropertyGridCommons.handleLinkClick("http://www.testLink.com");
      expect(spy).toHaveBeenCalledWith("http://www.testLink.com", "_blank");
    });

    it("does not open new window if there were no url links", async () => {
      const spy = vi.spyOn(window, "open");
      spy.mockReturnValue(null);

      PropertyGridCommons.handleLinkClick("not an url link");
      PropertyGridCommons.handleLinkClick("testEmail@mail.com");
      expect(spy).not.toBeCalled();
    });

    it("sets location href value to value got in the text if it is an email link", async () => {
      PropertyGridCommons.handleLinkClick("someOtherLink@mail.com");
      expect(locationMockRef.object.href).toEqual(
        "mailto:someOtherLink@mail.com"
      );
    });

    it("sets location href value to value got in the text if it is an ProjectWise Explorer link", async () => {
      const spy = vi.spyOn(window, "open");
      PropertyGridCommons.handleLinkClick(
        "pw://server.bentley.com:datasource-01/Documents/ProjectName"
      );
      expect(spy).toHaveBeenCalledWith(
        "pw://server.bentley.com:datasource-01/Documents/ProjectName",
        "_blank"
      );
    });

    it("calls window.open.focus if window.open returns not null", () => {
      const windowMock = moq.Mock.ofType<Window>();
      windowMock.setup((x) => x.focus());

      const spy = vi.spyOn(window, "open");
      spy.mockReturnValue(windowMock.object);

      PropertyGridCommons.handleLinkClick("www.testLink.com");

      expect(spy).toHaveBeenCalledWith("http://www.testLink.com", "_blank");
      windowMock.verify((x) => x.focus(), moq.Times.once());
    });
  });
});
