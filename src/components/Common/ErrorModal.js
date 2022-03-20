import React from 'react'
import { Button, Modal,  ModalBody,Col,Row } from 'reactstrap';
const ErrorModal = (props) => {
  console.log("error modal props", props);
  const message = props.error.error.message ? props.error.error.message : props.error.error
  return (
    <div className="modal" id="modal">
        <div>       
        <Modal isOpen={props.error.loading}  >
          <ModalBody>
            <Row className='justify-content-center align-items-center'>
              <Col md={1}>
              <i className="mdi mdi-alert mdi-24px text-danger" /> 
              </Col>
              <Col md={10}>
              <h6 className='text-danger pt-2'> {message}</h6>
              </Col>
              <Col className='float-end'><Button size='sm' color='danger' className='px-1 py-0' onClick={props.toggle} >x</Button></Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}
export default ErrorModal