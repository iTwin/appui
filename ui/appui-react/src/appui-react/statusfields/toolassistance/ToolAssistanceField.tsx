/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import { Logger, ProcessDetector } from "@itwin/core-bentley";
import type {
  ToolAssistanceInstruction,
  ToolAssistanceInstructions,
  ToolAssistanceKeyboardInfo,
  ToolAssistanceSection,
} from "@itwin/core-frontend";
import {
  IModelApp,
  ToolAssistanceImage,
  ToolAssistanceInputMethod,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { FillCentered, Icon, UiStateEntry } from "@itwin/core-react";
import { Button, Tabs, ToggleSwitch } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../../UiFramework";
import { CursorPrompt } from "../../cursor/cursorprompt/CursorPrompt";
import type { ToolIconChangedEventArgs } from "../../framework/FrameworkFrontstages";
import type { ToolAssistanceChangedEventArgs } from "../../messages/MessageManager";
import { MessageManager } from "../../messages/MessageManager";
import { UiStateStorageContext } from "../../uistate/useUiStateStorage";
import "./ToolAssistanceField.scss";

import { SvgClose, SvgPin } from "@itwin/itwinui-icons-react";
import { ToolAssistanceDialog } from "../../layout/footer/tool-assistance/Dialog";
import { ToolAssistanceInstruction as NZ_ToolAssistanceInstruction } from "../../layout/footer/tool-assistance/Instruction";
import { ToolAssistanceItem } from "../../layout/footer/tool-assistance/Item";
import { ToolAssistanceSeparator } from "../../layout/footer/tool-assistance/Separator";
import { StatusBarDialog } from "../../statusbar/dialog/Dialog";
import acceptPointIcon from "./accept-point.svg";
import cursorClickIcon from "./cursor-click.svg";
import oneTouchDragIcon from "./gesture-one-finger-drag.svg";
import oneTouchDoubleTapIcon from "./gesture-one-finger-tap-double.svg";
import oneTouchTapIcon from "./gesture-one-finger-tap.svg";
import twoTouchPinchIcon from "./gesture-pinch.svg";
import twoTouchDragIcon from "./gesture-two-finger-drag.svg";
import twoTouchTapIcon from "./gesture-two-finger-tap.svg";
import clickLeftDragIcon from "./mouse-click-left-drag.svg";
import clickLeftIcon from "./mouse-click-left.svg";
import clickRightDragIcon from "./mouse-click-right-drag.svg";
import clickRightIcon from "./mouse-click-right.svg";
import clickMouseWheelDragIcon from "./mouse-click-wheel-drag.svg";
import mouseWheelClickIcon from "./mouse-click-wheel.svg";
import touchCursorDragIcon from "./touch-cursor-pan.svg";
import touchCursorTapIcon from "./touch-cursor-point.svg";
import { StatusBarPopover } from "../../statusbar/popup/StatusBarPopover";
import type { UiStateStorageResult } from "../../uistate/UiStateStorage";
import {
  type UiStateStorage,
  UiStateStorageStatus,
} from "../../uistate/UiStateStorage";
import { LocalStateStorage } from "../../uistate/LocalStateStorage";

// cSpell:ignore cursorprompt

/** Properties of [[ToolAssistanceField]] component.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ToolAssistanceFieldProps extends CommonProps {
  /** Indicates whether to include promptAtCursor Checkbox. Defaults to true. */
  includePromptAtCursor: boolean;
  /** Optional parameter for persistent UI settings. Defaults to UiStateStorageContext.
   */
  uiStateStorage?: UiStateStorage;
  /** Cursor Prompt Timeout period. Defaults to 5000. */
  cursorPromptTimeout: number;
  /** Fade Out the Cursor Prompt when closed. */
  fadeOutCursorPrompt: boolean;
  /** Indicates whether to show promptAtCursor by default. Defaults to false. */
  defaultPromptAtCursor: boolean;
}

/** Default properties of [[ToolAssistanceField]] component.
 * @internal
 */
export type ToolAssistanceFieldDefaultProps = Pick<
  ToolAssistanceFieldProps,
  | "includePromptAtCursor"
  | "uiStateStorage"
  | "cursorPromptTimeout"
  | "fadeOutCursorPrompt"
  | "defaultPromptAtCursor"
>;

