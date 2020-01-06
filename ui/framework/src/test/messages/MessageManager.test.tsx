/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import TestUtils from "../TestUtils";
import { MessageManager } from "../../ui-framework";
import { NotifyMessageDetails, OutputMessagePriority, MessageBoxIconType } from "@bentley/imodeljs-frontend";
import { MessageSeverity } from "@bentley/ui-core";

describe("MessageManager", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  it("maxCachedMessages handled correctly", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    for (let i = 0; i < 500; i++) {
      const details = new NotifyMessageDetails(OutputMessagePriority.Debug, `A brief message - ${i}.`);
      MessageManager.addMessage(details);
    }
    expect(MessageManager.messages.length).to.eq(500);

    const details2 = new NotifyMessageDetails(OutputMessagePriority.Debug, `A brief message.`);
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(376);

    const newMax = 375;
    MessageManager.setMaxCachedMessages(newMax);
    expect(MessageManager.messages.length).to.be.lessThan(newMax);
  });

  it("getIconType should return proper icon type", () => {
    let details = new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.");
    expect(MessageManager.getIconType(details)).to.eq(MessageBoxIconType.Information);

    details = new NotifyMessageDetails(OutputMessagePriority.Warning, "A brief message.");
    expect(MessageManager.getIconType(details)).to.eq(MessageBoxIconType.Warning);

    details = new NotifyMessageDetails(OutputMessagePriority.Error, "A brief message.");
    expect(MessageManager.getIconType(details)).to.eq(MessageBoxIconType.Critical);

    details = new NotifyMessageDetails(OutputMessagePriority.Fatal, "A brief message.");
    expect(MessageManager.getIconType(details)).to.eq(MessageBoxIconType.Critical);

    details = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message.");
    expect(MessageManager.getIconType(details)).to.eq(MessageBoxIconType.NoSymbol);
  });

  it("getSeverity should return proper severity", () => {
    let details = new NotifyMessageDetails(OutputMessagePriority.Info, "A brief message.");
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Information);

    details = new NotifyMessageDetails(OutputMessagePriority.Warning, "A brief message.");
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Warning);

    details = new NotifyMessageDetails(OutputMessagePriority.Error, "A brief message.");
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Error);

    details = new NotifyMessageDetails(OutputMessagePriority.Fatal, "A brief message.");
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.Fatal);

    details = new NotifyMessageDetails(OutputMessagePriority.None, "A brief message.");
    expect(MessageManager.getSeverity(details)).to.eq(MessageSeverity.None);
  });

  it("non-duplicate message should be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const details1 = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.");
    MessageManager.addMessage(details1);
    expect(MessageManager.messages.length).to.eq(1);

    const details2 = new NotifyMessageDetails(OutputMessagePriority.Error, "Another brief message.");
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(2);
  });

  it("duplicate message should not be added to Message Center", () => {
    MessageManager.clearMessages();
    expect(MessageManager.messages.length).to.eq(0);

    const details1 = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.");
    MessageManager.addMessage(details1);
    expect(MessageManager.messages.length).to.eq(1);

    const details2 = new NotifyMessageDetails(OutputMessagePriority.Debug, "A brief message.");
    MessageManager.addMessage(details2);
    expect(MessageManager.messages.length).to.eq(1);
  });

});
