import React from 'react'
import pt from 'prop-types'
import moment from 'moment'
import { StyleSheet, css } from 'aphrodite'
import { lighten } from 'polished'
import { Column, Row, IconButton } from 'co-ui'

import theme from '../theme'
import iconX from '../assets/icons/icon-x.svg'

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
  console.log(IconButton)
  return (
    <Row styles={styles.container}>
      <Column styles={styles.leftColumn}>
        <span className={css(styles.label)}>
          {weekDay}
        </span>
        {startTime}–{endTime}
      </Column>
      <Column styles={styles.rightColumn}>
        <IconButton
          icon={iconX}
          iconStyles={styles.icon}
          color={lighten(0.1, theme.colors.primary)}
          onClick={() => {}}
        />
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
    marginBottom: theme.space.outer
  },
  label: {
    color: theme.colors.gray.dark
  },
  leftColumn: {
    flex: '1',
    alignItems: 'flex-start',
    marginLeft: '0',
  },
  rightColumn: {
    marginRight: '0'
  },
  icon: {
    height: '14px'
  }
})

export default ScheduleItem
