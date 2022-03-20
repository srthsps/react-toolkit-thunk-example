import {
    BEGIN_SUMMARY_LOADING,
    CLEAR_SUMMARY_ERROR,
    API_ERROR_SUMMARY,
    END_SUMMARY_LOADING,
    FETCH_SUMMARY_LIST,
    FETCH_TRANSACTION_LIST,
    UPDATE_SUMMARY_LIST,
    UPDATE_TRANSACTION_LIST,
    UPDATE_SUMMARY_CARD_DATA,
    FETCH_SUMMARY_CARD_DATA
} from "./actionType"




export const fetchSummaryList = () => {
    return {
        type:FETCH_SUMMARY_LIST
    }
}
export const updateSummaryList = (response) => {
    return {
        type: UPDATE_SUMMARY_LIST,
        payload:response
    }
}

export const fetchSummaryCardData = () => {
    return {
        type: FETCH_SUMMARY_CARD_DATA
    }
}

export const updateSummaryCardData = (response) => {
    return {
        type: UPDATE_SUMMARY_CARD_DATA,
        payload: response
    }
}


export const fetchTransactionList = () => {
    return {
        type:FETCH_TRANSACTION_LIST
    }
}
export const updateTransactionlist = (response) => {
    return {
        type: UPDATE_TRANSACTION_LIST,
        payload:response
    }
}

export const apiSummaryError = (error) => {
    return {
        type: API_ERROR_SUMMARY,
        payload:error
    }
}
export const clearSummaryError = (status) => {
    return {
        type: CLEAR_SUMMARY_ERROR,
        payload:status
    }
}


export const beginSummaryLoading = () => {
    return {
        type:BEGIN_SUMMARY_LOADING
    }
}
export const endSummaryLoading = () => {
    return {
        type:END_SUMMARY_LOADING
    }
}

