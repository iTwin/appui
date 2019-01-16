# Change Log - @bentley/ui-framework

This log was last generated on Tue, 15 Jan 2019 15:18:59 GMT and should not be manually modified.

## 0.187.0
Tue, 15 Jan 2019 15:18:59 GMT

*Version update only*

## 0.186.0
Mon, 14 Jan 2019 23:09:10 GMT

### Updates

- Added activated, deactivated & ready notification for Frontstages. Added support for nested frontstages.
- Add Status Field to show selection count

## 0.185.0
Fri, 11 Jan 2019 18:29:00 GMT

*Version update only*

## 0.184.0
Thu, 10 Jan 2019 22:46:17 GMT

### Updates

- Improved state management in ModelSelector
- Improve performance for show/hide/invert buttons in model selector
- Clearing content controls on Frontstage deactivate
- Keyboard Shortcut support
- Renamed connection getter to imodel

## 0.183.0
Mon, 07 Jan 2019 21:49:21 GMT

*Version update only*

## 0.182.0
Mon, 07 Jan 2019 13:31:34 GMT

### Updates

- Do not show SubCategory if it has no siblings

## 0.181.0
Fri, 04 Jan 2019 13:02:40 GMT

### Updates

- Add SyncUi support for ConfigurableUi controls.

## 0.180.0
Wed, 02 Jan 2019 15:18:23 GMT

*Version update only*

## 0.179.0
Wed, 19 Dec 2018 18:26:14 GMT

### Updates

- Added showDialogInitially support to ActivityMessageDetails
- Synchronizing navigation aids with view definition changes
- Fix model selector to only show non-private spatial models

## 0.178.0
Thu, 13 Dec 2018 22:06:10 GMT

### Updates

- Added StringGetter support to ItemDefBase, ItemProps & ToolButton. Added IModelApp.i18n checks to Tool for unit tests.
- Fix tool panel alignment issue.

## 0.177.0
Wed, 12 Dec 2018 17:21:32 GMT

### Updates

- Moved checkbox responsibility to nodes
- Improved speed & smoothness of CubeNavigationAid. Made class names unique to fix documentation. UI Tree doc fixes.

## 0.176.0
Mon, 10 Dec 2018 21:19:45 GMT

*Version update only*

## 0.175.0
Mon, 10 Dec 2018 17:08:55 GMT

*Version update only*

## 0.174.0
Mon, 10 Dec 2018 13:24:09 GMT

### Updates

- Add SignIn and SignOut to the index file

## 0.173.0
Thu, 06 Dec 2018 22:03:29 GMT

### Updates

- Added fillZone property to the Widget
- Fixed initial & return layout of Frontstage. Styling of scrollbar in Chrome.
- Custom imodelJs noDirectImport lint rule implemented, noDuplicateImport lint rule turned on.

## 0.172.0
Tue, 04 Dec 2018 17:24:39 GMT

### Updates

- Changed index file name to match package name, eliminate subdirectory index files, decrease usage of default exports, change imports to use other packages' index file.

## 0.171.0
Mon, 03 Dec 2018 18:52:58 GMT

### Updates

- More information logged from BriefcaseManager.\nFixed deletion/cleanup of invalid briefcases.\nAdded OIDC support for simpleviewtest application. 
- Unit tests
- Removed ConfigurableUiManager.addFrontstageDef and other unused/old methods and components

## 0.170.0
Mon, 26 Nov 2018 19:38:42 GMT

### Updates

- Fix to OIDC browser client. 

## 0.169.0
Tue, 20 Nov 2018 16:17:15 GMT

### Updates

- Include presentation rulesets in package

## 0.168.0
Sat, 17 Nov 2018 14:20:11 GMT

### Updates

- Fixed OidcBrowserClient comparision of redirect path.

## 0.167.0
Fri, 16 Nov 2018 21:45:44 GMT

### Updates

- Overhaul category/model picker to use presentation rules
- Fixed some content control sizing issues
- Moved most isHidden logic for toolbar items into ui-ninezone
- Hiding items by rendering them conditionally instead of using a CSS class.
- Fixed tests
- Tree cell editing unit tests
- ui-framework unit tests & docs

## 0.166.0
Mon, 12 Nov 2018 16:42:10 GMT

*Version update only*

## 0.165.0
Mon, 12 Nov 2018 15:47:00 GMT

*Version update only*

## 0.164.0
Thu, 08 Nov 2018 17:59:21 GMT

### Updates

- OIDC related enhancments (WIP). 
- Updated to TypeScript 3.1
- ui-core unit tests. Fixed backstage open issue.
- Zone & Widget initial state, more ui-core unit tests, cleaned up ui-framework index.ts files.

## 0.163.0
Wed, 31 Oct 2018 20:55:37 GMT

### Updates

- Added JSX specification for Frontstage, Zone & Widget
- Fixed ui-framework unit test

## 0.162.0
Wed, 24 Oct 2018 19:20:07 GMT

### Updates

- Merge and fix framework test warning
- Tooltips, ToolAdmin.activeToolChanged support, SheetNavigationAid/SheetsModalFrontstage improvements.
- Ui Documentation
- Vertical PropertyGrid layout improvements. PropertyGrid background color. Setting the widget state.
- Added NotificationManager.isToolTipSupported so that we can avoid asking for tooltip message when _showToolTip isn't implemented by application.
- Adding SyncUiEventDispatcher

## 0.161.0
Fri, 19 Oct 2018 13:04:14 GMT

*Version update only*

## 0.160.0
Wed, 17 Oct 2018 18:18:38 GMT

*Version update only*

## 0.159.0
Tue, 16 Oct 2018 14:09:09 GMT

*Version update only*

## 0.158.0
Mon, 15 Oct 2018 19:36:09 GMT

*Version update only*

## 0.157.0
Sun, 14 Oct 2018 17:20:06 GMT

### Updates

- Fixing scripts for linux

## 0.156.0
Fri, 12 Oct 2018 23:00:10 GMT

### Updates

- Initial release

