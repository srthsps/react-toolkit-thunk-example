import { call, takeEvery, put } from "redux-saga/effects"
import {
  ADD_PROPERTY,
  FETCH_PROPERTY_STAFF,
  CLEAR_ERROR_PROPERTIES,
  FETCH_PROPERTY_LIST,
  FETCH_PROPERTY_DETAILS,
  DELETE_PROPERTY,
  ASSIGN_PROPERTY_STAFF,
  FETCH_PROPERTY_TRANSACTIONS,
  FETCH_PROPERTY_DETAILS_CARD_DATA,
  FETCH_PROPERTY_TRANSACTION_CARD_DATA,
  SQUARE_OFF_RENT_DATA,
  FETCH_INCOME_CATEGORIES,
  FETCH_EXPENSE_CATEGORIES,
  CREATE_PROPERTY_TRANSACTION,
  FETCH_PROPERTY_TENANTS,
} from "./actionType"

import {
  updatePropertyList,
  updatePropertyStaffList,
  apiErrorProperties,
  updatePropertyDetails,
  clearErrorProperties,
  beginLoading,
  endLoading,
  deletePropertySuccesss,
  updatePropertyTransactions,
  updatePropertyDetailsCardData,
  updatePropertyTransactionsCardData,
  updateTransactionCategories,
  updateIncomeCategories,
  updateExpenseCategories,
  updatePropertyTenants,
  sqrfError,
} from "./actions"
import api from "../../api"

//Property List

const getPropertyData = async () => {
  const response = await api.actionHandler({
    url: api.propertiesListURL,
    method: "GET",
  })
  return response
}

