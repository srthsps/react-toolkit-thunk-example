import { tenantData, tenantDetailsData,rentedUnitsData, accountDetails, tenantProfileData, tenantTransactionsData } from './TenantStore'
import { UPDATE_TENANT_LIST,UPDATE_TENANT_DETAILS, UPDATE_RENTED_UNITS, UPDATE_TENANT_PROFILE, UPDATE_TENANT_TRANSACTIONS, API_ERROR_TENANTS,CLEAR_TENANT_DETAILS, CLEAR_ERROR, BEGIN_LOADING_TENANTS, END_LOADING_TENANTS, DELETE_TENANT_SUCCESS } from './actionType'

const initialState = {
    error:'',
    tenantData,
    tenantDetailsData,
    accountDetails,
    tenantProfileData,
    tenantTransactionsData,
    rentedUnitsData,
    isLoading:false
  }
  
  const tenantReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_TENANT_LIST:
        let { results } = action.payload;
        state.tenantData = { ...state.tenantData, rows: [...results] };
        return state
      case UPDATE_TENANT_DETAILS:
        const details = action.payload;
        state.tenantDetailsData = { ...state.tenantDetailsData, ...details };
        return state
      case UPDATE_TENANT_PROFILE:
        const profile = action.payload;
        state.tenantProfileData = {...state.tenantProfileData, ...profile}
        return state
      case CLEAR_TENANT_DETAILS:
        state.tenantDetailsData = {}
        return state
      case UPDATE_TENANT_TRANSACTIONS:
        const transactions = action.payload.results;
        state.tenantTransactionsData = { ...state.tenantTransactionsData, rows:[...transactions] }
        return state;
      case UPDATE_RENTED_UNITS:
        let rentedUnits = action.payload.results;
        state = { ...state, rentedUnitsData:[...rentedUnits ]};
        return state
      case DELETE_TENANT_SUCCESS:
        state.tenantData.rows = state.tenantData.rows.filter(item => item.id != action.payload);
        state.tenantData = { ...state.tenantData, rows: [...state.tenantData.rows] };
        return state;
      case API_ERROR_TENANTS:
        console.log("api error payload",action.payload)
        state.error = { ...state.error, error: action.payload, loading: true };
        console.log("innside api error",state.error);
        return state
      case CLEAR_ERROR:
        state.error = { ...state.error, loading: action.payload };
      case BEGIN_LOADING_TENANTS:
        state.isLoading = true
        console.log("tenants reducer loading started")
        return state
      case END_LOADING_TENANTS:
        state.isLoading = false
        console.log("loading ended")
        return state
      default: {
        return state // We return the default state here
      }
    }
  }
  
  export default tenantReducer