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
  ToolAssistanceImage,
  ToolAssistanceInputMethod,
} from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import { FillCentered, Icon } from "@itwin/core-react";
import { Button, Tabs, ToggleSwitch } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../../UiFramework.js";
import { useCursorPrompt } from "../../cursor/cursorprompt/CursorPrompt.js";
import { MessageManager } from "../../messages/MessageManager.js";
import { UiStateStorageContext } from "../../uistate/useUiStateStorage.js";
import "./ToolAssistanceField.scss";

import {
  SvgAdd,
  SvgClose,
  SvgCursorClick,
  SvgGestureOneFingerDrag,
  SvgGestureOneFingerTap,
  SvgGestureOneFingerTapDouble,
  SvgGesturePinch,
  SvgGestureTwoFingerDrag,
  SvgGestureTwoFingerTap,
  SvgMouseClickLeft,
  SvgMouseClickRight,
  SvgMouseClickWheel,
  SvgPin,
} from "@itwin/itwinui-icons-react";
import { ToolAssistanceDialog } from "../../layout/footer/tool-assistance/Dialog.js";
import { ToolAssistanceInstruction as NZ_ToolAssistanceInstruction } from "../../layout/footer/tool-assistance/Instruction.js";
import { ToolAssistanceItem } from "../../layout/footer/tool-assistance/Item.js";
import { ToolAssistanceSeparator } from "../../layout/footer/tool-assistance/Separator.js";
import { StatusBarDialog } from "../../statusbar/dialog/Dialog.js";
import { StatusBarPopover } from "../../statusbar/popup/StatusBarPopover.js";
import {
  type UiStateStorage,
  UiStateStorageStatus,
} from "../../uistate/UiStateStorage.js";
import { SvgTouchCursorPoint } from "../../icons/SvgTouchCursorPoint.js";
import { SvgTouchCursorPan } from "../../icons/SvgTouchCursorPan.js";
import { SvgMouseClickLeftDrag } from "../../icons/SvgMouseClickLeftDrag.js";
import { SvgMouseClickRightDrag } from "../../icons/SvgMouseClickRightDrag.js";
import { SvgMouseClickWheelDrag } from "../../icons/SvgMouseClickWheelDrag.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import { useActiveTool } from "../../hooks/useActiveTool.js";

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

interface Props
  extends Omit<
      ToolAssistanceFieldProps,
      | "includePromptAtCursor"
      | "cursorPromptTimeout"
      | "fadeOutCursorPrompt"
      | "defaultPromptAtCursor"
    >,
    Partial<
      Pick<
        ToolAssistanceFieldProps,
        | "includePromptAtCursor"
        | "cursorPromptTimeout"
        | "fadeOutCursorPrompt"
        | "defaultPromptAtCursor"
      >
    > {}

interface ToolAssistanceFieldState {
  instructions: ToolAssistanceInstructions | undefined;
  toolIconSpec: string;
  showPromptAtCursor: boolean;
  mouseTouchTabIndex: number;
  isPinned: boolean;
  isOpen: boolean;
}

const toolAssistanceKey = "ToolAssistance";
const showPromptAtCursorKey = "showPromptAtCursor";
const mouseTouchTabIndexKey = "mouseTouchTabIndex";

/** Tool Assistance Field React component.
 * @public
 * @note Tool assistance field will only display 30 characters in the status bar. Any additional text will be hidden. The full text will always be shown in the opened popover.
 */
