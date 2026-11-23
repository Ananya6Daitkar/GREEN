/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#F6EEDF',
        'forest': '#193F36',
        'timber': '#C58B5C',
        'terracotta': '#E99A60',
        'citron': '#DCEB8A',
        'charcoal': '#29332F',
      },
      fontFamily: {
        'serif': ['Instrument Serif', 'serif'],
        'display': ['Fraunces', 'serif'],
        'sans': ['Manrope', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
