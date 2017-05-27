import React, { Component, PropTypes } from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { css, StyleSheet } from 'aphrodite'

import { fetchUser } from '../actions'
import theme from '../theme'
import Error from '../components/Error'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    user: pt.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchUser()
  }

  render () {
    const { children, user } = this.props
    const inDevelopment = (process.env.NODE_ENV === 'development')
    const body = (user.mid || inDevelopment) ? children : <Error />
    return (
      <main className={css([ styles.type, styles.layout ])}>
        <h1>error: {user.err}</h1>
        <h1>mid: {user}</h1>
        {body}
      </main>
    )
  }
}

/**
 * Global Styles
 */
const styles = StyleSheet.create({
  type: {
    fontFamily: theme.type.family.coHalisRounded,
    fontSize: theme.type.size.body,
    // letterSpacing: '1px',
    color: theme.colors.text
  },
  layout: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: `${theme.space.outer} 0`,
    backgroundColor: theme.colors.gray.lightest
  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
