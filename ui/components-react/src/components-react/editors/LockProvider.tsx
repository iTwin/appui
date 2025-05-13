/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import type { UiLayoutDataProvider } from "@itwin/appui-abstract";
import { InputWithDecorations } from "@itwin/itwinui-react";
import { SvgLock, SvgLockUnlocked } from "@itwin/itwinui-icons-react";

/** @internal */
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

/** @internal */
export const PropertyEditorContext = React.createContext<
  | {
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
  const { children, uiDataProvider, itemPropertyName, lockPropertyName } =
    props;
  return (
    <PropertyEditorContext.Provider
      value={React.useMemo(
        () => ({
          uiDataProvider,
          itemPropertyName,
          lockPropertyName,
        }),
        [uiDataProvider, itemPropertyName, lockPropertyName]
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
  const { lockPropertyName, itemPropertyName, uiDataProvider } =
    React.useContext(PropertyEditorContext) ?? {};
  const { setLockDecoration } = React.useContext(LockContext) ?? {};
  const dialogItem = React.useMemo(
    () =>
      uiDataProvider?.items.find(
        (item) => item.property.name === itemPropertyName
      ),
    [uiDataProvider, itemPropertyName]
  );
  const lockDecoration = !lockPropertyName && !!dialogItem?.lockProperty;
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

function useLockProperty(args: UseLockPropertyArgs | undefined) {
  const { provider, itemPropertyName } = args ?? {};
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const listeners = provider
        ? [
            provider.onItemsReloadedEvent.addListener(onStoreChange),
            provider.onSyncPropertiesChangeEvent.addListener(onStoreChange),
          ]
        : [];
      return () => listeners.forEach((l) => l());
    },
    [provider]
  );
  const getSnapshot = React.useCallback(() => {
    if (!provider) return undefined;
    if (!itemPropertyName) return undefined;
    const dialogItem = provider.items.find(
      (item) => item.property.name === itemPropertyName
    );
    return dialogItem?.lockProperty;
  }, [provider, itemPropertyName]);
  return React.useSyncExternalStore(subscribe, getSnapshot);
}

/** @internal */
export function LockButtonInputDecoration() {
  const { itemPropertyName, uiDataProvider } =
    React.useContext(PropertyEditorContext) ?? {};
  const lockProperty = useLockProperty(
    uiDataProvider && itemPropertyName
      ? {
          provider: uiDataProvider,
          itemPropertyName,
        }
      : undefined
  );
  const isLocked = !!lockProperty?.value.value;
  return (
    <InputWithDecorations.Button
      isActive={isLocked}
      label="Toggle lock"
      size="small"
      onClick={() => {
        if (!uiDataProvider) return;
        if (!lockProperty) return;

        uiDataProvider.applyUiPropertyChange({
          value: {
            ...lockProperty.value,
            value: !isLocked,
          },
          propertyName: lockProperty.property.name,
        });
        uiDataProvider.reloadDialogItems();
      }}
    >
      {isLocked ? <SvgLock /> : <SvgLockUnlocked />}
    </InputWithDecorations.Button>
  );
}
