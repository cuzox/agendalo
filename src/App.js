import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import styled from "styled-components";

import Login from './pages/login/login'
import Register from './pages/register/register'  
import Home from './pages/home/home'
import Landing from './pages/landing/landing'
import ActivityCrud from './pages/activity/activity-crud/activity-crud'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'



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
          <Route exact path="/" component={ Home } />       
          <Route exact path="/landing" component={Landing} />             
          <Route path="/login" component={ Login } /> 
          <Route path="/register" component={ Register } />
          <Route path="/agregar" component={ ActivityCrud }/>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return ({
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)