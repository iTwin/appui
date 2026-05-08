/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  EditorRenderer,
  EditorsRegistryProvider,
  createEditorSpec,
  useCommittableValue,
  type EditorProps,
  type ValueMetadata,
  type NumericValueMetadata,
  type EnumValueMetadata,
  type TextValue,
  type NumericValue,
  type BooleanValue,
  type DateValue,
  type EnumValue,
  type Value,
  ValueUtilities,
} from "@itwin/components-react";
import {
  Flex,
  Text,
  Input,
  Slider,
  StatusMessage,
  Button,
  Textarea,
} from "@itwin/itwinui-react";

const meta = {
  title: "Components/NewEditors",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function LabeledEditor({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex flexDirection="column" gap="3xs">
      <Text variant="small" isMuted>
        {label}
      </Text>
      {children}
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// 1. AllValueTypes — default editor for every built-in value type
// ---------------------------------------------------------------------------

const enumMetadata: EnumValueMetadata = {
  type: "enum",
  choices: [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ],
  isStrict: true,
};

const numericWithConstraints: NumericValueMetadata = {
  type: "number",
  constraints: { minimumValue: 0, maximumValue: 100 },
};

/** Renders the default built-in editor for each supported value type. */
export const AllValueTypes: Story = {
  render: function AllValueTypesStory() {
    const [values, setValues] = React.useState({
      text: { value: "Hello world" } as TextValue,
      number: { rawValue: 42, displayValue: "42" } as NumericValue,
      bool: { value: true } as BooleanValue,
      toggle: { value: false } as BooleanValue,
      date: { value: new Date(2025, 0, 15) } as DateValue,
      dateTime: { value: new Date(2025, 5, 15, 14, 30) } as DateValue,
      enum: { choice: "green" } as EnumValue,
    });

    return (
      <Flex
        flexDirection="column"
        gap="m"
        style={{ maxWidth: 400, padding: 20 }}
      >
        <LabeledEditor label='String — type: "string"'>
          <EditorRenderer
            metadata={{ type: "string" }}
            value={values.text}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, text: v as TextValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='Number — type: "number"'>
          <EditorRenderer
            metadata={{ type: "number" } satisfies NumericValueMetadata}
            value={values.number}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, number: v as NumericValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='Boolean (Checkbox) — type: "bool"'>
          <EditorRenderer
            metadata={{ type: "bool" }}
            value={values.bool}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, bool: v as BooleanValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='Boolean (Toggle) — type: "bool", preferredEditor: "toggle"'>
          <EditorRenderer
            metadata={{ type: "bool", preferredEditor: "toggle" }}
            value={values.toggle}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, toggle: v as BooleanValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='Date — type: "date"'>
          <EditorRenderer
            metadata={{ type: "date" }}
            value={values.date}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, date: v as DateValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='DateTime — type: "dateTime"'>
          <EditorRenderer
            metadata={{ type: "dateTime" }}
            value={values.dateTime}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, dateTime: v as DateValue }))
            }
          />
        </LabeledEditor>

        <LabeledEditor label='Enum — type: "enum"'>
          <EditorRenderer
            metadata={enumMetadata}
            value={values.enum}
            onChange={(v) =>
              setValues((prev) => ({ ...prev, enum: v as EnumValue }))
            }
          />
        </LabeledEditor>
      </Flex>
    );
  },
};

// ---------------------------------------------------------------------------
// 2. CustomSliderEditor — custom editor via createEditorSpec
// ---------------------------------------------------------------------------

function MySliderEditor({
  metadata,
  value,
  onChange,
  commit,
  disabled,
}: EditorProps<NumericValueMetadata, NumericValue>) {
  const min = metadata.constraints?.minimumValue ?? 0;
  const max = metadata.constraints?.maximumValue ?? 100;
  const currentValue = value?.rawValue ?? min;

  return (
    <Flex gap="s" alignItems="center">
      <Slider
        min={min}
        max={max}
        values={[currentValue]}
        disabled={disabled}
        onChange={(vals) => {
          const v = vals[0];
          onChange({ rawValue: v, displayValue: `${v}` });
        }}
        onUpdate={() => commit?.()}
        style={{ minWidth: 200 }}
      />
      <Text>{currentValue}</Text>
    </Flex>
  );
}

const mySliderEditorSpec = createEditorSpec({
  isMetadataSupported: (m): m is NumericValueMetadata => m.type === "number",
  isValueSupported: (v): v is NumericValue => ValueUtilities.isNumeric(v),
  Editor: MySliderEditor,
});

