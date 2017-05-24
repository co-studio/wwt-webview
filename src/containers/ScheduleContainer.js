import React, { Component, Children, cloneElement } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import theme from '../theme'
import * as actionCreators from '../actions'

class ScheduleContainer extends Component {
  static propTypes = {
  }

  handleSessionSubmit = (hours, days) => {
    const { actions } = this.props
    actions.submitScheduleSession(hours, days)
  }

  handleCancel = () => {
    const { actions } = this.props
    actions.closeWebview()
  }

  renderChildren = () => {
    const { children } = this.props
    const childrenWithProps = Children.map(children,
      (child) => cloneElement(child, {
        handleSessionSubmit: this.handleSessionSubmit,
        handleCancel: this.handleCancel,
      })
    )
    return childrenWithProps
  }

  render() {
    return (
      <div className={css(styles.base)}>
        {this.renderChildren()}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  base: {
    boxSizing: 'border-box',
    width: '100%',
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer)
