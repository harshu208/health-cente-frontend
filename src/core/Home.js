import React, { Component } from "react";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.location.pathname);
  }
  render() {
    return (
      <div>
        <h3>Welcome to Health Centre Management Software</h3>
      </div>
    );
  }
}
export default Home;
