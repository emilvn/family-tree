/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "inact-green": "#304642",
        "inact-violet": "#E7E2EF"
      }
    },
  },
  plugins: [
  ],
}

