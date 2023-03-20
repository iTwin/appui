/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { Collection, JSCodeshift, Transform } from "jscodeshift";
import { applyTransform, defineInlineTest } from "jscodeshift/src/testUtils";

export const defaultOptions = {
  printOptions: {
    trailingComma: true,
  },
};

export function createDefineInlineTest(transform: Transform) {
  return (inputSource: string, expectedOutputSource: string, testName?: string) => {
    defineInlineTest(
      {
        default: transform,
        parser: "tsx",
      },
      {
        printOptions: {
          ...defaultOptions.printOptions,
          lineTerminator: "\n",
        },
      },
      inputSource,
      expectedOutputSource,
      testName,
    );
  };
};

export type CollectionTransformer = (j: JSCodeshift, root: Collection) => void;

export function createApplyCollectionTransform(init: CollectionTransformer) {
  return (source: string, transform: CollectionTransformer) => {
    return applyTransform(createCollectionTransform((j, root) => {
      init(j, root);
      transform(j, root);
    }), {}, { source });
  };
}

export function createDefineInlineCollectionTest(init: CollectionTransformer) {
  return (transform: CollectionTransformer, inputSource: string, expectedOutputSource: string, testName?: string) => {
    const defineTest = createDefineInlineTest(
      createCollectionTransform((j, root) => {
        init(j, root);
        transform(j, root);
      }),
    );
    defineTest(inputSource, expectedOutputSource, testName);
  };
}

function createCollectionTransform(transformer: CollectionTransformer): Transform {
  return (file, api, options) => {
    const j = api.jscodeshift;
    const root = j(file.source);
    transformer(j, root);
    return root.toSource(options.printOptions);
  };
}

// export function createInlineTransform(transform: Transform): Transform {
//   return (file, api, options) => {
//     options = { ...defaultOptions, ...options };
//     const source = transform(file, api, options);
//     if (!source || typeof source !== "string")
//       return;

//     const j = api.jscodeshift;
//     const root = j(source);
//     return root.toSource({
//       lineTerminator: "\n",
//       ...options.printOptions,
//     });
//   };
// }

// export function tsxModule(transform: Transform) {
//   return {
//     default: transform,
//     parser: "tsx" as const,
//   };
// }
