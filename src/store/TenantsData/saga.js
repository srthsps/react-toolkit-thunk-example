import { call, takeEvery, put, retry } from "redux-saga/effects"
import {
  ADD_TENANT,
  FETCH_TENANT_LIST,
  CLEAR_ERROR,
  FETCH_TENANT_DETAILS,
  FETCH_TENANT_PROFILE,
  FETCH_TENANT_TRANSACTIONS,
  CREATE_RENTAL_TENANT,
  DELETE_TENANT,
  FETCH_RENTED_UNITS
} from "./actionType"

import {
  updateTenantList,
  apiErrorTenants,
  updateTenantDetails,
  clearError,
  updateTenantProfile,
  updateTenantTransactions,
  beginLoadingTenants,
  endLoadingTenants,
  deleteTenantSuccess,
  updateRentedUnits
} from "./actions"
import api from "../../api"
import { apiError } from "store/auth/login/actions"

//tenant List

const getTenentListData = async () => {
  const response = await api.actionHandler({
    url: api.tenantsListURL,
    method: "GET",
  })
  return response
}

function* fetchTenantList() {
  try {
    // yield put(beginLoadingTenants())
    const response = yield call(getTenentListData)
    // yield put(endLoadingTenants())
    yield put(updateTenantList(response))
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

//tenant details

const getTenantDetailsData = async tenantID => {
  const response = await api.actionHandler({
    url: api.tenantsDetailsURL.replace("{id}", tenantID),
    method: "GET",
  })
  return response
}

function* fetchTenantDetails(action) {
  let tenantID = action.payload
  try {
    const response = yield call(getTenantDetailsData, tenantID)
    yield put(updateTenantDetails(response))
  } catch (error) {
    console.log("error1", error)
    yield put(apiErrorTenants(error))
  }
}

//tenant profile

const getTenantProfile = async tenantID => {
  const response = await api.actionHandler({
    url: api.tenantProfileURL.replace("{id}", tenantID),
    method: "GET",
  })
  return response
}

function* fetchTenantProfile(action) {
  let tenantID = action.payload
  try {
    const response = yield call(getTenantProfile, tenantID)
    yield put(updateTenantProfile(response))
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

//tenant transactions

const getTenantTransactions = async tenantID => {
  const response = await api.actionHandler({
    url: api.tenantTransactionsURL.replace("{tenant_id}", tenantID),
    method: "GET",
  })
  return response
}

function* fetchTenantTransactions(action) {
  let tenantID = action.payload
  try {
    const response = yield call(getTenantTransactions, tenantID)
    yield put(updateTenantTransactions(response))
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

//add tenant

const postTenant = payload => {
  let edit = payload.tenantID != undefined;
  api.actionHandler({
      url: edit ? api.tenantsDetailsURL.replace("{id}", payload.tenantID):api.tenantsListURL.replace("?limit=100",""),
      method: edit ? "PATCH":"POST",
      data: payload.tenant,
    })
}

function* addTenant(action) {
  try {
     yield call(postTenant, action.payload)
    if ((action.payload.tenant.name != undefined)) {
      action.payload.history.goBack();
    }
    
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

const postTenantRental = payload => {
  const response = api
    .actionHandler({
      url: api.createRental,
      method: "POST",
      data: payload.renatlData,
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log("api error", err)
      return err
    })
  return response
}

function* createTenantRental(action) {
  try {
    const response = yield call(postTenantRental, action.payload)
    console.log("saga response", response);
    if(response.unit == undefined) {
      throw response
    } else {
      action.payload.history.push("/tenants")
    }
  } catch (error) {
    console.log("this is happening")
    yield put(apiErrorTenants(error))
  }
}

const getRentedUnitsFn = async (payload) => {
  console.log(payload)
  const response = await api.actionHandler({
    url: api.rentedUnitsListURL.replace("{tenant_id}", payload),
    method: "GET",
  }).catch(err=>{
    return err
  })
  return response
}



function* fetchRentedUnitsSaga(action) {
  try {
    const response = yield call(getRentedUnitsFn,action.payload)
    console.log("saga response", response);
    yield put(updateRentedUnits(response))
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

//delete
const deleteTenantData = tenantID => {
  const response = api.actionHandler({
    url: api.tenantsDetailsURL.replace("{id}", tenantID),
    method: "DELETE",
  })
  return response
}
function* deleteTenant(action) {
  let tenantID = action.payload
  try {
    yield call(deleteTenantData, tenantID)
    yield put(deleteTenantSuccess(tenantID))
  } catch (error) {
    yield put(apiErrorTenants(error))
  }
}

//error
function* clearErrors() {
  try {
    yield call(clearError)
  } catch {}
}

//watcher saga

function* tenantSaga() {
  yield takeEvery(FETCH_TENANT_LIST, fetchTenantList)
  yield takeEvery(FETCH_TENANT_DETAILS, fetchTenantDetails)
  yield takeEvery(FETCH_TENANT_PROFILE, fetchTenantProfile)
  yield takeEvery(FETCH_TENANT_TRANSACTIONS, fetchTenantTransactions)
  yield takeEvery(CREATE_RENTAL_TENANT, createTenantRental)
  yield takeEvery(ADD_TENANT, addTenant)
  yield takeEvery(CLEAR_ERROR, clearErrors)
  yield takeEvery(DELETE_TENANT, deleteTenant)
  yield takeEvery(FETCH_RENTED_UNITS,fetchRentedUnitsSaga)
}

export default tenantSaga
