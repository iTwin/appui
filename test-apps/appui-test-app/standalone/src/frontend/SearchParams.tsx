/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { UiFramework } from "@itwin/appui-react";
import { useNavigate, useSearch } from "@tanstack/react-router";

export interface AppParams extends PreviewFeatureParams {
  frontstageId?: string;
}

export interface PreviewFeatureParams {
  reparentPopoutWidgets?: 0 | 1;
}

export function useSyncFrontstageParam() {
  const { frontstageId } = useSearch({ strict: false });
  const navigate = useNavigate();
  React.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        if (frontstageId === args.activatedFrontstageDef.id) return;
        void navigate({
          search: { frontstageId: args.activatedFrontstageDef.id },
        });
      }
    );
  }, [navigate, frontstageId]);
  return frontstageId;
}

export function useFeatureOverrideParams() {
  const { reparentPopoutWidgets } = useSearch({ strict: false });

  return {
    ...(reparentPopoutWidgets !== undefined && {
      reparentPopoutWidgets: !!reparentPopoutWidgets,
    }),
  };
}
