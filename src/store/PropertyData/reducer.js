
import {
  propertyData, propertyDetailsData,propertyTenantsData, incomeCategoriesData,expenseCategoriesData, staffDataList,propertyDetailsCardData,propertyTransactionCardData,
  propertyTransactionData} from './PropertyStore'
import { UPDATE_PROPERTY_LIST, UPDATE_PROPERTY_TENANTS , UPDATE_EXPENSE_CATEGORIES,SQRF_ERROR,CLEAR_SQRF_ERROR, UPDATE_INCOME_CATEGORIES, UPDATE_PROPERTY_DETAILS,UPDATE_PROPERTY_TRANSACTIONS, UPDATE_PROPERTY_DETAILS_CARD_DATA, UPDATE_PROPERTY_STAFF, API_ERROR_PROPERTIES, CLEAR_ERROR_PROPERTIES, BEGIN_LOADING,END_LOADING, DELETE_PROPERTY_SUCCESS, UPDATE_PROPERTY_TRANSACTION_CARD_DATA } from './actionType'


const initialState = {
  error:"",
  errorProperties:"",
  sqrfErrorStatus:"",
  propertyData,
  propertyDetailsData,
  staffDataList,
  propertyTransactionData,
  propertyDetailsCardData,
  propertyTransactionCardData,
  propertyTenantsData,
  incomeCategoriesData,
  expenseCategoriesData,
  isLoading:false
}

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROPERTY_LIST:
      let { results } = action.payload;
      state.propertyData = [...results];
      return state
    case UPDATE_PROPERTY_DETAILS:
      const data = action.payload;
      console.log("details data",data)
      state.propertyDetailsData = { ...state.propertyDetailsData, ...data };
      return state
    case UPDATE_PROPERTY_DETAILS_CARD_DATA:
      const propertyCardData = action.payload;
      console.log("card data",propertyCardData)
      state.propertyDetailsCardData = { ...state.propertyDetailsCardData, ...propertyCardData };
      return state
    case UPDATE_PROPERTY_TRANSACTION_CARD_DATA:
      const transCardData = action.payload;
      console.log("card data",transCardData)
      state.propertyTransactionCardData = { ...state.propertyTransactionCardData, ...transCardData };
      return state
    case UPDATE_PROPERTY_STAFF:
      const staffData = action.payload.results;
      console.log("in payload", staffData)
      state.staffDataList = { ...state.staffDataList, rows: [...staffData] };
      console.log("after assigning", state.staffDataList)
      return state;
    case UPDATE_PROPERTY_TRANSACTIONS:
      const transData = action.payload.results;
      console.log("in reducer",transData)
      state.propertyTransactionData = {...state.propertyTransactionData,rows: [...transData]}
      return state
    case UPDATE_PROPERTY_TENANTS:
      const tenantsData = action.payload.results;
      state.propertyTenantsData = {...state.propertyTenantsData, rows: [...tenantsData]}
      return state
    case UPDATE_INCOME_CATEGORIES:
      let income = action.payload.results;
      state.incomeCategoriesData = [...income];
      return state
    case UPDATE_EXPENSE_CATEGORIES:
      let expense = action.payload.results;
      state.expenseCategoriesData = [...expense];
      return state
    case DELETE_PROPERTY_SUCCESS:
      state.propertyData.rows = state.propertyData.rows.filter(item => item.id != action.payload);
      state.propertyData = { ...state.propertyData, rows: [...state.propertyData.rows] };
      return state;

    case API_ERROR_PROPERTIES:
      console.log("api error payload",action.payload)
      state.error = { ...state.error, error: action.payload, loading: true };
      console.log("innside property api error",state.error);
      return state
    case CLEAR_ERROR_PROPERTIES:
      console.log("inside properties clear error")
      state.error = { ...state.error, loading: action.payload };

    case SQRF_ERROR:
      console.log("inside sqrf property error")
      state.sqrfErrorStatus = {...state.sqrfErrorStatus,sqrfErrorStatus:action.payload,loading:false};
      return state
    case CLEAR_SQRF_ERROR:
      console.log("inside sqrf clear error")
      state.sqrfErrorStatus = {...state.sqrfErrorStatus,sqrfErrorStatus:action.payload}

    case BEGIN_LOADING:
      state.isLoading = true
      console.log("loading started")
      return state
    case END_LOADING:
      state.isLoading = false
      console.log("loading ended")
      return state
    default: {
      return state; // We return the default state here
    }
  }
}

export default propertyReducer
