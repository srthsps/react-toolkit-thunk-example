import React from "react"
import { useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input
} from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"

const LandlordDetails = props => {

  let landlordDetails = useSelector((state) => state.landlordReducer.landlordDetailsData)

  let dummyData = {
    bank: "HDFC Bank",
    upi: "hisoka@hdfc",
    rentpeID: 2008,
    orgType: "Individual",
    orgName: "Amazon",
    busPan: "JVOPS04175F",
  }

  return (
    <Container fluid>
      <div className="page-title-box">
        <Row className="align-items-center">
          {landlordDetails.map((item, index) => {
            return (
              <Col md={6} key={index} className="my-2">
                <Row>
                  <Col>
                    <strong>{item.label}:</strong>
                  </Col>
                  <Col>
                    <div>{item.data}</div>
                  </Col>
                </Row>
              </Col>
            )
          })}
        </Row>

        <Row className="mt-5">
          <Col>
            <Card>
              <CardHeader>
                <h6 className="mt-1">Account Details</h6>
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
                    <Input readOnly value={dummyData.rentpeID}></Input>
                  </Col>
                </Row>
              </CardBody>
              <CardHeader>
                <h6 className="mt-1">Business Details</h6>
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

export default withTranslation()(LandlordDetails)
