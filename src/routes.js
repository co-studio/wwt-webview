import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import AppContainer from './containers/AppContainer'
import ScheduleContainer from './containers/ScheduleContainer'
import Error from './components/Error'

import SessionForm from './components/SessionForm'
import ScheduleList from './components/ScheduleList'

const Routes = (props) => (
  <Router {...props} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="" component={AppContainer}>
      <Route path="/schedule" component={ScheduleContainer}>
        <IndexRoute component={ScheduleList} />
        <Route path="timePeriod" component={SessionForm} />
        <Route path="session" component={SessionForm} />
      </Route>
      <Route path="*" component={Error} />
    </Route>
  </Router>
)

export default Routes
