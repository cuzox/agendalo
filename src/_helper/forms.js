import React from 'react'
import { notification } from 'antd';

import uuidv4 from 'uuid/v4'

export function handleChange(name, value, embed){
  if(embed){
    this.setState({
      [embed]: {
        ...(this.state ? this.state[embed] : {}),
        [name]: value
      },
      [name + 'Invalid']: false
    })
  } else {
    this.setState({
      [name]: value,
      [name + 'Invalid']: false
    })
  }
}

export function validEmail(email = ''){
  let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !email.match(emailValidator) ? ['Email: formato incorecto'] : []
}

export function testErrors(errors){
  if(errors.length){
    notification['error']({
      message: 'Error de validación',
      description: <div>{errors.reduce((c,e) => c.push(<span key={uuidv4()}>{e}<br/></span>) && c, [])}</div>
    })
    return false
  }
  return true
}

export function passwordValidate(password = ''){
  let sec = []
  if(password.length < 8) sec.push('Contraseña: debe tener al menos 8 caracteres')
  if(!password.match(/[0-9]/)) sec.push('Contraseña: debe contener numeros')
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