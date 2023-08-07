/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { defaultOptions, createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../dialog";

const defineInlineTest = createDefineInlineTest(transformer);

describe("dialog", () => {
  defineInlineTest(
    `
    import { Dialog } from "@itwin/core-react";
    <Dialog
      opened={true}
    />
    `,
    `
    `,
    "attribute rename"
  );

  defineInlineTest(
    `
    import { Dialog } from "@itwin/core-react";
    <Dialog
      opened={true}
      title="MyTitle"
      hideHeader
      header={header}
    />
    `,
    `
    `,
    "TitleBar"
  );
});
