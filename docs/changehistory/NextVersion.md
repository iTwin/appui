---
publish: false
---

# NextVersion <!-- omit from toc -->

Table of contents:

- [@itwin/core-react](#itwincore-react)
  - [Standardize `Dialog`](#standardize-dialog)
- [@itwin/appui-react](#itwinappui-react)
- [Empty Tool Settings Message](#empty-tool-settings-message)

## @itwin/core-react

### Standardize `Dialog`

`Dialog` from core-react now has iTwinUI `Dialog` as a base component so it should look and act similar to iTwinUI `Dialog`. The overhead features and dialog resizing of core-react `Dialog` are kept.

## @itwin/appui-react

## Empty Tool Settings Message

When a tool that does not specify any [Tool Settings]($appui-react) is active, the Tool Settings bar no longer reads "No settings available for this tool." The new message incorporates the active tool's name (or the string "Active Tool" if one is not specified). Message is composed of a pre-string, the tool name, and a post-string, to allow translation into languages with different grammatical structures. The pre-string's key is "noToolSettingsStart" and the post-string's key is "noToolSettingsEnd".

The behavior of the floating Tool Settings widget to disappear when there are not settings has not been changed.
