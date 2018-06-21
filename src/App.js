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

import { fetchCategories } from './actions/categoryActions'
import { loginSucc, reset } from './actions/userActions'

import Nav from './components/nav/nav'
import Footer from './components/footer'


class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchCategories()
    try{
      let user = localStorage.getItem('user')
      if(user !== null){
        this.props.loginSucc(JSON.parse(user))
        this.props.reset()
      }
    } catch (err){}
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav/>
          <Route exact path="/" component={ Home } />       
          <Route exact path="/landing" component={Landing} />             
          <Route path="/login" component={ Login } /> 
          <Route path="/registro" component={ Register } />
          <Route path="/agregar" component={ ActivityCrud }/>
          {/* <Route component={()=><span>404 - Esta no es la pagina que buscas</span>} /> */}
          <Footer/>
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
    fetchCategories,
    loginSucc,
    reset
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)