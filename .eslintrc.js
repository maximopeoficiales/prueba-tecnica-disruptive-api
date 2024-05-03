module.exports = {
  "env": {
    "es2021": true,
    "node": true,
    "jest": true
  },
  "plugins": ["prettier"],
  "extends": ["standard-with-typescript", "plugin:prettier/recommended"],
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname,
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "ignorePatterns": [
    "src/routes.ts",
    ".eslintrc.js",
    "jest.config.ts",
    "jest.setup.ts",
    "dist",
    "build"
  ],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "semi": false,
        "endOfLine": "auto",
        "printWidth": 80
      }
    ],
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@eslint-disable import/first": "off",
    '@typescript-eslint/no-non-null-assertion': 'off',
    "jest/valid-expect": 0,
    "@typescript-eslint/no-extraneous-class": [
      1,
      {
        "allowStaticOnly": true,
      }
    ]
  }
}
