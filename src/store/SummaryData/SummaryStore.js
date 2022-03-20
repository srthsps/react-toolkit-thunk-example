import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"


export const headerCardData = [
    {
      title: "Total Rent Collected",
      icon: servicesIcon1,
      change: 12,
      value: null,
      link: "#",
    },
    {
      title: "Pending Rent Amount",
      icon: servicesIcon2,
      change: -28,
      value: null,
      link: "#",
    },
]
  
export const transactionsData = {
  columns: [
    { label: "ID", field: "id" },
    { label: "Name", field: "tenant" },
    { label: "Unit", field: "unit" },
    { label: "Date", field: "date_added" },
    { label: "Amount", field: "amount" },
    { label: "Status", field: "transStatusPill" }, 
    { label: "Actions", field: "view" },
  ],
  rows: [
    // {
    //   id: 1, tena: "Trans 1", rentpeID: 49, tenantName: "David", tenantEmail: "david@gmail.com",
    //   transDate: "2021-05-14", transId: 100012541, transStatus: "Success", transAmount: 95000
    // },
    // {
    //   id: 2, transName: "Trans 2", rentpeID: 52, tenantName: "John", tenantEmail: "john@gmail.com",
    //   transDate: "2021-03-24", transId: 100012125, transStatus: "Success", transAmount: 25000
    // },
    // {
    //   id: 3, transName: "Trans 3", rentpeID: 63, tenantName: "Kiran", tenantEmail: "kiran@gmail.com",
    //   transDate: "2021-02-04", transId: 100012460, transStatus: "Success", transAmount: 42000
    // },
    // {
    //   id: 4, transName: "Trans 4", rentpeID: 48, tenantName: "Luffy", tenantEmail: "luffy@gmail.com",
    //   transDate: "2021-05-14", transId: 100012742, transStatus: "Failed", transAmount: 28000
    // },
  ]
}

export const summaryData = {
  columns: [
    { label: "ID", field: "id" },
    { label: "Tenant", field: "tenant" },
    { label: "Unit", field: "unit" },
    { label: "Rent Amount", field: "rent_amount" },
    { label: "Paid Amount", field: "paid_amount" },
    { label: "Status", field: "statusPill" }, 
    // { label: "Actions", field: "view" },
  ],
  rows: []
}