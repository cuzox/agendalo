import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { login, logout } from '../../actions/userActions'

import { Button } from 'semantic-ui-react'
import { NavLinks } from './nav.styled'
import { Header as StdHeader } from '../global.styled'
import FaUserCircle from 'react-icons/lib/fa/user'
import FaSignIn from 'react-icons/lib/fa/sign-in'



class Nav extends Component{
  constructor(props){
    super(props)
  }

  render (){
    return(
      <StdHeader className={this.props.inHome ? 'in-home' : ''}>
        <NavLinks>
          <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
          <span><Link to="/">VER EVENTOS</Link></span>
          <span><Link to="/">CATEGORÍAS</Link></span>
          { !this.props.hideAdd &&
            <span>
              <Link to="/agregar">
                <Button size="small" className="our-green">AGREGAR ACTIVIDAD</Button>
              </Link>
            </span>
          }
          { !this.props.hideLogin &&
            <span>
              { this.props.loggedIn ?
                  <div style={{display: "flex", marginBottom: "3px"}}>
                    <u style={{margin: "0 10px"}}>Bienvenido, {this.props.firstName}</u>
                    <FaUserCircle style={{fontSize: "1.4em"}}/>
                  </div>
                :
                  <Link to="/login">
                    <div style={{display: "flex", marginBottom: "3px"}}>
                      <u style={{margin: "0 10px"}}>Iniciar Sesión</u>
                      <FaSignIn style={{fontSize: "1.4em"}}/>
                    </div>
                  </Link>
              }
            </span>
          }
        </NavLinks>
      </StdHeader>
    )
  }
}

const mapStateToProps = state => {
  return ({
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    loggedIn: state.user.loggedIn
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      logout
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))