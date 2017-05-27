import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import DocumentTitle from 'react-document-title'
import { Column, Header, Button, Row } from 'co-ui'

import theme from '../theme'
import ScheduleItem from './ScheduleItem'

class ScheduleList extends Component {
  static propTypes = {
    user: pt.object
  }

  static defaultProps = {
  }

  renderItem = (timePeriod, index) => {
    return (
      <ScheduleItem
        key={index}
        day={timePeriod.day}
        start={timePeriod.start}
        end={timePeriod.end}
        onClick={this.props.handleTimePeriodRemove}
      />
    )
  }

  render() {
    const { user } = this.props
    const { timePeriods, session } = user.schedule
    return (
      <DocumentTitle title="Schedule">
        <Column>
          <Header tag="h5"
            styles={styles.header}>
            Your Schedule
          </Header>

          {timePeriods.length > 0 && timePeriods.map(this.renderItem)}

          <Row>
            <Button
              styles={styles.fullWidth}
              type="primary"
              color={theme.colors.primary}
              onClick={() => this.props.router.push('/schedule/timePeriod')}>
              Add Time
            </Button>
          </Row>

          <Row>
            <Header tag="h5"
              styles={styles.header}>
              Current Session
            </Header>

            <div className={css(styles.header)}>
              {session.days} days, {session.hours} hrs remaining
            </div>

            <Button
              styles={styles.fullWidth}
              type="secondary"
              color={theme.colors.primary}
              onClick={() => this.props.router.push('/schedule/session')}>
              Manage Session
            </Button>
          </Row>
        </Column>
      </DocumentTitle>
    )
  }
}

const styles = StyleSheet.create({
  base: {
  },
  noWrap: {
    flexWrap: 'nowrap'
  },
  fullWidth: {
    width: '100%'
  },
  header: {
    marginTop: '0',
    marginBottom: theme.space.outer
  }
})

export default ScheduleList
