import { StyleSheet } from 'aphrodite'

/**
 * Color Palette
 */
const colors = {
  primary: '#ff8552',
  accent: '#664e4c',
  invalid: '#DB5461',
  white: '#fff',
  text: '#2C2C2A',
  gray: {
    darkest: '#4c4c4d',
    darker: '#747475',
    dark: '#9c9c9c',
    light: '#c3c3c3',
    lighter: '#d7d7d7',
    lightest: '#ebebeb',
  }
}

/**
 * Font Faces
 */
const HalisRounded = 'coHalisRounded'
import HalisRoundedBold from './assets/fonts/HalisRounded-Bold.otf'
import HalisRoundedMedium from './assets/fonts/HalisRounded-Medium.otf'
import HalisRoundedRegular from './assets/fonts/HalisRounded-Regular.otf'
import HalisRoundedLight from './assets/fonts/HalisRounded-Light.otf'
const family = {
  [HalisRounded]: [
    {
      fontFamily: HalisRounded,
      fontWeight: 900,
      src: `url(${HalisRoundedBold}) format('opentype')`
    },
    {
      fontFamily: HalisRounded,
      fontWeight: 700,
      src: `url(${HalisRoundedMedium}) format('opentype')`
    },
    {
      fontFamily: HalisRounded,
      fontWeight: 500,
      src: `url(${HalisRoundedRegular}) format('opentype')`
    },
    {
      fontFamily: HalisRounded,
      fontWeight: 300,
      src: `url(${HalisRoundedLight}) format('opentype')`
    },
  ]
}

/**
 * Typography
 */
const type = {
  family,
  size: {
    displayLarge: '48px',
    displayMedium: '42px',
    displaySmall: '36px',
    header: '28px',
    subheader: '24px',
    body: '18px',
    caption: '14px',
  },
  weight: {
    bold: 700,
    medium: 500,
    regular: 300,
    light: 100,
  },
  height: {
    body: '27px'
  }
}

/**
 * Spacing
 */
const space = {
  container: '50px',
  outer: '25px',
  inner: '12.5px',
}

/**
 * Hover Styles
 */
const shadow = {
  hover: '1px 2px 6px 1px rgba(0,0,0,.3)'
}

/**
 * Moisan Theme
 */
const theme = {
  colors,
  type,
  space,
  layout: {
    width: '1024px'
  },
  border: {
    radius: '3px',
  },
  shadow,
  transition: {
    hover: 'all 0.15s cubic-bezier(0, 0, .7, 1)'
  },
}

export default theme
