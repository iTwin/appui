/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utils */

import { UserManager, UserManagerSettings } from "oidc-client";
import { loadUser } from "redux-oidc";
import { ActivityLoggingContext } from "@bentley/bentleyjs-core";
import { OidcFrontendClient, OidcFrontendClientConfiguration } from "@bentley/imodeljs-clients";
import { I18N } from "@bentley/imodeljs-i18n";
import { LoginServices } from "./clientservices/LoginServices";
import { DefaultLoginServices } from "./clientservices/DefaultLoginServices";
import { ProjectServices } from "./clientservices/ProjectServices";
import { DefaultProjectServices } from "./clientservices/DefaultProjectServices";
import { IModelServices } from "./clientservices/IModelServices";
import { DefaultIModelServices } from "./clientservices/DefaultIModelServices";
import { Store } from "redux";

/**
 * Manages the Redux store, I18N service and iModel, Project and Login services for the ui-framework package.
 */
export class UiFramework {
  private constructor() { }

  private static _loginServices?: LoginServices;
  private static _projectServices?: ProjectServices;
  private static _iModelServices?: IModelServices;
  private static _i18n?: I18N;
  private static _store: Store<any>;
  private static _complaint: string = UiFramework._complaint;
  private static _userManager: UserManager;

  public static async initialize(store: Store<any>, i18n: I18N, oidcConfig?: OidcFrontendClientConfiguration, loginServices?: LoginServices, projectServices?: ProjectServices, iModelServices?: IModelServices) {
    UiFramework._store = store;
    UiFramework._i18n = i18n;
    const readFinishedPromise = UiFramework._i18n.registerNamespace("UiFramework").readFinished;

    UiFramework._loginServices = loginServices ? loginServices : new DefaultLoginServices();
    UiFramework._projectServices = projectServices ? projectServices : new DefaultProjectServices();
    UiFramework._iModelServices = iModelServices ? iModelServices : new DefaultIModelServices();

    if (oidcConfig) {
      const initOidcPromise = this.initializeOidc(oidcConfig);
      return Promise.all([readFinishedPromise, initOidcPromise]);
    }
    return readFinishedPromise;
  }

  private static async initializeOidc(oidcConfig: OidcFrontendClientConfiguration): Promise<void> {
    const oidcClient = new OidcFrontendClient(oidcConfig);
    const userManagerSettings: UserManagerSettings = await oidcClient.getUserManagerSettings(new ActivityLoggingContext(""));
    UiFramework._userManager = new UserManager(userManagerSettings);
    await loadUser(UiFramework._store, UiFramework._userManager);
  }

  public static get store(): Store<any> {
    if (!UiFramework._store)
      throw new Error(UiFramework._complaint);
    return UiFramework._store;
  }

  public static get i18n(): I18N {
    if (!UiFramework._i18n)
      throw new Error(UiFramework._complaint);
    return UiFramework._i18n;
  }

  public static get loginServices(): LoginServices {
    if (!UiFramework._loginServices)
      throw new Error(UiFramework._complaint);
    return UiFramework._loginServices!;
  }

  public static get projectServices(): ProjectServices {
    if (!UiFramework._projectServices)
      throw new Error(UiFramework._complaint);
    return UiFramework._projectServices!;
  }

  public static get iModelServices(): IModelServices {
    if (!UiFramework._iModelServices)
      throw new Error(UiFramework._complaint);
    return UiFramework._iModelServices!;
  }

  public static get userManager(): UserManager {
    if (!UiFramework._userManager)
      throw new Error(UiFramework._complaint);
    return UiFramework._userManager;
  }
}

export default UiFramework;
