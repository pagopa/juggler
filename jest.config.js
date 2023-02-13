module.exports = {
  "roots": [
    "<rootDir>/packages/"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
    "test"
  ],
  "moduleFileExtensions": ['ts', 'js'],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "modulePathIgnorePatterns": [
    "./__tests__/data.ts",
    "dist/*"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "lines": 70
    }
  }
}
