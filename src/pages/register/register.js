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

import { register, reset, logout } from '../../actions/userActions'
import { 
  handleInputChange, 
  emailValidate,
  passwordValidate,
  testErrors, 
  submitOnEnter
} from '../../util/form-utils'

class Register extends Component{
  constructor(props){
    super(props)
    this.mainContainer = React.createRef()
    
  }

  componentDidMount(){
    this.props.logout()
    this.handleInputChange = handleInputChange.bind(this)
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
    const { firstName = '', lastName = '', email = '', password = ''} = this.state || {}

    let errors = {
      ...emailValidate(email),
      ...passwordValidate(password)
    }
    
    
    let before = (!firstName || !lastName || !email || !password) && ['Todos los campos son necesarios'] || []
    let after = !this.mainContainer.current.querySelector("input[name='terms']").checked && 
      ['Debes aceptar los Terminos y Condiciones'] || []
    
    if(this.testErrors(errors, before, after))
      this.props.register({
        firstName, lastName, email, password
      })
  }

  render(){
    return (
      <MainContainer innerRef={ this.mainContainer}>
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
              <Input size="big" name="firstName" placeholder='Nombre' error={this.state && this.state.nameInvalid} onChange={ e => this.handleInputChange(e) }/>
              <Input size="big" name="lastName" placeholder='Apellido' error={this.state && this.state.nameInvalid} onChange={ e => this.handleInputChange(e) }/>
              <Input size="big" name="email" placeholder='E-mail' error={this.state && this.state.emailInvalid} onChange={ e => this.handleInputChange(e) }/>
              <Input size="big" name="password" placeholder='Contraseña' type="password" error={this.state && this.state.passwordInvalid} onChange={ e => this.handleInputChange(e) }/>
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
    registering: state.user.registering
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