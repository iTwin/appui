/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { PropertyRecordEditor } from "@itwin/components-react";
import { action } from "storybook/actions";
import { AppUiDecorator } from "../Decorators";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTextRecord(value: string, name: string, label: string) {
  return new PropertyRecord(
    { valueFormat: PropertyValueFormat.Primitive, value },
    { name, typename: "string", displayLabel: label }
  );
}

function makeNumericRecord(value: number, name: string, label: string) {
  return new PropertyRecord(
    { valueFormat: PropertyValueFormat.Primitive, value },
    { name, typename: "number", displayLabel: label }
  );
}

function makeEnumRecord(
  value: number,
  name: string,
  label: string,
  choices: { label: string; value: number }[]
) {
  return new PropertyRecord(
    { valueFormat: PropertyValueFormat.Primitive, value },
    { name, typename: "enum", displayLabel: label, enum: { choices } }
  );
}

function makeBooleanRecord(value: boolean, name: string, label: string) {
  return new PropertyRecord(
    { valueFormat: PropertyValueFormat.Primitive, value },
    { name, typename: "boolean", displayLabel: label }
  );
}

// ---------------------------------------------------------------------------
// Shared editor row layout
// ---------------------------------------------------------------------------

interface EditorRowProps {
  label: string;
  propertyName: string;
  record: PropertyRecord;
  editorSystem?: "new" | "legacy";
}

function EditorRow({ label, propertyName, record, editorSystem }: EditorRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <label
        htmlFor={propertyName}
        style={{ minWidth: 140, fontWeight: 500, fontSize: 14 }}
      >
        {label}
      </label>
      <div style={{ flex: 1, maxWidth: 280 }}>
        <PropertyRecordEditor
          propertyRecord={record}
          onCommit={action("onCommit")}
          onCancel={action("onCancel")}
          editorSystem={editorSystem === "new" ? "new" : undefined}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Story components
// ---------------------------------------------------------------------------

/** All editor types with working label association (new editor system). */
function AllEditorsNew() {
  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <h3 style={{ marginBottom: 16 }}>New editor system — click any label to focus its input</h3>
      <EditorRow
        label="Description"
        propertyName="description"
        record={makeTextRecord("My value", "description", "Description")}
        // editorSystem="new"
      />
      <EditorRow
        label="Max Points"
        propertyName="maxPoints"
        record={makeNumericRecord(100, "maxPoints", "Max Points")}
        // editorSystem="new"
      />
      <EditorRow
        label="Arc Type"
        propertyName="arcType"
        record={makeEnumRecord(0, "arcType", "Arc Type", [
          { label: "Clockwise", value: 0 },
          { label: "Counter-clockwise", value: 1 },
          { label: "Shortest", value: 2 },
        ])}
        // editorSystem="new"
      />
      <EditorRow
        label="Snap to Grid"
        propertyName="snapToGrid"
        record={makeBooleanRecord(false, "snapToGrid", "Snap to Grid")}
        // editorSystem="new"
      />
      <EditorRow
        label="Show Preview"
        propertyName="showPreview"
        record={new PropertyRecord(
          { valueFormat: PropertyValueFormat.Primitive, value: true },
          { name: "showPreview", typename: "bool", displayLabel: "Show Preview" }
        )}
        // editorSystem="new"
      />
    </div>
  );
}

/** The specific arc-drawing ToolSettings use case: two enum selects distinguishable by label. */
function ArcDrawingToolSettings() {
  const arcTypeChoices = [
    { label: "Clockwise", value: 0 },
    { label: "Counter-clockwise", value: 1 },
    { label: "Shortest", value: 2 },
  ];
  const methodChoices = [
    { label: "3 Points", value: 0 },
    { label: "Center + Radius", value: 1 },
    { label: "Start/End/Mid", value: 2 },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <h3 style={{ marginBottom: 4 }}>Arc Drawing — ToolSettings</h3>
      <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>
        Both selects previously shared the same <code>data-testid</code>, making
        them indistinguishable in tests. With the a11y fix, each is uniquely
        accessible via its label.
      </p>
      <EditorRow
        label="Arc Type"
        propertyName="arcType"
        record={makeEnumRecord(0, "arcType", "Arc Type", arcTypeChoices)}
        editorSystem="new"
      />
      <EditorRow
        label="Draw Method"
        propertyName="drawMethod"
        record={makeEnumRecord(0, "drawMethod", "Draw Method", methodChoices)}
        editorSystem="new"
      />
      <EditorRow
        label="Radius"
        propertyName="radius"
        record={makeNumericRecord(5.0, "radius", "Radius")}
        editorSystem="new"
      />
    </div>
  );
}

/**
 * Shows all legacy editor types with annotated targeting strategies.
 *
 * Targeting summary:
 *  - string  → `id` = property name   → use `#name` or `getByLabelText`
 *  - number  → no `id` or `data-testid` on the input itself
 *  - enum    → `data-testid="components-select-editor"` (fixed, not unique)
 *  - boolean → `data-testid="components-checkbox-editor"` (fixed, not unique)
 *  - toggle  → `data-testid="components-toggle-editor"` (fixed, not unique)
 *  - wrapper → `data-testid="editor-container"` (also fixed for every editor)
 */
