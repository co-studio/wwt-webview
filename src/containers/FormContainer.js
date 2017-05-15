import React, { Component, Children, cloneElement } from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../actions'

class FormContainer extends Component {
  static propTypes = {
    children: pt.node.isRequired,
    actions: pt.object.isRequired,
    form: pt.object.isRequired,
    user: pt.object.isRequired
  }

  getFormState = (name) => {
    const { actions } = this.props
    actions.fetchForm(name)
  }

  submitFormUpdate = (name, fields) => {
    const { actions } = this.props
    actions.updateForm(name, fields)
  }

  submitFormComplete = (name, fields) => {
    const { actions } = this.props
    actions.updateAndCompleteForm(name, fields)
  }

  renderChildren = () => {
    const { children, actions, form } = this.props
    const childrenWithProps = Children.map(children,
      (child) => cloneElement(child, {
        form,
        getFormState: this.getFormState,
        onUpdate: this.submitFormUpdate,
        onComplete: this.submitFormComplete,
        sendPostbackEvent: actions.sendPostbackEvent
      })
    )
    return childrenWithProps
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    form: state.form
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
