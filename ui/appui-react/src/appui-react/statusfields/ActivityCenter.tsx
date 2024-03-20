/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Notification
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Centered } from "@itwin/core-react";
import { MessageManager } from "../messages/MessageManager";
import type { NotifyMessageType } from "../messages/ReactNotifyMessageDetails";
import { ProgressLinear, Text } from "@itwin/itwinui-react";
import { useTranslation } from "../Translation";

/** Activity Center Field React component.
 * @public
 */
export function ActivityCenterField(props: CommonProps) {
  const { translate } = useTranslation();
  const [message, setMessage] = React.useState<NotifyMessageType>("");
  const [percentage, setPercentage] = React.useState<number>(0);
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  React.useEffect(() => {
    return MessageManager.onActivityMessageUpdatedEvent.addListener((args) => {
      setMessage(args.message);
      setPercentage(args.percentage);
      setIsVisible(true);
    });
  }, []);

  React.useEffect(() => {
    return MessageManager.onActivityMessageCancelledEvent.addListener(() => {
      setIsVisible(false);
    });
  }, []);

  const openActivityMessage = () => {
    MessageManager.setupActivityMessageValues(message, percentage, true);
  };

  const isPercentageValid = percentage > 0 && percentage < 100;
  if (!isVisible || !isPercentageValid) return null;

  const moreDetails = translate("activityCenter.moreDetails");
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const tooltip = `${message}-${moreDetails}`;

  return (
    <Centered
      className={classnames("open-activity-message", props.className)}
      style={{
        height: "100%",
        minWidth: 120,
        padding: "0 8px",
        alignItems: "end",
        ...props.style,
      }}
      onClick={openActivityMessage}
      title={tooltip}
    >
      <ProgressLinear
        style={{
          flex: "1",
        }}
        value={percentage}
        labels={[
          <Text variant="small" key={0}>
            {percentage} {translate("activityCenter.percentComplete")}
          </Text>,
        ]}
      />
    </Centered>
  );
}
