import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  /**
   * Ignore build and dependency folders
   */
  globalIgnores(['dist', 'node_modules']),

  {
    /**
     * Apply to TS and TSX files
     */
    files: ['**/*.{ts,tsx}'],

    /**
     * Register plugins
     */
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
      'simple-import-sort': pluginSimpleImportSort,
    },

    /**
     * Base configurations
     */
    extends: [
      js.configs.recommended, // Core JS best practices
      ...tseslint.configs.recommendedTypeChecked, // Type-aware TypeScript rules
      reactRefresh.configs.vite, // Safe HMR with Vite
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: [
            '.js',
            '.jsx',
            '.mjs',
            '.cjs',
            '.ts',
            '.tsx',
            '.d.ts',
            '.css',
          ],
        },
      },
    },

    rules: {
      /**
       * ------------------------
       * React Rules
       * ------------------------
       */

      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'warn',

      /**
       * ------------------------
       * TypeScript Strictness
       * ------------------------
       */

      '@typescript-eslint/no-floating-promises': 'error',
      // Prevent un-awaited async calls

      '@typescript-eslint/consistent-type-imports': 'error',
      // Forces `import type`

      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      // Forces exhaustive union checks

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      // Disabled for class-variance-authority and similar libraries

      /**
       * ------------------------
       * Import Hygiene
       * ------------------------
       */

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'import/no-cycle': 'error',
      // Prevent circular dependencies

      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@/'],
        },
      ],
      // Catch missing relative imports (including CSS files)

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: 'Use @/ absolute imports for internal modules.',
            },
          ],
        },
      ],
      // Standardize internal imports to @/...

      /**
       * ------------------------
       * General Code Quality
       * ------------------------
       */

      'no-console': ['error', { allow: ['warn', 'error'] }],

      'no-debugger': 'error',

      /**
       * ------------------------
       * React Refresh (Vite)
       * ------------------------
       */

      'react-refresh/only-export-components': 'off',
    },
  },
]);
