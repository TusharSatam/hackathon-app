const { default: theme } = require('./theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        background: theme.colors.background,
        surface: theme.colors.surface,
        error: theme.colors.error,
        textPrimary: theme.colors.textPrimary,
        textSecondary: theme.colors.textSecondary,
        link: theme.colors.link,
      },
      fontFamily: {
        sans: theme.typography.fontFamily,
      },
      borderRadius: {
        DEFAULT: theme.borderRadius,
      },
      boxShadow: {
        default: theme.shadow.default,
        hover: theme.shadow.hover,
      },
    },
  },
  plugins: [],
}

