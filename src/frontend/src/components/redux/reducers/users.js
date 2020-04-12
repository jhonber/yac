const initial = {
  currentUser: {}
}

export default (state = initial, action) => {
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
