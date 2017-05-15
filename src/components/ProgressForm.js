import React, { Component } from 'react'
import pt from 'prop-types'
import DocumentTitle from 'react-document-title'
import { StyleSheet } from 'aphrodite'
import { Column, Row, ProgressBar, Button } from 'co-ui'

import theme from '../theme'
import FormFields from './FormFields'
import Spinner from './Spinner'

class ProgressForm extends Component {
  static propTypes = {
    title: pt.string.isRequired,
    name: pt.string.isRequired,
    firstField: pt.string.isRequired,
    fieldComponents: pt.object.isRequired,
    getFormState: pt.func.isRequired,
    onUpdate: pt.func.isRequired,
    onComplete: pt.func.isRequired
  }

  state = {
    progress: 0,
    invalid: false,
    loading: true,
    fields: {},
    currentField: this.props.firstField,
  }

  componentDidMount() {
    this.props.getFormState(this.props.name)
  }

  componentDidUpdate(prevProps) {
    const { form, name, firstField } = this.props
    if (!form.loading && this.state.loading) {
      let fetchedFields = Object.entries(form[name])
      if (fetchedFields[0][0] !== firstField) {
        fetchedFields = fetchedFields.reverse()
      }
      const orderedFields = {}
      fetchedFields.map(([ key, val ]) => orderedFields[key] = val)
      const [ nextEmptyFieldKey ] = fetchedFields.filter(([ key, val ]) => val === '').map(obj => obj[0])
      const [ lastFieldKey ] = fetchedFields[ fetchedFields.length - 1 ]
      this.setState({
        fields: orderedFields,
        loading: false,
        currentField: nextEmptyFieldKey || lastFieldKey
      })
    }
  }

  getTotalFields = (fields) => Object.keys(fields).length

  getFieldIndex = (fields, currentField) => {
    const fieldKeys = Object.keys(fields)
    return fieldKeys.indexOf(currentField)
  }

  setInvalid = (invalid) => this.setState({ invalid })

  handleChangeField = (direction) => {
    const { fields, currentField } = this.state
    const fieldKeys = Object.keys(fields)
    const currentFieldIndex = this.getFieldIndex(fields, currentField)
    if (direction === 'next') {
      this.changeFieldNext(currentFieldIndex, fieldKeys)
    }
    else if (direction === 'previous') {
      this.changeFieldPrevious(currentFieldIndex, fieldKeys)
    }
    else {
      console.error(`Must specify 'next' or 'previous' as direction! Received: ${direction}`)
    }
  }

  changeFieldPrevious = (currentFieldIndex, fieldKeys) => {
    if (currentFieldIndex - 1 >= 0) {
      this.setState({ currentField: fieldKeys[currentFieldIndex - 1] })
    }
  }

  changeFieldNext = (currentFieldIndex, fieldKeys) => {
    if (currentFieldIndex + 1 < fieldKeys.length) {
      this.setState({ currentField: fieldKeys[currentFieldIndex + 1] })
    }
  }

  handleInputChange = (e) => {
    const fields = { ...this.state.fields }
    fields[this.state.currentField] = e.target.value
    this.setState({ fields })
  }

  handleUpdate = (currentFieldIndex, numFields, direction) => {
    const { name, onUpdate, onComplete } = this.props
    const { fields, invalid } = this.state
    if (!invalid) {
      if (currentFieldIndex + 1 === numFields && direction === 'next') {
        onComplete(name, fields)
      }
      else{
        onUpdate(name, fields)
      }
    }
  }

  handleNavigateClick = (direction) => (e) => {
    const { invalid, currentField, fields } = this.state
    const currentValue = fields[currentField]
    e.preventDefault()
    if (!invalid && currentValue !== '') {
      const numFields = this.getTotalFields(fields)
      const currentFieldIndex = this.getFieldIndex(fields, currentField)
      this.handleUpdate(currentFieldIndex, numFields, direction)
      this.handleChangeField(direction)
    }
  }

  render() {
    const { form, fieldComponents, title, sendPostbackEvent } = this.props
    const { fields, currentField, invalid } = this.state
    if (form.loading) {
      return <Spinner />
    }
    const progress = this.getFieldIndex(fields, currentField)
    const total = this.getTotalFields(fields)
    const isLastField = (total - progress === 1)
    return (
      <DocumentTitle title={title}>
        <Column styles={styles.column}>
          <ProgressBar
            color={theme.colors.primary}
            bgColor={theme.colors.gray.lighter}
            progress={progress}
            total={total}
          />

          <FormFields
            currentField={currentField}
            value={fields[currentField] || ''}
            invalid={invalid}
            components={fieldComponents}
            onChange={this.handleInputChange}
            setInvalid={this.setInvalid}
            onHelpClick={sendPostbackEvent}
          />

          <Row styles={styles.row}>
            <Button
              type="secondary"
              color={theme.colors.primary}
              onClick={this.handleNavigateClick('previous')}>
              Previous
            </Button>
            <Button
              styles={styles.nextButton}
              type="primary"
              color={theme.colors.primary}
              onClick={this.handleNavigateClick('next')}>
              { isLastField ? 'Submit' : 'Continue' }
            </Button>
          </Row>
        </Column>
      </DocumentTitle>
    )
  }
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
    margin: `0 ${theme.space.inner}`,
    minHeight: '100%'
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: '0'
  },
  nextButton: {
    flex: '1',
    marginLeft: '10px'
  },
  subText: {
    margin: '0',
    color: theme.colors.gray.light,
    fontSize: theme.type.size.caption,
    fontWeight: 700
  },
  helpLink: {
    color: theme.colors.accent
  }
})

export default ProgressForm
