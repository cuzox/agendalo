import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'


/** UI */
import { Link } from 'react-router-dom'
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o'
import { MainContainer } from '../../global.styled'
import { 
  Header as StdHeader,
  Month as StdMonth,
  Newsletter as StdNewsletter
} from './home.styled'
import { Button, Dropdown, Input,} from 'semantic-ui-react'
import { Row, Col, Carousel, Alert, notification} from 'antd'

import axios from 'axios'

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
    <StdHeader className={"home-header"}>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <span><h3>TU AGENDA EN LÍNEA DE</h3></span>
            <span><h4><b>ACTIVIDADES CRISTIANAS</b></h4></span>
            <span>
              <p>
                Mantente al día con todas las actividades cristianas:
                conciertos, charlas, campamentos, conferencias y más.
              </p>
            </span>
            <div style={{display: "flex", marginTop: "30px", marginBottom: "50px"}}>
              {!props.loggedIn &&
                <div className="register">
                  <Link to="/registro">
                    <Button className="our-green">
                      ¡REGISTRAME!
                    </Button>
                  </Link>
                  <Link to="/login">¿Ya tienes cuenta?</Link>
                </div>
              }
              <span className="video-link">
                <a href="https://www.youtube.com/watch?v=RPhmAjNhp28/">
                  ¿CÓMO FUNCIONA?
                </a>
                <FaPlayCircleO/>
              </span>
            </div>
          </Col>
        </Row>
        
    </StdHeader>
  )
}

const Month = props =>{
  return(
    <StdMonth>
      <span> <Link to="/actividades">VER TODOS</Link></span>
      <Dropdown className={"month-dropdown"} selection options={MONTHS} defaultValue={0}/>
    </StdMonth>
  )
}

class Newsletter extends Component{
  constructor(props){
    super(props)
    this.state = { 
      emailSubmitted: false,
      emailSubmitting: false,
      emailInvalid: false,
      email: ""
    }
  }
  uploadEmail(){
    let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(this.state.email.match(emailValidator)){
      this.setState({emailSubmitting: true})
      axios.post("https://api.agendalo.com.do/api/Newsletters", {email: this.state.email}).then(()=>{
        this.setState({ emailSubmitted: true, emailSubmitting: false})
      }).catch(()=>{
        this.setState({emailSubmitting: false})
        notification["error"]({
          message: 'Error de red'
        });
      })
    }else{
      this.setState({emailInvalid: true})
      notification["error"]({
        message: 'Error de e-mail',
        description: 'Por favor asegurese que el formato del email esté correcto.',
      });
    }
    console.log(this.state.email)
  }

  render = () => (
    <StdNewsletter>
      {!this.state.emailSubmitted ?
        <React.Fragment>
          <div style={{display: "flex"}}>
            <img alt="" style={{width: "auto", height: "50px"}}src="/assets/images/mail.png"/>
            <span style={{color: "rgb(0,201,211)", fontWeight: "bolder", marginLeft: "15px"}}>
              RECIBE NUESTRO <br/> <font size="5">NEWSLETTER</font>
            </span>
          </div>
          <span style={{color: "white", maxWidth: "400px", minWidth: "200px", whiteSpace: "nowrap", marginBottom: "5px", fontSize: "calc(10px + 0.4vw)"}}>
            Mantente informado sobre las actividades, anotate a <br/> nuestro newsletter y no te pierdas ni un solo evento
          </span>
          <span style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <Input 
              style={{marginBottom: "10px"}} 
              placeholder="Tu email"
              error={this.state.emailInvalid}
              onChange={ e => this.setState({ email: e.target.value, emailInvalid: false }) }/>
            <Button 
              onClick={()=>{ this.uploadEmail() }} 
              style={{backgroundColor: "rgb(0,201,211)", 
              marginLeft: "15px", marginBottom: "10px"}}>
              !AGREGAME!
            </Button>
          </span>
        </React.Fragment> :
        <Alert
          message="¡Gracias por subscribirte!"
          description="¡Pronto recibirás nuestro boletín!"
          type="success"
          showIcon
        />
      
      }
    </StdNewsletter>
  )
}

class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <MainContainer className={"no-trans"} style={{paddingTop: "0px" }}>
        <Header loggedIn={this.props.loggedIn}/>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22}>
            <Month/>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22} 
            style={{overflow: "hidden", margin: "25px 0"}}>
            <Carousel vertical autoplay effect="fade">
              <div style={{height: "400px", borderRadius: "12px"}}>
                <h3>1</h3>
              </div>
              <div style={{height: "400px", borderRadius: "12px"}}>
                <h3>2</h3>
              </div>
              <div style={{height: "400px", borderRadius: "12px"}}>
                <h3>3</h3>
              </div>
            </Carousel>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22} style={{marginBottom: "25px"}}>
            <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px", margin: "0 10px 0 10px"}}></div>
          </Col>
        </Row>
        { !this.props.loggedIn &&
          <Row  type="flex" justify="center">
            <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22}>
              <Newsletter/>
            </Col>
          </Row>
        }
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    loggedIn: state.user.loggedIn
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)