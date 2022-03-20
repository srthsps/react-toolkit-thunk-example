import { constant } from "lodash-es"

export const propertyRealTableData = [
  {
    id: 1,
    unitName: "Room 221",
    tenantName: "Jake",
    rentAmount: 9500,
    depositAmount: 25000,
    unitCategory: "Individual",
    unitStatus: "Occupied",
    unitFlexible: true,
    unitColPeriod: "Daily",
    unitPropertyName: "Skyline",
  },
  {
    id: 2,
    unitName: "Room 221",
    tenantName: "Jake",
    rentAmount: 9500,
    depositAmount: 25000,
    unitCategory: "Individual",
    unitStatus: "Occupied",
    unitFlexible: true,
    unitColPeriod: "Daily",
    unitPropertyName: "Skyline",
  },
  {
    id: 3,
    unitName: "Room 221",
    tenantName: "NIL",
    rentAmount: 9500,
    depositAmount: 25000,
    unitCategory: "Individual",
    unitStatus: "Vacant",
    unitFlexible: true,
    unitColPeriod: "Daily",
    unitPropertyName: "Skyline II",
  },
  {
    id: 4,
    unitName: "Room 221",
    tenantName: "Jake",
    rentAmount: 9500,
    depositAmount: 25000,
    unitCategory: "Individual",
    unitStatus: "Occupied",
    unitFlexible: true,
    unitColPeriod: "Weekly",
    unitPropertyName: "Skyline II",
  },
]

export const propertyUnitData = {
  columns: [
    { label: 'ID', field: 'id' },
    { label: 'Unit', field: 'unitName' },
    { label: 'Tenant', field: 'tenantName' },
    { label: 'Rent', field: 'rentAmount' },
    { label: 'Deposit', field: 'depositAmount' },
    { label: 'Category', field: 'unitCategory' },
    { label: 'Status', field: 'unitStatusPill' },
    { label: 'Flexible Payment', field: 'unitFlexible', attributes: { className: 'center' } },
    { label: 'Collection Period', field: 'unitColPeriod' },
    { label: 'Property', field: 'unitPropertyName' },
    { label: 'Actions', field: 'view' }
  ],
  rows: [
    {
      id: 1,
      unitName: "Room 210",
      tenantName: "Jake",
      rentAmount: 9500,
      depositAmount: 25000,
      unitCategory: "Individual",
      unitStatus: "Occupied",
      unitFlexible: "Enabled",
      unitColPeriod: "Daily",
      unitPropertyName: "Skyline",
    },
    {
      id: 2,
      unitName: "Room 225",
      tenantName: "Kiran",
      rentAmount: 9500,
      depositAmount: 25000,
      unitCategory: "Individual",
      unitStatus: "Occupied",
      unitFlexible: "Disabled",
      unitColPeriod: "Daily",
      unitPropertyName: "Skyline",
    },
    {
      id: 3,
      unitName: "Room 332",
      tenantName: "NIL",
      rentAmount: 9500,
      depositAmount: 25000,
      unitCategory: "Individual",
      unitStatus: "Vacant",
      unitFlexible: "Enabled",
      unitColPeriod: "Daily",
      unitPropertyName: "Skyline II",
    },
    {
      id: 4,
      unitName: "Room 221",
      tenantName: "Neymar",
      rentAmount: 9500,
      depositAmount: 25000,
      unitCategory: "Individual",
      unitStatus: "Occupied",
      unitFlexible: "Enabled",
      unitColPeriod: "Weekly",
      unitPropertyName: "Skyline II",
    },
  ]
}

export const unitTransactions = {
  columns: [
    { label: "ID", field: "id" },
    { label: "Name", field: "transName" },
    { label: "Rentpe ID", field: "rentpayId" },
    { label: "Tenant", field: "tenantName" },
    { label: "Email", field: "tenantEmail" },
    { label: "Date", field: "transDate" },
    { label: "Amount", field: "transAmount" },
    { label: "Transaction ID", field: "transId" },
    { label: "Status", field: "tranStatus" },
  ],
  rows: [
    {
      id: 1,
      transName: " Trans 1",
      rentpayId: 25,
      tenantName: "Bob",
      tenantEmail: "email@email.com",
      transDate: "2021-02-24",
      transId: 10045215,
      tranStatus: "Success",
      transAmount: 9850,
    },
    {
      id: 2,
      transName: " Trans 2",
      rentpayId: 30,
      tenantName: "Jake",
      tenantEmail: "email@email.com",
      transDate: "2021-02-24",
      transId: 10045215,
      tranStatus: "Success",
      transAmount: 4805,
    },
    {
      id: 3,
      transName: " Trans 3",
      rentpayId: 45,
      tenantName: "Rob",
      tenantEmail: "email@email.com",
      transDate: "2021-02-24",
      transId: 10045215,
      tranStatus: "Success",
      transAmount: 7640,
    },
    {
      id: 4,
      transName: " Trans 4",
      rentpayId: 72,
      tenantName: "Kevin",
      tenantEmail: "email@email.com",
      transDate: "2021-02-24",
      transId: 10045215,
      tranStatus: "Failure",
      transAmount: 3280,
    },
  ],
}

export const unitDetails = [
  {
    label: "Unit Name",
    data: "Room 210"
  },
  {
    label: "Rent",
    data: 9500
  },
  {
    label: "Category",
    data: "Individual"
  },
  {
    label: "Flexible Payment",
    data: "Enabled"
  },
  {
    label: "Property Name",
    data: "Skyline"
  },
  {
    label: "Tenant Name",
    data: "Jake"
  },
  {
    label: "Deposit",
    data: "25000"
  },
  {
    label: "Status",
    data: "Occupied"
  },
  {
    label: "Collection Period",
    data: "Daily"
  },
  {
    label: "Property Owner",
    data: "Larry"
  },
]