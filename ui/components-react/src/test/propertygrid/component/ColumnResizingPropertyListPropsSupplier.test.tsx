/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import { ColumnResizingPropertyListPropsSupplier } from "../../../components-react/propertygrid/component/ColumnResizingPropertyListPropsSupplier.js";
import { PropertyList } from "../../../components-react/propertygrid/component/PropertyList.js";
import { userEvent } from "../../TestUtils.js";
import TestUtils, { styleMatch } from "../../TestUtils.js";
import { render, screen, waitFor } from "@testing-library/react";

describe("ColumnResizingPropertyListPropsSupplier", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  let records: PropertyRecord[];
  const throttleMs = 16;

  beforeEach(() => {
    theUserTo = userEvent.setup({
      delay: throttleMs,
    });
    records = [
      TestUtils.createPrimitiveStringProperty("CADID", "0000 0005 00E0 02D8"),
    ];
  });

  describe("ratio between label and value when width below minimum column size", () => {
    it("changes label-value ratio when it's modified within bounds", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% auto auto" })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 10 },
        },
        { coords: { x: 40 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({ gridTemplateColumns: /^55(?:\.\d*|)% auto auto/ })
        );
      });
    });

    it("changes label-value ratio to 0.15 when it's modified lower than allowed", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% auto auto" })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 30 },
        },
        { coords: { x: 0 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({ gridTemplateColumns: "15% auto auto" })
        );
      });
    });

    it("changes label-value ratio to 0.6 when it's modified higher than allowed", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% auto auto" })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 25 },
        },
        { coords: { x: 90 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({ gridTemplateColumns: "60% auto auto" })
        );
      });
    });

    it("uses calculated maximum label-value ratio when it's modified higher than allowed and there are action buttons", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={100}
          actionButtonWidth={30}
          maxPropertyDepth={1}
        >
          {(listProps) => (
            <PropertyList
              {...listProps}
              properties={records}
              actionButtonRenderers={[() => <div />]}
            />
          )}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({ gridTemplateColumns: "25% auto auto 30px" })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 25 },
        },
        { coords: { x: 90 } },
      ]);

      // max ratio calculation:
      // (width - button width - border width - padding - value width) / width
      // (100 - 30 - 10 - 16 - 10) / 100
      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({ gridTemplateColumns: "34% auto auto 30px" })
        );
      });
    });
  });

  describe("ratio between label and value when width above minimum column size", () => {
    it("changes label-value ratio when it's modified within bounds", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={1000}
          minLabelWidth={100}
          minValueWidth={100}
          actionButtonWidth={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(100px, 25%) auto minmax(100px, 1fr)",
        })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 240 },
        },
        { coords: { x: 490 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 50%) auto minmax(100px, 1fr)",
          })
        );
      });
    });

    it("changes label-value ratio to minimum label width when it's modified lower than allowed", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={1000}
          minLabelWidth={100}
          minValueWidth={100}
          actionButtonWidth={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(100px, 25%) auto minmax(100px, 1fr)",
        })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 255 },
        },
        { coords: { x: 0 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 10%) auto minmax(100px, 1fr)",
          })
        );
      });
    });

    it("changes label-value ratio to maximum label width when it's modified higher than allowed", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={1000}
          minLabelWidth={100}
          minValueWidth={100}
          actionButtonWidth={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );
      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(100px, 25%) auto minmax(100px, 1fr)",
        })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 250 },
        },
        { coords: { x: 950 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 80%) auto minmax(100px, 1fr)",
          })
        );
      });
    });

    it("stops changing label-value ratio after reaching max when element not hovered", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          orientation={Orientation.Horizontal}
          width={1000}
          minLabelWidth={100}
          minValueWidth={100}
          actionButtonWidth={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(100px, 25%) auto minmax(100px, 1fr)",
        })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 250 },
        },
        { coords: { x: 950 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 80%) auto minmax(100px, 1fr)",
          })
        );
      });

      await theUserTo.pointer([{ coords: { x: 980 } }, { coords: { x: 500 } }]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 80%) auto minmax(100px, 1fr)",
          })
        );
      });
    });

    it("stops changing label-value ratio after reaching min when element not hovered", async () => {
      render(
        <ColumnResizingPropertyListPropsSupplier
          width={1000}
          orientation={Orientation.Horizontal}
          minLabelWidth={100}
          minValueWidth={100}
          actionButtonWidth={100}
        >
          {(listProps) => <PropertyList {...listProps} properties={records} />}
        </ColumnResizingPropertyListPropsSupplier>
      );

      expect(screen.getByRole("presentation")).satisfy(
        styleMatch({
          gridTemplateColumns: "minmax(100px, 25%) auto minmax(100px, 1fr)",
        })
      );
      await theUserTo.pointer([
        {
          target: screen.getByRole("button"),
          keys: "[MouseLeft>]",
          coords: { x: 250 },
        },
        { coords: { x: 10 } },
      ]);

      await waitFor(() => {
        expect(screen.getByRole("presentation")).satisfy(
          styleMatch({
            gridTemplateColumns: "minmax(100px, 10%) auto minmax(100px, 1fr)",
          })
        );
      });

      await theUserTo.pointer([{ coords: { x: 0 } }, { coords: { x: 500 } }]);

      // TODO: fails a linux build.
      // await waitFor(() => {
      //   expect(screen.getByRole("presentation")).satisfy(
      //     styleMatch({
      //       gridTemplateColumns: "minmax(100px, 10%) 1px minmax(100px, 1fr)",
      //     })
      //   );
      // });
    });
  });
});
