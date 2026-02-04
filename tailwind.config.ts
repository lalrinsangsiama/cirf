import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        pearl: '#fdfdfb',
        gold: '#d4af37',
        stone: '#7c7c7c',
        sand: '#f5f0e8',
        sage: '#a8b5a0',
        terracotta: '#c67557',
        ocean: '#5b8c9e',
        lavender: '#e8e0f5',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'reveal-text': 'revealText 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-in-up': 'fadeInUp 1s ease forwards',
        'fade-in': 'fadeIn 2s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        revealText: {
          '0%': { transform: 'translateY(110%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0.3', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '50%': { boxShadow: '0 0 0 20px rgba(212, 175, 55, 0)' },
        },
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
export default config
