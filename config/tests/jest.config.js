module.exports = {
    rootDir: '../../',
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx,mjs}"],
    testMatch: ["<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx,mjs}"],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.(js|jsx|ts|tsx|mjs)$": "./config/tests/transformers/transform.ts",
        "^.+\\.css$": "./config/tests/transformers/cssTransform.ts",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "./config/tests/transformers/fileTransform.ts"
    },
    setupFilesAfterEnv: ["./config/tests/setup/setupTests.ts"],
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
};
