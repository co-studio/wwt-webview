import { StyleSheet } from 'aphrodite'


/**
 * Color Palette
 */
const colors = {
  primary: '#6BAB90',
  accent: '#8A5E60',
  invalid: '#DB5461',
  white: '#fff',
  text: '#2C2C2A',
  gray: {
    darkest: '#565755',
    darker: '#6B6C69',
    dark: '#80817F',
    light: '#BFC0BF',
    lighter: '#D5D5D4',
    lightest: '#E9EAE9',
  }
}

/**
 * Font Faces
 */
const Verlag = 'coVerlag'
import VerlagBlack from './assets/fonts/Verlag-Black.otf'
import VerlagBold from './assets/fonts/Verlag-Bold.otf'
import VerlagBook from './assets/fonts/Verlag-Book.otf'
import VerlagLight from './assets/fonts/Verlag-Light.otf'
import VerlagXLight from './assets/fonts/Verlag-XLight.otf'
const family = {
  [Verlag]: [
    {
      fontFamily: Verlag,
      fontWeight: 900,
      src: `url(${VerlagBlack}) format('opentype')`
    },
    {
      fontFamily: Verlag,
      fontWeight: 700,
      src: `url(${VerlagBold}) format('opentype')`
    },
    {
      fontFamily: Verlag,
      fontWeight: 500,
      src: `url(${VerlagBook}) format('opentype')`
    },
    {
      fontFamily: Verlag,
      fontWeight: 300,
      src: `url(${VerlagLight}) format('opentype')`
    },
    {
      fontFamily: Verlag,
      fontWeight: 100,
      src: `url(${VerlagXLight}) format('opentype')`
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
