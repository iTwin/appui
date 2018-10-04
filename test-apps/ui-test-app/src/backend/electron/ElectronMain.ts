/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as path from "path";
import * as semver from "semver";
import { app, protocol, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer";
import { RpcInterfaceDefinition, ElectronRpcManager } from "@bentley/imodeljs-common";

/**
 * Initializes Electron backend
 */
export default function initialize(rpcs: RpcInterfaceDefinition[]) {
  // tell ElectronRpcManager which RPC interfaces to handle
  ElectronRpcManager.initializeImpl({}, rpcs);

  // in order to preserve the platform standard behavior on MacOS,
  // the application needs to continue running even if the "main" window closes
  // so we'll keep a reference to the currently open "main" window here
  let mainWindow: BrowserWindow | undefined;

  /**
   * Converts an "electron://" URL to an absolute file path.
   *
   * We use this protocol in production builds because our frontend must be built with absolute URLs,
   * however, since we're loading everything directly from the install directory, we cannot know the
   * absolute path at build time.
   */
  function parseElectronUrl(requestedUrl: string): string {
    let assetPath = requestedUrl.substr("electron://".length);
    assetPath = assetPath.replace(/#.*$/, "");
    return path.normalize(`${__dirname}/public/${assetPath}`);
  }

  /**
   * Creates the "main" electron BrowserWindow with the application's frontend.
   */
  async function createWindow() {
    // in dev builds (npm start), we don't copy the public folder to lib/public,
    // so we'll need to access the original public dir for our app icon
    const isDevBuild = (process.env.NODE_ENV === "development");
    const iconPath = (isDevBuild) ? path.join(__dirname, "../public/appicon.ico") : path.join(__dirname, "public/appicon.ico");

    // configure and create the main window
    mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      icon: iconPath,
    });
    mainWindow.on("closed", () => mainWindow = undefined);

    if (isDevBuild) {
      // install some devtools extensions for easier react and redux debugging
      await installExtension(REACT_DEVELOPER_TOOLS);
      await installExtension(REDUX_DEVTOOLS);

      // NEEDSWORK: older versions of the redux devtools have been causing the frontend to crash, so just make sure we have a new enough version
      const reduxDevtoolsInfo = (BrowserWindow.getDevToolsExtensions() as any)["Redux DevTools"];
      if (!reduxDevtoolsInfo || semver.gt("2.15.3", reduxDevtoolsInfo.version))
        await installExtension(REDUX_DEVTOOLS, true);
    }

    // load the frontend
    //    in development builds, the frontend assets are served by the webpack devserver
    //    in production builds, load the built frontend assets directly from the filesystem
    mainWindow.loadURL(isDevBuild ? "http://localhost:3000" : parseElectronUrl("electron://index.html"));
  }

  // open the "frontend" window when the application starts up
  app.on("ready", () => {
    createWindow();

    // also handle any "electron://" requests and redirect them to "file://" URLs
    protocol.registerFileProtocol("electron", (request, callback) => callback(parseElectronUrl(request.url)));
  });

  // quit the application when all windows are closed (unless we're running on MacOS)
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
      app.quit();
  });

  // re-open the main window if it was closed and the app is re-activated (this is the normal MacOS behavior)
  app.on("activate", () => {
    if (!mainWindow)
      createWindow();
  });
}
