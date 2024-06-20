/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import * as React from "react";
import { Point } from "@itwin/core-react";
import {
  ComponentExampleCategory,
  ComponentExampleProps,
} from "../frontstages/ComponentExamples";
import {
  AccuDrawDialog,
  AccuDrawWidget,
  BackstageAppButton,
  BasicNavigationWidget,
  Calculator,
  CommandItemDef,
  ConfigurableCreateInfo,
  ConfigurableUiContent,
  ContentControl,
  ContentDialog,
  ContentGroup,
  ContentLayout,
  ContentLayoutDef,
  CursorInformation,
  CursorMenuData,
  CursorPopupContent,
  CursorPopupManager,
  CustomItemDef,
  ElementTooltip,
  ExpandableSection,
  GroupItemDef,
  IModelConnectedViewSelector,
  KeyinEntry,
  KeyinPalettePanel,
  ListItem,
  ListItemType,
  ListPicker,
  ListPickerItem,
  MenuButton,
  MenuItemProps,
  MessageCenterField,
  MessageManager,
  ModelessDialog,
  PositionPopup,
  PositionPopupContent,
  QuantityFormatSettingsPage,
  ReactNotifyMessageDetails,
  SectionsStatusField,
  SplitPane,
  StandardMessageBox,
  StatusBar,
  StatusBarCenterSection,
  StatusBarComposer,
  StatusBarDialog,
  StatusBarIndicator,
  StatusBarLabelIndicator,
  StatusBarLeftSection,
  StatusBarRightSection,
  StatusBarSeparator,
  StatusBarSpaceBetween,
  SyncUiEventDispatcher,
  TileLoadingIndicator,
  ToolAssistanceField,
  Toolbar,
  ToolbarComposer,
  ToolbarHelper,
  ToolbarOrientation,
  ToolbarUsage,
  ToolSettingsGridContainer,
  UiDataProvidedDialog,
  UiFramework,
  UiSettingsPage,
  UnitSystemSelector,
  ViewAttributesStatusField,
} from "@itwin/appui-react";
import {
  IModelApp,
  MessageBoxIconType,
  MessageBoxType,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
  QuantityType,
} from "@itwin/core-frontend";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
  DialogButtonDef,
  DialogButtonType,
  DialogItem,
  DialogItemValue,
  DialogLayoutDataProvider,
  DialogPropertyItem,
  DialogPropertySyncItem,
  PropertyChangeResult,
  PropertyChangeStatus,
  PropertyDescription,
  StandardContentLayouts,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import { ComponentGenerator } from "@itwin/appui-react/lib/esm/appui-react/uiprovider/ComponentGenerator";
import { UnitSystemKey } from "@itwin/core-quantity";
import { Button, DropdownMenu, MenuItem } from "@itwin/itwinui-react";
import { TreeWidgetComponent } from "../widgets/TreeWidget";
import { TimelineComponent } from "@itwin/imodel-components-react";
import { EditorExampleComponent } from "../components/EditorExampleComponent";

class TestContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <div>Test</div>;
  }
}

class TestUiDataProvider extends DialogLayoutDataProvider {
  public currentPageIndex = 0;
  public numberOfPages = 2;
  public static userPropertyName = "username";
  private static _getUserDescription = (): PropertyDescription => {
    return {
      name: TestUiDataProvider.userPropertyName,
      displayLabel: "User",
      typename: StandardTypeNames.String,
    };
  };

  private _userValue: DialogItemValue = { value: "unknown" };
  private get user(): string {
    return this._userValue.value as string;
  }
  private set user(option: string) {
    this._userValue.value = option;
  }

  public static cityPropertyName = "city";
  private static _getCityDescription = (): PropertyDescription => {
    return {
      name: TestUiDataProvider.cityPropertyName,
      displayLabel: "City",
      typename: StandardTypeNames.String,
    };
  };

  private _cityValue: DialogItemValue = { value: "unknown" };
  private get city(): string {
    return this._cityValue.value as string;
  }
  private set city(option: string) {
    this._cityValue.value = option;
  }

  // called to apply a single property value change.
  public override applyUiPropertyChange = (
    updatedValue: DialogPropertySyncItem
  ): void => {
    this.processChangesInUi([updatedValue]);
  };

  /** Called by UI to inform data provider of changes.  */
  public override processChangesInUi(
    properties: DialogPropertyItem[]
  ): PropertyChangeResult {
    if (properties.length > 0) {
      for (const prop of properties) {
        if (prop.propertyName === TestUiDataProvider.userPropertyName) {
          this.user = prop.value.value ? (prop.value.value as string) : "";
          continue;
        } else if (prop.propertyName === TestUiDataProvider.cityPropertyName) {
          this.city = prop.value.value ? (prop.value.value as string) : "";
          continue;
        }
      }
    }

    this.fireDialogButtonsReloadEvent();
    return { status: PropertyChangeStatus.Success };
  }

