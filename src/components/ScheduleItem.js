import React from 'react'
import pt from 'prop-types'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite'
import { Column, Row } from 'co-ui'

import theme from '../theme'

const ScheduleItem = (props) => {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const weekDay = weekDays[props.day]
  const formatTime = (time) => {
    if (time < 12) {
      return `${time}AM`
    }
    else if (time === 12) {
      return `${time}PM`
    }
    else if (time === 24) {
      return `${time - 12}AM`
    }
    else {
      return `${time - 12}PM`
    }
  }
  const startTime = formatTime(props.start)
  const endTime = formatTime(props.end)
  return (
    <Row styles={styles.container}>
      <Column styles={styles.leftColumn}>
        <span className={css(styles.label)}>
          {weekDay}
        </span>
        {startTime}–{endTime}
      </Column>
      <Column>
        icon
      </Column>
    </Row>
  )
}

ScheduleItem.propTypes = {
  day: pt.number.isRequired,
  start: pt.number.isRequired,
  end: pt.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.space.inner
  },
  label: {
    color: theme.colors.gray.dark
  },
  leftColumn: {
    flex: '1',
    alignItems: 'flex-start'
  }
})

export default ScheduleItem
