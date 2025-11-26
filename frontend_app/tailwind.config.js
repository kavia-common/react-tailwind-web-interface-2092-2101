/** Tailwind CSS configuration updated for Magenta-Blue gradient theme */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Updated brand palette derived from #c5168c (magenta) and #034ea1 (deep blue)
        primary: '#034ea1',      // Primary actions and key accents
        accent: '#c5168c',       // Secondary accent
        secondary: '#c5168c',    // Backwards-compatible alias
        error: '#EF4444',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#111827'
      },
      backgroundImage: {
        // Previous ocean-hero kept for compatibility
        'ocean-hero': 'linear-gradient(to bottom right, rgba(59,130,246,0.1), #f9fafb)',
        // New app-wide gradient at the exact requested angle and stops
        'ocean-gradient': 'linear-gradient(87deg, #c5168c, #034ea1)'
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      },
      borderRadius: {
        xl: '0.875rem'
      },
      transitionProperty: {
        'colors-opacity': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity'
      }
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-ocean-hero': {
          backgroundImage: theme('backgroundImage.ocean-hero')
        },
        // Utility for the specified gradient
        '.bg-ocean-gradient': {
          backgroundImage: theme('backgroundImage.ocean-gradient')
        }
      };
      addUtilities(newUtilities, ['responsive', 'motion-safe']);
    }
  ]
};
