import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorModal from "components/Common/ErrorModal";
import { addUnitTransaction,clearUnitError,fetchUnitList,fetchTenantList } from "store/actions";

import Switch from "react-switch"
import { useSelector } from "react-redux";

const AddTransaction = props => {

  const switchOnColor = "#626ed4";
    const { propertyID, unitID } = useParams();
    useEffect(() => {
        let dummy = async () => {
            await props.fetchUnitList(propertyID);
        }
        dummy()
    }, []);
    useEffect(() => {
        let dummy = async () => {
            await props.fetchTenantList()
        }
        dummy()
    }, []);

  const loading = props.error.loading;

  const toggle = async() => {
   await props.clearUnitError(false);
  }

  const [transactionData, setTransactionData] = useState({
    tenant: '',
    unit: unitID,
    amount:null,
  })

  const history = useHistory();

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevState) => ({
     ...prevState,
     [name]: value,
   }));
  }
  const dispatch = useDispatch();

  const handleClick = (e) => {
      e.preventDefault();
      dispatch(addUnitTransaction(transactionData,history))
   console.log(transactionData)
  }
    let unitList = useSelector((state) => state.unitsReducer.unitsData);
    let tenantList = useSelector((state) => state.tenantReducer.tenantData)
  return (
    <div className="page-content">
    <Container fluid >
      {loading==true &&
       <ErrorModal error={props.error} toggle={toggle} ></ErrorModal>
      }
        <div className="mt-5 pt-3 ">
      <Row >
        <Col>
          <Card >
            <CardHeader>
                <h4 className="mt-2">Add Transaction</h4>
            </CardHeader>
            <CardBody className="pt-5 ">
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Tenant</Label>
                  <Input className="form-control-lg mb-4" type="select" name="tenant" onChange={inputsHandler}>
                  <option selected defaultValue={""} disabled>
                  Choose
                </option>
                {tenantList &&
                  tenantList.rows.map(item => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                  </Input>
                </Col>
                <Col md={5}>
                  <Label>Amount</Label>
                  <Input className="form-control-lg mb-4" type="text" name="amount" onChange={inputsHandler}>
                  </Input>
                </Col>
                {/* <Col md={5}>
                  <Label> Unit</Label>
                  <Input className="form-control-lg mb-4"   type="select" name="unit" onChange={inputsHandler}>
                  <option selected defaultValue={""} disabled>
                  Choose
                </option>
                {unitList &&
                  unitList.rows.map(item => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
                  </Input>
                </Col> */}
                </Row>
              
              <div className="justify-content-center text-center mb-5">
              <Button onClick={()=>props.history.push("./")} className="btn btn-lg btn-danger"  color="danger">Cancel</Button>
              <Button className="btn btn-lg btn-success ms-2"  color="success" onClick={handleClick} >Save</Button>
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
  return { error: state.unitsReducer.error,}
}
export default withRouter(connect(mapStateToProps,{clearUnitError,fetchUnitList,fetchTenantList})(AddTransaction))
