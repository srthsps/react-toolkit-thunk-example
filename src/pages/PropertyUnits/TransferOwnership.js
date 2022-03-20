import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  ButtonGroup,
  Button,
} from "reactstrap"

// i18n
import { withTranslation } from "react-i18next"

import OtpInput from "react-otp-input"

const TransferOwnership = props => {
  let [otp, setOtp] = useState(null)

  let currentUnit = {
    tenant: "Arun",
    name: "Room 221",
    owner: "Larry",
  }
  let transferTypes = ["Full Ownership", "Part Ownership"]

  let handleInputChange = e => {
    console.log(otp)
  }

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col>
          <Card>
            <CardHeader>
              <h6 className="text-muted">Transfer Unit Ownership</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Unit name</Label>
                  <Input
                    disabled
                    value={currentUnit.name}
                    className="mb-4"
                    type="text"
                  ></Input>
                </Col>
                <Col md={6}>
                  <Label>Current Owner</Label>
                  <Input
                    disabled
                    value={currentUnit.owner}
                    className="mb-4"
                    type="text"
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Target Rentpe ID</Label>
                  <Input className="mb-4" type="number"></Input>
                </Col>
                <Col md={6}>
                  <Label>Transfer Type</Label>
                  <select className="form-control mb-4">
                    {transferTypes.map((item,idx) => (
                      <option key={idx}>{item}</option>
                    ))}
                  </select>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="p-4 d-flex justify-content-center">
                  <form onSubmit={() => handleInputChange}>
                    <h5 className="text-center">Enter verification code</h5>
                    <OtpInput
                      inputStyle={{ width: '30px' }}
                      className="p-2"
                      numInputs={5}
                      separator={<span></span>}
                      shouldAutoFocus
                      value={otp}
                    />
                    <ButtonGroup className="w-100 mt-2">
                      <Button className="m-2 w-50">Clear</Button>
                      <Button className="m-2 w-50">Get OTP</Button>
                    </ButtonGroup>
                  </form>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center" md={12}>
                  <ButtonGroup className="w-100">
                    <Button className="p-2 m-2 btn-outline-danger">
                      Cancel
                    </Button>
                    <Button className="P-2 m-2 btn-outline-primary">
                      Apply
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <CardHeader>
              <h6 className="text-muted">Change Tenant</h6>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>Active Tenant</Label>
                  <Input
                    disabled
                    value={currentUnit.tenant}
                    className="mb-4"
                    type="text"
                  ></Input>
                </Col>
                <Col md={6}>
                  <Label>Target Name</Label>
                  <Input
                    className="mb-4"
                    type="number"
                  ></Input>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                   <Label>Target Rentpe ID</Label>
                  <Input className="mb-4" type="number"></Input>
                </Col>
                <Col md={6}>
                   <Label>Tenure</Label>
                  <Input className="mb-4" type="number"></Input>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center" md={12}>
                  <ButtonGroup className="w-100">
                    <Button className="p-2 m-2 btn-outline-danger">
                      Cancel
                    </Button>
                    <Button className="P-2 m-2 btn-outline-primary">
                      Apply
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation()(TransferOwnership)
