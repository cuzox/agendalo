import React, { Component } from 'react';
import styled from "styled-components";
import { MainContainer, Footer, Content } from '../../components/styled/styled'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'





const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid blue;
  margin: 0 10px;
  padding: 0 0 0 15px;
  height: 60px;
  font-size: 0.8em;

  span:first-child{
    font-size: 1.1em;
    margin-bottom: 5px;
    font-weight: 600;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 900px;
  position: relative;
  overflow: hidden;
  background-image: url("assets/images/bg-plain.png");
  background-color: #cccccc;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  * {
    color: white;
  }

  h4, h3, p{ color: white; }
  h4{ font-size: 4em; }
  h3{ font-size: 3.5em; }
  p { font-size: 1.4em; }

  .NavLinks{
    display: flex;
    justify-content: space-between;
    margin-top: 200px;
    span{
      margin: 0 30px;
      a {
        color: #ededed;
        font-weight: 600;
      }
    }
    .Logo img{ width: 250px; }

    span:first-child{ margin-left: 0; }
    span:last-child{ margin-right: 0; }

  }

  .add-activity{
    align-items: center;
    display: flex;
    button { font-weight: bold; color: #003366; }
  }

  .register{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;

    button {
      font-weight: 1.4em;
      font-weight: bold; 
      color: #003366;
    }
  }

  .video-link{
    margin: 20px 30px;
    font-size: 1.3em;
  }

`

function Foot(){
  return (
    <Footer style={{ alignItems: "center" }}>
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
    </Footer>
  );
}

function Head(){
  return (
    <Header>
      <MainContainer>
        <div className="NavLinks">
          <div>
            <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
            <span><Link to="/">CATEGORÍAS</Link></span>
            <span><Link to="/">ARTISTAS</Link></span>
            <span><Link to="/">IGLESIAS</Link></span>
          </div>
          <span className="add-activity">
            <Button className="our-green">AGREGAR ACTIVIDAD</Button>
          </span>
        </div>
        <span style={{marginTop: "80px"}}><h3>TU AGENDA EN LINEA DE</h3></span>
        <span><h4><b>ACTIVIDADES CRISTIANAS</b></h4></span>
        <span>
          <p>
            Mantente al día con todas las actividades cristianas:<br/>
            conciertos, charlas, campamentos, conferencias y más.
          </p>
        </span>
        <div style={{display: "flex", marginTop: "30px"}}>
          <div className="register">
            <Button className="register our-green">¡REGISTRAME!</Button>
            <span><Link to="/login">¿Ya tienes cuenta?</Link></span>
          </div>
          <span className="video-link">
            <span>¿CÓMO FUNCTIONA?</span>
            <FaPlayCircleO/>
          </span>
        </div>
      </MainContainer>
    </Header>
  )
}

class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Head/>
        {/* <Content>
          <MainContainer>
            <div>

            </div>
          </MainContainer>
        </Content> */}
        <Foot/>
      </React.Fragment>
    )
  }
}

export default Home