import React, { Component } from 'react';
import { Dimmer, Loader, Input, Button } from 'semantic-ui-react'
import { notification, Alert } from 'antd';
import styled from "styled-components";
import axios from 'axios'

const Main = styled.div`
  background: url("assets/images/bg-plain.png") no-repeat center center fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Img = styled.img`
  padding: 30px;
`

const Text = styled.span`
  color: white;
  font-size: 4em;
  font-weight: bold;
  font-family: 'Montserrat';
  letter-spacing: 2px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`

const Redes = styled.div`
  position: relative;
  img {
    width: 150px;
  }
  div {
    position: absolute;
    width: 50px;
    height: 48.38px;
    top: 20px;
    cursor: pointer;
  }
  div:nth-child(3){
    left: 50px;
  }
  div:nth-child(4){
    left: 100px;
  }
`

class Landing extends Component{
  constructor(props){
    super(props)
    this.state = { 
      emailSubmitted: false,
      emailSubmitting: false,
      emailInvalid: false
    }
  }

  goTo = (url) =>{
    let win = window.open(url, '_blank');
    win.focus();
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

  render(){
    return (
      <Main>
        <Dimmer active={this.state.emailSubmitting}>
          <Loader />  
        </Dimmer>
        <Img src="assets/images/logo_decor.png"/>
        <Text>¡PROXIMAMENTE!</Text>
        {!this.state.emailSubmitted ?
          <React.Fragment>
            <Input
              action placeholder="Tu E-Mail"
              size="big"
              error={this.state.emailInvalid}
              onChange={ e => this.setState({ email: e.target.value, emailInvalid: false }) }>
              <input/>
              <Button className="subscribe" onClick={()=>{ this.uploadEmail() }}> ¡Subscribeme!</Button>
            </Input>
            <span style={{ 
              color: "white", letterSpacing: "2px", marginTop: "8px"
            }}>
              SUBSCRIBETE PARA SER NOTIFICADO
            </span>
          </React.Fragment> :
          <Alert
            message="¡Te has suscrito!"
            description="¡Te notificaremos pronto cuando Agéndalo esté disponible!"
            type="success"
            showIcon
          />
        
        }
        <Redes>
          <img style={{ marginTop: "20px" }} src="assets/images/redes.png"/>
          <div onClick={ ()=>{ this.goTo("https://www.facebook.com/agendalord") }}></div>
          <div onClick={ ()=>{ this.goTo("https://www.instagram.com/agendalo_rd") }}></div>
          <div onClick={ ()=>{ this.goTo("https://www.youtube.com/channel/UCfEgM2AIGWs8aKa2YnuvZiA") }}></div>
        </Redes>
      </Main>
    )
  }
}

export default Landing