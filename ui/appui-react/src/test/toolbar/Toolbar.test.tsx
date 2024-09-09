/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  PreviewFeaturesProvider,
  Toolbar,
  ToolbarItemUtilities,
} from "../../appui-react";
import { childStructure } from "../TestUtils";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { BadgeType } from "@itwin/core-react";

describe("<Toolbar />", () => {
  describe('Old toolbars ("newToolbars" preview feature off)', () => {
    it("should render badge (using old badgeType)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          () => undefined,
          { badge: BadgeType.New }
        ),
        ToolbarItemUtilities.createCustomItem(
          "item2",
          2,
          <SvgPlaceholder />,
          "Item 2",
          undefined,
          { badge: BadgeType.TechnicalPreview }
        ),
      ];

      const renderedComponent = render(<Toolbar items={toolbarItems} />);

      expect(
        renderedComponent.getByRole("button", { name: "Item 1" })
      ).to.satisfy(childStructure(".components-badge .core-badge-newBadge"));
      expect(
        renderedComponent.getByRole("button", { name: "Item 2" })
      ).to.satisfy(
        childStructure(".components-badge .core-badge-technicalPreviewBadge")
      );
    });

    it("should render badge on nested items (using old badgeType)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createGroupItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          [
            ToolbarItemUtilities.createActionItem(
              "item2",
              2,
              <SvgPlaceholder />,
              "Item 2",
              () => undefined,
              { badge: BadgeType.TechnicalPreview }
            ),
          ],
          { badge: BadgeType.New }
        ),
      ];

      const renderedComponent = render(<Toolbar items={toolbarItems} />);

      const groupItem = renderedComponent.getByRole("button", {
        name: "Item 1",
      });
      expect(groupItem).to.satisfy(
        childStructure(".components-badge .core-badge-newBadge")
      );

      fireEvent.click(groupItem);
      expect(screen.getByRole("button", { name: "Item 2" })).to.satisfy(
        childStructure(".components-badge .core-badge-technicalPreviewBadge")
      );
    });

    it("should render badge (using new badgeKind)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          () => undefined,
          { badgeKind: "new" }
        ),
        ToolbarItemUtilities.createCustomItem(
          "item2",
          2,
          <SvgPlaceholder />,
          "Item 2",
          undefined,
          { badgeKind: "technical-preview" }
        ),
        ToolbarItemUtilities.createActionItem(
          "item3",
          3,
          <SvgPlaceholder />,
          "Item 3",
          () => undefined,
          { badgeKind: "deprecated" }
        ),
      ];

      const renderedComponent = render(<Toolbar items={toolbarItems} />);

      expect(
        renderedComponent.getByRole("button", { name: "Item 1" })
      ).to.satisfy(childStructure(".components-badge .core-badge-newBadge"));
      expect(
        renderedComponent.getByRole("button", { name: "Item 2" })
      ).to.satisfy(
        childStructure(".components-badge .core-badge-technicalPreviewBadge")
      );
      expect(
        renderedComponent.getByRole("button", { name: "Item 3" })
      ).to.satisfy(
        childStructure(".components-badge .core-badge-deprecatedBadge")
      );
    });

    it("should render badge on nested items (using new badgeKind)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createGroupItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          [
            ToolbarItemUtilities.createActionItem(
              "item2",
              2,
              <SvgPlaceholder />,
              "Item 2",
              () => undefined,
              { badgeKind: "deprecated" }
            ),
          ],
          { badgeKind: "technical-preview" }
        ),
      ];

      const renderedComponent = render(<Toolbar items={toolbarItems} />);

      const groupItem = renderedComponent.getByRole("button", {
        name: "Item 1",
      });
      expect(groupItem).to.satisfy(
        childStructure(".components-badge .core-badge-technicalPreviewBadge")
      );

      fireEvent.click(groupItem);
      expect(screen.getByRole("button", { name: "Item 2" })).to.satisfy(
        childStructure(".components-badge .core-badge-deprecatedBadge")
      );
    });

    it("should prefer `iconNode` property over `icon`", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          0,
          <>test-icon</>,
          "",
          () => {},
          {
            iconNode: <>test-icon-node</>,
          }
        ),
      ];

      const { getByRole } = render(<Toolbar items={toolbarItems} />);
      getByRole("button", { name: "test-icon-node" });
    });
  });

  describe('New toolbars ("newToolbars" preview feature on)', () => {
    it("should render badge (using old badgeType)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          () => undefined,
          { badge: BadgeType.New }
        ),
        ToolbarItemUtilities.createCustomItem(
          "item2",
          2,
          <SvgPlaceholder />,
          "Item 2",
          undefined,
          { badge: BadgeType.TechnicalPreview }
        ),
      ];

      const renderedComponent = render(
        <PreviewFeaturesProvider features={{ newToolbars: true }}>
          <Toolbar items={toolbarItems} />
        </PreviewFeaturesProvider>
      );

      expect(
        renderedComponent.getByRole("button", { name: "Item 1" })
      ).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-newBadge")
      );
      expect(
        renderedComponent.getByRole("button", { name: "Item 2" })
      ).to.satisfy(
        childStructure(
          ".uifw-toolbar-group-badge .core-badge-technicalPreviewBadge"
        )
      );
    });

    it("should render badge on nested items (using old badgeType)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createGroupItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          [
            ToolbarItemUtilities.createActionItem(
              "item2",
              2,
              <SvgPlaceholder />,
              "Item 2",
              () => undefined,
              { badge: BadgeType.TechnicalPreview }
            ),
          ],
          { badge: BadgeType.New }
        ),
      ];

      const renderedComponent = render(
        <PreviewFeaturesProvider features={{ newToolbars: true }}>
          <Toolbar items={toolbarItems} />
        </PreviewFeaturesProvider>
      );

      const groupItem = renderedComponent.getByRole("button", {
        name: "Item 1",
      });
      expect(groupItem).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-newBadge")
      );

      fireEvent.click(groupItem);
      expect(screen.getByRole("menuitem", { name: "Item 2" })).to.satisfy(
        childStructure(
          ".uifw-toolbar-group-badge .core-badge-technicalPreviewBadge"
        )
      );
    });

    it("should render badge (using new badgeKind)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          () => undefined,
          { badgeKind: "new" }
        ),
        ToolbarItemUtilities.createCustomItem(
          "item2",
          2,
          <SvgPlaceholder />,
          "Item 2",
          undefined,
          { badgeKind: "technical-preview" }
        ),
        ToolbarItemUtilities.createActionItem(
          "item3",
          3,
          <SvgPlaceholder />,
          "Item 3",
          () => undefined,
          { badgeKind: "deprecated" }
        ),
      ];

      const renderedComponent = render(
        <PreviewFeaturesProvider features={{ newToolbars: true }}>
          <Toolbar items={toolbarItems} />
        </PreviewFeaturesProvider>
      );

      expect(
        renderedComponent.getByRole("button", { name: "Item 1" })
      ).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-newBadge")
      );
      expect(
        renderedComponent.getByRole("button", { name: "Item 2" })
      ).to.satisfy(
        childStructure(
          ".uifw-toolbar-group-badge .core-badge-technicalPreviewBadge"
        )
      );
      expect(
        renderedComponent.getByRole("button", { name: "Item 3" })
      ).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-deprecatedBadge")
      );
    });

    it("should render badge on nested items (using new badgeKind)", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createGroupItem(
          "item1",
          1,
          <SvgPlaceholder />,
          "Item 1",
          [
            ToolbarItemUtilities.createActionItem(
              "item2",
              2,
              <SvgPlaceholder />,
              "Item 2",
              () => undefined,
              { badgeKind: "deprecated" }
            ),
          ],
          { badgeKind: "new" }
        ),
      ];

      const renderedComponent = render(
        <PreviewFeaturesProvider features={{ newToolbars: true }}>
          <Toolbar items={toolbarItems} />
        </PreviewFeaturesProvider>
      );

      const groupItem = renderedComponent.getByRole("button", {
        name: "Item 1",
      });
      expect(groupItem).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-newBadge")
      );

      fireEvent.click(groupItem);
      expect(screen.getByRole("menuitem", { name: "Item 2" })).to.satisfy(
        childStructure(".uifw-toolbar-group-badge .core-badge-deprecatedBadge")
      );
    });

    it("should prefer `iconNode` property over `icon`", () => {
      const toolbarItems = [
        ToolbarItemUtilities.createActionItem(
          "item1",
          0,
          <>test-icon</>,
          "",
          () => {},
          {
            iconNode: <>test-icon-node</>,
          }
        ),
      ];

      const { getByText } = render(
        <PreviewFeaturesProvider features={{ newToolbars: true }}>
          <Toolbar items={toolbarItems} />
        </PreviewFeaturesProvider>
      );
      getByText("test-icon-node");
    });
  });
});
