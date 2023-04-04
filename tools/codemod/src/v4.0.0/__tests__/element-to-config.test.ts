/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineTest } from "jscodeshift/src/testUtils";
import { defaultOptions, createDefineInlineTest } from "../../utils/testUtils";
import transformer from "../element-to-config";

const defineInlineTest = createDefineInlineTest(transformer);

describe("frontstage-to-config", () => {
  defineTest(__dirname, "./element-to-config", defaultOptions, "element-to-config/Frontstage", { parser: "tsx" });
  defineTest(__dirname, "./element-to-config", defaultOptions, "element-to-config/FrontstageStagePanel", { parser: "tsx" });
  defineTest(__dirname, "./element-to-config", defaultOptions, "element-to-config/Full", { parser: "tsx" });

  describe("panel transformations", () => {
    defineInlineTest(
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
      "adds all widgets to a single panel"
    );

    defineInlineTest(
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
      "uses spread operator"
    );

    defineInlineTest(
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
      "creates a new right panel"
    );

    defineInlineTest(
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
              middle: {
                widgets: [
                  <Widget id={2}/>,
                ],
              },
              end: {
                widgets: [
                  <Widget id={3}/>,
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
      "transforms panel zones correctly"
    );
    defineInlineTest(
      `
      <Frontstage
        rightPanel = {
          <StagePanel
            panelZones = {{
              start,
              middle: getMiddle(),
              end: this.panelZonesEndProps,
            }}
          />
        }
      />
      `,
      `
      ({
        rightPanel: {
          sections: {
            start: [...start.widgets, ...getMiddle().widgets],
            end: [...this.panelZonesEndProps.widgets],
          },
        },
      })
      `,
      "constructs member expressions"
    );
    defineInlineTest(
      `
      <Frontstage
        topMostPanel = {
          <StagePanel
            panelZones = {{
              start: { widgets: [<Widget id={3}/>] },
              end: { widgets: [<Widget id={4}/>] },
            }}
          />
        }
        topPanel = {
          <StagePanel
            panelZones = {{
              start: { widgets: [<Widget id={1}/>] },
              end: { widgets: [<Widget id={2}/>] },
            }}
          />
        }
      />
      `,
      `
      ({
        topPanel: {
          sections: {
            start: [{
              id: 1,
            }],

            end: [{
              id: 2,
            }, {
              id: 3,
            }, {
              id: 4,
            }],
          },
        },
      })
      `,
      "merges two stage panels"
    );
    defineInlineTest(
      `
      <Frontstage
        topMostPanel = {
          <StagePanel
            panelZones = {{
              start: { widgets: [<Widget id={3}/>] },
              end: { widgets: [<Widget id={4}/>] },
            }}
          />
        }
      />
      `,
      `
      ({
        topPanel: {
          sections: {
            end: [{
              id: 3,
            }, {
              id: 4,
            }],
          },
        },
      })
      `,
      "creates a new top panel"
    );
    defineInlineTest(
      `
      <StagePanel
        unknownAttribute = { unknownAttributeExpression }
        panelZones = {{
          start: { widgets: [<Widget id={3}/>] },
          end: { widgets: [<Widget id={4}/>] },
        }}
      />
      `,
      `
      ({
        sections: {
          start: [{
            id: 3,
          }],

          end: [{
            id: 4,
          }],
        },

        unknownAttribute: unknownAttributeExpression,
      })
      `,
      "does not destroy an unknown attribute"
    );
  });

  describe("tool widget transformations", () => {
    defineInlineTest(
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
    defineInlineTest(
      `
      <Frontstage
        contentManipulationTools = {
          <Zone
            allowsMerging = { true }
            widgets = { props.widgets }
          />
        }
      />
      `,
      `
      ({
        contentManipulation: props.widgets,
      })
      `,
      "unwraps tool widget"
    );
    defineInlineTest(
      `
      <Frontstage
        viewNavigationTools = {
          <Zone
            widgets = { [ <Widget id = {1} />, <Widget id = {2} /> ] }
          />
        }
      />
      `,
      `
      ({
        viewNavigation: {
          id: 1,
        },
      })
      `,
      "picks only the first widget"
    );
    defineInlineTest(
      `
      <Frontstage
        viewNavigationTools = {
          <Zone
            widgets = { [...props.widgets] }
          />
        }
      />
      `,
      `
      ({
        viewNavigation: props.widgets[0],
      })
      `,
      "forms member expression"
    );
    defineInlineTest(
      `
      <Frontstage
      toolSettings = {
          <Zone
            widgets = { [] }
          />
        }
      />
      `,
      `
      ({
        toolSettings: undefined,
      })
      `,
      "resolves to undefined"
    );
    defineInlineTest(
      `
      <Frontstage
        viewNavigationTools = {
          <Zone
            widgets = { this.props.hidden ? [] : [ this.props.widget ] }
          />
        }
      />
      `,
      `
      ({
        viewNavigation: this.props.hidden ? undefined : this.props.widget,
      })
      `,
      "handles conditional expression correctly"
    );
  });

  describe("unhandled attribute transformations", () => {
    defineInlineTest(
      `
      <Frontstage
        bottomRight = { this.bottomRight }
        rightPanel = { this.rightPanel }
      />
      `,
      `
      ({
        bottomRight: this.bottomRight,
        rightPanel: this.rightPanel,
      })
      `,
      "preserves unhandled attributes needed for rightPanel"
    );
    defineInlineTest(
      `
      <Frontstage
        bottomMostPanel = {
          <StagePanel
            panelZones = { this.props.panelZones }
          />
        }
        bottomPanel = {
          <StagePanel
            widgets = { [ <Widget id = {1} /> ] }
          />
        }
      />
      `,
      `
      ({
        bottomPanel: {
          sections: {
            start: [{
              id: 1,
            }],
          },
        },

        bottomMostPanel: {
          panelZones: this.props.panelZones,
        },
      })
      `,
      "preserves unhandled attributes needed for bottomPanel"
    );
  });

  defineInlineTest(
    `
    <Frontstage
      id
      version = {version}
    />
    `,
    `
    ({
      id,
      version,
    })
    `,
    "handles attributes as a shorthand property"
  );
  defineInlineTest(
    `
    <Frontstage
      contentManipulationTools
    />
    `,
    `
    ({
      contentManipulation: contentManipulationTools,
    })
    `,
    "handles shorthand attribute as a renamed property"
  );
  defineInlineTest(
    `
    <Frontstage
      id = {1}
      {...this.props}
      {...this.props2}
    />
    `,
    `
    ({
      id: 1,
      ...this.props,
      ...this.props2,
    })
    `,
    "correctly handles spread attributes"
  );
});
