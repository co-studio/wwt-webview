import React, { Component } from 'react'
import pt from 'prop-types'

class FormFields extends Component {
  static propTypes = {
    value: pt.string.isRequired,
    invalid: pt.bool.isRequired,
    currentField: pt.string.isRequired,
    onChange: pt.func.isRequired,
    onHelpClick: pt.func.isRequired,
    components: pt.object.isRequired,
    setInvalid: pt.func
  }

  render() {
    const {
      currentField, components, onChange, setInvalid,
      value, invalid, onHelpClick
    } = this.props
    if (!currentField) {
      return <div />
    }
    const Field = components[currentField]
    return (
      <form>
        <Field
          value={value}
          invalid={invalid}
          onChange={onChange}
          setInvalid={setInvalid}
          onHelpClick={onHelpClick}
        />
      </form>
    )
  }
}

export default FormFields
