import React, { Component } from 'react';


// import Nav from './components/nav/nav'
import { Link } from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'
import { MainContainer} from '../../components/global.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Row, Col } from 'antd';

import FaSignIn from 'react-icons/lib/fa/sign-in'


class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Nav hideLogin/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Row type="flex" justify="center">
            <Col lg={5} md={8} sm={10} xs={15} style={{display: "flex", flexDirection: "column"}} className="col-space">
              <div className="center-text" style={{textAlign: "center"}}>
                <FaSignIn/>  
                <span> INICIA SESION </span>
              </div>
              <Input size="big" placeholder='E-mail' />
              <Input size="big" placeholder='Contraseña' type="password"/>
              <Button style={{color: "white"}} content="¡Entrar!" className="our-green"/>
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

export default Login