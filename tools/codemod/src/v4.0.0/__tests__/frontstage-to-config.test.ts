/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest, defineTest } from "jscodeshift/src/testUtils";
import { tsxModule, createInlineTransform } from "../../utils/testUtils";
import transformer from "../frontstage-to-config";

const transform = tsxModule(createInlineTransform(transformer));

describe("frontstage-to-config", () => {
  defineTest(__dirname, "./frontstage-to-config", null, "frontstage-to-config/Frontstage", { parser: "tsx" });
  defineTest(__dirname, "./frontstage-to-config", null, "frontstage-to-config/Frontstage1", { parser: "tsx" });

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      centerRight = {
        <Zone
          widgets = {[
            <Widget id={2}/>,
          ]}
        />
      }
      bottomRight = {
        <Zone
          widgets = {[
            <Widget id={3}/>,
          ]}
        />
      }
      rightPanel = {
        <StagePanel
          widgets = {[
            <Widget id={1}/>,
          ]}
        />
      }
    />
    `,
    `
    ({
      rightPanel: {
        sections: {
          start: [{
            id: 1,
          }, {
            id: 2,
          }],

          end: [{
            id: 3,
          }],
        },
      },
    })
    `,
    "transforms rightPanel correctly"
  );

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      centerRight = {
        <Zone
          widgets = {[
            <Widget id={2}/>,
          ]}
        />
      }
      bottomRight = {
        <Zone
          widgets = {[
            <Widget id={3}/>,
          ]}
        />
      }
      rightPanel = {
        <StagePanel
          widgets = { this.props.widgets }
        />
      }
    />
    `,
    `
    ({
      rightPanel: {
        sections: {
          start: [...this.props.widgets, {
            id: 2,
          }],

          end: [{
            id: 3,
          }],
        },
      },
    })
    `,
    "transforms rightPanel correctly"
  );

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      viewNavigationTools = {
        <Zone
          widgets={[
            <Widget id={"viewNavigation"} />,
          ]}
        />
      }
      topRight = {
        <Zone
          widgets={[
            <Widget id={"topRight"} />,
          ]}
        />
      }
    />
    `,
    `
    ({
      viewNavigation: {
        id: "viewNavigation",
      },
    })
    `,
    "correctly chooses default tool widget handler"
  );


});
