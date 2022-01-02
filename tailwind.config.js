const plugin = require('tailwindcss/plugin')

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  'black-950': '#15141F',
  'black-900': '#211F32',
  'black-800': '#52525C',
  'black-600': '#A2A0A8',
  'black-400': '#CACCCF',
  'black-200': '#D8DDE0',
  'black-100': '#E8E8E8',
  'black-50': '#F9F9FA',
  'blue-950': '#2445CD',
  'blue-900': '#4263EB',
  'blue-800': '#6680EE',
  'blue-600': '#8A9DF0',
  'blue-400': '#ACBBF3',
  'blue-200': '#D0D8F5',
  'blue-100': '#E3E7F7',
  'blue-50': '#F5F7FE',
  'green-200': '#2AC769',
  'green-400': '#1AB759',
  'green-600': '#107C10',
  'red-200': '#FF6262',
  'red-400': '#FB4E4E',
  'red-600': '#E93C3C',
  'yellow-200': '#FFBC1F',
  'yellow-400': '#F6A609',
  'yellow-600': '#E89806',
}

const width = {
  0: 0,
  32: '32px',
  48: '48px',
  auto: 'auto',
  full: '100%',
  screen: '100vw',
}

const height = {
  0: 0,
  1: '1px',
  16: '16px',
  32: '32px',
  48: '48px',
  50: '50px',
  auto: 'auto',
  full: '100%',
  screen: '100vh',
}

const space = {
  4: '4px',
  6: '6px',
  8: '8px',
  14: '14px',
  15: '15px',
  16: '16px',
  22: '22px',
  24: '24px',
  30: '30px',
  32: '32px',
  34: '34px',
  80: '80px',
}

const spacing = {
  0: '0px',
}

const fontSize = {
  0: '0',
  14: '14px',
  16: '16px',
  18: [
    '18px',
    {
      lineHeight: '160%',
    },
  ],
  24: [
    '24px',
    {
      letterSpacing: '-0.3px',
      lineHeight: '135%',
    },
  ],
  28: '28px',
}

const lineHeight = {
  24: '24px',
  150: '150%',
  160: '160%',
}

const borderRadius = {
  8: '8px',
  16: '16px',
  full: '9999px',
}

const spaceLineWidth = {
  DEFAULT: '0.5px',
  0.5: '0.5px',
}

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  important: true,
  theme: {
    screens: {},
    inset: {
      0: 0,
      '1/2': '50%',
      full: '100%',
    },
    textColor: colors,
    borderColor: colors,
    divideColor: colors,
    backgroundColor: colors,
    padding: space,
    margin: space,
    spacing: {
      0: '0px',
    },
    divideWidth: spaceLineWidth,
    borderWidth: spaceLineWidth,
    borderRadius,
    fontSize,
    lineHeight,
    boxShadow: {
      'b-24-08': '0 0 0.24rem 0 rgba(0, 0, 0, 0.08)',
      'b-24-16': '0 0 0.24rem 0 rgba(0, 0, 0, 0.16)',
    },
    width,
    height,
    maxHeight: {
      88: '0.88rem',
    },
    lineClamp: {
      2: '2',
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      auto: 'auto',
      9995: 9995,
      9996: 9996,
      9997: 9997,
      9998: 9998,
      9999: 9999,
    },
    translate: {
      0: '0',
      '1/2': '50%',
      '-1/2': '-50%',
      full: '100%',
      '-full': '-100%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top)',
          // eslint-disable-next-line no-dupe-keys
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-left': {
          paddingLeft: 'constant(safe-area-inset-left)',
          // eslint-disable-next-line no-dupe-keys
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'constant(safe-area-inset-right)',
          // eslint-disable-next-line no-dupe-keys
          paddingRight: 'env(safe-area-inset-right)',
        },
        '.safe-bottom': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          // eslint-disable-next-line no-dupe-keys
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
  corePlugins: [
    'preflight',
    'boxSizing',
    'display',
    'flex',
    'flexBasis',
    'flexDirection',
    'justifyContent',
    'alignItems',
    'fontWeight',
    'backgroundColor',
    'backgroundRepeat',
    'textColor',
    'textOpacity',
    'whitespace',
    'overflow',
    'position',
    'inset',
    'boxShadow',
    'zIndex',
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'transitionDelay',
    'float',
    'clear',
    'opacity',
    'textOverflow',
    'wordBreak',
    'textAlign',
    'verticalAlign',
    'borderWidth',
    'borderRadius',
    'borderStyle',
    'borderColor',
    'padding',
    'margin',
    'width',
    'height',
    'maxHeight',
    'fontSize',
    'lineHeight',
    'boxShadow',
    'divideWidth',
    'divideColor',
    'divideStyle',
    'whitespace',
    'objectFit',
    'translate',
    'transform',
    'rotate',
  ],
}
