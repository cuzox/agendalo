import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { logInAsync, logOut } from '../../actions/userActions'

import { Button } from 'semantic-ui-react'
import { NavLinks, Nav as StdNav } from './nav.styled'


class Nav extends Component{
  constructor(props){
    super(props)
  }

  render (){
    return(
      <StdNav>
        <NavLinks>
          <div>
            <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
            <span><Link to="/">CATEGORÍAS</Link></span>
            <span><Link to="/">ARTISTAS</Link></span>
            <span><Link to="/">IGLESIAS</Link></span>
          </div>
          <span className="add-activity">
            <Button className="our-green">AGREGAR ACTIVIDAD</Button>
          </span>
        </NavLinks>
      </StdNav>
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
      logInAsync,
      logOut
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))