export function ToolAssistanceField(props: Props) {
  const {
    includePromptAtCursor = true,
    cursorPromptTimeout = 5000,
    fadeOutCursorPrompt = true,
    defaultPromptAtCursor = false,
    uiStateStorage: uiStateStorageProp,
    promptAtContent = false,
  } = props;
  const uiStateStorageCtx = React.useContext(UiStateStorageContext);
  const uiStateStorage = uiStateStorageProp ?? uiStateStorageCtx;
  const { translate } = useTranslation();
  const activeTool = useActiveTool();

  const [state, setState] = React.useState<ToolAssistanceFieldState>(() => {
    return {
      instructions: undefined,
      toolIconSpec: "",
      showPromptAtCursor: defaultPromptAtCursor,
      mouseTouchTabIndex: 0,
      isPinned: false,
      isOpen: false,
    };
  });

  const { showPromptAtCursor, toolIconSpec, mouseTouchTabIndex, instructions } =
    state;
  const mainInstruction = state.instructions?.mainInstruction.text;
  const { open } = useCursorPrompt({
    show: showPromptAtCursor,
    timeout: cursorPromptTimeout,
    iconSpec: toolIconSpec,
    instruction: mainInstruction,
    fadeOut: fadeOutCursorPrompt,
    promptAtContent,
  });

  const setIsOpen = (isOpen: boolean) => {
    let newState = {
      isOpen,
    };
    if (!isOpen && state.isPinned) {
      newState = { ...newState, ...{ isPinned: false } };
    }
    setState((prev) => ({ ...prev, ...newState }));
  };

  const getDisplayableInstructions = (section: ToolAssistanceSection) => {
    const displayableInstructions = section.instructions.filter(
      (instruction) => {
        const includeMouseInstructions = showMouseTouchTabs
          ? mouseTouchTabIndex === 0 && showMouseInstructions
          : showMouseInstructions;
        const includeTouchInstructions = showMouseTouchTabs
          ? mouseTouchTabIndex === 1 && showTouchInstructions
          : showTouchInstructions;
        return (
          isBothInstruction(instruction) ||
          (includeMouseInstructions && isMouseInstruction(instruction)) ||
          (includeTouchInstructions && isTouchInstruction(instruction))
        );
      }
    );
    return displayableInstructions;
  };

  React.useEffect(() => {
    void (async () => {
      const result = await uiStateStorage.getSetting(
        toolAssistanceKey,
        showPromptAtCursorKey
      );

      if (result.status !== UiStateStorageStatus.Success) return;
      setState((prev) => ({
        ...prev,
        showPromptAtCursor: result.setting,
      }));
    })();
  }, [uiStateStorage]);
  React.useEffect(() => {
    void (async () => {
      const result = await uiStateStorage.getSetting(
        toolAssistanceKey,
        mouseTouchTabIndexKey
      );

      if (result.status !== UiStateStorageStatus.Success) return;
      setState((prev) => ({
        ...prev,
        mouseTouchTabIndex: result.setting,
      }));
    })();
  }, [uiStateStorage]);
  React.useEffect(() => {
    return MessageManager.onToolAssistanceChangedEvent.addListener((args) => {
      setState((prev) => ({
        ...prev,
        instructions: args.instructions,
      }));
      open();
    });
  }, [open]);
  React.useEffect(() => {
    return UiFramework.frontstages.onToolIconChangedEvent.addListener(
      (args) => {
        setState((prev) => ({
          ...prev,
          toolIconSpec: args.iconSpec,
        }));
        open();
      }
    );
  }, [open]);

  const hasMouseInstructions = !!instructions?.sections?.some((section) => {
    return section.instructions.some((instruction) =>
      isMouseInstruction(instruction)
    );
  });
  const hasTouchInstructions = !!instructions?.sections?.some((section) => {
    return section.instructions.some((instruction) =>
      isTouchInstruction(instruction)
    );
  });

  const isMobileBrowser = React.useMemo(() => {
    return ProcessDetector.isMobileBrowser;
  }, []);
  const showMouseInstructions = !isMobileBrowser && hasMouseInstructions;
  const showTouchInstructions = hasTouchInstructions;
  const showMouseTouchTabs = showMouseInstructions && showTouchInstructions;

  const sectionInstructions = (instructions?.sections ?? [])
    .map((section) => {
      const displayableInstructions = getDisplayableInstructions(section);
      return {
        displayableInstructions,
        section,
      };
    })
    .filter((section) => {
      return section.displayableInstructions.length > 0;
    });

  const prompt = instructions?.mainInstruction.text;
  const tooltip = React.useMemo(() => {
    const lineBreak = "\u000d\u000a";
    const moreInfo = translate("toolAssistance.moreInfo");
    const postfix = `${lineBreak}${moreInfo}`;
    if (activeTool) {
      return `${activeTool.flyover}${prompt ? ` > ${prompt}` : ""}${postfix}`;
    }
    if (prompt) {
      return `${prompt}${postfix}`;
    }
    return moreInfo;
  }, [prompt, activeTool, translate]);

  const dialogTitle = activeTool?.flyover ?? translate("toolAssistance.title");
  const tabs = [
    translate("toolAssistance.mouse"),
    translate("toolAssistance.touch"),
  ];
  return (
    <StatusBarPopover
      visible={state.isOpen}
      onVisibleChange={(visible) => {
        setIsOpen(visible);
      }}
      closeOnOutsideClick={!state.isPinned}
      content={
        <ToolAssistanceDialog
          buttons={
            <StatusBarDialog.TitleBarButton
              onClick={() => {
                if (state.isPinned) {
                  setIsOpen(false);
                  return;
                }
                setState((prev) => ({ ...prev, isPinned: true }));
              }}
              title={translate(
                state.isPinned ? "dialog.close" : "toolAssistance.pin"
              )}
            >
              {state.isPinned ? <SvgClose /> : <SvgPin />}
            </StatusBarDialog.TitleBarButton>
          }
          title={dialogTitle}
        >
          <div>
            {showMouseTouchTabs && (
              <Tabs.Wrapper type="pill" value={String(mouseTouchTabIndex)}>
                <Tabs.TabList className="uifw-toolAssistance-tabs">
                  {tabs.map((tab, index) => (
                    <Tabs.Tab
                      key={index}
                      className="uifw-tab"
                      value={String(index)}
                      label={tab}
                      onClick={async () => {
                        setState((prev) => ({
                          ...prev,
                          mouseTouchTabIndex: index,
                        }));
                        void uiStateStorage.saveSetting(
                          toolAssistanceKey,
                          mouseTouchTabIndexKey,
                          index
                        );
                      }}
                    />
                  ))}
                </Tabs.TabList>
              </Tabs.Wrapper>
            )}
            {instructions ? (
              <div className="uifw-toolAssistance-content">
                <NZ_ToolAssistanceInstruction
                  key="main"
                  image={
                    <InstructionImage
                      instruction={instructions.mainInstruction}
                    />
                  }
                  text={instructions.mainInstruction.text}
                  isNew={instructions.mainInstruction.isNew}
                />

                {sectionInstructions.map((sectionInstruction, index) => {
                  const { section, displayableInstructions } =
                    sectionInstruction;
                  return (
                    <React.Fragment key={index.toString()}>
                      <ToolAssistanceSeparator>
                        {section.label}
                      </ToolAssistanceSeparator>
                      {displayableInstructions.map((instruction, index1) => {
                        return (
                          <NZ_ToolAssistanceInstruction
                            key={`${index1.toString()}-${index.toString()}`}
                            image={
                              <InstructionImage instruction={instruction} />
                            }
                            text={instruction.text}
                            isNew={instruction.isNew}
                          />
                        );
                      })}
                    </React.Fragment>
                  );
                })}

                {includePromptAtCursor && (
                  <>
                    <ToolAssistanceSeparator key="prompt-sep" />
                    <ToolAssistanceItem key="prompt-item">
                      <ToggleSwitch
                        label={translate("toolAssistance.promptAtCursor")}
                        labelPosition="right"
                        checked={state.showPromptAtCursor}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setState((prev) => ({
                            ...prev,
                            showPromptAtCursor: checked,
                          }));
                          void uiStateStorage.saveSetting(
                            toolAssistanceKey,
                            showPromptAtCursorKey,
                            checked
                          );
                        }}
                      />
                    </ToolAssistanceItem>
                  </>
                )}
              </div>
            ) : undefined}
          </div>
        </ToolAssistanceDialog>
      }
    >
      <Button
        styleType="borderless"
        startIcon={
          instructions ? (
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            <Icon iconSpec={state.toolIconSpec} />
          ) : (
            <></>
          )
        }
        className={classnames(
          "uifw-statusFields-toolAssistance-toolAssistanceField",
          props.className
        )}
        title={tooltip}
        style={props.style}
        labelProps={{ className: "prompt" }}
      >
        {prompt}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}

