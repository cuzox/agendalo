import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import './App.css'

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Landing from './pages/landing/landing'
import ActivityCrud from './pages/activity/activity-crud/activity-crud'
import ActivityList from './pages/activity/activity-list/activity-list'
import ActivityDetails from './pages/activity/activity-details/activity-details'
import Profile from './pages/profile/profile'
import ControlPanel from './pages/control-panel/control-panel'
import Terms from './pages/terms/terms'

import { fetchCategories } from './_actions/categoryActions'
import { loginSucc, reset } from './_actions/userActions'
import { loadApp } from './_actions/appActions'

import Nav from './components/nav/nav'
import Footer from './components/footer/footer'

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadApp()
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
    const { isAdmin, loaded, loggedIn} = this.props
    return (
      <Router>
        <Route render={({ location }) => (
          <React.Fragment>
            <Nav/>
            <TransitionGroup component={null} exit={false}>
              <CSSTransition key={location.pathname} classNames="fade" timeout={200} exit={false}>
                <Switch location={location}>
                  <Route exact path="/" component={ Home }/>       
                  <Route path="/landing" component={ Landing }/>             
                  <Route path="/login" component={ Login }/> 
                  <Route path="/registro" component={ Register }/>
                  <Route path="/terminos" component={ Terms }/>

                  <Protected path="/panel" {...{loaded, isAdmin}} component={ ControlPanel }/>
                  <Protected path="/panel/actividades" {...{loaded, isAdmin}} component={ ActivityList }/>

                  <Protected path="/perfil" {...{loaded, loggedIn}}  component={ Profile }/>
                  
                  <Route exact path="/agregar" component={ ActivityCrud }/>
                  <Route exact path="/agregar/:id" component={ ActivityCrud }/>
                  <Route exact path="/actividades" component={ ActivityList }/>
                  <Route exact path="/actividades/:id" component={ ActivityDetails }/>

                  <Route render={ () => <span>404 - Esta no es la pagina que buscas</span>}/>
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

const Protected = ({ component: Component, isAdmin, loggedIn, loaded, ...rest }) => (
  <Route {...rest} 
    render={ props =>
      (isAdmin || (!isAdmin && loggedIn)) && (
        <Component {...props} />
      ) || (!isAdmin && loaded) && (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      ) || null
    }
  />
)

const mapStateToProps = state => {
  return ({
    isAdmin: state.user.isAdmin,
    loaded: state.app.loaded,
    loggedIn: state.user.loggedIn
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchCategories, 
    loginSucc,
    reset, 
    loadApp
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)