/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Transform } from "jscodeshift";

export function createInlineTransform(transformer: Transform) {
  return (file, api, options) => {
    const source = transformer(file, api, options);
    const j = api.jscodeshift;
    const root = j(source);
    return root.toSource({
      lineTerminator: "\n",
    });
  };
}

export function tsxModule(transform: Transform) {
  return {
    default: transform,
    parser: "tsx" as const,
  };
}
