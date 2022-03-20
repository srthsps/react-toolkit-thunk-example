import React, { useEffect, useState } from "react"
import { connect, useSelector, useDispatch } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardTitle,
} from "reactstrap"
import { useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import Skelton from "components/Common/Skelton"
import DeleteModal from "components/Common/DeleteModal"

import {
  clearErrorProperties,
  fetchPropertyTransactions,
  fetchPropertyTransactionsCardData,
  fetchIncomeCategories,
  fetchExpenseCategories,
  endLoadingTenants,
  squareOffRentData,
  apiErrorProperties,
  clearSqrfError,
  sqrfError,
} from "store/actions"
import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import SquareOff from "./SquareOff"
import AddExpense from "./AddExpense"
import AddIncome from "./AddIncome"

const Units = props => {

  const [deleteOption, setDeleteOption] = useState(false)
  const [amount, setAmount] = useState(props.balance)
  const [txnMode, setTxnMode] = useState(1)
  const [dataID, setDataID] = useState(null)

  const dispatch = useDispatch()

  const loading = props.error.loading
  const status = false
  const toggle = async () => {
    await props.clearErrorProperties(status)
  }

  const { propertyID } = useParams()
  console.log("id", propertyID)
  const cancelDelete = () => {
    setDeleteOption(!deleteOption)
  }
  const delete_unit = (e, id) => {
    e.preventDefault()
    setDataID(id)
    setDeleteOption(true)
  }
  useEffect(() => {
    let dummy = async () => {
      await props.fetchIncomeCategories()
      await props.fetchExpenseCategories()
      await props.fetchPropertyTransactionsCardData(propertyID)
      await props.fetchPropertyTransactions(propertyID)
    }
    dummy()
  }, [])

  let transactionData = useSelector(
    state => state.propertyReducer.propertyTransactionData
  )

  const cardData = useSelector(
    state => state.propertyReducer.propertyTransactionCardData
  )

  const [sqoffToggle, setsqOffToggle] = useState(false)
  const [incomeToggle, setIncomeToggle] = useState(false)
  const [expenseToggle, setExpenseToggle] = useState(false)

  useEffect(() => {
    props.fetchPropertyTransactionsCardData(propertyID)
    props.fetchPropertyTransactions(propertyID)
  }, [incomeToggle, expenseToggle,sqoffToggle])

  const sqofFn = e => {
    e.preventDefault()
    var sqofData = {
      amount: amount,
      txn_mode: txnMode,
    }

    let errors = false

    if (sqofData.amount > props.cardData.property_balance) {
      errors = true
    }

    if (sqofData.amount == null || sqofData.txn_mode == null) {
      errors = true
    }

    if (errors) {
      dispatch(apiErrorProperties("Please enter valid details"))
      setsqOffToggle(false)
    } else {
      dispatch(squareOffRentData(sqofData, propertyID))
      dispatch(fetchPropertyTransactionsCardData(propertyID))
      dispatch(fetchPropertyTransactions(propertyID))
      setsqOffToggle(false)
    }
  }

  //   transactionData.rows.forEach(row => {
  //   row.view = (
  //     <div>
  //     <Link to={`/units/${row.id}/edit-unit`}>
  //       <Button color="primary" size="sm" outline className="me-1">
  //         <i className="mdi mdi-pen " />
  //       </Button>
  //    </Link>
  //    <Link to={`/units/${row.id}/unit-details`}>
  //       <Button color="primary" size="sm" outline className="me-1">
  //         <i className="mdi mdi-eye " />
  //       </Button>
  //      </Link>

  //       <Button color="danger" size="sm" onClick={(e)=>delete_unit(e,row.id)} outline>
  //         <i className="mdi mdi-delete " />
  //       </Button>
  //      </div>
  //   )

  // })

  return (
    <div className="page-content pt-0 ">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      {/* <DeleteModal toggle={deleteOption} deleteFunction={props.deleteUnit} dataID={dataID} forClose={cancelDelete} /> */}
      <SquareOff
        balance={props.cardData.property_balance}
        property={propertyID}
        toggle={sqoffToggle}
        setToggle={setsqOffToggle}
        amount={amount}
        txnMode={txnMode}
        setAmount={setAmount}
        setTxnMode={setTxnMode}
        sqofFn={sqofFn}
      />
      <AddExpense
        property={propertyID}
        toggle={expenseToggle}
        setToggle={setExpenseToggle}
        categories={props.expenseCat}
        units={props.unitList}
      />
      <AddIncome
        property={propertyID}
        toggle={incomeToggle}
        setToggle={setIncomeToggle}
        categories={props.incomeCat}
        units={props.unitList}
      />
      <ReactTitle title="Transactions" />

      <Container fluid className="">
        <div className="page-title-box">
          <Row className="align-items-center ">
            <Col>
              <h6 className="page-title pb-4 ">Transactions</h6>
            </Col>
          </Row>
          <Row className="row mb-4 px-3" style={{ cursor: "pointer" }}>
            <Card
              className="col px-2 card-stats mb-4 mb-lg-0 "
              outline
              color="warning"
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                      {/* {item.category} */}
                      Property Balance
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-success">
                      ₹ {props.cardData.property_balance}
                    </span>
                  </div>
                  <Col className="col-2">
                    <i
                      className="ti ti-link  text-success me-0"
                      style={{ fontSize: "25px" }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <p className="col-7 mt-3 mb-0 text-muted text-sm pb-3 ">
                    {/* <span className="text-nowrap pe-4">Since last month</span> */}
                  </p>
                  <Col
                    onClick={() => setsqOffToggle(true)}
                    className="btn btn-lg btn-secondary col-5"
                    style={{ border: "none", background: "white" }}
                  >
                    <Row>
                      <h4 className="col mt-1 text-muted">Square Off</h4>
                      <i
                        className="col-2 ti ti-angle-right mt-1 text-success me-0"
                        style={{ fontSize: "25px" }}
                      />
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card
              className="col ms-4 px-2 card-stats mb-4 mb-lg-0 "
              outline
              color="warning"
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                      Petty Balance
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0 text-success">
                      ₹ {cardData.petty_balance}
                    </span>
                  </div>
                  <Col className="col-2">
                    <i
                      className="ti ti-link  text-success me-0"
                      style={{ fontSize: "25px" }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <h5>Transaction list</h5>
                    </Col>
                    <Col>
                      <div className="float-end ">
                        <Button
                          onClick={() => setIncomeToggle(true)}
                          className="me-2"
                          color="btn btn-success"
                          size="md"
                        >
                          <i className="mdi mdi-plus " /> Add Income
                        </Button>
                        <Button
                          onClick={() => setExpenseToggle(true)}
                          color="btn btn-danger"
                          size="md"
                        >
                          <i className="mdi mdi-plus " /> Add Expense
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* <Skelton /> */}
                  {props.isLoading ? (
                    <Skelton />
                  ) : (
                    <MDBDataTable
                      hover
                      responsive
                      data={transactionData}
                      barReverse
                      noBottomColumns
                      tbodyColor="align-middle"
                      order={["name", "asc"]}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}
const mapStateToProps = state => {
  console.log("state", state)
  return {
    transactionData: state.propertyReducer.propertyTransactionData,
    error: state.propertyReducer.errorProperties,
    isLoading: state.unitsReducer.isLoading,
    cardData: state.propertyReducer.propertyTransactionCardData,
    incomeCat: state.propertyReducer.incomeCategoriesData,
    unitList: state.unitsReducer.unitsData.rows,
    expenseCat: state.propertyReducer.expenseCategoriesData,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    clearErrorProperties,
    fetchIncomeCategories,
    fetchExpenseCategories,
    fetchPropertyTransactions,
    fetchPropertyTransactionsCardData,
  })(Units)
)
