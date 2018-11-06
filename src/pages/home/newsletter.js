import React, { Component } from 'react';
import axios from 'axios'
import { Alert, notification} from 'antd'
import { Button, Input } from 'semantic-ui-react'

import {  Newsletter as StdNewsletter } from './home.styled'

export default class Newsletter extends Component{
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
