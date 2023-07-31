/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'background1': '#404040',
        'text1': '#d9d9d9',
        'text2': '#ababab',
        // add other color variables here...
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'small': '11px',
        'large': '12px',
      },
      fontWeight: {
        'normal': 400,
        'medium': 500,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
