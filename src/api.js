import axios from "axios";
import Cookies from 'js-cookie'
// import { useDispatch } from "react-redux";


const actionHandler = (payload) => {
	// const dispatch = useDispatch()
	axios.defaults.headers.common['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Accept'] = 'application/json';
	
	const token = Cookies.get('property-token');
	if (token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	// axios.interceptors.request.use(request => {
	// 	console.log('Starting Request', JSON.stringify(request, null, 2))
	// 	return request
	// })

	

	return new Promise((resolve, reject) => {

		payload.baseURL = 'https://dev.enfono.com/api_downtown/api/v1/'

		axios(payload)
			.then(response => {
				let resp = response.data;
				if (response.status >= 200 && response.status < 300) {
					console.log("success",response)
					resolve(resp.data);
				} else {
					console.log("failure",response)
					reject(resp.message);
				}
			})
			.catch(err => {
				axios.interceptors.request.use(request => {
					return request
				  })
				reject(getActionErrorMessage(err));
			});
	});
}

const getActionErrorMessage = (err) => {
	if (err.response?.data?.message) {
		return "Error: " + err.response.data.message;
	} else {
		return err;
	}
}

axios.interceptors.response.use(undefined, function(err) {
	console.log("here")
	var statusCode = err.status;
	if (statusCode == undefined) {
		// Server needs to specify CORS headers in the response
		// Basically `ACCESS-CONTROL-ALLOW-ORIGIN: *`
		// Otherwise, these kinda issues happen

		var lineSplit = err.toString().split('\n')[0].split(' ');
		statusCode = lineSplit[lineSplit.length - 1];
	}

	console.log("intercepter statuscode: ",statusCode)
	// const history = useHistory();
	return new Promise(() => {
		if (statusCode == 401 && err.config && !err.config.__isRetryRequest) {
			// Got an unauthorized, logout the user
			localStorage.removeItem("property-token")
			// history.push('login')
			// store.dispatch('logout');
			// store.commit('logout');
			// router.push('/login');

			// Vue.prototype.$notify({
			// 	title: "Unauthorized action detected",
			// 	icon: 'fa fa-exclamation-triangle',
			// 	type: 'danger',
			// 	message: 'Please login again to resync',
			// });
		}
		throw err;
	});
});


export default {
	baseURL: "https://dev.enfono.com/api_downtown/api/v1/",

	/* auth URLs */
	loginURL: "auth/login/", // [POST]
	logoutURL: "auth/logout/", // [POST]

	propertiesListURL: "staff/properties/?limit=100",
	propertyDetailsURL: "staff/property/{id}/",
	propertyTransactionsURL: "staff/property/{property_id}/transactions/?limit=1000",
	unitListURL: '/staff/property/{property_id}/units/',
	unitDetailsURL: "staff/property/{property_id}/unit/{id}/",
	unitTransactionListURL:"staff/unit/{unit_id}/rent-transactions/",
	tenantsListURL: "staff/tenants/?limit=100",
	postUnitTransaction:"staff/rent/transaction/",
	tenantsDetailsURL: "staff/tenant/{id}/",
	cardDataURL: "staff/card-data/",
	recentTransactionListURL: "staff/recent-transactions/",
	summaryListURL: "staff/rent/summary/",
	summaryCardURL: "staff/summary/card-data/",
	transactionURL: "administration/recent/rent-transactions/",
	categoryURL: "staff/unit-categories",
	createRental:"staff/rental/create/",
	collectRentURL: "staff/rent/transaction/",
	propertyDetailsCardDataURL: "staff/property/{property_id}/rent-card-data/",
	propertyTransactionsCardDataURL: "staff/property/{property_id}/card-data/",
	squareOffRentURL: "staff/property/{property_id}/rent-transfer/",
	incomeCategoriesURL: "staff/transaction-category/?is_income=True",
	expenseCategoriesURL: "staff/transaction-category/",
	createPropertyTransactionURL: "staff/property/{property_id}/transactions/",
	rentedUnitsListURL: "staff/tenant/{tenant_id}/rented-units/",
	unitTenantURL: "staff/unit/{unit_id}/tenant/",
	createRentalRenewalURL: "staff/rental/{rental_id}/agreement/{id}/",
	fetchPropertyTenantsListURL: "staff/property/{property_id}/tenants/",
	fetchSoonToBeExpiredListURL: "staff/agreement-list/",
	fetchAttendanceStatusURL: "staff/attendance/",
	// propertyStaffListURL: "administration/property/{property_id}/staffs/",
	// usersListURL: 'administration/staffs/',
	// userDetailsURL: 'administration/staff/{id}/',
	// addUserURL: "administration/staffs/",
	// tenantsDetailsURL: "administration/tenant/{id}/",
	// tenantProfileURL: "administration/tenant/{id}/profile/",
	// tenantTransactionsURL: "administration/tenant/{tenant_id}/transactions/",
	// addTenantsURL: "administration/tenants/",
	// createRentalURL: "administration/rental/create/",
	//
	// sub_categoryURL:'administration/property/category/{category}/sub-categories/',
	// createTenantRenatl: 'administration/rental/create/',
	// assignPropertyToStaffURL: 'administration/assign-property-to-staff/',
	// 

	
	actionHandler
};