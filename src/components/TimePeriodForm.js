import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { Column, Row, Button, MultiSelectButton } from 'co-ui'
import DocumentTitle from 'react-document-title'
import ReactSlider from 'react-slider'
import { Text } from 'co-ui'

import theme from '../theme'

class TimePeriodForm extends Component {
  static propTypes = {
    handleTimePeriodSubmit: pt.func,
    handleCancel: pt.func,
  }

  state = {
    options: {
      Su: false,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    },
    startHour: 8,
    endHour: 16
  }

  selectDay = (option) => {
    const options = { ...this.state.options }
    options[option.label] = !option.value
    this.setState({ options })
  }

  formatHour(hour) {
    if (hour < 12) {
      return `${hour}am`
    }
    else if (hour === 12) {
      return `${hour}pm`
    }
    else if (hour === 24) {
      return `${hour - 12}am`
    }
    else {
      return `${hour - 12}pm`
    }
  }

  handleSliderChange = ([ startHour, endHour ]) => {
    this.setState({ startHour, endHour })
  }

  // convert { Su: false } -> [ false ]
  formatDayToInt(options) {
    const days = []
    for (let [ day, value ] of Object.entries(options)) {
      days.push(value)
    }
    return days
  }

  onSubmit = (options, start=false, end=false) => {
    const days = this.formatDayToInt(options)
    if (!days.some(day => day) || !start || !end ) {
      this.props.handleCancel()
    }
    this.props.handleTimePeriodSubmit(days, start, end)
  }

  render() {
    return (
      <DocumentTitle title={"Add To your Schedule"}>
        <Column>
          <Row styles={styles.row}>
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
          </Row>

          <Row styles={styles.row}>
            <Text styles={styles.sliderLabel}>
              {this.formatHour(this.state.startHour)}–{this.formatHour(this.state.endHour)}
            </Text>
            <ReactSlider
              min={1}
              max={24}
              defaultValue={[ this.state.startHour, this.state.endHour ]}
              withBars={true}
              onChange={this.handleSliderChange}
              className={css(styles.sliderClass)}
              handleClassName={css(styles.handleClass)}
              barClassName={css(styles.barClass)}
            />
          </Row>

          <Row styles={[ styles.row, styles.noWrap ]}>
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
              onClick={ () => this.onSubmit(this.state.options, this.state.startHour, this.state.endHour) }>
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
    marginTop: theme.space.inner,
    marginBottom: theme.space.outer
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  marginRight: {
    marginRight: theme.space.inner
  },
  buttonLg: {
    width: '100%'
  },
  sliderLabel: {
    display: 'block',
    width: '100%',
    marginTop: '0',
    fontWeight: theme.type.weight.medium
  },
  sliderClass: {
    height: '17px',
    width: '100%',
    background: theme.colors.gray.lighter,
    borderRadius: theme.border.radius,
  },
  handleClass: {
    top: '-4px',
    height: '26px',
    width: '26px',
    borderRadius: '20px',
    boxShadow: theme.shadow,
    background: theme.colors.gray.light,
    touchAction: 'none' // avoid Chrome warning
  },
  barClass: {
    ':nth-child(2)': {
      height: '17px',
      margin: '0 5px',
      borderRadius: theme.border.radius,
      background: theme.colors.primary
    }
  }
})

export default TimePeriodForm
