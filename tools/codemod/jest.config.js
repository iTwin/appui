module.exports = {
  transform: { "\\.ts$": ["ts-jest"] },
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test",
        outputName: "codemod_test_results.xml",
      },
    ],
  ],
};
