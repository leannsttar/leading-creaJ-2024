/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',

    },
    extend: {
      fontFamily: {
        anonymous: ['Anonymous Pro', 'monospace'],
        prompt: ['Prompt', 'monospace'],
        inter: ['Inter', 'monospace'],
        Poppins: ["Poppins", "sans-serif"]
      },
    },
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [require("daisyui")],
}

