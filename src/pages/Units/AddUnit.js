import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  Button,
} from "reactstrap"

// i18n
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import {
  setUnit,
  clearUnitError,
  fetchCategoryList,
  unitApiError,
  clearUnitDetails,
  fetchUnitDetails,
} from "store/actions"

import Switch from "react-switch"
import { useSelector } from "react-redux"

import { AvForm, AvField } from "availity-reactstrap-validation"

const AddUnit = props => {
  const switchOnColor = "#626ed4"

  const status = false

  const loading = props.error.loading

  const toggle = async () => {
    await props.clearUnitError(status)
  }

  const history = useHistory()

  const inputsHandler = e => {
    const { name, value } = e.target
    setUnitData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }
  const { propertyID, unitID } = useParams()

  let unitDetails = useSelector(state => state.unitsReducer.unitDetailsData)

  const [unitData, setUnitData] = useState({
    property: propertyID,
    name: "",
    category: null,
    rent_amount: null,
    deposit_amount: null,
    description: "",
    floor: null,
    is_occupied: false,
    is_active: true,
    kseb_con_id: "gjfgyuty",
    lsgd_building_no: "uytrutyut",
  })

  useEffect(() => {
    props.fetchCategoryList()
    if (unitID != null) {
      let dummy = async () => {
        
        await props.fetchUnitDetails(unitID, propertyID)
      }
      dummy()
    } else {
      props.clearUnitDetails()
      console.log("clear ", unitDetails)
    }
  }, [unitID])

  const dispatch = useDispatch()

  const handleClick = e => {
    e.preventDefault()

    var unit = {
      property: propertyID,
      name: unitID != undefined && unitData.name == "" ? props.propsData.name : unitData.name,
      category:
        unitID != undefined ? props.propsData.category : unitData.category,
      rent_amount:
        unitID != undefined && unitData.rent_amount == null
          ? props.propsData.rent_amount
          : unitData.rent_amount,
      deposit_amount:
        unitID != undefined && unitData.deposit_amount == null
          ? props.propsData.deposit_amount
          : unitData.deposit_amount,
      description:
        unitID != undefined && unitData.description
          ? props.propsData.description
          : unitData.description,
      floor: unitID != undefined && unitData.floor == null ? props.propsData.floor : unitData.floor,
      is_occupied: unitID != undefined ? props.propsData.is_occupied : false,
      is_active: true,
      kseb_con_id: "gjfgyuty",
      lsgd_building_no: "uytrutyut",
    }

    unit.rent_amount = parseInt(unit.rent_amount)
    unit.deposit_amount = parseInt(unit.deposit_amount)
    unit.floor = parseInt(unit.floor)

    console.log(unit)
    let error = false
    if (unit.name == "") {
      dispatch(unitApiError("Name is required"))
      error = true
    }
    dispatch(setUnit(unit, history, propertyID, unitID))
  }
  let categories = useSelector(state => state.categoryReducer.categories)

  return (
    <div className="page-content">
      <Container fluid>
        {loading == true && (
          <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
        )}
        <div className="mt-5 pt-3 ">
          <AvForm className="needs-validation">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="mt-2">
                      {unitID == null
                        ? "Add Property Unit"
                        : "Edit Property Unit"}
                    </h4>
                  </CardHeader>
                  <CardBody className="pt-5 ">
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Name</Label>
                        <AvField
                          name="name"
                          type="text"
                          errorMessage="Enter name"
                          value={
                            props.propsData.name ? props.propsData.name : ""
                          }
                          onChange={inputsHandler}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                      <Col md={5}>
                        <Label> Category</Label>
                        <Input
                          className="form-control-lg mb-4"
                          type="select"
                          name="category"
                          value={
                            unitID != undefined
                              ? props.propsData.category
                                ? props.propsData.category
                                : ""
                              : unitData.category
                          }
                          onChange={inputsHandler}
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
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Rent</Label>
                        {/* <Input
                          className="form-control-lg mb-4"
                          type="number"
                          name="rent_amount"
                          value={
                            props.propsData.rent_amount
                              ? props.propsData.rent_amount
                              : ""
                          }
                          onChange={inputsHandler}
                        ></Input> */}
                        <AvField
                          name="rent_amount"
                          type="number"
                          errorMessage="Enter amount"
                          value={
                            props.propsData.rent_amount
                              ? props.propsData.rent_amount
                              : 0
                          }
                          onChange={inputsHandler}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                      <Col md={5}>
                        <Label>Deposit Amount</Label>
                        <AvField
                          name="deposit_amount"
                          type="number"
                          errorMessage="Enter amount"
                          value={
                            props.propsData.deposit_amount
                              ? props.propsData.deposit_amount
                              : ""
                          }
                          onChange={inputsHandler}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    {/* <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Collection Day</Label>
                  <Input className="mb-4"   type="text" name="collection_day" onChange={inputsHandler}></Input>
                </Col>
                <Col md={5}>
                  <Label>Collection Period</Label>
                  <Input className="mb-4"  type="text" name="collectiom_period" onChange={inputsHandler}></Input>
                </Col>
              </Row> */}
                    <Row className="justify-content-center">
                      <Col md={10}>
                        <Label>Description</Label>
                        <AvField
                          name="description"
                          type="textarea"
                          rows="5"
                          errorMessage="Enter description"
                          value={
                            props.propsData.description
                              ? props.propsData.description
                              : ""
                          }
                          onChange={inputsHandler}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md={5}>
                        <Label>Floor</Label>
                        <AvField
                          name="floor"
                          type="number"
                          errorMessage="Enter floor"
                          value={
                            props.propsData.floor ? props.propsData.floor : ""
                          }
                          onChange={inputsHandler}
                          className="form-control-lg mb-4"
                          validate={{ required: { value: true } }}
                        />
                      </Col>
                      {/* <Col md={5}>
                        <Row>
                          <Col md={6}>
                            <Label className="d-flex align-items-center">
                              Active Status
                            </Label>
                          </Col>
                          <Col md={6}>
                            <Switch
                              onColor={switchOnColor}
                              name="is_active"
                              onChange={e => inputsHandler(e)}
                              checked={
                                props.propsData.is_active ? props.propsData.is_active : false
                              }
                              className="mt-4"
                            />
                          </Col>
                        </Row>
                      </Col> */}
                    </Row>
                    <div className="justify-content-center text-center mb-5 mt-3">
                      <Button
                        onClick={() => props.history.push("../")}
                        className="btn btn-lg btn-danger"
                        color="danger"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btn btn-lg btn-success ms-2"
                        color="success"
                        onClick={handleClick}
                      >
                        Save
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </AvForm>
        </div>
      </Container>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    error: state.unitsReducer.error,
    propsData: state.unitsReducer.unitDetailsData,
    categories: state.categoryReducer.categories
  }
}
export default withRouter(
  connect(mapStateToProps, {
    clearUnitError,
    fetchCategoryList,
    unitApiError,
    clearUnitDetails,
    fetchUnitDetails,
  })(AddUnit)
)
