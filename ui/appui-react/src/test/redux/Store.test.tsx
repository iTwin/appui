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
  UiFramework,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { renderHook } from "@testing-library/react-hooks";
import { useGlobalStore } from "../../appui-react/redux/useGlobalStore";
import { useGlobalState } from "../../appui-react/redux/useGlobalState";

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
  const frameworkState = useGlobalState();
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

  describe("useGlobalState", () => {
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

        const { result } = renderHook(() => useGlobalState(), {
          wrapper: Provider,
          initialProps: { store: UiFramework.store },
        });

        expect(result.current.configurableUi.theme).toEqual("initial-theme");

        result.current.configurableUi.setTheme("custom-theme");
        expect(result.current.configurableUi.theme).toEqual("custom-theme");
      });
    });

    describe("without redux", () => {
      it("should return store value", () => {
        const { result } = renderHook(() => useGlobalState());
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

      useGlobalStore.setState((prev) => ({
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

      useGlobalStore.setState((prev) => ({
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
      useGlobalStore.setState((prev) => ({
        configurableUi: {
          ...prev.configurableUi,
          theme: "initial-theme",
        },
      }));

      const { getByText } = render(<ThemeRenderer />);

      fireEvent.click(getByText("frameworkState:initial-theme"));
      getByText("frameworkState:custom-theme");
    });
  });

  describe("UiFramework.dispatchActionToStore", () => {
    it("should update framework state w/o redux store", () => {
      const { getByText } = render(<ThemeRenderer />);

      UiFramework.dispatchActionToStore(
        ConfigurableUiActionId.SetTheme,
        "custom-theme"
      );
      getByText("frameworkState:custom-theme");
    });

    it("should update framework state w/o framework state in redux store", async () => {
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

      UiFramework.dispatchActionToStore(
        ConfigurableUiActionId.SetTheme,
        "custom-theme"
      );
      getByText("frameworkState:custom-theme");
    });
  });
});
