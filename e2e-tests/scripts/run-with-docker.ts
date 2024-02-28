/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from "child_process";
import path from "path";

const dockerFilePath = path.join(__dirname, "..", "..");
const imageName = "appui";
const containerName = `${imageName}-container`;
const [_node, _fileName, ...args] = process.argv;

async function execute(command: string, args: string[] = []) {
  return new Promise<void>((resolve, reject) => {
    const spawnProcess = spawn(command, args, { stdio: "inherit" });
    spawnProcess.on("close", (status) => {
      if (status !== 0) {
        console.error(`Command failed with code ${status}`);
        return reject(
          new Error(`Command failed: ${command} ${args.join(" ")}`)
        );
      }
      resolve();
    });
  });
}

async function run() {
  try {
    // Run container
    await execute("docker", ["run", "--name", containerName, "appui", ...args]);
  } finally {
    const pckDir = `${containerName}:/appui/e2e-tests`;
    const hostPckDir = path.join(__dirname, "..");
    // Copy snapshots from docker container to the local repo
    await execute("docker", ["cp", `${pckDir}/tests`, hostPckDir]);
    // Copy the `test-results`
    await execute("docker", ["cp", `${pckDir}/test-results`, hostPckDir]);
    // Copy `playwright-report`
    await execute("docker", ["cp", `${pckDir}/playwright-report`, hostPckDir]);
  }
}

void (async () => {
  try {
    // Build image
    await execute("docker", ["build", "-t", imageName, dockerFilePath]);

    await run();
  } finally {
    await execute("docker", ["rm", "-f", containerName]);
  }
})();
