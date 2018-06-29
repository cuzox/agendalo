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

  render (){
    const { firstName, loggedIn, isAdmin } = this.props
    const { currentLocation, navDeployed } = this.state || {}
    return(
      <Media query={{ minWidth: 968 }}>
        {matches =>
          matches ? (
            <NavContent className={currentLocation && currentLocation.inHome ? 'in-home' : ''}>
              <NavLinks firstName={firstName} loggedIn={loggedIn} isAdmin={isAdmin} {...(currentLocation || {})}/>
            </NavContent>
          ) : (
            <NavContent className={'compact-top'}>
              <span className="Logo" >
                <Link to="/"><img src="/assets/images/logo.png"/></Link>
              </span>
              <FaBars onClick={()=> this.setState({navDeployed: !navDeployed})} style={{fontSize: "30px", fill: "rgb(0,201,211)"}}/>
              <StdNavFold className={navDeployed && "fold-down" || ""}>
                <ul>
                  <li className="center"> <Link to="/lista">VER EVENTOS</Link> </li>
                  <li className="center"> <Agregar/> </li>
                  { loggedIn && <li> <Profile/> </li> }
                  { loggedIn && isAdmin && <li> <Panel/> </li> }
                  <li> { loggedIn && <LogOut/> || <LogIn/> }</li>
                </ul>
              </StdNavFold>
            </NavContent>
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