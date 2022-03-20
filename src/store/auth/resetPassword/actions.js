import { CLEAR_PASSWORD_ERROR, RESET_PSSWORD, RESET_PSSWORD_ERROR } from "./actionType"


export const resetUserPassword = (user) => {
    return {
      type: RESET_PSSWORD,
      payload:  user,
    }
}
  
export const resetPasswordApiError = (error) => {
  return {
    type: RESET_PSSWORD_ERROR,
    payload:error
  }
}
export const clearResetPasswordError = (status) => {
  return {
    type: CLEAR_PASSWORD_ERROR,
    payload:status
  }
}
  