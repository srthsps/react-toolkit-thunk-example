import React, { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { ReactTitle } from "react-meta-tags"
import ErrorModal from "components/Common/ErrorModal"
// import DeleteModal from "components/Common/DeleteModal"
// import Skelton from "components/Common/Skelton"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  CardTitle,
  CardImg,
  CardFooter,
} from "reactstrap"
import { MDBDataTable } from "mdbreact"
import { withRouter, Link } from "react-router-dom"
// import DropdownItemSelector from "../../components/Custom/DropdownItemSelector"

// i18n
import {
  fetchPropertyList,
  apiError,
  clearError,
  deleteProperty,
} from "store/actions"
import { connect } from "react-redux"
import { fromPairs } from "lodash"
import { useHistory } from "react-router-dom"

const Properties = props => {
  const [deleteOption, setDeleteOption] = useState(false)
  const history = useHistory()
  let propertyDatas = useSelector(state => state.propertyReducer.propertyData)
  const loading = props.error.loading
  const toggle = async () => {
    await props.clearError(false)
  }
  console.log("data", propertyDatas)

  useEffect(() => {
    let dummy = async () => {
      await props.fetchPropertyList()
    }
    dummy()
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    history.push(`/properties/${id}/dashboard/`)
  }

  return (
    <div className="page-content">
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <ReactTitle title="Properties" />

      <Container fluid className="mt-2">
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h5 className="page-title mb-5">Properties</h5>
            </Col>
          </Row>
          <Row>
            {propertyDatas
              ? propertyDatas.map(
                  item => (
                    // <Col key={item.id}>
                    <Card
                      key={item.id}
                      onClick={e => {
                        handleClick(e, item.id)
                      }}
                      className="col-3 ms-5 mx-3 card-stats mb-4 mb-lg-4"
                      outline
                      color="warning"
                      style={{ cursor: "pointer" }}
                    >
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle className="text-uppercase text-muted mb-0 pt-3 ps--3">
                              {/* {item.category} */}
                              {item.name == "prop edit"
                                ? "Villa"
                                : "Shopping mall"}
                            </CardTitle>
                            <span className="h2 font-weight-bold">
                              {item.name}
                            </span>
                            <br/>
                            {/* <span className="h2 font-weight-bold mt-4">
                              ₹ {item.due_amount}
                            </span> */}
                          </div>
                          <Col className="col-2">
                            <i
                              className="ti ti-server  text-danger me-0"
                              style={{ fontSize: "25px" }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter className="mb-3 bg-gray">
                        <span className="h2 font-weight-bold mb-0 text-success pe-2 float-end">
                          ₹ {item.due_amount}
                        </span>
                      </CardFooter>
                    </Card>
                  )
                  // </Col>
                )
              : "No Properties"}
          </Row>
        </div>
      </Container>
    </div>
  )
}
const mapStateToProps = state => {
  console.log("mapping..", state)
  return {
    propsData: state.propertyReducer.propertyData,
    error: state.propertyReducer.error,
    isLoading: state.propertyReducer.isLoading,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchPropertyData: () => dispatch(fetchPropertyData()),
//     apiError: () => dispatch(apiError()),
//   }
// }

export default withRouter(
  connect(mapStateToProps, {
    fetchPropertyList,
    apiError,
    clearError,
    deleteProperty,
  })(Properties)
)
