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
const CONFIG = config[env]

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Room
            config={CONFIG}
          />
        </Route>
        <Route path='/login'>
          <Login
            config={CONFIG}
          />
        </Route>
        <Route path='/signup'>
          <Signup
            config={CONFIG}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
