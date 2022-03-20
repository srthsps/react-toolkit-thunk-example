import api from "api"
import { takeEvery, put, call } from "redux-saga/effects"
import { clearResetPasswordError } from "./actions";
import { CLEAR_PASSWORD_ERROR, RESET_PSSWORD } from "./actionType";


const resetPassword = (data) => {
    api.actionHandler({
        url: api.resetPassword,
        method: "POST",
        data:data
    })
}


function* resetUserPassword(action) {
    try {
        yield call(resetPassword, action.payload);
    }
    catch (error) {
        yield put(resetPasswordApiError(error));
    }
    
}

function* resetPasswordClearErrors() {
    try {
      yield call(clearResetPasswordError)
    } catch {}
  } 
function* resetPasswordSaga() {
    yield takeEvery(RESET_PSSWORD, resetUserPassword);
    yield takeEvery(CLEAR_PASSWORD_ERROR,resetPasswordClearErrors)
    
}
export default resetPasswordSaga;