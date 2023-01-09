module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: ["cupcake", "night",  
    {
      night: {
        ...require("daisyui/src/colors/themes")["[data-theme=night]"],
        "neutral": "#121212",
        "base-100": '#181818',
        "base-200": "#282828",
        "primary": "#002B3D",
        "error": "#DF2935"
      },
    },],
  },
}