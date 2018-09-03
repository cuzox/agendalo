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
import { Button, Input, Select} from 'semantic-ui-react'
import { Row, Col, Alert, notification} from 'antd'
import { Carousel } from 'element-react'


import axios from 'axios'

const dates = [
  { key: 1, value: 'todas', text: "Todas"},
  { key: 2, value: 'semana', text: "Esta semana"},
  { key: 3, value: 'mes', text: "Este mes"},
  { key: 4, value: 'proximo', text: "Proximo mes"}
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

class Month extends Component{
  state = {
    search: '',
    date: 'todas'
  }
  render(){
    let { search, date } = this.state
    return(
      <StdMonth>
        <Input style={{width: "100%"}}
          onInput={e => this.setState({ search: e.target.value })}
          type='text' placeholder='Search...' value={search} action>
          <input style={{width: "40%"}} />
          <Select
            style={{width: "40%", whiteSpace: "nowrap"}}
            onChange={(e, d)=> this.setState({date: d.value })}
            compact options={dates} defaultValue={'todas'}
          />
          <Button style={{width: "20%"}} type='submit'>
            <Link to={{pathname:"/actividades", search: `?search=${search}&date=${date}`}}>
                BUSCAR
            </Link>
          </Button>
        </Input>
      </StdMonth>
    )
  }
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
    let promotion = "https://gleam.io/1qqbJ/jess-adrin-romero"
    let links = [
      "https://www.dropbox.com/s/3n7t13w8g5qzjsa/47d9ebf5-51fa-4ca4-93e1-ed8ed9ea5a17.jpeg?raw=1",
      "https://www.dropbox.com/s/uz5av0gup8ppw90/38b54924-e13a-44b8-b903-fbf247aaafea.jpeg?raw=1",
      "https://www.dropbox.com/s/ki8ymfbfc7n17mh/cbe08c54-76df-43c2-8314-1aa99b29fe08.jpeg?raw=1"
    ]
    return (
      <MainContainer className={"no-trans"} style={{paddingTop: "0px" }}>
        <Header loggedIn={this.props.loggedIn}/>
        <Row type="flex" justify="center">
          <Col xxl={6} xl={8} lg={10} md={12} sm={18} xs={20}>
            <Month/>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22} 
            style={{overflow: "hidden", margin: "25px 0"}}>
            <Carousel interval="4000" arrow="always" height="500px">
              {
                [1,2,3].map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                        <img
                          src={links[i]}
                          width="100%"
                          style={{objectFit: "cover"}}
                        />
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22} style={{marginBottom: "25px"}}>
            <a href={promotion}>
              <img 
                width="100%" 
                src="https://www.dropbox.com/s/n0i39uuagpspcra/90599174-8d91-43ea-b932-f32864603130.jpeg?raw=1"
                onClick={e => {e.preventDefault(); window.open(promotion, '_blank')}}
              />
            </a>
            {/* <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px"}}></div> */}
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