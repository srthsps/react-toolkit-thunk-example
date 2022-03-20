
import {
  FETCH_TENANT_LIST,
  UPDATE_TENANT_LIST,
  API_ERROR_TENANTS,
  FETCH_TENANT_DETAILS,
  UPDATE_TENANT_DETAILS,
  FETCH_TENANT_PROFILE,
  UPDATE_TENANT_PROFILE,
  FETCH_TENANT_TRANSACTIONS,
  UPDATE_TENANT_TRANSACTIONS,
  ADD_TENANT,
  CREATE_RENTAL_TENANT,
  CLEAR_ERROR,
  BEGIN_LOADING_TENANTS,
  END_LOADING_TENANTS,
  DELETE_TENANT,
  DELETE_TENANT_SUCCESS,
  CLEAR_TENANT_DETAILS,
  FETCH_RENTED_UNITS,
  UPDATE_RENTED_UNITS,
} from './actionType'
 



export const fetchRentedUnits = (tenantID) => {
  console.log("inside actions",tenantID)
  return {
    type: FETCH_RENTED_UNITS,
    payload: tenantID
  }
}

export const updateRentedUnits = (response) => {
  return {
    type: UPDATE_RENTED_UNITS,
    payload: response
  }
}


//fetch tenant
export const fetchTenantList = () => {
    return {
      type: FETCH_TENANT_LIST
    }
}
  
export const updateTenantList = (response) => {
    return {
      type: UPDATE_TENANT_LIST,
      payload:response
    }
}

//add tenant
export const setTenant = (tenant,history,tenantID) => {
  console.log('ids',tenantID)
  return {
    type: ADD_TENANT,
    payload: { tenant, history ,tenantID}
  }
}



 
//fetch tenant details
export const fetchTenantDetails = (tenantID) => {
  console.log("in action",tenantID)
  return {
    type: FETCH_TENANT_DETAILS,
    payload:tenantID
    
  }  
}

export const clearTenantDetails = () =>{
  return {
    type: CLEAR_TENANT_DETAILS,
  }
}

export const updateTenantDetails = (response) => {
  return {
    type: UPDATE_TENANT_DETAILS,
    payload:response
  }
}


//fetch tenant profile

export const fetchTenantProfile = (tenantID) => {
  console.log("in action",tenantID)
  return {
    type: FETCH_TENANT_PROFILE,
    payload:tenantID
    
  }  
}

export const updateTenantProfile = (response) => {
  return {
    type: UPDATE_TENANT_PROFILE,
    payload:response
  }
}



//fetch tenant transactions

export const fetchTenantTransactions = (tenantID) => {
  console.log("in action",tenantID)
  return {
    type: FETCH_TENANT_TRANSACTIONS,
    payload:tenantID
    
  }  
}

export const updateTenantTransactions = (response) => {
  return {
    type: UPDATE_TENANT_TRANSACTIONS,
    payload:response
  }
}

export const createRentalTenant = (renatlData,history) =>{
  console.log("inside action",renatlData)
  return {
    type: CREATE_RENTAL_TENANT,
    payload: {renatlData,history}
  }
}

// delete
export const deleteTenant = (id) => {
  return {
    type: DELETE_TENANT,
    payload:id
  }
}
export const deleteTenantSuccess = (id) => {
  return {
    type: DELETE_TENANT_SUCCESS,
    payload:id
  }
}

//Error handling  
export const apiErrorTenants = error => {
    return {
      type: API_ERROR_TENANTS,
      payload: error,
    }
}



export const clearError = (status) => {
  return {
    type: CLEAR_ERROR,
    payload:status
  }
}

export const beginLoadingTenants = () => {
  return {
    type: BEGIN_LOADING_TENANTS,
  }
}

export const endLoadingTenants = () => {
  return {
    type: END_LOADING_TENANTS,
  }
}