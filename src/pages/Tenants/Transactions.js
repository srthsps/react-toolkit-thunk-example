import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"

import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"

import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"

import {
  fetchTenantTransactions,
  apiErrorTenants,
  clearError,
} from "store/actions"
import { connect } from "react-redux"

const TenantTransactions = props => {
  const loading = props.error.loading
  const status = false
  const toggle = () => {
    props.clearError(status)
  }

  let { tenantID } = useParams()

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantTransactions(tenantID)
    }
    dummy()
  }, [])

  let transactionsData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "transName" },
      { label: "Rentpay ID", field: "rentpeID" },
      { label: "Tenant", field: "tenantName" },
      { label: "Email", field: "tenantEmail" },
      { label: "Date", field: "transDate" },
      { label: "Trans ID", field: "transId" },
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
        transId: 100012541,
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
        transId: 100012125,
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
        transId: 100012460,
        transStatus: "Failure",
        transAmount: 42000,
      },
    ],
  }

  // props.propsData.rows.forEach(row => {
  //   row.view = (
  //     <Link to={`transactions/${row.id}/dashboard`}>
  //       <Button color="primary" outline>
  //         <i className="mdi mdi-eye pe-1" /> View
  //       </Button>
  //     </Link>
  //   )

  //   row.transStatusPill = (
  //     <span
  //       className={`rounded-pill text-light
  //       ${row.transStatus == "Success" ? "bg-success" : "bg-danger"}`}
  //     >
  //       {row.transStatus}
  //     </span>
  //   )
  // })

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="page-title-box">
        <Row className="align-items-center">
          <Col>
            <h6 className="page-title">Transactions</h6>
          </Col>
        </Row>
      </div>
      <Row className="mt-4">
        <Col>
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Transactions List</h4>
              <MDBDataTable
                striped
                hover
                responsive
                data={props.propsData}
                barReverse
                noBottomColumns
                tbodyColor="align-middle"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  console.log("mapping...", state)
  return {
    propsData: state.tenantReducer.tenantTransactionsData,
    error: state.tenantReducer.error,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchTenantTransactions,
    apiErrorTenants,
    clearError,
  })(TenantTransactions)
)
