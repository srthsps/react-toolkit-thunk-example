import { call, takeEvery, put } from "redux-saga/effects"
import {
  FETCH_CARD_DATA,
  FETCH_ATTENDANCE_STATUS,
  CREATE_ATTENDANCE_STATUS,
  CLEAR_ERROR_DASHBOARD,
  FETCH_SOON_TO_BE_EXPIRED_LIST,
  FETCH_RECENT_TRANSACTIONS,
} from "./actionType"

import {
  updateCardDataAcion,
  clearErrorDashboardAction,
  apiErrorDashboardAction,
  beginLoadingDashboardAction,
  endLoadingDashboardAction,
  updateRecentTransactions,
  updateSoonExpireList,
  updateAttendanceStatusAction,
  fetchAttendanceStatusAction,
} from "./actions"
import api from "../../api"

//Card Data

const getCardDataFn = async () => {
  const response = await api.actionHandler({
    url: api.cardDataURL,
    method: "GET",
  })
  return response
}

function* fetchCardDataSaga() {
  try {
    yield put(beginLoadingDashboardAction())
    const response = yield call(getCardDataFn)
    console.log(response)
    yield put(endLoadingDashboardAction())
    yield put(updateCardDataAcion(response))
  } catch (error) {
    yield put(apiErrorDashboardAction(error))
  }
}

//recent transactions

const getRecentTransactions = async () => {
  const response = await api.actionHandler({
    url: api.recentTransactionListURL,
    method: "GET",
  }).catch(err=>{
    return err
  })
  return response
}

function* fetchRecentTransaction() {
  try {
    yield put(beginLoadingDashboardAction())
    const response = yield call(getRecentTransactions)
    yield put(endLoadingDashboardAction())
    yield put(updateRecentTransactions(response))
  } catch (error) {
    yield put(apiErrorDashboardAction(error))
  }
}

const getAttendanceStatusSagaFn = async () => {
  const response = await api.actionHandler({
    url: api.fetchAttendanceStatusURL,
    method: "GET",
  }).catch(err=>{
    return err
  }).then(res=>{
    console.log(res)
    return res
  })
  return response
}

function* fetchAttendanceStatusSaga() {
  try {
    const response = yield call(getAttendanceStatusSagaFn)
    console.log("response after saga", response)
    yield put(updateAttendanceStatusAction(response))
  } catch (error) {
    yield put(apiErrorDashboardAction(error))
  }
}

const getSoonExpireListFn = async () => {
  const response = await api
    .actionHandler({
      url: api.fetchSoonToBeExpiredListURL,
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchSoonExpireListSaga() {
  try {
    const response = yield call(getSoonExpireListFn)
    console.log("response after saga function", response)
    yield put(updateSoonExpireList(response))
  } catch (error) {
    yield put(apiErrorDashboardAction(error))
  }
}

function* clearDashboardErrors() {
  try {
    yield call(clearErrorDashboardAction)
  } catch {}
}

//watcher saga
function* dashboardSaga() {
  yield takeEvery(FETCH_CARD_DATA, fetchCardDataSaga)
  yield takeEvery(CLEAR_ERROR_DASHBOARD, clearErrorDashboardAction)
  yield takeEvery(FETCH_RECENT_TRANSACTIONS, fetchRecentTransaction)
  yield takeEvery(CLEAR_ERROR_DASHBOARD, clearDashboardErrors)
  yield takeEvery(FETCH_SOON_TO_BE_EXPIRED_LIST, fetchSoonExpireListSaga)
  yield takeEvery(FETCH_ATTENDANCE_STATUS,fetchAttendanceStatusSaga)
}

export default dashboardSaga
