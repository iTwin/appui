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
  SvgFolderBrowse,
  SvgImodel,
  SvgImodelHollow,
  SvgModel,
  SvgSettings,
} from "@itwin/itwinui-icons-react";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import {
  Header,
  HeaderLogo,
  Modal,
  ModalContent,
  SidenavButton,
  SideNavigation,
  ThemeProvider,
} from "@itwin/itwinui-react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const navigate = useNavigate();
  return (
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
              >
                Local
              </SidenavButton>,
              <SidenavButton disabled startIcon={<SvgModel />}>
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
