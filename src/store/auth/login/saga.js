import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

import api from "../../../api.js"

import jwt_decode from "jwt-decode"

import Cookies from "js-cookie"

const loginApiCall = async user => {
  console.log(user)
  const response = await api
    .actionHandler({
      url: api.loginURL,
      method: "POST",
      data: user,
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.log("insiude error", err)
      return err
    })
  console.log("final res", response)
  return response
}

function* loginUser({ payload }) {
  let { user, history } = payload
  console.log(user)
  try {
    const response = yield call(loginApiCall, user)
    if (response.token == undefined) {
      throw response
    }
    console.log("this is token", jwt_decode(response.token.access))
    const decoded = jwt_decode(response.token.access)
    console.log(decoded)

    if (decoded.is_property_level) {
      Cookies.set('property-token', response.token.access, {expires: 7, path: '/'})
      yield put(loginSuccess(response))
      history.push("/dashboard")
    } else {
      throw "Error: Invalid Credentials"
    }
  } catch (error) {
    console.log("this is try catch error", error)
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    // localStorage.removeItem("token")
    Cookies.remove("property-token", { expires: 7, path: "/" })
    // window.location = "https://dev.enfono.com/downtown/login"
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
