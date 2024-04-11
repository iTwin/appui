/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from "@testing-library/react-hooks";
import { useLifecycleLogging } from "../../../core-react/utils/hooks/useLifecycleLogging";

describe("useLifecycleLogging", () => {
  interface HookProps {
    name: string;
    props: Record<string, any>;
    context?: Record<string, any>;
  }

  it("logs when component is mounted", () => {
    const consoleSpy = vi.spyOn(console, "log");
    renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      { initialProps: { name: "TestHook", props: { id: 1 } } }
    );

    expect(consoleSpy).toBeCalledWith(
      "[useLifecycleLogging]: 'TestHook' Component mounted."
    );
  });

  it("logs when component is unmounted", () => {
    const { unmount } = renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      { initialProps: { name: "TestHook", props: { id: 1 } } }
    );

    const consoleSpy = vi.spyOn(console, "log");
    unmount();
    expect(consoleSpy).toBeCalledWith(
      "[useLifecycleLogging]: 'TestHook' Component unmounted."
    );
  });

  it("logs when component re renders", () => {
    const { rerender } = renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      { initialProps: { name: "TestHook", props: { id: 1 } } }
    );

    const consoleSpy = vi.spyOn(console, "log");
    rerender({ name: "TestHook", props: { id: 1 } });
    expect(consoleSpy).toBeCalledWith(
      "[useLifecycleLogging]: 'TestHook' Component re-rendered."
    );
  });

  it("logs when component re renders with new props", () => {
    const { rerender } = renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      { initialProps: { name: "TestHook", props: { id: 1 } } }
    );

    const consoleSpy = vi.spyOn(console, "log");
    rerender({ name: "TestHook", props: { id: 2 } });
    expect(consoleSpy).toHaveBeenCalledWith(
      "[useLifecycleLogging]: 'TestHook' Props changed: ",
      expect.anything()
    );
  });

  it("logs when component re renders with new context", () => {
    const { rerender } = renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      {
        initialProps: {
          name: "TestHook",
          props: { id: 1 },
          context: { contextValue: "Old context" },
        },
      }
    );

    const consoleSpy = vi.spyOn(console, "log");
    rerender({
      name: "TestHook",
      props: { id: 1 },
      context: { contextValue: "New context" },
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "[useLifecycleLogging]: 'TestHook' Context changed: ",
      expect.anything()
    );
  });

  it("logs when component re renders with new props and new context", async () => {
    const { rerender } = renderHook(
      (props: HookProps) =>
        useLifecycleLogging(props.name, props.props, props.context),
      {
        initialProps: {
          name: "TestHook",
          props: { id: 1 },
          context: { contextValue: "Old context" },
        },
      }
    );

    const consoleSpy = vi.spyOn(console, "log");
    rerender({
      name: "TestHook",
      props: { id: 2 },
      context: { contextValue: "New context" },
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[useLifecycleLogging]: 'TestHook' Props and context changed: ",
      expect.anything(),
      expect.anything()
    );
  });
});
