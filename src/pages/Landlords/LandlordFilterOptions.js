import React from "react"

import {
  Container,
  Row,
  Col,
  Label,
  Input,
  InputGroup,
  Button,
} from "reactstrap"

const LandlordFilterOptions = () => {
  return (
    <Container className="mt-5 px-3" fluid>
       <Row>
        <Col className="col-md-4 col-12">
          <Row className="mb-md-4 mb-3 px-2">
            <Label htmlFor="user-name">Rentpay ID</Label>
            <div className="col-2">
              <i className="fas fa-search pt-2"></i>
            </div>
            <div className="col-10 col-md-8 px-0">
              <Input
                className="user-name br-0"
                type="text"
              ></Input>
            </div>
          </Row>
        </Col>
        <Col className="col-md-4 col-12">
          <Row className="mb-md-4 mb-3 px-2">
            <Label htmlFor="user-name">Email</Label>
            <div className="col-2">
              <i className="fas fa-search pt-2"></i>
            </div>
            <div className="col-10 col-md-8 px-0">
              <Input
                className="user-name br-0"
                type="text"
              ></Input>
            </div>
          </Row>
        </Col>
        <Col className="col-md-4 col-12">
          <Row className="mb-md-4 mb-3 px-2">
            <Label htmlFor="user-name">Property Name</Label>
            <div className="col-2">
              <i className="fas fa-search pt-2"></i>
            </div>
            <div className="col-10 col-md-8 px-0">
              <Input
                className="user-name br-0"
                type="text"
              ></Input>
            </div>
          </Row>
        </Col>
      </Row>
      <Row className="mb-4">
      <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select a category</option>
              <option>Success</option>
              <option>Failure</option>
            </select>
          </div>
        </Col>
        <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select a district</option>
              <option>Success</option>
              <option>Failure</option>
            </select>
          </div>
        </Col>
        <Col className="col-md-3 col-12">
          <Button color="primary w-100" outline>Search</Button>
        </Col>
        <Col className="col-md-3 col-12">
          <Button color="secondary w-100">Clear</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default LandlordFilterOptions
