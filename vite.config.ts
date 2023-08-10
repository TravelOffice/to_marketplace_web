import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import * as fs from 'fs';
import * as path from 'path';
//
// function resolvePaths() {
//   const config = fs.readFileSync(path.resolve(__dirname, 'tsconfig.node.json'), 'utf-8');
//   const paths = JSON.parse(config).compilerOptions.paths;
//   const alias = Object.entries(paths).reduce((acc, [key, value]) => {
//     acc[key] = path.resolve(__dirname, value[0]);
//     return acc;
//   }, {});
//   console.log(alias);
//   return alias;
// }

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [react()],
})
