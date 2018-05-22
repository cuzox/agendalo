import React, { Component } from 'react';
import styled from "styled-components";

/** UI */
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit';
import { Input, Checkbox, Button } from 'semantic-ui-react'
import { MainContainer } from '../../components/global.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Row, Col } from 'antd';

class Register extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Nav/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Row type="flex" justify="center">
            <Col lg={5} md={8} sm={10} xs={15} style={{display: "flex", flexDirection: "column"}} className="col-space">
              <div className="center-text" style={{textAlign: "center"}}>
                <FaEdit/> 
                <span> REGISTRATE </span>
              </div>
              <Input size="big" placeholder='Nombre' />
              <Input size="big" placeholder='E-mail' />
              <Input size="big" placeholder='Contraseña' />
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <Checkbox style={{margin: "0 auto"}}/>
                  <p style={{width: "200px"}}>
                    Al hacer click en "Registrarme" muestras tu conformidad
                    y aceptas haber leído nuestros <u>Términos y Condiciones</u>
                  </p>
              </div>
              <Button style={{color: "white"}}  content="¡Registrame!" className="our-green"/>
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

export default Register