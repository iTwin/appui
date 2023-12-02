/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiItemsManager, UiItemsProvider } from "@itwin/appui-react";
import { Tool } from "@itwin/core-frontend";

/** Tool that registers an `UiItemsProvider`. I.e. `uiprovider register {id}`. */
export class RegisterUiProviderTool extends Tool {
  public static override toolId = "RegisterUiProviderTool";
  public static override get minArgs() {
    return 1;
  }
  public static override get maxArgs() {
    return 1;
  }

  public static readonly providers: UiItemsProvider[] = [];

  public override async run(providerId: string) {
    const provider = RegisterUiProviderTool.providers.find(
      (p) => p.id === providerId
    );
    if (!provider) return false;
    UiItemsManager.register(provider);
    return true;
  }

  public override async parseAndRun(...args: string[]): Promise<boolean> {
    return this.run(args[0]);
  }
}

/** Tool that unregisters an `UiItemsProvider`. I.e. `uiprovider unregister {id}`. */
export class UnregisterUiProviderTool extends Tool {
  public static override toolId = "UnregisterUiProviderTool";
  public static override get minArgs() {
    return 1;
  }
  public static override get maxArgs() {
    return 1;
  }

  public override async run(providerId: string) {
    UiItemsManager.unregister(providerId);
    return true;
  }

  public override async parseAndRun(...args: string[]): Promise<boolean> {
    return this.run(args[0]);
  }
}
