import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

const stylisticStrictRules = Object.fromEntries(Object.keys(stylistic.rules)
  .map(e => [`@stylistic/${e}`, 'error']));
const stylisticRules = {
  ...stylisticStrictRules,
  '@stylistic/max-len': ['error', {code: 120,},],
  '@stylistic/indent': ['error', 2],
  '@stylistic/jsx-indent': ['error', 2],
  '@stylistic/jsx-indent-props': ['error', 2],
  '@stylistic/lines-around-comment': 'off',
  '@stylistic/dot-location': ['error', 'property'],
  '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
  '@stylistic/semi': ['error', 'always'],
  '@stylistic/comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'ignore',
  },],
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/quote-props': ['error', 'as-needed'],
  '@stylistic/padded-blocks': ['error', {blocks: 'never', classes: 'never', switches: 'never',},],
  '@stylistic/function-paren-newline': ['error', 'consistent'],
  '@stylistic/jsx-quotes': ['error', 'prefer-single'],
  '@stylistic/jsx-sort-props': ['error', {callbacksLast: true,}],
};
export default tseslint.config(
  {ignores: ['dist', 'dev-dist', 'vite.config.ts', 'src/server']},
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
      '@stylistic': stylistic
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true},],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type',],
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      'import/order': 'error', ...stylisticRules,
    },
  },);
