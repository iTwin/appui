/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";

import TestUtils from "../../TestUtils";
import { ConfigurableUiManager, FrontstageManager, FrontstageProvider, Frontstage, Zone, Widget, FrontstageProps, ConfigurableCreateInfo, ToolUiProvider, ContentControl, CoreTools } from "../../../ui-framework";
import { ToolAssistanceItem } from "@bentley/ui-ninezone";
import { ToolInformation } from "../../../ui-framework/zones/toolsettings/ToolInformation";

describe("ToolUiProvider", () => {

  class Tool2UiProvider extends ToolUiProvider {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.toolSettingsNode = <Tool2Settings />;
      this.toolAssistanceNode = <Tool2Assistance />;
    }

    public execute(): void {
    }
  }

  class Tool2Settings extends React.Component {
    public render(): React.ReactNode {
      return (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Type</th>
                <th>Input</th>
              </tr>
              <tr>
                <td>Month</td>
                <td> <input type="month" /> </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  class Tool2Assistance extends React.Component {
    public render(): React.ReactNode {
      return (
        <>
          <ToolAssistanceItem>
            <i className="icon icon-cursor" />
            Identify piece to trim
          </ToolAssistanceItem>
        </>
      );
    }
  }

  const testToolId = "ToolUiProvider-TestTool";

  before(async () => {
    await TestUtils.initializeUiFramework();

    class Frontstage1 extends FrontstageProvider {
      public get frontstage(): React.ReactElement<FrontstageProps> {
        return (
          <Frontstage
            id="ToolUiProvider-TestFrontstage"
            defaultTool={CoreTools.selectElementCommand}
            defaultLayout="FourQuadrants"
            contentGroup="TestContentGroup1"
            topCenter={
              <Zone
                widgets={[
                  <Widget isToolSettings={true} />,
                ]}
              />
            }
          />
        );
      }
    }

    const frontstageProvider = new Frontstage1();
    ConfigurableUiManager.addFrontstageProvider(frontstageProvider);

    ConfigurableUiManager.registerControl(testToolId, Tool2UiProvider);
  });

  it("starting a tool with tool settings", () => {
    const frontstageDef = FrontstageManager.findFrontstageDef("ToolUiProvider-TestFrontstage");
    expect(frontstageDef).to.not.be.undefined;

    if (frontstageDef) {
      FrontstageManager.setActiveFrontstageDef(frontstageDef); // tslint:disable-line:no-floating-promises

      FrontstageManager.ensureToolInformationIsSet(testToolId);
      FrontstageManager.setActiveToolId(testToolId);
      expect(FrontstageManager.activeToolId).to.eq(testToolId);

      const toolInformation = FrontstageManager.activeToolInformation;
      expect(toolInformation).to.not.be.undefined;

      if (toolInformation) {
        const toolUiProvider = toolInformation.toolUiProvider;
        expect(toolUiProvider).to.not.be.undefined;

        if (toolUiProvider) {
          expect(toolUiProvider.toolSettingsNode).to.not.be.undefined;
          expect(toolUiProvider.toolAssistanceNode).to.not.be.undefined;
        }
      }

      const toolSettingsNode = FrontstageManager.activeToolSettingsNode;
      expect(toolSettingsNode).to.not.be.undefined;
      const toolAssistanceNode = FrontstageManager.activeToolAssistanceNode;
      expect(toolAssistanceNode).to.not.be.undefined;
    }
  });

  class TestContentControl extends ContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div />;
    }
  }

  it("ToolInformation with invalid ToolUiProvider should throw Error", () => {
    ConfigurableUiManager.registerControl("ToolTest1", TestContentControl);
    const toolInfo = new ToolInformation("ToolTest1");
    expect(() => toolInfo.toolUiProvider).to.throw(Error);
    ConfigurableUiManager.unregisterControl("ToolTest1");
  });

});
