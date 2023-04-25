/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Orientation } from "@itwin/core-react";
import { expect } from "chai";
import sinon from "sinon";
import * as moq from "typemoq";
import { PropertyGridCommons } from "../../../../components-react/propertygrid/component/PropertyGridCommons";

/* eslint-disable @typescript-eslint/naming-convention */
describe("PropertyGrid Commons", () => {

  describe("getLinks", () => {

    it("detects url link", () => {
      const testLinkWithIndexes = { link: "Link: https://www.testLink.com", linkIndexes: { start: 6, end: 30 } };
      const linkResult = PropertyGridCommons.getLinks(testLinkWithIndexes.link);
      expect(linkResult.length).to.be.equal(1);
      expect(linkResult[0].start).to.be.equal(testLinkWithIndexes.linkIndexes.start);
      expect(linkResult[0].end).to.be.equal(testLinkWithIndexes.linkIndexes.end);
    });

  });

  describe("getCurrentOrientation", () => {
    it("defaults to Orientation.Horizontal", () => {
      const currentOrientation = PropertyGridCommons.getCurrentOrientation(500);
      expect(currentOrientation).to.be.equal(Orientation.Horizontal);
    });
  });

  describe("handleLinkClick", () => {
    const locationMockRef: moq.IMock<Location> = moq.Mock.ofInstance(location);
    let spy: sinon.SinonStub<[(string | URL | undefined)?, (string | undefined)?, (string | undefined)?, (boolean | undefined)?], Window | null>;

    before(() => {
      location = locationMockRef.object;
    });

    after(() => {
      locationMockRef.reset();
    });

    afterEach(() => {
      spy.restore();
    });

    it("opens new window if the link text was found without http schema", async () => {
      spy = sinon.stub(window, "open");
      spy.returns(null);

      PropertyGridCommons.handleLinkClick("www.testLink.com");
      expect(spy).to.be.calledOnceWith("http://www.testLink.com", "_blank");
    });

    it("opens new window if the link text was found in record with http schema", async () => {
      spy = sinon.stub(window, "open");
      spy.returns(null);

      PropertyGridCommons.handleLinkClick("http://www.testLink.com");
      expect(spy).to.be.calledOnceWith("http://www.testLink.com", "_blank");
    });

    it("does not open new window if there were no url links", async () => {
      spy = sinon.stub(window, "open");
      spy.returns(null);

      PropertyGridCommons.handleLinkClick("not an url link");
      PropertyGridCommons.handleLinkClick("testEmail@mail.com");
      sinon.assert.notCalled(spy);
    });

    it("sets location href value to value got in the text if it is an email link", async () => {
      PropertyGridCommons.handleLinkClick("someOtherLink@mail.com");
      expect(locationMockRef.object.href).to.be.equal("mailto:someOtherLink@mail.com");
    });

    it("sets location href value to value got in the text if it is an ProjectWise Explorer link", async () => {
      PropertyGridCommons.handleLinkClick("pw://server.bentley.com:datasource-01/Documents/ProjectName");
      expect(locationMockRef.object.href).to.be.equal("pw://server.bentley.com:datasource-01/Documents/ProjectName");
    });

    it("calls window.open.focus if window.open returns not null", () => {
      const windowMock = moq.Mock.ofType<Window>();
      windowMock.setup((x) => x.focus());

      spy = sinon.stub(window, "open");
      spy.returns(windowMock.object);

      PropertyGridCommons.handleLinkClick("www.testLink.com");

      expect(spy).to.be.calledOnceWith("http://www.testLink.com", "_blank");
      windowMock.verify((x) => x.focus(), moq.Times.once());
    });
  });

});
