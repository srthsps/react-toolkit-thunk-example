import React from "react"
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap"

const AssignStaff = props => {
    let userTypeList = ["manager", "accountant"]
  console.log("Modal rendering")
  return (
    <div className="modal" id="modal">
      <Modal size="md" centered isOpen={props.toggle}>
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Assign Staff</h3>
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
          <h5>Unit Details</h5>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Select User</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={props.user}
                onChange={e => props.setUser(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.userList &&
                  props.userList.rows.map(item => (
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
              <Label>Select User Type</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={props.user_type}
                onChange={e => props.setUserType(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {userTypeList &&
                  userTypeList.map((item,idx) => (
                    <option key={idx} value={item}>
                      {" "}
                      {item}
                    </option>
                  ))}
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
                onClick={e => props.assignStaffFn(e)}
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
export default React.memo(AssignStaff)
