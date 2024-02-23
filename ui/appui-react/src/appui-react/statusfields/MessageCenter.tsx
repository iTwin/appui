/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import { OutputMessagePriority } from "@itwin/core-frontend";
import { Tabs } from "@itwin/itwinui-react";
import type { CommonProps } from "@itwin/itwinui-react/cjs/core/utils";
import * as React from "react";
// import type { CommonProps } from "@itwin/core-react";
import { Icon, MessageRenderer } from "@itwin/core-react";
import { Text } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import { MessageCenterDialog } from "../layout/footer/message-center/Dialog";
import { MessageCenter } from "../layout/footer/message-center/Indicator";
import { MessageCenterMessage } from "../layout/footer/message-center/Message";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageDetailsType } from "../messages/ReactNotifyMessageDetails";
import { StatusBar } from "../statusbar/StatusBar";
import { Popover } from "@itwin/itwinui-react";

/** Enum for the [[MessageCenterField]] active tab
 * @internal
 */
enum MessageCenterActiveTab {
  AllMessages,
  Problems,
}

/** State for the [[MessageCenterField]] React component
 * @internal
 */
interface MessageCenterState {
  activeTab: MessageCenterActiveTab;
  target: HTMLDivElement | null;
  messageCount: number;
  isOpen: boolean;
}

/** Message Center Field React component.
 * @public
 */
export const MessageCenterField: React.FC = () => {
  const _indicator = React.createRef<HTMLDivElement>();
  const activeTab = MessageCenterActiveTab.AllMessages;
  const messageCount = MessageManager.messages.length;
  const _title = UiFramework.translate("messageCenter.messages");
  const tooltip = `${messageCount} ${_title}`;
  const divStyle = { height: "100%" }; // this would be better as a class

  const [isOpen, setIsOpen] = React.useState(false);

  // Event Handlers

  const _handleOpenChange = (isOpenState: boolean) => {
    setIsOpen(isOpenState);
  };

  const isProblemStatus = (priority: OutputMessagePriority): boolean => {
    // See priority values in DgnPlatform defined in NotificationManager

    if (
      priority === OutputMessagePriority.Error ||
      priority === OutputMessagePriority.Fatal
    )
      return true;

    return false;
  };

  const getMessages = (): React.ReactChild[] => {
    const messages = MessageManager.messages.slice(0).reverse();
    const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

    messages.forEach((details: NotifyMessageDetailsType, index: number) => {
      /* istanbul ignore else */
      if (
        activeTab === MessageCenterActiveTab.AllMessages ||
        isProblemStatus(details.priority)
      ) {
        const iconClassName = MessageManager.getIconClassName(details);
        const iconSpec = MessageManager.getIconSpecFromDetails(details);
        const message = details.briefMessage;

        tabRows.push(
          <MessageCenterMessage
            key={index.toString()}
            icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
          >
            <MessageRenderer message={message} useSpan />
            {details.detailedMessage && (
              <Text variant="small">
                <MessageRenderer message={details.detailedMessage} />
              </Text>
            )}
          </MessageCenterMessage>
        );
      }
    });

    return tabRows;
  };

  const messageCenterContent = (
    <MessageCenterDialog
      prompt={UiFramework.translate("messageCenter.prompt")}
      title={_title}
    >
      <Tabs.Wrapper type="pill">
        <Tabs.TabList>
          <Tabs.Tab label="All" key="all" value="all" />,
          <Tabs.Tab label="Error" key="error" value="error" />,
        </Tabs.TabList>
        <Tabs.Panel value="all" key="all">
          {getMessages()}
        </Tabs.Panel>
      </Tabs.Wrapper>
    </MessageCenterDialog>
  );

  return (
    <Popover content={messageCenterContent} applyBackground>
      <div style={divStyle} title={tooltip}>
        <MessageCenter
          indicatorRef={_indicator}
          label={_title}
          onClick={() => _handleOpenChange(!isOpen)}
          messages={}
        >
          {messageCount.toString()}
        </MessageCenter>
      </div>
    </Popover>
  );

  // return (
  //   <>
  //     <div className={className} style={divStyle} title={tooltip}>
  //       <MessageCenter
  //         indicatorRef={_indicator}
  //         label={_title}
  //         onClick={() => _handleOpenChange(!isOpen)}
  //       >
  //         {messageCount.toString()}
  //       </MessageCenter>
  //     </div>
  //     <StatusBar.Popup
  //       showArrow={false}
  //       isOpen={isOpen}
  //       onClose={() => _handleOpenChange(false)}
  //       onOutsideClick={_handleOutsideClick}
  //       target={_indicator.current}
  //     >
  //       <MessageCenterDialog
  //         prompt={UiFramework.translate("messageCenter.prompt")}
  //         title={_title}
  //       >
  //         <Tabs.Wrapper type="pill">
  //           <Tabs.TabList>
  //             <Tabs.Tab label="All" key="all" value="all" />,
  //             <Tabs.Tab label="Error" key="error" value="error" />,
  //           </Tabs.TabList>
  //           <Tabs.Panel value="all" key="all">
  //             {getMessages()}
  //           </Tabs.Panel>
  //         </Tabs.Wrapper>
  //       </MessageCenterDialog>
  //     </StatusBar.Popup>
  //   </>
  // );
};

// React.useRef(() => {
//   _unloadMessagesUpdatedHandler =
//     MessageManager.onMessagesUpdatedEvent.addListener(
//       _handleMessagesUpdatedEvent
//     );
//   _removeOpenMessagesCenterHandler =
//     MessageManager.onOpenMessageCenterEvent.addListener(
//       _handleOpenMessageCenterEvent
//     );
//   MessageManager.registerAnimateOutToElement(_indicator.current);