  /** Used Called by UI to request available properties when UI is manually created. */
  public override supplyDialogItems(): DialogItem[] | undefined {
    const items: DialogItem[] = [];

    items.push({
      value: this._userValue,
      property: TestUiDataProvider._getUserDescription(),
      editorPosition: { rowPriority: 1, columnIndex: 1 },
    });
    if (this.currentPageIndex > 0) {
      items.push({
        value: this._cityValue,
        property: TestUiDataProvider._getCityDescription(),
        editorPosition: { rowPriority: 2, columnIndex: 1 },
      });
    }
    return items;
  }

  public handleNext = () => {
    if (this.currentPageIndex < this.numberOfPages) {
      this.currentPageIndex++;
      this.reloadDialogItems();
    }
  };

  public handlePrevious = () => {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.reloadDialogItems();
    }
  };

  public disableUserInputReplaceDescription(): void {
    const newUserValue: DialogItemValue = { value: "xxx" };
    const syncItem: DialogPropertySyncItem = {
      value: newUserValue,
      propertyName: TestUiDataProvider.userPropertyName,
      isDisabled: true,
      property: TestUiDataProvider._getUserDescription(),
    };
    this.fireSyncPropertiesEvent([syncItem]);
  }

  public disableUserInput(): void {
    const newUserValue: DialogItemValue = { value: "xxx" };
    const syncItem: DialogPropertySyncItem = {
      value: newUserValue,
      propertyName: TestUiDataProvider.userPropertyName,
      isDisabled: true,
    };
    this.fireSyncPropertiesEvent([syncItem]);
  }

  public override supplyButtonData(): DialogButtonDef[] | undefined {
    const buttons: DialogButtonDef[] = [];

    if (this.currentPageIndex > 0 && this.currentPageIndex < this.numberOfPages)
      buttons.push({
        type: DialogButtonType.Previous,
        onClick: this.handlePrevious,
      });

    if (this.currentPageIndex < this.numberOfPages - 1)
      buttons.push({ type: DialogButtonType.Next, onClick: this.handleNext });

    if (this.currentPageIndex === this.numberOfPages - 1) {
      buttons.push({
        type: DialogButtonType.OK,
        onClick: () => {},
        disabled: this.user === "unknown" || this.city === "unknown",
      });
    }

    buttons.push({ type: DialogButtonType.Cancel, onClick: () => {} });
    return buttons;
  }
}

function UnitSystemSelectorFunction() {
  const [activeUnitSystemKey, setActiveUnitSystemKey] =
    React.useState<UnitSystemKey>("metric");
  const handleUnitSystemSelected = React.useCallback(
    async (unitSystem: UnitSystemKey) => {
      if (unitSystem === activeUnitSystemKey) return;
      setActiveUnitSystemKey(unitSystem);
    },
    [activeUnitSystemKey]
  );

  return (
    <UnitSystemSelector
      selectedUnitSystemKey={activeUnitSystemKey}
      onUnitSystemSelected={handleUnitSystemSelected}
      availableUnitSystems={
        new Set<UnitSystemKey>([
          "metric",
          "imperial",
          "usCustomary",
          "usSurvey",
        ])
      }
    />
  );
}

function PositionPopupFunction() {
  const [isOpen, setIsOpen] = React.useState<Boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        Open Position Popup
      </Button>
      {isOpen && (
        <PositionPopup
          itemId="position-popup-example"
          point={{ x: 780, y: 220 }}
        >
          <PositionPopupContent>Position Popup Content</PositionPopupContent>
        </PositionPopup>
      )}
    </>
  );
}

/** Creates a Component Example */
export const createComponentExample = (
  title: string,
  description: string | undefined,
  content: React.ReactNode
): ComponentExampleProps => {
  return { title, description, content };
};

/** Provides Component Examples */
export class ComponentExamplesProvider {
  // static activeIndexValue = 0;

  // public static get activeIndex() : number {
  //   return this.activeIndexValue;
  // }

  // public static set setActiveIndexValue(activeIndex: number) {
  //   this.activeIndexValue = activeIndex;
  // }

