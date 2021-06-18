import React, { Component } from "react";
import { API } from "../../config";
import axios from "axios";
import Session from "react-session-api";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from "react-router-dom";

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      year: '',
      amount: 0,      
      errorMessage: "",
      redirectToManageBudget: false,
      validBudget: true,
    }
    this.addBudgetDetails = this.addBudgetDetails.bind(this);
  }

  handleValidation() {
    if(this.state.year === ''){
      return ({
        errorMessage: 'Enter a valid year'
      });
    }
    if(this.state.amount === 0){
      return ({
        errorMessage: 'Enter a valid amount'
      });
    }        
    return ({
      errorMessage: ''
    });
  }

  addBudgetDetails(e) {
    e.preventDefault();
    this.setState({
      errorMessage: ""
    });
    const {year,amount}=this.state;
    // console.log(this.state);
    let formIsValid = this.handleValidation();
    if(formIsValid.errorMessage === ''){
        axios({
          method: 'post',
          url: `${API}/budget`,
          headers: {
              Accepts: 'application/json',
              "Content-Type": "application/json"
          },
          data: {
            year,
            amount,
          }
      })
      .then(response => {
        console.log(response);
        this.setState({
          redirectToManageBudget: true
        });
      })
      .catch(error => {
        console.log(error);
      });
      alert("Budget added successfully");
    }
    else{
      this.setState({
        errorMessage: formIsValid.errorMessage
      });
    }
  }

  render(props) {
    if(this.state.redirectToManageBudget == true) {
      return (
        <Redirect to="/healthCenter/financial_budget" />
      );
    }
    if(this.state.validBudget === false) {
      return (
        <div>
          <h1>Add Year</h1>
          <h3 className="text-center">Invalid Request</h3>
        </div>
      );
    }
    return (
      <div>
        <h1>Add Year</h1>
        <br/>
        <Form onSubmit={(value) => this.addBudgetDetails(value)}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="year">Financial Year</Label>
                <Input type="text" name="year" id="year" 
                  placeholder="2021-2022"                
                  onChange={(e)=>{
                    this.setState({year: e.target.value});
                  }}
                  />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
              <Label for="amount">Budget</Label>
                <Input type="number" name="amount" id="amount" defaultValue={this.state.amount}
                  placeholder="Amount of Budget (in INR)"
                  onChange={(e)=>{
                    this.setState({amount: e.target.value});
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
          <Button type="submit" color="primary">Add Budget</Button>
        </Form>
      </div>
    );
  }
}
export default AddBudget;
