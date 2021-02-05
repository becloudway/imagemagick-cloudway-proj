/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/src/", "<rootDir>/__tests__/"],
  coverageReporters: [
    "lcov",
  ],
  moduleFileExtensions: [
    "js",
  ],
  testEnvironment: "node"
};
