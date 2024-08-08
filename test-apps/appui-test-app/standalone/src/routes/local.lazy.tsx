/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FluidGrid, PageLayout } from "@itwin/itwinui-layouts-react";
import { SvgImodelHollow } from "@itwin/itwinui-icons-react";
import { Tile } from "@itwin/itwinui-react";

export const Route = createLazyFileRoute("/local")({
  component: Local,
});

function Local() {
  const { fileName } = Route.useSearch();

  const navigate = useNavigate();
  return (
    <PageLayout.Content padded={true}>
      <div>File name: {fileName}</div>
      <FluidGrid>
        {window.__BIM_FILES__.map((bimFile, index) => (
          <Tile
            isActionable
            key={index}
            name={bimFile}
            thumbnail={<SvgImodelHollow />}
            onClick={() => {
              void navigate({ search: { fileName: bimFile } });
            }}
          />
        ))}
      </FluidGrid>
    </PageLayout.Content>
  );
}