/** @internal */
interface ToolAssistanceFieldState {
  instructions: ToolAssistanceInstructions | undefined;
  toolIconSpec: string;
  showPromptAtCursor: boolean;
  includeMouseInstructions: boolean;
  includeTouchInstructions: boolean;
  showMouseTouchTabs: boolean;
  showMouseInstructions: boolean;
  showTouchInstructions: boolean;
  mouseTouchTabIndex: number;
  isPinned: boolean;
  isOpen: boolean;
}

/** Tool Assistance Field React component.
 * @public
 * @note Tool assistance field will only display 30 characters in the status bar. Any additional text will be hidden. The full text will always be shown in the opened popover.
 */
export class ToolAssistanceField extends React.Component<
  ToolAssistanceFieldProps,
  ToolAssistanceFieldState
> {
  /** @internal */
  public static override contextType = UiStateStorageContext;
  /** @internal */
  public declare context: React.ContextType<typeof UiStateStorageContext>;

  private static _toolAssistanceKey = "ToolAssistance";
  private static _showPromptAtCursorKey = "showPromptAtCursor";
  private static _mouseTouchTabIndexKey = "mouseTouchTabIndex";
  // eslint-disable-next-line deprecation/deprecation
  private _showPromptAtCursorSetting: UiStateEntry<boolean>;
  // eslint-disable-next-line deprecation/deprecation
  private _mouseTouchTabIndexSetting: UiStateEntry<number>;
  private _indicator = React.createRef<HTMLButtonElement>();
  private _cursorPrompt: CursorPrompt;
  private _isMounted = false;
  private _uiSettingsStorage: UiStateStorage;

  /** @internal */
  public static readonly defaultProps: ToolAssistanceFieldDefaultProps = {
    includePromptAtCursor: true,
    cursorPromptTimeout: 5000,
    fadeOutCursorPrompt: true,
    defaultPromptAtCursor: false,
  };

  /** @internal */
  constructor(p: ToolAssistanceFieldProps) {
    super(p);

    const mobile = ProcessDetector.isMobileBrowser;

    this.state = {
      instructions: undefined,
      toolIconSpec: "",
      showPromptAtCursor: p.defaultPromptAtCursor,
      includeMouseInstructions: !mobile,
      includeTouchInstructions: true,
      showMouseTouchTabs: false,
      showMouseInstructions: false,
      showTouchInstructions: false,
      mouseTouchTabIndex: 0,
      isPinned: false,
      isOpen: false,
    };

    this._uiSettingsStorage = new LocalStateStorage();
    this._cursorPrompt = new CursorPrompt(
      this.props.cursorPromptTimeout,
      this.props.fadeOutCursorPrompt
    );
    // eslint-disable-next-line deprecation/deprecation
    this._showPromptAtCursorSetting = new UiStateEntry(
      ToolAssistanceField._toolAssistanceKey,
      ToolAssistanceField._showPromptAtCursorKey,
      () => this.state.showPromptAtCursor
    );
    // eslint-disable-next-line deprecation/deprecation
    this._mouseTouchTabIndexSetting = new UiStateEntry(
      ToolAssistanceField._toolAssistanceKey,
      ToolAssistanceField._mouseTouchTabIndexKey,
      () => this.state.mouseTouchTabIndex
    );
  }

  /** @internal */
  public override async componentDidMount() {
    this._isMounted = true;
    MessageManager.onToolAssistanceChangedEvent.addListener(
      this._handleToolAssistanceChangedEvent
    );
    UiFramework.frontstages.onToolIconChangedEvent.addListener(
      this._handleToolIconChangedEvent
    );

    if (this.props.uiStateStorage)
      this._uiSettingsStorage = this.props.uiStateStorage;
    else if (this.context) this._uiSettingsStorage = this.context;

    await this.restoreSettings();
  }

  /** @internal */
  public override componentWillUnmount() {
    this._isMounted = false;
    MessageManager.onToolAssistanceChangedEvent.removeListener(
      this._handleToolAssistanceChangedEvent
    );
    UiFramework.frontstages.onToolIconChangedEvent.removeListener(
      this._handleToolIconChangedEvent
    );
  }

  private async restoreSettings() {
    let getShowPromptAtCursor: Promise<UiStateStorageResult> | undefined;
    if (this.props.includePromptAtCursor) {
      getShowPromptAtCursor = this._showPromptAtCursorSetting.getSetting(
        this._uiSettingsStorage
      );
    }
    const getMouseTouchTabIndex = this._mouseTouchTabIndexSetting.getSetting(
      this._uiSettingsStorage
    );
    const [showPromptAtCursorResult, mouseTouchTabIndexResult] =
      await Promise.all([getShowPromptAtCursor, getMouseTouchTabIndex]);

    if (
      showPromptAtCursorResult !== undefined &&
      showPromptAtCursorResult.status === UiStateStorageStatus.Success
    ) {
      if (this._isMounted)
        this.setState({ showPromptAtCursor: showPromptAtCursorResult.setting });
    }

    if (mouseTouchTabIndexResult.status === UiStateStorageStatus.Success) {
      if (this._isMounted)
        this.setState({ mouseTouchTabIndex: mouseTouchTabIndexResult.setting });
    }
  }

  private _handleToolAssistanceChangedEvent = (
    args: ToolAssistanceChangedEventArgs // eslint-disable-line deprecation/deprecation
  ): void => {
    let showMouseTouchTabs = false;
    let showMouseInstructions = false;
    let showTouchInstructions = false;

    if (args.instructions && args.instructions.sections) {
      const hasMouseInstructions = args.instructions.sections.some(
        (section: ToolAssistanceSection) => {
          return section.instructions.some(
            (instruction: ToolAssistanceInstruction) =>
              this._isMouseInstruction(instruction)
          );
        }
      );
      const hasTouchInstructions = args.instructions.sections.some(
        (section: ToolAssistanceSection) => {
          return section.instructions.some(
            (instruction: ToolAssistanceInstruction) =>
              this._isTouchInstruction(instruction)
          );
        }
      );

      if (
        this.state.includeMouseInstructions &&
        this.state.includeTouchInstructions &&
        hasMouseInstructions &&
        hasTouchInstructions
      ) {
        showMouseTouchTabs = true;
        showMouseInstructions = this.state.mouseTouchTabIndex === 0;
        showTouchInstructions = this.state.mouseTouchTabIndex === 1;
      } else {
        if (this.state.includeMouseInstructions && hasMouseInstructions)
          showMouseInstructions = true;
        else if (this.state.includeTouchInstructions && hasTouchInstructions)
          showTouchInstructions = true;
      }
    }

    if (this._isMounted)
      this.setState(
        {
          instructions: args.instructions,
          showMouseTouchTabs,
          showMouseInstructions,
          showTouchInstructions,
        },
        () => {
          this._showCursorPrompt();
        }
      );
  };

  private _isBothInstruction = (instruction: ToolAssistanceInstruction) => {
    return (
      instruction.inputMethod === undefined ||
      instruction.inputMethod === ToolAssistanceInputMethod.Both
    );
  };

  private _isMouseInstruction = (instruction: ToolAssistanceInstruction) =>
    instruction.inputMethod === ToolAssistanceInputMethod.Mouse;

  private _isTouchInstruction = (instruction: ToolAssistanceInstruction) =>
    instruction.inputMethod === ToolAssistanceInputMethod.Touch;

  private _handleToolIconChangedEvent = (
    args: ToolIconChangedEventArgs // eslint-disable-line deprecation/deprecation
  ): void => {
    if (this._isMounted)
      this.setState({ toolIconSpec: args.iconSpec }, () => {
        this._showCursorPrompt();
      });
  };

  private _showCursorPrompt() {
    if (this.state.showPromptAtCursor && this.state.instructions)
      this._cursorPrompt.display(
        this.state.toolIconSpec,
        this.state.instructions.mainInstruction
      );
  }

  private _sectionHasDisplayableInstructions(
    section: ToolAssistanceSection
  ): boolean {
    const displayableInstructions = this._getDisplayableInstructions(section);
    return displayableInstructions.length > 0;
  }

  private _getDisplayableInstructions(
    section: ToolAssistanceSection
  ): ToolAssistanceInstruction[] {
    const displayableInstructions = section.instructions.filter(
      (instruction: ToolAssistanceInstruction) => {
        return (
          this._isBothInstruction(instruction) ||
          (this.state.showMouseInstructions &&
            this._isMouseInstruction(instruction)) ||
          (this.state.showTouchInstructions &&
            this._isTouchInstruction(instruction))
        );
      }
    );
    return displayableInstructions;
  }

  private _handleMouseTouchTab = async (index: number) => {
    const showMouseInstructions = index === 0;
    const showTouchInstructions = index === 1;

    if (this._isMounted)
      this.setState(
        {
          mouseTouchTabIndex: index,
          showMouseInstructions,
          showTouchInstructions,
        },
        async () => {
          await this._mouseTouchTabIndexSetting.saveSetting(
            this._uiSettingsStorage
          );
        }
      );
  };

  /** @internal */
  public override render(): React.ReactNode {
    const { instructions } = this.state;
    const dialogTitle = IModelApp.toolAdmin.activeTool
      ? IModelApp.toolAdmin.activeTool.flyover
      : UiFramework.translate("toolAssistance.title");
    const mouseLabel = UiFramework.translate("toolAssistance.mouse");
    const touchLabel = UiFramework.translate("toolAssistance.touch");
    let prompt = "";
    let tooltip = "";
    let toolIcon: React.ReactNode;
    let dialogContent: React.ReactNode;

    if (instructions) {
      prompt = instructions.mainInstruction.text;
      // eslint-disable-next-line deprecation/deprecation
      toolIcon = <Icon iconSpec={this.state.toolIconSpec} />;

      let displayableSections: ToolAssistanceSection[] | undefined;
      if (instructions.sections) {
        displayableSections = instructions.sections.filter(
          (section: ToolAssistanceSection) =>
            this._sectionHasDisplayableInstructions(section)
        );
      }

      dialogContent = (
        <div>
          {this.state.showMouseTouchTabs && (
            <Tabs.Wrapper
              type="pill"
              value={String(this.state.mouseTouchTabIndex)}
            >
              <Tabs.TabList className="uifw-toolAssistance-tabs">
                {[mouseLabel, touchLabel].map((label, index) => (
                  <Tabs.Tab
                    key={index}
                    className="uifw-tab"
                    value={String(index)}
                    label={label}
                    onClick={async () => this._handleMouseTouchTab(index)}
                  />
                ))}
              </Tabs.TabList>
            </Tabs.Wrapper>
          )}

          <div className="uifw-toolAssistance-content">
            <NZ_ToolAssistanceInstruction
              key="main"
              image={ToolAssistanceField.getInstructionImage(
                instructions.mainInstruction
              )}
              text={instructions.mainInstruction.text}
              isNew={instructions.mainInstruction.isNew}
            />

            {displayableSections &&
              displayableSections.map(
                (section: ToolAssistanceSection, index1: number) => {
                  return (
                    <React.Fragment key={index1.toString()}>
                      <ToolAssistanceSeparator key={index1.toString()}>
                        {section.label}
                      </ToolAssistanceSeparator>
                      {this._getDisplayableInstructions(section).map(
                        (
                          instruction: ToolAssistanceInstruction,
                          index2: number
                        ) => {
                          return (
                            <NZ_ToolAssistanceInstruction
                              key={`${index1.toString()}-${index2.toString()}`}
                              image={ToolAssistanceField.getInstructionImage(
                                instruction
                              )}
                              text={instruction.text}
                              isNew={instruction.isNew}
                            />
                          );
                        }
                      )}
                    </React.Fragment>
                  );
                }
              )}

            {this.props.includePromptAtCursor && (
              <>
                <ToolAssistanceSeparator key="prompt-sep" />
                <ToolAssistanceItem key="prompt-item">
                  <ToggleSwitch
                    label={UiFramework.translate(
                      "toolAssistance.promptAtCursor"
                    )}
                    labelPosition="right"
                    checked={this.state.showPromptAtCursor}
                    onChange={this._onPromptAtCursorChange}
                  />
                </ToolAssistanceItem>
              </>
            )}
          </div>
        </div>
      );
    }

    if (prompt) tooltip = prompt;

    if (IModelApp.toolAdmin.activeTool)
      tooltip = `${IModelApp.toolAdmin.activeTool.flyover} > ${tooltip}  `;

    if (tooltip) {
      const lineBreak = "\u000d\u000a";
      tooltip = tooltip + lineBreak;
    }

    tooltip += UiFramework.translate("toolAssistance.moreInfo");

    return (
      <StatusBarPopover
        visible={this.state.isOpen}
        onVisibleChange={(visible) => {
          this.setIsOpen(visible);
        }}
        closeOnOutsideClick={!this.state.isPinned}
        content={
          <ToolAssistanceDialog
            buttons={
              <>
                {!this.state.isPinned && (
                  <StatusBarDialog.TitleBarButton
                    onClick={this._handlePinButtonClick}
                    title={UiFramework.translate("toolAssistance.pin")}
                  >
                    <SvgPin />
                  </StatusBarDialog.TitleBarButton>
                )}
                {this.state.isPinned && (
                  <StatusBarDialog.TitleBarButton
                    onClick={this._handleCloseButtonClick}
                    title={UiFramework.translate("dialog.close")}
                  >
                    <SvgClose />
                  </StatusBarDialog.TitleBarButton>
                )}
              </>
            }
            title={dialogTitle}
          >
            {dialogContent}
          </ToolAssistanceDialog>
        }
      >
        <Button
          styleType="borderless"
          startIcon={<>{toolIcon}</>}
          className={classnames(
            "uifw-statusFields-toolAssistance-toolAssistanceField",
            this.props.className
          )}
          title={tooltip}
          style={this.props.style}
          ref={this._indicator}
          labelProps={{ className: "prompt" }}
        >
          {prompt}
          <StatusBarPopover.ExpandIndicator />
        </Button>
      </StatusBarPopover>
    );
  }

  private _onPromptAtCursorChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (this._isMounted)
      this.setState(
        {
          showPromptAtCursor: e.target.checked,
        },
        async () => {
          await this._showPromptAtCursorSetting.saveSetting(
            this._uiSettingsStorage
          );
        }
      );
  };

  private _handlePinButtonClick = () => {
    if (this._isMounted) this.setState({ isPinned: true });
  };

  private _handleCloseButtonClick = () => {
    this.setIsOpen(false);
  };

  private setIsOpen(isOpen: boolean) {
    let newState = {
      isOpen,
    };
    if (!isOpen && this.state.isPinned && this._isMounted) {
      newState = { ...newState, ...{ isPinned: false } };
    }
    this.setState(newState);
  }

  /** @internal */
  public static getInstructionImage(
    instruction: ToolAssistanceInstruction
  ): React.ReactNode {
    let image: React.ReactNode;

    if (
      (typeof instruction.image === "string" ||
        instruction.image !== ToolAssistanceImage.Keyboard) &&
      instruction.keyboardInfo
    ) {
      if (
        instruction.keyboardInfo.keys.length === 1 &&
        !instruction.keyboardInfo.bottomKeys
      ) {
        const key = instruction.keyboardInfo.keys[0];
        const rightImage =
          typeof instruction.image === "string" ? (
            <div className="uifw-toolassistance-icon-medium">
              {/* eslint-disable-next-line deprecation/deprecation */}
              <Icon iconSpec={instruction.image} />
            </div>
          ) : (
            this.getInstructionSvgImage(instruction, true)
          );

        image = (
          // eslint-disable-next-line deprecation/deprecation
          <FillCentered>
            {ToolAssistanceField.getKeyNode(
              key,
              0,
              "uifw-toolassistance-key-modifier"
            )}
            {rightImage}
          </FillCentered>
        );
      } else {
        Logger.logError(
          UiFramework.loggerCategory(this),
          `getInstructionImage: Invalid keyboardInfo provided with image`
        );
      }
    } else if (typeof instruction.image === "string") {
      if (instruction.image.length > 0) {
        const svgSource = getWebComponentSource(instruction.image);
        const className =
          svgSource !== undefined
            ? "uifw-toolassistance-svg"
            : "uifw-toolassistance-icon-large";
        image = (
          <div className={className}>
            {/* eslint-disable-next-line deprecation/deprecation */}
            <Icon iconSpec={svgSource ?? instruction.image} />
          </div>
        );
      }
    } else if (instruction.image === ToolAssistanceImage.Keyboard) {
      if (instruction.keyboardInfo) {
        image = ToolAssistanceField.getInstructionKeyboardImage(
          instruction.keyboardInfo
        );
      } else {
        Logger.logError(
          UiFramework.loggerCategory(this),
          `getInstructionImage: ToolAssistanceImage.Keyboard specified but no keyboardInfo provided`
        );
      }
    } else {
      image = this.getInstructionSvgImage(instruction, false);
    }

    return image;
  }

  private static getInstructionSvgImage(
    instruction: ToolAssistanceInstruction,
    mediumSize: boolean
  ): React.ReactNode {
    let image: React.ReactNode;
    let className = mediumSize
      ? "uifw-toolassistance-svg-medium"
      : "uifw-toolassistance-svg";

    if (
      typeof instruction.image !== "string" &&
      instruction.image !== ToolAssistanceImage.Keyboard
    ) {
      const toolAssistanceImage: ToolAssistanceImage = instruction.image;
      let svgImage = "";

      switch (toolAssistanceImage) {
        case ToolAssistanceImage.AcceptPoint:
          svgImage = acceptPointIcon;
          break;
        case ToolAssistanceImage.CursorClick:
          svgImage = cursorClickIcon;
          break;
        case ToolAssistanceImage.LeftClick:
          svgImage = clickLeftIcon;
          break;
        case ToolAssistanceImage.RightClick:
          svgImage = clickRightIcon;
          break;
        case ToolAssistanceImage.MouseWheel:
          svgImage = mouseWheelClickIcon;
          break;
        case ToolAssistanceImage.LeftClickDrag:
          svgImage = clickLeftDragIcon;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.RightClickDrag:
          svgImage = clickRightDragIcon;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.MouseWheelClickDrag:
          svgImage = clickMouseWheelDragIcon;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.OneTouchTap:
          svgImage = oneTouchTapIcon;
          break;
        case ToolAssistanceImage.OneTouchDoubleTap:
          svgImage = oneTouchDoubleTapIcon;
          break;
        case ToolAssistanceImage.OneTouchDrag:
          svgImage = oneTouchDragIcon;
          break;
        case ToolAssistanceImage.TwoTouchTap:
          svgImage = twoTouchTapIcon;
          break;
        case ToolAssistanceImage.TwoTouchDrag:
          svgImage = twoTouchDragIcon;
          break;
        case ToolAssistanceImage.TwoTouchPinch:
          svgImage = twoTouchPinchIcon;
          break;
        case ToolAssistanceImage.TouchCursorTap:
          svgImage = touchCursorTapIcon;
          break;
        case ToolAssistanceImage.TouchCursorDrag:
          svgImage = touchCursorDragIcon;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
      }

      image = (
        <div className={className}>
          {/* eslint-disable-next-line deprecation/deprecation */}
          {svgImage && <Icon iconSpec={svgImage} />}
        </div>
      );
    }

    return image;
  }

  private static getInstructionKeyboardImage(
    keyboardInfo: ToolAssistanceKeyboardInfo
  ): React.ReactNode {
    let image: React.ReactNode;

    if (keyboardInfo.bottomKeys !== undefined) {
      image = (
        <div className="uifw-toolassistance-key-group">
          <span className="row1">
            {keyboardInfo.keys.map((key: string, index1: number) => {
              return ToolAssistanceField.getKeyNode(
                key,
                index1,
                "uifw-toolassistance-key-small"
              );
            })}
          </span>
          <br />
          <span className="row2">
            {keyboardInfo.bottomKeys.map((key: string, index2: number) => {
              return ToolAssistanceField.getKeyNode(
                key,
                index2,
                "uifw-toolassistance-key-small"
              );
            })}
          </span>
        </div>
      );
    } else if (keyboardInfo.keys.length === 2) {
      image = (
        // eslint-disable-next-line deprecation/deprecation
        <FillCentered>
          {keyboardInfo.keys.map((key: string, index3: number) => {
            let className = "uifw-toolassistance-key-medium";
            if (key.length > 1) className = "uifw-toolassistance-key-modifier";
            return ToolAssistanceField.getKeyNode(key, index3, className);
          })}
        </FillCentered>
      );
    } else if (keyboardInfo.keys[0]) {
      if (keyboardInfo.keys[0].length > 1)
        image = ToolAssistanceField.getKeyNode(
          keyboardInfo.keys[0],
          0,
          "uifw-toolassistance-key-large"
        );
      else image = ToolAssistanceField.getKeyNode(keyboardInfo.keys[0], 0);
    } else {
      Logger.logError(
        UiFramework.loggerCategory(this),
        `ToolAssistanceImage.Keyboard specified but ToolAssistanceKeyboardInfo not valid`
      );
    }

    return image;
  }

  private static getKeyNode(
    key: string,
    index: number,
    className?: string
  ): React.ReactNode {
    return (
      <div
        key={index.toString()}
        className={classnames("uifw-toolassistance-key", className)}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <FillCentered>{key}</FillCentered>
      </div>
    );
  }
}

function getWebComponentSource(iconSpec: string): string | undefined {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }

  return undefined;
}
