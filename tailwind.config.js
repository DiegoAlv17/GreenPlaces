const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx,ts,tsx}",flowbite.content()];
export const theme = {
  extend: {
    
    animation: {
      "spin-slow": "spin 3s linear infinite",
    },
  },
};
export const plugins = [
    flowbite.plugin(),
];
