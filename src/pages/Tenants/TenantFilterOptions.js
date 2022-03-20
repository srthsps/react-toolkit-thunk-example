import React from "react"

import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap"

// import { CollectionPeriods, PaymentStatus } from "common/data/rentpe";

const TenantFilterOptions = () => {
  return (
    <Container className="mb-4" fluid>
      {/* <Row>
        <Col xs={12} md={3} className="my-2">
          <Label>Rentpay ID</Label>
          <Input />
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label>Email</Label>
          <Input />
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label>Select district</Label>
          <select className="form-control"
            value="" onChange={() => { }}>
            <option value="">All</option>
            <option>District 1</option>
            <option>District 2</option>
          </select>
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label>Select a category</Label>
          <select className="form-control"
            value="" onChange={() => { }}>
            <option value="">All</option>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label>Payment Status</Label>
          <select className="form-control"
            value="" onChange={() => { }}>
            <option value="">All</option>
            {Object.entries(PaymentStatus).map(([status, paymentStatusName], index) =>
              <option value={status} key={index}>{paymentStatusName}</option>
            )}
          </select>
        </Col>
        <Col xs={12} md={3} className="my-2">
          <Label>Collection Period</Label>
          <select className="form-control">
            <option value="">All</option>
            {Object.entries(CollectionPeriods).map(([period, periodName], index) =>
              <option value={period} key={index}>{periodName}</option>
            )}
          </select>
        </Col>
        <Col className="my-2">
          <Label>Apply filters</Label>
          <Button color="primary w-100" outline>Search</Button>
        </Col>
        <Col className="my-2">
          <Label>Clear filters</Label>
          <Button color="secondary w-100">Clear</Button>
        </Col>
      </Row> */}
    </Container>
  )
}

export default TenantFilterOptions
