# @itwin/appui-codemod

This repository provides a tool that runs a collection of codemod scripts for use with [jscodeshift](https://github.com/facebook/jscodeshift) that help update projects using AppUI.

## Usage

`npx @itwin/appui-codemod`

These are temporary steps needed before the package is published to the registry:

1. Clone the repository
2. `npm run build`
3. `npm pack`
4. *(Optional)* `npm uninstall @itwin/appui-codemod -g`
5. `npm install itwin-codemods-${packageVersion}.tgz -g`
