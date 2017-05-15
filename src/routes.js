import React from 'react'
import { Router, Route } from 'react-router'

import AppContainer from './containers/AppContainer'
import Error from './components/Error'

const Routes = (props) => (
  <Router {...props} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="" component={AppContainer}>
      {/* <Route path="/incorporation" component={FormContainer} /> */}
      <Route path="*" component={Error} />
    </Route>
  </Router>
)

export default Routes
