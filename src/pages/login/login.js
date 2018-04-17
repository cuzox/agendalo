import React, { Component } from 'react';
import FaEdit from 'react-icons/lib/fa/edit';
import { Input, Button } from 'semantic-ui-react'
// import Nav from './components/nav/nav'
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
              ¿No tienes cuenta? <u>Click aquí</u>
            </div>
          </MainContainer>
        </Content>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default Login