/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import "./ToolAssistanceField.scss";
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
import { FillCentered } from "@itwin/core-react";
import { Button, Tabs, ToggleSwitch } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import { UiFramework } from "../../UiFramework.js";
import { useCursorPrompt } from "../../cursor/cursorprompt/CursorPrompt.js";
import { MessageManager } from "../../messages/MessageManager.js";
import { UiStateStorageContext } from "../../uistate/useUiStateStorage.js";

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
import { useControlledState } from "../../hooks/useControlledState.js";
import { StrataKitIcon } from "../../preview/use-stratakit/StrataKitIcon.js";
import { useStrataKitIcon } from "../../preview/use-stratakit/useStrataKitIcon.js";

type StrataKitIconProps = React.ComponentProps<typeof StrataKitIcon>;

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

type PopoverProps = React.ComponentProps<typeof StatusBarPopover>;

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
    >,
    Pick<PopoverProps, "visible" | "onVisibleChange"> {
  /**
   * Controlled flag for whether the popover is pinned.
   */
  pinned?: boolean;
  /**
   * Callback invoked every time the popover is pinned or unpinned as a result
   * of internal logic. Should be used alongside `pinned` prop.
   */
  onPinnedChange?: (pinned: boolean) => void;
}

interface ToolAssistanceFieldState {
  instructions: ToolAssistanceInstructions | undefined;
  toolIconSpec: string;
  toolIconElement: React.ReactElement | undefined;
  showPromptAtCursor: boolean;
  mouseTouchTabIndex: number;
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
    visible: visibleProp,
    onVisibleChange,
    pinned: pinnedProp,
    onPinnedChange,
  } = props;
  const uiStateStorageCtx = React.useContext(UiStateStorageContext);
  const uiStateStorage = uiStateStorageProp ?? uiStateStorageCtx;
  const { translate } = useTranslation();
  const activeTool = useActiveTool();

  const [state, setState] = React.useState<ToolAssistanceFieldState>(() => {
    return {
      instructions: undefined,
      toolIconSpec: "",
      toolIconElement: undefined,
      showPromptAtCursor: defaultPromptAtCursor,
      mouseTouchTabIndex: 0,
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

  const handleClose = () => {
    if (pinned) {
      setPinned(false);
    }
    setVisible(false);
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
          toolIconElement: args.iconElement,
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
  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange as React.Dispatch<React.SetStateAction<boolean>>
  );
  const [pinned, setPinned] = useControlledState(
    false,
    pinnedProp,
    onPinnedChange as React.Dispatch<React.SetStateAction<boolean>>
  );

  const svgDismiss = useStrataKitIcon("@stratakit/icons/dismiss.svg");
  const svgPin = useStrataKitIcon("@stratakit/icons/pin.svg");

  return (
    <StatusBarPopover
      visible={visible}
      onVisibleChange={setVisible}
      closeOnOutsideClick={!pinned}
      content={
        <ToolAssistanceDialog
          buttons={
            <StatusBarDialog.TitleBarButton
              onClick={() => {
                if (pinned) {
                  handleClose();
                  return;
                }
                setPinned(true);
              }}
              title={translate(pinned ? "dialog.close" : "toolAssistance.pin")}
            >
              {pinned ? (
                <StrataKitIcon href={svgDismiss} iconNode={<SvgClose />} />
              ) : (
                <StrataKitIcon href={svgPin} iconNode={<SvgPin />} />
              )}
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
            state.toolIconElement ?? (
              <StrataKitIcon iconSpec={state.toolIconSpec} />
            )
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
}): React.ReactNode {
  const { image, keyboardInfo, iconElement } = instruction;
  if (iconElement) return iconElement;

  if (
    (typeof image === "string" || image !== ToolAssistanceImage.Keyboard) &&
    keyboardInfo
  ) {
    if (keyboardInfo.keys.length === 1 && !keyboardInfo.bottomKeys) {
      const key = keyboardInfo.keys[0];
      const rightImage =
        typeof image === "string" ? (
          <div className="uifw-toolassistance-icon-medium">
            <StrataKitIcon iconSpec={image} />
          </div>
        ) : (
          <InstructionSvgImage instruction={instruction} mediumSize={true} />
        );

      return (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        <FillCentered>
          <KeyNode
            keyboardKey={key}
            className="uifw-toolassistance-key-modifier"
          />
          {rightImage}
        </FillCentered>
      );
    }
  }

  if (typeof image === "string") {
    const svgSource = getWebComponentSource(image);
    const className =
      svgSource !== undefined
        ? "uifw-toolassistance-svg"
        : "uifw-toolassistance-icon-large";
    return (
      <div className={className}>
        <StrataKitIcon iconSpec={svgSource ?? image} />
      </div>
    );
  }

  if (image === ToolAssistanceImage.Keyboard && keyboardInfo) {
    return <InstructionKeyboardImage keyboardInfo={keyboardInfo} />;
  }

  return <InstructionSvgImage instruction={instruction} mediumSize={false} />;
}

function InstructionSvgImage({
  instruction,
  mediumSize,
}: {
  instruction: ToolAssistanceInstruction;
  mediumSize: boolean;
}) {
  const svgAdd = useStrataKitIcon("@stratakit/icons/add.svg");
  const svgCursorClick = useStrataKitIcon("@stratakit/icons/cursor-click.svg");
  const svgGestureOneFingerDrag = useStrataKitIcon(
    "@stratakit/icons/gesture-one-finger-drag.svg"
  );
  const svgGestureOneFingerTap = useStrataKitIcon(
    "@stratakit/icons/gesture-one-finger-tap.svg"
  );
  const svgGestureOneFingerDoubleTap = useStrataKitIcon(
    "@stratakit/icons/gesture-one-finger-double-tap.svg"
  );
  const svgGesturePinch = useStrataKitIcon(
    "@stratakit/icons/gesture-pinch.svg"
  );
  const svgGestureTwoFingerDrag = useStrataKitIcon(
    "@stratakit/icons/gesture-two-finger-drag.svg"
  );
  const svgGestureTwoFingerTap = useStrataKitIcon(
    "@stratakit/icons/gesture-two-finger-tap.svg"
  );
  const svgMouseClickLeft = useStrataKitIcon(
    "@stratakit/icons/mouse-click-left.svg"
  );
  const svgMouseClickRight = useStrataKitIcon(
    "@stratakit/icons/mouse-click-right.svg"
  );
  const svgMouseClickMiddle = useStrataKitIcon(
    "@stratakit/icons/mouse-click-middle.svg"
  );

  let className = mediumSize
    ? "uifw-toolassistance-svg-medium"
    : "uifw-toolassistance-svg";
  let svgImage: React.ReactNode;
  let href: StrataKitIconProps["href"];

  switch (instruction.image) {
    case ToolAssistanceImage.AcceptPoint:
      svgImage = <SvgAdd />;
      href = svgAdd;
      break;
    case ToolAssistanceImage.CursorClick:
      svgImage = <SvgCursorClick />;
      href = svgCursorClick;
      break;
    case ToolAssistanceImage.LeftClick:
      svgImage = <SvgMouseClickLeft />;
      href = svgMouseClickLeft;
      break;
    case ToolAssistanceImage.RightClick:
      svgImage = <SvgMouseClickRight />;
      href = svgMouseClickRight;
      break;
    case ToolAssistanceImage.MouseWheel:
      svgImage = <SvgMouseClickWheel />;
      href = svgMouseClickMiddle;
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
      href = svgGestureOneFingerTap;
      break;
    case ToolAssistanceImage.OneTouchDoubleTap:
      svgImage = <SvgGestureOneFingerTapDouble />;
      href = svgGestureOneFingerDoubleTap;
      break;
    case ToolAssistanceImage.OneTouchDrag:
      svgImage = <SvgGestureOneFingerDrag />;
      href = svgGestureOneFingerDrag;
      break;
    case ToolAssistanceImage.TwoTouchTap:
      svgImage = <SvgGestureTwoFingerTap />;
      href = svgGestureTwoFingerTap;
      break;
    case ToolAssistanceImage.TwoTouchDrag:
      svgImage = <SvgGestureTwoFingerDrag />;
      href = svgGestureTwoFingerDrag;
      break;
    case ToolAssistanceImage.TwoTouchPinch:
      svgImage = <SvgGesturePinch />;
      href = svgGesturePinch;
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

  if (!svgImage) return undefined;
  return (
    <div className={className}>
      <StrataKitIcon href={href} iconSpec={svgImage ? svgImage : undefined} />
    </div>
  );
}

function InstructionKeyboardImage({
  keyboardInfo,
}: {
  keyboardInfo: ToolAssistanceKeyboardInfo;
}): React.ReactNode {
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