function LegacyEditorTargeting() {
  const noop = () => {};

  const rows: { label: string; record: PropertyRecord; strategy: string; selector: string }[] = [
    {
      label: "Name (string)",
      record: makeTextRecord("Alice", "name", "Name"),
      strategy: "id = property name",
      selector: '#name  /  getByLabelText("Name")',
    },
    {
      label: "Count (number)",
      record: makeNumericRecord(42, "count", "Count"),
      strategy: "⚠ no id / data-testid on <input>",
      selector: "no unique selector available",
    },
    {
      label: "Arc Type (enum)",
      record: makeEnumRecord(0, "arcType", "Arc Type", [
        { label: "Clockwise", value: 0 },
        { label: "CCW", value: 1 },
      ]),
      strategy: 'data-testid (hardcoded default)',
      selector: 'getByTestId("components-select-editor")',
    },
    {
      label: "Snap (boolean)",
      record: makeBooleanRecord(false, "snap", "Snap"),
      strategy: 'data-testid (hardcoded default)',
      selector: 'getByTestId("components-checkbox-editor")',
    },
    {
      label: "Preview (toggle)",
      record: new PropertyRecord(
        { valueFormat: PropertyValueFormat.Primitive, value: true },
        { name: "preview", typename: "bool", displayLabel: "Preview", editor: { name: "toggle" } }
      ),
      strategy: 'data-testid (hardcoded default)',
      selector: 'getByTestId("components-toggle-editor")',
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 680, fontFamily: "sans-serif" }}>
      <h3 style={{ marginBottom: 4 }}>Legacy editor system — targeting strategies</h3>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
        Inspect the DOM to verify the selectors. Note that enum/boolean/toggle
        share the same <code>data-testid</code> — they are not unique when
        multiple instances appear on the same page.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", border: "1px solid #ddd" }}>Editor</th>
            <th style={{ padding: "8px 12px", border: "1px solid #ddd" }}>Rendered input</th>
            <th style={{ padding: "8px 12px", border: "1px solid #ddd" }}>Strategy</th>
            <th style={{ padding: "8px 12px", border: "1px solid #ddd" }}>Selector</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, record, strategy, selector }) => (
            <tr key={record.property.name}>
              <td style={{ padding: "8px 12px", border: "1px solid #ddd", fontWeight: 500 }}>
                {label}
              </td>
              <td style={{ padding: "8px 12px", border: "1px solid #ddd", minWidth: 160 }}>
                <PropertyRecordEditor
                  propertyRecord={record}
                  onCommit={noop as never}
                  onCancel={noop}
                />
              </td>
              <td style={{ padding: "8px 12px", border: "1px solid #ddd", color: strategy.startsWith("⚠") ? "#c00" : "#060" }}>
                {strategy}
              </td>
              <td style={{ padding: "8px 12px", border: "1px solid #ddd" }}>
                <code style={{ fontSize: 12 }}>{selector}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginTop: 28, marginBottom: 8 }}>
        Problem: two enum editors — both have the same <code>data-testid</code>
      </h4>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 4 }}>
        <PropertyRecordEditor
          propertyRecord={makeEnumRecord(0, "arcType", "Arc Type", [
            { label: "Clockwise", value: 0 }, { label: "CCW", value: 1 },
          ])}
          onCommit={noop as never}
          onCancel={noop}
        />
        <PropertyRecordEditor
          propertyRecord={makeEnumRecord(0, "drawMethod", "Draw Method", [
            { label: "3 Points", value: 0 }, { label: "Center+R", value: 1 },
          ])}
          onCommit={noop as never}
          onCancel={noop}
        />
      </div>
      <p style={{ fontSize: 12, color: "#888" }}>
        Both selects have <code>data-testid="components-select-editor"</code>.{" "}
        <code>getByTestId</code> would throw "Found multiple elements".
      </p>
    </div>
  );
}

/** Side-by-side comparison: legacy system (no label focus) vs new system (label focus works). */
function LegacyVsNew() {
  const record = makeEnumRecord(0, "arcType", "Arc Type", [
    { label: "Clockwise", value: 0 },
    { label: "Counter-clockwise", value: 1 },
  ]);

  return (
    <div style={{ padding: 24, display: "flex", gap: 48 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12 }}>
          ❌ Legacy system
          <span style={{ fontWeight: 400, fontSize: 12, marginLeft: 8, color: "#888" }}>
            (label click doesn't focus the select)
          </span>
        </h4>
        <EditorRow
          label="Arc Type"
          propertyName="arcType"
          record={record}
          editorSystem="legacy"
        />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12 }}>
          ✅ New system
          <span style={{ fontWeight: 400, fontSize: 12, marginLeft: 8, color: "#888" }}>
            (label click focuses the select)
          </span>
        </h4>
        <EditorRow
          label="Arc Type"
          propertyName="arcType"
          record={record}
          editorSystem="new"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "Components/New Property Editors",
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "New property editor system (`toolSettingsNewEditors`). Each editor forwards `id={property.name}` to its interactive element, enabling `<label htmlFor>` association for both accessibility and test queries (`getByLabelText`).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllEditors: Story = {
  name: "All editor types (new system)",
  render: () => <AllEditorsNew />,
};

export const ArcToolSettings: Story = {
  name: "Arc Drawing — ToolSettings use case",
  render: () => <ArcDrawingToolSettings />,
};

export const LegacyVsNewComparison: Story = {
  name: "Legacy vs New — label association",
  render: () => <LegacyVsNew />,
};

export const LegacyEditorIds: Story = {
  name: "Legacy system — targeting strategies",
  render: () => <LegacyEditorTargeting />,
};
