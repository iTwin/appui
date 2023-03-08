/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift } from "jscodeshift";
import { fromPaths } from "jscodeshift/src/collection";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  concat(other: Collection): this;
}

function plugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    concat(this: Collection, other) {
      const paths = [...this.paths(), ...other.paths()];
      return fromPaths(paths, this, this.getTypes());
    },
  };

  j.registerMethods(globalMethods);
}

export function useExtensions(j: JSCodeshift) {
  usePlugin(j, plugin);
}
