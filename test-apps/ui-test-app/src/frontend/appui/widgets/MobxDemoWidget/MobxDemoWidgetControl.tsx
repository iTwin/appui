/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Provider as MobxProvider } from "mobx-react";
import * as React from "react";
import { ConfigurableCreateInfo, WidgetControl } from "@bentley/ui-framework";
import { MobxDemoModel } from "./MobxDemoModel";
import { MobxDemoViewController } from "./MobxDemoViewController";

export class MobxDemoWidgetControl extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    const model = new MobxDemoModel();

    this.reactNode = (
      <MobxProvider model={model}>
        <MobxDemoViewController />
      </MobxProvider>
    );
  }
}
