import React, { Component } from 'react';
import { Dimmer, Loader, Input, Button } from 'semantic-ui-react'
import { notification, Alert } from 'antd';
import styled from "styled-components";
import axios from 'axios'
import { Main, Img, Text, Redes } from './landing.styled.js'

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