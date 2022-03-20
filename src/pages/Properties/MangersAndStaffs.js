import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import Skelton from "components/Common/Skelton"
import ErrorModal from "components/Common/ErrorModal"
import AssignStaff from "./AssignStaff"

import { MDBDataTable } from "mdbreact"

import {
  fetchPropertyStaffList,
  fetchUserList,
  assignPropertyStaffAction,
  clearError,
} from "store/actions"
import { useHistory, useParams } from "react-router-dom"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { connect, useDispatch } from "react-redux"

const MangersAndStaffs = props => {
  const status = false

  const loading = props.error.loading

  const dispatch = useDispatch()

  const history = useHistory()

  const toggle = async () => {
    await props.clearError(status)
  }

  const [toggleAssignStaff, setToggleAssignStaff] = useState(false)

  const { propertyID } = useParams()

  const [user, setUser] = useState(null)
  const [user_type, setUserType] = useState("")
  const [property, setProperty] = useState(propertyID)

  // useEffect(() => {
  //   let dummy = async () => {
  //     await props.fetchPropertyStaffList(propertyID)
  //   }
  //   dummy()
  // }, [])

  // useEffect(() => {
  //   let dummy = async () => {
  //     await props.fetchUserList()
  //   }
  //   dummy()
  // }, [])

  const assignStaffFn = async e => {
    e.preventDefault()

    let propertyStaffData = {
      user: user,
      property: property,
      user_type: user_type,
    }

    console.log(propertyStaffData)
    
    let error = false
    
    // if(!error) {
      let response = dispatch(props.assignPropertyStaffAction(propertyStaffData,history))
      console.log("res",response)
    // }
  }

  // let managersData = useSelector((state) => state.propertyReducer.ManagersData)

  props.staffData.rows.forEach(row => {
    row.view = (
      <div>
        {/* <Link to={`/properties/${row.id}/edit-staff`}>
        <Button color="primary" size="sm" outline className="me-1">
          <i className="mdi mdi-pen " />
        </Button>
     </Link> */}
        <Link to={`/properties/${propertyID}/dashboard/staffs/${row.id}/staff-profile`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link>
        <Link to={`/transactions/${row.id}/dashboard`}>
          <Button color="danger" size="sm" outline>
            <i className="mdi mdi-delete " />
          </Button>
        </Link>
      </div>
    )

    row.statusPill = (
      <span
        className={`rounded-pill text-light
        ${row.status == "Active" ? "bg-success" : "bg-danger"}`}
      >
        {row.status}
      </span>
    )
  })

  return (
    <Container fluid>
      {loading == true && (
        <ErrorModal error={props.error} toggle={toggle}></ErrorModal>
      )}
      <div className="page-title-box">
        <Row className="align-items-center pb-4">
          <Col>
            <h6 className="page-title">Staff list</h6>
          </Col>
          <Col>
            <div className="float-end">
              <Button onClick={()=>setToggleAssignStaff(true)} color="primary" size="md" className="">
                <i className="mdi mdi-plus " /> Add
              </Button>
            </div>
          </Col>
        </Row>

        <AssignStaff
          toggle={toggleAssignStaff}
          setToggle={setToggleAssignStaff}
          user={user}
          user_type={user_type}
          setUser={setUser}
          setUserType={setUserType}
          userList={props.userData}
          assignStaffFn={assignStaffFn}
        />
        <Row className="">
          <Col>
            <Card>
              <CardBody>
                {props.isLoading ? (
                  <Skelton />
                ) : (
                  <MDBDataTable
                    striped
                    hover
                    responsive
                    data={props.staffData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  console.log("mapping", state)
  return {
    staffData: state.propertyReducer.staffDataList,
    error: state.propertyReducer.error,
    userError: state.userReducer.error,
    isLoading: state.propertyReducer.isLoading,
    userData: state.userReducer.userData,
  }
}
export default withRouter(
  connect(mapStateToProps, {
    fetchPropertyStaffList,
    assignPropertyStaffAction,
    fetchUserList,
    clearError,
  })(MangersAndStaffs)
)