function isBothInstruction(instruction: ToolAssistanceInstruction) {
  return (
    instruction.inputMethod === undefined ||
    instruction.inputMethod === ToolAssistanceInputMethod.Both
  );
}

function isMouseInstruction(instruction: ToolAssistanceInstruction) {
  return instruction.inputMethod === ToolAssistanceInputMethod.Mouse;
}

function isTouchInstruction(instruction: ToolAssistanceInstruction) {
  return instruction.inputMethod === ToolAssistanceInputMethod.Touch;
}

function getWebComponentSource(iconSpec: string): string | undefined {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }

  return undefined;
}

function InstructionImage({
  instruction,
}: {
  instruction: ToolAssistanceInstruction;
}) {
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
          <InstructionSvgImage instruction={instruction} mediumSize={true} />
        );

      image = (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <FillCentered>
          <KeyNode
            keyboardKey={key}
            className="uifw-toolassistance-key-modifier"
          />
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
      image = (
        <InstructionKeyboardImage keyboardInfo={instruction.keyboardInfo} />
      );
    } else {
      Logger.logError(
        UiFramework.loggerCategory("ToolAssistanceField"),
        `getInstructionImage: ToolAssistanceImage.Keyboard specified but no keyboardInfo provided`
      );
    }
  } else {
    image = (
      <InstructionSvgImage instruction={instruction} mediumSize={false} />
    );
  }

  return image;
}

