import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import propertySaga from "./PropertyData/saga"
import userSaga from "./userData/saga"
import tenantSaga from "./TenantsData/saga"
import categorySaga from "./CategoryData/saga"
import dashboardSaga from "./DashboardStore/saga"
import summarySaga from "./SummaryData/saga"
import unitSaga from "./UnitsData/saga"
import resetPasswordSaga from "./auth/resetPassword/saga"


export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    propertySaga(),
    userSaga(),
    tenantSaga(),
    categorySaga(),
    dashboardSaga(),
    summarySaga(),
    unitSaga(),
    resetPasswordSaga(),
    fork(calendarSaga),
  ])
}
