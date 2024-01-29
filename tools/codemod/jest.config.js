module.exports = {
  transform: { "\\.ts$": ["ts-jest"] },
  reporters: ["default", ["jest-junit", {}]],
};
