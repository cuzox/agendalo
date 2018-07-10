import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { login, logout } from '../../_actions/userActions'

import { Button } from 'semantic-ui-react'
import { NavContent, NavLinks as StdNavLinks, NavFold as StdNavFold } from './nav.styled'
import FaUser from 'react-icons/lib/fa/user'
import FaSortDown from 'react-icons/lib/fa/sort-desc'
import FaSignIn from 'react-icons/lib/fa/sign-in'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaBars from 'react-icons/lib/fa/bars'
import FaCogs from 'react-icons/lib/fa/cogs'

import Media from "react-media";
import { Menu, Dropdown, Icon } from 'antd';

import { isInViewport } from '../../_helper/general'

import { Row, Col } from 'antd'


const NavLinks = props =>{
  return (
    <StdNavLinks>
      <span className="Logo" ><Link to="/"><img src="/assets/images/logo.png"/></Link></span>
      <span><Link to="/lista">VER EVENTOS</Link></span>
      {/* <span><Link to="/">CATEGORÍAS</Link></span> */}
      { !props.hideAdd &&
        <span>
          <Agregar/>
        </span>
      }
      { !props.hideLogin &&
        <span>
          { props.loggedIn ?
              <Dropdown overlay={menu(props.isAdmin)} trigger={['click']} placement="bottomRight">
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

const Agregar = () => (
  <Link to="/agregar">
    <Button size="small" className="our-green">AGREGAR ACTIVIDAD</Button>
  </Link>
)

const Profile = () => (
  <Link to="/perfil">
    <FaUser /> Perfil 
  </Link>
)

const Panel = () => (
  <Link to="/panel">
    <FaCogs /> Panel de control
  </Link>
)

const LogOut = () => (
  <Link to="/login">
    <FaSignOut /> Cerrar sesión
  </Link>
)

const LogIn = () => (
  <Link to="/login">
    <FaSignIn /> Iniciar Sesión
  </Link>
)

const menu = isAdmin => (
  <Menu>
    <Menu.Item key="0">
      <Profile />
    </Menu.Item>
    { isAdmin &&
      <Menu.Item key="1">
        <Panel />
      </Menu.Item>
    }
    <Menu.Item key="2">
      <LogOut />
    </Menu.Item>
  </Menu>
)

class Nav extends Component{
  constructor(props){
    super(props)
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        currentLocation: locProps(location.pathname),
        navDeployed: false
      })
    });
  }

  componentDidMount(){
    this.setState({
      currentLocation: locProps(window.location.pathname),
      navDeployed: false
    })
  }

  componentWillUnmount(){
    this.unlisten()
  }

  deployNav(){
    const { navDeployed } = this.state || {}
    if(navDeployed) document.body.classList.remove("hide-overflow")
    else document.body.classList.add("hide-overflow")
    this.setState({navDeployed: !navDeployed})
  }

  render (){
    const { firstName, loggedIn, isAdmin } = this.props
    const { currentLocation = {}, navDeployed } = this.state || {}
    return(
      <Media query={{ minWidth: 968 }}>
        {matches =>
          matches ? (
            <NavContent className={currentLocation.inHome && 'in-home' }>
              <Row type="flex" justify="center">
                <Col xl={12} lg={16} md={18} sm={20} xs={22}> 
                  <NavLinks {...{ currentLocation, firstName, loggedIn, isAdmin }} />
                </Col>
              </Row>
            </NavContent>
          ) : (
            <NavContent className={'compact-top'}>
              <Row type="flex" justify="center">
                <Col xl={12} lg={16} md={18} sm={20} xs={22}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span className="Logo" >
                      <Link to="/"><img src="/assets/images/logo.png"/></Link>
                    </span>
                    <FaBars onClick={()=> this.deployNav() } style={{fontSize: "30px", fill: "white"}}/>
                  </div>
                </Col> 
              </Row>
              <NavFold deployNav={()=> this.deployNav()} {...{ navDeployed, firstName, loggedIn, isAdmin }}/>
            </NavContent>
          )
        }
      </Media>
    )
  }
}

const NavFold = props => (
  <StdNavFold onClick={()=>props.deployNav()} className={props.navDeployed ? "fold-down" : ""}>
    <ul>
      <li className="center"> <Link to="/lista">VER EVENTOS</Link> </li>
      <li className="center"> <Agregar/> </li>
      { props.loggedIn && <li> <Profile/> </li> }
      { props.loggedIn && props.isAdmin && <li> <Panel/> </li> }
      <li> { props.loggedIn ? <LogOut/> : <LogIn/> }</li>
    </ul>
    <div style={{position: "absolute", top: "calc(100% + 10px)", bottom: 0, right: 0, left: 0, height: "100%", backgroundColor: "rgba(0,0,0,0.8)"}}></div>
  </StdNavFold>
)

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
    loggedIn: state.user.loggedIn,
    isAdmin: state.user.isAdmin
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