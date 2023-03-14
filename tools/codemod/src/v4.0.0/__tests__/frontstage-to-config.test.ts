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
    "transforms rightPanel correctly1"
  );

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      centerRight = {
        <Zone
          widgets = { this.props.widgets2 }
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
          widgets = { this.props.widgets1 }
        />
      }
    />
    `,
    `
    ({
      rightPanel: {
        sections: {
          start: [...this.props.widgets1, ...this.props.widgets2],

          end: [{
            id: 3,
          }],
        },
      },
    })
    `,
    "transforms rightPanel correctly2"
  );

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      bottomRight = {
        <Zone
          widgets = {[
            <Widget id={3}/>,
          ]}
        />
      }
    />
    `,
    `
    ({
      rightPanel: {
        sections: {
          end: [{
            id: 3,
          }],
        },
      },
    })
    `,
    "transforms rightPanel correctly3"
  );

  defineInlineTest(
    transform,
    {},
    `
    <Frontstage
      rightPanel = {
        <StagePanel
          panelZones = {{
            start: {
              widgets: [
                <Widget id={1}/>,
              ],
            },
            end: {
              widgets: [
                <Widget id={2}/>,
              ],
            },
          }}
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
          }],

          end: [{
            id: 2,
          }],
        },
      },
    })
    `,
    "transforms rightPanel correctly4"
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
