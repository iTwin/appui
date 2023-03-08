/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift } from "jscodeshift";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  concat(other: Collection): this;
}

function extensionsPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    concat(this: Collection, other) {
      const paths = [...this.paths(), ...other.paths()];
      const proto = Object.getPrototypeOf(this);
      const collection = new proto.constructor(paths, this, this.getTypes());
      return collection;
    },
  };
  j.registerMethods(globalMethods);
}

export function useExtensions(j: JSCodeshift) {
  usePlugin(j, extensionsPlugin);
}
