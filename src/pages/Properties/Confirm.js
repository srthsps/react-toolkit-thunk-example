import React, { useState, useEffect } from "react"
import { Row, Col, Label, Input, Button, Modal, ModalBody } from "reactstrap"

const Confirm = props => {
  return (
    <div className="modal" id="modal">
      <Modal size="md" centered isOpen={props.confimrToggle}>
        <ModalBody className="px-5">
          <hr />
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Unit</Label>
              <Button className="btn btn-lg btn-danger" onClick={props.setConfirmToggle(false)} >Cancel</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}
export default Confirm
