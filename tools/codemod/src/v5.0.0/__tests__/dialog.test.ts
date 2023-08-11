/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { defaultOptions, createDefineInlineTest } from "../../utils/TestUtils";
import transformer from "../dialog";

const defineInlineTest = createDefineInlineTest(transformer);

describe("dialog", () => {
  defineTest(__dirname, "./dialog", defaultOptions, "dialog", {
    parser: "tsx",
  });

  describe("attribute renames", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog
        opened={true}
        resizable={resizeEnabled}
        movable
      />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
        }}
        closeOnEsc={false}
        isOpen={true}
        isResizable={resizeEnabled}
        isDraggable>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should rename correctly"
    );

    //   defineInlineTest(
    //     `
    //     import { Dialog } from "@itwin/core-react";
    //     <Dialog
    //       opened={true}
    //       title="MyTitle"
    //       hideHeader
    //       header={header}
    //     />
    //     `,
    //     `
    //     `,
    //     "TitleBar"
    //   );
  });
});
