// config.js
const esbuild = require('esbuild');
const { dependencies, devDependencies, peerDependencies } = require('./package.json');

// Combine all dependencies to exclude from the bundle
const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || {}),
  ...Object.keys(peerDependencies || {}),
];

esbuild.build({
  entryPoints: ['./src/app.js'],
  bundle: true,
  outfile: './dist/bundle.main.js',
  minify: true,
  //outfile: 'bundle.main.js',
  external: externals,
  platform: 'node', // Use 'browser' if targeting browser
  sourcemap: false, // Generate source maps
  format: 'cjs', // CommonJS format; change to 'esm' for ES module output
}).catch(() => process.exit(1));
