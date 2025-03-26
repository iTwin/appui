/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { UiFramework } from "@itwin/appui-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createMainFrontstage } from "./appui/frontstages/MainFrontstage";

export interface AppParams extends PreviewFeatureParams {
  frontstageId?: string;
}

export interface PreviewFeatureParams {
  reparentPopoutWidgets?: 0 | 1;
}

export interface UseSyncFrontstageParamArgs {
  defaultFrontstageId?: string;
}

export function useSyncFrontstageParam(args?: UseSyncFrontstageParamArgs) {
  const { defaultFrontstageId } = args ?? {};
  const { frontstageId } = useSearch({ strict: false });
  const navigate = useNavigate();
  React.useEffect(() => {
    void UiFramework.frontstages.setActiveFrontstage(
      frontstageId ?? defaultFrontstageId ?? createMainFrontstage.stageId
    );
  }, [frontstageId, defaultFrontstageId]);
  React.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener(
      (args) => {
        if (frontstageId === args.activatedFrontstageDef.id) return;
        void navigate({
          search: (prev) => ({
            ...prev,
            frontstageId: args.activatedFrontstageDef.id,
          }),
        });
      }
    );
  }, [navigate, frontstageId]);
}

export function useFeatureOverrideParams() {
  const { reparentPopoutWidgets } = useSearch({ strict: false });

  return {
    ...(reparentPopoutWidgets !== undefined && {
      reparentPopoutWidgets: !!reparentPopoutWidgets,
    }),
  };
}
