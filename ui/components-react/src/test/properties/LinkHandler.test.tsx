/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { LinkElementsInfo } from "@itwin/appui-abstract";
import { render } from "@testing-library/react";
import {
  LinksRenderer,
  renderLinks,
  withLinks,
} from "../../components-react/properties/LinkHandler.js";

describe("LinkHandler", () => {
  const onClickSpy = vi.fn();
  let links: LinkElementsInfo;

  beforeEach(() => {
    links = {
      onClick: onClickSpy,
    };
  });

  describe("renderLinks", () => {
    it("calls highlight callback if provided", () => {
      const testString = "Example text";
      const highlightSpy = vi.fn();

      render(
        <LinksRenderer
          value={testString}
          links={links}
          highlighter={highlightSpy}
        />
      );

      expect(highlightSpy).toHaveBeenCalledOnce();
    });

    it("calls highlight callback for matching part", () => {
      links.matcher = () => [{ start: 0, end: 7 }];
      const testString = "Example text";
      let matchedPartHighlighted = false;

      const highlighter = (text: string) => {
        if (text === "Example") matchedPartHighlighted = true;
        return text;
      };

      render(
        <LinksRenderer
          value={testString}
          links={links}
          highlighter={highlighter}
        />
      );

      expect(matchedPartHighlighted).toEqual(true);
    });

    it("rendered anchor tag container's onClick event will not trigger on anchor click", () => {
      const parentOnClickSpy = vi.fn();

      const { getByRole } = render(
        <div onClick={parentOnClickSpy} role="presentation">
          <LinksRenderer value="www.testLink.com" links={links} />
        </div>
      );

      const link = getByRole("link");
      link.click();
      expect(parentOnClickSpy).not.toHaveBeenCalled();
    });

    it("throws when matcher returns overlapping bounds", () => {
      links.matcher = () => [
        { start: 3, end: 7 },
        { start: 0, end: 6 },
      ];

      expect(
        (): React.ReactNode => renderLinks("Example text", links)
      ).to.throw("matcher returned overlapping matches");

      links.matcher = () => [
        { start: 3, end: 7 },
        { start: 3, end: 7 },
      ];

      expect(
        (): React.ReactNode => renderLinks("Example text", links)
      ).to.throw("matcher returned overlapping matches");
    });
  });

  describe("withLinks", () => {
    it("returns unchanged string when record has no links", () => {
      const stringValue = "some pipe...";

      expect(withLinks(stringValue)).to.equal(stringValue);
    });

    it("returns string wrapped in link when record has links", () => {
      const stringValue = "some pipe...";

      expect(typeof withLinks(stringValue, links)).to.equal(typeof {});
    });

    it("calls highlight callback if provided with no links", () => {
      const testString = "Example text";
      const highlightSpy = vi.fn();

      void withLinks(testString, undefined, highlightSpy);

      expect(highlightSpy).toHaveBeenCalledOnce();
    });
  });

  describe("<LinksRenderer />", () => {
    it("renders string", () => {
      const value = "some value";
      const { getByText } = render(<LinksRenderer value={value} />);
      getByText(value);
    });

    it("opens new window if the link text was found without http schema", () => {
      const { getByRole } = render(
        <LinksRenderer value="www.testLink.com" links={links} />
      );

      const link = getByRole("link", {
        name: "www.testLink.com (opens in new tab)",
      });
      expect(link.getAttribute("href")).toEqual("http://www.testLink.com");
      expect(link.getAttribute("target")).toEqual("_blank");
      expect(link.getAttribute("rel")).toEqual("noreferrer");
    });

    it("opens new window if the link text was found in record with http schema", () => {
      const { getByRole } = render(
        <LinksRenderer value="https://www.testLink.com" links={links} />
      );

      const link = getByRole("link", {
        name: "https://www.testLink.com (opens in new tab)",
      });
      expect(link.getAttribute("href")).toEqual("https://www.testLink.com");
      expect(link.getAttribute("target")).toEqual("_blank");
      expect(link.getAttribute("rel")).toEqual("noreferrer");
    });

    it("does not open new window if there were no url links", () => {
      const { queryByRole } = render(
        <LinksRenderer value="not an url link" links={links} />
      );

      const link = queryByRole("link");
      expect(link).toEqual(null);
    });

    it("sets location href value to value got in the text if it is an email link", () => {
      const { getByRole } = render(
        <LinksRenderer value="someOtherLink@mail.com" links={links} />
      );

      const link = getByRole("link");
      expect(link.getAttribute("href")).toEqual(
        "mailto:someOtherLink@mail.com"
      );
      expect(link.getAttribute("target")).toEqual("_blank");
      expect(link.getAttribute("rel")).toEqual("noreferrer");
    });

    it("opens new window if it is an ProjectWise Explorer link", () => {
      const { getByRole } = render(
        <LinksRenderer
          value="pw://server.bentley.com:datasource-01/Documents/ProjectName"
          links={links}
        />
      );

      const link = getByRole("link");
      expect(link.getAttribute("href")).toEqual(
        "pw:server.bentley.com:datasource-01/Documents/ProjectName"
      );
      expect(link.getAttribute("target")).toEqual("_blank");
      expect(link.getAttribute("rel")).toEqual("noreferrer");
    });
  });
});
