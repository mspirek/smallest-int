module.exports = {
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  theme: {
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    fontFamily: {
      body: ['Montserrat', 'sans-serif'],
    },
    extend: {
      screens: {
        xs: '321px',
      },
      colors: {
        'body-color': '#222222',
      },
      lineHeight: {
        body: '1.55',
      },
      inset: {
        '1/2': '50%',
        '3/4': '75%',
      },
      translate: {
        '-1/2': '-50%',
      },
    },
  },
  variants: {},
  plugins: [],
};
