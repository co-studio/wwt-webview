import React from 'react'

import ProgressForm from '../ProgressForm'
import * as IncorporationFields from './IncorporationFields'

export default (props) => (
  <ProgressForm
    {...props}
    title="Incorporate a new Company"
    name="incorporation"
    firstField="companyName"
    fieldComponents={IncorporationFields}
  />
)
