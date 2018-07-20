import React from 'react'
import { Footer as StdFooter, FooterSection } from './footer.styled'

function Footer(){
  return (
    <StdFooter>
      <div style={{ margin: "0 15px" }}>
          <img style={{ height: "4rem", width: "auto"}} src="/assets/images/logo_sm_lightb.png"/>
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