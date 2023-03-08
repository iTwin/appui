/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { ASTPath, Collection, JSCodeshift, ObjectExpression } from "jscodeshift";
import { usePlugin } from "./usePlugin";

declare module "jscodeshift/src/collection" {
  interface Collection<N> extends GlobalMethods {
  }
}

interface GlobalMethods {
  findObjectExpressions(name?: string): ObjectExpressionCollection;
}

export type ObjectExpressionCollection = Collection<ObjectExpression> & ObjectExpressionMethods;

interface ObjectExpressionMethods {
  removeProperty(name: string, modify?: PropertyModifier): this;
  renameProperty(name: string, newName: string, modify?: PropertyModifier): this;
}

export type PropertyModifier = (path: ASTPath<ObjectExpression>, property: ObjectExpression["properties"][0]) => void;

function isProperty(property: ObjectExpression["properties"][0], name: string) {
  if (property.type === "ObjectProperty") {
    const key = property.key;
    if (key.type === "Identifier" && key.name === name) {
      return true;
    }
  }
  return false;
}

function objectExpressionPlugin(j: JSCodeshift) {
  const globalMethods: GlobalMethods = {
    findObjectExpressions(this: Collection, name) {
      return this.find(j.ObjectExpression).map((path) => {
        const typeIdentifier = j(path).closest(j.VariableDeclarator).find(j.TSTypeReference).find(j.Identifier).paths()[0];
        if (typeIdentifier?.value?.name === name) {
          return path;
        }
        return undefined;
      }, j.ObjectExpression) as unknown as ObjectExpressionCollection;
    },
  };
  const methods: ObjectExpressionMethods = {
    removeProperty(this: ObjectExpressionCollection, name, modify) {
      return this.forEach((path) => {
        const properties = path.value.properties;
        const index = properties.findIndex((property) => isProperty(property, name));
        if (index >= 0) {
          const [removed] = properties.splice(index, 1);
          modify?.(path, removed);
        }
      });
    },
    renameProperty(this: ObjectExpressionCollection, name, newName, modify) {
      return this.forEach((path) => {
        const properties = path.value.properties;
        for (const property of properties) {
          if (property.type === "ObjectProperty") {
            const key = property.key;
            if (key.type === "Identifier" && key.name === name) {
              key.name = newName;
              modify?.(path, property);
            }
          }
        }
      });
    },
  };

  j.registerMethods(globalMethods);
  j.registerMethods(methods, j.ObjectExpression);
}

export function useObjectExpression(j: JSCodeshift) {
  usePlugin(j, objectExpressionPlugin);
}
