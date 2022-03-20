import { configureStore } from "@reduxjs/toolkit"
// import rootReducer from "./reducers"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

// import requestReducer from "./RequestsData/reducer"
import propertyReducer from "./PropertyData/reducer"
// import landlordReducer from "./LandlordsData/reducer"
// import propertyUnitReducer from "./ProppertyUnitData/reducer"
import tenantReducer from "./TenantsData/reducer"
import userReducer from "./userData/reducer"
import categoryReducer from "./CategoryData/reducer"
import dashboardReducer from "./DashboardStore/reducer"
import summaryReducer from "./SummaryData/reducer"
import unitsReducer from "./UnitsData/reducer"
import resetPasswordReducer from "./auth/resetPassword/reducer"

import userSlice  from './auth/login/loginSlice'

export default configureStore({
  reducer: {
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  propertyReducer,
  tenantReducer,
  userReducer,
  categoryReducer,
  dashboardReducer,
  unitsReducer,
  summaryReducer,
  resetPasswordReducer,
  userSlice
  },
})
