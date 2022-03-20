import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"

import {
  Container,
  Row,
  Col,
  CardImg,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
} from "reactstrap"


import { fetchTenantProfile, apiErrorTenants, clearError } from "store/actions"
import { connect } from "react-redux"
import avatar4 from "../../assets/images/users/user-2.jpg"

const TenantProfile = props => {

  const loading = props.error.loading
  const status = false
  const toggle = () => {
    props.clearError(status)
  }

  let { tenantID } = useParams()

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantProfile(tenantID)
    }
    dummy()
  }, [])

  let dummyData = {
    username: "Nico Robin",
    rentpeId: 2007,
    mobile: "9121980007",
    email: "nico@robin.com",
    address: "Strawhat Pirates, Grandline",
    aadhar: 74002541023,
    pan: "JVOPS49965F",
    tenure: "3 Years",
    property: "Skyline",
    unit: "Room 332",
    deposit: 65000,
    rent: 3500,
    landlord: "Jake"
  }

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="mt-4">
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col>
                <h2 className="page-title fs-3">{props.propsData.name}</h2>
              </Col>
              <Col>
                <CardImg
                  src={avatar4}
                  alt="Profile avatar"
                  className="rounded-circle avatar-md float-end"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h6 className="text-muted">User Information</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Name</Label>
                  <Input className="mb-4" readOnly value={props.propsData.name} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>Rentpe ID</Label>
                  <Input className="mb-4" readOnly value={dummyData.rentpeId} type="number"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Mobile Number</Label>
                  <Input className="mb-4" readOnly value={props.propsData.mobile} type="tel"></Input>
                </Col>
                <Col md={6}>
                  <Label>Email</Label>
                  <Input className="mb-4" readOnly value={props.propsData.email} type="email"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Label>Address</Label>
                  <textarea className="mb-4 form-control" readOnly value={props.propsData.address}></textarea>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h6 className="text-muted">ID Proofs</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>ID Proof</Label>
                  <Input className="mb-4" readOnly value=
                  {props.propsData && props.propsData.id_proof && props.propsData.id_proof.id_type}
                   type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>ID Number</Label>
                  <Input className="mb-4" readOnly value=
                  {props.propsData && props.propsData.id_proof && props.propsData.id_proof.id_number}
                   type="text"></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h6 className="text-muted">Agreement Details</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Tenure</Label>
                  <Input className="mb-4" readOnly value={dummyData.tenure} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>Rented Property</Label>
                  <Input className="mb-4" readOnly value={dummyData.property} type="text"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Rented Unit</Label>
                  <Input className="mb-4" readOnly value={dummyData.unit} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>Deposit</Label>
                  <Input className="mb-4" readOnly value={dummyData.deposit} type="number"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Rent</Label>
                  <Input className="mb-4" readOnly value={dummyData.rent} type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>Landlord</Label>
                  <Input className="mb-4" readOnly value={dummyData.landlord} type="text"></Input>
                </Col>
              </Row>
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
    propsData: state.tenantReducer.tenantProfileData,
    error: state.tenantReducer.error,
  }
}


export default withRouter(connect(mapStateToProps,{fetchTenantProfile,apiErrorTenants,clearError})(TenantProfile))
