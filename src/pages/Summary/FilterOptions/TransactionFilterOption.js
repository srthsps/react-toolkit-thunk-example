import React from "react"

import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  InputGroup
} from "reactstrap"

import Flatpickr from "react-flatpickr"

const TransactionFilterOption = () => {
  return (
    <Container className="mb-4" fluid>
      <Row>
        <Col xs={12} md={3} className="my-2">
          <Label htmlFor="user-name">Rentpay ID</Label>
          <Input id="user-name" />
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" />
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" />
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label htmlFor="category">Status</Label>
          <select className="form-control" id="category"
            value="" onChange={() => { }}>
            <option value="">All</option>
            <option>Rent</option>
            <option>Salary</option>
            <option>Sale</option>
          </select>
        </Col>
        <Col xs={12} md={6} className="my-2">
          <Label htmlFor="time-period">Select time period</Label>
          <InputGroup>
          <Input id="notes" type="date" />
            {/* <Flatpickr
              className="form-control d-block"
              placeholder="Choose date range"
              options={{
                mode: "range",
                dateFormat: "Y-m-d",
              }}
            /> */}
          </InputGroup>
        </Col>
        <Col className="my-2">
          <Label>Apply filters</Label>
          <Button color="primary w-100" outline>Search</Button>
        </Col>
        <Col className="my-2">
          <Label>Clear filters</Label>
          <Button color="secondary w-100">Clear</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default TransactionFilterOption
