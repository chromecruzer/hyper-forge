import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: false,
    },
    {
      format: 'cjs',
      syntax: 'es2021',
    },
  ],
});
