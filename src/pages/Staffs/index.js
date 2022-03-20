import React, { useEffect, useState } from "react"
import { ReactTitle } from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
} from "reactstrap"

import { MDBDataTable } from "mdbreact"

import { useSelector, shallowEqual } from "react-redux"

import { Link } from "react-router-dom"

import { fetchUserList,deleteUser,apiError } from "store/actions"

import { withRouter } from "react-router-dom"
import DeleteModal from "components/Common/DeleteModal"
import { connect } from "react-redux"

const Users = props => {
  let userDatas = useSelector(state => state.userReducer.userData);
  const [deleteOption, setDeleteOption] = useState(false)
  const [dataID, setDataID] = useState(0);

  const cancelDelete = () => {
    setDeleteOption(!deleteOption)
  }

  useEffect(() => {
    let dummy = async () => {
      await props.fetchUserList()
    }
    dummy()
  }, [])
  
  const delete_user = (e, id) => {
    e.preventDefault();
    setDataID(id);
    console.log(dataID)
    setDeleteOption(true)
  }



    props.userData.rows.forEach(row => {
      row.view = (
        <div>
        <Link to={`/staffs/${row.id}/dashboard`}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link>
        {/* <Link to={'uu'}>
          <Button color="primary" size="sm" outline className="me-1">
            <i className="mdi mdi-eye " />
          </Button>
        </Link> */}
        <Button onClick={(e)=>delete_user(e,row.id)} color="danger" size="sm" outline>
          <i className="mdi mdi-delete " />
        </Button>
      </div>
      )
    })

  console.log(typeof props.userData)
  

  return (
    <div className="page-content">
      <DeleteModal toggle={deleteOption} deleteFunction={props.deleteUser} dataID={dataID} forClose={cancelDelete} />
      <ReactTitle title="Users" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="mt-4">
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <h5>Users list</h5>
                    </Col>
                    <Col>
                      <div className="float-end ">
                        <Link to={"/staffs/add-staffs"}>
                          <Button color="primary" size="md">
                            <i className="mdi mdi-plus " /> Add
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <MDBDataTable
                    hover
                    responsive
                    data={props.userData}
                    barReverse
                    noBottomColumns
                    tbodyColor="align-middle"
                    order={["name", "asc"]}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  console.log("mapping", state)
  return {
    userData: state.userReducer.userData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
    deleteUser: (dataID) => dispatch(deleteUser(dataID)),
    apiError: () => dispatch(apiError()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))
