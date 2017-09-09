import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div>
        <Routes/>
      </div>
    );
  }
}

export default withRouter(App);
