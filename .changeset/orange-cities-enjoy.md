---
"@itwin/components-react": patch
---

Fixed editors that render content in a portal (i.e. `Enum` and `Date` editors) closing immediately after being opened when used with the new editors system. Value is now committed only when focus leaves the editor entirely, instead of when it moves into the portal rendered content.
