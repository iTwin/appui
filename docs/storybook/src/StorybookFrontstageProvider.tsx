/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  FrontstageConfig,
  StandardFrontstageProps,
  StandardFrontstageProvider,
} from "@itwin/appui-react";

export interface StorybookFrontstageProviderProps
  extends StandardFrontstageProps {
  contentManipulation?: React.ReactNode;
}

export class StorybookFrontstageProvider extends StandardFrontstageProvider {
  constructor(private _props: StorybookFrontstageProviderProps) {
    super(_props);
  }

  public override frontstageConfig(): FrontstageConfig {
    const config = super.frontstageConfig();
    const contentManipulation = this._props.contentManipulation
      ? {
          id: `${this._props.id}-contentManipulationTools`,
          content: this._props.contentManipulation,
        }
      : config.contentManipulation;
    return {
      ...config,
      contentManipulation,
    };
  }
}
