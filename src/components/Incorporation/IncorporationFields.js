import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Text } from 'co-ui'

import theme from '../../theme'
import FieldTextBody from '../FieldTextBody'
import Caption from '../Caption'

const CompanyName = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="Bob's Burgers LLC">
      <Text styles={styles.text}>
        What is your company's legal name?
      </Text>
      <Caption>
        Unsure of your options or want to make sure your name is available?
        <a className={css(styles.helpLink)}
          onClick={() => props.onHelpClick('COMPANYNAME_INCORPORATION')}>
          {' '}Click Here
        </a>
      </Caption>
    </FieldTextBody>
  )
}

const FounderName = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="Saul Goodman">
      <Text styles={styles.text}>
        And what's your name?
      </Text>
    </FieldTextBody>
  )
}

const FounderPhone = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="123-456-7890">
      <Text styles={styles.text}>
        What is your phone number?
      </Text>
    </FieldTextBody>
  )
}

const FounderEmail = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="better.call@saul.com"
      type="email">
      <Text styles={styles.text}>
        Also, what's your email address?
        <Caption>
          I need this to send you your completed documents!
        </Caption>
      </Text>
    </FieldTextBody>
  )
}

const FounderAddress = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="415 Sycamore Lane">
      <Text styles={styles.text}>
        How about your address?
      </Text>
    </FieldTextBody>
  )
}

const FounderCity = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="New York">
      <Text styles={styles.text}>
        Which city is that in?
      </Text>
    </FieldTextBody>
  )
}

const FounderState = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="New York">
      <Text styles={styles.text}>
        And which state is that city in?
      </Text>
    </FieldTextBody>
  )
}

const FounderZip = (props) => {
  return (
    <FieldTextBody
      {...props}
      placeholder="10001">
      <Text styles={styles.text}>
        Finally, what's the zip code over there?
      </Text>
    </FieldTextBody>
  )
}

const styles = StyleSheet.create({
  text: {
    margin: '0',
    fontWeight: '500'
  },
  helpLink: {
    color: theme.colors.primary
  }
})

export {
  CompanyName as companyName,
  FounderName as name,
  FounderAddress as address,
  FounderCity as city,
  FounderState as state,
  FounderZip as zip,
  FounderPhone as phone,
  FounderEmail as email,
}
