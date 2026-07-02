import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      // New in eslint-plugin-react-hooks v6. Flags the SSR-safe pattern of
      // hydrating state from localStorage/props inside an effect, which this
      // app relies on (lazy initializers would cause hydration mismatches).
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    '.netlify/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
    'src/_archived_pages/**',
  ]),
])
