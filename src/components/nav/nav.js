import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { login, logout } from '../../actions/userActions'

import { Button } from 'semantic-ui-react'
import { NavLinks } from './nav.styled'
import { Header as StdHeader } from '../global.styled'
import FaUser from 'react-icons/lib/fa/user'
import FaSortDown from 'react-icons/lib/fa/sort-desc'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaBars from 'react-icons/lib/fa/bars'

import Media from "react-media";
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <FaUser /> Perfil 
    </Menu.Item>
    <Menu.Item key="1">
      <FaSignOut /> Cerrar sesión
    </Menu.Item>
  </Menu>
);

class Nav extends Component{
  constructor(props){
    super(props)
  }

  render (){
    return(
      <Media query={{ minWidth: 968 }}>
        {matches =>
          matches ? (
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
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                          <a className="ant-dropdown-link" href="#">
                            <div style={{display: "flex", marginBottom: "3px"}}>
                              <u style={{margin: "0 10px"}}>Saludos, {this.props.firstName}</u>
                              <FaSortDown style={{fontSize: "1.4em"}}/>
                            </div>
                          </a>
                        </Dropdown>
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
          ) : (
            <StdHeader className={'compact'}>
              <div style={{ margin: "0 15px" }}>
                <img style={{ height: "3rem", width: "auto"}} src="assets/images/logo_sm_lightb.png"/>
              </div>
              <FaBars style={{fontSize: "1.4em"}}/>
            </StdHeader>
          )
        }
      </Media>
      
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