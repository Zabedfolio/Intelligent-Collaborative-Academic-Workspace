/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7f3',
          100: '#e1f0e7',
          200: '#c3e1cf',
          500: '#005222',
          DEFAULT: '#003717',
          600: '#003717',
          700: '#002911',
          800: '#001c0c',
          900: '#000f06'
        },
        surface: '#ffffff',
        'surface-subtle': '#f8fafc',
        'surface-border': '#e2e8f0',
        primary: {
          50: '#f0f7f3',
          100: '#e1f0e7',
          500: '#005222',
          600: '#003717',
          700: '#002911'
        },
        accent: {
          cyan: '#0284c7',
          emerald: '#059669',
          rose: '#e11d48',
          amber: '#d97706'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))'
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  },
  plugins: []
};
