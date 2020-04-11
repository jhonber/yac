const initial = {
  currentUser: {}
}

export default (state = initial, action) => {
  console.log('XXXX: ', action)
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}
