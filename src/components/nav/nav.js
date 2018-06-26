import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { login, logout } from '../../actions/userActions'

import { Button } from 'semantic-ui-react'
import { NavLinks as StdNavLinks } from './nav.styled'
import { Header as StdHeader } from '../global.styled'
import FaUser from 'react-icons/lib/fa/user'
import FaSortDown from 'react-icons/lib/fa/sort-desc'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaBars from 'react-icons/lib/fa/bars'
import FaCogs from 'react-icons/lib/fa/cogs'

import Media from "react-media";
import { Menu, Dropdown, Icon } from 'antd';

import { isInViewport } from '../../util/general-utils'

const NavLinks = props =>{
  return (
    <StdNavLinks>
      <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
      <span><Link to="/lista">VER EVENTOS</Link></span>
      {/* <span><Link to="/">CATEGORÍAS</Link></span> */}
      { !props.hideAdd &&
        <span>
          <Link to="/agregar">
            <Button size="small" className="our-green">AGREGAR ACTIVIDAD</Button>
          </Link>
        </span>
      }
      { !props.hideLogin &&
        <span>
          { props.loggedIn ?
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" href="#">
                  <div style={{display: "flex", marginBottom: "3px"}}>
                    <u style={{margin: "0 10px"}}>Saludos, {props.firstName}</u>
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
    </StdNavLinks>
  )
}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/perfil">
        <FaUser /> Perfil 
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
    <Link to="/panel">
      <FaCogs /> Panel de control
    </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/login">
        <FaSignOut /> Cerrar sesión
      </Link>
    </Menu.Item>
  </Menu>
);

class Nav extends Component{
  constructor(props){
    super(props)
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        currentLocation: locProps(location.pathname)
      })
    });
  }

  componentDidMount(){
    this.setState({
      currentLocation: locProps(window.location.pathname)
    })
  }

  componentWillUnmount(){
    this.unlisten()
  }

  render (){
    const { firstName, loggedIn } = this.props
    return(
      <Media query={{ minWidth: 968 }}>
        {matches =>
          matches ? (
            <StdHeader className={this.state && this.state.currentLocation.inHome ? 'in-home' : ''}>
              <NavLinks firstName={firstName} loggedIn={loggedIn} {...(this.state && this.state.currentLocation || {})}/>
            </StdHeader>
          ) : (
            <StdHeader className={'compact-top'}>
              <span className="Logo" >
                <Link to="/"><img src="assets/images/logo.png"/></Link>
              </span>
              <FaBars style={{fontSize: "30px", fill: "rgb(0,201,211)"}}/>
            </StdHeader>
          )
        }
      </Media>
    )
  }
}

const locProps = (pathname)=>{
  let state = {}
  if(pathname == '/') state.inHome = true
  if(pathname == '/login') state.hideLogin = true
  if(pathname == '/agregar') state.hideAdd = true
  return state
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