/** Registers a custom slider editor for numeric values via `createEditorSpec` + `EditorsRegistryProvider`. */
export const CustomSliderEditor: Story = {
  render: function CustomSliderEditorStory() {
    const [value, setValue] = React.useState<NumericValue>({
      rawValue: 50,
      displayValue: "50",
    });

    return (
      <EditorsRegistryProvider editors={[mySliderEditorSpec]}>
        <div style={{ padding: 20, maxWidth: 400 }}>
          <LabeledEditor label="Numeric value with custom slider editor">
            <EditorRenderer
              metadata={numericWithConstraints}
              value={value}
              onChange={(v) => setValue(v as NumericValue)}
            />
          </LabeledEditor>
          <Text variant="small" isMuted style={{ marginTop: 8 }}>
            rawValue: {value.rawValue}
          </Text>
        </div>
      </EditorsRegistryProvider>
    );
  },
};

// ---------------------------------------------------------------------------
// 3. NestedProviderPriority — priority control
// ---------------------------------------------------------------------------

function MultilineTextEditor({
  value,
  onChange,
  disabled,
}: EditorProps<ValueMetadata, TextValue>) {
  return (
    <Textarea
      value={value?.value ?? ""}
      onChange={(e) => onChange({ value: e.target.value })}
      disabled={disabled}
      placeholder="Multiline editor..."
      rows={3}
    />
  );
}

function UrgentTextEditor({
  value,
  onChange,
  disabled,
}: EditorProps<ValueMetadata, TextValue>) {
  return (
    <Input
      value={value?.value ?? ""}
      onChange={(e) => onChange({ value: e.target.value })}
      disabled={disabled}
      style={{
        borderColor: "var(--iui-color-border-negative)",
        borderWidth: 2,
      }}
    />
  );
}

const multilineTextSpec = createEditorSpec({
  isMetadataSupported: (m): m is ValueMetadata => m.type === "string",
  isValueSupported: (v): v is TextValue => ValueUtilities.isText(v),
  Editor: MultilineTextEditor,
});

const urgentTextSpec = createEditorSpec({
  isMetadataSupported: (m): m is ValueMetadata =>
    m.type === "string" && m.preferredEditor === "urgent",
  isValueSupported: (v): v is TextValue => ValueUtilities.isText(v),
  Editor: UrgentTextEditor,
});

/**
 * Nested `EditorsRegistryProvider` priority demo.
 * Inner provider's editors are checked first. The "urgent" editor only matches when
 * `preferredEditor === "urgent"`, so normal strings fall through to the outer multiline editor.
 */
export const NestedProviderPriority: Story = {
  render: () => (
    <EditorsRegistryProvider editors={[multilineTextSpec]}>
      <EditorsRegistryProvider editors={[urgentTextSpec]}>
        <Flex
          flexDirection="column"
          gap="l"
          style={{ padding: 20, maxWidth: 500 }}
        >
          <LabeledEditor label="Normal string → outer MultilineTextEditor (textarea)">
            <EditorRenderer
              metadata={{ type: "string" }}
              value={{ value: "I use the outer provider's editor" }}
              onChange={() => {}}
            />
          </LabeledEditor>
          <LabeledEditor label='preferredEditor: "urgent" → inner UrgentTextEditor (red border)'>
            <EditorRenderer
              metadata={{ type: "string", preferredEditor: "urgent" }}
              value={{ value: "I use the inner provider's editor" }}
              onChange={() => {}}
            />
          </LabeledEditor>
        </Flex>
      </EditorsRegistryProvider>
    </EditorsRegistryProvider>
  ),
};

// ---------------------------------------------------------------------------
// 4. CommitCancel — useCommittableValue hook
// ---------------------------------------------------------------------------

