import React, { useEffect, useState, useMemo, useCallback } from "react"
import { useSelector } from "react-redux"
import { withRouter, useParams, useHistory } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import AssignUnit from "./AssignUnit"

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

import {
  fetchTenantDetails,
  fetchPropertyList,
  fetchUnitDetails,
  fetchUnitList,
  createRentalTenant,
  apiErrorTenants,
  clearError,
} from "store/actions"
import { connect, useDispatch } from "react-redux"

const TenantDetails = props => {
  let unitDetails = useSelector(state => state.unitsReducer.unitDetailsData)
  const loading = props.error.loading
  const status = false
  const toggle = () => {
    props.clearError(status)
  }
  const [property, setProperty] = useState(null)
  const [unit, setUnit] = useState("")
  const [deposit_amount, setDepositAmount] = useState(null)
  const [rent_amount, setRentAmount] = useState(null)
  const [start_date, setStartDate] = useState("")
  const [agg_start_date, setAggStartDate] = useState("")
  const [agg_end_date, setAggEndDate] = useState("")

  const [RentalModalStatus, setRentalModalStatus] = useState(false)

  let { tenantID } = useParams()

  useEffect(() => {
    let dummy = async () => {
      await props.fetchPropertyList()
    }
    dummy()
  }, [])

  useEffect(() => {
    console.log("fetching units list")
    if (property != undefined) {
      dispatch(fetchUnitList(property))
    }
  }, [property])

  let dispatch = useDispatch()

  let history = useHistory()

  const createRentalFn = async e => {
    console.log(e)
    e.preventDefault()
    console.log(unitDetails)
    setDepositAmount(unitDetails.deposit_amount)
    setRentAmount(unitDetails.rent_amount)
    let rentalData = {
      tenant: props.propsData.id,
      unit,
      deposit_amount: unitDetails != null ? unitDetails.deposit_amount : "",
      rent_amount: unitDetails != null ? unitDetails.rent_amount : "",
      start_date,
      agreement: {
        start_date: agg_start_date,
        end_date: agg_end_date,
      },
    }
    console.log(rentalData)

    let error = false
    if (!rentalData.unit.length > 0) {
      dispatch(apiErrorTenants("Unit is required"))
      error = true
    } else if (rentalData.deposit_amount == null) {
      dispatch(apiErrorTenants("Deposit amount is required"))
      error = true
    } else if (rentalData.rent_amount == null) {
      dispatch(apiErrorTenants("Rent amount is required"))
      error = true
    } else if (!rentalData.start_date.length > 0) {
      dispatch(apiErrorTenants("Start Date is required"))
      error = true
    } else if (!rentalData.agreement.start_date.length > 0) {
      dispatch(apiErrorTenants("Agreement details are required"))
      error = true
    } else if (!rentalData.agreement.end_date.length > 0) {
      dispatch(apiErrorTenants("Agreement details are required"))
      error = true
    }

    console.log(rentalData)

    // if (!error) {
    //   let response = await dispatch(createRentalTenant(rentalData, history))
    //   console.log("res", response)
    // }
  }

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantDetails(tenantID)
    }
    dummy()
  }, [])

  // useEffect(()=>{
  //     let unitID = props.unit
  //     let propertyID = props.property
  //     dispatch(fetchUnitDetails(unitID,propertyID))
  //   },[props.unit])

  useEffect(() => {
    if (unit != null) {
      let dummy = async () => {
        let unitID = unit
        let propertyID = property
        await props.fetchUnitDetails(unitID, propertyID)
      }
      dummy()
    }
  }, [unit])

  let dummyData = {
    bank: props.propsData.bank_name,
    upi: props.propsData.upi_id,
    rentpeId: 2001,
    orgType: props.propsData.organization_type,
    orgName: "Google",
    busPan: props.propsData.business_pan,
  }

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="page-title-box">
        <div className="mt-4">
          <Card>
            <CardBody>
              <Row className="align-items-center">
                <Col>
                  <h2 className="page-title fs-3">{props.propsData.name}</h2>
                </Col>
                <Col>
                  <Button
                    onClick={() => setRentalModalStatus(true)}
                    className="btn btn-md float-end"
                  >
                    Assign Unit
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>

        {/* <Component>{RentalAssign}</Component> */}
        {/* <newOne>{modal}</newOne> */}
        <AssignUnit
          isOpen={RentalModalStatus}
          toggle={setRentalModalStatus}
          propertyList={props.propertyList}
          unitList={props.unitList}
          unitDetails={unitDetails}
          property={property}
          unit={unit}
          start_date={start_date}
          rent_amount={rent_amount}
          deposit_amount={deposit_amount}
          agg_end_date={agg_end_date}
          agg_start_date={agg_start_date}
          setUnit={setUnit}
          setDepositAmount={setDepositAmount}
          setRentAmount={setRentAmount}
          setStartDate={setStartDate}
          setAggEndDate={setAggEndDate}
          setAggStartDate={setAggStartDate}
          setProperty={setProperty}
          assign={createRentalFn}
        />

        <Row className="align-items-center px-2">
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Tenant Name:</strong>
              </Col>
              <Col>
                <div>{props.propsData.name}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Business Name:</strong>
              </Col>
              <Col>
                <div>{props.propsData.business_name}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Unit:</strong>
              </Col>
              <Col>
                <div>{props.propsData.units}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Rent:</strong>
              </Col>
              <Col>
                <div>{props.propsData.rent}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Address:</strong>
              </Col>
              <Col>
                <div>{props.propsData.address}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Mobile:</strong>
              </Col>
              <Col>
                <div>{props.propsData.mobile}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Email:</strong>
              </Col>
              <Col>
                <div>{props.propsData.email}</div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="my-2">
            <Row>
              <Col>
                <strong>Status:</strong>
              </Col>
              <Col>
                <div>Active</div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card>
              <CardHeader>
                <h6 className="text-muted">Account Details</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Bank Name</Label>
                    <Input readOnly value={dummyData.bank}></Input>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Label>UPI ID</Label>
                    <Input readOnly value={dummyData.upi}></Input>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Rentpay ID</Label>
                    <Input readOnly value={dummyData.rentpeId}></Input>
                  </Col>
                </Row>
              </CardBody>
              <CardHeader>
                <h6 className="text-muted">Business Details</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Organization Type</Label>
                    <Input readOnly value={dummyData.orgType}></Input>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Label>Organization Name</Label>
                    <Input readOnly value={dummyData.orgName}></Input>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Business PAN</Label>
                    <Input readOnly value={dummyData.busPan}></Input>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  console.log("mapping...", state)
  return {
    propsData: state.tenantReducer.tenantDetailsData,
    error: state.tenantReducer.error,
    propertyList: state.propertyReducer.propertyData,
    unitList: state.unitsReducer.unitsData,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    apiErrorTenants,
    fetchPropertyList,
    fetchUnitList,
    fetchUnitDetails,
    createRentalTenant,
    fetchTenantDetails,
    clearError,
  })(TenantDetails)
)
