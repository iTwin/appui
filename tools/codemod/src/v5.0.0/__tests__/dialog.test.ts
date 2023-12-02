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
      import { Dialog } from "@itwin/itwinui-react";
      <Dialog
        preventDocumentScroll={true}
        closeOnEsc={false}
        style={{
          zIndex: "var(--uicore-z-index-dialog)",
          color:"red",
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
      import { Dialog } from "@itwin/itwinui-react";
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
  describe("Main", () => {
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

    describe("Content", () => {
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog>{"Example"}</Dialog>
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
          <Dialog.Content>{"Example"}</Dialog.Content>
        </Dialog.Main>
      </Dialog>
      `,
        "should add Content element with Dialog child elements"
      );
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog contentStyle={{top: 5}}/>
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
          <Dialog.Content style={{top: 5}}></Dialog.Content>
        </Dialog.Main>
      </Dialog>
      `,
        "should add Content element with style"
      );
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog contentClassName="dialogContentClassName"/>
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
          <Dialog.Content className="dialogContentClassName"></Dialog.Content>
        </Dialog.Main>
      </Dialog>
      `,
        "should add Content element with className"
      );
    });

    describe("ButtonBar", () => {
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog footer={myFooter} />
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
          {myFooter}
        </Dialog.Main>
      </Dialog>
      `,
        "should add footer expression"
      );
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog footer={<Button>ClickMe</Button>} />
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
          <Button>ClickMe</Button>
        </Dialog.Main>
      </Dialog>
      `,
        "should add footer element"
      );

      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog footerStyle={{top: 5}} />
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
          <Dialog.ButtonBar style={{top: 5}}> </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
      `,
        "should add ButtonBar when footerStyle has a value"
      );
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog buttonCluster={buttons} />
      `,
        `
      import { parseButtonCluster } from "@itwin/core-react";
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
          <Dialog.ButtonBar>
            {parseButtonCluster(buttons)}
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
      `,
        "should add ButtonBar with parse function when buttonCluster has an identifier value"
      );
      defineInlineTest(
        `
      import { Dialog } from "@itwin/core-react";
      <Dialog buttonCluster={[buttonDef1, ...buttonDef2]} />
      `,
        `
      import { parseButtonCluster } from "@itwin/core-react";
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
          <Dialog.ButtonBar>
            {parseButtonCluster([buttonDef1, ...buttonDef2])}
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
      `,
        "should add ButtonBar with parse function when buttonCluster has an array expression value"
      );
    });
  });
  describe("DivWithOutsideClick", () => {
    defineInlineTest(
      `
    import { Dialog } from "@itwin/core-react";
    <Dialog onOutsideClick={closeDialog} />
    `,
      `
    import { DivWithOutsideClick } from "@itwin/core-react";
    import { Dialog } from "@itwin/itwinui-react";
    <Dialog
      preventDocumentScroll={true}
      style={{
        zIndex: "var(--uicore-z-index-dialog)",
      }}
      closeOnEsc={false}>
      <Dialog.Backdrop />
      <DivWithOutsideClick onOutsideClick={closeDialog}>
        <Dialog.Main>
          <Dialog.TitleBar />
        </Dialog.Main>
      </DivWithOutsideClick>
    </Dialog>
    `,
      "should add ButtonBar with parse function when buttonCluster has an array expression value"
    );
  });
});
