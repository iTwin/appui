/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "@itwin/itwinui-layouts-css/styles.css";
import "@itwin/itwinui-react/styles.css";
import "../../lib/webfont/bentley-icons-generic-webfont.css";
import React, { StrictMode } from "react";
import {
  SvgDeveloper,
  SvgFolderBrowse,
  SvgImodel,
  SvgImodelHollow,
  SvgModel,
  SvgSettings,
} from "@itwin/itwinui-icons-react";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import {
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  Modal,
  ModalContent,
  SidenavButton,
  SideNavigation,
  ThemeProvider,
} from "@itwin/itwinui-react";
import {
  createRootRoute,
  Outlet,
  SearchSchemaInput,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
  validateSearch: (search: { strict?: "0" } & SearchSchemaInput) => {
    return search;
  },
});

function ConditionalStrictMode({ children }: { children: React.ReactNode }) {
  const { strict } = Route.useSearch();
  if (!strict) {
    return <>{children}</>;
  }
  return <StrictMode>{children}</StrictMode>;
}

function Root() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const localMatch = matchRoute({ to: "/local", fuzzy: true });
  const blankMatch = matchRoute({ to: "/blank", fuzzy: true });
  return (
    <ConditionalStrictMode>
      <ThemeProvider>
        <PageLayout>
          <PageLayout.Header>
            <Header
              appLogo={
                <HeaderLogo
                  logo={<SvgImodelHollow />}
                  onClick={() => {
                    void navigate({ to: "/" });
                  }}
                >
                  AppUI Test App
                </HeaderLogo>
              }
              breadcrumbs={<AppBreadcrumbs />}
            />
          </PageLayout.Header>
          <PageLayout.SideNavigation>
            <SideNavigation
              items={[
                <SidenavButton disabled startIcon={<SvgImodel />}>
                  iTwin Hub
                </SidenavButton>,
                <SidenavButton
                  startIcon={<SvgFolderBrowse />}
                  onClick={() => {
                    void navigate({ to: "/local" });
                  }}
                  isActive={!!localMatch}
                >
                  Local
                </SidenavButton>,
                <SidenavButton
                  startIcon={<SvgModel />}
                  onClick={() => {
                    void navigate({
                      to: "/blank",
                    });
                  }}
                  isActive={!!blankMatch}
                >
                  Blank
                </SidenavButton>,
              ]}
              secondaryItems={[
                <RouterDevToolsButton />,

                <SidenavButton disabled startIcon={<SvgSettings />}>
                  Settings
                </SidenavButton>,
              ]}
              expanderPlacement="bottom"
            />
          </PageLayout.SideNavigation>
          <Outlet />
        </PageLayout>
      </ThemeProvider>
    </ConditionalStrictMode>
  );
}

function RouterDevToolsButton() {
  const [open, setOpen] = React.useState(false);
  const title = "Router Dev Tools";
  return (
    <>
      <SidenavButton
        startIcon={<SvgDeveloper />}
        onClick={() => {
          setOpen(true);
        }}
      >
        {title}
      </SidenavButton>
      <Modal
        isOpen={open}
        title={title}
        styleType="fullPage"
        onClose={() => setOpen(false)}
      >
        <ModalContent>
          <TanStackRouterDevtoolsPanel setIsOpen={() => {}} />
        </ModalContent>
      </Modal>
    </>
  );
}

function AppBreadcrumbs() {
  const matchRoute = useMatchRoute();
  const localBim = matchRoute({ to: "/local/$fileName" });
  const items = [];
  if (localBim) {
    items.push(
      <HeaderButton
        key="localBim"
        name={localBim.fileName}
        startIcon={<SvgImodel />}
      />
    );
  }

  return <HeaderBreadcrumbs items={items} />;
}
