import React from 'react'
import { notification } from 'antd';

import uuidv4 from 'uuid/v4'

export function handleInputChange(e){
  if(!e.target.name) throw new Error("Input field does not contain name attribute")
  this.setState({
    [e.target.name]: e.target.value, 
    [e.target.name + 'Invalid']: false
  })
}

export function emailValidate(email){
  let sec = { email: [] }
  let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!email.match(emailValidator)) sec.email.push('Email: formato incorecto')
  return sec
}

export function testErrors(errors, before = [], after = []){
  for(let key in errors) if(errors[key].length) this.setState({[key + "Invalid"]: true})

  let formattedErrors = Object.keys(errors).reduce((c, e)=> c.concat(errors[e]), [])
  
  before.forEach( e => e && formattedErrors.unshift(e))
  after.forEach( e => e && formattedErrors.push(e))

  if(formattedErrors.length){
    notification['error']({
      message: 'Error de validación',
      description: <div>{formattedErrors.reduce((c,e) => c.push(<span key={uuidv4()}>{e}<br/></span>) && c, [])}</div>
    })
    return false
  }
  return true
}

export function passwordValidate(password){
  let sec = { password: [] }
  if(password.length < 8) sec.password.push('Contraseña: debe tener al menos 8 caracteres')
  if(!password.match(/[0-9]/)) sec.password.push('Contraseña: debe contener numeros')
  return sec
}

export function submitOnEnter(ctx, fn){
  document.addEventListener('keypress', run)
  var original = ctx['componentWillUnmount']

  ctx['componentWillUnmount'] = function(){
    document.removeEventListener('keypress', run)
    original && original.apply(ctx, arguments)
  }

  function run(e){
    e.keyCode == 13 && fn.apply(ctx)
  }
}

function firstLetterCaps(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}