/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "@itwin/itwinui-layouts-css/styles.css";
import "@itwin/itwinui-react/styles.css";
import "../../lib/webfont/bentley-icons-generic-webfont.css";
import React from "react";
import {
  SvgDeveloper,
  SvgExit,
  SvgFolderBrowse,
  SvgImodel,
  SvgImodelHollow,
  SvgModel,
  SvgSettings,
} from "@itwin/itwinui-icons-react";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import {
  Avatar,
  DropdownMenu,
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  IconButton,
  MenuItem,
  Modal,
  ModalContent,
  SidenavButton,
  SideNavigation,
  ThemeProvider,
} from "@itwin/itwinui-react";
import { Root } from "@stratakit/foundations";
import {
  createRootRouteWithContext,
  Outlet,
  SearchSchemaInput,
  useMatch,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";
import { Users } from "../frontend/Users";
import { Auth, useAuth } from "../frontend/Auth";
import { config } from "../frontend/config";

interface RouterContext {
  auth: Auth;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async (ctx) => {
    void ctx.context.auth.signInSilent();
    const user = await Users.fetchMe(ctx.context.auth.accessToken);
    return { user };
  },
  component: AppRoot,
  validateSearch: (
    search: { strict?: 0; menu?: 0; themeBridge?: 1 } & SearchSchemaInput
  ) => {
    return search;
  },
});

function AppRoot() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const localMatch = matchRoute({ to: "/local", fuzzy: true });
  const briefcaseMatch = matchRoute({
    to: "/briefcase/$fileName",
    fuzzy: true,
  });
  const blankMatch = matchRoute({ to: "/blank", fuzzy: true });
  const iTwinsMatch = matchRoute({ to: "/iTwins", fuzzy: true });
  const iTwinMatch = matchRoute({ to: "/iTwin/$iTwinId", fuzzy: true });
  const settingsMatch = matchRoute({ to: "/settings", fuzzy: true });
  const search = Route.useSearch();
  const menu = search.menu !== 0;

  return (
    <ThemeBridge>
      {menu ? (
        <PageLayout>
          <PageLayout.Header>
            <Header
              appLogo={
                <HeaderLogo
                  logo={<SvgImodelHollow />}
                  onClick={() => {
                    void navigate({
                      to: "/",
                      search: (prev) => prev,
                    });
                  }}
                >
                  AppUI Test App
                </HeaderLogo>
              }
              breadcrumbs={<AppBreadcrumbs />}
              actions={[<UserMenu key="user-menu" />]}
            />
          </PageLayout.Header>
          <PageLayout.SideNavigation>
            <SideNavigation
              items={[
                <SidenavButton
                  key="iTwins"
                  startIcon={<SvgImodel />}
                  onClick={() => {
                    void navigate({ to: "/iTwins", search: (prev) => prev });
                  }}
                  isActive={!!iTwinsMatch || !!iTwinMatch}
                >
                  iTwin Hub
                </SidenavButton>,
                <SidenavButton
                  key="local"
                  startIcon={<SvgFolderBrowse />}
                  onClick={() => {
                    void navigate({ to: "/local", search: (prev) => prev });
                  }}
                  isActive={!!localMatch || !!briefcaseMatch}
                >
                  Local
                </SidenavButton>,
                <SidenavButton
                  key="blank"
                  startIcon={<SvgModel />}
                  onClick={() => {
                    void navigate({
                      to: "/blank",
                      search: (prev) => prev,
                    });
                  }}
                  isActive={!!blankMatch}
                >
                  Blank
                </SidenavButton>,
              ]}
              secondaryItems={[
                <RouterDevToolsButton key="router-dev-tools" />,
                <SidenavButton
                  key="settings"
                  startIcon={<SvgSettings />}
                  onClick={() => {
                    void navigate({
                      to: "/settings",
                      search: (prev) => prev,
                    });
                  }}
                  isActive={!!settingsMatch}
                >
                  Settings
                </SidenavButton>,
              ]}
              expanderPlacement="bottom"
            />
          </PageLayout.SideNavigation>
          <Outlet />
        </PageLayout>
      ) : (
        <Outlet />
      )}
    </ThemeBridge>
  );
}

function ThemeBridge({ children }: React.PropsWithChildren) {
  const search = Route.useSearch();
  const themeBridge = search.themeBridge === 1;
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const applyBackground = config.transparentWindow ? false : undefined;

  if (themeBridge) {
    return (
      <Root
        colorScheme={prefersDark ? "light" : "dark"}
        density="dense"
        synchronizeColorScheme
        render={(props: any) => (
          <ThemeProvider
            includeCss={true}
            future={{ themeBridge, applyBackground }}
            {...props}
          />
        )}
      >
        {children}
      </Root>
    );
  }

  return (
    <ThemeProvider
      themeOptions={{ applyBackground }}
      style={{ height: "100%" }}
    >
      {children}
    </ThemeProvider>
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
  const briefcaseMatch = useMatch({
    from: "/briefcase/$fileName",
    shouldThrow: false,
  });
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
  if (briefcaseMatch) {
    const fileName = briefcaseMatch.params.fileName;
    items.push(
      <HeaderButton key="briefcase" name={fileName} startIcon={<SvgImodel />} />
    );
  }

  return <HeaderBreadcrumbs items={items} />;
}

function UserMenu() {
  const { user } = Route.useLoaderData();
  const { signOut } = useAuth();
  if (!user) return null;

  const abbreviation = `${user.givenName[0]}${user.surname[0]}`;
  return (
    <DropdownMenu
      key="profile"
      role="menu"
      menuItems={() => [
        <MenuItem
          key="sign-out"
          endIcon={<SvgExit />}
          onClick={() => {
            void signOut();
          }}
        >
          Sign out
        </MenuItem>,
      ]}
    >
      <IconButton styleType="borderless">
        <Avatar size="medium" abbreviation={abbreviation} />
      </IconButton>
    </DropdownMenu>
  );
}

function useMediaQuery(query: string) {
  const getClientSnapshot = React.useCallback(() => {
    return window.matchMedia?.(query).matches;
  }, [query]);

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia?.(query);
      mediaQueryList?.addEventListener?.("change", onChange);
      return () => mediaQueryList?.removeEventListener?.("change", onChange);
    },
    [query]
  );

  return React.useSyncExternalStore(subscribe, getClientSnapshot);
}
