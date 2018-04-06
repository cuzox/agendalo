import React, { Component } from 'react';
import {
  Route, Link,
  BrowserRouter as Router
} from "react-router-dom";
import styled from "styled-components";

import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Landing from './pages/landing/landing'

// import Nav from './Nav'
// import { Footer, Content} from './Styled.js'


class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          {/* <Nav/> */}
          <Route exact path="/" component={ Home } />       
          {/* <Route exact path="/" component={Landing} />              */}
          <Route path="/login" component={ Login } /> 
          <Route path="/register" component={ Register } /> 

          {/* <Content>
            <Route exact path="/" component={Home} />
          </Content> */}
          {/* <Foot/> */}
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
