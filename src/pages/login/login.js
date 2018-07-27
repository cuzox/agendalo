import React, { Component } from 'react'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { Link } from 'react-router-dom'
import { Dimmer, Loader, Input, Button } from 'semantic-ui-react'
import { MainContainer} from '../../global.styled'
import { Row, Col, notification } from 'antd';

import FaSignIn from 'react-icons/lib/fa/sign-in'
import { 
  handleChange, 
  validEmail, 
  testErrors, 
  submitOnEnter
} from '../../_helper/forms'

import { login, reset, logout } from '../../_actions/userActions'
import { createNotLoggedIn } from '../../_actions/activityActions'


class Login extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.loggedIn){
      this.props.logout()
      notification['success']({
        message: 'Has cerrado sesión'
      })
    }
    this.handleChange = handleChange.bind(this)
    this.testErrors = testErrors.bind(this)
    submitOnEnter(this, this.login)
  }
  
  componentDidUpdate(){
    if(this.props.loginFailed){
      notification['error']({
        message: 'Email o contraseña incorrecto',
      })
      this.props.reset()
    }
    if(this.props.loginSuccess){
      notification['success']({
        message: 'Has iniciado sesión con exito',
      })
      this.props.reset()
      if(this.props.createAttempt){
        this.props.createNotLoggedIn(false)
      }
    }
  }

  login(){
    let errors = []
    let { user = {}} = this.state || {}
    let required = ['email', 'password']
    let validate = {
      'email': validEmail(user['email'])
    }
    
    required.forEach(key => !user[key] && this.setState({ [key + 'Invalid']: true }))

    Object.keys(validate).forEach(key =>{
      if(Array.isArray(validate[key]) && validate[key].length){
        this.setState({[key + 'Invalid']: true})
        errors.push(...validate[key])
      }
    })

    if(!required.every(key => user[key])) errors.unshift('Faltan campos requeridos')

    if(this.testErrors(errors)) this.props.login(user)
  }

  render(){
    return (
      <MainContainer >
        { this.props.loginSuccess && (
          this.props.createAttempt ? 
          <Redirect push to="/agregar"/> :
          <Redirect push to="/"/>
        )}
        <Dimmer active={ this.props.loggingIn }>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col lg={5} md={8} sm={10} xs={15} style={{display: "flex", flexDirection: "column"}} className="col-space">
            <div className="center-text" style={{textAlign: "center"}}>
              <FaSignIn/>  
              <span> INICIA SESION </span>
            </div>
            <Input size="big" placeholder='E-mail' name='email'
              error={this.state && this.state.emailInvalid} 
              onChange={ e => this.handleChange('email', e.target.value, 'user') }
            />
            <Input size="big" placeholder='Contraseña' name= 'password' 
              error={this.state && this.state.passwordInvalid}
              type="password" onChange={ e => this.handleChange('password', e.target.value, 'user') }
            />
            <Button onClick={() => this.login()} style={{color: "white"}} content="¡Entrar!" className="our-green"/>
            <div className="center-text" style={{textAlign: "center"}}>
              ¿No tienes cuenta? <Link to="/registro">Click aquí</Link>
            </div>
          </Col>
        </Row>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    loggedIn: state.user.loggedIn,
    loginSuccess: state.user.loginSuccess,
    loginFailed: state.user.loginFailed,
    loggingIn: state.user.loggingIn,
    createAttempt: state.activity.attemptToCreateNotLoggedIn
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    login, reset, logout, createNotLoggedIn
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)