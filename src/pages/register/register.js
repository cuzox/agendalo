import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'

/** UI */
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit'
import { Dimmer, Loader, Input, Checkbox, Button } from 'semantic-ui-react'
import { MainContainer } from '../../components/global.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Row, Col, notification } from 'antd';

import { register, reset, logout } from '../../actions/userActions'

class Register extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.logout()
    if(this.props.registerFailed)
      notification['error']({
        message: 'Error de registro',
        description: 'Trata mas tarde'
      })
  }

  componentWillUnmount(){
    if(this.props.registerSuccess)
      notification['success']({
        message: 'Registro exitoso',
        description: 'Inicia sesión con tu nueva cuenta'
      })
    this.props.reset()
  }

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value, 
      [e.target.name + 'Invalid']: false
    })
  }

  register(e){
    const { firstName = '', lastName = '', email = '', password = ''} = this.state || {}

    let errors = {
      ...this.emailValidate(email),
      ...this.passwordValidate(password)
    }
    
    for(let key in errors) if(errors[key].length) this.setState({[key + "Invalid"]: true})
    
    let formattedErrors = Object.keys(errors).reduce((c, e)=> c.concat(errors[e]), [])
    !e.target.parentNode.querySelector("input[name='terms']").checked && formattedErrors.push('Debes aceptar los Terminos y Condiciones')
    
    if(!firstName || !lastName || !email || !password) formattedErrors.unshift('Todos los campos son necesarios')
    if(formattedErrors.length){
      notification['error']({
        message: 'Error de validación',
        description: <div>{formattedErrors.reduce((c,e) => c.push(<span>{e}<br/></span>) && c, [])}</div>
      })
    }else{
      this.props.register({
        firstName, lastName, email, password
      })
    }
  }

  emailValidate(email){
    let sec = { email: [] }
    let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(emailValidator) ? sec : sec.email.push(['Email: formato incorecto']) && sec
  }

  passwordValidate(password){
    let sec = { password: [] }
    if(password.length < 8) sec.password.push('Contraseña: debe tener al menos 8 caracteres')
    if(!password.match(/[0-9]/)) sec.password.push('Contraseña: debe contener numeros')
    return sec
  }

  render(){
    return (
      <React.Fragment>
        { this.props.registerSuccess && <Redirect push to="/login"/> }
        <Nav/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Dimmer active={this.state && this.state.registering}>
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
        <Footer/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return ({
    registerSuccess: state.user.registerSuccess,
    registerFailed: state.user.registerFailed,
    registerSuccess: state.user.registerSuccess
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