import React, { Component } from 'react';
import styled from "styled-components";

/** UI */
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit';
import { Input, Checkbox, Button } from 'semantic-ui-react'
import { MainContainer } from '../../components/global.styled'

class Register extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <MainContainer>
        <div>
          <FaEdit/> 
          <span> REGISTRATE </span>
        </div>
        <Input size="big" placeholder='Nombre' />
        <Input size="big" placeholder='E-mail' />
        <Input size="big" placeholder='Contraseña' />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex" }}>
            <Checkbox/>
            <p style={{width: "200px"}}>
              Al hacer click en "Registrarme" muestras tu conformidad
              y aceptas haber leído nuestros <u>Términos y Condiciones</u>
            </p>
          </div>
        </div>
        <Button content="¡Registrame!" className="agendalo-blue"/>
        <div>
          ¿Ya tienes cuenta? <Link to="/login"><u>Click aquí</u></Link>
        </div>
      </MainContainer>
    )
  }
}

export default Register