function* fetchData() {
  try {
    yield put(beginLoading())
    const response = yield call(getPropertyData)
    yield put(endLoading())
    yield put(updatePropertyList(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

//property details

const getPropertyDetails = async propertyID => {
  const response = await api.actionHandler({
    url: api.propertyDetailsURL.replace("{id}", propertyID),
    method: "GET",
  })
  return response
}

function* fetchDetailsData(action) {
  let propertyID = action.payload
  try {
    const response = yield call(getPropertyDetails, propertyID)
    yield put(updatePropertyDetails(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

//add / edit property

const postProperty = payload => {
  let edit = payload.propertyID != undefined
  let propertyID = payload.propertyID
  const response = api
    .actionHandler({
      url: edit
        ? api.propertyDetailsURL.replace("{id}", propertyID)
        : api.propertiesListURL,
      method: edit ? "PATCH" : "POST",
      data: payload.user,
    })
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
  return response
}

function* addProperty(action) {
  console.log(action)
  try {
    const response = yield call(postProperty, action.payload)
    if ((response.name = undefined)) {
      throw response
    }
    action.payload.history.push("/properties")
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}
//delete property data
const deletePropertyData = propertyID => {
  const response = api.actionHandler({
    url: api.propertyDetailsURL.replace("{id}", propertyID),
    method: "DELETE",
  })
  return response
}

function* deleteProperty(action) {
  let propertyID = action.payload
  try {
    yield call(deletePropertyData, propertyID)
    yield put(deletePropertySuccesss(propertyID))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

//property staff list

const getPropertyStaffList = async propertyID => {
  const response = await api.actionHandler({
    url: api.propertyStaffListURL.replace("{property_id}", propertyID),
    method: "GET",
  })
  return response
}

function* fetchPropertyStaffData(action) {
  let propertyID = action.payload
  try {
    yield put(beginLoading())
    const response = yield call(getPropertyStaffList, propertyID)
    yield put(endLoading())
    console.log("property staff response", response)
    yield put(updatePropertyStaffList(response))
  } catch (error) {
    console.log(error)
    yield put(apiErrorProperties(error))
  }
}

const postPropertyStaffFn = ({ propertyStaffData }) => {
  console.log("after saga", propertyStaffData)
  let response = api
    .actionHandler({
      url: api.assignPropertyToStaffURL,
      method: "POST",
      data: propertyStaffData,
    })
    .then(res => {
      console.log("api output", res)
      return res
    })
    .catch(res => {
      console.log("catched res", res)
      return res
    })
  return response
}

function* assignPropertyStaffSaga(action) {
  console.log("in saga", action.payload)
  try {
    const response = yield call(postPropertyStaffFn, action.payload)
    console.log(response)
    // if (response.name == undefined) {
    //   throw response
    // } else action.payload.history.push("/properties")
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const getPropertyTransactionsFn = async payload => {
  console.log("payload", payload)
  const response = await api
    .actionHandler({
      url: api.propertyTransactionsURL.replace("{property_id}", payload),
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchPropertyTransactionsSaga(action) {
  try {
    const response = yield call(getPropertyTransactionsFn, action.payload)
    console.log("Response After saga, ", response)
    yield put(updatePropertyTransactions(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const getPropCardDataFn = async payload => {
  console.log("payload", payload)
  const response = await api
    .actionHandler({
      url: api.propertyDetailsCardDataURL.replace("{property_id}", payload),
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchPropCardDataSaga(action) {
  try {
    const response = yield call(getPropCardDataFn, action.payload)
    console.log("Response After saga, ", response)
    yield put(updatePropertyDetailsCardData(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const getTransCardDataFn = async payload => {
  console.log("payload", payload)
  const response = await api
    .actionHandler({
      url: api.propertyTransactionsCardDataURL.replace(
        "{property_id}",
        payload
      ),
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchTransCardDataSaga(action) {
  try {
    const response = yield call(getTransCardDataFn, action.payload)
    console.log("Response After saga, ", response)
    yield put(updatePropertyTransactionsCardData(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const squareOffDataFn = async payload => {
  console.log("payload inside saga fn", payload)
  const response = await api
    .actionHandler({
      url: api.squareOffRentURL.replace("{property_id}", payload.propertyID),
      method: "POST",
      data: payload.sqofData,
    })
    .catch(err => {
      return err
    })
  return response
}

function* squareOffRentSaga(action) {
  try {
    const response = yield call(squareOffDataFn, action.payload)
    console.log("response after saga", response)
  } catch (error) {
    yield put(sqrfError(error))
  }
}

const getIncomeCategoriesFn = async () => {
  const response = await api
    .actionHandler({
      url: api.incomeCategoriesURL,
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchIncomeCategoriesSaga() {
  try {
    const response = yield call(getIncomeCategoriesFn)
    console.log("response after saga", response)
    yield put(updateIncomeCategories(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const getExpenseCategoriesFn = async () => {
  const response = await api
    .actionHandler({
      url: api.expenseCategoriesURL,
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchExpenseCategoriesSaga() {
  try {
    const response = yield call(getExpenseCategoriesFn)
    console.log("response after saga", response)
    yield put(updateExpenseCategories(response))
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

const postPropertyTransaction = async payload => {
  const response = await api
    .actionHandler({
      url: api.createPropertyTransactionURL.replace(
        "{property_id}",
        payload.propertyID
      ),
      method: "POST",
      data: payload.transData,
    })
    .catch(err => {
      return err
    })
  return response
}

function* createPropertyTransactionSaga(action) {
  try {
    const response = yield call(postPropertyTransaction, action.payload)
    console.log("reposne after saga", response)
    let type = typeof response
    console.log("result type", typeof response)
    if (type != "object") {
      throw response
    }
  } catch (err) {
    yield put(apiErrorProperties(err))
  }
}

const getPropertyTenantsFn = async payload => {
  const response = await api
    .actionHandler({
      url: api.fetchPropertyTenantsListURL.replace("{property_id}", payload),
      method: "GET",
    })
    .catch(err => {
      return err
    })
  return response
}

function* fetchPropertyTenantsSaga(action) {
  try {
    const response = yield call(getPropertyTenantsFn, action.payload)
    console.log("response after saga function: ", response)
    if (response.results == undefined) {
      throw response
    } else {
      yield put(updatePropertyTenants(response))
    }
  } catch (error) {
    yield put(apiErrorProperties(error))
  }
}

function* clearErrors() {
  try {
    yield call(clearErrorProperties)
  } catch {}
}

//watcher saga
function* propertySaga() {
  yield takeEvery(FETCH_PROPERTY_LIST, fetchData)
  yield takeEvery(FETCH_PROPERTY_DETAILS, fetchDetailsData)
  yield takeEvery(ADD_PROPERTY, addProperty)
  yield takeEvery(FETCH_PROPERTY_STAFF, fetchPropertyStaffData)
  yield takeEvery(CLEAR_ERROR_PROPERTIES, clearErrors)
  yield takeEvery(DELETE_PROPERTY, deleteProperty)
  yield takeEvery(ASSIGN_PROPERTY_STAFF, assignPropertyStaffSaga)
  yield takeEvery(FETCH_PROPERTY_TRANSACTIONS, fetchPropertyTransactionsSaga)
  yield takeEvery(FETCH_PROPERTY_DETAILS_CARD_DATA, fetchPropCardDataSaga)
  yield takeEvery(FETCH_PROPERTY_TRANSACTION_CARD_DATA, fetchTransCardDataSaga)
  yield takeEvery(SQUARE_OFF_RENT_DATA, squareOffRentSaga)
  yield takeEvery(FETCH_INCOME_CATEGORIES, fetchIncomeCategoriesSaga)
  yield takeEvery(FETCH_EXPENSE_CATEGORIES, fetchExpenseCategoriesSaga)
  yield takeEvery(CREATE_PROPERTY_TRANSACTION, createPropertyTransactionSaga)
  yield takeEvery(FETCH_PROPERTY_TENANTS, fetchPropertyTenantsSaga)
}

export default propertySaga
