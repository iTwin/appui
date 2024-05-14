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
  FrameworkState,
} from "../../appui-react";
import {
  ConfigurableUiActionId,
  createFrameworkState,
  FrameworkReducer,
  UiFramework,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import type {
  FrameworkAction,
  FrameworkDispatch,
} from "../../appui-react/redux/useFrameworkState";
import {
  FrameworkProvider,
  FrameworkStateReducer,
  useFrameworkDispatch,
  useFrameworkState,
} from "../../appui-react/redux/useFrameworkState";

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
          <FrameworkProvider state={state}>
            <ReduxThemeRenderer />
            <ThemeRenderer />
          </FrameworkProvider>
        </Provider>
      );

      expect(UiFramework.frameworkState!.configurableUiState.theme).toEqual(
        "SYSTEM_PREFERRED"
      );
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("redux:SYSTEM_PREFERRED");
      getByText("frameworkState:SYSTEM_PREFERRED");
    });

    it("should use FrameworkProvider if framework state is not available in redux", async () => {
      const reducer = combineReducers({
        customState: FrameworkReducer,
      });
      const store = createStore(reducer);
      await UiFramework.initialize(store);

      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const { getByText } = render(
        <Provider store={UiFramework.store}>
          <FrameworkProvider state={state}>
            <ReduxThemeRenderer />
            <ThemeRenderer />
          </FrameworkProvider>
        </Provider>
      );

      expect(UiFramework.frameworkState).toEqual(undefined);
      expect(UiFramework.getColorTheme()).toEqual("SYSTEM_PREFERRED");
      getByText("frameworkState:initial-theme");
    });

    it("should use FrameworkProvider w/o redux store", async () => {
      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const { getByText } = render(
        <FrameworkProvider state={state}>
          <ThemeRenderer />
        </FrameworkProvider>
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

    it("should dispatch w/o redux", () => {
      const state = createFrameworkState();
      state.configurableUiState.theme = "initial-theme";

      const dispatch = vi.fn<Parameters<FrameworkDispatch>>();

      const { getByText } = render(
        <FrameworkProvider state={state} dispatch={dispatch}>
          <ThemeRenderer />
        </FrameworkProvider>
      );

      fireEvent.click(getByText("frameworkState:initial-theme"));
      expect(dispatch).toHaveBeenCalledWith({
        type: "SET_THEME",
        theme: "custom-theme",
      });
    });
  });

  describe("UiFramework.dispatchActionToStore", () => {
    it("should dispatch w/o redux", () => {
      const dispatch = vi.fn<Parameters<FrameworkDispatch>>();

      render(
        <FrameworkProvider dispatch={dispatch}>
          <ThemeRenderer />
        </FrameworkProvider>
      );

      UiFramework.dispatchActionToStore("set-theme", "custom-theme");
      expect(dispatch).toHaveBeenCalledWith({
        type: "set-theme",
        payload: "custom-theme",
      });
    });
  });

  describe("FrameworkStateReducer", () => {
    it("should use React reducer", () => {
      function TestFrameworkProvider({
        children,
      }: React.PropsWithChildren<{}>) {
        const [state, dispatch] = React.useReducer(
          FrameworkStateReducer,
          undefined,
          () => {
            const s = createFrameworkState();
            s.configurableUiState.theme = "initial-theme";
            return s;
          }
        );
        return (
          <FrameworkProvider state={state} dispatch={dispatch}>
            {children}
          </FrameworkProvider>
        );
      }

      const { getByText } = render(
        <TestFrameworkProvider>
          <ThemeRenderer />
        </TestFrameworkProvider>
      );

      expect(UiFramework.getColorTheme()).toEqual("initial-theme");

      fireEvent.click(getByText("frameworkState:initial-theme"));

      expect(UiFramework.getColorTheme()).toEqual("custom-theme");
      getByText("frameworkState:custom-theme");
    });

    it("should use custom redux store", () => {
      const reducer = combineReducers({
        fs: (
          state: FrameworkState = (() => {
            const s = createFrameworkState();
            s.configurableUiState.theme = "initial-theme";
            return s;
          })(),
          action: FrameworkAction
        ) => FrameworkStateReducer(state, action),
      });
      const store = createStore(reducer);

      function TestThemeRenderer() {
        const theme = useSelector(({ fs }: { fs: FrameworkState }) => {
          return fs.configurableUiState.theme;
        });
        if (!theme) return null;
        return <button>test:{theme}</button>;
      }

      function TestFrameworkProvider({
        children,
      }: React.PropsWithChildren<{}>) {
        const state = useSelector(({ fs }: { fs: FrameworkState }) => fs);
        return (
          <FrameworkProvider state={state} dispatch={store.dispatch}>
            {children}
          </FrameworkProvider>
        );
      }

      const { getByText } = render(
        <Provider store={store}>
          <TestFrameworkProvider>
            <TestThemeRenderer />
            <ThemeRenderer />
          </TestFrameworkProvider>
        </Provider>
      );

      expect(UiFramework.getColorTheme()).toEqual("initial-theme");
      getByText("test:initial-theme");

      fireEvent.click(getByText("frameworkState:initial-theme"));

      expect(UiFramework.getColorTheme()).toEqual("custom-theme");
      getByText("test:custom-theme");
      getByText("frameworkState:custom-theme");
    });
  });
});
