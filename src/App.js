import React, { Component } from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const Logout = loadable(() => import("./core/Logout"));
const Layout = loadable(() => import("./core/Layout"));
const FileNotFound = loadable(() => import("./core/FileNotFound"));

const loading = (
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span className="sr-only"> Please Wait, Loading... </span>
    </div>
  </div>
);
// Pages
const Login = loadable(() => import("./core/Login"));
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/Logout"
              name="Logout Page"
              render={(props) => <Logout {...props} />}
            />
            <Route
              exact
              path="/"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/Home"
              name="Home"
              render={(props) => <Layout {...props} />}
            />
        {/*   <Route
              path="/fellowship/fellowshipBill/jrf"
              name="FellowshipBillJrf"
              render={(props) => <Layout {...props} />}
            />
            <Route
              path="/fellowship/fellowshipExtension"
              name="FellowShipExtenstion"
              render={(props) => <Layout {...props} />}
            />
            <Route
              path="/fellowship/LeaveMaster"
              name="LeaveMaster"
              render={(props) => <Layout {...props} />}
            />
            <Route
              path="/fellowship/fellow/:id"
              name="fellowEdit"
              render={(props) => <Layout {...props} />}
            />
        */}
            <Route
              path="/healthCenter/financial_budget"
              name="FinancialBudget"
              render={(props) => <Layout {...props} />}
            />    
            <Route
              path="/healthCenter/add_budget"
              name="AddBudget"
              render={(props) => <Layout {...props} />}
            />                                                        
            <Route
              path="/healthCenter/manage_manufacturers"
              name="ManageManufacturers"
              render={(props) => <Layout {...props} />}
            />    
            <Route
              path="/healthCenter/edit_manufacturer/:id"
              name="EditManufacturer"
              render={(props) => <Layout {...props} />}
            />
            <Route
              path="/healthCenter/add_manufacturer"
              name="AddManufacturer"
              render={(props) => <Layout {...props} />}
            />                                
            <Route
              path="/healthCenter/manage_medicines"
              name="ManageMedicines"
              render={(props) => <Layout {...props} />}
            />    
            <Route
              path="/healthCenter/edit_medicine/:id"
              name="EditMedicine"
              render={(props) => <Layout {...props} />}
            />
            <Route
              path="/healthCenter/add_medicine"
              name="AddMedicine"
              render={(props) => <Layout {...props} />}
            />
            <Route
            path="/healthCenter/manage_suppliers"
            name="ManageSuppliers"
            render={(props) => <Layout {...props} />}
            />

           <Route
            path="/healthCenter/add_supplier"
            name="AddSupplier"
            render={(props) => <Layout {...props} />}
            />

           <Route
            path="/healthCenter/edit_supplier/:id"
            name="EditSupplier"
            render={(props) => <Layout {...props} />}
            />

            <Route path="*">
              <FileNotFound />s
            </Route>{" "}
          </Switch>{" "}
        </React.Suspense>{" "}
      </BrowserRouter>
    );
  }
}

export default App;
