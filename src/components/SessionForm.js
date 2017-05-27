import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { FieldText, Button, Row, Column } from 'co-ui'
import DocumentTitle from 'react-document-title'

import theme from '../theme'

class SessionForm extends Component {
  static propTypes = {
    handleSessionSubmit: pt.func,
    handleCancel: pt.func,
  }

  state = {
    hours: 0,
    days: 0,
    invalidHours: false,
    invalidDays: false
  }

  validateInputHours = (e) => {
    const { hours, invalidHours } = this.state
    const inputValue = e.target.value
    if (inputValue > 99 || inputValue < 0) {
      this.setState({ invalidHours: true })
    }
    else {
      if (invalidHours) {
        this.setState({
          hours: inputValue,
          invalidHours: false
        })
      }
      else {
        this.setState({ hours: inputValue })
      }
    }
  }

  validateInputDays = (e) => {
    const { days, invalidDays } = this.state
    const inputValue = e.target.value
    if (inputValue > 7 || inputValue < 0) {
      this.setState({ invalidDays: true })
    }
    else {
      if (invalidDays) {
        this.setState({
          days: inputValue,
          invalidDays: false
        })
      }
      else {
        this.setState({ days: inputValue })
      }
    }
  }

  onSubmit = (days=false, hours=false) => {
    if (!days && !hours) {
      this.props.handleCancel()
    }
    else if (!this.state.invalidDays && !this.state.invalidHours) {
      this.props.handleSessionSubmit(days, hours)
    }
  }

  render() {
    return (
      <DocumentTitle title="Your Current Session">
        <Column styles={styles.leftAlign}>
          How long would you like to remain available?

          <Row styles={styles.row}>
            <Column styles={[ styles.clearMargin, styles.marginRight ]}>
              <FieldText
                label="Hours"
                type="number"
                value={this.state.hours}
                onChange={this.validateInputHours}
                invalid={this.state.invalidHours}
                activeColor={theme.colors.primary}
                inactiveColor={theme.colors.gray.light}
                invalidColor={theme.colors.invalid}
              />
            </Column>

            <Column styles={[ styles.clearMargin, ]}>
              <FieldText
                label="Days"
                type="number"
                value={this.state.days}
                onChange={this.validateInputDays}
                invalid={this.state.invalidDays}
                activeColor={theme.colors.primary}
                inactiveColor={theme.colors.gray.light}
                invalidColor={theme.colors.invalid}
              />
            </Column>
          </Row>

          <Row styles={styles.row}>
            <Button
              type="secondary"
              color={theme.colors.primary}
              styles={styles.marginRight}
              onClick={ () => this.props.handleCancel() }>
              Cancel
            </Button>

            <Button
              type="primary"
              color={theme.colors.primary}
              styles={styles.buttonLg}
              onClick={ () => this.onSubmit(this.state.days, this.state.hours,) }>
              Submit
            </Button>
          </Row>
        </Column>
      </DocumentTitle>
    )
  }
}

const styles = StyleSheet.create({
  leftAlign: {
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  row: {
    flexWrap: 'nowrap',
    marginTop: theme.space.inner,
    marginBottom: theme.space.outer
  },
  clearMargin: {
    margin: 0
  },
  marginRight: {
    marginRight: theme.space.inner
  },
  buttonLg: {
    width: '100%'
  }
})

export default SessionForm
