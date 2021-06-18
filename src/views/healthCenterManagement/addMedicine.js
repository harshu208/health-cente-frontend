import React, { Component } from "react";
import { API } from "../../config";
import axios from "axios";
import Session from "react-session-api";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from "react-router-dom";

class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      quantity: 0,      
      errorMessage: "",
      redirectToManageMedicine: false,
      validMedicine: true,
    }
    this.addMedicineDetails = this.addMedicineDetails.bind(this);
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
    if(this.state.quantity === 0){
      return ({
        errorMessage: 'Enter a valid quantity'
      });
    }        
    return ({
      errorMessage: ''
    });
  }

  addMedicineDetails(e) {
    e.preventDefault();
    this.setState({
      errorMessage: ""
    });
    const {name,description,quantity}=this.state;
    // console.log(this.state);
    let formIsValid = this.handleValidation();
    if(formIsValid.errorMessage === ''){
        axios({
          method: 'post',
          url: `${API}/medicines`,
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
      alert("Medicine added successfully");
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
          <h1>Add Medicine</h1>
          <h3 className="text-center">Invalid Request</h3>
        </div>
      );
    }
    return (
      <div>
        <h1>Add Medicine</h1>
        <br/>
        <Form onSubmit={(value) => this.addMedicineDetails(value)}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name of Medicine</Label>
                <Input type="text" name="name" id="name" defaultValue={this.state.name} 
                  placeholder="Name of medicine"                
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
                  placeholder="Quantity of Medicine"
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
                <Input type="textarea" name="description" id="description" placeholder="Description of medicine"
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
          <Button type="submit" color="primary">Add Medicine</Button>
        </Form>
      </div>
    );
  }
}
export default AddMedicine;
