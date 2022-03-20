import React, { useState } from "react"
import { useSelector } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import UnitFilterOptions from "./UnitFilterOptions"
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

const PropertyUnits = props => {
  const properties = [
    { id: 0, name: "Skyline" },
    { id: 1, name: "Skyline II" }
  ]

  let propertyUnitData = useSelector((state) => state.propertyUnitReducer.propertyUnitData)

  let [tableData, setTableData] = useState(propertyUnitData)

  tableData.rows.forEach((row) => {
    row.view =
      <Link to={`/property-units/${row.id}/dashboard`}>
        <Button color="primary" outline>
          <i className="mdi mdi-eye pe-1" /> View
        </Button>
      </Link>

    row.unitStatusPill = <span className={`rounded-pill text-light
        ${row.unitStatus == 'Occupied' ? 'bg-primary' : 'bg-success'}`}>
        { row.unitStatus }
      </span>
  });

  const filterFn = (propertyIndex) => {
    if (propertyIndex == -1) {
      setTableData(propertyUnitData)
    } else {
      let selectedProperty = properties[propertyIndex].name
      let data = propertyUnitData.rows.filter(item => item.unitPropertyName == selectedProperty)
      setTableData({ columns: tableData.columns, rows: data })
    }
  }

  return (
    <div className="page-content">
      <ReactTitle title="Property Units" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Property Units</h6>
            </Col>
            <Col>
              <div className="float-end">
                <DropdownItemSelector data={properties} selectedIndex={-1}
                  onItemSelected={filterFn} defaultItem="All Properties"
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card>
                <CardHeader tag="h5">Unit list</CardHeader>
                <CardBody>
                  <UnitFilterOptions />
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

export default withTranslation()(PropertyUnits)
