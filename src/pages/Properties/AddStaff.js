import React from "react";
import { useParams } from "react-router-dom";
import { clearError } from "store/actions";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  Button
} from "reactstrap"

// i18n
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const AddStaff = props => {
  const status = false;
  const loading = props.error.loading;
  const toggle = async() => {
   await props.clearError(status);
  }
  let { staffID } = useParams();
  return (
    <div className="page-content">
    <Container fluid >
      {loading==true &&
       <ErrorModal error={props.error} toggle={toggle} ></ErrorModal>
      }
          <div className="mt-5 pt-3">
      <Row>
        <Col>
          <Card>
            <CardHeader>
                <h4 className="mt-2">{ staffID==null?'Add Property Staff':'Edit Property Staff'}</h4>
            </CardHeader>
            <CardBody className="pt-5 ">
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Username</Label>
                  <Input className="mb-4" type="text"></Input>
                </Col>
                <Col md={5}>
                  <Label> Name</Label>
                  <Input className="mb-4"   type="number"></Input>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Phone</Label>
                  <Input className="mb-4"   type="tel"></Input>
                </Col>
                <Col md={5}>
                  <Label>Email</Label>
                  <Input className="mb-4"  type="email"></Input>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label> Type</Label>
                  <Input className="mb-4"   type="text"></Input>
                </Col>
                <Col md={5}>
                  <Label>Status</Label>
                  <Input className="mb-4"  type="text"></Input>
                </Col>
              </Row>
              <div className="justify-content-center text-center mb-5">
              <Button  color="danger">Cancel</Button>
              <Button color="success" className="ms-2" >Save</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
    </Row>
    </div>
    </Container>
    </div>
  )
}
const mapStateToProps = (state) => {
  return { error: state.propertyReducer.error,}
}

export default withRouter(connect(mapStateToProps,{clearError})(AddStaff))
