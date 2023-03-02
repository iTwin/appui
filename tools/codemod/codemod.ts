#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { resolve } from "path";
import { existsSync } from "fs";
import { command } from "yargs";
import { run as jscodeshift } from "jscodeshift/src/Runner";
import type { Options } from "jscodeshift";

async function run(codemod: string, paths: string[], debug: boolean, optionOverrides: Options) {
  const transformFile = resolve(__dirname, "..", "src", `${codemod}.ts`);
  if (!existsSync(transformFile)) {
    throw new Error(`Codemod '${transformFile}' not found.`)
  }

  const options = {
    extensions: "ts,tsx",
    parser: "tsx",
    babel: true,
    verbose: 1,
    ...optionOverrides,
  };
  debug && console.log("Running 'jscodeshift' with following configuration:", { transformFile, paths, options });
  await jscodeshift(transformFile, paths, options);
}

command({
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
      .epilogue("Additional options are passed down to `jsdcodeshift`.")
  },
  handler: (argv) => {
    const { codemod, debug, paths, _, $0, ...options } = argv;
    return run(
      codemod,
      paths,
      debug,
      options,
    );
  },
})
  .scriptName("npx @itwin/appui-codemod")
  .example("$0 v4.0.0/widget-to-config src", "")
  .help()
  .parse();