  private static get accudrawSample(): ComponentExampleCategory {
    return {
      title: "AccuDraw",
      examples: [
        createComponentExample(
          "AccuDraw Dialog",
          undefined,
          <Button
            onClick={() => {
              UiFramework.dialogs.modeless.open(
                <AccuDrawDialog
                  opened={true}
                  onClose={() => {
                    UiFramework.dialogs.modeless.close("AccuDrawDialog1");
                  }}
                  style={{ zIndex: 15000 }}
                />,
                "AccuDrawDialog1"
              );
            }}
          >
            Open Accudraw Dialog
          </Button>
        ),
        createComponentExample(
          "AccuDraw Widget",
          undefined,
          <AccuDrawWidget></AccuDrawWidget>
        ),
        createComponentExample(
          "Calculator",
          undefined,
          <Calculator></Calculator>
        ),
        createComponentExample(
          "Menu Button",
          undefined,
          <div style={{ position: "relative" }}>
            <MenuButton point={{ x: 0, y: 0 }}>
              <div> Menu Contents </div>
            </MenuButton>
          </div>
        ),
      ],
    };
  }

  private static get backstageSample(): ComponentExampleCategory {
    return {
      title: "Backstage",
      examples: [
        createComponentExample(
          "Backstage",
          undefined,
          <Button
            onClick={() => {
              UiFramework.backstage.toggle();
            }}
          >
            Open Backstage
          </Button>
        ),
      ],
    };
  }

  private static get configurableUiSample(): ComponentExampleCategory {
    return {
      title: "ConfigurableUi",
      examples: [
        createComponentExample(
          "Configurable Ui Content",
          undefined,
          <ConfigurableUiContent style={{ height: 563 }} />
        ),
      ],
    };
  }

  private static get contentViewSample(): ComponentExampleCategory {
    const fourContentGroup: ContentGroup = new ContentGroup({
      id: "contentGroup2",
      layout: StandardContentLayouts.fourQuadrants,
      contents: [
        { id: "one", classId: TestContentControl, applicationData: "data1" },
        { id: "two", classId: TestContentControl, applicationData: "data2" },
        { id: "three", classId: TestContentControl, applicationData: "data3" },
        { id: "four", classId: TestContentControl, applicationData: "data4" },
      ],
    });

    const fourQuadrantsHorizontalLayoutDef: ContentLayoutDef =
      new ContentLayoutDef({
        // Four Views, two stacked on the left, two stacked on the right.
        id: "fourQuadrantsHorizontal",
        horizontalSplit: {
          id: "fourQuadrantsHorizontal",
          percentage: 0.5,
          lock: true,
          minSizeTop: 100,
          minSizeBottom: 100,
          top: {
            verticalSplit: {
              id: "fourQuadrantsTopVertical",
              percentage: 0.5,
              left: 0,
              right: 1,
              lock: true,
              minSizeLeft: 100,
              minSizeRight: 100,
            },
          },
          bottom: {
            verticalSplit: {
              id: "fourQuadrantsBottomVertical",
              percentage: 0.5,
              left: 2,
              right: 3,
              lock: true,
              minSizeLeft: 100,
              minSizeRight: 100,
            },
          },
        },
      });

    return {
      title: "Content",
      examples: [
        createComponentExample(
          "Content Layout",
          undefined,
          <Button
            size={"small"}
            onClick={() => {
              UiFramework.frontstages.openModalFrontstage({
                title: "Content Layout Example",
                content: (
                  <ContentLayout
                    style={{
                      height: "calc(100vh - 80px)",
                      background: "$buic-background-dialog",
                      top: "auto",
                    }}
                    contentLayout={fourQuadrantsHorizontalLayoutDef}
                    contentGroup={fourContentGroup}
                  />
                ),
              });
            }}
          >
            Open Fullscreen
          </Button>
        ),
        createComponentExample(
          "Split Pane",
          undefined,
          <Button
            size={"small"}
            onClick={() => {
              UiFramework.frontstages.openModalFrontstage({
                title: "Split Pane Example",
                content: (
                  <SplitPane
                    className="test-split-pane-fullscreen"
                    pane1ClassName="pane-one-class"
                    pane2ClassName="pane-two-class"
                    resizerStyle={{
                      width: "10px",
                      backgroundColor: "var(--iui-color-border)",
                    }}
                  >
                    <div>Pane One</div>
                    <div>Pane Two</div>
                  </SplitPane>
                ),
              });
            }}
          >
            Open Fullscreen
          </Button>
        ),
      ],
    };
  }

