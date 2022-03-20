import React, { useEffect, useState } from "react"

import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"

import { connect, useSelector } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"

import ErrorModal from "components/Common/ErrorModal"
import Skelton from "components/Common/Skelton"
import DeleteModal from "components/Common/DeleteModal"

import TenantRentCollect from "./TenantRentCollect"

import { fetchPropertyTenants, clearError } from "store/actions"
import { MDBDataTable } from "mdbreact"

const Tenants = props => {
  const [deleteOption, setDeleteOption] = useState(false)
  const [dataID, setDataID] = useState(null)

  const loading = props.error.loading
  const status = false

  const [currentTenant, setCurrentTenant] = useState(null)
  const [rentCollectToggle, setRentCollectToggle] = useState(false)

  const toggle = async () => {
    await props.clearError(status)
  }

  const { propertyID } = useParams()

  const cancelDelete = () => {
    setDeleteOption(!deleteOption)
  }

  const deleteTenant = (e, id) => {
    e.preventDefault()
    setDataID(id)
    setDeleteOption(true)
  }

  const rentCollect = id => {
    setCurrentTenant(id)
    setRentCollectToggle(true)
  }

  useEffect(() => {
    let dummy = async () => {
      await props.fetchPropertyTenants(propertyID)
    }
    dummy()
  }, [])

  let tenantsData = useSelector(
    state => state.propertyReducer.propertyTenantsData
  )

  tenantsData.rows.forEach((row, idx) => {
    row.view = (
      <div>
        {/* <Link to={`/tenants/${row.id}/dashboard/units/${row.id}/edit-unit`}>
        <Button color="primary" size="sm" outline className="me-1">
          <i className="mdi mdi-pen " />
        </Button>
     </Link> */}

        <Link to={`/tenants/${row.id}/dashboard/`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link>

        <Button
          className="ms-1"
          onClick={() => rentCollect(row.id)}
          color="success"
          size="sm"
          outline
        >
          <i className="mdi mdi-cash" />
        </Button>

        {/* <Button color="danger" size="sm" onClick={(e)=>deleteTenant(e,row.id)} outline>
          <i className="mdi mdi-delete " />
        </Button> */}
      </div>
    )

    row.idx = idx + 1
  })

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <DeleteModal
        toggle={deleteOption}
        deleteFunction={props.deletePropertyUnit}
        dataID={dataID}
        forClose={cancelDelete}
      />
      <TenantRentCollect
        unitsList={props.unitsList}
        tenant={currentTenant}
        toggle={rentCollectToggle}
        setToggle={setRentCollectToggle}
      />
      <div className="page-title-box">
        <Row className="align-items-center pb-4">
          <Col>
            <h6 className="page-title">Tenants list</h6>
          </Col>
          {/* <Col>
            <div className="float-end">
              <Link
                to={{
                  pathname: `/properties/${propertyID}/dashboard/units/add-unit`,
                }}
              >
                <Button color="primary" size="md">
                  <i className="mdi mdi-plus" /> Add
                </Button>
              </Link>
            </div>
          </Col> */}
        </Row>
        <Row className="">
          <Col>
            <Card>
              <CardBody>
                {props.isLoading ? (
                  <Skelton />
                ) : (
                  <MDBDataTable
                    striped
                    hover
                    responsive
                    data={tenantsData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
const mapStateToProps = state => {
  return {
    tenantsList: state.propertyReducer.propertyTenantsData,
    error: state.propertyReducer.error,
    isLoading: state.propertyReducer.isLoading,
    unitsList: state.tenantReducer.rentedUnitsData
  }
}
export default withRouter(
  connect(mapStateToProps, {
    fetchPropertyTenants,
    clearError,
    // deletePropertyUnit,
  })(Tenants)
)
