/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./Docked.scss";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import {
  getCssVariableAsNumber,
  useRefs,
  useResizeObserver,
} from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AnimateDockedToolSettingsContext } from "../base/NineZone";
import { DockedToolSettingsHandle } from "./Handle";
import { DockedToolSettingsOverflow } from "./Overflow";
import { ToolSettingsOverflowPanel } from "./Panel";

/** @internal */
export function onOverflowLabelAndEditorResize() {}

/** This component takes a DockedToolSetting "wrapper" component and extract only the label and editor components from it */
function OverflowLabelAndEditor({ wrapper }: { wrapper: React.ReactNode }) {
  assert(React.isValidElement(wrapper));
  const entryValue = React.useMemo<DockedToolSettingsEntryContextArgs>(
    () => ({
      isOverflown: true,
      onResize: onOverflowLabelAndEditorResize,
    }),
    []
  );
  const wrapperChildren = (wrapper as React.ReactElement<any>).props.children;
  return (
    <>
      <DockedToolSettingsEntryContext.Provider value={entryValue}>
        {wrapperChildren &&
          React.Children.map(
            wrapperChildren,
            (child: React.ReactNode) => child
          )}
      </DockedToolSettingsEntryContext.Provider>
    </>
  );
}

/** Properties of [[DockedToolSettings]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface DockedToolSettingsProps extends CommonProps {
  /** Tool settings content. */
  children?: React.ReactNode;
  /** Container for overflown entries. */
  panelContainer?: React.ComponentType<{ children?: React.ReactNode }>;
}

/** Component that displays tool settings as a bar across the top of the content view.
 * @internal
 */
export function DockedToolSettings(props: DockedToolSettingsProps) {
  const [open, setOpen] = React.useState(false);
  const animateToolSettings = React.useContext(
    AnimateDockedToolSettingsContext
  );

  const ref = React.useRef<HTMLDivElement>(null);
  const width = React.useRef<number | undefined>(undefined);
  const handleWidth = React.useRef<number | undefined>(undefined);
  const childrenKeys = React.Children.toArray(props.children).map(
    (child, index) => getChildKey(child, index)
  );
  const [
    overflown,
    handleContainerResize,
    handleOverflowResize,
    getOnEntryResize,
    handleGapResize,
  ] = useOverflow(childrenKeys);
  const onResize = React.useCallback(() => {
    let gapSize = 0;
    if (ref.current) {
      gapSize = getGapVariable(ref.current);
      handleGapResize(gapSize);
    }
    width.current !== undefined &&
      handleWidth.current !== undefined &&
      handleContainerResize(width.current - handleWidth.current - gapSize);
  }, [handleContainerResize, handleGapResize]);
  const handleHandleResize = React.useCallback(
    (w: number) => {
      handleWidth.current = w;
      onResize();
    },
    [onResize]
  );
  const handleResize = React.useCallback(
    (w: number) => {
      width.current = w;
      onResize();
    },
    [onResize]
  );
  const resizeObserverRef = useResizeObserver(handleResize);

  const onOverflowClick = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const handleOnClose = React.useCallback(() => {
    setOpen(false);
  }, []);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const refs = useRefs(ref, resizeObserverRef);
  const children = React.useMemo(
    () => React.Children.toArray(props.children),
    [props.children]
  );
  const dockedChildren = children.reduce<Array<[string, React.ReactNode]>>(
    (acc, child, index) => {
      const key = getChildKey(child, index);
      if (!overflown || overflown.indexOf(key) < 0) {
        acc.push([key, child]);
      }
      return acc;
    },
    []
  );
  const overflownChildren = overflown
    ? children.reduce<Array<[string, React.ReactNode]>>((acc, child, index) => {
        const key = getChildKey(child, index);
        if (overflown.indexOf(key) >= 0) {
          acc.push([key, child]);
        }
        return acc;
      }, [])
    : [];
  const PanelContainer = props.panelContainer
    ? props.panelContainer
    : DefaultPanelContainer;
  const className = classnames("uifw-toolSettings-docked", props.className);
  return (
    <div
      data-toolsettings-provider={props.itemId}
      className={className}
      ref={refs}
      style={props.style}
    >
      <DockedToolSettingsHandle onResize={handleHandleResize} />
      {dockedChildren.map(([key, child]) => {
        return (
          <TransitionGroup
            appear={animateToolSettings}
            enter={animateToolSettings}
            key={key}
          >
            <CSSTransition
              in={animateToolSettings}
              timeout={400}
              classNames={{
                appear: "toolsettings-appear",
                enter: "toolsettings-appear",
                appearActive: "toolsettings-appear-active",
                enterActive: "toolsettings-appear-active",
              }}
            >
              <DockedToolSettingsEntry
                key={key}
                entryKey={key}
                getOnResize={getOnEntryResize}
              >
                {child}
              </DockedToolSettingsEntry>
            </CSSTransition>
          </TransitionGroup>
        );
      })}
      {(!overflown || overflown.length > 0) && (
        <>
          <DockedToolSettingsOverflow
            onClick={onOverflowClick}
            onResize={handleOverflowResize}
            ref={targetRef}
          />
          {overflownChildren.length > 0 && open && targetRef.current && (
            <ToolSettingsOverflowPanel
              onClose={handleOnClose}
              open
              target={targetRef.current}
            >
              <PanelContainer>
                {overflownChildren.map(([key, child]) => {
                  return <OverflowLabelAndEditor key={key} wrapper={child} />;
                })}
              </PanelContainer>
            </ToolSettingsOverflowPanel>
          )}
        </>
      )}
    </div>
  );
}

