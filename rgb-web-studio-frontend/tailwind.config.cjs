/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`,
  ],
  theme: {
    extend: {
      colors: {
        "black-1" : "#2C2E30",
        "gray-1" : "#F4F5F5",
        "gray-2" : "#A0A3A6",
        "blue-1" : "#EFF6FF",
        "blue-2" : "#2563EB",
        "blue-3": "#3572EF",
        "blue-4": "#050C9C",
        "blue-5": "#3ABEF9",
        "blue-6": "#A7E6FF",
      },
    },
  },
  plugins: [],
};
