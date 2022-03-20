import React, { useEffect, useState } from "react"
import { ReactTitle } from "react-meta-tags"
import ErrorModal from "components/Common/ErrorModal"
import { MDBDataTable } from "mdbreact"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  InputGroup,
  Label,
  Input,
  CardHeader,
} from "reactstrap"

import Flatpickr from "react-flatpickr"

import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { connect, useSelector, useDispatch } from "react-redux"
import {
  fetchSummaryList,
  clearSummaryError,
  fetchSummaryCardData,
} from "store/actions"

const Summary = props => {
  const loading = props.error.loading

  useEffect(() => {
    props.fetchSummaryCardData()
    props.fetchSummaryList()
    
  }, [])

  const headerCardData = useSelector(
    state => state.summaryReducer.headerCardData
  )

  const toggle = async () => {
    await props.clearSummaryError(false)
  }
  props.summaryData.rows.forEach(row => {
    // row.view =
    //   <Link to={`transactions/${row.id}/dashboard`}>
    //     <Button color="primary" outline>
    //       <i className="mdi mdi-eye pe-1" /> View
    //     </Button>
    //   </Link>

    row.statusPill = (
      <span
        className={`rounded-pill text-light
        ${
          row.payment_status == "pending"
            ? "bg-danger"
            : row.payment_status == "partial"
            ? "bg-warning"
            : "bg-danger"
        }`}
      >
        {row.payment_status}
      </span>
    )
  })
  return (
    <div className="page-content">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <ReactTitle title="Transaction Summary" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title mt-3">Transaction Summary</h6>
            </Col>
          </Row>

          {/* <Card className="mini-stat mt-4">
            <CardBody>
              <Row> */}
          {/* <Col md={12} xl={12} className="mt-4" align="center">
                    <FormGroup className="col-6 mt-3 mb-4">
                      <Label className="mb-3">Select Transaction Date</Label>
                      <InputGroup>
                        <Input id="notes" type="date" />
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="Choose date range"
                          options={{
                            mode: "range",
                            dateFormat: "Y-m-d",
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                </Col> */}
          {/* <Col className="mt-4" align="center">
                  <Card className="mini-stat col-6  text-white" style={{background: '#F89A1B'}}>
                    <CardBody>
                      <div className="mb-4">
                        <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                          BALANCE
                        </h5>
                        <h4 className="fw-medium font-size-24">2,95,25,500 ₹</h4>
                      </div>
                    </CardBody>
                  </Card>
                </Col> */}
          {/* </Row>
            </CardBody>
          </Card> */}

          <Row className="mt-5">
            {props.headerCardData.map((headerCard, index) => (
              <Col xl={6} md={6} key={index}>
                <Card
                  className="mini-stat  text-white"
                  style={{ background: "#F89A1B" }}
                >
                  <CardBody>
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                        {headerCard.title}
                      </h5>
                      <h4 className="fw-medium font-size-24">
                        ₹ {headerCard.value && headerCard.value}
                      </h4>
                    </div>
                    <div className="pt-2">
                      <p className="text-white-50 mb-0 mt-1">vs net amount</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col>
              <Card>
                <CardHeader tag="h5">Summary list</CardHeader>
                <CardBody>
                  {/* {props.isLoading ? <Skelton /> : ( */}
                  <MDBDataTable
                    striped
                    hover
                    responsive
                    data={props.summaryData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle"
                  />
                  {/* )} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    headerCardData: state.summaryReducer.headerCardData,
    error: state.summaryReducer.error,
    summaryData: state.summaryReducer.summaryData,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchSummaryList,
    fetchSummaryCardData,
    clearSummaryError,
  })(Summary)
)
