/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { Collection, JSCodeshift, Transform } from "jscodeshift";
import { applyTransform, defineInlineTest } from "jscodeshift/src/testUtils";

export type TestTransformer = (j: JSCodeshift, root: Collection) => void;

export function createApplyTransform(init: TestTransformer) {
  return (source: string, transform: TestTransformer) => {
    return applyTransform(createTestTransform((j, root) => {
      init(j, root);
      transform(j, root);
    }), {}, { source });
  };
}

export function createDefineInlineTest(init: TestTransformer) {
  return (transform: TestTransformer, inputSource: string, expectedOutputSource: string, testName: string) => {
    return defineInlineTest(createTestTransform((j, root) => {
      init(j, root);
      transform(j, root);
    }), {}, inputSource, expectedOutputSource, testName);
  };
}

function createTestTransform(transformer: TestTransformer) {
  return tsxModule((file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);
    transformer(j, root);
    return root.toSource({
      lineTerminator: "\n",
    });
  });
}

export function createInlineTransform(transform: Transform) {
  return (file, api, options) => {
    const source = transform(file, api, options);
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
