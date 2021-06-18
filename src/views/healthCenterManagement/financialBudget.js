import React, { Component } from "react";
import { API } from '../../config';
import axios from "axios";
import MaterialTable from "material-table";
import Session from "react-session-api";
import {Table, Modal, ModalHeader, ModalBody, Button, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

class FinancialBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: [],
      modal: false,
    };
    this.toggle=this.toggle.bind(this);
  }

  getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
    return fiscalyear
  }

  toggle()
  {
    this.setState({modal: !this.state.modal});
  }

  getBudgetDetails() {
    axios.get(`${API}/budget`)
      .then(response => {
        this.setState({
          budget: response.data.data,
        });
      })
      .catch(error => console.log(error));
  }

  editBudgetWithId = (id, year, amount) => {
    // console.log("Budget with id: "+id+" is redirected to edit - " + `/budgetManagement/edit_budget/${id}`);
    this.setState({selectedId: id});    
    this.setState({selectedYear: year});    
    this.setState({selectedAmount: amount});
    this.toggle();            
  }

  componentDidMount() {
    this.getBudgetDetails();
  }

  render(props) {
    return (
      <div>
        <h1>Financial Budget</h1>
        <div>
          <Link className="btn btn-primary"  to="/healthCenter/add_budget"><i className="fa fa-plus"></i>&nbsp; <span>Add Year</span></Link>
        </div>
        <br/>
        <Table bordered className="bg-light" >
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Budget</th>
              <th>Edit Budget</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.budget && this.state.budget.map((budget,i) => {
                const {id, year, amount} = budget;
                return (
                  <tr key={id} className="text-dark">
                    <th scope="row">{i+1}</th>
                    <td>{year}</td>
                    <td>{amount}</td>
                    <td>
                      {
                        year===this.getCurrentFinancialYear()?                      <i className="fa fa-pencil-alt" onClick={() => this.editBudgetWithId(id,year,amount)} style={{cursor:'pointer'}}></i>
                        :<i className="fa fa-lock"/>
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={true}>
        <ModalHeader toggle={this.toggle}>Modify Budget</ModalHeader>
        <ModalBody>
          <Form >
            <FormGroup>
              <Label for="year">Year</Label>
              <Input type="text" name="year" id="year" value={this.state.selectedYear} 
                    disabled
                />
            </FormGroup>
            <FormGroup>
            <Label for="amount">Budget</Label>
              <Input type="number" name="amount" id="amount" defaultValue={this.state.selectedAmount}
                     onChange={(e)=>{
                       this.setState({selectedAmount: e.target.value});
                     }}/>                
            </FormGroup>
          </Form>
         </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{
        axios({
          method: 'put',
          url: `${API}/budget/${this.state.selectedId}`,
          headers: {
              Accepts: 'application/json',
              "Content-Type": "application/json"
          },
          data: {
            year: this.state.selectedYear,
            amount: this.state.selectedAmount,
          }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
      alert("Edit successful");
      this.toggle();}
      }>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>        
      </div>
    );
  }
}
export default withRouter(FinancialBudget);