  private static get cursorSample(): ComponentExampleCategory {
    const relativePosition =
      CursorInformation.getRelativePositionFromCursorDirection(
        CursorInformation.cursorDirection
      );
    const menuItems: MenuItemProps[] = [
      { id: "menuItem1", item: { label: "Menu Item 1" } },
      {
        id: "menuItem2",
        label: "Menu Item 2",
        submenu: [
          { id: "submenuItem1", item: { label: "Submenu Item 1" } },
          { id: "submenuItem2", item: { label: "Submenu Item 2" } },
        ],
      },
    ];
    let menuData: CursorMenuData;

    // TODO: Figure out a way to change zIndex of cursor popup without changing styling in package. Without zIndex being set to at least 14000, CursorPopup, appears behind Component Examples frontstage modal
    function openCursorPopup() {
      return CursorPopupManager.open(
        "test",
        <div>This is a Cursor Popup</div>,
        CursorInformation.cursorPosition,
        new Point(0, 0),
        relativePosition
      );
    }

    return {
      title: "Cursor",
      examples: [
        createComponentExample(
          "Cursor Popup Content",
          undefined,
          <CursorPopupContent>Hello world</CursorPopupContent>
        ),
        createComponentExample(
          "Cursor Popup",
          undefined,
          <Button
            onClick={() => {
              openCursorPopup();
            }}
            onBlur={() => {
              CursorPopupManager.close("test", false);
            }}
          >
            Open Cursor Popup
          </Button>
        ),
        createComponentExample(
          "Cursor Popup Menu",
          undefined,
          <Button
            onMouseDown={(e) => {
              menuData = {
                items: menuItems,
                position: { x: e.clientX, y: e.clientY },
              };
            }}
            onClick={() => {
              UiFramework.openCursorMenu(menuData);
            }}
          >
            Open Cursor Popup Menu
          </Button>
        ),
      ],
    };
  }

  private static get dialogSample(): ComponentExampleCategory {
    return {
      title: "Dialog",
      examples: [
        createComponentExample(
          "Content Dialog",
          undefined,
          <Button
            onClick={() => {
              UiFramework.content.dialogs.open(
                <ContentDialog
                  style={{ zIndex: 15000 }}
                  opened={true}
                  title="ContentDialog Title"
                  dialogId="ContentDialog1"
                  buttonCluster={[
                    {
                      type: DialogButtonType.OK,
                      onClick: () => {
                        UiFramework.content.dialogs.close("ContentDialog1");
                      },
                    },
                    {
                      type: DialogButtonType.Cancel,
                      onClick: () => {
                        UiFramework.content.dialogs.close("ContentDialog1");
                      },
                    },
                  ]}
                  onClose={() => {
                    UiFramework.content.dialogs.close("ContentDialog1");
                  }}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </ContentDialog>,
                "ContentDialog1"
              );
            }}
          >
            Open Content Dialog
          </Button>
        ),
        createComponentExample(
          "Standard Message Box",
          undefined,
          <Button
            onClick={() => {
              UiFramework.dialogs.modal.open(
                <StandardMessageBox
                  opened={true}
                  itemId={"StandardMessageBox1"}
                  title="StandardMessageBox Title"
                  iconType={MessageBoxIconType.NoSymbol}
                  messageBoxType={MessageBoxType.OkCancel}
                  onResult={() =>
                    UiFramework.dialogs.modeless.close("StandardMessageBox1")
                  }
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </StandardMessageBox>,
                "StandardMessageBox1"
              );
            }}
          >
            Open Standard Message Box
          </Button>
        ),
        createComponentExample(
          "Modeless Dialog",
          undefined,
          <Button
            onClick={() => {
              UiFramework.dialogs.modeless.open(
                <ModelessDialog
                  opened={true}
                  title="ModelessDialog Title"
                  dialogId={"ModelessDialog1"}
                  onClose={() => {
                    UiFramework.dialogs.modeless.close("ModelessDialog1");
                  }}
                  movable={true}
                >
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </div>
                </ModelessDialog>,
                "ModelessDialog1"
              );
            }}
          >
            Open Modeless Dialog
          </Button>
        ),
        createComponentExample(
          "Ui Data Provided Dialog",
          undefined,
          <Button
            onClick={() => {
              UiFramework.dialogs.modeless.open(
                <UiDataProvidedDialog
                  title="UiDataProvidedDialog Title"
                  id="UiDataProvidedDialog1"
                  movable={true}
                  uiDataProvider={new TestUiDataProvider()}
                  isModal={false}
                  style={{ zIndex: 15000 }}
                />,
                "UiDataProvidedDialog1"
              );
            }}
          >
            Open UiDataProvided Dialog
          </Button>
        ),
      ],
    };
  }

  private static get editorSample(): ComponentExampleCategory {
    return {
      title: "Editor",
      examples: [
        createComponentExample(
          "Editor Example",
          undefined,
          <EditorExampleComponent />
        ),
      ],
    };
  }

