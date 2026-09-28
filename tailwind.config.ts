import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // "Crépuscule" palette — night sky from the logo, sunset glow from the hero film
        canvas: '#061423',
        deep: '#081B2D',
        surface: '#0D2840',
        accent: {
          DEFAULT: '#00AEEF', // logo cyan
          press: '#0096D1',
        },
        sun: '#F6A93B', // sunset amber
        whatsapp: '#25D366',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        flap: {
          from: { transform: 'perspective(20em) rotateX(75deg)', opacity: '0.35' },
          to: { transform: 'perspective(20em) rotateX(0deg)', opacity: '1' },
        },
        'soft-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '80%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'scroll-hint': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(200%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'pop-in': 'pop-in 0.2s ease-out both',
        'fade-up': 'fade-up 1s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        flap: 'flap 0.08s ease-out both',
        'soft-ping': 'soft-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scroll-hint': 'scroll-hint 1.6s ease-in-out infinite',
      },
    },
  },
};
export default config;
