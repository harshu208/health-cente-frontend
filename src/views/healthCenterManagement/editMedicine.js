import React, { Component } from "react";
import { API } from "../../config";
import axios from "axios";
import Session from "react-session-api";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from "react-router-dom";

class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      quantity: '',      
      errorMessage: "",
      redirectToManageMedicine: false,
      validMedicine: false,
    }
    this.modifyMedicineDetails = this.modifyMedicineDetails.bind(this);
  }

  componentDidMount() {
    console.log('Medicine id : ' + this.props.match.params.id);
    axios.get(`${API}/medicines/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        const { id, name, description, quantity } = response.data.data;
        this.setState({
          id,
          name,
          description,
          quantity,
          validMedicine: true,
        });
      })
      .catch(error => console.log(error));
  }

  handleValidation() {
    if(this.state.name === ''){
      return ({
        errorMessage: 'Enter a valid name'
      });
    }
    if(this.state.description === ''){
      return ({
        errorMessage: 'Enter a valid description'
      });
    }    
    if(this.state.quantity === ''){
      return ({
        errorMessage: 'Enter a valid quantity'
      });
    }        
    return ({
      errorMessage: ''
    });
  }

  modifyMedicineDetails(e) {
    e.preventDefault();
    this.setState({
      errorMessage: ""
    });
    const {name,description,quantity}=this.state;
    // console.log(this.state);
    let formIsValid = this.handleValidation();
    if(formIsValid.errorMessage === ''){
        axios({
          method: 'put',
          url: `${API}/medicines/${this.state.id}`,
          //  timeout: 4000,    // 4 seconds timeout
          headers: {
              Accepts: 'application/json',
              "Content-Type": "application/json"
          },
          data: {
            name,
            description,
            quantity,
          }
      })
      .then(response => {
        console.log(response);
        this.setState({
          redirectToManageMedicine: true
        });
      })
      .catch(error => {
        console.log(error);
      });
      alert("Edit successful");
    }
    else{
      this.setState({
        errorMessage: formIsValid.errorMessage
      });
    }
  }

  render(props) {
    if(this.state.redirectToManageMedicine == true) {
      return (
        <Redirect to="/healthCenter/manage_medicines" />
      );
    }
    if(this.state.validMedicine === false) {
      return (
        <div>
          <h1>Edit Medicine</h1>
          <h3 className="text-center">Invalid Request</h3>
        </div>
      );
    }
    return (
      <div>
        <h1>Edit Medicine</h1>
        <br/>
        <Form onSubmit={(value) => this.modifyMedicineDetails(value)}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name of Medicine</Label>
                <Input type="text" name="name" id="name" defaultValue={this.state.name} 
                  onChange={(e)=>{
                    this.setState({name: e.target.value});
                  }}
                  />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
              <Label for="quantity">Quantity</Label>
                <Input type="number" name="quantity" id="quantity" defaultValue={this.state.quantity}
                  onChange={(e)=>{
                    this.setState({quantity: e.target.value});
                  }}                
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" defaultValue={this.state.description}
                  onChange={(e)=>{
                    this.setState({description: e.target.value});
                  }}                
                />
              </FormGroup>
            </Col>
          </Row>          
          <Row form>
            <Col md={12} className="text-center">
              <p className="text-danger">
                {this.state.errorMessage}
              </p>
            </Col>
          </Row>
          <Button type="submit" color="primary">Modify Medicine</Button>
        </Form>
      </div>
    );
  }
}
export default EditMedicine;
