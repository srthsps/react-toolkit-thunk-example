import React from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"

import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"

const LandlordTransactions = props => {

  let transactionsData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "transName" },
      { label: "Rentpay ID", field: "rentpeID" },
      { label: "Tenant", field: "tenantName" },
      { label: "Email", field: "tenantEmail" },
      { label: "Date", field: "transDate" },
      { label: "Trans ID", field: "transID" },
      { label: "Status", field: "transStatusPill" },
      { label: "Amount", field: "transAmount" },
      { label: "Actions", field: "view" },
    ],
    rows: [
      {
        id: 1,
        transName: "Trans 1",
        rentpeID: 49,
        tenantName: "David",
        tenantEmail: "david@gmail.com",
        transDate: "2021-05-14",
        transID: 100012541,
        transStatus: "Success",
        transAmount: 95000,
      },
      {
        id: 2,
        transName: "Trans 2",
        rentpeID: 52,
        tenantName: "David",
        tenantEmail: "john@gmail.com",
        transDate: "2021-03-24",
        transID: 100012125,
        transStatus: "Success",
        transAmount: 25000,
      },
      {
        id: 3,
        transName: "Trans 3",
        rentpeID: 63,
        tenantName: "David",
        tenantEmail: "kiran@gmail.com",
        transDate: "2021-02-04",
        transID: 100012460,
        transStatus: "Failure",
        transAmount: 42000,
      },
    ],
  }

  transactionsData.rows.forEach(row => {
    row.view = (
      <Link to={`/transactions/${row.id}/dashboard`}>
        <Button color="primary" outline>
          <i className="mdi mdi-eye pe-1" /> View
        </Button>
      </Link>
    )

    row.transStatusPill = (
      <span
        className={`rounded-pill text-light
        ${row.transStatus == "Success" ? "bg-success" : "bg-danger"}`}
      >
        {row.transStatus}
      </span>
    )
  })

  return (
    <Container fluid>
      <div className="page-title-box">
        <Row className="align-items-center">
          <Col>
            <h6 className="page-title">Transactions</h6>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">Transactions List</h4>
                <MDBDataTable
                  striped
                  hover
                  responsive
                  data={transactionsData}
                  barReverse
                  noBottomColumns
                  tbodyColor="align-middle"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default withTranslation()(LandlordTransactions)
