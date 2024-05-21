/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";
import { combineReducers, createStore } from "redux";
import type {
  ConfigurableUiActionsUnion,
  FrameworkRootState,
} from "../../appui-react";
import {
  ConfigurableUiActionId,
  createFrameworkState,
  FrameworkReducer,
  SyncUiEventDispatcher,
  UiFramework,
} from "../../appui-react";
import type { ListenerType } from "../TestUtils";
import TestUtils from "../TestUtils";
import { renderHook } from "@testing-library/react-hooks";
import { useFrameworkStore } from "../../appui-react/uistate/useFrameworkStore";
import { useFrameworkState } from "../../appui-react/uistate/useFrameworkState";

function ReduxThemeRenderer() {
  const theme = useSelector((state: Partial<FrameworkRootState>) => {
    return state.frameworkState?.configurableUiState.theme;
  });
  const dispatch = useDispatch<Dispatch<ConfigurableUiActionsUnion>>();
  if (!theme) return null;
  return (
    <button
      onClick={() => {
        dispatch({
          type: ConfigurableUiActionId.SetTheme,
          payload: "custom-theme",
        });
      }}
    >
      redux:{theme}
    </button>
  );
}

function ThemeRenderer() {
  const frameworkState = useFrameworkState();
  if (!frameworkState) return null;
  return (
    <button
      onClick={() => {
        frameworkState.configurableUi.setTheme("custom-theme");
      }}
    >
      frameworkState:{frameworkState.configurableUi.theme}
    </button>
  );
}

