import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import AppContainer from './containers/AppContainer'
import FormContainer from './containers/FormContainer'
import IncorporationForm from './components/Incorporation/IncorporationForm'
import Error from './components/Error'

const Routes = (props) => (
  <Router {...props} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="" component={AppContainer}>
      <Route path="/incorporation" component={FormContainer}>
        <IndexRoute component={IncorporationForm} />
      </Route>
      <Route path="*" component={Error} />
    </Route>
  </Router>
)

export default Routes
