import React from 'react'
import { notification } from 'antd';

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
  return email.match(emailValidator) ? sec : sec.email.push('Email: formato incorecto') && sec
}

export function testErrors(errors, additional = []){
  for(let key in errors) if(errors[key].length) this.setState({[key + "Invalid"]: true})

  let formattedErrors = Object.keys(errors).reduce((c, e)=> c.concat(errors[e]), [])
  
  additional.forEach( e => e && formattedErrors.unshift(e))
  if(formattedErrors.length){
    notification['error']({
      message: 'Error de validación',
      description: <div>{formattedErrors.reduce((c,e) => c.push(<span>{e}<br/></span>) && c, [])}</div>
    })
    return false
  }
  return true
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