import {
    FETCH_CARD_DATA,
    UPDATE_CARD_DATA,
    API_ERROR_DASHBOARD,
    BEGIN_LOADING_DASHBOARD,
    END_LOADING_DASHBOARD,
    CLEAR_ERROR_DASHBOARD,
    FETCH_RECENT_TRANSACTIONS,
    UPDATE_RECENT_TRANSACTIONS,
    FETCH_SOON_TO_BE_EXPIRED_LIST,
    UPDATE_SOON_TO_BE_EXPIRED_LIST,
    FETCH_ATTENDANCE_STATUS,
    UPDATE_ATTENDANCE_STATUS,
    CREATE_ATTENDANCE_STATUS
  } from './actionType'


//attendance

export const fetchAttendanceStatusAction = () => {
  return {
    type: FETCH_ATTENDANCE_STATUS
  }
}

export const updateAttendanceStatusAction = response => {
  return {
    type: UPDATE_ATTENDANCE_STATUS,
    payload:response
  }
}

export const createAttendanceStatusAction = () => {
  return {
    type: CREATE_ATTENDANCE_STATUS
  }
}

  //fetch card data
export const fetchCardDataAction = () => {
    return {
      type: FETCH_CARD_DATA
    }
}
  
export const updateCardDataAcion = (response) => {
    return {
      type: UPDATE_CARD_DATA,
      payload:response
    }
}


export const fetchSoonExpireList = () => {
  return {
    type: FETCH_SOON_TO_BE_EXPIRED_LIST,
  }
}

export const updateSoonExpireList = (response) => {
  return {
    type: UPDATE_SOON_TO_BE_EXPIRED_LIST,
    payload: response
  }
}

//fetch recent transactions list
export const fetchRecentTransaction = () => {
  return {
    type:FETCH_RECENT_TRANSACTIONS
  }
}
export const updateRecentTransactions = (response) => {
  return {
    type: UPDATE_RECENT_TRANSACTIONS,
    payload:response
  }
}

//Error handling  
export const apiErrorDashboardAction = error => {
    return {
      type: API_ERROR_DASHBOARD,
      payload: error,
    }
}

export const clearErrorDashboardAction = (status) => {
  return {
    type: CLEAR_ERROR_DASHBOARD,
    payload:status
  }
}

export const beginLoadingDashboardAction = () => {
  return {
    type: BEGIN_LOADING_DASHBOARD,
  }
}

export const endLoadingDashboardAction = () => {
  return {
    type: END_LOADING_DASHBOARD,
  }
}