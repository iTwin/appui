/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import * as React from "react";
import * as abstract from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import { IconHelper } from "@itwin/core-react";
import type {
  ToolbarActionItem,
  UiItemsProvider,
  Widget,
} from "../../appui-react";
import {
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react";

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager = abstract.UiItemsManager;
// @ts-ignore Removed in 4.0
const AbstractStagePanelLocation = abstract.StagePanelLocation;

function createStatusBarItem(id: string) {
  return StatusBarItemUtilities.createActionItem(
    id,
    StatusBarSection.Left,
    0,
    "",
    "",
    () => undefined
  );
}

function createBackstageItem(id: string) {
  return BackstageItemUtilities.createActionItem(id, 0, 0, () => undefined, "");
}

function createToolbarItem(id: string, overrides?: Partial<ToolbarActionItem>) {
  return ToolbarItemUtilities.createActionItem(
    id,
    0,
    "",
    "",
    () => undefined,
    overrides
  );
}

function createWidget(id: string, overrides?: Partial<Widget>) {
  return {
    id,
    ...overrides,
  } satisfies Widget;
}

function describeAbstractAdapter(title: string, fn: () => void) {
  for (const useAbstractAdapter of [true, false]) {
    describe(`${title} ${
      useAbstractAdapter ? "(uses abstract adapter)" : "(no abstract adapter)"
    }`, () => {
      beforeEach(() => {
        UiItemsManager.useAbstractAdapter(useAbstractAdapter);
      });

      afterEach(() => {
        UiItemsManager.useAbstractAdapter(true);
      });

      fn();
    });
  }
}

describe("UiItemsManager", () => {
  afterEach(() => {
    UiItemsManager.clearAllProviders();
  });

  it("should register a provider", () => {
    UiItemsManager.register({
      id: "provider1",
    });

    const provider = UiItemsManager.getUiItemsProvider("provider1");
    expect(provider?.id).toEqual("provider1");
  });

  it("should provide status bar items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideStatusBarItems: () => [
        StatusBarItemUtilities.createActionItem(
          "s1",
          StatusBarSection.Center,
          0,
          "",
          "",
          () => {}
        ),
      ],
    });

    const items = UiItemsManager.getStatusBarItems(
      "stage1",
      StageUsage.General
    );
    sinon.assert.match(items, [
      expect.objectContaining({
        id: "s1",
      }),
    ]);
  });

  it("should provide backstage items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideBackstageItems: () => [
        BackstageItemUtilities.createActionItem(
          "b1",
          0,
          0,
          () => {},
          "b1-label"
        ),
        BackstageItemUtilities.createStageLauncher("b2", 0, 0, "b2-label"),
      ],
    });

    const items = UiItemsManager.getBackstageItems();
    sinon.assert.match(items, [
      expect.objectContaining({
        id: "b1",
      }),
      expect.objectContaining({
        id: "b2",
      }),
    ]);
  });

  it("should provide toolbar items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideToolbarItems: () => [{ id: "t1", itemPriority: 0 }],
    });

    const items = UiItemsManager.getToolbarButtonItems(
      "stage1",
      StageUsage.General,
      ToolbarUsage.ViewNavigation,
      ToolbarOrientation.Horizontal
    );
    sinon.assert.match(items, [
      expect.objectContaining({
        id: "t1",
      }),
    ]);
  });

  it("should provide widgets", () => {
    UiItemsManager.register({
      id: "provider1",
      provideWidgets: () => [{ id: "w1" }],
    });

    const widgets = UiItemsManager.getWidgets(
      "stage1",
      StageUsage.General,
      StagePanelLocation.Left
    );
    sinon.assert.match(widgets, [
      expect.objectContaining({
        id: "w1",
      }),
    ]);
  });

  // Validate use-case where appui-react@4.0 is used with appui-abstract@3.7
  describe("AbstractUiItemsManager", () => {
    if (!AbstractUiItemsManager) return;

    it("should register a provider", () => {
      UiItemsManager.register({
        id: "provider1",
      });
      AbstractUiItemsManager.register({
        id: "provider2",
      });

      {
        const provider1 = UiItemsManager.getUiItemsProvider("provider1");
        const provider2 = UiItemsManager.getUiItemsProvider("provider2");
        expect(provider1?.id).toEqual("provider1");
        expect(provider2?.id).toEqual("provider2");
      }
      {
        const provider1 =
          AbstractUiItemsManager.getUiItemsProvider("provider1");
        const provider2 =
          AbstractUiItemsManager.getUiItemsProvider("provider2");
        expect(provider1?.id).toEqual("provider1");
        expect(provider2?.id).toEqual("provider2");
      }
    });

    it("should un-register a provider", () => {
      UiItemsManager.register({
        id: "provider1",
      });
      AbstractUiItemsManager.register({
        id: "provider2",
      });

      UiItemsManager.registeredProviderIds.should.eql([
        "provider1",
        "provider2",
      ]);
      AbstractUiItemsManager.registeredProviderIds.should.eql([
        "provider1",
        "provider2",
      ]);

      UiItemsManager.unregister("provider2");
      AbstractUiItemsManager.unregister("provider1");

      UiItemsManager.registeredProviderIds.should.eql([]);
      AbstractUiItemsManager.registeredProviderIds.should.eql([]);
    });

    it("should emit events", () => {
      const spy = vi.fn();
      const abstractSpy = vi.fn();
      UiItemsManager.onUiProviderRegisteredEvent.addListener(spy);
      AbstractUiItemsManager.onUiProviderRegisteredEvent.addListener(
        abstractSpy
      );

      UiItemsManager.register({
        id: "provider1",
      });
      AbstractUiItemsManager.register({
        id: "provider2",
      });

      sinon.assert.calledTwice(spy);
      sinon.assert.calledTwice(abstractSpy);
    });

    it("should provide status bar items", () => {
      const execute2 = vi.fn();
      const execute4 = vi.fn();
      UiItemsManager.register({
        id: "provider1",
        provideStatusBarItems: () => [
          StatusBarItemUtilities.createCustomItem(
            "s1",
            StatusBarSection.Left,
            0,
            <div className="s1-content" />,
            {
              badge: abstract.BadgeType.New,
            }
          ),
          StatusBarItemUtilities.createActionItem(
            "s2",
            StatusBarSection.Center,
            0,
            "",
            "s2-tooltip",
            execute2,
            {
              icon: <div className="s2-icon" />,
            }
          ),
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideStatusBarItems: () => {
          const internalData = new Map();
          const icon = IconHelper.getIconData(
            <div className="s4-icon" />,
            internalData
          );
          return [
            {
              id: "s3",
              itemPriority: 0,
              section: StatusBarSection.Right,
              isCustom: true,
              reactNode: <div className="s3-content" />,
            },
            {
              id: "s4",
              itemPriority: 0,
              section: StatusBarSection.Right,
              execute: execute4,
              icon,
              internalData,
              badgeType: abstract.BadgeType.TechnicalPreview,
            },
          ];
        },
      });

      {
        const items = UiItemsManager.getStatusBarItems(
          "stage1",
          StageUsage.General
        );
        sinon.assert.match(items[0], {
          id: "s1",
          section: StatusBarSection.Left,
          badge: abstract.BadgeType.New,
          content: {
            props: {
              className: "s1-content",
            },
          },
        });
        sinon.assert.match(items[1], {
          id: "s2",
          section: StatusBarSection.Center,
          execute: execute2,
          icon: {
            props: {
              className: "s2-icon",
            },
          },
        });
        sinon.assert.match(items[2], {
          id: "s3",
          section: StatusBarSection.Right,
          content: {
            props: {
              className: "s3-content",
            },
          },
        });
        sinon.assert.match(items[3], {
          id: "s4",
          section: StatusBarSection.Right,
          badge: abstract.BadgeType.TechnicalPreview,
          execute: execute4,
          icon: {
            props: {
              className: "s4-icon",
            },
          },
        });
      }
      {
        const items = AbstractUiItemsManager.getStatusBarItems(
          "stage1",
          StageUsage.General
        );
        sinon.assert.match(items[0], {
          id: "s1",
          section: StatusBarSection.Left,
          badgeType: abstract.BadgeType.New,
          reactNode: {
            props: {
              className: "s1-content",
            },
          },
        });
        const s2 = items[1];
        // @ts-ignore Possibly 'any'
        assert(!!abstract.isAbstractStatusBarActionItem(s2));
        sinon.assert.match(s2, {
          id: "s2",
          section: StatusBarSection.Center,
          execute: execute2,
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(s2.icon, s2.internalData),
          expectIconSpec({
            className: "s2-icon",
          })
        );
        sinon.assert.match(items[2], {
          id: "s3",
          section: StatusBarSection.Right,
          reactNode: {
            props: {
              className: "s3-content",
            },
          },
        });
        const s4 = items[3];
        // @ts-ignore Possibly 'any'
        assert(!!abstract.isAbstractStatusBarActionItem(s4));
        sinon.assert.match(s4, {
          id: "s4",
          section: StatusBarSection.Right,
          badgeType: abstract.BadgeType.TechnicalPreview,
          execute: execute4,
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(s4.icon, s4.internalData),
          expectIconSpec({
            className: "s4-icon",
          })
        );
      }
    });

    it("should provide backstage items", () => {
      const execute = vi.fn();
      UiItemsManager.register({
        id: "provider1",
        provideBackstageItems: () => [
          BackstageItemUtilities.createActionItem(
            "b1",
            0,
            0,
            execute,
            "b1-label",
            undefined,
            undefined,
            {
              icon: <div className="b1-icon" />,
              badge: abstract.BadgeType.New,
            }
          ),
          BackstageItemUtilities.createStageLauncher("b2", 0, 0, "b2-label"),
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideBackstageItems: () => {
          const internalData = new Map();
          const icon = IconHelper.getIconData(
            <div className="b4-icon" />,
            internalData
          );
          return [
            // @ts-ignore Possibly 'any'
            abstract.BackstageItemUtilities.createActionItem(
              "b3",
              0,
              0,
              execute,
              "b3-label"
            ),
            // @ts-ignore Possibly 'any'
            abstract.BackstageItemUtilities.createStageLauncher(
              "b4",
              0,
              0,
              "b4-label",
              undefined,
              undefined,
              {
                icon,
                internalData,
                badgeType: abstract.BadgeType.TechnicalPreview,
              }
            ),
          ];
        },
      });

      {
        const items = UiItemsManager.getBackstageItems();
        sinon.assert.match(items[0], {
          id: "b1",
          label: "b1-label",
          execute,
          badge: abstract.BadgeType.New,
        });
        sinon.assert.match(items[1], {
          id: "b2",
          stageId: "b2",
        });
        sinon.assert.match(items[2], {
          id: "b3",
          label: "b3-label",
        });
        sinon.assert.match(items[3], {
          id: "b4",
          badge: abstract.BadgeType.TechnicalPreview,
          icon: {
            props: {
              className: "b4-icon",
            },
          },
        });
      }
      {
        const items = AbstractUiItemsManager.getBackstageItems();
        sinon.assert.match(items[0], {
          id: "b1",
          label: "b1-label",
          execute,
          badgeType: abstract.BadgeType.New,
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(items[0].icon, items[0].internalData),
          expectIconSpec({
            className: "b1-icon",
          })
        );
        sinon.assert.match(items[1], {
          id: "b2",
          stageId: "b2",
        });
        sinon.assert.match(items[2], {
          id: "b3",
          label: "b3-label",
        });
        sinon.assert.match(items[3], {
          id: "b4",
          badgeType: abstract.BadgeType.TechnicalPreview,
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(items[3].icon, items[3].internalData),
          expectIconSpec({
            className: "b4-icon",
          })
        );
      }
    });

    it("should provide toolbar items", () => {
      const execute1 = vi.fn();
      const execute3 = vi.fn();
      UiItemsManager.register({
        id: "provider1",
        provideToolbarItems: () => [
          ToolbarItemUtilities.createActionItem(
            "t1",
            0,
            <div className="t1-icon" />,
            "t1-label",
            execute1,
            {
              badge: abstract.BadgeType.New,
              parentGroupItemId: "p1",
            }
          ),
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideToolbarButtonItems: () => {
          const internalData = new Map();
          const icon = IconHelper.getIconData(
            <div className="t3-icon" />,
            internalData
          );
          return [
            {
              id: "t2",
              itemPriority: 0,
              isCustom: true,
              badgeType: abstract.BadgeType.TechnicalPreview,
            },
            {
              id: "t3",
              itemPriority: 0,
              execute: execute3,
              label: "t3-label",
              icon,
              internalData,
              parentToolGroupId: "p2",
            },
          ];
        },
      });

      {
        const items = UiItemsManager.getToolbarButtonItems(
          "stage1",
          StageUsage.General,
          ToolbarUsage.ViewNavigation,
          ToolbarOrientation.Horizontal
        );
        sinon.assert.match(items[0], {
          id: "t1",
          badge: abstract.BadgeType.New,
          label: "t1-label",
          execute: execute1,
          parentGroupItemId: "p1",
          icon: {
            props: {
              className: "t1-icon",
            },
          },
        });
        sinon.assert.match(items[1], {
          id: "t2",
          badge: abstract.BadgeType.TechnicalPreview,
        });
        sinon.assert.match(items[2], {
          id: "t3",
          execute: execute3,
          parentGroupItemId: "p2",
          label: "t3-label",
          icon: {
            props: {
              className: "t3-icon",
            },
          },
        });
      }
      {
        const items = AbstractUiItemsManager.getToolbarButtonItems(
          "stage1",
          StageUsage.General,
          ToolbarUsage.ViewNavigation,
          ToolbarOrientation.Horizontal
        );
        sinon.assert.match(items[0], {
          id: "t1",
          badgeType: abstract.BadgeType.New,
          label: "t1-label",
          execute: execute1,
          parentToolGroupId: "p1",
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(items[0].icon, items[0].internalData),
          expectIconSpec({
            className: "t1-icon",
          })
        );
        sinon.assert.match(items[1], {
          id: "t2",
          badgeType: abstract.BadgeType.TechnicalPreview,
        });
        sinon.assert.match(items[2], {
          id: "t3",
          execute: execute3,
          parentToolGroupId: "p2",
          label: "t3-label",
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(items[2].icon, items[2].internalData),
          expectIconSpec({
            className: "t3-icon",
          })
        );
      }
    });

    it("should provide widgets", () => {
      UiItemsManager.register({
        id: "provider1",
        provideWidgets: () => [
          {
            id: "w1",
            allowedPanels: [StagePanelLocation.Left],
            badge: abstract.BadgeType.New,
            canFloat: {
              isResizable: true,
            },
            icon: <div className="w1-icon" />,
            content: <div className="w1-content" />,
          },
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideWidgets: () => {
          const internalData = new Map();
          const icon = IconHelper.getIconData(
            <div className="w2-icon" />,
            internalData
          );
          return [
            {
              id: "w2",
              allowedPanelTargets: ["right"],
              badgeType: abstract.BadgeType.TechnicalPreview,
              isFloatingStateWindowResizable: true,
              canFloat: true,
              icon,
              internalData,
              getWidgetContent: () => <div className="w2-content" />,
            },
          ];
        },
      });
      {
        const widgets = UiItemsManager.getWidgets(
          "stage1",
          StageUsage.General,
          StagePanelLocation.Left
        );
        sinon.assert.match(widgets[0], {
          id: "w1",
          badge: abstract.BadgeType.New,
          allowedPanels: [StagePanelLocation.Left],
          content: {
            props: {
              className: "w1-content",
            },
          },
          icon: {
            props: {
              className: "w1-icon",
            },
          },
        });
        sinon.assert.match(widgets[1], {
          id: "w2",
          badge: abstract.BadgeType.TechnicalPreview,
          allowedPanels: [StagePanelLocation.Right],
          content: {
            props: {
              className: "w2-content",
            },
          },
          icon: {
            props: {
              className: "w2-icon",
            },
          },
        });
      }
      {
        const widgets = AbstractUiItemsManager.getWidgets(
          "stage1",
          StageUsage.General,
          StagePanelLocation.Left
        );
        sinon.assert.match(widgets[0], {
          id: "w1",
          badgeType: abstract.BadgeType.New,
          allowedPanelTargets: ["left"],
        });
        sinon.assert.match(widgets[0].getWidgetContent(), {
          props: {
            className: "w1-content",
          },
        });
        sinon.assert.match(widgets[0].getWidgetContent(), {
          props: {
            className: "w1-content",
          },
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(widgets[0].icon, widgets[0].internalData),
          expectIconSpec({
            className: "w1-icon",
          })
        );
        sinon.assert.match(widgets[1], {
          id: "w2",
          badgeType: abstract.BadgeType.TechnicalPreview,
          allowedPanelTargets: ["right"],
        });
        sinon.assert.match(widgets[1].getWidgetContent(), {
          props: {
            className: "w2-content",
          },
        });
        sinon.assert.match(
          IconHelper.getIconReactNode(widgets[1].icon, widgets[1].internalData),
          expectIconSpec({
            className: "w2-icon",
          })
        );
      }
    });

    it("should provide TopMost widgets", () => {
      AbstractUiItemsManager.register({
        id: "provider1",
        // @ts-ignore Possibly 'any'
        provideWidgets: (_stageId, _stageUsage, location) => {
          if (location === AbstractStagePanelLocation.Top) {
            return [
              {
                id: "w1",
                getWidgetContent: () => null,
              },
            ];
          }
          if (location === AbstractStagePanelLocation.TopMost) {
            return [
              {
                id: "w2",
                getWidgetContent: () => null,
              },
            ];
          }
          return [];
        },
      });
      {
        const widgets = UiItemsManager.getWidgets(
          "stage1",
          StageUsage.General,
          StagePanelLocation.Top
        );
        sinon.assert.match(widgets, [
          expect.objectContaining({ id: "w1" }),
          expect.objectContaining({ id: "w2" }),
        ]);
      }
      {
        const widgets = AbstractUiItemsManager.getWidgets(
          "stage1",
          StageUsage.General,
          AbstractStagePanelLocation.Top
        );
        sinon.assert.match(widgets, [sinon.match({ id: "w1" })]);
        const topMostWidgets = AbstractUiItemsManager.getWidgets(
          "stage1",
          StageUsage.General,
          AbstractStagePanelLocation.TopMost
        );
        sinon.assert.match(topMostWidgets, [sinon.match({ id: "w2" })]);
      }
    });
  });

  describe("UiItemsProvider v2", () => {
    describeAbstractAdapter("toolbar items", () => {
      const provider = {
        id: "provider1",
        getToolbarItems: () => {
          return [
            createToolbarItem("item1", {
              layouts: {
                standard: {
                  usage: ToolbarUsage.ContentManipulation,
                  orientation: ToolbarOrientation.Horizontal,
                },
              },
            }),
          ];
        },
      } satisfies UiItemsProvider;

      it("should provide", () => {
        UiItemsManager.register(provider);

        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(1);
      });

      it("should not provide w/o location/usage", () => {
        UiItemsManager.register({
          id: "provider1",
          getToolbarItems: () => [createToolbarItem("item1")],
        });

        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(0);
      });

      it("should not provide for different location/usage", () => {
        UiItemsManager.register(provider);

        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Vertical
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ViewNavigation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(0);
      });

      it("should prefer `getToolbarItems` of a provider", () => {
        UiItemsManager.register({
          ...provider,
          provideToolbarItems: () => [createToolbarItem("item2")],
        });

        const items = UiItemsManager.getToolbarButtonItems(
          "stage1",
          StageUsage.General,
          ToolbarUsage.ContentManipulation,
          ToolbarOrientation.Horizontal
        );
        expect(items).lengthOf(1);
        expect(items[0].id).toEqual("item1");
      });

      it("should only provide for specified stage ids", () => {
        UiItemsManager.register(provider, { stageIds: ["stage2"] });

        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage2",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(1);
      });

      it("should only provide for specified stage usages", () => {
        UiItemsManager.register(provider, { stageUsages: ["custom"] });

        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getToolbarButtonItems(
            "stage1",
            "custom",
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          )
        ).lengthOf(1);
      });
    });

    describeAbstractAdapter("status bar items", () => {
      const provider = {
        id: "provider1",
        getStatusBarItems: () => {
          return [createStatusBarItem("item1")];
        },
      } satisfies UiItemsProvider;

      it("should provide", () => {
        UiItemsManager.register(provider);

        expect(
          UiItemsManager.getStatusBarItems("stage1", StageUsage.General)
        ).lengthOf(1);
      });

      it("should prefer `getStatusBarItems` of a provider", () => {
        UiItemsManager.register({
          ...provider,
          provideStatusBarItems: () => [createStatusBarItem("item2")],
        });

        const items = UiItemsManager.getStatusBarItems(
          "stage1",
          StageUsage.General
        );
        expect(items).lengthOf(1);
        expect(items[0].id).toEqual("item1");
      });

      it("should only provide for specified stage ids", () => {
        UiItemsManager.register(provider, { stageIds: ["stage2"] });

        expect(
          UiItemsManager.getStatusBarItems("stage1", StageUsage.General)
        ).lengthOf(0);
        expect(
          UiItemsManager.getStatusBarItems("stage2", StageUsage.General)
        ).lengthOf(1);
      });

      it("should only provide for specified stage usages", () => {
        UiItemsManager.register(provider, { stageUsages: ["custom"] });

        expect(
          UiItemsManager.getStatusBarItems("stage1", StageUsage.General)
        ).lengthOf(0);
        expect(UiItemsManager.getStatusBarItems("stage1", "custom")).lengthOf(
          1
        );
      });
    });

    describeAbstractAdapter("backstage items", () => {
      const provider = {
        id: "provider1",
        getBackstageItems: () => {
          return [createBackstageItem("item1")];
        },
      } satisfies UiItemsProvider;

      it("should provide", () => {
        UiItemsManager.register(provider);

        expect(UiItemsManager.getBackstageItems()).lengthOf(1);
      });

      it("should prefer `getBackstageItems` of a provider", () => {
        UiItemsManager.register({
          ...provider,
          provideBackstageItems: () => [createBackstageItem("item2")],
        });

        const items = UiItemsManager.getBackstageItems();
        expect(items).lengthOf(1);
        expect(items[0].id).toEqual("item1");
      });
    });

    describeAbstractAdapter("widgets", () => {
      const provider = {
        id: "provider1",
        getWidgets: () => {
          return [
            createWidget("item1", {
              layouts: {
                standard: {
                  location: StagePanelLocation.Bottom,
                  section: StagePanelSection.End,
                },
              },
            }),
          ];
        },
      } satisfies UiItemsProvider;

      it("should provide", () => {
        UiItemsManager.register(provider);

        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Bottom,
            StagePanelSection.End
          )
        ).lengthOf(1);
      });

      it("should not provide w/o location", () => {
        UiItemsManager.register({
          id: "provider1",
          getWidgets: () => [createWidget("w1")],
        });

        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Left,
            StagePanelSection.Start
          )
        ).lengthOf(0);
      });

      it("should not provide for different location/section", () => {
        UiItemsManager.register(provider);

        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Top,
            StagePanelSection.End
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Top,
            StagePanelSection.Start
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Bottom,
            StagePanelSection.Start
          )
        ).lengthOf(0);
      });

      it("should only provide for specified stage ids", () => {
        UiItemsManager.register(provider, { stageIds: ["stage2"] });

        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Bottom,
            StagePanelSection.End
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getWidgets(
            "stage2",
            StageUsage.General,
            StagePanelLocation.Bottom,
            StagePanelSection.End
          )
        ).lengthOf(1);
      });

      it("should only provide for specified stage usages", () => {
        UiItemsManager.register(provider, { stageUsages: ["custom"] });

        expect(
          UiItemsManager.getWidgets(
            "stage1",
            StageUsage.General,
            StagePanelLocation.Bottom,
            StagePanelSection.End
          )
        ).lengthOf(0);
        expect(
          UiItemsManager.getWidgets(
            "stage1",
            "custom",
            StagePanelLocation.Bottom,
            StagePanelSection.End
          )
        ).lengthOf(1);
      });
    });
  });
});

function expectIconSpec(props: Object) {
  return {
    props: {
      iconSpec: {
        props,
      },
    },
  };
}
