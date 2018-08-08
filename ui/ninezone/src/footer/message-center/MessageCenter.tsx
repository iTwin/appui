/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module MessageCenter */

import * as classnames from "classnames";
import * as React from "react";

import CommonProps, { NoChildrenProps } from "../../utilities/Props";
import Direction from "../../utilities/Direction";
import Popover from "../../popup/popover/Triangle";
import Dialog from "../message/content/dialog/Dialog";
import TitleBar from "../message/content/dialog/TitleBar";
import Title from "../message/content/dialog/Title";
export { DialogButton as MessageCenterButton } from "../message/content/dialog/Button";
import Content from "./Content";
import "./MessageCenter.scss";

/** Properties of [[MessageCenter]] component. */
export interface MessageCenterProps extends CommonProps, NoChildrenProps {
  /** Title of title bar. */
  title?: string;
  /** Title bar buttons. I.e.: [[DialogButton]] */
  buttons?: React.ReactNode;
  /** Tabs of message center. See [[MessageCenterTab]] */
  tabs?: React.ReactNode;
  /** Messages of message center. I.e. [[Message]] */
  messages?: React.ReactNode;
}

/** Message center dialog used in [[MessageCenterIndicator]] component. */
// tslint:disable-next-line:variable-name
export const MessageCenter: React.StatelessComponent<MessageCenterProps> = (props) => {
  const dialogClassName = classnames(
    "nz-footer-messageCenter-messageCenter",
    props.className);

  return (
    <Popover
      className={dialogClassName}
      style={props.style}
      direction={Direction.Top}
      content={
        <Dialog
          titleBar={
            <TitleBar
              title={
                <Title text={props.title} />
              }
              buttons={props.buttons}
            />
          }
          content={
            <Content
              tabs={props.tabs}
              messages={props.messages}
            />
          }
        />
      }
    />
  );
};

export default MessageCenter;
