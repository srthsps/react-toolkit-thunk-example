import React from "react"

import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap"

const UnitFilterOptions = () => {
  return (
    <Container className="mt-2 px-3" fluid>
      <Row>
        <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select State</option>
              <option>State 1</option>
              <option>State 2</option>
            </select>
          </div>
        </Col>
        <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select District</option>
              <option>District 1</option>
              <option>District 2</option>
            </select>
          </div>
        </Col>
        <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select City</option>
              <option>City 1</option>
              <option>City 2</option>
            </select>
          </div>
        </Col>
        <Col className="col-md-3 col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select Locality</option>
              <option>Locality 1</option>
              <option>Locality 2</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row className="mb-4 mt-4">
      <Col className="col-md col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select Category</option>
              <option>Category 1</option>
              <option>Category 2</option>
            </select>
          </div>
        </Col>
        <Col className="col-md col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select Vacant/Occupied</option>
              <option>Vacant</option>
              <option>Occupied</option>
            </select>
          </div>
        </Col>
        <Col className="col-md col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select Time Period</option>
              <option>Daily</option>
              <option>Monthly</option>
            </select>
          </div>
        </Col>
        <Col className="col-md col-12 mb-md-0 mb-3">
          <div className="col-md">
            <select className="form-control">
              <option selected disabled>Select Payment Status</option>
              <option>Success</option>
              <option>Failure</option>
            </select>
          </div>
        </Col>
        <Col className="col-md col-12">
          <Button color="primary w-100" outline>Search</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default UnitFilterOptions
