import React, { Component } from 'react';


// import Nav from './components/nav/nav'
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit';
import { Input, Button } from 'semantic-ui-react'
import { Content, MainContainer} from '../../components/global.styled'
import Footer from '../../components/footer'
import Nav from '../../components/nav/nav'
import { Row, Col } from 'antd';

class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        <Nav/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Row type="flex" justify="center">
            <Col style={{display: "flex", flexDirection: "column"}}>
              <div>
                <FaEdit/> 
                <span> INICIA SESION </span>
              </div>
              <Input size="big" placeholder='E-mail' />
              <Input size="big" placeholder='Contraseña' />
              <Button content="¡Iniciar Sesión!" className="agendalo-blue"/>
              <div>
                ¿No tienes cuenta? <Link to="/register">Click aquí</Link>
              </div>
            </Col>
          </Row>
        </MainContainer>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default Login