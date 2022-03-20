import React, { useState, useEffect } from "react"

import { Row, Col, Label, Input, Button, Modal, ModalBody } from "reactstrap"

import ErrorModal from "components/Common/ErrorModal"

import {
  collectRent,
  collectRentAction,
  fetchRentedUnits,
  unitApiError,
  clearUnitError,
  fetchPropertyTransactionsCardData,
  fetchPropertyTransactions,
} from "store/actions"

import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"

const TenantRentCollect = props => {
  const dispatch = useDispatch()

  console.log("Modal rendering")

  let errors = useSelector((state)=>state.unitsReducer.error)

  const status = false

  const loading = errors.loading

  const toggle = async () => {
    await dispatch(clearUnitError(status))
  }


  let tenantID = props.tenant

  useEffect(() => {
    if (props.toggle) {
      console.log("this is the tenant id: ",props.tenant)
      dispatch(fetchRentedUnits(tenantID))
    }
  }, [props.tenant])

  const [unit, setUnit] = useState(null)
  const [amount, setAmount] = useState(null)

  useEffect(() => {
    setAmount(null)
    setUnit(null)
  }, [props.toggle])


  const submitRental = e => {
    e.preventDefault()
    console.log(rentalData)

    var rentalData = {
      unit: unit,
      tenant: props.tenant,
      amount: amount,
    }
    let error = false
    if (rentalData.tenant == null || rentalData.amount == null) {
      error = true
    }
    if(error) {
      dispatch(unitApiError(error))
    }
    console.log(rentalData)
    if (!error) {
      dispatch(collectRentAction(rentalData))
      props.setToggle(false)
    }
  }

  return (
    <div className="modal" id="modal">
      {loading == true && (
        <ErrorModal error={errors} toggle={toggle}></ErrorModal>
      )}
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

          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Unit</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                defaultValue={unit}
                onChange={e => setUnit(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.unitsList &&
                  props.unitsList.map(item => (
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
export default React.memo(TenantRentCollect)
