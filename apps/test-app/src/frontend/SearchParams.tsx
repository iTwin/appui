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

export function useSyncFrontstageParam() {
  const { frontstageId } = useSearch({ strict: false });
  const lastFrontstageId = React.useRef("");
  const navigate = useNavigate();
  React.useEffect(() => {
    const newStageId = frontstageId ?? createMainFrontstage.stageId;
    if (lastFrontstageId.current === newStageId) return;
    if (UiFramework.frontstages.activeFrontstageId === newStageId) return;
    void UiFramework.frontstages.setActiveFrontstage(newStageId);
    lastFrontstageId.current = newStageId;
  }, [frontstageId]);
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
