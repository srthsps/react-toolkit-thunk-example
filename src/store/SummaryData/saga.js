import { call, takeEvery, put } from "redux-saga/effects";
import {
    beginSummaryLoading,
    endSummaryLoading,
    updateSummaryList,
    clearSummaryError,
    apiSummaryError,
    updateTransactionlist,
    updateSummaryCardData
} from "./actions";
import {
    CLEAR_SUMMARY_ERROR,
    FETCH_SUMMARY_LIST,
    FETCH_TRANSACTION_LIST,
    FETCH_SUMMARY_CARD_DATA
} from "./actionType";
import api from "api";



const getSummaryList = async () => {
    const response = await api.actionHandler({
        url: api.summaryListURL,
        method:"GET"
    })
    return response;
    
}
function* fetchSummaryData() {
    try {
        yield put(beginSummaryLoading());
        const response = yield call(getSummaryList);
        yield put(endSummaryLoading());
        yield put(updateSummaryList(response));
        
    }
    catch (error) {
        yield put(apiSummaryError(error))
    }
}

const getSummaryCardDataFn = async () => {
    const response = await api.actionHandler({
        url: api.summaryCardURL,
        method:"GET"
    }).catch(err=>{
        return err
    })
    return response;
}


function* fetchSummaryCardSaga() {
    try {
        yield put(beginSummaryLoading());
        const response = yield call(getSummaryCardDataFn);
        yield put(endSummaryLoading());
        yield put(updateSummaryCardData(response));
    } catch (error) {
        yield put(apiSummaryError(error))
    }
}


const getTransactionList = async () => {
    const response = await api.actionHandler({
        url: api.transactionURL,
        method:"GET"
    })
    return response;
}

function* fetchTransactionData() {
    try {
        yield put(beginSummaryLoading());
        const response = yield call(getTransactionList);
        yield put(endSummaryLoading());
        yield put(updateTransactionlist(response))
        
    }
    catch (error) {
        yield put(apiSummaryError(error))
    }
}

function* clearSummaryErrors() {
    try {
      yield call(clearSummaryError)
    } catch {}
}
  



function* summarySaga() {
    yield takeEvery(FETCH_SUMMARY_LIST, fetchSummaryData)
    yield takeEvery(FETCH_TRANSACTION_LIST,fetchTransactionData)
    yield takeEvery(CLEAR_SUMMARY_ERROR,clearSummaryErrors)
    yield takeEvery(FETCH_SUMMARY_CARD_DATA,fetchSummaryCardSaga)
    
}
export default summarySaga