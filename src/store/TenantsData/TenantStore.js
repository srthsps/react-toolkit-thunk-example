export const tenantData = {
  columns: [
    { label: "ID", field: "idField" },
    { label: "Tenant name", field: "name" },
    { label: "Business name", field: "business_name" },
    { label: "Email", field: "email" },
    { label: "Rent", field: "rent" },
    { label: "Contact", field: "mobile" },
    { label: "Actions", field: "view" },
  ],
  rows: [
    // {
    //   id: 0,
    //   name: "Hisoka",
    //   businessName: "B1",
    //   unit: "32",
    //   collectionPeriod: CollectionPeriods.DAILY,
    //   paymentStatus: PaymentStatus.PENDING,
    //   mobile: "+91 1234567890",
    //   rentAmount: 4500,
    // },
    // {
    //   id: 1,
    //   name: "Silva",
    //   businessName: "B2",
    //   unit: "22",
    //   collectionPeriod: CollectionPeriods.WEEKLY,
    //   paymentStatus: PaymentStatus.PARTIAL,
    //   mobile: "+91 1234567890",
    //   rentAmount: 8000,
    // },
    // {
    //   id: 2,
    //   name: "Zeno",
    //   businessName: "B2",
    //   unit: "16",
    //   collectionPeriod: CollectionPeriods.MONTHLY,
    //   paymentStatus: PaymentStatus.PAID,
    //   mobile: "+91 1234567890",
    //   rentAmount: 6500,
    // },
  ]
}

export const tenantDetailsData = {}

export const tenantProfileData = {}

export const tenantTransactionsData = {
  columns: [
    { label: "ID", field: "id" },
    { label: "Unit", field: "unit" },
    { label: "Amount", field: "amount" },
    { label: "Date", field: "date_added" },
    { label: "Creater", field: "creator" },
    // { label: "Actions", field: "view" },
  ],
  rows: []
}

export const accountDetails = [
  {
    label: "Tenant Name",
    data: "Hisoka"
  },
  {
    label: "Business name",
    data: "B2"
  },
  {
    label: "Unit",
    data: "32"
  },
  {
    label: "Rent",
    data: "8000"
  },
  {
    label: "Collection Period",
    data: "Weekly"
  },
  {
    label: "Payment Status",
    data: "Paid"
  },
  {
    label: "Contact",
    data: "+91 1234567890"
  }
]

export const rentedUnitsData = []
