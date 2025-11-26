/** Tailwind CSS configuration for Ocean Professional theme */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',      // Ocean Blue
        secondary: '#F59E0B',    // Amber accent
        error: '#EF4444',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#111827'
      },
      backgroundImage: {
        // Optional hero gradient utility; can also be composed via classes
        'ocean-hero': 'linear-gradient(to bottom right, rgba(59,130,246,0.1), #f9fafb)'
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
        }
      };
      addUtilities(newUtilities, ['responsive']);
    }
  ]
};
