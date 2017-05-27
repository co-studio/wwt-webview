import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Column, Header, Button } from 'co-ui'

import theme from '../theme'

class Error extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <Column
        className={css(styles.base, this.props.styles)}>
        <Header
          styles={styles.header}
          tag="h1">
          Nothing to see here...
        </Header>
        <Header
          tag="h4"
          styles={styles.subheader}>
          Please access this page through the Messenger app for iOS or Android
          to continue!
        </Header>
        <div
          className="fb-messengermessageus"
          data-messenger_app_id="1750463461934766"
          data-page_id="1763620363890366"
          data-color="blue"
          data-size="xlarge"
        />
      </Column>
    )
  }
}

const styles = StyleSheet.create({
  base: {
  },
  header: {
    marginBottom: 0
  },
  subheader: {
    color: theme.colors.gray.dark
  }
})

export default Error
