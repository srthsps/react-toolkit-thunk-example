import React, { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap"
import { useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import Skelton from "components/Common/Skelton"
import DeleteModal from "components/Common/DeleteModal"

import {
  fetchUnitList,
  clearUnitError,
  fetchTenantList,
  fetchPropertyTransactionsCardData,
  unitApiError,
  deleteUnit,
  fetchCategoryList,
} from "store/actions"
import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import RentCollect from "./RentCollect"

const Units = props => {
  const [deleteOption, setDeleteOption] = useState(false)
  const [dataID, setDataID] = useState(null)

  const loading = props.error.loading
  const status = false

  const toggle = async () => {
    await props.clearUnitError(status)
    await props.fetchUnitList(propertyID)
  }

  const [rentCollectToggle, setRentCollectToggle] = useState(false)
  const [currentUnit, setCurrentUnit] = useState(null)

  const { propertyID } = useParams()

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
      await props.fetchTenantList()
      await props.fetchUnitList(propertyID)
    }
    dummy()
  }, [])

  useEffect(() => {
    if (!rentCollectToggle) {
      props.fetchUnitList(propertyID)
      props.fetchPropertyTransactionsCardData(propertyID)
    }
  }, [rentCollectToggle])

  let unitsData = useSelector(state => state.unitsReducer.unitsData)
  // let categories = useSelector((state) => state.categoryReducer.categories);

  const rentCollect = id => {
    console.log("rentcol", id)
    setRentCollectToggle(true)
    setCurrentUnit(id)
  }

  unitsData.rows.forEach((row, idx) => {


    row.dueRent = <span>{"₹ "} {row.due_rent}</span>

    row.view = (
      <div>
        <Link to={`/properties/${propertyID}/dashboard/edit-unit/${row.id}`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-pen " />
          </Button>
        </Link>
        <Link
          to={`/properties/${propertyID}/dashboard/units/${row.id}/unit-dashboard`}
        >
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link>

        <Button
          color="danger"
          size="sm"
          onClick={e => delete_unit(e, row.id)}
          outline
        >
          <i className="mdi mdi-delete " />
        </Button>

        {row.is_occupied && (
          <Button
            onClick={() => rentCollect(row.id)}
            className="ms-1"
            color="success"
            size="sm"
            outline
          >
            <i className="mdi mdi-cash" />
          </Button>
        )}
      </div>
    )

    row.unitStatusPill = (
      <span
        className={`rounded-pill text-light
        ${row.is_occupied == true ? "bg-success" : "bg-danger"}`}
      >
        {row.is_occupied == true ? "Occupied" : "Vaccant"}
      </span>
    )

    row.idx = idx+1

    
  })

  return (
    <div className="page-content pt-0">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}

      <RentCollect
        tenant={props.unitTenants}
        tenants={props.tenantsList.rows}
        toggle={rentCollectToggle}
        setToggle={setRentCollectToggle}
        unit={currentUnit}
        property={propertyID}
        unitDetails={props.unitDetails}
      />

      <DeleteModal
        toggle={deleteOption}
        deleteFunction={props.deleteUnit}
        dataID={{ dataID, propertyID }}
        forClose={cancelDelete}
      />
      <ReactTitle title="Units" />

      <Container fluid className="">
        <div className="page-title-box">
          <Row className="align-items-center ">
            <Col>
              <h6 className="page-title pb-4 ">Units</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <h5 className="">Unit list</h5>
                    </Col>
                    <Col>
                      <div className="float-end ">
                        <Link to={"units/add-unit"}>
                          <Button color="btn btn-primary" size="md">
                            <i className="mdi mdi-plus " /> Add
                          </Button>
                        </Link>
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
                      data={unitsData}
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
    unitsData: state.unitsReducer.unitsData,
    error: state.unitsReducer.error,
    isLoading: state.unitsReducer.isLoading,
    tenantsList: state.tenantReducer.tenantData,
    unitTenants: state.unitsReducer.unitTenantData,
    unitDetails: state.unitsReducer.unitDetailsData,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    fetchUnitList,
    fetchPropertyTransactionsCardData,
    fetchTenantList,
    unitApiError,
    clearUnitError,
    deleteUnit,
    fetchCategoryList,
  })(Units)
)
