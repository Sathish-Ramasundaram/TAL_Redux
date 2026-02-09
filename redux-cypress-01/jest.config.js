const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/

module.exports = {
preset: "ts-jest",
testEnvironment: "jsdom",
moduleFileExtensions: ["ts", "tsx", "js"],
testMatch: ["**/*.test.(ts|tsx|js)"],
setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
coverageReporters: ["text", "html"],
};