//   return () => {
//     if (_unloadMessagesUpdatedHandler) {
//       _unloadMessagesUpdatedHandler();
//       _unloadMessagesUpdatedHandler = undefined;
//     }
//     // istanbul ignore else
//     if (_removeOpenMessagesCenterHandler) {
//       _removeOpenMessagesCenterHandler();
//       _removeOpenMessagesCenterHandler = undefined;
//     }
//   };
// });

// /** Message Center Field React component.
//  * @public
//  */
// export class MessageCenterField extends React.Component<
//   CommonProps,
//   MessageCenterState
// > {
//   private _indicator = React.createRef<HTMLDivElement>();
//   private _title = UiFramework.translate("messageCenter.messages");
//   private _unloadMessagesUpdatedHandler?: () => void;
//   private _removeOpenMessagesCenterHandler?: () => void;

//   constructor(p: CommonProps) {
//     super(p);

//     this.state = {
//       activeTab: MessageCenterActiveTab.AllMessages,
//       target: null,
//       messageCount: MessageManager.messages.length,
//       isOpen: false,
//     };
//   }

//   /** @internal */
//   public override componentDidMount() {
//     this._unloadMessagesUpdatedHandler =
//       MessageManager.onMessagesUpdatedEvent.addListener(
//         this._handleMessagesUpdatedEvent,
//         this
//       );
//     this._removeOpenMessagesCenterHandler =
//       MessageManager.onOpenMessageCenterEvent.addListener(
//         this._handleOpenMessageCenterEvent,
//         this
//       );
//     MessageManager.registerAnimateOutToElement(this._indicator.current);
//   }

//   /** @internal */
//   public override componentWillUnmount() {
//     // istanbul ignore else
//     if (this._unloadMessagesUpdatedHandler) {
//       this._unloadMessagesUpdatedHandler();
//       this._unloadMessagesUpdatedHandler = undefined;
//     }
//     // istanbul ignore else
//     if (this._removeOpenMessagesCenterHandler) {
//       this._removeOpenMessagesCenterHandler();
//       this._removeOpenMessagesCenterHandler = undefined;
//     }
//   }

//   private _handleMessagesUpdatedEvent = () => {
//     // istanbul ignore else
//     if (this._unloadMessagesUpdatedHandler)
//       this.setState({ messageCount: MessageManager.messages.length });
//   };

//   private _handleOpenMessageCenterEvent = () => {
//     this.setIsOpen(true);
//   };

//   public override render(): React.ReactNode {
//     const tooltip = `${this.state.messageCount} ${this._title}`;
//     const divStyle = { ...this.props.style, height: "100%" };
//     const footerMessages = (
//       <>
//         <div className={this.props.className} style={divStyle} title={tooltip}>
//           <MessageCenter
//             indicatorRef={this._indicator}
//             label={this._title}
//             onClick={this._handleMessageIndicatorClick}
//           >
//             {this.state.messageCount.toString()}
//           </MessageCenter>
//         </div>
//         <StatusBar.Popup
//           showArrow={false}
//           isOpen={this.state.isOpen}
//           onClose={this._handleClose}
//           onOutsideClick={this._handleOutsideClick}
//           target={this._indicator.current}
//         >
//           <MessageCenterDialog
//             prompt={UiFramework.translate("messageCenter.prompt")}
//             title={this._title}
//           >
//             <Tabs
//               type="pill"
//               labels={[
//                 <Tab key="All" label="All" />,
//                 <Tab key="Errors" label="Errors" />,
//               ]}
//             >
//               {"content"}
//             </Tabs>
//             {this.getMessages()}
//           </MessageCenterDialog>
//         </StatusBar.Popup>
//       </>
//     );

//     return footerMessages;
//   }

//   private _handleClose = () => {
//     this.setIsOpen(false);
//   };

//   private _handleOutsideClick = (e: MouseEvent) => {
//     if (
//       !this._indicator.current ||
//       !(e.target instanceof Node) ||
//       this._indicator.current.contains(e.target)
//     )
//       return;

//     this._handleClose();
//   };

//   private _handleMessageIndicatorClick = () => {
//     this.setIsOpen(!this.state.isOpen);
//   };

//   private _changeActiveTab = (tab: MessageCenterActiveTab) => {
//     this.setState({ activeTab: tab });
//   };

//   private getMessages(): React.ReactChild[] {
//     const messages = MessageManager.messages.slice(0).reverse();
//     const tabRows: React.ReactChild[] = new Array<React.ReactChild>();

//     messages.forEach((details: NotifyMessageDetailsType, index: number) => {
//       /* istanbul ignore else */
//       if (
//         this.state.activeTab === MessageCenterActiveTab.AllMessages ||
//         this.isProblemStatus(details.priority)
//       ) {
//         const iconClassName = MessageManager.getIconClassName(details);
//         const iconSpec = MessageManager.getIconSpecFromDetails(details);
//         const message = details.briefMessage;

//         tabRows.push(
//           <MessageCenterMessage
//             key={index.toString()}
//             icon={<Icon iconSpec={iconSpec} className={iconClassName} />}
//           >
//             <MessageSpan message={message} />
//             {details.detailedMessage && (
//               <MessageDiv
//                 className="iui-text-small"
//                 message={details.detailedMessage}
//               />
//             )}
//           </MessageCenterMessage>
//         );
//       }
//     });

//     return tabRows;
//   }

//   private isProblemStatus(priority: OutputMessagePriority): boolean {
//     // See priority values in DgnPlatform defined in NotificationManager

//     if (
//       priority === OutputMessagePriority.Error ||
//       priority === OutputMessagePriority.Fatal
//     )
//       return true;

//     return false;
//   }

//   private setIsOpen(isOpen: boolean) {
//     this.setState({ isOpen });
//   }
// }
