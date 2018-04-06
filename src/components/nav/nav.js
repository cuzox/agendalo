import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators} from 'redux'
import { Header, MainContainer} from './Styled.js'

import {logInAsync, logOut} from '../actions/userActions'


const NavContent = MainContainer.extend`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
class Nav extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Header>
        <NavContent>
          <div>
            <img style={{height: "100px", width: "auto"}} src="assets/images/logo.png" />
          </div>
          <div>
            <img style={{height: "80px", width: "auto"}} src="assets/images/user.png"/>
          </div>
          {/* <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul> */}
        </NavContent>
      </Header>
    );
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
      logOut,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Nav)