/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { HighlightingEngine } from "../../components-react/tree/HighlightingEngine";
import { selectorMatches } from "../TestUtils";

const simulateNode = (id: string): { id: string; text: string } => {
  return { id, text: id } as any;
};

describe("HighlightingEngine", () => {
  describe("renderNodeLabel", () => {
    it("just returns text if searchText is empty", () => {
      const text = "This is a test";
      const searchText = "";
      expect(HighlightingEngine.renderNodeLabel(text, { searchText })).toEqual(
        text
      );
    });

    it("wraps highlighted word in <mark> tag", () => {
      const text = "This is a test";
      const searchText = "test";
      const { container } = render(
        <>{HighlightingEngine.renderNodeLabel(text, { searchText })}</>
      );
      expect(container.querySelector("mark")).to.exist.have.property(
        "innerHTML",
        "test"
      );
    });

    it('wraps active node <mark class="activeHighlight"> tag', () => {
      const text = "This is a test";
      const searchText = "test";
      const { container } = render(
        <div>
          {HighlightingEngine.renderNodeLabel(text, {
            searchText,
            activeMatchIndex: 0,
          })}
        </div>
      );
      expect(container.querySelector("mark"))
        .to.exist.satisfy(selectorMatches(".components-activehighlight"))
        .have.property("innerHTML", "test");
    });
  });

  describe("createRenderProps", () => {
    it("sets correct searchText", () => {
      const searchText = "test";
      const he = new HighlightingEngine({ searchText });
      expect(he.createRenderProps(simulateNode("id")).searchText).toEqual(
        searchText
      );
    });

    it("sets activeMatchIndex to undefined when node id doesn't match nodeId in activeMatch", () => {
      const searchText = "test";
      const he = new HighlightingEngine({
        searchText,
        activeMatch: { nodeId: "a", matchIndex: 1 },
      });
      expect(he.createRenderProps(simulateNode("b")).activeMatchIndex).toEqual(
        undefined
      );
    });

    it("sets activeResultIndex to correct value when node id matches id in activeMatch", () => {
      const searchText = "test";
      const he = new HighlightingEngine({
        searchText,
        activeMatch: { nodeId: "a", matchIndex: 1 },
      });
      expect(he.createRenderProps(simulateNode("a")).activeMatchIndex).toEqual(
        1
      );
    });
  });
});
