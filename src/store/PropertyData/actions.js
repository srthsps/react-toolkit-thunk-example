import { property } from 'lodash'
import {
  FETCH_PROPERTY_LIST,
  UPDATE_PROPERTY_LIST,
  API_ERROR_PROPERTIES,
  FETCH_PROPERTY_DETAILS,
  UPDATE_PROPERTY_DETAILS,
  ADD_PROPERTY,
  FETCH_PROPERTY_STAFF,
  UPDATE_PROPERTY_STAFF,
  CLEAR_ERROR_PROPERTIES,
  BEGIN_LOADING,
  END_LOADING,
  DELETE_PROPERTY,
  DELETE_PROPERTY_SUCCESS,
  ASSIGN_PROPERTY_STAFF,
  FETCH_PROPERTY_TRANSACTIONS,
  UPDATE_PROPERTY_TRANSACTIONS,
  FETCH_PROPERTY_DETAILS_CARD_DATA,
  UPDATE_PROPERTY_DETAILS_CARD_DATA,
  FETCH_PROPERTY_TRANSACTION_CARD_DATA,
  UPDATE_PROPERTY_TRANSACTION_CARD_DATA,
  FETCH_PROPERTY_TENANTS,
  UPDATE_PROPERTY_TENANTS,
  SQUARE_OFF_RENT_DATA,
  FETCH_INCOME_CATEGORIES,
  UPDATE_INCOME_CATEGORIES,
  FETCH_EXPENSE_CATEGORIES,
  UPDATE_EXPENSE_CATEGORIES,
  CREATE_PROPERTY_TRANSACTION,
  SQRF_ERROR,
  CLEAR_SQRF_ERROR
} from './actionType'
 

export const squareOffRentData = (sqofData,propertyID) => {
  return {
    type: SQUARE_OFF_RENT_DATA,
    payload: {sqofData,propertyID}
  }
}

export const sqrfError = error => {
  return {
    type: SQRF_ERROR,
    payload: error,
  }
}

export const clearSqrfError = (status) => {
return {
  type: CLEAR_SQRF_ERROR,
  payload:status
}
}

export const createPropertyTransaction = (transData,propertyID,history) => {
  return {
    type: CREATE_PROPERTY_TRANSACTION,
    payload: {transData,propertyID,history}
  }
}


//fetch property tenants

export const fetchPropertyTenants = (propertyID) => {
  return {
    type: FETCH_PROPERTY_TENANTS,
    payload: propertyID
  }
}


export const updatePropertyTenants = (response) => {
  return {
    type: UPDATE_PROPERTY_TENANTS,
    payload: response
  }
}


//fetch property
export const fetchPropertyList = () => {
    return {
      type: FETCH_PROPERTY_LIST
    }
}
  
export const updatePropertyList = (response) => {
    return {
      type: UPDATE_PROPERTY_LIST,
      payload:response
    }
}

export const fetchPropertyDetailsCardData = (propertyID) => {
  return {
    type: FETCH_PROPERTY_DETAILS_CARD_DATA,
    payload: propertyID
  }
}

export const updatePropertyDetailsCardData = (response) => {
  return {
    type: UPDATE_PROPERTY_DETAILS_CARD_DATA,
    payload: response
  }
}

export const fetchPropertyTransactionsCardData = (propertyID) => {
  return {
    type: FETCH_PROPERTY_TRANSACTION_CARD_DATA,
    payload: propertyID
  }
}

export const updatePropertyTransactionsCardData = (response) => {
  return {
    type: UPDATE_PROPERTY_TRANSACTION_CARD_DATA,
    payload: response
  }
}

//add property
export const setProperties = (user,history,propertyID) => {
  console.log(user)
  return {
    type: ADD_PROPERTY,
    payload: { user, history,propertyID }
  }
}


 
//fetch property details
export const fetchPropertyDetails = (propertyID) => {
  console.log("in action",propertyID)
  return {
    type: FETCH_PROPERTY_DETAILS,
    payload:propertyID
    
  }  
}

export const updatePropertyDetails = (response) => {
  return {
    type: UPDATE_PROPERTY_DETAILS,
    payload:response
  }
}

export const fetchPropertyTransactions = (propertyID) => {
  return {
    type: FETCH_PROPERTY_TRANSACTIONS,
    payload: propertyID
  }
}

export const updatePropertyTransactions = (response) => {
  return {
    type: UPDATE_PROPERTY_TRANSACTIONS,
    payload: response
  }
}

export const fetchIncomeCategories = () => {
  return {
    type: FETCH_INCOME_CATEGORIES,
  }
}

export const updateIncomeCategories = (response) => {
  return {
    type: UPDATE_INCOME_CATEGORIES,
    payload: response
  }
}


export const fetchExpenseCategories = () => {
  return {
    type: FETCH_EXPENSE_CATEGORIES,
  }
}

export const updateExpenseCategories = (response) => {
  return {
    type: UPDATE_EXPENSE_CATEGORIES,
    payload: response
  }
}

//fetch property staff list
export const fetchPropertyStaffList = (propertyID) => {
  return {
    type: FETCH_PROPERTY_STAFF,
    payload:propertyID
  }
}

export const updatePropertyStaffList = (response) => {
  return {
    type: UPDATE_PROPERTY_STAFF,
    payload:response
  }
}

//assign property staff
export const assignPropertyStaffAction = (propertyStaffData,history) => {
  return {
    type: ASSIGN_PROPERTY_STAFF,
    payload: {propertyStaffData,history}
  }
}





//delete property
export const deleteProperty = (id) => {
  return {
    type: DELETE_PROPERTY,
    payload:id
  }
}

export const deletePropertySuccesss = (id) => {
  return {
    type: DELETE_PROPERTY_SUCCESS,
    payload:id
  }
}


//Error handling  
export const apiErrorProperties = error => {
    return {
      type: API_ERROR_PROPERTIES,
      payload: error,
    }
}

export const clearErrorProperties = (status) => {
  return {
    type: CLEAR_ERROR_PROPERTIES,
    payload:status
  }
}

export const beginLoading = () => {
  return {
    type: BEGIN_LOADING,
  }
}

export const endLoading = () => {
  return {
    type: END_LOADING,
  }
}