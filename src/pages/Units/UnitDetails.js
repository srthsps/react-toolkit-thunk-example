import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import Transactions from "pages/Units/Transactions"
import AssignTenant from "./AssignTenant"
import RentalRenew from "./RentalRenew"

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  Button,
  CardBody,
  CardHeader,
  Alert,
  Label,
} from "reactstrap"

// i18n
import {
  unitApiError,
  apiErrorProperties,
  clearErrorProperties,
  fetchUnitDetails,
  clearUnitError,
  fetchUnitList,
  fetchTenantList,
  createRental,
  createRentalRenewal
} from "store/actions"
import { connect } from "react-redux"
import Skelton from "components/Common/Skelton"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const UnitDetails = props => {
  const loading = props.error.loading

  const status = false

  const toggler = async () => {
    console.log("error toggle")
    await props.clearErrorProperties(status)
  }

  let { propertyID, unitID } = useParams()
  const [tenant, setTenant] = useState("")
  // const [unit, setUnit] = useState("")
  const [deposit_amount, setDepositAmount] = useState(null)
  const [rent_amount, setRentAmount] = useState(null)
  const [start_date, setStartDate] = useState("")
  const [agg_start_date, setAggStartDate] = useState("")
  const [agg_end_date, setAggEndDate] = useState("")
  const [renewalStartDate, setRenewalStartDate] = useState("")
  const [renewalEndDate, setRenewalEndDate] = useState("")
  const [RentalModalStatus, setRentalModalStatus] = useState(false)
  const [renewModalStatus, setRenewModalStatus] = useState(false)

  useEffect(() => {
    let dummy = async () => {
      await props.fetchUnitDetails(unitID, propertyID)
    }
    dummy()
  }, [renewModalStatus])

  let dispatch = useDispatch()

  let history = useHistory()

  const createRentalFn = async e => {
    console.log(e)
    e.preventDefault()
    let rentalData = {
      tenant,
      unit: unitDetails.id,
      rent_amount: unitDetails.rent_amount,
      deposit_amount: unitDetails.deposit_amount,
      start_date,
      agreement: {
        start_date: agg_start_date,
        end_date: agg_end_date,
      },
    }
    console.log(rentalData)

    let errors = false

    if (!rentalData.unit.length > 0) {
      dispatch(apiErrorProperties("Unit is required"))
      errors = true
    } else if (rentalData.deposit_amount == null) {
      dispatch(apiErrorProperties("Deposit amount is required"))
      errors = true
    } else if (rentalData.rent_amount == null) {
      dispatch(apiErrorProperties("Rent amount is required"))
      errors = true
    } else if (!rentalData.start_date.length > 0) {
      dispatch(apiErrorProperties("Start Date is required"))
      errors = true
    } else if (!rentalData.agreement.start_date.length > 0) {
      dispatch(apiErrorProperties("Agreement details are required"))
      errors = true
    } else if (!rentalData.agreement.end_date.length > 0) {
      dispatch(apiErrorProperties("Agreement details are required"))
      errors = true
    }

    console.log(rentalData)

    if (!errors) {
      dispatch(createRental(rentalData, history))
    }
  }

  const rentalRenew = e => {
    e.preventDefault()
    console.log(renewalStartDate)
    console.log(renewalEndDate)
    let error = false
    if(renewalStartDate=="" || renewalEndDate==""){
      error = true
    }
    if(error) {
      dispatch(apiErrorProperties("Enter valid dates"))
    }
    else {
      let renewalData = {
        start_date:renewalStartDate,
        end_date:renewalEndDate,
        is_active:true,
      }
      let rentalID = unitDetails.active_rental.id
      let agreementID = unitDetails.agreement_renewal.id
      console.log(renewalData,rentalID,agreementID)
      dispatch(createRentalRenewal(renewalData,rentalID,agreementID))
      setRenewModalStatus(false)
    }
  }

  useEffect(() => {
    let dummy = async () => {
      await props.fetchUnitList(propertyID)
    }
    dummy()
  }, [])

  let unitDetails = useSelector(state => state.unitsReducer.unitDetailsData)

  console.log("first", unitDetails)
  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantList()
    }
    dummy()
  }, [])

  console.log("the error is", props.error)

  return (
    <Container fluid className="mt-5 pt-3">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggler}></ErrorModal>
      )}
      <RentalRenew
        isOpen={renewModalStatus}
        toggle={setRenewModalStatus}
        rentalRenew={rentalRenew}
        startDate={renewalStartDate}
        endDate={renewalEndDate}
        setStart={setRenewalStartDate}
        setEnd={setRenewalEndDate}
      />
      <div className="page-title-box">
        <Row className="align-items-center  ">
          <Col>
            <h5 className="page-title pb-5 ps-3">Unit Dashboard</h5>
          </Col>
        </Row>
        {props.isLoading ? (
          <Skelton />
        ) : (
          <Card className="py-4 px-3 mx-4">
            <Row className="align-items-center  ">
              <Col>
                <h5 className="page-title ">Unit Details</h5>
              </Col>
              {!unitDetails.is_occupied && (
                <Col>
                  <Button
                    onClick={() => setRentalModalStatus(true)}
                    className="btn btn-md float-end"
                  >
                    Assign Tenant
                  </Button>
                </Col>
              )}
            </Row>
            <Row className="align-items-center pt-4">
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Unit name :</strong>
                  </Col>
                  <Col>
                    <div>{unitDetails.name}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Category :</strong>
                  </Col>
                  <Col>
                    <div>{unitDetails.category}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    <div>
                      {unitDetails.is_occupied == true ? "Occupied" : "Vaccant"}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Activity:</strong>
                  </Col>
                  <Col>
                    <div>
                      {unitDetails.is_active == true ? "Active" : "Inactive"}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}

        {unitDetails.is_occupied && (
          <Card className="mx-4 mt-5">
            <CardHeader>
              <h5>Active Rental</h5>
            </CardHeader>
            <CardBody>
              {unitDetails.agreement_renewal && (
                <Alert className="alert alert-danger d-flex justify-content-between align-items-center">
                  <span>
                    {unitDetails.agreement_renewal
                      ? unitDetails.agreement_renewal.message
                      : "Something fishy"}
                  </span>
                  <Button
                    onClick={() => setRenewModalStatus(true)}
                    className="btn btn-md btn-outline-danger float-end"
                  >
                    Renew
                  </Button>
                </Alert>
              )}
              <Row>
                <Col xl={4}>
                  <Label>Unit</Label>
                  <Input
                    className="form-control-lg"
                    value={unitDetails.active_rental.unit}
                  ></Input>
                </Col>
                <Col xl={4}>
                  <Label>Start Date</Label>
                  <Input
                    className="form-control-lg"
                    value={unitDetails.active_rental.start_date}
                  ></Input>
                </Col>
                <Col xl={4}>
                  <Label>Status</Label>
                  <Input
                    className="form-control-lg"
                    value={unitDetails.active_rental.status}
                  >
                    Hello
                  </Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

        <Transactions unitID={unitID} propertyID={propertyID} />
      </div>
      <AssignTenant
        isOpen={RentalModalStatus}
        toggle={setRentalModalStatus}
        tenantsData={props.tenantsData}
        unitData={unitDetails}
        tenant={tenant}
        start_date={start_date}
        unitDetails={props.unitDetails}
        agg_end_date={agg_end_date}
        agg_start_date={agg_start_date}
        setStartDate={setStartDate}
        setRentAmount={setRentAmount}
        setDepositAmount={setDepositAmount}
        setAggEndDate={setAggEndDate}
        setAggStartDate={setAggStartDate}
        setTenant={setTenant}
        assign={createRentalFn}
      />
    </Container>
  )
}
const mapStateToProps = state => {
  return {
    unitDetails: state.unitsReducer.unitDetails,
    unitList: state.unitsReducer.unitsData,
    error: state.propertyReducer.error,
    isLoading: state.unitsReducer.isLoading,
    tenantsData: state.tenantReducer.tenantData,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    fetchUnitDetails,
    apiErrorProperties,
    fetchUnitList,
    clearErrorProperties,
    fetchTenantList,
    createRental,
  })(UnitDetails)
)
