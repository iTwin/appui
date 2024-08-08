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
import { Tile } from "@itwin/itwinui-react";

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
              void navigate({
                to: "/local/$fileName",
                params: { fileName },
              });
            }}
          />
        ))}
      </FluidGrid>
      <Outlet />
    </PageLayout.Content>
  );
}
