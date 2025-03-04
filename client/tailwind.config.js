/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'button-gradient': 'linear-gradient(to right, #D1B0D4, #8B68AD, #5A3592)',
        },
      },
    },
    plugins: [],
  }
  