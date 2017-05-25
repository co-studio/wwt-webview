import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Column, Row, Button, MultiSelectButton } from 'co-ui'
import DocumentTitle from 'react-document-title'
import Slider from 'rc-slider'

import theme from '../theme'

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

class TimePeriodForm extends Component {
  static propTypes = {
  }

  state = {
    options: {
      Su: false,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      Sa: false,
    }
  }

  selectDay = (option) => {
    const options = { ...this.state.options }
    options[option.label] = !option.value
    this.setState({ options })
  }

  formatHour(hour) {
    if (hour < 12) {
      return `${hour}AM`
    }
    else if (hour === 12) {
      return `${hour}PM`
    }
    else if (hour === 24) {
      return `${hour - 12}AM`
    }
    else {
      return `${hour - 12}PM`
    }
  }

  render() {
    return (
      <DocumentTitle title={"Add To your Schedule"}>
        <Column>
          <MultiSelectButton
            type="secondary"
            color={theme.colors.primary}
            options={[
              { label: 'Su', value: this.state.options.Su },
              { label: 'M', value: this.state.options.M },
              { label: 'Tu', value: this.state.options.Tu },
              { label: 'W', value: this.state.options.W },
              { label: 'Th', value: this.state.options.Th },
              { label: 'F', value: this.state.options.F },
              { label: 'Sa', value: this.state.options.Sa },
            ]}
            onClick={this.selectDay}
          />

          <Range
            min={0}
            max={24}
            tipFormatter={this.formatHour}
          />

          <Row styles={styles.row}>
            <Button
              type="secondary"
              color={theme.colors.primary}
              styles={styles.marginRight}
              onClick={ () => this.onSubmit() }>
              Cancel
            </Button>

            <Button
              type="primary"
              color={theme.colors.primary}
              styles={styles.buttonLg}
              onClick={ () => this.onSubmit(this.state.hours, this.state.days) }>
              Save
            </Button>
          </Row>
        </Column>
      </DocumentTitle>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexWrap: 'nowrap',
    marginTop: theme.space.inner,
    marginBottom: theme.space.outer
  },
  marginRight: {
    marginRight: theme.space.inner
  },
  buttonLg: {
    width: '100%'
  }
})

export default TimePeriodForm
