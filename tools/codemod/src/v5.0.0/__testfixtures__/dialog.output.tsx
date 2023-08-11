/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Dialog as BaseDialog } from "@itwin/itwinui-react";

import { DialogAlignment, DivWithOutsideClick, getCssVariable, parseButtonCluster } from "@itwin/core-react";

<BaseDialog
  preventDocumentScroll={modal}
  closeOnEsc={false}
  isOpen={opened}
  isResizable={true}
  isDraggable={false}
  inset={this.props.inset}
  trapFocus={trap ? true : undefined}
  alignment={DialogAlignment.Top}
  x={5}
  y={50}
  modelessId={"modelessId-test"}
  onClose={()=>setOpened(false)}
  onEscape={onEscape}
  onModelessPointerDown={someFunc}
  style={{
    zIndex: getCssVariable("--uicore-z-index-dialog"),
    ...this.props.style,
  }}
  data-testid="core-dialog-root"
  {...this.props}>
  {modal && <Dialog.Backdrop style={{color: "red"}} />}
  <DivWithOutsideClick onOutsideClick={(event)=>{}}>
    <Dialog.Main
      style={{
        height: "600",
        minWidth: minWidth > 50 ? 100 : "30px",
        minHeight: "50%",
        maxWidth: this.props.maxWidth,
        maxHeight: maxHeight,
      }}>
      {!this.props.hideHeader && ((header ?? <h>Header</h>) || <Dialog.TitleBar titleText="MyTitle" style={this.props.titleStyle} />)}
      <Dialog.Content className={classnames("core-dialog", className)} style={contentStyle}>
        {<p>Something something something...</p>}
      </Dialog.Content>
      {this.props.footer || <Dialog.ButtonBar style={footerStyle}>
        {parseButtonCluster([elem1, elem2])}
      </Dialog.ButtonBar>}
    </Dialog.Main>
  </DivWithOutsideClick>
</Dialog>
