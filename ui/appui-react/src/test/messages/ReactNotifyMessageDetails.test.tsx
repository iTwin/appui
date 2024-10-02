/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { BeDuration } from "@itwin/core-bentley";
import { OutputMessagePriority } from "@itwin/core-frontend";
import { RelativePosition } from "@itwin/appui-abstract";
import { ReactNotifyMessageDetails } from "../../appui-react.js";
import { isReactNotifyMessageDetails } from "../../appui-react/messages/ReactNotifyMessageDetails.js";

describe("ReactNotifyMessageDetails", () => {
  it("should support React node & create NotifyMessageDetails", () => {
    const reactNode = <span>Test</span>;
    const reactMessage = { reactNode };
    const details = new ReactNotifyMessageDetails(
      OutputMessagePriority.Debug,
      reactMessage
    );
    expect(details.messageDetails).toBeTruthy();
    expect(details.briefMessage).toHaveProperty("reactNode");
    expect(isReactNotifyMessageDetails(details)).toEqual(true);
  });

  it("should support setPointerTypeDetails", () => {
    const reactNode = <span>Test</span>;
    const reactMessage = { reactNode };
    const details = new ReactNotifyMessageDetails(
      OutputMessagePriority.Debug,
      reactMessage
    );

    const newSpan = document.createElement("span");
    const point = { x: 10, y: 10 };
    details.setPointerTypeDetails(newSpan, point);
    expect(details.viewport).toEqual(newSpan);
    expect(
      details.displayPoint !== undefined &&
        details.displayPoint.isExactEqual(point)
    ).toEqual(true);
    expect(details.relativePosition).toEqual(RelativePosition.TopRight);
  });

  it("should support setPointerTypeDetails", () => {
    const reactNode = <span>Test</span>;
    const reactMessage = { reactNode };
    const details = new ReactNotifyMessageDetails(
      OutputMessagePriority.Debug,
      reactMessage
    );

    const newSpan = document.createElement("span");
    details.setInputFieldTypeDetails(newSpan);
    expect(details.inputField).toEqual(newSpan);
  });

  it("should support displayTime", () => {
    const reactNode = <span>Test</span>;
    const reactMessage = { reactNode };
    const details = new ReactNotifyMessageDetails(
      OutputMessagePriority.Debug,
      reactMessage
    );

    details.displayTime = BeDuration.fromSeconds(5);
    expect(details.displayTime.milliseconds).toEqual(5000);
  });
});
