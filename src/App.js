import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import './App.css'

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Login from './pages/login/login'
import Register from './pages/register/register'  
import Home from './pages/home/home'
import Landing from './pages/landing/landing'
import ActivityCrud from './pages/activity/activity-crud/activity-crud'
import ActivityList from './pages/activity/activity-list/activity-list'

import Profile from './pages/profile/profile'
import ControlPanel from './pages/control-panel/control-panel'


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
        <Route render={({ location }) => (
          <React.Fragment>
            <Nav/>
            <TransitionGroup component={null} exit={false}>
              <CSSTransition key={location.key} classNames="fade" timeout={200}>
                <Switch location={location}>
                  <Route exact path="/" component={ Home } />       
                  <Route exact path="/landing" component={ Landing } />             
                  <Route exact path="/login" component={ Login } /> 
                  <Route exact path="/registro" component={ Register } />
                  <Route exact path="/agregar" component={ ActivityCrud }/>
                  <Route exact path="/perfil" component={ Profile }/>
                  <Protected isAdmin={this.props.isAdmin} path="/panel" component={ ControlPanel }/>
                  <Route path="/lista" component={ ActivityList }/>
                  <Route render={ () => <span>404 - Esta no es la pagina que buscas</span>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <Footer/>
          </React.Fragment>
        )}/>
      </Router>
    );
  }
}

const Protected = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => {
  return ({
    isAdmin: state.user.isAdmin
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