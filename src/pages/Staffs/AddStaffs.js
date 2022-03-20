import React, { useState } from "react"

import { useParams, useHistory } from "react-router-dom"
import MetaTags from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { addStaffAction, clearStaffError,apiErrorUsers } from "store/actions"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import ErrorModal from "components/Common/ErrorModal"

import { AvForm, AvField } from "availity-reactstrap-validation"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Label,
  Button,
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AddStaff = props => {
  const loading = props.error.loading

  const toggle = async () => {
    await props.clearStaffError(status)
  }

  let history = useHistory()

  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [mobile, setMobile] = useState(null)
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState("")
  const [password, setPassword] = useState("")
  const [passagain, setPassagain] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    var staffData = {
      name,
      username,
      mobile,
      email,
      user_type: userType,
      password,
    }
    let error = false
    if(!username.length > 0) {
      dispatch(apiErrorUsers("Username is required"))
      error = true
      toggleTab(1)
    } else if(!password.length > 0) {
      dispatch(apiErrorUsers("Password is required"))
      error = true
      toggleTab(1)
    } else if(!passagain.length > 0) {
      dispatch(apiErrorUsers("Please confirm password"))
      error = true
      toggleTab(1)
    } else if(password != passagain) {
      dispatch(apiErrorUsers("Please confirm valid password"))
      error = true
      toggleTab(1)
    } else if(!name.length > 0) {
      dispatch(apiErrorUsers("Name is required"))
      error = true
    } else if(!email.length > 0) {
      dispatch(apiErrorUsers("Email is required"))
      error = true
    } else if(!mobile.length > 0) {
      dispatch(apiErrorUsers("Mobile Number is required"))
      error = true
    } else if(!userType.length > 0) {
      dispatch(apiErrorUsers("User Type is required"))
      error = true
    } 

    console.log("The staff data", staffData)
    if(!error){
      let response = await dispatch(addStaffAction(staffData, history))
      console.log("dispatch response", response)
    }
  }

  const [activeTab, setactiveTab] = useState(1)
  const [activeTabProgress, setactiveTabProgress] = useState(1)
  const [progressValue, setprogressValue] = useState(50)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 2) {
        setactiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 2) {
        setoggleTabVertical(tab)
      }
    }
  }

  function toggleTabProgress(tab) {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTabProgress(tab)

        if (tab === 1) {
          setprogressValue(50)
        }
        if (tab === 2) {
          setprogressValue(100)
        }
      }
    }
  }

  const Submit = () => {
    if (activeTab === 2) {
      return (
        <div className="mt-3">
          <Button
            onClick={() => history.push("/staffs")}
            className="btn btn-lg btn-danger"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={e => handleSubmit(e)}
            className="btn btn-lg btn-success ms-2"
          >
            Submit
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          onClick={() => history.push("/staffs")}
          className="btn btn-danger"
        >
          Cancel
        </Button>
      )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content mt-5">
        {loading == true && (
          <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
        )}
        <Container fluid={true}>
          <Breadcrumbs title="Users" breadcrumbItem="Add Users" />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {/* <h4 className="card-title mb-4">Basic Wizard</h4> */}
                  <div className="form-horizontal form-wizard-wrapper wizard clearfix">
                    <div className="steps clearfix">
                      <ul className="d-flex justify-content-center bg-red col-12">
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                          >
                            <span className="number">1.</span> Account Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                          >
                            <span className="number">2.</span> Basic Details
                          </NavLink>
                        </NavItem>
                        {/* <NavItem className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                          >
                            <span className="number">3.</span>
                          Bank Details
                        </NavLink>
                        </NavItem> */}
                        {/* <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4)
                            }}
                          >
                            <span className="number">4.</span>
                          Confirm Detail
                        </NavLink>
                        </NavItem> */}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <AvForm className="needs-validation">
                            <Row className="d-flex flex-column justify-content-center align-items-center">
                              <Col xl={5}>
                                <Label>Username</Label>
                                <AvField
                                  name="username"
                                  type="text"
                                  errorMessage="Enter User Name"
                                  onChange={e => setUsername(e.target.value)}
                                  className="form-control-lg mb-4"
                                  validate={{ required: { value: true } }}
                                />
                              </Col>
                              <Col xl={5}>
                                <Label>Password</Label>
                                <AvField
                                  name="password"
                                  type="password"
                                  errorMessage="Enter Password"
                                  onChange={e => setPassword(e.target.value)}
                                  className="form-control-lg mb-4"
                                  validate={{ required: { value: true } }}
                                />
                              </Col>
                              <Col xl={5}>
                                <Label>Confirm Password</Label>
                                <AvField
                                  name="password1"
                                  type="password"
                                  errorMessage="Enter Re-password"
                                  className="form-control-lg mb-4"
                                  onChange={e => setPassagain(e.target.value)}
                                  validate={{
                                    required: { value: true },
                                    match: { value: "password" },
                                  }}
                                />
                              </Col>
                            </Row>
                          </AvForm>
                        </TabPane>

                        <TabPane tabId={2}>
                          <AvForm className="needs-validation">
                            <Row className="justify-content-center">
                              <Col md={8}>
                                <Label>Name</Label>
                                <AvField
                                  name="name"
                                  type="text"
                                  errorMessage="Enter Name"
                                  onChange={e => setName(e.target.value)}
                                  className="form-control-lg mb-4"
                                  validate={{ required: { value: true } }}
                                />
                              </Col>
                              <Col md={8}>
                                <Label>Email</Label>
                                <AvField
                                  name="email"
                                  type="email"
                                  className="form-control-lg mb-4"
                                  onChange={e => setEmail(e.target.value)}
                                  errorMessage="Invalid Email"
                                  validate={{
                                    required: { value: true },
                                    email: { value: true },
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row className="justify-content-center">
                              <Col md={8}>
                                <Label>Mobile</Label>
                                <AvField
                                  name="mobile"
                                  type="number"
                                  className="form-control-lg mb-4"
                                  errorMessage="Enter Mobile Number"
                                  onChange={e => setMobile(e.target.value)}
                                  validate={{
                                    required: { value: true },
                                    pattern: {
                                      value: "^[0-9]+$",
                                      errorMessage: "Only Digits",
                                    },
                                  }}
                                />
                              </Col>
                              <Col md={8}>
                                <Label> User Type</Label>
                                <Input
                                  className="form-control-lg mb-4"
                                  type="select"
                                  onChange={e => setUserType(e.target.value)}
                                >
                                  <option selected value="" disabled>
                                    Choose
                                  </option>
                                  <option value="landlord">Landlord</option>
                                  <option value="gm">General Manager</option>
                                  <option value="ca">C Accountant</option>
                                  <option value="staff">Staff</option>
                                  <option value="tenant">Tenant</option>
                                  <option value="admin">Admin</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center">
                              <Col className="d-flex justify-content-center align-items-center">
                                <Submit />
                              </Col>
                            </Row>
                          </AvForm>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul className="d-flex justify-content-center align-items-center">
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 2 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
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
  return { error: state.userReducer.error }
}

export default withRouter(
  connect(mapStateToProps, { addStaffAction, clearStaffError,apiErrorUsers })(AddStaff)
)
