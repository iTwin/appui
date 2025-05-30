/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./TestPopoutFrontstage.scss";
import * as React from "react";
import { Frontstage, StandardLayout } from "@itwin/appui-react";
import { createTestFrontstage } from "./createTestFrontstage";
import { Button, Input, ProgressRadial } from "@itwin/itwinui-react";
import { Logger } from "@itwin/core-bentley";
import { loggerCategory } from "../../logger";
import { WidgetContentThrowError } from "@itwin/appui-test-providers";

export const createTestPopoutFrontstage = () => {
  {
    const frontstage = createTestFrontstage({
      id: "test-popout",
      layout: (
        <TestPopoutProviders>
          <StandardLayout />
        </TestPopoutProviders>
      ),
    });

    return {
      ...frontstage,
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget-1",
              label: "Widget 1",
              canPopout: true,
              content: (
                <>
                  <div>Widget 1 content</div>
                  <div id="border-test" />
                  <FixedProgressRadial id="progress-radial" />
                  <LinkTest />
                </>
              ),
            },
          ],
        },
      },
      rightPanel: {
        sections: {
          start: [
            {
              id: "error-widget",
              label: "Error widget",
              canPopout: true,
              content: (
                <>
                  <div>Widget content</div>
                  <WidgetContentThrowError />
                </>
              ),
            },
          ],
          end: [
            {
              id: "state-widget",
              label: "State widget",
              canPopout: true,
              content: <StateWidget />,
            },
          ],
        },
      },
    } satisfies Frontstage;
  }
};

(() => {
  const sheet = new CSSStyleSheet();
  // Shorthand `border` property from `adoptedStyleSheets` will not be copied to a popout widget correctly.
  sheet.replaceSync(`
    #border-test {
      --border-top-color: yellow;
      border-top: 5px solid var(--border-top-color);
      border-right: 5px solid green;
    }
  `);
  document.adoptedStyleSheets.push(sheet);
})();

type WidgetReparentEvent = CustomEvent<{
  widget: HTMLElement;
}>;

declare global {
  interface WindowEventMap {
    "appui:reparent": WidgetReparentEvent;
  }
}

function FixedProgressRadial(
  props: React.ComponentProps<typeof ProgressRadial>
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [key, setKey] = React.useState(0);
  React.useEffect(() => {
    if (!ref.current) return;

    const listener = (e: WidgetReparentEvent) => {
      const widget = e.detail.widget;
      if (!widget.contains(ref.current)) return;

      Logger.logInfo(loggerCategory, "reparented");
      // For now we just force a re-mount to copy styles.
      setKey((prev) => prev + 1);
    };

    // Event is not dispatched to every node in the widget element tree, so we need to listen on the theme provider.
    window.addEventListener("appui:reparent", listener);
    return () => {
      window.removeEventListener("appui:reparent", listener);
    };
  }, []);
  return <ProgressRadial key={key} ref={ref} {...props} />;
}

function LinkTest() {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const clientWidth = el.clientWidth;
    const clientHeight = el.clientHeight;
    Logger.logInfo(loggerCategory, "LinkTest", {
      clientWidth,
      clientHeight,
    });
  }, []);
  return <div ref={ref} id="link-test" style={{ background: "red" }} />;
}

function StateWidget() {
  const [value, setValue] = React.useState(0);
  const { count, increment } = React.useContext(CounterContext);
  return (
    <>
      <Input defaultValue="Default value" />
      <Button onClick={() => setValue((prev) => prev + 1)}>
        Increment: {value}
      </Button>
      <Button onClick={increment}>Counter: {count}</Button>
    </>
  );
}

const CounterContext = React.createContext<{
  count: number;
  increment: () => void;
}>({
  count: 0,
  increment: () => {},
});

function TestPopoutProviders({ children }: React.PropsWithChildren) {
  const [value, setValue] = React.useState(0);
  const increment = React.useCallback(() => {
    setValue((prev) => prev + 1);
  }, []);
  return (
    <CounterContext.Provider
      value={React.useMemo(
        () => ({
          count: value,
          increment,
        }),
        [value, increment]
      )}
    >
      {children}
    </CounterContext.Provider>
  );
}
