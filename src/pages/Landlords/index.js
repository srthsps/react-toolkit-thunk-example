import React, { useState } from "react"
import { useSelector } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import LandlordFilterOptions from "./LandlordFilterOptions"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact";

// i18n
import { withTranslation } from "react-i18next"

import DropdownItemSelector from "../../components/Custom/DropdownItemSelector"

const Landlords = props => {
  const properties = [
    { id: 0, name: "Skyline" },
    { id: 1, name: "Skyline II" }
  ]

  let landlordData = useSelector((state) => state.landlordReducer.landlordData)
  let [tableData, setTableData] = useState(landlordData)

  tableData.rows.forEach(row => {
    row.view =
      <Link to={`/landlords/${row.id}/dashboard`}>
        <Button color="primary" outline>
          <i className="mdi mdi-eye pe-1" /> View
        </Button>
      </Link>
  });

  const filterLandlords = (propertyIndex) => {
    if (propertyIndex == -1) {
      setTableData(landlordData)
    } else {
      let selectedProperty = properties[propertyIndex].name
      let data = landlordData.rows.filter(item => item.propertyName == selectedProperty)
      setTableData({ columns: tableData.columns, rows: data })
    }
  }

  return (
    <div className="page-content">
      <ReactTitle title="Landlords" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Landlords</h6>
            </Col>
            <Col>
              <div className="float-end">
                <DropdownItemSelector data={properties} selectedIndex={-1}
                  onItemSelected={filterLandlords} defaultItem="All Properties"
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card>
                <CardHeader tag="h5">Landlord list</CardHeader>
                <CardBody>
                  {/* <LandlordFilterOptions /> */}
                  {/* Wireframe says search only, so commenting it out for now untill further clearance */}
                  <MDBDataTable striped hover responsive data={tableData}
                    barReverse noBottomColumns tbodyColor="align-middle" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default withTranslation()(Landlords)
