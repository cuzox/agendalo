import React from 'react'
import styled from "styled-components";
import { Footer as StdFooter, FooterSection } from './global.styled'

function Footer(){
  return (
    <StdFooter style={{ alignItems: "center" }}>
      <div style={{ margin: "0 15px" }}>
          <img style={{ height: "80px", width: "auto"}} src="assets/images/logo_sm_darkb.png"/>
      </div>
      <FooterSection>
          <span> SOBRE NOSOTROS </span>
          <span> Términos y Condiciones </span>
          <span> Escribenos </span>
      </FooterSection>
      <FooterSection>
          <span> SERVICIO AL CLIENTE </span>
          <span> Preguntas fecuentes </span>
          <span> Mi cuenta </span>
      </FooterSection>
      <FooterSection>
          <span> ANUNCIATE </span>
          <span> Artistas </span>
          <span> Marcas </span>
      </FooterSection>
    </StdFooter>
  );
}

export default Footer