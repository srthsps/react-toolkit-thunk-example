import React, { useEffect, useState } from "react"
import { connect, useSelector } from 'react-redux'
import { ReactTitle } from "react-meta-tags"
import { Container, Row, Col, Card, CardBody,CardHeader, Button } from "reactstrap"
import { useParams } from "react-router-dom";
import ErrorModal from "components/Common/ErrorModal";
import Skelton from "components/Common/Skelton"
import DeleteModal from "components/Common/DeleteModal";

import { clearError,fetchUnitTransactionFn } from "store/actions"
import { MDBDataTable } from "mdbreact"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

const Units = props => {
  const [deleteOption, setDeleteOption] = useState(false)
  const loading = props.error.loading;
  const [dataID, setDataID] = useState(null);
  const status = false;
  const toggle = async() => {
   await props.clearError(status);
  }

  const { unitID } = useParams();
  console.log('id',unitID)
  // const cancelDelete = () => {
  //   setDeleteOption(!deleteOption)
  // }
  // const delete_unit = (e,id) => {
  //   e.preventDefault();
  //   setDataID(id);
  //   setDeleteOption(true)
    
    
  // }
  useEffect(() => {
    let dummy = async () =>{
      await props.fetchUnitTransactionFn(unitID)
    }
    dummy()
  },[])

    let transactionData = useSelector((state) => state.unitsReducer.transactionData)

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
      <ReactTitle title="Transactions" />

      <Container fluid className="">
        <div className="page-title-box">
          <Row >
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>       
                      <h5 >Transaction list</h5>
                    </Col>
                    <Col>
                      <div className="float-end ">
                        <Link to={`/properties/${props.propertyID}/dashboard/units/${props.unitID}/unit-dashboard/add-transaction`} >
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
                  {props.isLoading ? <Skelton /> : (
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
const mapStateToProps = (state) => {
  console.log('state',state)
  return {
    transactionData: state.unitsReducer.transactionData,
    error: state.unitsReducer.error,
    isLoading: state.unitsReducer.isLoading,

  }
}
export default withRouter(connect(mapStateToProps,{clearError,fetchUnitTransactionFn})(Units))
