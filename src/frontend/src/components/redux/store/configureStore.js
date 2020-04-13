import { createStore, combineReducers } from 'redux'
import usersReducer from '../reducers/users'

export default () => {
  const store = createStore(
    combineReducers({
      users: usersReducer
    })
  )

  return store
}
