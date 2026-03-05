import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.js'],
  format: ['esm'],
  clean: true,
  outDir: 'dist',
  minify: false,
  sourcemap: true,
  bundle: true,
});
