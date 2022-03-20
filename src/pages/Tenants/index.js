import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import ErrorModal from "components/Common/ErrorModal"
import DeleteModal from "components/Common/DeleteModal"
import {
  Container,
  Col,
  Card,
  Row,
  CardBody,
  Button,
  CardHeader,
} from "reactstrap"
import { MDBDataTable } from "mdbreact"
import { Link, withRouter } from "react-router-dom"
import TenantFilterOptions from "./TenantFilterOptions"
import DropdownItemSelector from "../../components/Custom/DropdownItemSelector"

import Skelton from "components/Common/Skelton"

// import { CollectionPeriods, PaymentStatus } from "common/data/rentpe"

import { fetchTenantList, apiErrorTenants, clearError,deleteTenant } from "store/actions"

import { connect } from "react-redux"

import TenantRentCollect from "./TenantRentCollect"

const Tenants = props => {
  const [deleteOption, setDeleteOption] = useState(false);
  const [dataID, setDataID] = useState(null);

  const [currentTenant,setCurrentTenant] = useState(null)
  const [rentCollectToggle,setRentCollectToggle] = useState(false)

  const status = false

  const loading = props.error.loading

  const toggle = async () => {
    await props.clearError(status)
  }

  const cancelDelete = () => {
    setDeleteOption(!deleteOption)
  }

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTenantList()
    }
    dummy()
  }, [])

  useEffect(()=>{
    props.fetchTenantList()
  },[rentCollectToggle])

  const deleteTenant = (e,id) => {
    setDataID(id);
    e.preventDefault();
    setDeleteOption(true)
  }

  const properties = [
    { id: 0, name: "Skyline" },
    { id: 1, name: "Skyline II" },
  ]

  const filterTenants = propertyIndex => {}

  const rentCollect = (id) => {
    setCurrentTenant(id)
    setRentCollectToggle(true)
  }

  props.tenantsData.rows.forEach((row,idx) => {
    row.view = (
      // <Link to={`/tenants/${row.id}/dashboard/`}>
      //   <Button color="primary" outline>
      //     <i className="mdi mdi-eye pe-1" /> View
      //   </Button>
      // </Link>
      <div>
        <Link to={`/tenants/${row.id}/edit-tenant/`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-pen " />
          </Button>
        </Link>
        <Link to={`/tenants/${row.id}/dashboard/`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link>
        <Button  onClick={(e)=>deleteTenant(e,row.id)} color="danger" size="sm" outline>
          <i className="mdi mdi-delete " />
        </Button>
        <Button className="ms-1" onClick={()=>rentCollect(row.id)} color="success" size="sm" outline>
          <i className="mdi mdi-cash" />
        </Button>
      </div>
    )
    row.idField = idx+1
  })

  return (
    <div className="page-content">
      <ReactTitle title="Tenants" />
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <DeleteModal toggle={deleteOption} deleteFunction={props.deleteTenant} dataID={dataID} forClose={cancelDelete} />
      <TenantRentCollect unitsList={props.tenantsList} tenant={currentTenant} toggle={rentCollectToggle} setToggle={setRentCollectToggle} />
      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center ">
            <Col>
              <h6 className="page-title">Tenants</h6>
            </Col>
            <Col>
              <div className="float-end  ">
                <DropdownItemSelector
                  data={properties}
                  selectedIndex={-1}
                  onItemSelected={filterTenants}
                  defaultItem="All Properties"
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <h5>Tenant list</h5>
                    </Col>
                    <Col>
                      <div className="float-end ">
                        <Link to={"/tenants/add-tenant"}>
                          <Button color="primary" size="md">
                            <i className="mdi mdi-plus " /> Add
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <TenantFilterOptions />
                  {props.isLoading ? (
                    <Skelton />
                  ) : (
                    <MDBDataTable
                      hover
                      responsive
                      data={props.tenantsData}
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
  console.log("mapping..", state)
  return {
    tenantsData: state.tenantReducer.tenantData,
    error: state.tenantReducer.error,
    isLoading: state.tenantReducer.isLoading,
    tenantsList: state.tenantReducer.rentedUnitsData
  }
}

export default withRouter(
  connect(mapStateToProps, { fetchTenantList, apiErrorTenants, clearError,deleteTenant })(
    Tenants
  )
)
