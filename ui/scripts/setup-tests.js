/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// Node 15+ using MessageChannel prevents node.js process from exiting
// This becomes an issue when testing React code within JSDOM environment, as the test process cannot exit properly.
// https://github.com/facebook/react/issues/20756
const commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};
if (commonjsGlobal.MessageChannel) delete commonjsGlobal.MessageChannel;

const path = require("path");
const os = require("os");
const upath = require("upath");

// Don't ignore svgs or imports will return 'undefined'
// We need a path to correctly test svg icons.
// This sets the path to the source of the svg file,
// normalizing the path to work on all platforms.
require("ignore-styles").default(
  [".css", ".scss", ".sass", ".svg"],
  (module, filename) => {
    if (filename.endsWith(".svg")) {
      const newPath = upath.normalize(
        filename.replace(process.cwd(), "/ui/appui-react")
      );
      module.exports = { default: newPath };
    }
  }
);
// A workaround to @testing-library/react {@testing-library/dom {wait-for-expect}} breaking somewhere,
// because somewhere (most likely in jsdom) window.Date becomes undefined.
// Similar issue mentioned in https://github.com/vuejs/vue-test-utils/issues/936
require("jsdom-global")();
window.Date = Date;
document.elementFromPoint = () => null;
window.HTMLElement.prototype.scrollIntoView = () => {};

// Fill in more missing functions left out by jsdom or mocha
performance = window.performance;

// See https://github.com/jsdom/jsdom/issues/2527
global.PointerEvent = global.MouseEvent;
global.WheelEvent = global.MouseEvent;

// See https://github.com/jsdom/jsdom/pull/2926
global.DOMRect = class DOMRect {
  constructor(x, y, width, height) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? 0;
    this.height = height ?? 0;
    this.top = this.y;
    this.left = this.x;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }
  toJSON() {
    return { ...this };
  }
};
global.DOMRect.fromRect = function (rect) {
  return new DOMRect(rect.x, rect.y, rect.width, rect.height);
};
window.open = () => {
  return window;
};

const { JSDOM } = require("jsdom");
global.DOMParser = new JSDOM().window.DOMParser;

global.DOMMatrix = class DOMMatrix {
  constructor(init) {
    this.m41 = 0;
    this.m42 = 0;
  }
};

// setup chai
const chai = require("chai");
chai.should();
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let chaiJestSnapshot;
try {
  chaiJestSnapshot = require("chai-jest-snapshot");
  chai.use(chaiJestSnapshot);
} catch (e) {}
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
try {
  chai.use(require("chai-string"));
} catch (e) {}

before(function () {
  if (chaiJestSnapshot) {
    chaiJestSnapshot.resetSnapshotRegistry();
  }
});

after(function () {
  delete require.cache[__filename];
});

beforeEach(function () {
  const currentTest = this.currentTest;

  try {
    // we want snapshot tests to use the same random data between runs
    const faker = require("faker");
    let seed = 0;
    for (let i = 0; i < currentTest.fullTitle().length; ++i)
      seed += currentTest.fullTitle().charCodeAt(i);
    faker.seed(seed);
  } catch (e) {
    // may throw if package doesn't use faker - ignore
  }

  if (chaiJestSnapshot) {
    // set up snapshot name
    const sourceFilePath = currentTest.file
      .replace(path.join("lib", "cjs", "test"), path.join("src", "test"))
      .replace(/\.(jsx?|tsx?)$/, "");
    const snapPath = sourceFilePath + ".snap";
    chaiJestSnapshot.setFilename(snapPath);
    chaiJestSnapshot.setTestName(currentTest.fullTitle());
  }
});

let rhtl;
try {
  rhtl = require("@testing-library/react-hooks");
} catch (e) {}

afterEach(async () => {
  try {
    const rtl = require("@testing-library/react");
    rtl.cleanup();
  } catch (e) {}
  if (rhtl) {
    await rhtl.cleanup();
  }
  try {
    const sinon = require("sinon");
    sinon.restore();
  } catch (e) {}
});
