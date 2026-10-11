/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F1EA",
        surface: "#FBF9F4",
        ink: "#1C2A24",
        mute: "#5C6B64",
        canopy: {
          DEFAULT: "#2F6A56",
          hover: "#275B49",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        tint: "0 18px 40px -18px rgba(28, 42, 36, 0.12)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
