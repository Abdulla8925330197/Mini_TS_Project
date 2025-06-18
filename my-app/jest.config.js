//npx ts-jest config:init

const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "compilerOption":{
      "types":["jest","node"]
    }
  },
  testMatch: ['**/tests/**/*.test.ts'],
};

  // transform: {
  //   ...tsJestTransformCfg,
  // };