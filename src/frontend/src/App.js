import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import config from './config.json'

import Signup from './components/signup/signup'
import Login from './components/login/login'
import Room from './components/room/room'

const env = config.env
config.urlBase = config[env].urlBase

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Room
            config={config}
          />
        </Route>
        <Route path='/login'>
          <Login
            config={config}
          />
        </Route>
        <Route path='/signup'>
          <Signup
            config={config}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
