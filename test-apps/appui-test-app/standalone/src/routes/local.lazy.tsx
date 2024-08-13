/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  createLazyFileRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { FluidGrid, PageLayout } from "@itwin/itwinui-layouts-react";
import { SvgImodelHollow } from "@itwin/itwinui-icons-react";
import { Button, Tile } from "@itwin/itwinui-react";
import { ProcessDetector } from "@itwin/core-bentley";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";
import { config } from "../frontend/config";

export const Route = createLazyFileRoute("/local")({
  component: Local,
});

function Local() {
  const navigate = useNavigate();
  return (
    <PageLayout.Content padded={true}>
      <FluidGrid>
        {window.__BIM_FILES__.map((fileName, index) => (
          <Tile
            isActionable
            key={index}
            name={fileName}
            thumbnail={<SvgImodelHollow />}
            onClick={() => {
              if (ProcessDetector.isElectronAppFrontend) {
                const filePath = `${config.snapshotPath}/${fileName}`;
                void navigate({
                  to: "/briefcase",
                  search: { filePath },
                });
                return;
              }
              void navigate({
                to: "/local/$fileName",
                params: { fileName },
              });
            }}
          />
        ))}
      </FluidGrid>
      {ProcessDetector.isElectronAppFrontend && (
        <Button
          onClick={async () => {
            const val = await ElectronApp.dialogIpc.showOpenDialog({
              properties: ["openFile"],
              filters: [{ name: "iModels", extensions: ["ibim", "bim"] }],
            });
            if (val.canceled) return;

            const filePath = val.filePaths[0];
            if (!filePath) return;

            void navigate({
              to: "/briefcase",
              search: { filePath },
            });
          }}
          style={{ marginTop: "var(--iui-size-l)" }}
          stretched
          size="large"
        >
          Select an iModel from disk
        </Button>
      )}
      <Outlet />
    </PageLayout.Content>
  );
}
