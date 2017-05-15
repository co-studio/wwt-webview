import React from 'react'
import pt from 'prop-types'
import { StyleSheet } from 'aphrodite'
import { Row, FieldText } from 'co-ui'

import theme from '../theme'

const FieldTextBody = (props) => {
  const validateInput = (e) => {
    if (e.target.value === '') {
      props.setInvalid(true)
    }
    else if (props.invalid) {
      props.setInvalid(false)
    }
    props.onChange(e)
  }
  return (
    <Row styles={styles.row}>
      {props.children}
      <FieldText
        styles={styles.input}
        type={props.type || "text"}
        value={props.value}
        onChange={validateInput}
        placeholder={props.placeholder}
        invalid={props.invalid}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.gray.lighter}
        invalidColor={theme.colors.invalid}
      />
    </Row>
  )
}

FieldTextBody.propTypes = {
  children: pt.node.isRequired,
  onChange: pt.func.isRequired,
  value: pt.string.isRequired,
  invalid: pt.bool.isRequired,
  placeholder: pt.string
}

FieldTextBody.defaultProps = {
  invalid: false
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'flex-start',
    marginBottom: '0',
    padding: `${theme.space.outer} 0`
  },
  input: {
    marginTop: theme.space.inner
  }
})

export default FieldTextBody
