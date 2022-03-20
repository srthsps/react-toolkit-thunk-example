import {  call,takeEvery, put } from "redux-saga/effects"
import {  FETCH_USER_LIST, FETCH_USER_DETAILS, ADD_STAFF, DELETE_USER } from './actionType'
import { apiErrorUsers, updateUserList, updateUserDetails, deleteUserSuccess } from './actions'
import api from '../../api'

//Property List

const fetchUsersList = async () => {
    const response = await api.actionHandler({
        url: api.usersListURL,
        method:"GET"
    })
  return response
  
}

const fetchUserDetails = async (userID) =>{
  const response = await api.actionHandler({
    url:api.userDetailsURL.replace("{id}",userID),
    method: "GET"
  })
  return response
}

function* fetchList() {
    try {
      const response = yield call(fetchUsersList)
      console.log("saga res,", response)
      yield put(updateUserList(response))
    } catch (error) {
      yield put(apiErrorUsers(error))
    }
}


function * fetchDetails(action) {
  let userID = action.payload
  console.log("userid in saga", action)
  try {
    const response = yield call(fetchUserDetails,userID)
    console.log("saga res",response)
    yield put(updateUserDetails(response))
  }
  catch (error) {
    yield put(apiErrorUsers(error))
  }
}




const postStaff = async (staffData) => {
  console.log("payload inside post",staffData)
  const response = await api.actionHandler({
    url:api.addUserURL,
    method: "POST",
    data:staffData
  })
  return response
}

function * addStaffSaga(action) {
  try {
    const response = yield call(postStaff,action.payload.staffData)
    console.log("response after adding saga staff",response)
    if(response.name !== undefined){
      action.payload.history.push('/staffs')
    }
    else{
      throw response
    }
  }  
  catch (error) {
    yield put(apiErrorUsers(error))
  }
}

  //delete user
const deleteUserData = (userID) => { 
  console.log('success11',userID);
  const response = api.actionHandler({
    url: api.userDetailsURL.replace("{id}", userID),
    method:"DELETE"
  })
  console.log('success', response);
  return response;
}
function* deleteUser(action) {
  console.log('***',action)
  let userID = action.payload;
  console.log('success3',userID);
  try {
    yield call(deleteUserData,userID);
    yield put(deleteUserSuccess(userID));
    
  }
  catch (error) {
    yield put(apiErrorUsers(error))
  }
}

 
//watcher saga
function* propertySaga() {
  yield takeEvery(FETCH_USER_LIST, fetchList)
  yield takeEvery(FETCH_USER_DETAILS,fetchDetails)
  yield takeEvery(ADD_STAFF, addStaffSaga)
  yield takeEvery(DELETE_USER,deleteUser)
  
}

export default propertySaga