describe("Store", () => {
  beforeEach(() => {
    TestUtils.terminateUiFramework();
  });

  describe("useFrameworkState", () => {
    describe("with redux", () => {
      it("should return redux store value", async () => {
        const reducer = combineReducers({
          frameworkState: FrameworkReducer,
        });
        const store = createStore(reducer);
        store.dispatch({
          type: ConfigurableUiActionId.SetTheme,
          payload: "initial-theme",
        });
        await UiFramework.initialize(store);

        expect(
          store.getState().frameworkState.configurableUiState.theme
        ).toEqual("initial-theme");

        const { result } = renderHook(() => useFrameworkState(), {
          wrapper: (props: any) => (
            <Provider store={UiFramework.store} {...props} />
          ),
        });

        expect(result.current.configurableUi.theme).toEqual("initial-theme");

        result.current.configurableUi.setTheme("custom-theme");
        expect(result.current.configurableUi.theme).toEqual("custom-theme");
      });
    });

    describe("without redux", () => {
      it("should return store value", () => {
        const { result } = renderHook(() => useFrameworkState());
        expect(result.current.configurableUi.theme).toEqual("SYSTEM_PREFERRED");

        result.current.configurableUi.setTheme("custom-theme");
        expect(result.current.configurableUi.theme).toEqual("custom-theme");
      });
    });

    it("should use redux w/o FrameworkStateProvider", async () => {
      const reducer = combineReducers({
        frameworkState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <ReduxThemeRenderer />
          <ThemeRenderer />
        </Provider>
      );

      expect(UiFramework.frameworkState!.configurableUiState.theme).toEqual(
        "SYSTEM_PREFERRED"
      );
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("redux:SYSTEM_PREFERRED");
      getByText("frameworkState:SYSTEM_PREFERRED");

      UiFramework.setColorTheme("custom-theme");

      expect(UiFramework.frameworkState!.configurableUiState.theme).toEqual(
        "custom-theme"
      );
      expect(UiFramework.getColorTheme()).toEqual("custom-theme");
      getByText("redux:custom-theme");
      getByText("frameworkState:custom-theme");
    });

    it("should prefer redux store", async () => {
      const reducer = combineReducers({
        frameworkState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <ReduxThemeRenderer />
          <ThemeRenderer />
        </Provider>
      );

      expect(UiFramework.frameworkState!.configurableUiState.theme).toEqual(
        "SYSTEM_PREFERRED"
      );
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("redux:SYSTEM_PREFERRED");
      getByText("frameworkState:SYSTEM_PREFERRED");
    });

    it("should use framework state if one is not available in redux store", async () => {
      const reducer = combineReducers({
        fs: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      useFrameworkStore.setState((prev) => ({
        configurableUi: {
          ...prev.configurableUi,
          theme: "initial-theme",
        },
      }));

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <ReduxThemeRenderer />
          <ThemeRenderer />
        </Provider>
      );

      expect(UiFramework.frameworkState?.configurableUiState.theme).toEqual(
        "initial-theme"
      );
      expect(UiFramework.getColorTheme()).toEqual("initial-theme");
      getByText("frameworkState:initial-theme");
    });

    it("should use framework state w/o redux store", async () => {
      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      useFrameworkStore.setState((prev) => ({
        configurableUi: {
          ...prev.configurableUi,
          theme: "initial-theme",
        },
      }));

      const { getByText } = render(<ThemeRenderer />);
      getByText("frameworkState:initial-theme");
    });

    it("should dispatch a redux action", async () => {
      const reducer = combineReducers({
        frameworkState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <ReduxThemeRenderer />
          <ThemeRenderer />
        </Provider>
      );

      fireEvent.click(getByText("frameworkState:SYSTEM_PREFERRED"));

      expect(UiFramework.getColorTheme()).toEqual("custom-theme");
      getByText("redux:custom-theme");
      getByText("frameworkState:custom-theme");
    });

    it("should update framework state w/o redux store", () => {
      useFrameworkStore.setState((prev) => ({
        configurableUi: {
          ...prev.configurableUi,
          theme: "initial-theme",
        },
      }));

      const { getByText } = render(<ThemeRenderer />);

      fireEvent.click(getByText("frameworkState:initial-theme"));
      getByText("frameworkState:custom-theme");
    });

    it("should dispatch SyncUiEvent only if state is changed", async () => {
      const reducer = combineReducers({
        frameworkState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const { result } = renderHook(() => useFrameworkState(), {
        wrapper: (props: any) => (
          <Provider store={UiFramework.store} {...props} />
        ),
      });

      const spy =
        vi.fn<
          Parameters<ListenerType<typeof SyncUiEventDispatcher.onSyncUiEvent>>
        >();
      SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
      result.current.configurableUi.setTheme("SYSTEM_PREFERRED", {
        immediateSync: true,
      });
      expect(spy).not.toBeCalled();

      result.current.configurableUi.setTheme("custom-theme", {
        immediateSync: true,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      result.current.configurableUi.setTheme("custom-theme", {
        immediateSync: true,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("UiFramework.dispatchActionToStore", () => {
    it("without redux store", async () => {
      const { getByText } = render(<ThemeRenderer />);

      const spy =
        vi.fn<
          Parameters<ListenerType<typeof SyncUiEventDispatcher.onSyncUiEvent>>
        >();
      SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
      UiFramework.dispatchActionToStore(
        ConfigurableUiActionId.SetTheme,
        "custom-theme",
        true
      );
      getByText("frameworkState:custom-theme");

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("without framework state in redux store", async () => {
      const reducer = combineReducers({
        fs: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <ThemeRenderer />
        </Provider>
      );

      const spy =
        vi.fn<
          Parameters<ListenerType<typeof SyncUiEventDispatcher.onSyncUiEvent>>
        >();
      SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
      UiFramework.dispatchActionToStore(
        ConfigurableUiActionId.SetTheme,
        "custom-theme",
        true
      );
      getByText("frameworkState:custom-theme");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("UiFramework.state", () => {
    it("should return state from useFrameworkStore", () => {
      useFrameworkStore.setState((prev) => ({
        configurableUi: {
          ...prev.configurableUi,
          theme: "initial-theme",
        },
      }));

      const state = UiFramework.state;
      expect(state).toStrictEqual(useFrameworkStore.getState());
    });

    it("should use redux state", async () => {
      const reducer = combineReducers({
        frameworkState: FrameworkReducer,
      });
      const store = createStore(reducer);
      store.dispatch({
        type: ConfigurableUiActionId.SetTheme,
        payload: "custom-theme",
      });
      await UiFramework.initialize(store);

      const state = UiFramework.state;
      expect(state.configurableUi.theme).toEqual("custom-theme");
    });
  });

  describe("useFrameworkStore", () => {
    it("should dispatch SyncUiEvent only if state is changed", () => {
      const spy =
        vi.fn<
          Parameters<ListenerType<typeof SyncUiEventDispatcher.onSyncUiEvent>>
        >();
      SyncUiEventDispatcher.onSyncUiEvent.addListener(spy);
      const { result } = renderHook(() => useFrameworkStore());
      result.current.configurableUi.setTheme("custom-theme", {
        immediateSync: true,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      result.current.configurableUi.setTheme("custom-theme", {
        immediateSync: true,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