  private static get frontstageSample(): ComponentExampleCategory {
    return {
      title: "Frontstage",
      examples: [
        createComponentExample(
          "Modal Frontstage",
          undefined,
          <Button
            onClick={() => {
              UiFramework.frontstages.openModalFrontstage({
                title: "Modal Frontstage Example",
                content: undefined,
              });
            }}
          >
            Open Modal Frontstage
          </Button>
        ),
      ],
    };
  }

  private static get keyboardShortcutSample(): ComponentExampleCategory {
    return {
      title: "KeyboardShortcut",
      examples: [
        createComponentExample(
          "Keyboard Shortcut Menu",
          undefined,
          <Button
            onClick={() => {
              UiFramework.keyboardShortcuts.displayMenu();
            }}
          >
            Open Keyboard Shortcut Menu
          </Button>
        ),
      ],
    };
  }

  private static get notificationSample(): ComponentExampleCategory {
    const pointerMessage: NotifyMessageDetails = new NotifyMessageDetails(
      1,
      "This is the brief message",
      "This is the detailed message",
      OutputMessageType.Pointer
    );
    const details = new NotifyMessageDetails(
      OutputMessagePriority.Error,
      "Input field message.",
      "Detailed input field message.",
      OutputMessageType.InputField
    );

    const htmlMsg = document.createElement("div");
    htmlMsg.innerHTML = "This is a sticky HTML message. A div containing text.";

    return {
      title: "Notification",
      examples: [
        createComponentExample(
          "Element Tooltip",
          undefined,
          <Button
            id={"element-tooltip-button"}
            onClick={(e) => {
              ElementTooltip.showTooltip(
                document.getElementById("element-tooltip-button")!,
                "Testing element tool tip message",
                { x: e.clientX, y: e.clientY }
              );
            }}
          >
            Open Element Tooltip
          </Button>
        ),
        createComponentExample(
          "Input Message Field",
          undefined,
          <Button
            id="input-message-field-button"
            onClick={() => {
              MessageManager.displayInputFieldMessage(
                document.getElementById("input-message-field-button")!,
                details.briefMessage,
                details.detailedMessage,
                details.priority
              );
            }}
          >
            Open Input Message Field
          </Button>
        ),
        createComponentExample(
          "Pointer Message",
          undefined,
          <Button
            id={"pointer-message-button"}
            onClick={(e) => {
              pointerMessage.setPointerTypeDetails(
                document.getElementById("pointer-message-button")!,
                { x: e.clientX, y: e.clientY }
              ),
                MessageManager.outputMessage(pointerMessage);
            }}
            onBlur={() => {
              MessageManager.closeAllMessages();
            }}
          >
            Open Pointer Message
          </Button>
        ),
        createComponentExample(
          "Tool Assistance Field",
          undefined,
          <StatusBar>
            <ToolAssistanceField />
          </StatusBar>
        ),
        createComponentExample(
          "Message Center Field",
          undefined,
          <div>
            <MessageCenterField />
            <DropdownMenu
              menuItems={(close) => [
                <MenuItem
                  key="icons"
                  onClick={() => {
                    MessageManager.clearMessages();
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Success,
                        "success"
                      )
                    );
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Info,
                        "info"
                      )
                    );
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Warning,
                        "warning"
                      )
                    );
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Fatal,
                        "fatal"
                      )
                    );
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Error,
                        "error"
                      )
                    );
                    close();
                  }}
                >
                  ...with severity icons
                </MenuItem>,
                <MenuItem
                  key="overflow"
                  onClick={() => {
                    MessageManager.clearMessages();
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Success,
                        "Long message that is properly cut in multiple elements with enough space to allow correct word wrap."
                      )
                    );
                    MessageManager.addToMessageCenter(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Error,
                        "Long message with breaking url: http://invalid.bentley.com/with/some/long/url/that/will/not/typically/wrap/as/expected/and/cause/layout/issue"
                      )
                    );
                    close();
                  }}
                >
                  ...with overflowing content
                </MenuItem>,
                <MenuItem
                  key="fancy"
                  onClick={() => {
                    MessageManager.clearMessages();
                    IModelApp.notifications.outputMessage(
                      new NotifyMessageDetails(
                        OutputMessagePriority.Info,
                        htmlMsg,
                        "This section however is only a string, which should automatically wraps because I expect it to be too long.",
                        OutputMessageType.Sticky
                      )
                    );
                    MessageManager.outputMessage(
                      new ReactNotifyMessageDetails(
                        OutputMessagePriority.Info,
                        {
                          reactNode: (
                            <div>
                              This is a sticky React message, encapsulated in
                              `div` tags.
                            </div>
                          ),
                        },
                        {
                          reactNode: (
                            <span>
                              This is a detailed React message, encapsulated in
                              `span` tags. It is also very long, so it should
                              wrap.
                            </span>
                          ),
                        },
                        OutputMessageType.Sticky
                      )
                    );
                    close();
                  }}
                >
                  ...with HTML and React messages
                </MenuItem>,
              ]}
            >
              <Button>Fill message center</Button>
            </DropdownMenu>
            <Button
              id="message-center-clear-button"
              onClick={() => {
                MessageManager.clearMessages();
              }}
            >
              Clear message center
            </Button>
          </div>
        ),
      ],
    };
  }

  private static get pickerSample(): ComponentExampleCategory {
    const listItems = new Array<ListItem>();
    const listItem: ListItem = {
      enabled: true,
      type: ListItemType.Item,
      name: "List Item Example",
    };
    listItems.push(listItem);

    const separatorItem: ListItem = {
      enabled: false,
      type: ListItemType.Separator,
    };
    listItems.push(separatorItem);

    const containerItem: ListItem = {
      enabled: true,
      type: ListItemType.Container,
      children: [
        {
          enabled: false,
          type: ListItemType.Item,
          name: "Container Item Example",
        },
      ],
    };
    listItems.push(containerItem);

    const emptyContainerItem: ListItem = {
      enabled: true,
      type: ListItemType.Container,
      children: [],
    };
    listItems.push(emptyContainerItem);

    return {
      title: "Picker",
      examples: [
        createComponentExample(
          "Expandable Section",
          undefined,
          <ExpandableSection title="Expandable Section Title">
            <ListPickerItem
              key="ExpandableSectionListPickerItem1"
              label="Item 1"
              isActive={false}
              isFocused={false}
            />
            <ListPickerItem
              key="ExpandableSectionListPickerItem2"
              label="Item 2"
              isActive={true}
              isFocused={false}
            />
            <ListPickerItem
              key="ExpandableSectionListPickerItem3"
              label="Item 3"
              isActive={false}
              isFocused={true}
            />
            <ListPickerItem
              key="ExpandableSectionListPickerItem4"
              label="Item 4"
              isActive={true}
              isFocused={true}
            />
          </ExpandableSection>
        ),
        createComponentExample(
          "List Picker",
          undefined,
          <div style={{ width: 50 }}>
            <ListPicker
              title={"ListPicker Title"}
              items={listItems}
              setEnabled={() => {}}
            ></ListPicker>
          </div>
        ),
        createComponentExample(
          "List Picker Item",
          undefined,
          <ListPickerItem
            key="ListPickerItem"
            label="List Picker Item Label"
            isActive={true}
            isFocused={false}
          />
        ),
        createComponentExample(
          "View Selector",
          undefined,
          <div style={{ width: 50 }}>
            <IModelConnectedViewSelector />
          </div>
        ),
      ],
    };
  }

  private static get popupSample(): ComponentExampleCategory {
    const keyins: KeyinEntry[] = [
      { value: "test a" },
      { value: "test b" },
      { value: "keyin one" },
      { value: "keyin two" },
    ];

    return {
      title: "Popup",
      examples: [
        createComponentExample(
          "Position Popup",
          undefined,
          <PositionPopupFunction />
        ),
        createComponentExample(
          "Keyin Palette Panel",
          undefined,
          <KeyinPalettePanel keyins={keyins} />
        ),
      ],
    };
  }

  private static get settingsSample(): ComponentExampleCategory {
    return {
      title: "Settings",
      examples: [
        createComponentExample(
          "Unit System Selector",
          undefined,
          <UnitSystemSelectorFunction />
        ),
        createComponentExample(
          "Ui Settings Page",
          undefined,
          <UiSettingsPage />
        ),
        createComponentExample(
          "Quantity Format Settings Page",
          undefined,
          <QuantityFormatSettingsPage
            initialQuantityType={QuantityType.Length}
            availableUnitSystems={
              new Set<UnitSystemKey>([
                "metric",
                "imperial",
                "usCustomary",
                "usSurvey",
              ])
            }
          />
        ),
      ],
    };
  }

  private static get statusBarSample(): ComponentExampleCategory {
    return {
      title: "StatusBar",
      examples: [
        createComponentExample(
          "Status Bar",
          undefined,
          <StatusBarComposer items={[]} />
        ),
        createComponentExample(
          "Tile Loading Indicator",
          undefined,
          <TileLoadingIndicator style={{ opacity: 1, width: "25%" }} />
        ),
        createComponentExample(
          "View Attributes Status Field",
          undefined,
          <ViewAttributesStatusField />
        ),
        createComponentExample(
          "Sections Status Field",
          undefined,
          <SectionsStatusField />
        ),
        createComponentExample(
          "Status Bar Center Section",
          undefined,
          <StatusBar>
            <StatusBarCenterSection>
              Status-Bar-Center-Section
            </StatusBarCenterSection>
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Dialog",
          undefined,
          <StatusBarDialog
            titleBar={<StatusBarDialog.TitleBar title="StatusBarDialogTitle" />}
          >
            <StatusBarDialog.TitleBarButton title="button" onClick={() => {}} />
          </StatusBarDialog>
        ),
        createComponentExample(
          "Status Bar Dialog Title Bar",
          undefined,
          <StatusBarDialog.TitleBar title="Status Bar Dialog Title" />
        ),
        createComponentExample(
          "Status Bar Dialog Title Bar Button",
          undefined,
          <StatusBar>
            <StatusBarDialog.TitleBarButton
              title="Button Title"
              onClick={() => {}}
            />
            <div>Button Label</div>
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Indicator",
          undefined,
          <StatusBar>
            <StatusBarIndicator
              title={"Status Bar Indicator Title"}
              onClick={() => {}}
            >
              <div>Indicator Label</div>
            </StatusBarIndicator>
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Label Indicator",
          undefined,
          <StatusBar>
            <StatusBarLabelIndicator
              iconSpec={"icon-placeholder"}
              title={"Title"}
              label={"Label"}
              onClick={() => {}}
            />
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Left Section",
          undefined,
          <StatusBar>
            <StatusBarLeftSection>Status-Bar-Left-Section</StatusBarLeftSection>
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Right Section",
          undefined,
          <StatusBar>
            <StatusBarRightSection>
              Status-Bar-Right-Section
            </StatusBarRightSection>
          </StatusBar>
        ),
        createComponentExample(
          "Status Bar Separator",
          undefined,
          <StatusBarSeparator />
        ),
        createComponentExample(
          "Status Bar Space Between",
          undefined,
          <StatusBar>
            <StatusBarSpaceBetween>
              Status-Bar-Space-Between
            </StatusBarSpaceBetween>
          </StatusBar>
        ),
      ],
    };
  }

  private static get timelineSample(): ComponentExampleCategory {
    function TestTimeline() {
      const [time, setTime] = React.useState<number>(1000);
      return (
        <>
          <div>
            <Button onClick={() => setTime(1000)}>Set to 1 second</Button>
            <Button onClick={() => setTime(5000)}>Set to 5 seconds</Button>
            <Button onClick={() => setTime(10000)}>Set to 10 seconds</Button>
          </div>
          <TimelineComponent totalDuration={time} initialDuration={time} />
        </>
      );
    }
    return {
      title: "Timeline",
      examples: [
        createComponentExample(
          "Timeline",
          "Timeline component from imodel-components-react",
          <TestTimeline />
        ),
      ],
    };
  }

  private static get toolbarSample(): ComponentExampleCategory {
    const testItemEventId = "test-event";
    const visibleState = { visible: false };
    const testIsHiddenFunc = () => !visibleState.visible;

    const tool1 = new CommandItemDef({
      commandId: "test.tool1",
      label: "Tool_1",
      iconSpec: "icon-placeholder",
      isHidden: true,
    });

    const tool2 = new CommandItemDef({
      commandId: "test.tool2",
      label: "Tool_2",
      iconSpec: "icon-placeholder",
      isHidden: false,
    });

    const tool1a = new CommandItemDef({
      commandId: "test.tool1_a",
      label: "Tool_1",
      iconSpec: "icon-placeholder",
      isDisabled: true,
    });

    const tool2a = new CommandItemDef({
      commandId: "test.tool2_a",
      label: "Tool_2A",
      iconSpec: "icon-placeholder",
      isDisabled: false,
    });

    /**
     * Conditonal[...] instances must not be reused in different object, so we create as many copies of them
     * as toolbars (with the same behavior, to compare).
     * @returns
     */
    function createUniqueConditionalsForGroup() {
      const tool1c = new CommandItemDef({
        commandId: "test.tool1_c",
        label: new ConditionalStringValue(
          () => (visibleState.visible ? "Tool_1C (V)" : "Tool_1C (H)"),
          [testItemEventId]
        ),
        iconSpec: "icon-placeholder",
        isHidden: new ConditionalBooleanValue(testIsHiddenFunc, [
          testItemEventId,
        ]),
      });

      const tool2c = new CommandItemDef({
        commandId: "test.tool2_c",
        label: new ConditionalStringValue(
          () => (visibleState.visible ? "Hide Tool_1C" : "Show Tool_1C"),
          [testItemEventId]
        ),
        iconSpec: new ConditionalStringValue(
          () =>
            visibleState.visible ? "icon-visibility-hide" : "icon-visibility",
          [testItemEventId]
        ),
        execute: () => {
          visibleState.visible = !visibleState.visible;
          SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testItemEventId);
        },
      });

      const groupNested = new GroupItemDef({
        groupId: "test.group.nested",
        label: "Tool_Group_Nested",
        iconSpec: "icon-placeholder",
        items: [tool1c, tool2c],
        itemsInColumn: 4,
      });

      return new GroupItemDef({
        groupId: "test.group",
        label: "Tool_Group",
        iconSpec: "icon-placeholder",
        items: [tool1a, tool2a, groupNested],
        itemsInColumn: 4,
      });
    }

    const custom1 = new CustomItemDef({
      customId: "test.custom",
      iconSpec: "icon-arrow-down",
      label: "Popup Test",
      popupPanelNode: (
        <div style={{ width: "200px", height: "100px" }}>
          <span>hello world!</span>
        </div>
      ),
    });

    return {
      title: "Toolbar",
      examples: [
        createComponentExample(
          "Toolbar Composer",
          undefined,
          <ToolbarComposer
            usage={ToolbarUsage.ContentManipulation}
            orientation={ToolbarOrientation.Horizontal}
            items={ToolbarHelper.createToolbarItemsFromItemDefs([
              tool1,
              tool2,
              createUniqueConditionalsForGroup(),
              custom1,
            ])}
          />
        ),
        createComponentExample(
          "Toolbar",
          "Raw toolbar component",
          <Toolbar
            items={ToolbarHelper.createToolbarItemsFromItemDefs([
              tool1,
              tool2,
              createUniqueConditionalsForGroup(),
              custom1,
            ])}
          />
        ),
        createComponentExample(
          "Toolbar (overflow)",
          "Raw toolbar component wrapped in small div with enableOverflow set to true",
          <div style={{ maxWidth: 50 }}>
            <Toolbar
              enableOverflow={true}
              items={ToolbarHelper.createToolbarItemsFromItemDefs([
                tool1,
                tool2,
                createUniqueConditionalsForGroup(),
                custom1,
              ])}
            />
          </div>
        ),
      ],
    };
  }

  private static get treeSample(): ComponentExampleCategory {
    return {
      title: "Controlled Tree Widget",
      examples: [
        createComponentExample(
          "Controlled Tree Widget",
          undefined,
          <TreeWidgetComponent />
        ),
      ],
    };
  }

  private static get uiProviderSample(): ComponentExampleCategory {
    const testUiLayoutDataProvider = new TestUiDataProvider();
    const componentGenerator = new ComponentGenerator(testUiLayoutDataProvider); // TODO: internal types should not be used in public types

    return {
      title: "UiProvider",
      examples: [
        createComponentExample(
          "Tool Settings Grid Container",
          undefined,
          <ToolSettingsGridContainer
            componentGenerator={componentGenerator as any}
          />
        ),
      ],
    };
  }

  private static get widgetSample(): ComponentExampleCategory {
    return {
      title: "Widget",
      examples: [
        createComponentExample(
          "Backstage App Button",
          undefined,
          <BackstageAppButton />
        ),
        createComponentExample(
          "Basic Navigation Widget",
          undefined,
          <BasicNavigationWidget />
        ),
      ],
    };
  }

  public static get categories(): ComponentExampleCategory[] {
    return [
      ComponentExamplesProvider.accudrawSample,
      ComponentExamplesProvider.backstageSample,
      ComponentExamplesProvider.configurableUiSample,
      ComponentExamplesProvider.contentViewSample,
      ComponentExamplesProvider.cursorSample,
      ComponentExamplesProvider.dialogSample,
      ComponentExamplesProvider.editorSample,
      ComponentExamplesProvider.frontstageSample,
      ComponentExamplesProvider.keyboardShortcutSample,
      ComponentExamplesProvider.notificationSample,
      ComponentExamplesProvider.pickerSample,
      ComponentExamplesProvider.popupSample,
      ComponentExamplesProvider.settingsSample,
      ComponentExamplesProvider.statusBarSample,
      ComponentExamplesProvider.timelineSample,
      ComponentExamplesProvider.toolbarSample,
      ComponentExamplesProvider.treeSample,
      ComponentExamplesProvider.uiProviderSample,
      ComponentExamplesProvider.widgetSample,
    ];
  }
}
