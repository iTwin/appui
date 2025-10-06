/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Point, Rectangle } from "@itwin/core-react/internal";
import * as React from "react";
import {
  DragManager,
  DragManagerContext,
} from "../../appui-react/layout/base/DragManager.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import type { NineZoneProviderProps } from "../../appui-react/layout/base/NineZone.js";
import { NineZoneProvider } from "../../appui-react/layout/base/NineZone.js";
import type { NineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer.js";
import { WidgetTab } from "../../appui-react/layout/widget/Tab.js";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** @internal */
export interface TestNineZoneProviderProps
  extends PartialBy<NineZoneProviderProps, "measure" | "layout" | "dispatch"> {
  dragManagerRef?: React.Ref<DragManager>;
  defaultState?: NineZoneState;
}

/** @internal */
export function TestNineZoneProvider(props: TestNineZoneProviderProps) {
  const { children, dragManagerRef, ...otherProps } = props;
  const [layout] = React.useState(() => createLayoutStore(props.defaultState));
  const [dispatch] = React.useState(() => vi.fn());
  const [measure] = React.useState(() => () => new Rectangle());
  return (
    <NineZoneProvider
      layout={layout}
      dispatch={dispatch}
      measure={measure}
      tab={<TestTab />}
      {...otherProps}
    >
      <ContextConsumer
        context={DragManagerContext}
        contextRef={dragManagerRef}
      />
      {children}
    </NineZoneProvider>
  );
}

function TestTab() {
  const tabId = React.useContext(TabIdContext);
  return <WidgetTab icon={<>{tabId} icon</>} />;
}

/** @internal */
export function DragManagerProvider(props: { children?: React.ReactNode }) {
  const [dragManager] = React.useState(new DragManager());
  return (
    <DragManagerContext.Provider value={dragManager}>
      {props.children}
    </DragManagerContext.Provider>
  );
}

type DragInfo = Parameters<DragManager["handleDragStart"]>[0]["info"];

/** @internal */
export function createDragInfo(args?: Partial<DragInfo>): DragInfo {
  return {
    initialPointerPosition: new Point(),
    lastPointerPosition: new Point(),
    pointerPosition: new Point(),
    widgetSize: { height: 0, width: 0 },
    ...args,
  };
}

/** @internal */
export function createDragStartArgs(): Parameters<
  DragManager["handleDragStart"]
>[0] {
  return {
    info: createDragInfo(),
    item: {
      id: "",
      type: "tab",
    },
  };
}

/** @internal */
export function setRefValue<T>(ref: React.Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

interface WithOnRenderProps {
  onRender?(): void;
}

/** @internal */
export const withOnRender = <P extends object, C>(
  Component: React.JSXElementConstructor<P> & C
) => {
  type Props = React.JSX.LibraryManagedAttributes<C, P & WithOnRenderProps>;
  return function WithOnRender(props: Props) {
    const { onRender, ...otherProps } = props;
    onRender && onRender();
    return <Component {...(otherProps as any)} />;
  };
};

interface ContextConsumerProps<T> {
  context: React.Context<T>;
  contextRef?: React.Ref<T>;
}

/** @internal */
export function ContextConsumer<T>(props: ContextConsumerProps<T>) {
  const context = React.useContext(props.context);
  if (props.contextRef) {
    setRefValue(props.contextRef, context);
  }
  return <></>;
}
