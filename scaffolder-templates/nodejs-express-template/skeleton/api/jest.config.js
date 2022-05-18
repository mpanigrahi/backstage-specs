module.exports = {
    testMatch: [
        '**/tests/**/*.+(ts|tsx)',
        '**/?(*.)+(spec|test).+(ts|tsx)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
    forceExit: true,
    coveragePathIgnorePatterns: [
        "<rootDir>/config/db.ts"
    ]
};
