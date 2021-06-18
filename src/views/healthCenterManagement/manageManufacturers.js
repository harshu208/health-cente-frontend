import React, { Component } from "react";
import { API } from '../../config';
import axios from "axios";
import MaterialTable from "material-table";
import Session from "react-session-api";
import {Table} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
class ManageManufacturers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
      filtermanufacturers:[]
    };
  }

  getManufacturersDetails() {
    axios.get(`${API}/manufacturers`)
      .then(response => {
        this.setState({
          manufacturers: response.data.data,
          filtermanufacturers: response.data.data,
        });
      })
      .catch(error => console.log(error));
  }

  editManufacturerWithId = (id) => {
    // console.log("Manufacturer with id: "+id+" is redirected to edit - " + `/manufacturerManagement/edit_manufacturer/${id}`);
    this.props.history.push(`/healthCenter/edit_manufacturer/${id}`);
  }
  deleteManufacturerWithId = (id) => {
    // console.log("Manufacturer with id: "+id+" is redirected to edit - " + `/manufacturerManagement/edit_manufacturer/${id}`);
   axios.delete(`${API}/manufacturers/${id}`).then((response)=>{
     console.log(response);
     alert("manufacturer deleted");

     const result=this.state.manufacturers.filter(item=>item.id!=id);
     this.setState({
       manufacturers:result,
       filtermanufacturers:result
     })
   })

    
  }

  componentDidMount() {
    this.getManufacturersDetails();
  }
  handleSearch=(e)=>{
    let value = e.target.value.toLowerCase();
    let result = [];
    console.log(value);
    console.log(this.state.manufacturers);
    result = this.state.manufacturers.filter((data) => {
    return data.name.toLowerCase().search(value) != -1;
   });
    this.setState({
      filtermanufacturers: result
    });
  
    //result=this.medicines;
    console.log(result);
    }

  render(props) {
    return (
      <div>
        <h1>Manage Manufacturers</h1>
        <div>
          <Link className="btn btn-primary"  to="/healthCenter/add_manufacturer"><i className="fa fa-plus"></i>&nbsp; <span>Add Manufacturer</span></Link>
          <label>Search:</label>

          <input type="text" onChange={(event) =>this.handleSearch(event)} />
        </div>
        <br/>
        <Table bordered className="bg-light" >
          <thead>
            <tr>
              <th>#</th>
              <th>Name of Manufacturer</th>
              <th>Address</th>
              <th>City</th>
              <th>Email</th>              
              <th>Edit Manufacturer</th>
              <th>Delete Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filtermanufacturers && this.state.filtermanufacturers.map((manufacturer,i) => {
                const {id, name, address, city, email} = manufacturer;
                return (
                  <tr key={id} className="text-dark">
                    <th scope="row">{i+1}</th>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{city}</td>
                    <td><a href={`mailto:${email}`}>{email}</a></td>                                        
                    <td><i className="fa fa-pencil-alt" onClick={() => this.editManufacturerWithId(id)} style={{cursor:'pointer'}}></i></td>
                   
                    <td><DeleteIcon onClick={() => this.deleteManufacturerWithId(id)} style={{cursor:'pointer'}}/></td>
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
export default withRouter(ManageManufacturers);
