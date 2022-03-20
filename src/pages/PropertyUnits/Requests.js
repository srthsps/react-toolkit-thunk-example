import React from "react"
import {useSelector} from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap"
import { ReactTitle } from "react-meta-tags"

// i18n
import { withTranslation } from "react-i18next"

import { MDBDataTable } from "mdbreact"

// import FilterOptions from "./FilterOptions"

const UnitRequests = props => {

   let requestData = useSelector((state) => state.requestReducer.requestData)

  return (
      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Requests</h6>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Requests List</h4>

                  {/* <FilterOptions /> */}

                  <MDBDataTable
                    striped
                    hover
                    responsive
                    data={requestData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  )
}

export default withTranslation()(UnitRequests)
