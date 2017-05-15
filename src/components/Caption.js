import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'

import theme from '../theme'

class Caption extends Component {
  render() {
    return (
      <span
        className={css(styles.base, this.props.styles)}>
        {this.props.children}
      </span>
    )
  }
}

const styles = StyleSheet.create({
  base: {
    display: 'block',
    margin: '0',
    fontSize: theme.type.size.caption,
    fontWeight: theme.type.weight.bold,
    color: theme.colors.gray.light,
    textAlign: 'left'
  }
})

export default Caption
