import React from "react"
import {
  Container,
  Row,
  Col,
  CardImg,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input
} from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"
import avatar4 from "../../assets/images/users/user-4.jpg"

const LandlordProfile = props => {

  let dummyData = {
    username: "Leonardo Dicaprio",
    rentpeID: 3001,
    mobile: "91892195401",
    email: "leo@departed.com",
    address: "Baker Street, 221B",
    aadhar: 451021541203,
    pan: "JVOPS45512F",
    gst: "2110",
    tds: "2500",
  }

  return (
    <Container fluid>
      <div className="mt-4">
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col>
                <h2 className="page-title fs-3">{dummyData.username}</h2>
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
              <h6 className="mt-1">User Information</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Username</Label>
                  <Input className="mb-4" readOnly value={dummyData.username} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label>Rentpe ID</Label>
                  <Input className="mb-4" readOnly value={dummyData.rentpeID} type="number"></Input>
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
              <h6 className="mt-1">ID Proofs</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Aadhar</Label>
                  <Input className="mb-4" readOnly value={dummyData.aadhar} type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>PAN</Label>
                  <Input className="mb-4" readOnly value={dummyData.pan} type="text"></Input>
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
                  <Input className="mb-4" readOnly value={dummyData.gst} type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>TDS</Label>
                  <Input className="mb-4" readOnly value={dummyData.tds} type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>PAN</Label>
                  <Input className="mb-4" readOnly value={dummyData.pan} type="text"></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation()(LandlordProfile)
