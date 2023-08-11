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

  describe("TitleBar", () => {
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog title="MyTitle" titleStyle={props.style} />
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
          <Dialog.TitleBar titleText="MyTitle" style={props.style} />
        </Dialog.Main>
      </Dialog>
      `,
      "should move attributes to TitleBar"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog hideHeader />
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
      </Dialog>
      `,
      "should not add TitleBar expression when hideHeader value is null"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog hideHeader={true} />
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
      </Dialog>
      `,
      "should not add TitleBar expression when hideHeader value is true"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog hideHeader={getHideHeaderValue(this)} />
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
          {!getHideHeaderValue(this) && <Dialog.TitleBar />}
        </Dialog.Main>
      </Dialog>
      `,
      "should add logical expression (&&) with negated hideHeader value and TitleBar"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog hideHeader={false} />
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
      "should not add hideHeader in TitleBar expression when hideHeader value is false"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog hideHeader={hideHeaderVal} header={headerVal} />
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
          {!hideHeaderVal && (headerVal || <Dialog.TitleBar />)}
        </Dialog.Main>
      </Dialog>
      `,
      "should add nested logical expressions with negated hideHeader value, header value and TitleBar"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog header={headerVal} />
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
          {headerVal || <Dialog.TitleBar />}
        </Dialog.Main>
      </Dialog>
      `,
      "should add logical expression (||) with header value and TitleBar"
    );
    defineInlineTest(
      `
      import { Dialog } from "@itwin/core-react";
      <Dialog header={<h>Header</h>} />
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
          <h>Header</h>
        </Dialog.Main>
      </Dialog>
      `,
      "should add only header as TitleBar expression"
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
  });*/
});
