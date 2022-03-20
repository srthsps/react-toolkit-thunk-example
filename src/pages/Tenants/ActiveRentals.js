import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"

import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"

import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"

import { fetchTenantDetails, apiErrorTenants, clearError } from "store/actions"
import { connect } from "react-redux"

const ActiveRentals = props => {
  const loading = props.error.loading
  const status = false

  const toggle = () => {
    props.clearError(status)
  }

  let { tenantID } = useParams()

  let tenantDetailsData = useSelector(state=>state.tenantReducer.tenantDetailsData)

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantDetails(tenantID)
    }
    dummy()
  }, [])

  let rentalData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Unit", field: "unit" },
      { label: "Start Date", field: "start_date" },
      { label: "Status", field: "statusPill" },
    ],
    rows: tenantDetailsData?.rentals && tenantDetailsData.rentals
  }

  rentalData?.rows && rentalData.rows.forEach(row => {


    // row.view = (
    //   <Link to={`transactions/${row.id}/dashboard`}>
    //     <Button color="primary" outline>
    //       <i className="mdi mdi-eye pe-1" /> View
    //     </Button>
    //   </Link>
    // )

    row.statusPill = (
      <span
        className={`rounded-pill text-light
        ${row.status == "active" ? "bg-success" : "bg-danger"}`}
      >
        {row.status}
      </span>
    )
  })

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="page-title-box">
        <Row className="align-items-center">
          <Col>
            <h6 className="page-title mt-3">Active Rentals</h6>
          </Col>
        </Row>
      </div>
      <Row className="mt-4">
        <Col>
          <Card>
            <CardBody>
              {/* <h4 className="card-title mb-4">Active Rentals List</h4> */}
              <MDBDataTable
                striped
                hover
                responsive
                data={rentalData}
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
    propsData: state.tenantReducer.tenantDetailsData,
    error: state.tenantReducer.error,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchTenantDetails,
    apiErrorTenants,
    clearError,
  })(ActiveRentals)
)
