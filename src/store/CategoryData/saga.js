import { call, takeEvery, put } from "redux-saga/effects"

import { CLEAR_CATEGORY_ERROR, FETCH_CATEGORY_LIST, FETCH_SUB_CATEGORY_LIST, } from "./actionType"
import {  categoryApiError, updateCategoryList, updateSubCategoryList,clearCategoryError } from "./actions"
import api from "../../api"

const getCategoryList = async () => {
    const response = await api.actionHandler({
        url: api.categoryURL,
        method:"GET"
    })
    return response;
}
function* fetchCategoryData() {
    try {
        const response = yield call(getCategoryList);
        yield put(updateCategoryList(response));
    } catch (error){
        yield put(categoryApiError(error))
    }
}


const getSubCategoryList = async (category) => {
    const response = await api.actionHandler({
        url: api.sub_categoryURL.replace("{category}", category),
        method:"GET"
    })
    return response;
}
function* fetchSubCategoryData(action) {
    const category = action.payload;
    try {
        const response =yield call(getSubCategoryList, category);
        yield put(updateSubCategoryList(response));
    }
    catch (error) {
        yield put(categoryApiError(error))
        
    }
}
function* clearCategoryErros() {
    try {
        yield call(clearCategoryError)
    }catch{}
}



function* categorySaga() {
    yield takeEvery(FETCH_CATEGORY_LIST, fetchCategoryData);
    yield takeEvery(FETCH_SUB_CATEGORY_LIST, fetchSubCategoryData)
    yield takeEvery(CLEAR_CATEGORY_ERROR,clearCategoryErros)
}
export default categorySaga;