import React, { useState, useEffect } from "react"
import { Row, Col, Label, Input, Button, Modal, ModalBody } from "reactstrap"

import { useDispatch, useSelector } from "react-redux"

import { useHistory } from "react-router-dom"

import ErrorModal from "components/Common/ErrorModal"

// import Confirm from "./Confirm"

import {
  clearErrorProperties,
  apiErrorProperties,
  createPropertyTransaction,
  fetchPropertyTransactions,
  fetchPropertyTransactionsCardData,
} from "store/actions"

const AddIncome = props => {
  console.log("Modal rendering")

  const error = useSelector(state => state.propertyReducer.error)

  const loading = error.loading

  const toggle = async () => {
    await dispatch(clearErrorProperties(false))
  }

  const [unit, setUnit] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [transactionCat, setTransactionCat] = useState(null)
  const [amount, setAmount] = useState(null)

  const [confirmToggle, setConfirmToggle] = useState(false)
  const [cstatus, setcStatus] = useState(false)

  const dispatch = useDispatch()

  const history = useHistory()

  const propertyID = props.property

  useEffect(() => {
    setUnit(null), setTitle(""), setDescription("")
    setTransactionCat(null)
    setAmount(null)
  }, [props.toggle])

  const addIncomeFn = e => {
    e.preventDefault()

    var transData = {
      unit: unit,
      title: title,
      narration: description,
      transaction_type: 0,
      transaction_category: transactionCat,
      amount: amount,
    }

    let error = false

    if (transData.unit == null) {
      error = true
    } else if (transData.title == "") {
      error = true
    } else if (transData.narration == "") {
      error = true
    } else if (transData.transaction_category == null) {
      error = true
    } else if (transData.amount == null) {
      error = true
    }

    // setcStatus(true)

    if (error) {
      dispatch(apiErrorProperties("Please enter complete details"))
    } else {
      dispatch(createPropertyTransaction(transData, propertyID, history))
      dispatch(fetchPropertyTransactionsCardData(propertyID))
      dispatch(fetchPropertyTransactions(propertyID))
      props.setToggle(false)
    }
  }
  // useEffect(() => {
  //   if (cstatus) {
  //     setConfirmToggle(true)
  //   }
  // }, [cstatus])
  return (
    <div className="modal" id="modal">
      <Modal size="md" centered isOpen={props.toggle}>
        {loading == true && (
          <ErrorModal error={error} toggle={toggle}></ErrorModal>
        )}
        {/* <Confirm
          confimrToggle={confirmToggle}
          setConfirmToggle={setConfirmToggle}
        /> */}
        <ModalBody>
          <Row className="justify-content-center align-items-center ">
            <Col xl={10}>
              <h3>Add Income</h3>
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
                value={unit}
                onChange={e => setUnit(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.units &&
                  props.units.map(item => (
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
              <Label>Title</Label>
              <Input
                className="form-control-lg mb-4"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Narration</Label>
              <Input
                className="form-control-lg mb-4"
                type="textarea"
                rows="4"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 d-flex flex-column">
              <Label>Transaction Category</Label>
              <Input
                className="form-control-lg mb-4"
                type="select"
                value={transactionCat}
                onChange={e => setTransactionCat(e.target.value)}
              >
                <option selected value="" disabled>
                  Choose
                </option>
                {props.categories &&
                  props.categories.map(item => (
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
                className="form-control-lg mb-4"
                type="number"
                value={amount}
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
                onClick={e => addIncomeFn(e)}
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
export default React.memo(AddIncome)
