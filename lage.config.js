/** @type {import("lage").ConfigOptions } */
module.exports = {
  pipeline: {
    build: ["^build"],
    test: ["build"],
    lint: [],
    clean: [],
    "build:ci": ["^build:ci"],
  },
};
