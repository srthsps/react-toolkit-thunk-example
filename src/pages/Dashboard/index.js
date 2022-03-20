import React, { useEffect, useState } from "react"
import { ReactTitle } from "react-meta-tags"
import Skelton from "components/Common/Skelton"
import ErrorModal from "components/Common/ErrorModal"
import CardLoader from "components/Common/cardLoader"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  ButtonGroup,
} from "reactstrap"
import { Link, useHistory } from "react-router-dom"

// i18n
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { connect } from "react-redux"
import {
  fetchCardDataAction,
  fetchRecentTransaction,
  fetchSoonExpireList,
  clearErrorDashboardAction,
  fetchAttendanceStatusAction,
} from "store/actions"
import { useSelector } from "react-redux"

const Dashboard = props => {
  const history = useHistory()
  const rangeValues = ["Day", "Week", "Month"]
  const [activeRange, setActiveRange] = useState(0)
  const loading = props.error.loading
  useEffect(() => {
    let dummy = async () => {
      await props.fetchCardDataAction()
    }
    dummy()
  }, [])
  useEffect(() => {
    let dummy = async () => {
      await props.fetchRecentTransaction()
      await props.fetchSoonExpireList()
      await props.fetchAttendanceStatusAction()
    }
    dummy()
  }, [])

  const toggle = async () => {
    await props.clearErrorDashboardAction(false)
  }

  const headerCardData = useSelector(
    state => state.dashboardReducer.headerCardData
  )

  const activityData = [
    { id: 203, date: "Jan 22", content: "Lorem ipsum dolor sit amet" },
    { id: 204, date: "Jan 20", content: "Lorem ipsum dolor sit amet" },
    { id: 205, date: "Jan 18", content: "Lorem ipsum dolor sit amet" },
    { id: 206, date: "Jan 15", content: "Lorem ipsum dolor sit amet" },
    { id: 207, date: "Jan 11", content: "Lorem ipsum dolor sit amet" },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        {loading == true && (
          <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
        )}
        <ReactTitle title="Downtown Dashboard" />

        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Rentpe</li>
                </ol>
              </Col>

              {/* <Col>
                <div className="float-end">
                  <ButtonGroup>
                    {rangeValues.map((item, index) =>
                      <Button color="primary" key={index} onClick={() => setActiveRange(index)}
                        active={index == activeRange}>
                        {item}
                      </Button>)}
                  </ButtonGroup>
                </div>
              </Col> */}
            </Row>
          </div>
          <Row>
            {headerCardData.map((headerCard, index) => (
              <Col xl={3} md={6} key={index}>
                <Card
                  className="mini-stat  text-white"
                  style={{ background: "#F89A1B" }}
                >
                  {props.isLoading ? (
                    <CardLoader />
                  ) : (
                    <CardBody>
                      <div className="mb-4">
                        <div className="float-start mini-stat-img me-4">
                          <img
                            src={headerCard.icon}
                            alt={`${headerCard.title} icon`}
                          />
                        </div>
                        <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                          {headerCard.title}
                        </h5>
                        <h4 className="fw-medium font-size-24">
                          {index < 2
                            ? "₹ " + headerCard.value
                            : headerCard.value}
                          {/* <i className={`mdi ms-2 */}
                          {/* // ${headerCard.change >= 0 ? 'mdi-arrow-up text-success' : 'mdi-arrow-down text-danger'}`}></i> */}
                        </h4>
                        <div
                          className={`mini-stat-label ${
                            headerCard.change >= 0 ? "bg-success" : "bg-danger"
                          }`}
                        >
                          <p className="mb-0 py-2">
                            {/* {`${headerCard.change >= 0 ? '+' : ''}${headerCard.change}%`} */}{" "}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="float-end">
                          <Link to={headerCard.link} className="text-white-50">
                            <i className="mdi mdi-arrow-right h5"></i>
                          </Link>
                        </div>
                        {/* <p className="text-white-50 mb-0 mt-1">Since Last {rangeValues[activeRange]}</p> */}
                      </div>
                    </CardBody>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Transactions</h4>
                  <div className="table-responsive">
                    {props.isLoading ? (
                      <Skelton />
                    ) : (
                      <table className="table table-hover table-centered table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Tenant</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.transactionData.map(item => (
                            <tr key={item.id}>
                              <th scope="row">{item.id}</th>
                              <td>
                                <div>
                                  {/* <img
                                  src={item.icon} alt={`${item.name}'s avatar`}
                                  className="avatar-xs rounded-circle me-2"
                                /> */}
                                  {item.unit}
                                </div>
                              </td>
                              <td>{item.tenant}</td>
                              <td>₹{item.amount}</td>
                              {/* <td>
                                <div>
                                  <Link
                                    to="/transactions"
                                    className="btn btn-primary btn-sm"
                                  >
                                    View
                                  </Link>
                                </div>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={4}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Soon to be Expired</h4>
                  <ol className="activity-feed">
                    {props.activityData.map(item => (
                      <li className="feed-item" key={item.id}>
                        <div className="feed-item-list">
                          <div className="row d-flex justify-content-between">
                            <div className="col-6">
                              <span className="date">{item.end_date}</span>
                              <span className="activity">
                                Tenant- {item.tenant}
                              </span>
                              <br />
                              <span className="activity-text text-nowrap">
                                Unit- {item.unit}
                              </span>
                            </div>
                            <div className="col-6">
                              <button
                                onClick={()=>history.push(`properties/${item.property_id}/dashboard/units/`)}
                                className="btn btn-sm btn-outline-primary float-end"
                              >
                                Renew
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {/* <div className="text-center">
                    <Link to="#" className="btn btn-primary">
                      Load More
                    </Link>
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  return {
    headerCardData: state.dashboardReducer.headerCardData,
    transactionData: state.dashboardReducer.transactionData,
    isLoading: state.dashboardReducer.isLoading,
    error: state.dashboardReducer.error,
    activityData: state.dashboardReducer.activityData,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchCardDataAction,
    fetchSoonExpireList,
    fetchRecentTransaction,
    clearErrorDashboardAction,
    fetchAttendanceStatusAction,
  })(Dashboard)
)
