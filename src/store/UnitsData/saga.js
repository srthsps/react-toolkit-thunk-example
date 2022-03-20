import { call, takeEvery, put } from "redux-saga/effects"
import {
  ADD_UNIT,
  CLEAR_UNIT_ERROR,
  FETCH_UNIT,
  FETCH_UNIT_DETAILS,
  DELETE_UNIT,
  FETCH_UNIT_TRANSACTION,
  ADD_UNIT_TRANSACTION,
  CREATE_RENTAL,
  COLLECT_RENT,
  FETCH_UNIT_TENANT,
  CREATE_RENTAL_RENEWAL
} from "./actionType"

import {apiErrorProperties} from "../PropertyData/actions"

import {
  unitApiError,
  updateUnitList,
  updateUnitDetails,
  clearUnitError,
  beginUnitsLoading,
  endUnitsLoading,
  deleteUnitSuccesss,
  updateUnitTransactionFn,
  updateUnitTenant
} from "./actions"
import api from "../../api"




// unit list

const getUnitList = async (propertyID) => {
  const response = await api.actionHandler({
    url: api.unitListURL.replace("{property_id}", propertyID),
    method: "GET",
  })
  return response
}

function* fetchUnitData(action) {
  console.log("starting saga")
  let propertyID = action.payload
  try {
    yield put(beginUnitsLoading())
    const response = yield call(getUnitList,propertyID)
    yield put(endUnitsLoading())
    console.log("unit list saga response",response)
    yield put(updateUnitList(response))
  } catch (error) {
    console.log(error)
    yield put(unitApiError(error))
  }
}

//unit details

const getUnitDetails = async({propertyID,unitID}) => {
  const response = await api.actionHandler({
    url: api.unitDetailsURL.replace("{property_id}",propertyID).replace("{id}", unitID),
    method: "GET",
  }).catch(err=>{
    return err
  })
  return response
}

function* fetchUnitDetails(action) {
  let unitID = action.payload.unitID;
  let propertyID=action.payload.propertyID
  try {
    yield put(beginUnitsLoading())
    const response = yield call(getUnitDetails, { propertyID, unitID, });
    yield put(endUnitsLoading())
    yield put(updateUnitDetails(response))
  } catch (error) {
    yield put(unitApiError(error))
  }
}
//property transactions
const getTransactionsList = async (unitID) => {
  console.log('ide',unitID);
  const response = await api.actionHandler({
    url: api.unitTransactionListURL.replace("{unit_id}", unitID),
    method: "GET",
  })
  return response
}

function * fetchUnitTransactionData(action) {
  let unitID = action.payload
  try {
    yield put(beginUnitsLoading())
    const response = yield call(getTransactionsList, unitID)
    yield put(endUnitsLoading())
    yield put(updateUnitTransactionFn(response))
  } catch (error) {
    console.log(error)
    yield put(unitApiError(error))
  }
}
//add transaction 
const postTransaction = (transactionData) => {
  api.actionHandler({
    url: api.postUnitTransaction,
    method:"POST",
    data:transactionData
  })
}

function* addUnitTransaction(action) {
  try {
    yield call(postTransaction, action.payload.transactionData);
    action.payload.history.goBack();
  }
  catch (error) {
    yield put(unitApiError(error))
  }
}


const collectRentFn = async (rentalData) => {

  console.log("calling api",rentalData)
  const response = await api.actionHandler({
    url:api.collectRentURL,
    method: "POST",
    data:rentalData
  }).catch(err=>{
    return err
  })
  return response
}

function* collectRentSaga(action) {
  console.log(action)
  try{
    const response = yield call(collectRentFn,action.payload)
    console.log("this is the saga response",response)
    if(response.unit == undefined) {
      throw response
    }
  } catch(error) {
    yield put(unitApiError(error))
  }
}


//add / edit  unit

