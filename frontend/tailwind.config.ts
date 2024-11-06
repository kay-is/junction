import type { Config } from 'tailwindcss'
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      borderRadius: { none: '0', sm: '0', DEFAULT: '0', lg: '0', full: '0' },
      colors: {
        primary: {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81'
        }
      }
    }
  },
  plugins: [flowbitePlugin]
} as Config
