/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */
import type * as React from "react";
import { FrontstageProvider } from "./FrontstageProvider";
import type { StandardFrontstageProps } from "./StandardFrontstageProvider";
import { ContentGroup, ContentGroupProvider } from "../content/ContentGroup";
import type { CustomFrontstageConfig } from "./FrontstageConfig";
import type { Layout } from "../layout/Layout";

/** @internal */
export interface CustomFrontstageProviderProps
  extends Pick<StandardFrontstageProps, "id" | "contentGroupProps"> {
  content?: React.ReactNode;
  layout?: Layout;
}

/** @internal */
export class CustomFrontstageProvider extends FrontstageProvider {
  constructor(private _props: CustomFrontstageProviderProps) {
    super();
  }

  public override get id(): string {
    return this._props.id;
  }

  public override frontstageConfig(): CustomFrontstageConfig {
    const contentGroup =
      this._props.contentGroupProps instanceof ContentGroupProvider
        ? this._props.contentGroupProps
        : new ContentGroup(this._props.contentGroupProps);
    return {
      id: this._props.id,
      contentGroup,
      version: 1.0,
      content: this._props.content,
      layout: this._props.layout,
    };
  }
}
