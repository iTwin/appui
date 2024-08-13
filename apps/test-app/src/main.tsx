/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./frontend/Auth";
import { getUrlParam } from "./frontend/SearchParams";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function ConditionallyStrictApp({ children }: { children: React.ReactNode }) {
  const strictParam = getUrlParam("strict");
  if (strictParam === "0") {
    return <>{children}</>;
  }
  return <StrictMode>{children}</StrictMode>;
}

function App() {
  // TODO: react signal is aborted without reason in `@itwin/imodel-browser-react#IModelGrid`
  return (
    <ConditionallyStrictApp>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ConditionallyStrictApp>
  );
}
