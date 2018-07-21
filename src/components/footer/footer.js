import React from 'react'
import { Footer as StdFooter, FooterSection } from './footer.styled'
import { Link } from 'react-router-dom'

function Footer(){
  return (
    <StdFooter>
      <div style={{ margin: "0 15px" }}>
          <img style={{ height: "4rem", width: "auto"}} src="/assets/images/logo_sm_lightb.png"/>
      </div>
      <FooterSection>
          <span> SOBRE NOSOTROS </span>
          <Link to="/terminos">
            <span> Términos y Condiciones </span>
          </Link>
          <a href="mailto:info@agendalo.com.do">
            <span> Escribenos </span>
          </a>
      </FooterSection>
      <FooterSection>
          <span> SERVICIO AL CLIENTE </span>
          <Link to="/">
            <span> Preguntas fecuentes </span>
          </Link>
          <Link to="/">
            <span> Mi cuenta </span>
          </Link>
      </FooterSection>
    </StdFooter>
  );
}

export default Footer