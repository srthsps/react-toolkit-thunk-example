import {
  BEGIN_LOADING_DASHBOARD,
  CLEAR_ERROR_DASHBOARD,
  END_LOADING_DASHBOARD,
  UPDATE_ATTENDANCE_STATUS,
  UPDATE_CARD_DATA,
  UPDATE_RECENT_TRANSACTIONS,
  API_ERROR_DASHBOARD,
  UPDATE_SOON_TO_BE_EXPIRED_LIST,
} from "./actionType"
import { headerCardData,attendanceStatus, transactionData, activityData } from "./DashboardStore"

const initialState = {
  error: "",
  headerCardData,
  transactionData,
  attendanceStatus,
  activityData,
  isLoading: false,
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARD_DATA: {
      console.log("in action", action)
      // state.headerCardData[0]={...state.headerCardData[0],value:action.payload.tenants}
      state.headerCardData[2].value = action.payload.number_of_tenants
      state.headerCardData[3].value = action.payload.number_of_units
      state.headerCardData[0].value = action.payload.pending_rent_amount
      state.headerCardData[1].value = action.payload.total_rent_collected

      return state
    }
    case UPDATE_RECENT_TRANSACTIONS: {
      const { results } = action.payload
      state.transactionData = [...results]
      return state
    }
    case UPDATE_SOON_TO_BE_EXPIRED_LIST: {
      const data = action.payload.results
      state.activityData = [...data]
      return state
    }
    case UPDATE_ATTENDANCE_STATUS: {
      const attendance = action.payload
      console.log("attendance in reducer",attendance)
      state.attendanceStatus = { ...state.attendanceStatus, ...attendance }
      return state
    }
    case BEGIN_LOADING_DASHBOARD: {
      state.isLoading = true
      return state
    }
    case END_LOADING_DASHBOARD: {
      state.isLoading = false
      return state
    }
    case API_ERROR_DASHBOARD: {
      state.error = { ...state.error, error: action.payload, loading: true }
      return state
    }
    case CLEAR_ERROR_DASHBOARD: {
      state.error = { ...state.error, loading: action.payload }
    }
    default: {
      return state // We return the default state here
    }
  }
}
export default dashboardReducer
