import React,{useState,useEffect} from "react"
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap"

const RentalRenew = props => {

  useEffect(()=>{
    props.setStart("")
    props.setEnd("")
  },[props.isOpen])

  return (
    <div className="modal" id="modal">
      <Modal size="lg" centered isOpen={props.isOpen}>
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Renew Agreement</h3>
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
          <h5>Agreement</h5>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Start Date</Label>
              <Input
                onChange={e => props.setStart(e.target.value)}
                className="form-control-lg mb-4"
                type="date"
                value={props.startDate}
              ></Input>
            </Col>
            <Col className="mt-3 d-flex flex-column">
              <Label>End Date</Label>
              <Input
                onChange={e => props.setEnd(e.target.value)}
                className="form-control-lg mb-4"
                type="date"
                value={props.endDate}
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
                onClick={e => props.rentalRenew(e)}
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
export default React.memo(RentalRenew)
