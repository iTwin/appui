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
import type { ListenerType } from "@itwin/core-react/internal";
import { FillCentered, Icon, UiStateEntry } from "@itwin/core-react";
import { Button, Tabs, ToggleSwitch } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../../UiFramework.js";
import { CursorPrompt } from "../../cursor/cursorprompt/CursorPrompt.js";
import { MessageManager } from "../../messages/MessageManager.js";
import { UiStateStorageContext } from "../../uistate/useUiStateStorage.js";
import "./ToolAssistanceField.scss";

import { SvgClose, SvgPin } from "@itwin/itwinui-icons-react";
import { ToolAssistanceDialog } from "../../layout/footer/tool-assistance/Dialog.js";
import { ToolAssistanceInstruction as NZ_ToolAssistanceInstruction } from "../../layout/footer/tool-assistance/Instruction.js";
import { ToolAssistanceItem } from "../../layout/footer/tool-assistance/Item.js";
import { ToolAssistanceSeparator } from "../../layout/footer/tool-assistance/Separator.js";
import { StatusBarDialog } from "../../statusbar/dialog/Dialog.js";
import { StatusBarPopover } from "../../statusbar/popup/StatusBarPopover.js";
import type { UiStateStorageResult } from "../../uistate/UiStateStorage.js";
import {
  type UiStateStorage,
  UiStateStorageStatus,
} from "../../uistate/UiStateStorage.js";
import { LocalStateStorage } from "../../uistate/LocalStateStorage.js";
import { SvgAcceptPoint } from "../../icons/SvgAcceptPoint.js";
import { SvgCursorClick } from "../../icons/SvgCursorClick.js";
import { SvgGestureOneFingerDrag } from "../../icons/SvgGestureOneFingerDrag.js";
import { SvgGestureTwoFingerTap } from "../../icons/SvgGestureTwoFingerTap.js";
import { SvgGestureTwoFingerDrag } from "../../icons/SvgGestureTwoFingerDrag.js";
import { SvgGesturePinch } from "../../icons/SvgGesturePinch.js";
import { SvgTouchCursorPoint } from "../../icons/SvgTouchCursorPoint.js";
import { SvgGestureOneFingerTapDouble } from "../../icons/SvgGestureOneFingerTapDouble.js";
import { SvgGestureOneFingerTap } from "../../icons/SvgGestureOneFingerTap.js";
import { SvgTouchCursorPan } from "../../icons/SvgTouchCursorPan.js";
import { SvgMouseClickWheel } from "../../icons/SvgMouseClickWheel.js";
import { SvgMouseClickRight } from "../../icons/SvgMouseClickRight.js";
import { SvgMouseClickLeft } from "../../icons/SvgMouseClickLeft.js";
import { SvgMouseClickLeftDrag } from "../../icons/SvgMouseClickLeftDrag.js";
import { SvgMouseClickRightDrag } from "../../icons/SvgMouseClickRightDrag.js";
import { SvgMouseClickWheelDrag } from "../../icons/SvgMouseClickWheelDrag.js";

