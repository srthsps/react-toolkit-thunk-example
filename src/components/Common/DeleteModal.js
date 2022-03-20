import React from 'react'
import { Button, Modal,  ModalBody,Col,Row } from 'reactstrap';
const DeleteModal = (props) => {
  console.log(props)
  const deleteItem = (e) => {
    e.preventDefault();
    props.deleteFunction(props.dataID);
    props.forClose();
  }
  return (
    <div className="modal" id="modal">
        <div>
        
        <Modal centered isOpen={props.toggle}>
          <ModalBody>
            <Row className='justify-content-center align-items-center '>
              <Col md={1}>
              <i className="mdi mdi-alert mdi-24px text-danger" /> 
              </Col>
              <Col md={10}>
              <h6 className='text-danger pt-2'>Are you sure you want do delete?</h6>
              </Col>
              <Col className='float-end'><Button size='sm' color='danger' className='px-1 py-0' onClick={props.forClose} >x</Button></Col>
            </Row>  
            <Row>
              <Col className="mt-3 d-flex align-items-center justify-content-center">
                <Button onClick={props.forClose} className="btn btn-lg btn-success">Cancel</Button>
                <Button onClick={deleteItem} className=" btn btn-lg btn-danger ms-2">Delete</Button>
              </Col>
            </Row>      
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}
export default DeleteModal