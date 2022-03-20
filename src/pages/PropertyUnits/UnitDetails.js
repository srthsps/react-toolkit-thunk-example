import React, { useEffect } from "react"
import { useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody
} from "reactstrap"

import { withRouter, useParams } from "react-router-dom";
import ErrorModal from "components/Common/ErrorModal";

import { MDBDataTable } from "mdbreact"


import { fetchPropertyUnitDetails,apiError,clearError } from "store/actions";
import { connect } from "react-redux";

const UnitDetails = props => {
  let unitTransactions = useSelector((state) => state.propertyUnitReducer.unitTransactions)
  // let unitDetails = useSelector((state) => state.propertyUnitReducer.unitDetails)

  const loading = props.error.loading;
  const status = false;
  const toggle = () => {
     props.clearError(status);
   }

  let { propertyID, unitID} = useParams();

  useEffect(() => {
    let dummy = async () =>{
      await props.fetchPropertyUnitDetails(unitID)
    }
    dummy()
  },[])



  return (
    <Container fluid>
      {loading==true &&
       <ErrorModal error={props.error} toggle={toggle} ></ErrorModal>
      }
      <div className="page-title-box">
        <Row className="align-items-center py-3">
          {/* {props.unitDetails.map((item, index) => {
            return ( */}
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Name:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.name}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>ID:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.id}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Rent:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.rent_amount}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Deposit:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.deposit_amount}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Property:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.property}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.is_occupied ? 'Occupied' : 'Vacant'}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Category:</strong>
                  </Col>
                  <Col>
                    {/* <div>{props.unitDetails.category}</div> */}
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Description:</strong>
                  </Col>
                  <Col>
                    <div>{props.unitDetails.description}</div>
                  </Col>
                </Row>
              </Col>
          {/* //   )
          // })} */}
        </Row>

        <Row className="mt-5">
          <Card>
            <h4 className="p-3">Unit Transactions</h4>
            <CardBody>
              <MDBDataTable striped hover responsive data={unitTransactions}
                noBottomColumns barReverse tbodyColor="align-middle" borderless />
            </CardBody>
          </Card>
        </Row>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  console.log("mapping...",state)
  return {
    unitDetails: state.propertyReducer.unitDetailsData,
    error: state.propertyReducer.error,
  }
}

export default withRouter(connect(mapStateToProps,{fetchPropertyUnitDetails,apiError,clearError})(UnitDetails))
