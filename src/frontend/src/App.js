import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Signup from './components/signup/signup'
import Login from './components/login/login'
import Room from './components/room/room'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Room />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
