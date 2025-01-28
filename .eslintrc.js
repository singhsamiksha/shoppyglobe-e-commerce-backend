module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        'max-len': ['error', 180],
        camelcase: 'off',
        'no-underscore-dangle': 'off',
        semi: ['error', 'always'],
        'no-param-reassign': ['error', { props: false }],
        'no-plusplus': 'off',
        'linebreak-style': 0,
    },
};
