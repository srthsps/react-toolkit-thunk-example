import React, { useState, useEffect } from "react"
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
} from "reactstrap"

import { useParams, useHistory } from "react-router-dom"

import {
  setTenant,
  fetchTenantDetails,
  clearError,
  apiErrorTenants,
  clearTenantDetails,
} from "store/actions"

import { withRouter } from "react-router-dom"

import { connect, useDispatch } from "react-redux"

import ErrorModal from "components/Common/ErrorModal"

import { AvForm, AvField } from "availity-reactstrap-validation"

const AddTenant = props => {
  const loading = props.error.loading

  const toggle = async () => {
    await props.clearError(false)
  }

  let history = useHistory()

  const { tenantID } = useParams()

  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState(null)
  const [id_number, setIdNumber] = useState(null)
  const [id_type, setIdType] = useState("")
  const [email, setEmail] = useState("")
  const [business_name, setBusName] = useState("")
  const [organization_type, setOrgType] = useState("")
  const [business_pan, setBusPan] = useState("")
  const [bank_name, setBankName] = useState("")
  const [upi_id, setUpiID] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    console.log("the very first")
    if (tenantID != undefined) {
      let dummy = async () => {
        await props.fetchTenantDetails(tenantID)
      }
      dummy()
    } else {
      props.clearTenantDetails()
      console.log("after everything ", props.propsData)
    }
  }, [tenantID])

  const handleClick = async e => {
    e.preventDefault()
    var tenant = {
      name: tenantID != undefined && name == "" ? props.propsData.name : name,
      id_details: {
        id_number:
          tenantID != undefined && id_number == null
            ? props.propsData?.id_proof?.id_number
            : id_number,
        id_type:
          tenantID != undefined && id_type == ""
            ? props.propsData?.id_proof?.id_type
            : id_type,
      },
      mobile:
        tenantID != undefined && mobile == null
          ? props.propsData.mobile
          : mobile,
      email:
        tenantID != undefined && email == "" ? props.propsData.email : email,
      business_name:
        tenantID != undefined && business_name == ""
          ? props.propsData.business_name
          : business_name,
      organization_type:
        tenantID != undefined && organization_type == ""
          ? props.propsData.organization_type
          : organization_type,
      business_pan:
        tenantID != undefined && business_pan == ""
          ? props.propsData.business_pan
          : business_pan,
      bank_name:
        tenantID != undefined && bank_name == ""
          ? props.propsData.bank_name
          : bank_name,
      upi_id:
        tenantID != undefined && upi_id == "" ? props.propsData.upi_id : upi_id,
      address:
        tenantID != undefined && address == ""
          ? props.propsData.address
          : address,
    }

    let error = false
    if (!tenant.name?.length > 0) {
      dispatch(apiErrorTenants("Name is required"))
      error = true
    } else if (tenant?.mobile === null) {
      dispatch(apiErrorTenants("Mobile Number is required"))
      error = true
    } else if (!tenant?.email.length > 0) {
      dispatch(apiErrorTenants("Email ID is required"))
      error = true
    }
    if (tenantID != undefined) {
      delete tenant.id_details
    }
    console.log("tenant", tenant)
    if (!error) {
      dispatch(setTenant(tenant, history, tenantID))
    }
  }

  return (
    <div className="page-content">
      <Container fluid>
        {loading == true && (
          <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
        )}
        <div className="mt-5 pt-3">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h4 className="mt-2">
                    {tenantID != undefined ? "Edit " : "Add "} Tenant
                  </h4>
                </CardHeader>
                <CardBody className="pt-5 ">
                  <AvForm className="needs-validation">
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Name</Label>
                        <AvField
                          name="name"
                          type="text"
                          errorMessage="Enter name"
                          // defaultValue={props.propsData.name}
                          value={
                            props.propsData.name ? props.propsData.name : ""
                          }
                          onChange={e => setName(e.target.value)}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                      <Col md={5}>
                        <Label> Mobile</Label>
                        <AvField
                          name="mobile"
                          type="number"
                          value={
                            props.propsData.mobile ? props.propsData.mobile : ""
                          }
                          className="form-control-lg mb-4"
                          errorMessage="Enter Mobile Number"
                          onChange={e => setMobile(e.target.value)}
                          validate={{
                            required: { value: true },
                            pattern: {
                              value: "^[0-9]+$",
                              errorMessage: "Only Digits",
                            },
                          }}
                        />
                      </Col>
                    </Row>
                    {tenantID == undefined && (
                      <Row className="justify-content-center">
                        <Col md={5}>
                          <Label>ID Type</Label>
                          <Input
                            name="id_type"
                            className="form-control-lg mb-4"
                            type="select"
                            value={
                              props.propsData?.id_proof?.id_type
                                ? props.propsData?.id_proof?.id_type
                                : ""
                            }
                            onChange={e => setIdType(e.target.value)}
                          >
                            <option selected value="" disabled>
                              Choose
                            </option>
                            <option value="aadhaar">Aadhar</option>
                            <option value="pan_card">Pan Card</option>
                            <option value="passport">Passport</option>
                            <option value="voter_id">Voter ID</option>
                          </Input>
                        </Col>
                        <Col md={5}>
                          <Label>ID Number</Label>
                          <AvField
                            name="id_number"
                            type="number"
                            className="form-control-lg mb-4"
                            errorMessage="Enter ID Number"
                            value={
                              props.propsData?.id_proof?.id_number
                                ? props.propsData?.id_proof?.id_number
                                : ""
                            }
                            onChange={e => setIdNumber(e.target.value)}
                            validate={{
                              required: { value: true },
                              pattern: {
                                value: "^[0-9]+$",
                                errorMessage: "Only Digits",
                              },
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Email</Label>
                        <AvField
                          name="email"
                          type="email"
                          className="form-control-lg mb-4"
                          value={
                            props.propsData.email ? props.propsData.email : ""
                          }
                          onChange={e => setEmail(e.target.value)}
                          errorMessage="Invalid Email"
                          validate={{
                            required: { value: true },
                            email: { value: true },
                          }}
                        />
                      </Col>
                      <Col md={5}>
                        <Label>Business Name</Label>
                        <AvField
                          name="business_name"
                          type="text"
                          errorMessage="Enter Business Name"
                          value={
                            props.propsData.business_name
                              ? props.propsData.business_name
                              : ""
                          }
                          onChange={e => setBusName(e.target.value)}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Organization Type</Label>
                        <Input
                          name="organization_type"
                          className="form-control-lg mb-4"
                          type="select"
                          value={
                            props.propsData.organization_type
                              ? props.propsData.organization_type
                              : ""
                          }
                          onChange={e => setOrgType(e.target.value)}
                        >
                          <option selected value="" disabled>
                            Choose
                          </option>
                          <option value="partner">Partner</option>
                          <option value="individual">Individual</option>
                        </Input>
                      </Col>
                      <Col md={5}>
                        <Label>Business Pan</Label>
                        <AvField
                          name="business_pan"
                          type="text"
                          errorMessage="Enter Business Name"
                          value={
                            props.propsData.business_pan
                              ? props.propsData.business_pan
                              : ""
                          }
                          onChange={e => setBusPan(e.target.value)}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Bank Name</Label>
                        <AvField
                          name="bank name"
                          type="text"
                          errorMessage="Enter bank name"
                          value={
                            props.propsData.bank_name
                              ? props.propsData.bank_name
                              : ""
                          }
                          onChange={e => setBankName(e.target.value)}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                      <Col md={5}>
                        <Label>UPI ID</Label>
                        <AvField
                          name="upi id"
                          type="number"
                          value={
                            props.propsData.mobile ? props.propsData.mobile : ""
                          }
                          className="form-control-lg mb-4"
                          errorMessage="Enter Mobile Number"
                          onChange={e => setUpiID(e.target.value)}
                          validate={{
                            required: { value: true },
                            pattern: {
                              value: "^[0-9]+$",
                              errorMessage: "Only Digits",
                            },
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md={10}>
                        <Label>Address</Label>
                        <AvField
                          name="upi id"
                          type="textarea"
                          rows="5"
                          value={
                            props.propsData.address
                              ? props.propsData.address
                              : ""
                          }
                          className="form-control-lg mb-4"
                          onChange={e => setAddress(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <div className="justify-content-center text-center mb-5 mt-5">
                      <Button
                        onClick={() => history.push("/tenants")}
                        type="reset"
                        color="danger"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={e => handleClick(e)}
                        type="submit"
                        color="success"
                        className="ms-2"
                      >
                        Save
                      </Button>
                    </div>
                  </AvForm>
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
    propsData: state.tenantReducer.tenantDetailsData,
    error: state.tenantReducer.error,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    setTenant,
    fetchTenantDetails,
    clearError,
    apiErrorTenants,
    clearTenantDetails,
  })(AddTenant)
)
