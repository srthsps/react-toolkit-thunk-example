import { FETCH_CATEGORY_LIST, UPDATE_CATEGORY_LIST, CATEGORY_API_ERROR, CLEAR_CATEGORY_ERROR, FETCH_SUB_CATEGORY_LIST, UPDATE_SUB_CATEGORY_LIST } from "./actionType";


export const fetchCategoryList = () => {
  console.log("actions are being fetched")
    return {
      type: FETCH_CATEGORY_LIST
    }
}
  
export const updateCategoryList = (response) => {
    return {
      type: UPDATE_CATEGORY_LIST,
      payload:response
    }
}

export const fetchSubCategoryList = (category) => {
  return {
    type: FETCH_SUB_CATEGORY_LIST,
    payload:category
  }
}

export const updateSubCategoryList = (response) => {
  return {
    type: UPDATE_SUB_CATEGORY_LIST,
    payload:response
  }
}

//Error handling  
export const categoryApiError = error => {
    return {
      type: CATEGORY_API_ERROR,
      payload: error,
    }
}

export const clearCategoryError = (status) => {
  return {
    type: CLEAR_CATEGORY_ERROR,
    payload:status
  }
}