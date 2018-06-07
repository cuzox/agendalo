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
      <StdHeader>
        <NavLinks>
          <nav>
            <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
            <span><Link to="/">CATEGORÍAS</Link></span>
            <span><Link to="/">ARTISTAS</Link></span>
            <span><Link to="/">IGLESIAS</Link></span>
          </nav>
          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end"}}>
              <Link to="/login">
                <div style={{display: "flex", marginBottom: "3px"}}>
                  <u style={{margin: "0 10px"}}>Iniciar Sesión</u> 
                  <FaSignIn style={{fontSize: "1.4em"}}/>              
                </div>
              </Link>
            <span className="add-activity">
              <Link to="/agregar">
                <Button size="small" className="our-green">AGREGAR ACTIVIDAD</Button>
              </Link>
            </span>
          </div>
        </NavLinks>
      </StdHeader>
    )
  }
}

const mapStateToProps = state => {
  return ({
    email: state.user.email,
    name: state.user.name
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