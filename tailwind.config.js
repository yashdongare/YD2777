/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        base: {
          950: '#07060f',
          900: '#0b0a17',
          850: '#100e1f',
          800: '#151328',
          700: '#1e1b38',
          600: '#2a2650',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        azure: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        mint: {
          400: '#34d399',
          500: '#10b981',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
        },
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 20% -10%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 90% 10%, rgba(59,130,246,0.25), transparent 40%)',
        'brand-gradient': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(139,92,246,0.45)',
        card: '0 8px 30px rgba(0,0,0,0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
