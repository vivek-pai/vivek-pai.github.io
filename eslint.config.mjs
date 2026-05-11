import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import globals from 'globals';

export default tseslint.config(
  // Base JS + TypeScript
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro files
  ...astro.configs.recommended,

  // Svelte files
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Browser + Node globals for scripts
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Relax a few rules that don't fit this codebase well
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Ignore build output, generated files, and Astro's type entry point
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'src/env.d.ts'],
  },
);
