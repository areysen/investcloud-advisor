/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/brain/hlm-tailwind-preset")],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: "#6a3460", // Main purple
          hover: "#c63663",   // Hover state
          light: "#e1d6df",   // Light/disabled
          dark: "#6a3f5f",    // Slightly darker
          50: "#ede7ec",      // Lightest
          100: "#e1d6df",
          200: "#b299ab",
          300: "#97748d",
          400: "#7f4c72",
          500: "#6a3460",
          600: "#6a3f5f",
          700: "#661a56",
          800: "#5a2c50",
          900: "#4a1a40",
        },
        // Secondary/Red colors
        secondary: {
          DEFAULT: "#c63663",
          light: "#ecbccb",
          dark: "#bd345f",
          50: "#fae8ee",
          100: "#fed3d1",
          200: "#febcb9",
          300: "#f8cda4",
          400: "#c63663",
          500: "#bd345f",
          600: "#b5250b",
          700: "#ae230a",
          800: "#c4000b",
          900: "#d5000d",
        },
        // Success Green
        success: {
          DEFAULT: "#00ab48",
          light: "#aee9d1",
          dark: "#007f5f",
          50: "#e5f0fb",
          100: "#b8e2de",
          200: "#aee9d1",
          300: "#47d065",
          400: "#00ab48",
          500: "#007f5f",
          600: "#006048",
        },
        // Warning/Orange
        warning: {
          DEFAULT: "#f19c4a",
          light: "#ffd79d",
          dark: "#eb9a00",
          50: "#fff9ed",
          100: "#ffd79d",
          200: "#f3ac67",
          300: "#f19c4a",
          400: "#eb9a00",
          500: "#e8b119",
          600: "#ab7000",
        },
        // Error/Danger Red
        error: {
          DEFAULT: "#d5000d",
          light: "#ffe9e8",
          dark: "#b5250b",
          50: "#ffe9e8",
          100: "#fed3d1",
          200: "#febcb9",
          300: "#d85454",
          400: "#d5000d",
          500: "#c4000b",
          600: "#b5250b",
          700: "#ae230a",
        },
        // Neutral/Gray colors
        neutral: {
          900: "#212b36", // Darkest text
          800: "#24303e",
          700: "#637482", // Medium text
          600: "#6c7987",
          500: "#87939e", // Light text
          400: "#88939e",
          300: "#9ba5b2",
          200: "#b8c0c9",
          150: "#d0d4dc", // Borders
          100: "#dadee1", // Light borders
          90: "#dbdddf",
          80: "#e0e3e7",  // Very light borders
          70: "#e1e3e5",
          60: "#e3e7e9",
          50: "#edeff3",  // Background
          40: "#edeef0",
          30: "#f3f4f5",
          20: "#f3f5f6",
          10: "#f9fafc",  // Lightest bg
          0: "#ffffff",
        },
        // Gradient colors
        gradient: {
          start: "#758592",
          end: "#626f7a",
        },
        // Additional accent colors
        accent: {
          orange: "#f19c4a",
          coral: "#c63663",
          teal: "#3cbeb7",
          mint: "#6fc9c3",
          purple: "#b299ab",
        },
        // System colors
        white: "#ffffff",
        black: "#000000",
        transparent: "transparent",
      },
      fontFamily: {
        "red-hat": ['"Red Hat Text"', "system-ui", "sans-serif"],
        helvetica: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        proxima: ['"Proxima Nova"', "system-ui", "sans-serif"],
        inter: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Base sizes from design system
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["14px", { lineHeight: "1.5" }],
        lg: ["16px", { lineHeight: "1.5" }],
        xl: ["18px", { lineHeight: "1.5" }],
        "2xl": ["20px", { lineHeight: "1.4" }],
        "3xl": ["24px", { lineHeight: "1.3" }],
        "4xl": ["28px", { lineHeight: "1.2" }],
        "5xl": ["30px", { lineHeight: "1.2" }],
        "6xl": ["32px", { lineHeight: "1.2" }],
        "7xl": ["34px", { lineHeight: "1.2" }],
        "8xl": ["38px", { lineHeight: "1.1" }],
        "9xl": ["42px", { lineHeight: "1.1" }],
        "10xl": ["60px", { lineHeight: "1" }],
        "11xl": ["128px", { lineHeight: "1" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      spacing: {
        1.5: "1.5px",
        2.5: "2.5px",
        7.5: "7.5px",
        10.5: "10.5px",
        12.5: "12.5px",
        15: "15px",
        18: "18px",
        25: "25px",
        35: "35px",
        75: "75px",
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "5px",
        md: "6px",
        lg: "10px",
        xl: "12px",
        "2xl": "20px",
        "3xl": "23px",
      },
      boxShadow: {
        sm: "0px 2px 6px 1px rgba(0, 0, 0, 0.03)",
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.05)",
        md: "0 4px 12px rgba(0, 0, 0, 0.07)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.1)",
      },
      gradientColorStops: {
        "primary-gradient": {
          from: "#c63663",
          to: "#f19c4a",
        },
      },
    },
  },
  plugins: [],
};
