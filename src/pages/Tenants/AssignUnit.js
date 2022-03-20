import React, {useEffect, useState} from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

import {
  fetchUnitDetails,
} from "store/actions"

import { useSelector } from "react-redux"

const AssignUnit = props => {

  let unitDetails =useSelector(state=>state.unitsReducer.unitDetailsData)
  return (
    <div className="modal" id="modal">
      <Modal size="lg" centered isOpen={props.isOpen}>
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Assign Unit</h3>
            </Col>
            <Col xl={1} className="float-end">
              <Button
                className="btn btn-sm btn-danger"
                onClick={() => props.toggle(false)}
              >
                x
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalBody className="px-5">
          <hr />
          <h5>Unit Details</h5>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Select Property</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={props.property}
                onChange={e => props.setProperty(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.propertyList !=null&&
                  props.propertyList.map(item => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
              </Input>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Label>Select Unit</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={props.unit}
                onChange={e => props.setUnit(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.unitList &&
                  props.unitList.rows.map(item => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
              </Input>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Deposit Amount</Label>
              <Input
                disabled
                onChange={e => props.setDepositAmount(e.target.value)}
                className="form-control-lg mb-4"
                value={unitDetails !=null ?unitDetails.deposit_amount:''}
                type="number"
              ></Input>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Label>Rent Amount</Label>
              <Input
                disabled
                onChange={e => props.setRentAmount(e.target.value)}
                className="form-control-lg mb-4"
                value={unitDetails !=null ?unitDetails.rent_amount:''}
                type="number"
              ></Input>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xl={6} className="mt-3 d-flex flex-column">
              <Label>Start Date</Label>
              <Input
                onChange={e => props.setStartDate(e.target.value)}
                className="form-control-lg mb-4"
                type="date"
                value={props.start_date}
              ></Input>
            </Col>
          </Row>
          <hr />
          <h5>Agreement</h5>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Start Date</Label>
              <Input
                onChange={e => props.setAggStartDate(e.target.value)}
                className="form-control-lg mb-4"
                type="date"
                value={props.agg_start_date}
              ></Input>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Label>End Date</Label>
              <Input
                onChange={e => props.setAggEndDate(e.target.value)}
                className="form-control-lg mb-4"
                type="date"
                value={props.agg_end_date}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center mt-5">
              <Button
                onClick={() => props.toggle(false)}
                className="btn btn-md btn-danger"
              >
                Cancel
              </Button>
              <Button
                onClick={e => props.assign(e)}
                className="btn btn-md btn-success ms-3"
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}
export default React.memo(AssignUnit)
