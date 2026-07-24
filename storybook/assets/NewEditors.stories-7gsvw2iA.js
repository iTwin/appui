import { i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ct as Text, D as Textarea, Vt as StatusMessage, _ as Flex, _t as Button, at as Slider, i as init_esm, tt as Input } from "./iframe-DrBiZGmV.js";
import { Dt as EditorRenderer, Et as useCommittableValue, Ht as isNumeric, It as createEditorSpec, Rt as EditorsRegistryProvider, Ut as isText, t as init_components_react } from "./components-react-DigDa1CF.js";
//#region src/components/NewEditors.stories.tsx
function LabeledEditor({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
		flexDirection: "column",
		gap: "3xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			variant: "small",
			isMuted: true,
			children: label
		}), children]
	});
}
function MySliderEditor({ metadata, value, onChange, commit, disabled }) {
	const min = metadata.constraints?.minimumValue ?? 0;
	const max = metadata.constraints?.maximumValue ?? 100;
	const currentValue = value?.rawValue ?? min;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
		gap: "s",
		alignItems: "center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			min,
			max,
			values: [currentValue],
			disabled,
			onChange: (vals) => {
				const v = vals[0];
				onChange({
					rawValue: v,
					displayValue: `${v}`
				});
			},
			onUpdate: () => commit?.(),
			style: { minWidth: 200 }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: currentValue })]
	});
}
function MultilineTextEditor({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		value: value?.value ?? "",
		onChange: (e) => onChange({ value: e.target.value }),
		disabled,
		placeholder: "Multiline editor...",
		rows: 3
	});
}
function UrgentTextEditor({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value: value?.value ?? "",
		onChange: (e) => onChange({ value: e.target.value }),
		disabled,
		style: {
			borderColor: "var(--iui-color-border-negative)",
			borderWidth: 2
		}
	});
}
function isColorMetadata(m) {
	return m.type === "color";
}
function isColorValue(v) {
	return "hex" in v && typeof v.hex === "string";
}
function MyColorEditor({ value, onChange }) {
	const currentHex = value?.hex ?? "#000000";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
		gap: "s",
		alignItems: "center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "color",
			value: currentHex,
			onChange: (e) => onChange({ hex: e.target.value }),
			style: {
				width: 40,
				height: 32,
				border: "none",
				cursor: "pointer"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, { children: currentHex })]
	});
}
var import_react, import_jsx_runtime, meta, enumMetadata, numericWithConstraints, AllValueTypes, mySliderEditorSpec, CustomSliderEditor, multilineTextSpec, urgentTextSpec, NestedProviderPriority, CommitCancel, WithStatusMessages, colorEditorSpec, CustomColorType, __namedExportsOrder;
//#endregion
__esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_components_react();
	init_esm();
	import_jsx_runtime = require_jsx_runtime();
	meta = {
		title: "Components/NewEditors",
		tags: ["autodocs"]
	};
	enumMetadata = {
		type: "enum",
		choices: [
			{
				value: "red",
				label: "Red"
			},
			{
				value: "green",
				label: "Green"
			},
			{
				value: "blue",
				label: "Blue"
			}
		],
		isStrict: true
	};
	numericWithConstraints = {
		type: "number",
		constraints: {
			minimumValue: 0,
			maximumValue: 100
		}
	};
	AllValueTypes = { render: function AllValueTypesStory() {
		const [values, setValues] = import_react.useState({
			text: { value: "Hello world" },
			number: {
				rawValue: 42,
				displayValue: "42"
			},
			bool: { value: true },
			toggle: { value: false },
			date: { value: new Date(2025, 0, 15) },
			dateTime: { value: new Date(2025, 5, 15, 14, 30) },
			enum: { choice: "green" }
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
			flexDirection: "column",
			gap: "m",
			style: {
				maxWidth: 400,
				padding: 20
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "String — type: \"string\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "string" },
						value: values.text,
						onChange: (v) => setValues((prev) => ({
							...prev,
							text: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Number — type: \"number\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "number" },
						value: values.number,
						onChange: (v) => setValues((prev) => ({
							...prev,
							number: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Boolean (Checkbox) — type: \"bool\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "bool" },
						value: values.bool,
						onChange: (v) => setValues((prev) => ({
							...prev,
							bool: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Boolean (Toggle) — type: \"bool\", preferredEditor: \"toggle\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: {
							type: "bool",
							preferredEditor: "toggle"
						},
						value: values.toggle,
						onChange: (v) => setValues((prev) => ({
							...prev,
							toggle: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Date — type: \"date\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "date" },
						value: values.date,
						onChange: (v) => setValues((prev) => ({
							...prev,
							date: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "DateTime — type: \"dateTime\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "dateTime" },
						value: values.dateTime,
						onChange: (v) => setValues((prev) => ({
							...prev,
							dateTime: v
						}))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Enum — type: \"enum\"",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: enumMetadata,
						value: values.enum,
						onChange: (v) => setValues((prev) => ({
							...prev,
							enum: v
						}))
					})
				})
			]
		});
	} };
	mySliderEditorSpec = createEditorSpec({
		isMetadataSupported: (m) => m.type === "number",
		isValueSupported: (v) => isNumeric(v),
		Editor: MySliderEditor
	});
	CustomSliderEditor = { render: function CustomSliderEditorStory() {
		const [value, setValue] = import_react.useState({
			rawValue: 50,
			displayValue: "50"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorsRegistryProvider, {
			editors: [mySliderEditorSpec],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: 20,
					maxWidth: 400
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Numeric value with custom slider editor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: numericWithConstraints,
						value,
						onChange: (v) => setValue(v)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					variant: "small",
					isMuted: true,
					style: { marginTop: 8 },
					children: ["rawValue: ", value.rawValue]
				})]
			})
		});
	} };
	multilineTextSpec = createEditorSpec({
		isMetadataSupported: (m) => m.type === "string",
		isValueSupported: (v) => isText(v),
		Editor: MultilineTextEditor
	});
	urgentTextSpec = createEditorSpec({
		isMetadataSupported: (m) => m.type === "string" && m.preferredEditor === "urgent",
		isValueSupported: (v) => isText(v),
		Editor: UrgentTextEditor
	});
	NestedProviderPriority = { render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorsRegistryProvider, {
		editors: [multilineTextSpec],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorsRegistryProvider, {
			editors: [urgentTextSpec],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
				flexDirection: "column",
				gap: "l",
				style: {
					padding: 20,
					maxWidth: 500
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Normal string → outer MultilineTextEditor (textarea)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "string" },
						value: { value: "I use the outer provider's editor" },
						onChange: () => {}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "preferredEditor: \"urgent\" → inner UrgentTextEditor (red border)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: {
							type: "string",
							preferredEditor: "urgent"
						},
						value: { value: "I use the inner provider's editor" },
						onChange: () => {}
					})
				})]
			})
		})
	}) };
	CommitCancel = { render: function CommitCancelStory() {
		const [committedValue, setCommittedValue] = import_react.useState("Initial text");
		const [log, setLog] = import_react.useState([]);
		const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
			initialValue: { value: committedValue },
			onCommit: (newValue) => {
				const text = newValue?.value ?? "";
				setCommittedValue(text);
				setLog((prev) => [...prev, `✓ Committed: "${text}"`]);
			},
			onCancel: () => {
				setLog((prev) => [...prev, "✗ Cancelled"]);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
			flexDirection: "column",
			gap: "m",
			style: {
				padding: 20,
				maxWidth: 500
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, { children: [
					"Edit the text below. Press ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Enter" }),
					" or",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tab" }),
					" to commit, ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Escape" }),
					" to cancel."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onKeyDown: onKeydown,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "string" },
						value,
						onChange,
						commit,
						cancel
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
					gap: "s",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "small",
						onClick: commit,
						children: "Commit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "small",
						styleType: "default",
						onClick: cancel,
						children: "Cancel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					variant: "small",
					isMuted: true,
					children: [
						"Committed value: \"",
						committedValue,
						"\""
					]
				}), log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					variant: "small",
					isMuted: true,
					children: "Log:"
				}), log.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					variant: "small",
					style: { fontFamily: "monospace" },
					children: entry
				}, i))] })] })
			]
		});
	} };
	WithStatusMessages = { render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Flex, {
		flexDirection: "column",
		gap: "l",
		style: {
			padding: 20,
			maxWidth: 400
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
			label: "String status message (rendered as negative)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
				metadata: { type: "string" },
				value: { value: "" },
				onChange: () => {},
				statusMessage: "This field is required"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
			label: "Custom component status message",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
				metadata: { type: "number" },
				value: {
					rawValue: 150,
					displayValue: "150"
				},
				onChange: () => {},
				statusMessage: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusMessage, {
					status: "warning",
					children: "Value exceeds recommended maximum of 100"
				})
			})
		})]
	}) };
	colorEditorSpec = createEditorSpec({
		isMetadataSupported: isColorMetadata,
		isValueSupported: isColorValue,
		Editor: MyColorEditor
	});
	CustomColorType = { render: function CustomColorStory() {
		const [value, setValue] = import_react.useState({ hex: "#3498db" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorsRegistryProvider, {
			editors: [colorEditorSpec],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { padding: 20 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabeledEditor, {
					label: "Custom \"color\" value type with color picker editor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorRenderer, {
						metadata: { type: "color" },
						value,
						onChange: (v) => setValue(v)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
					variant: "small",
					isMuted: true,
					style: { marginTop: 8 },
					children: ["Current hex: ", value.hex]
				})]
			})
		});
	} };
	AllValueTypes.parameters = {
		...AllValueTypes.parameters,
		docs: {
			...AllValueTypes.parameters?.docs,
			source: {
				originalSource: "{\n  render: function AllValueTypesStory() {\n    const [values, setValues] = React.useState({\n      text: {\n        value: \"Hello world\"\n      } as TextValue,\n      number: {\n        rawValue: 42,\n        displayValue: \"42\"\n      } as NumericValue,\n      bool: {\n        value: true\n      } as BooleanValue,\n      toggle: {\n        value: false\n      } as BooleanValue,\n      date: {\n        value: new Date(2025, 0, 15)\n      } as DateValue,\n      dateTime: {\n        value: new Date(2025, 5, 15, 14, 30)\n      } as DateValue,\n      enum: {\n        choice: \"green\"\n      } as EnumValue\n    });\n    return <Flex flexDirection=\"column\" gap=\"m\" style={{\n      maxWidth: 400,\n      padding: 20\n    }}>\n        <LabeledEditor label='String — type: \"string\"'>\n          <EditorRenderer metadata={{\n          type: \"string\"\n        }} value={values.text} onChange={v => setValues(prev => ({\n          ...prev,\n          text: v as TextValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='Number — type: \"number\"'>\n          <EditorRenderer metadata={{\n          type: \"number\"\n        } satisfies NumericValueMetadata} value={values.number} onChange={v => setValues(prev => ({\n          ...prev,\n          number: v as NumericValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='Boolean (Checkbox) — type: \"bool\"'>\n          <EditorRenderer metadata={{\n          type: \"bool\"\n        }} value={values.bool} onChange={v => setValues(prev => ({\n          ...prev,\n          bool: v as BooleanValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='Boolean (Toggle) — type: \"bool\", preferredEditor: \"toggle\"'>\n          <EditorRenderer metadata={{\n          type: \"bool\",\n          preferredEditor: \"toggle\"\n        }} value={values.toggle} onChange={v => setValues(prev => ({\n          ...prev,\n          toggle: v as BooleanValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='Date — type: \"date\"'>\n          <EditorRenderer metadata={{\n          type: \"date\"\n        }} value={values.date} onChange={v => setValues(prev => ({\n          ...prev,\n          date: v as DateValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='DateTime — type: \"dateTime\"'>\n          <EditorRenderer metadata={{\n          type: \"dateTime\"\n        }} value={values.dateTime} onChange={v => setValues(prev => ({\n          ...prev,\n          dateTime: v as DateValue\n        }))} />\n        </LabeledEditor>\n\n        <LabeledEditor label='Enum — type: \"enum\"'>\n          <EditorRenderer metadata={enumMetadata} value={values.enum} onChange={v => setValues(prev => ({\n          ...prev,\n          enum: v as EnumValue\n        }))} />\n        </LabeledEditor>\n      </Flex>;\n  }\n}",
				...AllValueTypes.parameters?.docs?.source
			},
			description: {
				story: "Renders the default built-in editor for each supported value type.",
				...AllValueTypes.parameters?.docs?.description
			}
		}
	};
	CustomSliderEditor.parameters = {
		...CustomSliderEditor.parameters,
		docs: {
			...CustomSliderEditor.parameters?.docs,
			source: {
				originalSource: "{\n  render: function CustomSliderEditorStory() {\n    const [value, setValue] = React.useState<NumericValue>({\n      rawValue: 50,\n      displayValue: \"50\"\n    });\n    return <EditorsRegistryProvider editors={[mySliderEditorSpec]}>\n        <div style={{\n        padding: 20,\n        maxWidth: 400\n      }}>\n          <LabeledEditor label=\"Numeric value with custom slider editor\">\n            <EditorRenderer metadata={numericWithConstraints} value={value} onChange={v => setValue(v as NumericValue)} />\n          </LabeledEditor>\n          <Text variant=\"small\" isMuted style={{\n          marginTop: 8\n        }}>\n            rawValue: {value.rawValue}\n          </Text>\n        </div>\n      </EditorsRegistryProvider>;\n  }\n}",
				...CustomSliderEditor.parameters?.docs?.source
			},
			description: {
				story: "Registers a custom slider editor for numeric values via `createEditorSpec` + `EditorsRegistryProvider`.",
				...CustomSliderEditor.parameters?.docs?.description
			}
		}
	};
	NestedProviderPriority.parameters = {
		...NestedProviderPriority.parameters,
		docs: {
			...NestedProviderPriority.parameters?.docs,
			source: {
				originalSource: "{\n  render: () => <EditorsRegistryProvider editors={[multilineTextSpec]}>\n      <EditorsRegistryProvider editors={[urgentTextSpec]}>\n        <Flex flexDirection=\"column\" gap=\"l\" style={{\n        padding: 20,\n        maxWidth: 500\n      }}>\n          <LabeledEditor label=\"Normal string → outer MultilineTextEditor (textarea)\">\n            <EditorRenderer metadata={{\n            type: \"string\"\n          }} value={{\n            value: \"I use the outer provider's editor\"\n          }} onChange={() => {}} />\n          </LabeledEditor>\n          <LabeledEditor label='preferredEditor: \"urgent\" → inner UrgentTextEditor (red border)'>\n            <EditorRenderer metadata={{\n            type: \"string\",\n            preferredEditor: \"urgent\"\n          }} value={{\n            value: \"I use the inner provider's editor\"\n          }} onChange={() => {}} />\n          </LabeledEditor>\n        </Flex>\n      </EditorsRegistryProvider>\n    </EditorsRegistryProvider>\n}",
				...NestedProviderPriority.parameters?.docs?.source
			},
			description: {
				story: "Nested `EditorsRegistryProvider` priority demo.\nInner provider's editors are checked first. The \"urgent\" editor only matches when\n`preferredEditor === \"urgent\"`, so normal strings fall through to the outer multiline editor.",
				...NestedProviderPriority.parameters?.docs?.description
			}
		}
	};
	CommitCancel.parameters = {
		...CommitCancel.parameters,
		docs: {
			...CommitCancel.parameters?.docs,
			source: {
				originalSource: "{\n  render: function CommitCancelStory() {\n    const [committedValue, setCommittedValue] = React.useState<string>(\"Initial text\");\n    const [log, setLog] = React.useState<string[]>([]);\n    const {\n      value,\n      onChange,\n      onKeydown,\n      commit,\n      cancel\n    } = useCommittableValue({\n      initialValue: {\n        value: committedValue\n      } satisfies TextValue,\n      onCommit: newValue => {\n        const text = (newValue as TextValue)?.value ?? \"\";\n        setCommittedValue(text);\n        setLog(prev => [...prev, `✓ Committed: \"${text}\"`]);\n      },\n      onCancel: () => {\n        setLog(prev => [...prev, \"✗ Cancelled\"]);\n      }\n    });\n    return <Flex flexDirection=\"column\" gap=\"m\" style={{\n      padding: 20,\n      maxWidth: 500\n    }}>\n        <Text>\n          Edit the text below. Press <strong>Enter</strong> or{\" \"}\n          <strong>Tab</strong> to commit, <strong>Escape</strong> to cancel.\n        </Text>\n        <div onKeyDown={onKeydown}>\n          <EditorRenderer metadata={{\n          type: \"string\"\n        }} value={value} onChange={onChange} commit={commit} cancel={cancel} />\n        </div>\n        <Flex gap=\"s\">\n          <Button size=\"small\" onClick={commit}>\n            Commit\n          </Button>\n          <Button size=\"small\" styleType=\"default\" onClick={cancel}>\n            Cancel\n          </Button>\n        </Flex>\n        <div>\n          <Text variant=\"small\" isMuted>\n            Committed value: &quot;{committedValue}&quot;\n          </Text>\n          {log.length > 0 && <>\n              <Text variant=\"small\" isMuted>\n                Log:\n              </Text>\n              {log.map((entry, i) => <Text key={i} variant=\"small\" style={{\n            fontFamily: \"monospace\"\n          }}>\n                  {entry}\n                </Text>)}\n            </>}\n        </div>\n      </Flex>;\n  }\n}",
				...CommitCancel.parameters?.docs?.source
			},
			description: {
				story: "Demonstrates `useCommittableValue` for Enter/Escape commit/cancel semantics.",
				...CommitCancel.parameters?.docs?.description
			}
		}
	};
	WithStatusMessages.parameters = {
		...WithStatusMessages.parameters,
		docs: {
			...WithStatusMessages.parameters?.docs,
			source: {
				originalSource: "{\n  render: () => <Flex flexDirection=\"column\" gap=\"l\" style={{\n    padding: 20,\n    maxWidth: 400\n  }}>\n      <LabeledEditor label=\"String status message (rendered as negative)\">\n        <EditorRenderer metadata={{\n        type: \"string\"\n      }} value={{\n        value: \"\"\n      }} onChange={() => {}} statusMessage=\"This field is required\" />\n      </LabeledEditor>\n      <LabeledEditor label=\"Custom component status message\">\n        <EditorRenderer metadata={{\n        type: \"number\"\n      } satisfies NumericValueMetadata} value={{\n        rawValue: 150,\n        displayValue: \"150\"\n      }} onChange={() => {}} statusMessage={<StatusMessage status=\"warning\">\n              Value exceeds recommended maximum of 100\n            </StatusMessage>} />\n      </LabeledEditor>\n    </Flex>\n}",
				...WithStatusMessages.parameters?.docs?.source
			},
			description: {
				story: "Shows `EditorRenderer` with string and custom React component status messages.",
				...WithStatusMessages.parameters?.docs?.description
			}
		}
	};
	CustomColorType.parameters = {
		...CustomColorType.parameters,
		docs: {
			...CustomColorType.parameters?.docs,
			source: {
				originalSource: "{\n  render: function CustomColorStory() {\n    const [value, setValue] = React.useState<ColorEditorValue>({\n      hex: \"#3498db\"\n    });\n    return <EditorsRegistryProvider editors={[colorEditorSpec]}>\n        <div style={{\n        padding: 20\n      }}>\n          <LabeledEditor label='Custom \"color\" value type with color picker editor'>\n            <EditorRenderer metadata={{\n            type: \"color\"\n          } as ValueMetadata} value={value} onChange={v => setValue(v as ColorEditorValue)} />\n          </LabeledEditor>\n          <Text variant=\"small\" isMuted style={{\n          marginTop: 8\n        }}>\n            Current hex: {value.hex}\n          </Text>\n        </div>\n      </EditorsRegistryProvider>;\n  }\n}",
				...CustomColorType.parameters?.docs?.source
			},
			description: {
				story: "Demonstrates extending the editor system with a completely custom value type.\n`ValueType` is `\"string\" | \"number\" | ... | (string & {})`, so arbitrary type\nstrings like `\"color\"` are valid.",
				...CustomColorType.parameters?.docs?.description
			}
		}
	};
	__namedExportsOrder = [
		"AllValueTypes",
		"CustomSliderEditor",
		"NestedProviderPriority",
		"CommitCancel",
		"WithStatusMessages",
		"CustomColorType"
	];
}))();
export { AllValueTypes, CommitCancel, CustomColorType, CustomSliderEditor, NestedProviderPriority, WithStatusMessages, __namedExportsOrder, meta as default };