/** Demonstrates `useCommittableValue` for Enter/Escape commit/cancel semantics. */
export const CommitCancel: Story = {
  render: function CommitCancelStory() {
    const [committedValue, setCommittedValue] =
      React.useState<string>("Initial text");
    const [log, setLog] = React.useState<string[]>([]);

    const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
      initialValue: { value: committedValue } satisfies TextValue,
      onCommit: (newValue) => {
        const text = (newValue as TextValue)?.value ?? "";
        setCommittedValue(text);
        setLog((prev) => [...prev, `✓ Committed: "${text}"`]);
      },
      onCancel: () => {
        setLog((prev) => [...prev, "✗ Cancelled"]);
      },
    });

    return (
      <Flex
        flexDirection="column"
        gap="m"
        style={{ padding: 20, maxWidth: 500 }}
      >
        <Text>
          Edit the text below. Press <strong>Enter</strong> or{" "}
          <strong>Tab</strong> to commit, <strong>Escape</strong> to cancel.
        </Text>
        <div onKeyDown={onKeydown}>
          <EditorRenderer
            metadata={{ type: "string" }}
            value={value}
            onChange={onChange}
            commit={commit}
            cancel={cancel}
          />
        </div>
        <Flex gap="s">
          <Button size="small" onClick={commit}>
            Commit
          </Button>
          <Button size="small" styleType="default" onClick={cancel}>
            Cancel
          </Button>
        </Flex>
        <div>
          <Text variant="small" isMuted>
            Committed value: &quot;{committedValue}&quot;
          </Text>
          {log.length > 0 && (
            <>
              <Text variant="small" isMuted>
                Log:
              </Text>
              {log.map((entry, i) => (
                <Text
                  key={i}
                  variant="small"
                  style={{ fontFamily: "monospace" }}
                >
                  {entry}
                </Text>
              ))}
            </>
          )}
        </div>
      </Flex>
    );
  },
};

// ---------------------------------------------------------------------------
// 5. StatusMessages — EditorRenderer statusMessage prop
// ---------------------------------------------------------------------------

/** Shows `EditorRenderer` with string and custom React component status messages. */
export const WithStatusMessages: Story = {
  render: () => (
    <Flex flexDirection="column" gap="l" style={{ padding: 20, maxWidth: 400 }}>
      <LabeledEditor label="String status message (rendered as negative)">
        <EditorRenderer
          metadata={{ type: "string" }}
          value={{ value: "" }}
          onChange={() => {}}
          statusMessage="This field is required"
        />
      </LabeledEditor>
      <LabeledEditor label="Custom component status message">
        <EditorRenderer
          metadata={{ type: "number" } satisfies NumericValueMetadata}
          value={{ rawValue: 150, displayValue: "150" }}
          onChange={() => {}}
          statusMessage={
            <StatusMessage status="warning">
              Value exceeds recommended maximum of 100
            </StatusMessage>
          }
        />
      </LabeledEditor>
    </Flex>
  ),
};

// ---------------------------------------------------------------------------
// 6. CustomColorType — extending with a custom value type
// ---------------------------------------------------------------------------

interface ColorEditorValue {
  hex: string;
}

interface ColorMetadata extends ValueMetadata {
  type: "color";
}

function isColorMetadata(m: ValueMetadata): m is ColorMetadata {
  return m.type === "color";
}

function isColorValue(v: Value): v is ColorEditorValue {
  return "hex" in v && typeof (v as ColorEditorValue).hex === "string";
}

function MyColorEditor({
  value,
  onChange,
}: EditorProps<ColorMetadata, ColorEditorValue>) {
  const currentHex = value?.hex ?? "#000000";
  return (
    <Flex gap="s" alignItems="center">
      <input
        type="color"
        value={currentHex}
        onChange={(e) => onChange({ hex: e.target.value })}
        style={{ width: 40, height: 32, border: "none", cursor: "pointer" }}
      />
      <Text>{currentHex}</Text>
    </Flex>
  );
}

const colorEditorSpec = createEditorSpec({
  isMetadataSupported: isColorMetadata,
  isValueSupported: isColorValue,
  Editor: MyColorEditor,
});

/**
 * Demonstrates extending the editor system with a completely custom value type.
 * `ValueType` is `"string" | "number" | ... | (string & {})`, so arbitrary type
 * strings like `"color"` are valid.
 */
export const CustomColorType: Story = {
  render: function CustomColorStory() {
    const [value, setValue] = React.useState<ColorEditorValue>({
      hex: "#3498db",
    });

    return (
      <EditorsRegistryProvider editors={[colorEditorSpec]}>
        <div style={{ padding: 20 }}>
          <LabeledEditor label='Custom "color" value type with color picker editor'>
            <EditorRenderer
              metadata={{ type: "color" } as ValueMetadata}
              value={value}
              onChange={(v) => setValue(v as ColorEditorValue)}
            />
          </LabeledEditor>
          <Text variant="small" isMuted style={{ marginTop: 8 }}>
            Current hex: {value.hex}
          </Text>
        </div>
      </EditorsRegistryProvider>
    );
  },
};
