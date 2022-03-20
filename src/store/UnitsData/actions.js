
import {
  UNIT_API_ERROR,
  FETCH_UNIT,
  UPDATE_UNIT,
  FETCH_UNIT_DETAILS,
  UPDATE_UNIT_DETAILS,
  ADD_UNIT,
  CLEAR_UNIT_ERROR,
  BEGIN_UNITS_LOADING,
  END_UNITS_LOADING,
  DELETE_UNIT,
  DELETE_UNIT_SUCCESS,
  FETCH_UNIT_TRANSACTION,
  UPDATE_UNIT_TRANSACTION,
  ADD_UNIT_TRANSACTION,
  CLEAR_UNIT_DATA,
  CREATE_RENTAL,
  COLLECT_RENT,
  FETCH_UNIT_TENANT,
  UPDATE_UNIT_TENANT,
  CREATE_RENTAL_RENEWAL
} from './actionType'
 



//fetch  unit
export const fetchUnitList = (propertyID) => {
  console.log("unit list action")
  return {
    type: FETCH_UNIT,
    payload:propertyID
  }
}

export const updateUnitList = (response) => {
  return {
    type: UPDATE_UNIT,
    payload:response
  }
}

export const fetchUnitDetails = (unitID, propertyID ) => {
  return {
    type: FETCH_UNIT_DETAILS,
    payload:{ unitID, propertyID }
  }
}

export const collectRentAction = (rentalData) => {
  console.log("inside action",rentalData)
  return {
    type: COLLECT_RENT,
    payload: rentalData
  }
}

export const createRentalRenewal = (renewalData,rentalID,agreementID) => {
  return {
    type: CREATE_RENTAL_RENEWAL,
    payload: {renewalData,rentalID,agreementID}
  }
}

export const updateUnitDetails = (response) => {
  return {
    type: UPDATE_UNIT_DETAILS,
    payload: response
  }
}

//add transaction
export const addUnitTransaction = (transactionData, history) => {
  return {
    type: ADD_UNIT_TRANSACTION,
    payload:{transactionData, history}
  }
}

//add  unit
export const setUnit = ( unit, history,propertyID,unitID )=>{
  console.log("in action",unit)
  return {
    type: ADD_UNIT,
    payload: { unit, history,propertyID,unitID}

  }
}

export const createRental= (renatlData,history) =>{
  console.log("inside action",renatlData)
  return {
    type: CREATE_RENTAL,
    payload: {renatlData,history}
  }
}

export const clearUnitDetails = () => {
  console.log('success1111')
  return {
    type:CLEAR_UNIT_DATA
  }
}
//fetch transactions 

export const fetchUnitTransactionFn =  (id) => {
  console.log('action',id)
  return {
    type: FETCH_UNIT_TRANSACTION,
    payload:id
  }
}

export const updateUnitTransactionFn =  (response) => {
  return {
    type: UPDATE_UNIT_TRANSACTION,
    payload:response
  }
}
//delete unit
export const deleteUnit = (dataID ) => {
  return {
    type: DELETE_UNIT,
    payload:dataID
  }
}

export const deleteUnitSuccesss = (id) => {
  return {
    type: DELETE_UNIT_SUCCESS,
    payload:id
  }
}



//Error handling  
export const unitApiError = error => {
    return {
      type: UNIT_API_ERROR,
      payload: error,
    }
}

export const clearUnitError = (status) => {
  console.log("triggering error",status)
  return {
    type: CLEAR_UNIT_ERROR,
    payload:status
  }
}

export const fetchUnitTenant = (unitID) => {
  return {
    type: FETCH_UNIT_TENANT,
    payload: unitID
  }
}

export const updateUnitTenant = (response) => {
  return {
    type: UPDATE_UNIT_TENANT,
    payload: response
  }
}

export const beginUnitsLoading = () => {
  return {
    type: BEGIN_UNITS_LOADING,
  }
}

export const endUnitsLoading = () => {
  return {
    type: END_UNITS_LOADING,
  }
}