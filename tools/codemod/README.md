# @itwin/appui-codemod

This package provides a tool that runs a collection of codemod scripts for use with [jscodeshift](https://github.com/facebook/jscodeshift) that help update projects using AppUI.

## Usage

```cmd
npx @itwin/appui-codemod <codemod> <paths...>

Applies an `@itwin/appui-codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                      [string]
  paths    Paths forwarded to `jscodeshift`                             [string]

Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --debug         Prints configuration used by `jscodeshift`.
                                                      [boolean] [default: false]
  --printOptions  Options that are passed down to recast's printer. See:
                  https://github.com/benjamn/recast/blob/master/lib/options.ts

Examples:
  npx @itwin/appui-codemod v4.0.0/full src  Apply all 4.0.0 transforms on `src`
                                            path.
  npx @itwin/appui-codemod                  Apply a specific transform on `src`
  v4.0.0/layout-react src                   path.
  npx @itwin/appui-codemod <codemod>        Pass additional options to recast's
  <paths...> --printOptions.quote="single"  printer.
  npx @itwin/appui-codemod <codemod>        Pass additional options to recast's
  <paths...> --printOptions='{\"lineTermin  printer as a string.
  ator\":\"\r\n\"}'

Additional options are passed down to `jsdcodeshift`.
```

### Available codemods

To update to **4.0.0** version of **AppUI** use `v4.0.0/full` codemod. Alternatively, distinct codemods can be found under [v4.0.0](./src/v4.0.0/) directory.

### Debug `jscodeshift` options

Use `--debug` to print options provided to `jscodeshift`.

### Recast options

Use `--printOptions` to pass down options to recast's printer. See: <https://github.com/benjamn/recast/blob/master/lib/options.ts>
