/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Dialog as BaseDialog, DialogAlignment } from "@itwin/core-react";

<BaseDialog
  opened={opened}
  resizable={true}
  movable={false}
  inset={this.props.inset}
  trapFocus={trap ? true : undefined}
  hideHeader={this.props.hideHeader}
  modal={modal}
  header={header ?? <h>Header</h>}
  title="MyTitle"
  footer={this.props.footer}
  buttonCluster={[elem1, elem2]}
  alignment={DialogAlignment.Top}
  x={5}
  y={50}
  width="60px"
  height={"600"}
  minWidth={minWidth > 50 ? 100 : "30px"}
  minHeight={"50%"}
  maxWidth={this.props.maxWidth}
  maxHeight={maxHeight}
  modelessId={"modelessId-test"}
  contentClassName={classnames("core-dialog", className)}
  onClose={()=>setOpened(false)}
  onEscape={onEscape}
  onOutsideClick={(event)=>{}}
  onModelessPointerDown={someFunc}
  backgroundStyle={{color: "red"}}
  titleStyle={this.props.titleStyle}
  footerStyle={footerStyle}
  contentStyle={contentStyle}
  style={{...this.props.style}}
  data-testid="core-dialog-root"
  {...this.props}
>
  {<p>Something something something...</p>}
</BaseDialog>
