/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import type { UiLayoutDataProvider } from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import { InputWithDecorations } from "@itwin/itwinui-react";
import { SvgLock, SvgLockUnlocked } from "@itwin/itwinui-icons-react";

/** This is used to notify the parent component that the lock decoration is displayed in the editor
 * and a separate lock editor should not be displayed.
 * @internal
 */
export const LockContext = React.createContext<
  | {
      /** Describes if the lock is displayed as an editor decoration. */
      lockDecoration: boolean;
      /** Called by editors that display lock decoration. */
      setLockDecoration: (lockDecoration: boolean) => void;
    }
  | undefined
>(undefined);

/** @internal */
export function LockProvider({ children }: React.PropsWithChildren) {
  const [lockDecoration, setLockDecoration] = React.useState(false);
  return (
    <LockContext.Provider
      value={React.useMemo(
        () => ({
          lockDecoration,
          setLockDecoration,
        }),
        [lockDecoration]
      )}
    >
      {children}
    </LockContext.Provider>
  );
}

/** Additional context for property editors that support lock decoration.
 * @internal
 */
export const PropertyEditorContext = React.createContext<
  | {
      lockButtonEnabled: boolean;
      uiDataProvider: UiLayoutDataProvider;
      itemPropertyName: string;
      /** Specified when rendering a lock editor. */
      lockPropertyName: string | undefined;
    }
  | undefined
>(undefined);

type PropertyEditorContextType = React.ContextType<
  typeof PropertyEditorContext
>;

interface PropertyEditorProviderProps
  extends NonNullable<PropertyEditorContextType> {
  children?: React.ReactNode;
}

/** @internal */
export function PropertyEditorProvider(props: PropertyEditorProviderProps) {
  const {
    children,
    lockButtonEnabled,
    uiDataProvider,
    itemPropertyName,
    lockPropertyName,
  } = props;
  return (
    <PropertyEditorContext.Provider
      value={React.useMemo(
        () => ({
          lockButtonEnabled,
          uiDataProvider,
          itemPropertyName,
          lockPropertyName,
        }),
        [uiDataProvider, itemPropertyName, lockPropertyName, lockButtonEnabled]
      )}
    >
      {children}
    </PropertyEditorContext.Provider>
  );
}

/** This hook should be used to mark editors that support lock decorations.
 * Returns if the lock decoration should be displayed.
 * @internal
 */
export function useLockDecoration() {
  const {
    lockButtonEnabled,
    lockPropertyName,
    itemPropertyName,
    uiDataProvider,
  } = React.useContext(PropertyEditorContext) ?? {};
  const { setLockDecoration } = React.useContext(LockContext) ?? {};
  const dialogItem = React.useMemo(
    () =>
      uiDataProvider?.items.find(
        (item) => item.property.name === itemPropertyName
      ),
    [uiDataProvider, itemPropertyName]
  );
  const lockDecoration =
    !!lockButtonEnabled && !lockPropertyName && !!dialogItem?.lockProperty;
  React.useLayoutEffect(() => {
    if (!setLockDecoration) return;
    setLockDecoration(lockDecoration);
    return () => {
      setLockDecoration(false);
    };
  }, [setLockDecoration, lockDecoration]);
  return lockDecoration;
}

interface UseLockPropertyArgs {
  provider: UiLayoutDataProvider;
  itemPropertyName: string;
}

function useLockProperty(args: UseLockPropertyArgs) {
  const { provider, itemPropertyName } = args;
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const listeners = [
        provider.onItemsReloadedEvent.addListener(onStoreChange),
        provider.onSyncPropertiesChangeEvent.addListener(onStoreChange),
      ];
      return () => listeners.forEach((l) => l());
    },
    [provider]
  );
  const getSnapshot = React.useCallback(() => {
    const dialogItem = provider.items.find(
      (item) => item.property.name === itemPropertyName
    );
    return dialogItem?.lockProperty;
  }, [provider, itemPropertyName]);
  return React.useSyncExternalStore(subscribe, getSnapshot);
}

/** @internal */
export function LockButtonInputDecoration() {
  const context = React.useContext(PropertyEditorContext);
  assert(!!context);
  const { itemPropertyName, uiDataProvider: provider } = context;
  const lockProperty = useLockProperty({
    provider,
    itemPropertyName,
  });
  const isLocked = !!lockProperty?.value.value;

  const displayLabel = lockProperty?.property.displayLabel;
  const label = displayLabel ? displayLabel : "Toggle lock";
  const disabled = lockProperty?.isDisabled;
  return (
    <InputWithDecorations.Button
      isActive={isLocked}
      label={label}
      disabled={disabled}
      size="small"
      styleType="borderless"
      onClick={() => {
        if (!lockProperty) return;

        provider.applyUiPropertyChange({
          value: {
            ...lockProperty.value,
            value: !isLocked,
          },
          propertyName: lockProperty.property.name,
        });
        provider.reloadDialogItems();
      }}
    >
      {isLocked ? <SvgLock /> : <SvgLockUnlocked />}
    </InputWithDecorations.Button>
  );
}