interface DockedToolSettingsEntryProps {
  children?: React.ReactNode;
  entryKey: string;
  getOnResize: (key: string) => (w: number) => void;
}

function DockedToolSettingsEntry({
  children,
  entryKey,
  getOnResize,
}: DockedToolSettingsEntryProps) {
  const onResize = React.useMemo(
    () => getOnResize(entryKey),
    [getOnResize, entryKey]
  );
  const entry = React.useMemo<DockedToolSettingsEntryContextArgs>(
    () => ({
      isOverflown: false,
      onResize,
    }),
    [onResize]
  );
  return (
    <DockedToolSettingsEntryContext.Provider value={entry}>
      {children}
    </DockedToolSettingsEntryContext.Provider>
  );
}

/** Returns key of a child. Must be used along with React.Children.toArray to preserve the semantics of children.
 * @internal
 */
export function getChildKey(child: React.ReactNode, index: number) {
  if (React.isValidElement(child) && child.key !== null) {
    return child.key.toString();
  }
  return index.toString();
}

/** Returns a subset of docked entry keys that exceed given width and should be overflown.
 * @internal
 */
export function getOverflown(
  width: number,
  docked: ReadonlyArray<readonly [string, number]>,
  overflowWidth: number,
  activeIndex?: number,
  gapSize = 0
) {
  let settingsWidth = 0;

  // Avoid adding gap to first item.
  let firstItem = true;
  const getGapSize = () => {
    if (firstItem) {
      firstItem = false;
      return 0;
    }
    return gapSize;
  };

  // Make sure active item is always visible.
  if (activeIndex !== undefined && docked.length > activeIndex) {
    const activeWidth = docked[activeIndex];
    settingsWidth += activeWidth[1] + getGapSize();
  }

  let i = 0;

  for (; i < docked.length; i++) {
    // Skip active item.
    if (i === activeIndex) continue;

    const itemWidth = docked[i][1];
    const newSettingsWidth = settingsWidth + itemWidth + getGapSize();

    // Items overflow, add an overflow button.
    if (newSettingsWidth > width) {
      settingsWidth += overflowWidth + getGapSize();
      break;
    }

    // Items fit, add an item.
    settingsWidth = newSettingsWidth;
  }

  // Remove items until they fit.
  let j = i;
  if (j < docked.length) {
    for (; j > 0; j--) {
      if (j === activeIndex) continue;
      if (settingsWidth <= width) break;
      const itemWidth = docked[j][1];
      settingsWidth -= itemWidth + gapSize;
    }
  }

  const overflown = new Array<string>();
  for (i = j; i < docked.length; i++) {
    if (i === activeIndex) continue;
    overflown.push(docked[i][0]);
  }
  return overflown;
}

