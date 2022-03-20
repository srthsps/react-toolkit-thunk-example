import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import ErrorModal from "components/Common/ErrorModal"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

// i18n
import {
  fetchPropertyDetails,
  fetchPropertyDetailsCardData,
  apiErrorProperties,
  clearErrorProperties,
} from "store/actions"
import { connect } from "react-redux"
import { propertyData } from "store/PropertyData/PropertyStore"
import Skelton from "components/Common/Skelton"

const PropertyDetails = props => {
  const loading = props.error.loading
  const status = false
  const toggle = () => {
    props.clearErrorProperties(status)
  }

  let { propertyID } = useParams()

  let propertyDetails = useSelector(
    state => state.propertyReducer.propertyDetailsData
  )

  useEffect(() => {
    let dummy = async () => {
      await props.fetchPropertyDetails(propertyID)
      await props.fetchPropertyDetailsCardData(propertyID)
    }
    dummy()
  }, [])

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="page-title-box">
        <Row className="align-items-center ">
          <Col>
            <h6 className="page-title pb-4 ">{props.propsData.name}</h6>
          </Col>
        </Row>
        <Row className="row mb-4 px-3" style={{ cursor: "pointer" }}>
          <Card
            className="col px-2 card-stats mb-4 mb-lg-0 "
            outline
            color="warning"
          >
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                    Rent Collected
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 text-success">
                    ₹ {props.cardData.rent_collected}
                  </span>
                </div>
                <Col className="col-2">
                  <i
                    className="ti ti-link  text-success me-0"
                    style={{ fontSize: "25px" }}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <p className="col-7 mt-3 mb-0 text-muted text-sm pb-3 ">
                  <span className="text-nowrap pe-4">Since last month</span>
                </p>
              </Row>
            </CardBody>
          </Card>
          <Card
            className="col ms-4 px-2 card-stats mb-4 mb-lg-0 "
            outline
            color="warning"
          >
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                    Rent Balance
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 text-success">
                    {" "}
                    ₹ {props.cardData.rent_balance}
                  </span>
                </div>
                <Col className="col-2">
                  <i
                    className="ti ti-link  text-success me-0"
                    style={{ fontSize: "25px" }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card
            className="col ms-4 px-2 card-stats mb-4 mb-lg-0 "
            outline
            color="warning"
          >
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                    Total Income
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 text-success">
                    {" "}
                    ₹ {props.cardData.total_income}
                  </span>
                </div>
                <Col className="col-2">
                  <i
                    className="ti ti-link  text-success me-0"
                    style={{ fontSize: "25px" }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card
            className="col ms-4 px-2 card-stats mb-4 mb-lg-0 "
            outline
            color="warning"
          >
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                    Total Expense
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0 text-danger">
                    {" "}
                    ₹ {props.cardData.total_expense}
                  </span>
                </div>
                <Col className="col-2">
                  <i
                    className="ti ti-link  text-success me-0"
                    style={{ fontSize: "25px" }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        {props.isLoading ? (
          <Skelton />
        ) : (
          <Card className="py-5 px-3">
            <Row className="align-items-center">
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Property name :</strong>
                  </Col>
                  <Col>
                    <div>{propertyDetails.name}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Category :</strong>
                  </Col>
                  <Col>
                    <div>{propertyDetails.category}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Sub category :</strong>
                  </Col>
                  <Col>
                    <div>{propertyDetails.sub_category}</div>
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-2">
                <Row>
                  <Col>
                    <strong>Location :</strong>
                  </Col>
                  <Col>
                    <div>
                      {props.propsData &&
                        props.propsData.location &&
                        props.propsData.location.locality}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </Container>
  )
}
const mapStateToProps = state => {
  console.log("mapping...", state)
  return {
    propsData: state.propertyReducer.propertyDetailsData,
    error: state.propertyReducer.errorProperties,
    isLoading: state.propertyReducer.isLoading,
    cardData: state.propertyReducer.propertyDetailsCardData,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    fetchPropertyDetails,
    fetchPropertyDetailsCardData,
    apiErrorProperties,
    clearErrorProperties,
  })(PropertyDetails)
)
