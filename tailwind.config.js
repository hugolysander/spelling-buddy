module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic-sans': ['"Comic Sans MS"', '"Chalkboard SE"', 'cursive', 'sans-serif'],
      },
    },
  },
  plugins: [],
};