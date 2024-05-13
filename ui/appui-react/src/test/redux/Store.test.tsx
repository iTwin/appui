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
  FrameworkDispatch,
  FrameworkRootState,
} from "../../appui-react";
import {
  ConfigurableUiActionId,
  createFrameworkState,
  FrameworkReducer,
  FrameworkStateProvider,
  UiFramework,
  useFrameworkDispatch,
  useFrameworkState,
} from "../../appui-react";
import TestUtils from "../TestUtils";

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
  const dispatch = useFrameworkDispatch();
  if (!frameworkState) return null;
  return (
    <button
      onClick={() => {
        dispatch({
          type: "SET_THEME",
          theme: "custom-theme",
        });
      }}
    >
      frameworkState:{frameworkState.configurableUiState.theme}
    </button>
  );
}

describe("Store", () => {
  beforeEach(() => {
    TestUtils.terminateUiFramework();
  });

  describe("useFrameworkState", () => {
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
          <FrameworkStateProvider state={state}>
            <ReduxThemeRenderer />
            <ThemeRenderer />
          </FrameworkStateProvider>
        </Provider>
      );

      expect(UiFramework.frameworkState!.configurableUiState.theme).toEqual(
        "SYSTEM_PREFERRED"
      );
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("redux:SYSTEM_PREFERRED");
      getByText("frameworkState:SYSTEM_PREFERRED");
    });

    it("should use FrameworkStateContext if framework state is not available in redux", async () => {
      const reducer = combineReducers({
        customState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <FrameworkStateProvider state={state}>
            <ReduxThemeRenderer />
            <ThemeRenderer />
          </FrameworkStateProvider>
        </Provider>
      );

      expect(UiFramework.frameworkState).toEqual(undefined);
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("frameworkState:initial-theme");
    });

    it("should use FrameworkStateContext w/o redux store", async () => {
      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const { getByText } = render(
        <FrameworkStateProvider state={state}>
          <ThemeRenderer />
        </FrameworkStateProvider>
      );

      getByText("frameworkState:initial-theme");
    });
  });

  describe("useFrameworkDispatch", () => {
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

    it("should dispatch a framework action w/o redux", async () => {
      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const dispatch = vi.fn<Parameters<FrameworkDispatch>>();

      const { getByText } = render(
        <FrameworkStateProvider state={state} dispatch={dispatch}>
          <ThemeRenderer />
        </FrameworkStateProvider>
      );

      fireEvent.click(getByText("frameworkState:initial-theme"));
      expect(dispatch).toHaveBeenCalledWith({
        type: "SET_THEME",
        theme: "custom-theme",
      });
    });
  });
});
