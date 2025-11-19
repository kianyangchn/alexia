/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        garden: {
          grass: '#7ED957',
          sky: '#87CEEB',
          sun: '#FFD700',
          soil: '#8B4513',
        },
      },
    },
  },
  plugins: [],
}
