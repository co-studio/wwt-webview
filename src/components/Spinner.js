import React from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Column } from 'co-ui'

import spinner from '../assets/images/spinner.svg'

const Spinner = (props) => {
  return (
    <Column styles={styles.base}>
      <img src={spinner} />
    </Column>
  )
}

const styles = StyleSheet.create({
  base: {
    minHeight: '50vh',
  }
})

export default Spinner
