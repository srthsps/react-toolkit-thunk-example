import React,{useState,useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { fetchPropertyDetails,setProperties,clearError,apiError,fetchCategoryList,fetchSubCategoryList,clearCategoryError} from "store/actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import ErrorModal from "components/Common/ErrorModal";
const status = false;
const AddProperty = props => {
  const loading = props.error.loading||props.cate_error.loading ;
  const toggle = async () => {
    if (props.error.loading) {
      await props.clearError(status);
    } else {
      await props.clearCategoryError(status)
    }
  }
  let history = useHistory();
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState(null);
  const [sub_category, setSubCategory] = useState(null);
  var user = {
    name,
    location: {
      locality,
      state,
      district,
      pincode:''
    },
    category,
    sub_category
  }
  let { propertyID } = useParams();
  
    useEffect(() => {
      let dummy = async () => {
        if (propertyID != null) {
          await props.fetchPropertyDetails(propertyID);
          console.log('112',propertyDetails.category)
          await props.fetchSubCategoryList(propertyDetails.category)
          
        }
        await props.fetchCategoryList();
      }
      dummy()
    }, []);
  if (propertyID == undefined) {
    useEffect(() => {
      let dummy = async () => {
        if (category != null)
          await props.fetchSubCategoryList(category)
      }
      dummy()
    }, [category]);
  }
  let propertyDetails = useSelector((state) => state.propertyReducer.propertyDetailsData);
  let categories = useSelector((state) => state.categoryReducer.categories);
  let subCategories = useSelector((state) => state.categoryReducer.sub_categories);
  const handleClick = async (e) => {
    e.preventDefault(); 
    let error = false
    if(name==='') {
      dispatch(apiError("Name is required"))
      error = true
    } else if(locality==='') {
      dispatch(apiError("Location is required"))
      error = true
    } else if(category === null) {
      dispatch(apiError("Category is required"))
      error = true
    } else if(sub_category===null) {
      dispatch(apiError("Sub category is required"))
      error = true
    }
    console.log(user)
    if (!error) {
      let response = await dispatch(setProperties(user, history, propertyID));
      console.log(response);
      
    } 
  }



  return (
    <div className="page-content">
      <Container fluid className="mt-5">
      {loading == true && (
          <ErrorModal error={props.error||props.cate_error  }  toggle={toggle}></ErrorModal>
        )}
          <div className="">
      <Row>
        <Col>
          <Card className="card shadow-lg rounded">
            <CardHeader className="">
                <h4 className="">{ propertyID==null?'Add Property':'Edit Property'}</h4>
            </CardHeader>
            <CardBody className="pt-5 ">
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Name</Label>
                  <Input className="form-control-lg mb-4" type="text" defaultValue={propertyDetails.name||""}   onChange={(e)=>setName(e.target.value)}></Input>
                </Col>
                <Col md={5}>
                      <Label> State</Label>
                  <Input className="form-control-lg mb-4"   type="text" defaultValue={props.propsData && props.propsData.location && props.propsData.location.state}  onChange={(e)=>setState(e.target.value)}></Input>
                </Col>
                  </Row>
                  <Row className="justify-content-center">
                <Col md={5}>
                  <Label>District</Label>
                  <Input className="form-control-lg mb-4" type="text" defaultValue={props.propsData && props.propsData.location && props.propsData.location.district}  onChange={(e)=>setDistrict(e.target.value)}></Input>
                </Col>
                <Col md={5}>
                      <Label> Locality</Label>
                  <Input className="form-control-lg mb-4"   type="text" defaultValue={props.propsData && props.propsData.location && props.propsData.location.locality}  onChange={(e)=>setLocality(e.target.value)}></Input>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={5}>
                  <Label>Category</Label>
                      <Input
                        className="form-control-lg mb-4"
                        type="select"
                        onChange={(e) => setCategory(e.target.value)}
                        defaultValue={propertyDetails.category || ''} >
                        <option selected value="" disabled>Choose</option>
                        {categories && categories.map(item => <option key={item.id} value={item.id}> { item.name}</option>)}                        
                        </Input>
                </Col>
                <Col md={5}>
                  <Label>Sub Category</Label>
                      <Input
                        className="form-control-lg mb-4"
                        type="select"
                        onChange={(e) => setSubCategory(e.target.value)}
                        defaultValue={propertyDetails.sub_category || ''}>
                        <option selected value="" disabled>Choose</option>
                        {subCategories && subCategories.map(subItem => <option key={subItem.id} value={subItem.id}>{ subItem.name}</option>)}                        
                        </Input>
                </Col>
              </Row>
              <div className="justify-content-center text-center mb-5">
              <Button onClick={()=>history.push("/properties")}  color="btn btn-lg btn-danger">Cancel</Button>
              <Button color="btn btn-lg btn-success" className="ms-2" onClick={handleClick} >Save</Button>
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
  return {
    cate_error:state.categoryReducer.error,
    error: state.propertyReducer.error,
    propsData: state.propertyReducer.propertyDetailsData,
    categoryData: state.categoryReducer.categories,
    subCategoryData: state.categoryReducer.sub_categories
  }
}

export default withRouter(connect(mapStateToProps,{fetchPropertyDetails,fetchCategoryList,setProperties,clearError,apiError,fetchSubCategoryList,clearCategoryError})(AddProperty))
