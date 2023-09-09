/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--inter-font)", "sans-serif"],
        secondary: ["var(--lilita-font)", "sans-serif"]
      },
      colors: {
        // Light mode colors
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        text: 'var(--text-color)',
        background: 'var(--background-color)',

        // Dark mode colors
        'dark-primary': 'var(--dark-primary-color)',
        'dark-secondary': 'var(--dark-secondary-color)',
        'dark-accent': 'var(--dark-accent-color)',
        'dark-text': 'var(--dark-text-color)',
        'dark-background': 'var(--dark-background-color)',
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, #4169e1, #364dba, #293394, #19196f, #07004d)',
      },
    },
  },
  plugins: [],
}

