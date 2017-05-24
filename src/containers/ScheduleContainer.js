import React, { Component, Children, cloneElement } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import theme from '../theme'
import * as actions from '../actions'

class ScheduleContainer extends Component {
  static propTypes = {
  }

  handleSessionSubmit = (hours, days) => {
    console.log(hours, days)
  }

  handleCancel = () => {

  }

  renderChildren = () => {
    const { children, actions } = this.props
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
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps)(ScheduleContainer)
