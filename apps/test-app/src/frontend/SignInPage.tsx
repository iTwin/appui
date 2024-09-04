/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { Button } from "@itwin/itwinui-react";
import { useAuth } from "./Auth";

export function SignInPage() {
  const { signIn } = useAuth();
  return (
    <PageLayout.Content padded={true}>
      <Button
        onClick={() => {
          void signIn();
        }}
      >
        Sign In
      </Button>
    </PageLayout.Content>
  );
}
