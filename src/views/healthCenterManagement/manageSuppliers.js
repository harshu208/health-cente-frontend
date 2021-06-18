import React, { Component } from "react";
import { API } from '../../config';
import axios from "axios";
import MaterialTable from "material-table";
import Session from "react-session-api";
import {Table} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
class ManageSuppliers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      filtersuppliers:[]
    };
  }

  getSuppliersDetails() {
    axios.get(`${API}/suppliers`)
      .then(response => {
        this.setState({
          suppliers: response.data.data,
          filtersuppliers: response.data.data,
        });
      })
      .catch(error => console.log(error));
  }

  editSupplierWithId = (id) => {
    // console.log("Manufacturer with id: "+id+" is redirected to edit - " + `/manufacturerManagement/edit_manufacturer/${id}`);
    this.props.history.push(`/healthCenter/edit_supplier/${id}`);
  }

  deleteSupplierWithId = (id) => {
    // console.log("Manufacturer with id: "+id+" is redirected to edit - " + `/manufacturerManagement/edit_manufacturer/${id}`);
   axios.delete(`${API}/supplier/${id}`).then((response)=>{
     console.log(response);
     alert("supplier deleted");

     const result=this.state.suppliers.filter(item=>item.id!=id);
     this.setState({
       suppliers:result,
       filtersuppliers:result
     })
   })

    
  }

  componentDidMount() {
    this.getSuppliersDetails();
  }
  handleSearch=(e)=>{
    let value = e.target.value.toLowerCase();
    let result = [];
    console.log(value);
    console.log(this.state.suppliers);
    result = this.state.suppliers.filter((data) => {
    return data.name.toLowerCase().search(value) != -1;
   });
    this.setState({
      filtersuppliers: result
    });
  
    //result=this.medicines;
    console.log(result);
    }
  render(props) {
    return (
      <div>
        <h1>Manage Suppliers</h1>
        <div>
          <Link className="btn btn-primary"  to="/healthCenter/add_supplier"><i className="fa fa-plus"></i>&nbsp; <span>Add Supplier</span></Link>
          <label>Search:</label>

<input type="text" onChange={(event) =>this.handleSearch(event)} />
        </div>
        <br/>
        <Table bordered className="bg-light" >
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Supplier</th>
              <th>Address</th>
              <th>City</th>
              <th>Email</th>              
              <th>Edit Supplier</th>
              <th>Delete Supplier</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filtersuppliers && this.state.filtersuppliers.map((supplier,i) => {
                const {id, name, address, city, email} = supplier;
                return (
                  <tr key={id} className="text-dark">
                    <th scope="row">{i+1}</th>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{city}</td>
                    <td><a href={`mailto:${email}`}>{email}</a></td>                                        
                    <td><i className="fa fa-pencil-alt" onClick={() => this.editSupplierWithId(id)} style={{cursor:'pointer'}}></i></td>
                   

                    <td><DeleteIcon onClick={() => this.deleteSupplierWithId(id)} style={{cursor:'pointer'}}/></td>
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
export default withRouter(ManageSuppliers);
