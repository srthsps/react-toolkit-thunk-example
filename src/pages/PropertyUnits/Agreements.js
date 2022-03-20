import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
} from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"

const Agreement = props => {

let dummyData = {
        tenant: "Arun",
        tenure: "6 Months",
        paymentStatus: "Partially Paid",
        deposit: "25000",
        date: "2021-09-25",
        landlord: "Jake"
    }

  return (
    <Container fluid>           
          <Card className="mt-5">
            <CardHeader>
              <h6 className="text-muted">Agreement Details</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label htmlFor="user-aadhar">Active Tenant</Label>
                  <Input disabled className="user-aadhar mb-4" value={dummyData.tenant} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label htmlFor="pan-number">Tenure</Label>
                  <Input disabled className="pan-number mb-4" value={dummyData.tenure} type="text"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label htmlFor="user-aadhar">Payment Status</Label>
                  <Input disabled className="user-aadhar mb-4" value={dummyData.paymentStatus} type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label htmlFor="pan-number">Deposit</Label>
                  <Input disabled className="pan-number mb-4" value={dummyData.deposit} type="number"></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label htmlFor="user-aadhar">Initial Date</Label>
                  <Input disabled value={dummyData.date} className="user-aadhar mb-4" type="text"></Input>
                </Col>
                <Col md={6}>
                  <Label htmlFor="user-aadhar">Landlord</Label>
                  <Input disabled value={dummyData.landlord} className="user-aadhar mb-4" type="text"></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
    </Container>
  )
}

export default withTranslation()(Agreement)
