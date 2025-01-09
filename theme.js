// theme.js

const theme = {
    colors: {
      primary: "#9D77EE", // Purple hue similar to Level SuperMind
      secondary: "#FFB74D", // Accent color like amber/orange
      background: "#100622", // Light grayish-white for clean aesthetics
      surface: "#FFFFFF", // For cards and modal backgrounds
      error: "#F44336", // Red for error messages
      textPrimary: "#2C2C2E", // Dark gray for primary text
      textSecondary: "#616161", // Light gray for secondary text
      link: "#6A57D5", // Same as primary for interactive links
    },
    typography: {
      fontFamily: "'Inter', sans-serif", // Modern font, replace with preferred
      fontSize: {
        small: "0.875rem", // 14px
        medium: "1rem", // 16px
        large: "1.25rem", // 20px
      },
      lineHeight: {
        small: "1.2",
        medium: "1.5",
        large: "1.8",
      },
    },
    spacing: (factor) => `${factor * 8}px`, // For margin and padding (1 = 8px)
    borderRadius: "8px", // Unified border-radius for consistency
    shadow: {
      default: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for elements
      hover: "0 4px 8px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow on hover
    },
  };
  
  export default theme;
  