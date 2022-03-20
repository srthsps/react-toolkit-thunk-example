import React, { useState, useEffect } from "react"

import { Row, Col, Label, Input, Button, Modal, ModalBody } from "reactstrap"

import {
  collectRent,
  collectRentAction,
  fetchUnitTenant,
  fetchPropertyTransactionsCardData,
  fetchPropertyTransactions,
  fetchUnitDetails
} from "store/actions"

import { useDispatch } from "react-redux"

const RentCollect = props => {
  const dispatch = useDispatch()

  console.log("Modal rendering")

  const [unit, setUnit] = useState(null)

  const [tenant, setTenant] = useState(null)
  const [amount, setAmount] = useState(null)

  var propertyID = props.property
  var unitID = props.unit

  useEffect(() => {
    if (props.toggle) {
      dispatch(fetchUnitTenant(props.unit))
    }
  }, [props.unit])

  useEffect(() => {
    setAmount(null)
  }, [props.toggle])

  useEffect(()=> {
    if(props.toggle){
      dispatch(fetchUnitDetails(unitID,propertyID))
    }
  },[props.unit])

  const submitRental = e => {
    e.preventDefault()
    console.log(rentalData)

    var rentalData = {
      unit: props.unit,
      tenant: props.tenant.id,
      amount: amount,
    }
    let error = false

    if (rentalData.tenant == null || rentalData.amount == null) {
      error = true
    }
    if (!error) {
      dispatch(collectRentAction(rentalData))
      dispatch(fetchPropertyTransactionsCardData(propertyID))
      dispatch(fetchPropertyTransactions(propertyID))
      props.setToggle(false)
    }
  }

  return (
    <div className="modal" id="modal">
      <Modal size="md" centered isOpen={props.toggle}>
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Collect Rent</h3>
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

          {/* <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label className="col-6">Due Amount:</Label>
              <Col className="col-6">₹25000</Col>
              <Input
                className="form-control-lg mb-4"
                type="text"
                value={props.unitDetails && props.unitDetails.rent_amount}
                disabled
              ></Input>
            </Col>
          </Row> */}
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Amount</Label>
              <Input
                placeholder="₹"
                className="form-control-lg mb-4"
                type="number"
                defaultValue={amount}
                onChange={e => setAmount(e.target.value)}
              ></Input>
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
                onClick={e => submitRental(e)}
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
export default React.memo(RentCollect)
