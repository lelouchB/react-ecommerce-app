module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Sacramento", "cursive", "sans-serif"],
      "product-title": ["Bentham", "serif"],
      "product-description": ["Playfair Display", "serif"],
      "product-price": ["Suranna", "serif"],
    },
  },
  plugins: [],
};
