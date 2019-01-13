import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from "../actionTypes";

const DEFUALT_SATATE = {
  isAuthenticated: false,
  user: {}
};

export default (state = DEFUALT_SATATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    case UPDATE_CURRENT_USER:
      const user = action.user;
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: { ...state.user, ...user }
      };
    default:
      return state;
  }
};