/** Hook that returns a list of overflown children keys.
 * @internal
 */
export function useOverflow(
  itemKeys: ReadonlyArray<string>,
  activeItemIndex?: number
): [
  /** Keys of overflown items. */
  ReadonlyArray<string> | undefined,
  /** Function to update container size. */
  (containerSize: number) => void,
  /** Function to update overflow button size. */
  (overflowButtonSize: number) => void,
  /** Returns a function to update an entry size for a given key. */
  (key: string) => (entrySize: number) => void,
  /** Function to update gap size. */
  (gapSize: number) => void
] {
  const [overflown, setOverflown] = React.useState<ReadonlyArray<string>>();
  const entryWidths = React.useRef(new Map<string, number | undefined>());
  const width = React.useRef<number | undefined>(undefined);
  const overflowWidth = React.useRef<number | undefined>(undefined);
  const gapSize = React.useRef(0);

  const calculateOverflow = React.useCallback(() => {
    const widths = verifiedMapEntries(entryWidths.current);
    if (
      width.current === undefined ||
      widths === undefined ||
      overflowWidth.current === undefined
    ) {
      setOverflown(undefined);
      return;
    }

    // Calculate overflow.
    const newOverflown = getOverflown(
      width.current,
      [...widths.entries()],
      overflowWidth.current,
      activeItemIndex,
      gapSize.current
    );
    setOverflown((prevOverflown) => {
      return eqlOverflown(prevOverflown, newOverflown)
        ? prevOverflown
        : newOverflown;
    });
  }, [activeItemIndex]);

  React.useLayoutEffect(() => {
    const newEntryWidths = new Map<string, number | undefined>();
    for (const itemKey of itemKeys) {
      const lastW = entryWidths.current.get(itemKey);
      newEntryWidths.set(itemKey, lastW);
    }
    entryWidths.current = newEntryWidths;
    calculateOverflow();
  }, [itemKeys, calculateOverflow]);

  const handleContainerResize = React.useCallback(
    (w: number) => {
      const calculate = width.current !== w;
      width.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );

  const handleOverflowResize = React.useCallback(
    (w: number) => {
      const calculate = overflowWidth.current !== w;
      overflowWidth.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );

  const handleEntryResize = React.useCallback(
    (key: string) => (w: number) => {
      const oldW = entryWidths.current.get(key);
      if (oldW === w) return;
      entryWidths.current.set(key, w);
      calculateOverflow();
    },
    [calculateOverflow]
  );

  const handleGapResize = React.useCallback(
    (w: number) => {
      if (gapSize.current === w) return;
      gapSize.current = w;
      calculateOverflow();
    },
    [calculateOverflow]
  );

  return [
    overflown,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize,
    handleGapResize,
  ];
}

interface DockedToolSettingsEntryContextArgs {
  readonly isOverflown: boolean;
  readonly onResize: (w: number) => void;
}

const DockedToolSettingsEntryContext =
  React.createContext<DockedToolSettingsEntryContextArgs>(null!);
DockedToolSettingsEntryContext.displayName =
  "nz:DockedToolSettingsEntryContext";

/** @internal */
export function useToolSettingsEntry() {
  return React.useContext(DockedToolSettingsEntryContext);
}

function verifiedMapEntries<T>(map: Map<string, T | undefined>) {
  for (const [, val] of map) {
    if (val === undefined) return undefined;
  }
  return map as Map<string, T>;
}

function DefaultPanelContainer(props: { children: React.ReactNode }) {
  return (
    <div className="uifw-toolSettings-docked_container">{props.children}</div>
  );
}

/** @internal */
export function eqlOverflown(
  prev: readonly string[] | undefined,
  value: readonly string[]
) {
  if (!prev) return false;
  if (prev.length !== value.length) return false;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i];
    const v = value[i];
    if (p !== v) return false;
  }
  return true;
}

function getGapVariable(htmlElement: HTMLElement) {
  // eslint-disable-next-line deprecation/deprecation
  const gap = getCssVariableAsNumber("gap", htmlElement);
  if (isNaN(gap)) return 0;
  return gap;
}
