import React, { Component } from 'react'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'


// import Nav from './components/nav/nav'
import { Link } from 'react-router-dom'
import { Dimmer, Loader, Input, Button } from 'semantic-ui-react'
import { MainContainer} from '../../components/global.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Row, Col, notification } from 'antd';

import FaSignIn from 'react-icons/lib/fa/sign-in'
import { handleInputChange, emailValidate, testErrors, submitOnEnter } from '../../util/form-utils'

import { login, reset, logout } from '../../actions/userActions'


class Login extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.logout()
    this.handleInputChange = handleInputChange.bind(this)
    this.testErrors = testErrors.bind(this)
    submitOnEnter(this, this.login)
  }
  
  componentDidUpdate(){
    if(this.props.loginFailed)
      notification['error']({
        message: 'Email o contraseña incorrecto',
      })
    if(this.props.loginSuccess)
      notification['success']({
        message: 'Has iniciado sesión con exito',
      })
    this.props.reset()
  }

  login(){
    const { email = '', password = '' } = this.state || {}
    let errors = {
      ...emailValidate(email)
    }

    if(this.testErrors(errors))
      this.props.login({
        email, password
      })
      
  }

  render(){
    return (
      <React.Fragment>
        { this.props.loginSuccess && <Redirect push to="/"/> }
        <Nav hideLogin/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Dimmer active={this.state && this.state.loggingIn}>
            <Loader />  
          </Dimmer>
          <Row type="flex" justify="center">
            <Col lg={5} md={8} sm={10} xs={15} style={{display: "flex", flexDirection: "column"}} className="col-space">
              <div className="center-text" style={{textAlign: "center"}}>
                <FaSignIn/>  
                <span> INICIA SESION </span>
              </div>
              <Input size="big" placeholder='E-mail' name="email" error={this.state && this.state.emailInvalid} onChange={ e => this.handleInputChange(e) }/>
              <Input size="big" placeholder='Contraseña' name= "password" type="password" onChange={ e => this.handleInputChange(e) }/>
              <Button onClick={() => this.login()} style={{color: "white"}} content="¡Entrar!" className="our-green"/>
              <div className="center-text" style={{textAlign: "center"}}>
                ¿No tienes cuenta? <Link to="/register">Click aquí</Link>
              </div>
            </Col>
          </Row>
        </MainContainer>
        <Footer/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return ({
    loggedIn: state.user.loggedIn,
    loginSuccess: state.user.loginSuccess,
    loginFailed: state.user.loginFailed
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    login, reset, logout
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)