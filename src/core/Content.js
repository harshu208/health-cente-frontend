import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Session from "react-session-api";
// routes config
/*import fellowshipRoutes from "./../Routes/fellowshipRoutes";*/
import healthCenterRoutes from '../Routes/healthCenterRoutes';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: Session.get("isAuthenticated"),
      // isAuthenticated: true,
    };
    //   console.log(Session.items());
  }
  componentDidMount() {}
  componentWillUpdate() {
    //    this.setState({'isAuthenticated': Session.get('isAuthenticated')})
  }

  render(props) {
    return (
      <div>
        <div className="main-content">
          {/* <Subheader pathname={this.props.location.pathname} /> */}
          <Switch>
            {" "}
           {/* {
              fellowshipRoutes.map((route, idx) => {
                //  console.log(route, idx);
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) =>
                        this.state.isAuthenticated ? (
                          <route.component {...props} />
                        ) : (
                          <Redirect to="/Logouts" />
                        )
                      }
                    />
                  )
                );
              })
            }*/}
            {
              healthCenterRoutes.map((route, idx) => {
                let auth = Session.get('auth_id');
                if(route.userAuth===undefined || route.userAuth.indexOf(auth)===-1){
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (<Redirect to="/home" /> )}
                      />
                    )
                  );
                }
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) =>
                        this.state.isAuthenticated ? (
                          <route.component {...props} />
                        ) : (
                          <Redirect to="/Logouts" />
                        )
                      }
                    />
                  )
                );
              })
            }
            {" "}
            <Redirect from="/" to="/home" />
          </Switch>

          <section className="section"></section>
        </div>
      </div>
    );
  }
}
export default withRouter(Content);
