let localLoggedInUser = null
if (localStorage.loggedInUser) localLoggedInUser = JSON.parse(localStorage.loggedInUser)

const initialState = {
  loggedInUser: localLoggedInUser,
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'EDIT_USER':
      return {
        ...state,
        loggedInUser: (action.user._id === state.loggedInUser._id) ? action.user : state.loggedInUser
      }
    default:
      return state
  }
}