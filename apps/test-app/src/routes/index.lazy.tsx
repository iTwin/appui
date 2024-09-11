/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import readmeMd from "../../README.md";
import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";
import { PageLayout } from "@itwin/itwinui-layouts-react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageLayout.Content padded>
      <Markdown>{readmeMd}</Markdown>
    </PageLayout.Content>
  );
}