function InstructionSvgImage({
  instruction,
  mediumSize,
}: {
  instruction: ToolAssistanceInstruction;
  mediumSize: boolean;
}) {
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
        svgImage = <SvgAdd />;
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

function InstructionKeyboardImage({
  keyboardInfo,
}: {
  keyboardInfo: ToolAssistanceKeyboardInfo;
}) {
  let image: React.ReactNode;

  if (keyboardInfo.bottomKeys !== undefined) {
    image = (
      <div className="uifw-toolassistance-key-group">
        <span className="row1">
          {keyboardInfo.keys.map((key, index) => {
            return (
              <KeyNode
                key={index}
                keyboardKey={key}
                className="uifw-toolassistance-key-small"
              />
            );
          })}
        </span>
        <br />
        <span className="row2">
          {keyboardInfo.bottomKeys.map((key, index) => {
            return (
              <KeyNode
                key={index}
                keyboardKey={key}
                className="uifw-toolassistance-key-small"
              />
            );
          })}
        </span>
      </div>
    );
  } else if (keyboardInfo.keys.length === 2) {
    image = (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <FillCentered>
        {keyboardInfo.keys.map((key, index) => {
          let className = "uifw-toolassistance-key-medium";
          if (key.length > 1) className = "uifw-toolassistance-key-modifier";
          return (
            <KeyNode key={index} keyboardKey={key} className={className} />
          );
        })}
      </FillCentered>
    );
  } else if (keyboardInfo.keys[0]) {
    if (keyboardInfo.keys[0].length > 1)
      image = (
        <KeyNode
          keyboardKey={keyboardInfo.keys[0]}
          className="uifw-toolassistance-key-large"
        />
      );
    else image = <KeyNode keyboardKey={keyboardInfo.keys[0]} />;
  } else {
    Logger.logError(
      UiFramework.loggerCategory("ToolAssistanceField"),
      `ToolAssistanceImage.Keyboard specified but ToolAssistanceKeyboardInfo not valid`
    );
  }

  return image;
}

function KeyNode({
  keyboardKey,
  className,
}: {
  keyboardKey: string;
  className?: string;
}) {
  return (
    <div className={classnames("uifw-toolassistance-key", className)}>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <FillCentered>{keyboardKey}</FillCentered>
    </div>
  );
}
