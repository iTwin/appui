/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { fireEvent, render, screen } from "@testing-library/react";
import type { IModelConnection } from "@itwin/core-frontend";
import type { CardInfo, SheetData } from "../../appui-react.js";
import {
  CardContainer,
  SheetCard,
  SheetsModalFrontstage,
  UiFramework,
} from "../../appui-react.js";
import { selectorMatches, userEvent } from "../TestUtils.js";

describe("SheetsModalFrontstage", () => {
  let modal: SheetsModalFrontstage;
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  const connection = moq.Mock.ofType<IModelConnection>();

  describe("SheetModalFrontstage", () => {
    it("constructs correctly", () => {
      modal = new SheetsModalFrontstage(
        new Array<SheetData>({
          name: "Name",
          viewId: "viewId",
        }),
        connection.object,
        0
      );
    });

    it("contains readable content", () => {
      const content = modal.content;
      expect(content).toBeTruthy();
    });

    it("contains app bar content", () => {
      const content = modal.appBarRight;
      expect(content).toBeTruthy();
    });

    it("SheetCard onClick selects the card", async () => {
      modal = new SheetsModalFrontstage(
        new Array<SheetData>({
          name: "Name",
          viewId: "viewId",
        }),
        connection.object,
        0
      );

      const content = modal.content;
      render(content as React.ReactElement<any>);
      const onCardSelected = vi.fn();
      const removeListener =
        CardContainer.onCardSelectedEvent.addListener(onCardSelected);

      await theUserTo.click(screen.getByText("Name"));
      expect(onCardSelected).toHaveBeenCalled();
      removeListener();
    });
  });

  describe("CardContainer React Testing", () => {
    it("search box calls onValueChanged after 250ms delay", async () => {
      vi.useFakeTimers();
      modal = new SheetsModalFrontstage(
        new Array<SheetData>({
          name: "Name",
          viewId: "viewId",
        }),
        connection.object,
        0
      );

      const content = modal.appBarRight;
      const wrapper = render(content as React.ReactElement<any>);
      const onChange = vi.fn();
      const removeListener =
        UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
          onChange
        );
      const input = wrapper.container.querySelector("input");
      expect(input).toBeTruthy();
      fireEvent.change(input!, { target: { value: "search value" } });
      await vi.advanceTimersByTimeAsync(500);
      expect(onChange).toHaveBeenCalled();
      removeListener();
    });
  });

  describe("CardContainer", () => {
    it("renders search results correctly", () => {
      const { rerender } = render(
        <CardContainer
          cards={
            new Array<CardInfo>({
              index: 0,
              label: "",
              iconSpec: "",
              viewId: "",
              isActive: false,
            })
          }
          searchValue={"Test"}
          connection={connection.object}
        />
      );

      expect(screen.queryByText("Test")).toEqual(null);

      rerender(
        <CardContainer
          cards={
            new Array<CardInfo>({
              index: 0,
              label: "Test",
              iconSpec: "",
              viewId: "",
              isActive: false,
            })
          }
          searchValue={""}
          connection={connection.object}
        />
      );

      expect(screen.getByText("Test")).to.exist;

      rerender(
        <CardContainer
          cards={
            new Array<CardInfo>({
              index: 0,
              label: "Test",
              iconSpec: "",
              viewId: "",
              isActive: false,
            })
          }
          searchValue={"Testing"}
          connection={connection.object}
        />
      );

      expect(screen.queryByText("Test")).toEqual(null);

      rerender(
        <CardContainer
          cards={
            new Array<CardInfo>({
              index: 0,
              label: "Testing",
              iconSpec: "",
              viewId: "",
              isActive: false,
            })
          }
          searchValue={"Test"}
          connection={connection.object}
        />
      );

      expect(screen.getByText("Testing")).to.exist;
    });
  });

  describe("SheetCard", () => {
    it("handles card selection", async () => {
      const onClick = vi.fn();
      render(
        <SheetCard
          label="Findable Label"
          iconSpec=""
          onClick={onClick}
          isActive={false}
          index={0}
        />
      );

      await theUserTo.click(screen.getByText("Findable Label"));

      expect(onClick).toHaveBeenCalled();
    });

    it("handles mouse down and leave", async () => {
      render(
        <SheetCard
          label="Findable Label"
          iconSpec=""
          onClick={() => {}}
          isActive={false}
          index={0}
        />
      );

      await theUserTo.pointer({
        target: screen.getByText("Findable Label"),
        keys: "[MouseLeft>]",
      });

      expect(screen.getByText("Findable Label")).to.satisfy(
        selectorMatches("div.is-pressed")
      );
      await theUserTo.unhover(screen.getByText("Findable Label"));

      expect(screen.getByText("Findable Label")).to.not.satisfy(
        selectorMatches("div.is-pressed")
      );
      await theUserTo.hover(screen.getByText("Findable Label"));

      expect(screen.getByText("Findable Label")).to.not.satisfy(
        selectorMatches("div.is-pressed")
      );
      await theUserTo.unhover(screen.getByText("Findable Label"));
    });
  });
});
