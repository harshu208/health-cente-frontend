import React, { Component } from "react";
import { API } from "../../config";
import axios from "axios";
import Session from "react-session-api";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from "react-router-dom";

class EditManufacturer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      address: '',
      city: '',      
      email: '',
      errorMessage: "",
      redirectToManageManufacturer: false,
      validManufacturer: false,
    }
    this.modifyManufacturerDetails = this.modifyManufacturerDetails.bind(this);
  }

  componentDidMount() {
    console.log('Manufacturer id : ' + this.props.match.params.id);
    axios.get(`${API}/manufacturers/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        const { id, name, address, city, email } = response.data.data;
        this.setState({
          id,
          name,
          address,
          city,
          email,
          validManufacturer: true,
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
    if(this.state.address === ''){
      return ({
        errorMessage: 'Enter a valid address'
      });
    }    
    if(this.state.city === ''){
      return ({
        errorMessage: 'Enter a valid city'
      });
    }        
    if(this.state.email === ''){
      return ({
        errorMessage: 'Enter a valid email'
      });
    }
    return ({
      errorMessage: ''
    });
  }

  modifyManufacturerDetails(e) {
    e.preventDefault();
    this.setState({
      errorMessage: ""
    });
    const {name,address,city,email}=this.state;
    // console.log(this.state);
    let formIsValid = this.handleValidation();
    if(formIsValid.errorMessage === ''){
        axios({
          method: 'put',
          url: `${API}/manufacturers/${this.state.id}`,
          //  timeout: 4000,    // 4 seconds timeout
          headers: {
              Accepts: 'application/json',
              "Content-Type": "application/json"
          },
          data: {
            name,
            address,
            city,
            email,
          }
      })
      .then(response => {
        console.log(response);
        this.setState({
          redirectToManageManufacturer: true
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
    if(this.state.redirectToManageManufacturer == true) {
      return (
        <Redirect to="/healthCenter/manage_manufacturers" />
      );
    }
    if(this.state.validManufacturer === false) {
      return (
        <div>
          <h1>Edit Manufacturer</h1>
          <h3 className="text-center">Invalid Request</h3>
        </div>
      );
    }
    return (
      <div>
        <h1>Edit Manufacturer</h1>
        <br/>
        <Form onSubmit={(value) => this.modifyManufacturerDetails(value)}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name of Manufacturer</Label>
                <Input type="text" name="name" id="name" defaultValue={this.state.name} 
                  onChange={(e)=>{
                    this.setState({name: e.target.value});
                  }}
                  />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
              <Label for="city">City</Label>
                <Input type="text" name="city" id="city" defaultValue={this.state.city}
                  onChange={(e)=>{
                    this.setState({city: e.target.value});
                  }}                
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type="textarea" name="address" id="address" defaultValue={this.state.address}
                  onChange={(e)=>{
                    this.setState({address: e.target.value});
                  }}                
                />
              </FormGroup>
            </Col>
          </Row>          
          <Row form>
            <Col>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" defaultValue={this.state.email}
                  onChange={(e)=>{
                    this.setState({email: e.target.value});
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
          <Button type="submit" color="primary">Modify Manufacturer</Button>
        </Form>
      </div>
    );
  }
}
export default EditManufacturer;
