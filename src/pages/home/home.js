import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import styled from "styled-components";
import { withRouter } from 'react-router-dom'


/** IMPORT UI ELEMENTS */
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o';
import { MainContainer, Content } from '../../components/global.styled'
import StdHeader from './home.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Button } from 'semantic-ui-react'


class Header extends Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <StdHeader>
        <MainContainer>
          <Nav />
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
              <Button className="register our-green" onClick={()=> this.props.history.push('/register')}>
                ¡REGISTRAME!
              </Button>
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
}

Header = withRouter(Header)

class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Header/>
        {/* <Content>
          <MainContainer>
            <div>

            </div>
          </MainContainer>
        </Content> */}
        <Footer/>
      </React.Fragment>
    )
  }
}

export default withRouter(Home)