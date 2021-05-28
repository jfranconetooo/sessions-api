module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src"],
    testEnvironment: "node",
    bail: false,
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/index.{ts,tsx}",
        "!src/**/routes.{ts,tsx}",
        "!**/node_modules/**",
        "!dist",
        "!src/server.ts",
        "!src/service.ts",
        "!src/app.ts",
        "!src/**/models/**",
        "!src/configs/**"
    ],
    coverageReporters: ["json", "text", "lcov", "clover"],
    moduleFileExtensions: ["js", "ts", "json"],
    testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testTimeout: 30000
  };