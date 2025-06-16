/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, it } from "vitest";
import type { Collection, JSCodeshift, Transform } from "jscodeshift";
import { applyTransform, defineInlineTest } from "jscodeshift/src/testUtils";
import postcss from "postcss";
import { parse, stringify } from "postcss-scss";

export const defaultOptions = {
  printOptions: {
    trailingComma: true,
    lineTerminator: "\n",
    tabWidth: 2,
  },
};

export function createDefineInlineTest(transform: Transform) {
  return (
    inputSource: string,
    expectedOutputSource: string,
    testName?: string
  ) => {
    defineInlineTest(
      {
        default: transform,
        parser: "tsx",
      },
      defaultOptions,
      inputSource,
      expectedOutputSource,
      testName
    );
  };
}

export function createDefineInlineCssTest(plugins: postcss.AcceptedPlugin[]) {
  return (inputCss: string, expectedOutputCss: string, testName: string) => {
    it(testName, () => {
      const processor = postcss(plugins);
      const result = processor.process(inputCss, {
        parser: parse,
        stringifier: stringify,
      });
      expect(result.css).toEqual(expectedOutputCss);
    });
  };
}

export type CollectionTransformer = (j: JSCodeshift, root: Collection) => void;

export function createApplyCollectionTransform(init: CollectionTransformer) {
  return (source: string, transform: CollectionTransformer) => {
    return applyTransform(
      createCollectionTransform((j, root) => {
        init(j, root);
        transform(j, root);
      }),
      {},
      { source }
    );
  };
}

export function createDefineInlineCollectionTest(init: CollectionTransformer) {
  return (
    transform: CollectionTransformer,
    inputSource: string,
    expectedOutputSource: string,
    testName?: string
  ) => {
    const defineTest = createDefineInlineTest(
      createCollectionTransform((j, root) => {
        init(j, root);
        transform(j, root);
      })
    );
    defineTest(inputSource, expectedOutputSource, testName);
  };
}

function createCollectionTransform(
  transformer: CollectionTransformer
): Transform {
  return (file, api, options) => {
    const j = api.jscodeshift;
    const root = j(file.source);
    transformer(j, root);
    return root.toSource(options.printOptions);
  };
}
