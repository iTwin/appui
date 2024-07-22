/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  IModelViewportControl,
  StagePanelLocation,
  StagePanelSection,
  StandardFrontstageProvider,
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
} from "@itwin/appui-react";
import {
  SvgDeveloper,
  SvgLayers,
  SvgPlaceholder,
} from "@itwin/itwinui-icons-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Modal,
  ModalContent,
  Popover,
  Select,
} from "@itwin/itwinui-react";
import { ContextMenuItem, Popup, PopupContextMenu } from "@itwin/core-react";

const stageId = "element-stacking";
export function createElementStackingFrontstage() {
  return new StandardFrontstageProvider({
    id: stageId,
    contentGroupProps: {
      id: "content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "viewport",
          classId: IModelViewportControl,
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
      // Dialog needs to be portalled.
      return Array.from({ length: 2 }).map((_, index) => ({
        id: `${id}:widget${index + 1}`,
        label: `Widget ${index + 1}`,
        content: <ActionButtons />,
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start,
          },
        },
      }));
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
      // TODO: Dialog & Modal are rendered inside the popup (Popover creates a nested `portalContainer`).
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
    <div style={{ minHeight: 400, minWidth: 300, overflow: "hidden" }}>
      <StatusBarDialog.TitleBar title="Actions"></StatusBarDialog.TitleBar>
      <ActionButtons />
    </div>
  );
}

function ActionButtons() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [portalledDialogOpen, setPortalledDialogOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Flex flexDirection="column" alignItems="start" style={{ padding: 5 }}>
      <TestPopupContextMenu />
      <TestPopup />
      {/* TODO: issues with nested popovers/popups. */}
      <Popover content={<ActionButtons />} applyBackground>
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
        Open Dialog
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
        Open Modal
      </Button>
      <Button
        onClick={() => {
          setDialogOpen((prev) => !prev);
        }}
      >
        Dialog
      </Button>
      <TestDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      <Button
        onClick={() => {
          setPortalledDialogOpen((prev) => !prev);
        }}
      >
        Dialog (portalled)
      </Button>
      <TestDialog
        isOpen={portalledDialogOpen}
        onClose={() => setPortalledDialogOpen(false)}
        portal={true}
      />
      <Button
        onClick={() => {
          setModalOpen((prev) => !prev);
        }}
      >
        Modal
      </Button>
      <TestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <TestSelect />
    </Flex>
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
        <ContextMenuItem>
          <Select
            options={Array.from({ length: 10 }).map((_, i) => ({
              label: `Option ${i + 1}`,
              value: i + 1,
            }))}
            value={1}
          />
        </ContextMenuItem>
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

function TestPopup() {
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
        Popup
      </Button>
      {/* eslint-disable-next-line deprecation/deprecation */}
      <Popup
        isOpen={open}
        target={target}
        onOutsideClick={(e) => {
          if (e.target instanceof Node && target?.contains(e.target)) return;
          setOpen(false);
        }}
        style={{ padding: 20 }}
        closeOnNestedPopupOutsideClick={true} // Needed to close this popup when rendered in a nested popup.
      >
        <TestSelect />
      </Popup>
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

function TestSelect() {
  return (
    <Select
      options={Array.from({ length: 10 }).map((_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
      }))}
      value={1}
    />
  );
}
