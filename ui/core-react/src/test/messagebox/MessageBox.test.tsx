/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  DialogButtonStyle,
  DialogButtonType,
  MessageSeverity,
} from "@itwin/appui-abstract";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MessageBox, MessageContainer } from "../../core-react.js";
import TestUtils from "../TestUtils.js";

describe("MessageBox", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiCore();
  });

  const buttonCluster = [
    {
      type: DialogButtonType.Close,
      buttonStyle: DialogButtonStyle.Primary,
      onClick: () => {},
    },
  ];

  describe("renders", () => {
    it("should render content in an open dialog", () => {
      render(
        <MessageBox
          opened={true}
          severity={MessageSeverity.Information}
          buttonCluster={buttonCluster}
        >
          <div>Content</div>
        </MessageBox>
      );

      screen.getByText("Content");
    });
  });

  describe("MessageContainer.getIconClassName", () => {
    (
      [
        ["None", MessageSeverity.None, ""],
        [
          "Information",
          MessageSeverity.Information,
          "core-message-box-information",
        ],
        ["Question", MessageSeverity.Question, "core-message-box-question"],
        ["Warning", MessageSeverity.Warning, "core-message-box-warning"],
        ["Error", MessageSeverity.Error, "core-message-box-error"],
        ["Fatal", MessageSeverity.Fatal, "core-message-box-fatal"],
        ["Success", MessageSeverity.Success, "core-message-box-success"],
      ] as [string, MessageSeverity, string][]
    ).map(([name, severity, className]) => {
      it(`icon class name for ${name}`, () => {
        expect(MessageContainer.getIconClassName(severity)).to.include(
          className
        );
      });
    });
  });
});
