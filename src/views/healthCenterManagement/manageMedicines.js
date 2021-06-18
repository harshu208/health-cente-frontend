import React, { Component } from "react";
import { API } from '../../config';
import axios from "axios";
import MaterialTable from "material-table";
import Session from "react-session-api";
import {Table} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

class ManageMedicines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
      filtermedicines:[]
    };
  }

  getMedicinesDetails() {
    axios.get(`${API}/medicines`)
      .then(response => {
        this.setState({
          medicines: response.data.data,
          filtermedicines:response.data.data,
        });
      })
      .catch(error => console.log(error));
  }
 handleSearch=(e)=>{
  let value = e.target.value.toLowerCase();
  let result = [];
  console.log(value);
  console.log(this.medicines);
  result = this.state.medicines.filter((data) => {
  return data.name.toLowerCase().search(value) != -1;
 });
  this.setState({
    filtermedicines: result
  });

  //result=this.medicines;
  console.log(result);
  }
  editMedicineWithId = (id) => {
    // console.log("Medicine with id: "+id+" is redirected to edit - " + `/medicineManagement/edit_medicine/${id}`);
    this.props.history.push(`/healthCenter/edit_medicine/${id}`);
  }

  deleteMedicineWithId = (id) => {
    // console.log("Manufacturer with id: "+id+" is redirected to edit - " + `/manufacturerManagement/edit_manufacturer/${id}`);
   axios.delete(`${API}/medicines/${id}`).then((response)=>{
     console.log(response);
     alert("medicine deleted");

     const result=this.state.medicines.filter(item=>item.id!=id);
     this.setState({
       medicines:result,
       filtermedicines:result
     })
   })

    
  }


  componentDidMount() {
    this.getMedicinesDetails();
  }

  render(props) {
    return (
      <div>
        <h1>Manage Medicines</h1>
        <div>
          <Link className="btn btn-primary"  to="/healthCenter/add_medicine"><i className="fa fa-plus"></i>&nbsp; <span>Add Medicine</span></Link>
          <label>Search:</label>

          <input type="text" onChange={(event) =>this.handleSearch(event)} />

        </div>
        <br/>
        <Table bordered className="bg-light" >
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Medicine</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Edit Medicine</th>
              <th>Delete Medicine</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filtermedicines && this.state.filtermedicines.map((medicine,i) => {
                const {id, name, description, quantity} = medicine;
                return (
                  <tr key={id} className="text-dark">
                    <th scope="row">{i+1}</th>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{quantity}</td>
                    <td><i className="fa fa-pencil-alt" onClick={() => this.editMedicineWithId(id)} style={{cursor:'pointer'}}></i></td>
                    <td><DeleteIcon onClick={() => this.deleteMedicineWithId (id)} style={{cursor:'pointer'}}/></td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
export default withRouter(ManageMedicines);
