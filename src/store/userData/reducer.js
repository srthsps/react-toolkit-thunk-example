
import { userData } from './userStore'
import { UPDATE_USER_LIST,CLEAR_STAFF_ERROR, UPDATE_USER_DETAILS, API_ERROR_USERS, DELETE_USER_SUCCESS } from './actionType'


const initialState = {
  error:"",
  userData,
  userDetails:{

  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_LIST:
      console.log("here",action.payload)
      let { results } = action.payload;
      state.userData = {...state.userData,columns:[...state.userData.columns],rows:[...results]}
      // state.userData.rows = { ...state.userData, rows: [...results] };
      console.log("updated state",state.userData)
      return state
    case UPDATE_USER_DETAILS:
      console.log("here", action.payload)
      let data = action.payload;
      state = { ...state, userDetails: { ...data } }
      // state.userData.rows = { ...state.userData, rows: [...results] };
      console.log("updated state", state.userDetails)
      return state;
    case DELETE_USER_SUCCESS:
      state.userData.rows = state.userData.rows.filter(item => item.id != action.payload);
      state.userData ={...state.userData,columns:[...state.userData.columns],rows:[...state.userData.rows]}
    case API_ERROR_USERS:
      console.log("error identified in reducer")
      state.error = { ...state.error, error: action.payload, loading: true };
      console.log(state.error)
      return state
      // break;
    case CLEAR_STAFF_ERROR:
      state.error = { ...state.error, loading: action.payload };
    default: {
      return state // We return the default state here
    }
  }
}

export default userReducer
