/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
if (window.location.href.indexOf("electron://") !== 0) {
  if (process.env.NODE_ENV === "test") {
    (window as any).electronRequire = require;
  } else {
    (window as any).nodeRequire = require;
  }
  delete window.require;
  delete window.exports;
  delete window.module;
}
