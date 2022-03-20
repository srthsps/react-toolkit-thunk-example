import { headerCardData,transactionsData ,summaryData} from "./SummaryStore";
import { API_ERROR_SUMMARY, BEGIN_SUMMARY_LOADING,UPDATE_SUMMARY_CARD_DATA, CLEAR_SUMMARY_ERROR, END_SUMMARY_LOADING, UPDATE_SUMMARY_LIST, UPDATE_TRANSACTION_LIST } from "./actionType"





const initialState = {
    error: "",
    headerCardData,
    transactionsData,
    summaryData,
    isLoading:false
}

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUMMARY_LIST: {
            console.log("resp,ac",action.payload);
            state.summaryData={...state.summaryData,rows:[...action.payload.results]}
            return state;
        }
        case UPDATE_TRANSACTION_LIST: {
            let { results } = action.payload;
            state.transactionsData = { ...state.transactionsData, rows: [...results] };
            return state;           
        }
        case UPDATE_SUMMARY_CARD_DATA:
            console.log("card data",action.payload)
            state.headerCardData[0].value = action.payload.total_rent_collected
            state.headerCardData[1].value = action.payload.pending_rent_amount
            return state
        case API_ERROR_SUMMARY: {
            state.error = { ...state.error, error: action.payload, loading: true };
            return state;
        }
        case CLEAR_SUMMARY_ERROR: {
            state.error = { ...state.error, loading: action.payload };
        }
        case BEGIN_SUMMARY_LOADING: {
            state.isLoading = true;
            return state;
        }
        case END_SUMMARY_LOADING: {
            state.isLoading = false;
            return state;
        }
        default:{
            return state;
        }
    }
}



export default summaryReducer;