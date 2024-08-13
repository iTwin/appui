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

interface RouterContext {
  auth: Auth;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async (ctx) => {
    void ctx.context.auth.signInSilent();
    const user = await Users.fetchMe(ctx.context.auth.accessToken);
    return { user };
  },
  component: Root,
  validateSearch: (search: { strict?: 0; menu?: 0 } & SearchSchemaInput) => {
    return search;
  },
});

function Root() {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const localMatch = matchRoute({ to: "/local", fuzzy: true });
  const briefcaseMatch = matchRoute({ to: "/briefcase", fuzzy: true });
  const blankMatch = matchRoute({ to: "/blank", fuzzy: true });
  const iTwinsMatch = matchRoute({ to: "/iTwins", fuzzy: true });
  const iTwinMatch = matchRoute({ to: "/iTwin/$iTwinId", fuzzy: true });
  const search = Route.useSearch();
  const menu = search.menu !== 0;
  return (
    <ThemeProvider>
      <PageLayout>
        {menu && (
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
              actions={[<UserMenu key="user-menu" />]}
            />
          </PageLayout.Header>
        )}
        {menu && (
          <PageLayout.SideNavigation>
            <SideNavigation
              items={[
                <SidenavButton
                  key="iTwins"
                  startIcon={<SvgImodel />}
                  onClick={() => {
                    void navigate({ to: "/iTwins" });
                  }}
                  isActive={!!iTwinsMatch || !!iTwinMatch}
                >
                  iTwin Hub
                </SidenavButton>,
                <SidenavButton
                  key="local"
                  startIcon={<SvgFolderBrowse />}
                  onClick={() => {
                    void navigate({ to: "/local" });
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
                  disabled
                  startIcon={<SvgSettings />}
                >
                  Settings
                </SidenavButton>,
              ]}
              expanderPlacement="bottom"
            />
          </PageLayout.SideNavigation>
        )}
        <Outlet />
      </PageLayout>
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
  const briefcaseMatch = useMatch({ from: "/briefcase", shouldThrow: false });
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
    const filename = briefcaseMatch.search.filePath.replace(/^.*[\\/]/, "");
    items.push(
      <HeaderButton key="briefcase" name={filename} startIcon={<SvgImodel />} />
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
