import React,{useEffect} from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { ReactTitle } from 'react-meta-tags';
import ErrorModal from "components/Common/ErrorModal";
import Skelton from "components/Common/Skelton";


import { MDBDataTable } from "mdbreact";

import { Link } from "react-router-dom"

import TransactionFilterOption from "./FilterOptions/TransactionFilterOption";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { fetchTransactionList ,clearSummaryError} from "store/actions";

const TransactionList = props => {
  const loading =props.error.loading;

  useEffect(() => {
    let dummy = async () => {
      await props.fetchTransactionList()
    }
    dummy();
  
  }, []);

  const toggle = async () => {
    await props.clearSummaryError(false)
  }
  

  props.transactionsData.rows.forEach((row) => {
    row.view =
      <Link to={`transactions/${row.id}/dashboard`}>
        <Button color="primary" outline>
          <i className="mdi mdi-eye pe-1" /> View
        </Button>
      </Link>

    row.transStatusPill = <span className={`rounded-pill text-light
        ${row.transStatus == 'Success' ? 'bg-success' : 'bg-danger'}`}>
        { row.transStatus }
      </span>
  });

  return (
    <div className="page-content">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <ReactTitle title="Transactions" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title mt-3">Transactions</h6>
            </Col>
          </Row>
        </div>
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader tag="h5">Transactions list</CardHeader>
              <CardBody>
                <TransactionFilterOption />
                {props.isLoading ? <Skelton /> : (
                  <MDBDataTable
                    striped
                    hover
                    responsive
                    data={props.transactionsData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle" />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    transactionsData: state.summaryReducer.transactionsData,
    error: state.summaryReducer.error,
    isLoading: state.summaryReducer.isLoading,
    
  }
}
export default withRouter(connect(mapStateToProps,{fetchTransactionList,clearSummaryError})(TransactionList))