/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./frontend/Auth";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function ConditionalStrictMode({ children }: { children: React.ReactNode }) {
  const [strict, setStrict] = React.useState(() => {
    return router.parseLocation().search.strict !== 0;
  });
  React.useEffect(() => {
    return router.subscribe("onLoad", (ctx) => {
      const appParams = ctx.toLocation.search as { strict: 0 };
      setStrict(appParams.strict !== 0);
    });
  }, []);
  if (!strict) {
    return <>{children}</>;
  }
  return <StrictMode>{children}</StrictMode>;
}

function App() {
  return (
    <ConditionalStrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ConditionalStrictMode>
  );
}
