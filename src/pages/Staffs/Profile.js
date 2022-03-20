import React, {useEffect} from "react"
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

import avatar4 from "../../assets/images/users/user-1.jpg"

import { fetchUserDetails } from "store/actions"

import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

import { useParams } from "react-router-dom"

const StaffProfile = props => {

  const { staffID } = useParams();

  console.log(staffID)

  useEffect(() => {
    let dummy = async () => {
      console.log(staffID)
      await props.fetchUserDetails(staffID)
    }
    dummy()
  }, [])

  let dummyData = {
    username: "Akhil Raj",
    rentpeId: 2007,
    mobile: "9121980007",
    email: "akhilraj02@gmail.com",
    address: "Valiyathara House, Ezhikkara, Edathuruth PO, Kerala",
    aadhar: 74002541023,
    pan: "JVOPS49965F",
    gst: "2110",
    tds: "2500",
    bank: "ICICI Bank",
    branch: "Ezhikkara",
    ifsc: "ICICI012345",
    accNumber: 1024510021245,
    upi: "akhilraj@icici"
  }

  return (
    <Container fluid>
      <div className="mt-4">
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col>
                <h2 className="page-title fs-3">{props.userDetails.name}</h2>
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
                  <Label>Username</Label>
                  <Input className="mb-4" readOnly value={props.userDetails.name} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>Rentpe ID</Label>
                  <Input className="mb-4" readOnly value={dummyData.rentpeId} type="number"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Mobile Number</Label>
                  <Input className="mb-4" readOnly value={dummyData.mobile} type="tel"></Input>
                </Col>
                <Col md={6}>
                  <Label>Email</Label>
                  <Input className="mb-4" readOnly value={dummyData.email} type="email"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Label>Address</Label>
                  <textarea className="mb-4 form-control" readOnly value={dummyData.address}></textarea>
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
                  <Label>Aadhar</Label>
                  <Input className="mb-4" value={dummyData.aadhar} readOnly type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>PAN</Label>
                  <Input className="mb-4" value={dummyData.pan} readOnly type="text"></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
          <CardHeader>
              <h6 className="mt-1">TAX Details</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>GST</Label>
                  <Input className="mb-4" value={dummyData.gst} readOnly type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>TDS</Label>
                  <Input className="mb-4" value={dummyData.tds} readOnly type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>PAN</Label>
                  <Input className="mb-4" value={dummyData.pan} readOnly type="text"></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
          <CardHeader>
                <h6 className="text-muted">Bank Account Details</h6>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Bank Name</Label>
                    <Input disabled value={dummyData.bank} readOnly></Input>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Label>UPI ID</Label>
                    <Input disabled value={dummyData.upi} readOnly></Input>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Branch Name</Label>
                    <Input disabled value={dummyData.branch} readOnly></Input>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Label>IFSC</Label>
                    <Input disabled value={dummyData.ifsc} readOnly></Input>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-4">
                    <Label>Account Number</Label>
                    <Input disabled value={dummyData.accNumber} readOnly></Input>
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
  console.log("mapping", state)
  return {
    userDetails: state.userReducer.userDetails,
  }
}


export default withRouter(connect(mapStateToProps,{fetchUserDetails})(StaffProfile))
