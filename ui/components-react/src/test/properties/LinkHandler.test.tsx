/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { LinkElementsInfo } from "@itwin/appui-abstract";
import { fireEvent, render } from "@testing-library/react";
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

      renderLinks(testString, links, highlightSpy);
      expect(highlightSpy).toHaveBeenCalledOnce();
    });

    it("calls highlight callback for matching part", () => {
      links.matcher = () => [{ start: 0, end: 7 }];
      const testString = "Example text";
      let matchedPartHighlighted = false;
      const highlighter = (text: string) => {
        if (text === testString.substring(0, 7)) matchedPartHighlighted = true;
        return text;
      };

      renderLinks(testString, links, highlighter);

      expect(matchedPartHighlighted).toEqual(true);
    });

    it("rendered anchor tag calls appropriate callback on click", () => {
      const anchor = render(<>{renderLinks("Example text", links)}</>);

      expect(onClickSpy).not.toBeCalled();
      fireEvent.click(
        anchor.container.getElementsByClassName("core-underlined-button")[0]
      );
      expect(onClickSpy).toHaveBeenCalledOnce();
    });

    it("rendered anchor tag container's onClick event will not trigger on anchor click", () => {
      const parentOnClickSpy = vi.fn();

      const anchor = render(
        <div onClick={parentOnClickSpy} role="presentation">
          {renderLinks("Example text", links)}
        </div>
      );

      expect(parentOnClickSpy).not.toBeCalled();
      fireEvent.click(
        anchor.container.getElementsByClassName("core-underlined-button")[0]
      );
      expect(parentOnClickSpy).not.toBeCalled();
    });

    it("returns text split up into anchor tags when text matcher is provided", () => {
      links.matcher = () => [
        { start: 0, end: 2 },
        { start: 4, end: 6 },
        { start: 7, end: 12 },
      ];

      let anchor = render(<>{renderLinks("Example text", links)}</>);

      expect(anchor.container.innerHTML).to.contain(">Ex</");
      expect(anchor.container.innerHTML).to.contain(">am<");
      expect(anchor.container.innerHTML).to.contain(">pl</");
      expect(anchor.container.innerHTML).to.contain(">e<");
      expect(anchor.container.innerHTML).to.contain("> text</");

      links.matcher = () => [{ start: 0, end: 7 }];

      anchor = render(<>{renderLinks("Example text", links)}</>);

      expect(anchor.container.innerHTML).to.contain(">Example</");
      expect(anchor.container.innerHTML).to.contain("> text");
    });

    it("throws when matcher returns overlapping bounds", () => {
      links.matcher = () => [
        { start: 3, end: 7 },
        { start: 0, end: 6 },
      ];

      expect(() => renderLinks("Example text", links)).to.throw(
        "matcher returned overlapping matches"
      );

      links.matcher = () => [
        { start: 3, end: 7 },
        { start: 3, end: 7 },
      ];

      expect(() => renderLinks("Example text", links)).to.throw(
        "matcher returned overlapping matches"
      );
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

      withLinks(testString, undefined, highlightSpy);
      expect(highlightSpy).toHaveBeenCalledOnce();
    });
  });

  describe("<LinksRenderer />", () => {
    it("renders string", () => {
      const value = "some value";
      const { getByText } = render(<LinksRenderer value={value} />);
      getByText(value);
    });
  });
});
