/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StatusBar,
  StatusBarDialog,
  StatusBarItemUtilities,
  StatusBarPopover,
  StatusBarSection,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import {
  SvgDeveloper,
  SvgLayers,
  SvgPlaceholder,
} from "@itwin/itwinui-icons-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { ViewportContent } from "@itwin/appui-test-providers";
import {
  Button,
  Dialog,
  IconButton,
  Modal,
  ModalContent,
  Popover,
} from "@itwin/itwinui-react";
import { ContextMenuItem, PopupContextMenu } from "@itwin/core-react";

const stageId = "element-stacking";
export function createElementStackingFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    usage: "development",
    cornerButton: <BackstageAppButton />,
  });
}

export function createElementStackingProvider() {
  const id = "element-stacking-provider";
  return {
    id,
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher(
        stageId,
        300,
        40,
        "Element Stacking",
        undefined,
        <SvgLayers />
      ),
    ],
    getWidgets: () => {
      return [
        {
          id: `${id}:widget1`,
          label: "Widget 1",
          content: <>Widget 1 content</>,
          layouts: {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start,
            },
          },
          defaultState: WidgetState.Floating,
        },
      ];
    },
    getToolbarItems: () => [
      ToolbarItemUtilities.createGroupItem(
        "group",
        0,
        <SvgPlaceholder />,
        "Group",
        [
          ToolbarItemUtilities.createActionItem(
            "action",
            0,
            <SvgPlaceholder />,
            "Action",
            () => {}
          ),
        ],
        {
          layouts: {
            standard: {
              orientation: ToolbarOrientation.Horizontal,
              usage: ToolbarUsage.ContentManipulation,
            },
          },
        }
      ),
    ],
    getStatusBarItems: () => [
      StatusBarItemUtilities.createCustomItem(
        "deprecated",
        StatusBarSection.Center,
        0,
        <DeprecatedTestStatusBarItem />
      ),
      StatusBarItemUtilities.createCustomItem(
        "custom",
        StatusBarSection.Center,
        0,
        <TestStatusBarItem />
      ),
    ],
  } satisfies UiItemsProvider;
}

function DeprecatedTestStatusBarItem() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLDivElement | undefined>(
    undefined
  );
  return (
    <>
      {/* eslint-disable-next-line deprecation/deprecation */}
      <StatusBar.Field
        ref={(el) => setTarget(el ?? undefined)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconButton styleType="borderless" label="Deprecated status bar field">
          <SvgPlaceholder />
          <StatusBarPopover.ExpandIndicator />
        </IconButton>
        {/* eslint-disable-next-line deprecation/deprecation */}
      </StatusBar.Field>
      {/* eslint-disable-next-line deprecation/deprecation */}
      <StatusBar.Popup
        target={target}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <StatusBarItemContent />
        {/* eslint-disable-next-line deprecation/deprecation */}
      </StatusBar.Popup>
    </>
  );
}

function TestStatusBarItem() {
  const [visible, setVisible] = React.useState(false);
  return (
    <StatusBarPopover
      content={<StatusBarItemContent />}
      visible={visible}
      onVisibleChange={(v) => {
        setVisible(v);
      }}
    >
      <IconButton styleType="borderless" label="Status bar popover">
        <SvgDeveloper />
        <StatusBarPopover.ExpandIndicator />
      </IconButton>
    </StatusBarPopover>
  );
}

function StatusBarItemContent() {
  return (
    <div style={{ height: 400, width: 300, overflow: "hidden" }}>
      <StatusBarDialog.TitleBar title="Custom item"></StatusBarDialog.TitleBar>
      <TestPopupContextMenu />
      <Popover
        content={
          <div
            style={{
              minWidth: 200,
            }}
          >
            Nested Popover
          </div>
        }
        applyBackground
      >
        <Button>Popover</Button>
      </Popover>
      <Button
        onClick={() => {
          UiFramework.dialogs.modal.open(
            <TestDialog
              onClose={() => {
                UiFramework.dialogs.modal.close();
              }}
              portal={true}
            />
          );
        }}
      >
        open Dialog
      </Button>
      <Button
        onClick={() => {
          UiFramework.dialogs.modal.open(
            <TestModal
              onClose={() => {
                UiFramework.dialogs.modal.close();
              }}
            />
          );
        }}
      >
        open Modal
      </Button>
    </div>
  );
}

function TestPopupContextMenu() {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLButtonElement | undefined>(
    undefined
  );
  return (
    <>
      <Button
        ref={(e) => setTarget(e ?? undefined)}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        PopupContextMenu
      </Button>
      <PopupContextMenu
        isOpen={open}
        target={target}
        onOutsideClick={(e) => {
          if (e.target instanceof Node && target?.contains(e.target)) return;
          setOpen(false);
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <ContextMenuItem
              key={i}
              onClick={() => {
                setOpen(false);
              }}
            >
              Menu Item {i}
            </ContextMenuItem>
          );
        })}
      </PopupContextMenu>
    </>
  );
}

function TestDialog(props: Partial<React.ComponentProps<typeof Dialog>>) {
  return (
    <Dialog isOpen={true} {...props}>
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText="Dialog" />
        <Dialog.Content>Dialog content</Dialog.Content>
      </Dialog.Main>
    </Dialog>
  );
}

function TestModal(props: Partial<React.ComponentProps<typeof Modal>>) {
  return (
    <Modal title="Modal" isOpen={true} {...props}>
      <ModalContent>Modal content</ModalContent>
    </Modal>
  );
}
