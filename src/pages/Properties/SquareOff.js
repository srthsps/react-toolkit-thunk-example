import React, { useState, useEffect } from "react"
import { Row, Col, Label, Input, Button, Modal, ModalBody } from "reactstrap"

const SquareOff = props => {

  console.log("Modal rendering")
  return (
    <div className="modal" id="modal">
      {/* {loading == true && (
        <ErrorModal error={error} toggle={toggleeee}></ErrorModal>
      )} */}
      <Modal size="md" centered isOpen={props.toggle}>
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Square Off</h3>
            </Col>
            <Col xl={1} className="float-end">
              <Button
                className="btn btn-sm btn-danger"
                onClick={() => props.setToggle(false)}
              >
                x
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalBody className="px-5">
          <hr />
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Amount</Label>
              <Input
                placeholder="Amount"
                className="form-control-lg mb-4"
                type="number"
                value={props.amount}
                onChange={e => props.setAmount(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Payment Mode</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={props.txnMode}
                onChange={e => props.setTxnMode(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                <option value="0">Cash</option>
                <option value="1">UPI</option>
              </Input>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center mt-5">
              <Button
                onClick={() => props.setToggle(false)}
                className="btn btn-md btn-danger"
              >
                Cancel
              </Button>
              <Button
                onClick={e => props.sqofFn(e)}
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
export default React.memo(SquareOff)
