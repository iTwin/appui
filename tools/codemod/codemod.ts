#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { existsSync, readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import type { Collection, Options } from "jscodeshift";
import { run as jscodeshift } from "jscodeshift/src/Runner";
import { resolve } from "path";
import postcss from "postcss";
import { parse, stringify } from "postcss-scss";
import { register } from "ts-node";
import yargs from "yargs";

type PrintOptions = Parameters<Collection["toSource"]>[0];

const defaultOptions: PrintOptions = {
  trailingComma: true,
};

function toPrintOptions(options: Options): PrintOptions {
  let printOptions = options.printOptions;
  if (!printOptions) {
    return defaultOptions;
  }

  if (typeof printOptions === "string") {
    printOptions = JSON.parse(options.printOptions);
  }
  return {
    ...defaultOptions,
    ...printOptions,
  };
}

interface CodemodArgs {
  codemod: string;
  paths: string[];
  debug: boolean;
  skipCss: boolean;
}

async function run(args: CodemodArgs, optionOverrides: Options) {
  const { codemod, paths, debug, skipCss } = args;
  const transformFile = resolve(__dirname, "..", "src", `${codemod}.ts`);
  if (!existsSync(transformFile)) {
    throw new Error(`Codemod '${transformFile}' not found.`)
  }

  const options = {
    extensions: "ts,tsx",
    parser: "tsx",
    babel: true,
    verbose: 1,
    ignorePattern: "**/node_modules/**",
    ...optionOverrides,
    printOptions: toPrintOptions(optionOverrides),
  };
  debug && console.log("Running 'jscodeshift' with following configuration:", { transformFile, paths, options });
  await jscodeshift(transformFile, paths, options);

  !skipCss && await runCssCodemod(args, transformFile);
}

yargs.parserConfiguration({
  "camel-case-expansion": false,
})
  .command({
    command: "$0 <codemod> <paths...>",
    describe: "Applies an `@itwin/appui-codemod` to the specified paths",
    builder: (command) => {
      return command
        .positional("codemod", {
          description: "The name of the codemod",
          type: "string",
          demandOption: true,
        })
        .positional("paths", {
          description: "Paths forwarded to `jscodeshift`",
          type: "string",
          array: true,
          demandOption: true,
        })
        .option("debug", {
          description: "Prints configuration used by `jscodeshift`.",
          type: "boolean",
          default: false,
        })
        .option("printOptions", {
          description: "Options that are passed down to recast's printer. See: https://github.com/benjamn/recast/blob/master/lib/options.ts",
        })
        .option("skipCss", {
          description: "Controls if the CSS files should be modified.",
          type: "boolean",
          default: false,
        })
        .epilogue("Additional options are passed down to `jsdcodeshift`.")
    },
    handler: (argv) => {
      const { codemod, debug, paths, skipCss, _, $0, ...options } = argv;
      return run(
        {
          codemod,
          paths,
          debug,
          skipCss,
        },
        options,
      );
    },
  })
  .scriptName("npx @itwin/appui-codemod")
  .example("$0 v4.0.0/full src", "Apply all 4.0.0 transforms on `src` path.")
  .example("$0 v4.0.0/layout-react src", "Apply a specific transform on `src` path.")
  .example(`$0 <codemod> <paths...> --printOptions.quote="single"`, "Pass additional options to recast's printer.")
  .example(`$0 <codemod> <paths...> --printOptions='{\\"lineTerminator\\\":\\"\\r\\n\\"}'`, "Pass additional options to recast's printer as a string.")
  .help()
  .parse();

async function runCssCodemod(args: CodemodArgs, transformFile: string) {
  register({
    compilerOptions: {
      target: "ES6",
      esModuleInterop: true,
    },
    skipIgnore: true,
  });
  const transformModule = require(transformFile);
  if (!("cssPlugin" in transformModule)) {
    return;
  }

  const processor = postcss([transformModule.cssPlugin]);
  const plugins = processor.plugins.map((p) => p["postcssPlugin"]).filter((p): p is string => !!p);

  const files: string[] = [];
  for (const path of args.paths) {
    const pattern = resolve(path, "**/*.{css,sass,scss}").replace(/\\/g, '/');
    const matches = await glob(pattern, {
      ignore: ["**/node_modules/**"],
    });
    files.push(...matches);
  }

  args.debug && console.log("Running 'PostCSS' with following configuration:", { plugins, files });

  const filePromises = files.map(async (file) => {
    try {
      const contents = readFileSync(file).toString();

      const result = await processor.process(contents, {
        from: undefined,
        parser: parse,
        stringifier: stringify,
      });
      writeFileSync(file, result.css);
    } catch (e) {
      console.error(e);
    }
  });

  await Promise.all(filePromises);
}
