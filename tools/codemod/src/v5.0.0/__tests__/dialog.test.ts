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
  });

  describe("attribute additions", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
        }}
        closeOnEsc={false}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should add closeOnEsc"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
        }}
        closeOnEsc={false}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should add preventDocumentScroll={true}"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog modal={modalVal} />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={modalVal}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
        }}
        closeOnEsc={false}>
        {modalVal && <Dialog.Backdrop />}
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should add preventDocumentScroll={modalVal}"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
        }}
        closeOnEsc={false}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      'should add style={{zIndex: "var(--uicore-z-index-dialog)"}}'
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog style={props.style} />
      `,
      `
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        closeOnEsc={false}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
          ...props.style,
        }}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should create new style object"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog style={{color:"red"}} />
      `,
      `
      import { Dialog } from \"@itwin/itwinui-react\";
      <Dialog
        preventDocumentScroll={true}
        closeOnEsc={false}
        style={{
          zIndex: \"var(--uicore-z-index-dialog)\",
          color:\"red\",
        }}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should append existing style object"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog style={{zIndex:9000}} />
      `,
      `
      import { Dialog } from \"@itwin/itwinui-react\";
      <Dialog preventDocumentScroll={true} closeOnEsc={false} style={{zIndex:9000}}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </Dialog>
      `,
      "should not append existing style object"
    );
  });

  /*describe("", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      `,
      `
      `,
      "should "
    );
  });

  describe("", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      `,
      `
      `,
      "should "
    );
  });

  describe("", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      `,
      `
      `,
      "should "
    );
  });*/
});
