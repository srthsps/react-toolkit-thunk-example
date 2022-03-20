// import { property } from 'lodash'
import {
  FETCH_USER_LIST,
  UPDATE_USER_LIST,
  FETCH_USER_DETAILS,
  UPDATE_USER_DETAILS,
  ADD_STAFF,
  API_ERROR_USERS,
  CLEAR_STAFF_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
} from './actionType'
 
//fetch property
export const fetchUserList = () => {
    return {
      type: FETCH_USER_LIST
    }
}
  
export const updateUserList = (response) => {
    return {
      type: UPDATE_USER_LIST,
      payload:response
    }
}

export const fetchUserDetails = (userID) => {
  console.log("in action",userID)
  return {
    type: FETCH_USER_DETAILS,
    payload: userID
  }
}

export const updateUserDetails = (response) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload:response
  }
}

export const addStaffAction = (staffData,history) => {
  console.log("inside action",staffData)
  return {
    type: ADD_STAFF,
    payload: {staffData,history}
  }
}

//delete user
export const deleteUser = (id) => {
  console.log('sd',id);
  return {
    type: DELETE_USER,
    payload:id
  }
}
export const deleteUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload:id
  }
}

export const apiErrorUsers = error => {
    return {
      type: API_ERROR_USERS,
      payload: error,
    }
}

export const clearStaffError = (status) => {
  return {
    type: CLEAR_STAFF_ERROR,
    payload:status
  }
}

