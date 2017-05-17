import React, { Component } from 'react'
import pt from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import theme from '../theme'

class ScheduleContainer extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <div
        className={css(styles.base, this.props.styles)}>
        {this.props.children}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  base: {
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchUser }, dispatch)
// }

export default connect(mapStateToProps)(ScheduleContainer)