const postUnit = (actionObject) => {
  let edit = actionObject.unitID != undefined;
  console.log("the final object",actionObject)
  const response = api.actionHandler({
      url:edit?api.unitDetailsURL.replace("{property_id}",actionObject.propertyID).replace("{id}", actionObject.unitID):api.unitListURL.replace("{property_id}",actionObject.propertyID),
      method: edit ?"PATCH":"POST",
      data: actionObject.unit,
    }).catch(err=>{
      return err
    })
  return response
}

function* setUnitData(action) {
  try {
    const response = yield call(postUnit, action.payload)
    console.log("saga response",response)
    if (response.name != undefined) {
      action.payload.history.push('../units')
    }
    
  } catch (error) {
    console.log("in saga", error)
    yield put(unitApiError(error))
  }
}


const getUnitTenantFn = async (payload) => {
  const response = await api.actionHandler({
    url: api.unitTenantURL.replace("{unit_id}", payload),
    method: "GET",
  }).catch(err=>{
    return err
  })
  return response
}

function* fetchUnitTenantSaga(action) {
  try {
    const response = yield call(getUnitTenantFn,action.payload)
    console.log("response after saga",response)
    yield put(updateUnitTenant(response))
  } catch(error) {
    yield put(unitApiError)
  }
}

const postRental = payload => {
  const response = api.actionHandler({
      url: api.createRental,
      method: "POST",
      data: payload.renatlData,
    }).catch(err=>{
      return err
    })
  return response
}

function* createRental(action) {
  try {
    const response = yield call(postRental, action.payload)
    console.log("saga response",response)
    if(response.unit == undefined) {
      throw response
    }
    action.payload.history.goBack()
    
  } catch (error) {
    console.log("catched error")
    yield put(apiErrorProperties(error))
  }
}

//create rental renewal

const createRentalRenewalFn = async (payload) => {
  console.log("payload in saga fn",payload)
  const resp = await api.actionHandler({
    url: api.createRentalRenewalURL.replace("{rental_id}",payload.rentalID).replace("{id}",payload.agreementID),
    method: "PATCH",
    data: payload.renewalData,
  }).catch(err=>{
    console.log("error in api call", err)
    return err
  }).then(data=>{
    console.log("after api success",data)
  })
return resp
}


function* createRentalRenewalSaga(action) {
  try {
    const response = yield call(createRentalRenewalFn,action.payload)
    console.log("response after saga")
    if(response.start_date == undefined) {
      return response
    }
  } catch(error) {
    apiErrorProperties(error)
  }
}




// delete  unit

const deleteUnitData = (actionObject) => {
    const response = api.actionHandler({
      url: api.unitDetailsURL.replace("{property_id}",actionObject.propertyID).replace("{id}", actionObject.dataID),
      method: "DELETE",
    })
    return response
  }
  
function* deleteUnit(action) {
    let unitID = action.payload.dataID
    try {
      yield call(deleteUnitData, action.payload)
      yield put(deleteUnitSuccesss(unitID))
    } catch (error) {
      yield put(unitApiError(error))
    }
  }

function* clearUnitErrors() {
  try {
    yield call(clearUnitError)
  } catch {}
}

//watcher saga
function* unitSaga() {
  yield takeEvery(FETCH_UNIT, fetchUnitData)
  yield takeEvery(ADD_UNIT, setUnitData)
  yield takeEvery(ADD_UNIT_TRANSACTION,addUnitTransaction)
  yield takeEvery(FETCH_UNIT_DETAILS, fetchUnitDetails)
  yield takeEvery(FETCH_UNIT_TRANSACTION,fetchUnitTransactionData)
  yield takeEvery(CLEAR_UNIT_ERROR, clearUnitErrors)
  yield takeEvery(DELETE_UNIT, deleteUnit)
  yield takeEvery(CREATE_RENTAL,createRental)
  yield takeEvery(COLLECT_RENT,collectRentSaga)
  yield takeEvery(FETCH_UNIT_TENANT,fetchUnitTenantSaga)
  yield takeEvery(CREATE_RENTAL_RENEWAL,createRentalRenewalSaga)
}

export default unitSaga
