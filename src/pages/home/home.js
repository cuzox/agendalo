import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import styled from "styled-components";


/** UI */
import { Link } from 'react-router-dom'
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o'
import { MainContainer } from '../../components/global.styled'
import { 
  Header as StdHeader,
  Month as StdMonth,
  Newsletter as StdNewsletter
} from './home.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Button, Dropdown, Dimmer, Loader, Input,} from 'semantic-ui-react'
import { Row, Col, Collapse, Carousel } from 'antd'
const Panel = Collapse.Panel

const MONTHS = [
  { text: "Enero", value: 0 },
  { text: "Febrero", value: 1 },
  { text: "Marzo", value: 2 },
  { text: "Abril", value: 3 },
  { text: "Mayo", value: 4 },
  { text: "Junio", value: 5 },
  { text: "Julio", value: 6 },
  { text: "Agosto", value: 7 },
  { text: "Septiembre", value: 8 },
  { text: "Octubre", value: 9 },
  { text: "Noviembre", value: 10 },
  { text: "Diciembre", value: 11 }
]

const Header = props =>{
  return (
    <StdHeader>
      <Nav inHome/>
      <MainContainer style={{minHeight: "initial", whiteSpace: "nowrap"}}>
        <span style={{marginTop: "80px"}}><h3>TU AGENDA EN LINEA DE</h3></span>
        <span><h4><b>ACTIVIDADES CRISTIANAS</b></h4></span>
        <span>
          <p>
            Mantente al día con todas las actividades cristianas:<br/>
            conciertos, charlas, campamentos, conferencias y más.
          </p>
        </span>
        <div style={{display: "flex", marginTop: "30px", marginBottom: "50px"}}>
          <div className="register">
          <Link to="/register">
            <Button className="register our-green">
                ¡REGISTRAME!
            </Button>
          </Link>
            <span><Link to="/login">¿Ya tienes cuenta?</Link></span>
          </div>
          <span className="video-link">
            <span>¿CÓMO FUNCTIONA?</span>
            <FaPlayCircleO/>
          </span>
        </div>
      </MainContainer>
    </StdHeader>
  )
}

const Month = props =>{
  return(
    <StdMonth>
      <span> VER TODOS </span>
      <Dropdown selection options={MONTHS} defaultValue={0}/>
    </StdMonth>
  )
}

const Newsletter = props =>{
  return(
    <StdNewsletter>
      <div style={{display: "flex"}}>
        <img style={{width: "auto", height: "50px"}}src="assets/images/mail.png"/>
        <span style={{color: "rgb(0,201,211)", fontWeight: "bolder",  minWidth: "200px", marginLeft: "15px"}}>
          RECIBE NUESTRO <br/> <font size="5">NEWSLETTER</font>
        </span>
      </div>
      <span style={{color: "white", maxWidth: "400px", minWidth: "200px", whiteSpace: "nowrap", marginBottom: "5px"}}>
        Mantente informado sobre las actividades, anotate a <br/> nuestro newsletter y no te pierdas ni un solo evento
      </span>
      <span style={{width: "350px"}}>
        <Input placeholder="Tu email"/>
        <Button style={{backgroundColor: "rgb(0,201,211)", marginLeft: "15px"}}>!AGREGAME!</Button>
      </span>
    </StdNewsletter>
  )
}

class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Header/>
        <Row>
          <Col xl={{span: 16}} lg={{span: 18}} md={{span: 20}} sm={{span: 22}}>
            <Month/>
          </Col>
        </Row>
        <Row>
          <Col xl={{span: 8, offset: 8}} lg={{span: 12, offset: 6}} md={{span: 14, offset: 6}} sm={{span: 20, offset: 2}} xs={24} 
            style={{overflow: "hidden", marginTop: "25px"}}>
            <Carousel vertical autoplay effect="fade">
              <div style={{height: "300px", borderRadius: "20px"}}>
                <h3>1</h3>
              </div>
              <div style={{height: "300px", borderRadius: "20px"}}>
                <h3>2</h3>
              </div>
              <div style={{height: "300px", borderRadius: "20px"}}>
                <h3>3</h3>
              </div>
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col xl={{offset: 8, span: 16}} lg={{span: 18, offset: 6}} md={{offset: 6, span: 20}} sm={{span: 22, offset: 2}}>
            <Newsletter/>
          </Col>
        </Row>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default Home