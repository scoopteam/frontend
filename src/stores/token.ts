import { createStore } from 'redux';

interface UserTokenAction {
  type: string,
  payload: string
}

interface UserTokenState {
  token: string
}

function userTokenReducer(state: UserTokenState = { token: "" }, action: UserTokenAction) {
  switch (action.type) {
    case 'token/set':
      localStorage.token = action.payload;
      return { token: action.payload }
    default:
      return state
  }
}

export default createStore(userTokenReducer);
