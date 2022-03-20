
import { unitsData, unitDetailsData,transactionData,unitTenantData  } from './UnitStore'
import {
  UPDATE_UNIT,
  UPDATE_UNIT_DETAILS,
  UNIT_API_ERROR,
  CLEAR_UNIT_ERROR,
  BEGIN_UNITS_LOADING,
  END_UNITS_LOADING,
  DELETE_UNIT_SUCCESS,
  UPDATE_UNIT_TRANSACTION,
  CLEAR_UNIT_DATA,
  UPDATE_UNIT_TENANT
} from './actionType'


const initialState = {
  error:"",
  unitsData,
  unitDetailsData,
  transactionData ,
  unitTenantData,
  isLoading:false
}

const unitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNIT:
      const unitData = action.payload.results;
      state.unitsData = { ...state.unitsData, rows: [...unitData] };
      return state
    case UPDATE_UNIT_DETAILS:
      let unitDetails = action.payload;
      state.unitDetailsData = { ...state.unitDetailsData, ...unitDetails };
      return state
    case CLEAR_UNIT_DATA:
      state.unitDetailsData = {}
      return state;
    case DELETE_UNIT_SUCCESS:
      state.unitsData.rows = state.unitsData.rows.filter(item => item.id != action.payload);
      state.unitsData = { ...state.unitsData, rows: [...state.unitsData.rows] };
      return state;
    case UPDATE_UNIT_TRANSACTION: 
      state.transactionData = {...state.transactionData,rows:[...action.payload.results]}
      return state;
    case UPDATE_UNIT_TENANT:
      let unitTen = action.payload;
      state.unitTenantData = { ...state.unitTenantData, ...unitTen };
      return state
    case UNIT_API_ERROR:
      state.error = { ...state.error, error: action.payload, loading: true };
      console.log("innside api error",state.error);
      return state
    case CLEAR_UNIT_ERROR:
      state.error = { ...state.error, loading: action.payload };
    case BEGIN_UNITS_LOADING :
      state.isLoading = true
      return state
    case END_UNITS_LOADING:
      state.isLoading = false
      return state
    default: {
      return state; // We return the default state here
    }
  }
}

export default unitsReducer;
