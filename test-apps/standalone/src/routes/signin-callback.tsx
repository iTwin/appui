/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin-callback")({
  loader: async (ctx) => {
    await ctx.context.auth.handleSigninCallback();
  },
});
