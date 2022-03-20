import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { ReactTitle } from 'react-meta-tags';

// i18n
import { withTranslation } from "react-i18next";

import { MDBDataTable } from "mdbreact";

import { Link } from "react-router-dom"

import SettlementFilterOption from "./FilterOptions/SettlementFilterOption";

const SettlementList = props => {

  let settlementData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "transName" },
      { label: "Rentpay ID", field: "rentpeID" },
      { label: "Owner", field: "tenantName" },
      { label: "Email", field: "tenantEmail" },
      { label: "Date", field: "transDate" },
      { label: "Settlement ID", field: "transId" },
      { label: "Status", field: "transStatusPill" },
      { label: "Amount", field: "transAmount" },
      { label: "Actions", field: "view" },
    ],
    rows: [
      {
        id: 1, transName: "ST 1", rentpeID: 49, tenantName: "Kiran", tenantEmail: "kiran@gmail.com",
        transDate: "2021-05-14", transId: 100012541, transStatus: "Active", transAmount: 95000
      },
      {
        id: 2, transName: "ST 2", rentpeID: 52, tenantName: "William", tenantEmail: "william@gmail.com",
        transDate: "2021-03-24", transId: 100012125, transStatus: "Inactive", transAmount: 25000
      },
      {
        id: 3, transName: "ST 3", rentpeID: 63, tenantName: "David", tenantEmail: "david@gmail.com",
        transDate: "2021-02-04", transId: 100012460, transStatus: "Active", transAmount: 42000
      },
      {
        id: 4, transName: "ST 4", rentpeID: 48, tenantName: "Baiju", tenantEmail: "baiju@gmail.com",
        transDate: "2021-05-14", transId: 100012742, transStatus: "Inactive", transAmount: 28000
      },
    ]
  }

  settlementData.rows.forEach((row) => {
    row.view =
      <Link to={`settlements/${row.id}/dashboard`}>
        <Button color="primary" outline>
          <i className="mdi mdi-eye pe-1" /> View
        </Button>
      </Link>

    row.transStatusPill = <span className={`rounded-pill text-light
        ${row.transStatus == 'Active' ? 'bg-success' : 'bg-danger'}`}>
        { row.transStatus }
      </span>
  });

  return (
    <div className="page-content">
      <ReactTitle title="Settlements" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title mt-3">Settlements</h6>
            </Col>
          </Row>
        </div>
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader tag="h5">Settlement list</CardHeader>
              <CardBody>
                <SettlementFilterOption />
                <MDBDataTable striped hover responsive data={settlementData}
                  barReverse noBottomColumns tbodyColor="align-middle" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withTranslation()(SettlementList)