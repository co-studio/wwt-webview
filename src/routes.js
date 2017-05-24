import React from 'react'
import { Router, Route } from 'react-router'

import AppContainer from './containers/AppContainer'
import ScheduleContainer from './containers/ScheduleContainer'
import Error from './components/Error'

import SessionForm from './components/SessionForm'

const Routes = (props) => (
  <Router {...props} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="" component={AppContainer}>
      <Route path="/schedule" component={ScheduleContainer}>
        <Route path="session" component={SessionForm} />
      </Route>
      <Route path="*" component={Error} />
    </Route>
  </Router>
)

export default Routes
