const { RESET_PSSWORD ,CLEAR_PASSWORD_ERROR,RESET_PSSWORD_ERROR} = require("./actionType")

const initialState = {
    error:"",
}
  

const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {

    case RESET_PSSWORD_ERROR:
      state.error = { ...state.error, error: action.payload, loading: true };
      return state
      // break;
    case CLEAR_PASSWORD_ERROR:
      state.error = { ...state.error, loading: action.payload };
        default: {
            return state
        }
    }
}

export default resetPasswordReducer;