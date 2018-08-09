import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'

/** UI */
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit'
import { Dimmer, Loader, Input, Checkbox, Button } from 'semantic-ui-react'
import { MainContainer } from '../../global.styled'
import { Row, Col, notification } from 'antd';

import { register, reset, logout } from '../../_actions/userActions'
import { 
  handleChange, 
  validEmail,
  passwordValidate,
  testErrors, 
  submitOnEnter
} from '../../_helper/forms'

class Register extends Component{
  constructor(props){
    super(props)
    this.mainContainer = React.createRef()
    
  }

  componentDidMount(){
    this.props.logout()
    this.handleChange = handleChange.bind(this)
    this.testErrors = testErrors.bind(this)
    submitOnEnter(this, this.register)
  }

  componentDidUpdate(){
    if(this.props.registerFailed){
      notification['error']({
        message: 'Error de registro',
        description: 'Trata mas tarde'
      })
      this.props.reset()
    }
    if(this.props.registerSuccess){
      notification['success']({
        message: 'Registro exitoso',
        description: 'Inicia sesión con tu nueva cuenta'
      })
      this.props.reset()
    }
  }

  register(){
    let errors = []
    let { user = {}} = this.state || {}
    let required = ['firstName', 'lastName', 'email', 'password']
    let validate = {
      'email': validEmail(user['email']),
      'password': passwordValidate(user['password'])
    }

    required.forEach(key => !user[key] && this.setState({ [key + 'Invalid']: true }))

    Object.keys(validate).forEach(key =>{
      if(Array.isArray(validate[key]) && validate[key].length){
        this.setState({[key + 'Invalid']: true})
        errors.push(...validate[key])
      }
    })

    if(!required.every(key => user[key])) errors.unshift('Faltan campos requeridos')

    if(!this.mainContainer.current.querySelector("input[name='terms']").checked) 
      errors.push('Debes aceptar los Terminos y Condiciones')

    if(this.testErrors(errors)) this.props.login(user)
  }

  render(){
    return (
      <MainContainer innerRef={ this.mainContainer} className="center">
          { this.props.registerSuccess && <Redirect push to="/login"/> }
          <Dimmer active={this.props.registering}>
            <Loader />
          </Dimmer>
          <Row type="flex" justify="center">
            <Col lg={5} md={8} sm={10} xs={15} style={{display: "flex", flexDirection: "column"}} className="col-space">
              <div className="center-text" style={{textAlign: "center"}}>
                <FaEdit/> 
                <span> REGISTRATE </span>
              </div>
              <Input size="big" name="firstName" placeholder='Nombre' error={this.state && this.state.firstNameInvalid} onChange={ e => this.handleChange('firstName', e.target.value, 'user') }/>
              <Input size="big" name="lastName" placeholder='Apellido' error={this.state && this.state.lastNameInvalid} onChange={ e => this.handleChange('lastName', e.target.value, 'user') }/>
              <Input size="big" name="email" placeholder='E-mail' error={this.state && this.state.emailInvalid} onChange={ e => this.handleChange('email', e.target.value, 'user') }/>
              <Input size="big" name="password" placeholder='Contraseña' type="password" error={this.state && this.state.passwordInvalid} onChange={ e => this.handleChange('password', e.target.value, 'user') }/>
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox name="terms" style={{margin: "0 auto"}}/>
                  <p style={{width: "200px"}}>
                    Al hacer click en "Registrarme" muestras tu conformidad
                    y aceptas haber leído nuestros <u>Términos y Condiciones</u>
                  </p>
              </div>
              <Button onClick={e => this.register(e)} style={{color: "white"}}  content="¡Registrame!" className="our-green"/>
              <div style={{textAlign: "center"}}>
                ¿Ya tienes cuenta? <Link to="/login">Click aquí</Link>
              </div>
            </Col>
          </Row>
        </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    registerSuccess: state.user.registerSuccess,
    registerFailed: state.user.registerFailed,
    registerSuccess: state.user.registerSuccess,
    registering: state.user.registering,
    loggedIn: state.user.loggedIn
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    register, reset, logout
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)