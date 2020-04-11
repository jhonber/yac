import { createStore, combineReducers } from 'redux'
import userReducer from '../reducers/users'

export default () => {
  const store = createStore(
    combineReducers({
      users: userReducer
    })
  )

  return store
}
