---
publish: false
---

# NextVersion <!-- omit from toc -->

Table of contents:

- [Empty Tool Settings Message](#empty-tool-settings-message)

## Empty Tool Settings Message

When a tool that does not specify any [Tool Settings]($appui-react) is active, the Tool Settings bar no longer reads "No settings available for this tool." The new message incorporates the active tool's name (or the string "Active Tool" if one is not specified). Message is composed of a pre-string, the tool name, and a post-string, to allow translation into languages with different grammatical structures. The pre-string's key is "noToolSettingsStart" and the post-string's key is "noToolSettingsEnd".

The behavior of the floating Tool Settings widget to disappear when there are not settings has not been changed.