/** Properties of [[ToolAssistanceField]] component.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolAssistanceFieldProps extends CommonProps {
  /** Indicates whether to include promptAtCursor Checkbox. Defaults to `true`. */
  includePromptAtCursor: boolean;
  /** Optional parameter for persistent UI settings. Defaults to `UiStateStorageContext`. */
  uiStateStorage?: UiStateStorage;
  /** Cursor prompt timeout period. Defaults to `5000`.
   * @note Specify `Number.POSITIVE_INFINITY` to keep the cursor prompt open indefinitely.
   */
  cursorPromptTimeout: number;
  /** Fade out the cursor prompt when closed. */
  fadeOutCursorPrompt: boolean;
  /** Indicates whether to show promptAtCursor by default. Defaults to `false`. */
  defaultPromptAtCursor: boolean;
  /** When set to `true` will show prompt at cursor only when the content area is hovered. */
  promptAtContent?: boolean;
}

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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _showPromptAtCursorSetting: UiStateEntry<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  private _mouseTouchTabIndexSetting: UiStateEntry<number>;
  private _indicator = React.createRef<HTMLButtonElement>();
  private _cursorPrompt: CursorPrompt;
  private _isMounted = false;
  private _uiSettingsStorage: UiStateStorage;

  public static readonly defaultProps: Pick<
    ToolAssistanceFieldProps,
    | "includePromptAtCursor"
    | "uiStateStorage"
    | "cursorPromptTimeout"
    | "fadeOutCursorPrompt"
    | "defaultPromptAtCursor"
  > = {
    includePromptAtCursor: true,
    cursorPromptTimeout: 5000,
    fadeOutCursorPrompt: true,
    defaultPromptAtCursor: false,
  };

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
    this._cursorPrompt = new CursorPrompt();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._showPromptAtCursorSetting = new UiStateEntry(
      ToolAssistanceField._toolAssistanceKey,
      ToolAssistanceField._showPromptAtCursorKey,
      () => this.state.showPromptAtCursor
    );
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    this._mouseTouchTabIndexSetting = new UiStateEntry(
      ToolAssistanceField._toolAssistanceKey,
      ToolAssistanceField._mouseTouchTabIndexKey,
      () => this.state.mouseTouchTabIndex
    );
  }

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
  public override componentDidUpdate() {
    if (!this.state.showPromptAtCursor)
      this._cursorPrompt.close(this.props.fadeOutCursorPrompt);
  }

  public override componentWillUnmount() {
    this._isMounted = false;
    this._cursorPrompt.close(this.props.fadeOutCursorPrompt);
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

  private _handleToolAssistanceChangedEvent: ListenerType<
    typeof MessageManager.onToolAssistanceChangedEvent
  > = (args) => {
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

  private _handleToolIconChangedEvent: ListenerType<
    typeof UiFramework.frontstages.onToolIconChangedEvent
  > = (args) => {
    if (this._isMounted)
      this.setState(
        {
          toolIconSpec: args.iconSpec,
        },
        () => {
          this._showCursorPrompt();
        }
      );
  };

  private _showCursorPrompt() {
    const instruction = this.state.instructions?.mainInstruction.text;
    if (!this.state.showPromptAtCursor || !instruction) {
      this._cursorPrompt.close(this.props.fadeOutCursorPrompt);
      return;
    }

    this._cursorPrompt.open({
      timeout: this.props.cursorPromptTimeout,
      fadeout: this.props.fadeOutCursorPrompt,
      iconSpec: this.state.toolIconSpec,
      instruction,
      promptAtContent: this.props.promptAtContent ?? false,
    });
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
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
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Icon iconSpec={instruction.image} />
            </div>
          ) : (
            this.getInstructionSvgImage(instruction, true)
          );

        image = (
          // eslint-disable-next-line @typescript-eslint/no-deprecated
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
          UiFramework.loggerCategory("ToolAssistanceField"),
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
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
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
          UiFramework.loggerCategory("ToolAssistanceField"),
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
      let svgImage: React.ReactNode;

      switch (toolAssistanceImage) {
        case ToolAssistanceImage.AcceptPoint:
          svgImage = <SvgAcceptPoint />;
          break;
        case ToolAssistanceImage.CursorClick:
          svgImage = <SvgCursorClick />;
          break;
        case ToolAssistanceImage.LeftClick:
          svgImage = <SvgMouseClickLeft />;
          break;
        case ToolAssistanceImage.RightClick:
          svgImage = <SvgMouseClickRight />;
          break;
        case ToolAssistanceImage.MouseWheel:
          svgImage = <SvgMouseClickWheel />;
          break;
        case ToolAssistanceImage.LeftClickDrag:
          svgImage = <SvgMouseClickLeftDrag />;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.RightClickDrag:
          svgImage = <SvgMouseClickRightDrag />;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.MouseWheelClickDrag:
          svgImage = <SvgMouseClickWheelDrag />;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
        case ToolAssistanceImage.OneTouchTap:
          svgImage = <SvgGestureOneFingerTap />;
          break;
        case ToolAssistanceImage.OneTouchDoubleTap:
          svgImage = <SvgGestureOneFingerTapDouble />;
          break;
        case ToolAssistanceImage.OneTouchDrag:
          svgImage = <SvgGestureOneFingerDrag />;
          break;
        case ToolAssistanceImage.TwoTouchTap:
          svgImage = <SvgGestureTwoFingerTap />;
          break;
        case ToolAssistanceImage.TwoTouchDrag:
          svgImage = <SvgGestureTwoFingerDrag />;
          break;
        case ToolAssistanceImage.TwoTouchPinch:
          svgImage = <SvgGesturePinch />;
          break;
        case ToolAssistanceImage.TouchCursorTap:
          svgImage = <SvgTouchCursorPoint />;
          break;
        case ToolAssistanceImage.TouchCursorDrag:
          svgImage = <SvgTouchCursorPan />;
          className = mediumSize
            ? "uifw-toolassistance-svg-medium-wide"
            : "uifw-toolassistance-svg-wide";
          break;
      }

      image = (
        <div className={className}>
          {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
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
        // eslint-disable-next-line @typescript-eslint/no-deprecated
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
        UiFramework.loggerCategory("ToolAssistanceField"),
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
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
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
