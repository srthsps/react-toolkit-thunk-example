import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"
import ErrorModal from "components/Common/ErrorModal"
import { resetPasswordApiError, resetUserPassword } from "store/actions";
import { clearResetPasswordError } from "store/actions";
const ResetPassword = props => {
const [password, setPassword] = useState('');
const [confirmedPassword, setCorfirmedPass] = useState();
const error =useSelector(state=>state.resetPasswordReducer.error)
const dispatch =useDispatch()
const handleClick =(e)=>{
    e.preventDefault();
    var data = {
        password
  }
  console.log('data', data);
  if (password == confirmedPassword) {
    dispatch(resetUserPassword(data));
    props.toggle(false)
  } else {
    dispatch(resetPasswordApiError('Password does not match !'))
  }

    
}
const toggle = async () => {
  await dispatch(clearResetPasswordError(false))
}
  console.log("id", props)
  return (
    <div className="modal-dialog-centered" id="modal">
      {error.loading == true && (
        <ErrorModal error={error} toggle={toggle}></ErrorModal>
      )}
      <Modal size="md"  isOpen={props.isOpen}>
        <ModalBody>
          <Row >
            <Col xl={10}>
              <h3>Reset Password</h3>
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
          <Row className="ps-5 ms-1">
            <Col md={10 } className="mt-5 d-flex justify-content-center align-items-center">            
              <Input
                className="form-control-lg mb-4"
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
              ></Input>
            </Col>
          </Row>
          <Row className="ps-5 ms-1">
            <Col md={10} className="mt-3 d-flex justify-content-center align-items-center">
              <Input
                className="form-control-lg mb-4"
                type="password"
                onChange={e => setCorfirmedPass(e.target.value)}
                placeholder="Confrim Password"
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
                onClick={(e) =>handleClick(e)}
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
export default React.memo(ResetPassword)
