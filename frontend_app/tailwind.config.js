/** Tailwind CSS configuration with semantic tokens and dark class strategy */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (light by default via CSS variables; Tailwind still needs base fallbacks)
        background: 'var(--color-bg, #f9fafb)',
        surface: 'var(--color-surface, #ffffff)',
        text: 'var(--color-text, #111827)',
        textMuted: 'var(--color-text-muted, #4b5563)',
        primary: 'var(--color-primary, #034ea1)',
        primaryForeground: 'var(--color-primary-foreground, #ffffff)',
        accent: 'var(--color-accent, #c5168c)',
        accentForeground: 'var(--color-accent-foreground, #ffffff)',
        error: '#EF4444'
      },
      backgroundImage: {
        // Previous ocean hero kept for compatibility
        'ocean-hero': 'linear-gradient(to bottom right, rgba(59,130,246,0.1), #f9fafb)',
        // Requested gradient
        'ocean-gradient': 'linear-gradient(87deg, #c5168c, #034ea1)'
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        focus: '0 0 0 2px rgba(3, 78, 161, 0.5)'
      },
      borderRadius: {
        xl: '0.875rem'
      },
      transitionProperty: {
        'colors-opacity':
          'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow'
      }
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-ocean-hero': {
          backgroundImage: theme('backgroundImage.ocean-hero')
        },
        '.bg-ocean-gradient': {
          backgroundImage: theme('backgroundImage.ocean-gradient')
        },
        // Focus ring utilities aligned with primary and accent
        '.focus-ring-primary:focus-visible': {
          outline: 'none',
          boxShadow: theme('boxShadow.focus'),
          borderRadius: '0.5rem'
        },
        '.focus-ring-accent:focus-visible': {
          outline: 'none',
          boxShadow: '0 0 0 2px rgba(197, 22, 140, 0.5)',
          borderRadius: '0.5rem'
        },
        // High-contrast helper for overlays
        '.hc-overlay': {
          backgroundColor: 'rgba(0,0,0,0.35)'
        }
      };
      addUtilities(newUtilities, ['responsive', 'motion-safe']);
    }
  ]
};
