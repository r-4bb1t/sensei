module.exports = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        study: {
          "0%, 100%": {
            transform: "scaleY(0.99)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "study-big": {
          "0%, 100%": {
            transform: "scaleY(0.96)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        study: "study-big 0.5s infinite",
        "study-big": "study-big 1s infinite",
      },
      colors: {
        primary: "#1672C7",
        "primary-blend": "#A0D1FF",
        black: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
          DEFAULT: "#000000",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#1672C7",
          secondary: "#F000B8",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
