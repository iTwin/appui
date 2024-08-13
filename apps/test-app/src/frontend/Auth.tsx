/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { config } from "./config";
import { AuthorizationClient } from "@itwin/core-common";

export interface Auth {
  accessToken: string;
  signIn: () => Promise<void>;
  signInSilent: () => Promise<void>;
  signOut: () => Promise<void>;
  handleSigninCallback: () => Promise<void>;
  authClient: AuthorizationClient;
}

const AuthContext = React.createContext<Auth | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("Missing `AuthContext.Provider`");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [authClient] = React.useState(() => {
    return new BrowserAuthorizationClient({
      clientId: config.appClientId,
      redirectUri: config.appRedirectUri,
      scope: config.appScope,
      responseType: "code",
      authority: `https://${config.urlPrefix}ims.bentley.com`,
      noSilentSignInOnAppStartup: true,
    });
  });

  const signOut = React.useCallback(async () => {
    setAccessToken("");
    return authClient.signOut();
  }, [authClient]);

  const signIn = React.useCallback(async () => {
    return authClient.signIn();
  }, [authClient]);

  const handleSigninCallback = React.useCallback(async () => {
    return authClient.handleSigninCallback();
  }, [authClient]);

  const signInSilent = React.useCallback(async () => {
    if (accessToken) return;
    try {
      await authClient.signInSilent();
    } catch (err) {}
  }, [accessToken, authClient]);

  React.useEffect(() => {
    return authClient.onAccessTokenChanged.addListener((token) => {
      setAccessToken(token);
    });
  }, [authClient]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        signIn,
        signInSilent,
        signOut,
        handleSigninCallback,
        authClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
