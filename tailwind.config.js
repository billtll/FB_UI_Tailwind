/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        "main-span": "72px",
      },
      colors: {
        "fb-bg": "#18191a",
        "fb-header": "#242527",
        "fb-input": "#3a3b3d",
        "fb-popover": "#3e4042",
        "fb-active": "#323436",
        "fb-card": "#242527",
        fb: "#1877f2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
