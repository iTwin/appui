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
import { Button, Tile, ToggleSwitch } from "@itwin/itwinui-react";
import { ProcessDetector } from "@itwin/core-bentley";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";

export const Route = createLazyFileRoute("/local")({
  component: Local,
});

function Local() {
  const navigate = useNavigate();
  const [toggleValue, setToggleValue] = React.useState(false);
  const openBriefcase = ProcessDetector.isElectronAppFrontend || toggleValue;
  return (
    <PageLayout.Content padded={true}>
      <PageLayout.ToolsArea
        left={<></>}
        right={
          <ToggleSwitch
            label="Briefcase"
            labelPosition="left"
            checked={toggleValue}
            onChange={(e) => setToggleValue(e.currentTarget.checked)}
          />
        }
      />
      <FluidGrid>
        {window.__BIM_FILES__.map((fileName, index) => (
          <Tile
            isActionable
            key={index}
            name={fileName}
            thumbnail={<SvgImodelHollow />}
            onClick={() => {
              if (openBriefcase) {
                void navigate({
                  to: "/briefcase",
                  search: (prev) => {
                    const { filePath: _, ...rest } = prev;
                    return { ...rest, fileName };
                  },
                });
                return;
              }
              void navigate({
                to: "/local/$fileName",
                params: { fileName },
                search: (prev) => {
                  const {
                    fileName: _fileName,
                    filePath: _filePath,
                    ...rest
                  } = prev;
                  return rest;
                },
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
              search: (prev) => {
                const { fileName: _, ...rest } = prev;
                return { ...rest, filePath };
              },
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
