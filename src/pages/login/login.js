import React, { Component } from 'react';


// import Nav from './components/nav/nav'
import { Link } from 'react-router-dom'
import FaEdit from 'react-icons/lib/fa/edit';
import { Input, Button } from 'semantic-ui-react'
import { Footer, Content, MainContainer} from '../../components/global.styled'

class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>
        {/* <Nav/> */}
        <Content>
          <MainContainer>
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
          </MainContainer>
        </Content>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default Login