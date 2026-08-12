import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * React and everything that only talks to React, kept in one chunk. `react-router`
 * pulls in `cookie` / `set-cookie-parser`, so those belong here too — leaving them in
 * `vendor` makes `vendor` and `vendor-react` import each other and Rollup warns about
 * a circular chunk.
 */
const REACT_CORE = /node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|cookie|set-cookie-parser)\//

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  esbuild: {
    // Keep console in the SSR bundle: prerender.js runs it at build time and its
    // console.error is how a broken route announces itself instead of shipping blank.
    drop: isSsrBuild ? ['debugger'] : ['console', 'debugger'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      // manualChunks is a client-bundle concern. Applying it to the SSR build splits
      // the server entry across chunks that prerender.js would then have to stitch
      // together, for no benefit — nothing about the build output is downloaded.
      output: isSsrBuild ? {} : {
        // Most specific first: "lucide-react" contains the substring "react", so a loose
        // react test earlier in the chain swallows it and the branch never fires.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/lucide-react/')) return 'vendor-lucide';
          if (id.includes('/framer-motion/')) return 'vendor-framer';
          if (REACT_CORE.test(id)) return 'vendor-react';
          return 'vendor';
        }
      }
    }
  }
}))
