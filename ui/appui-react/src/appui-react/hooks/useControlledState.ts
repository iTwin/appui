/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

/** @internal */
export function useControlledState<T>(
  initialValue: T,
  controlledState: T | undefined,
  setControlledState?: React.Dispatch<React.SetStateAction<T>>
) {
  const [uncontrolledState, setUncontrolledState] =
    React.useState<T>(initialValue);

  const state = React.useMemo(
    () => (controlledState !== undefined ? controlledState : uncontrolledState),
    [controlledState, uncontrolledState]
  );

  const setState = React.useCallback(
    (value) => {
      setUncontrolledState(value);
      setControlledState?.(value);
    },
    [setControlledState, setUncontrolledState]
  ) as React.Dispatch<React.SetStateAction<T>>;

  return [state, setState] as const;
}
