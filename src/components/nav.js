import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'


const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  span{
    margin: 0 30px;
    a {
      color: #ededed;
      font-weight: 600;
    }
  }
  .Logo img{ width: 250px; }

  span:first-child{ margin-left: 0; }
  span:last-child{ margin-right: 0; }
`

class Nav extends Component{
  constructor(props){
    super(props)
  }

  render (){
    return(
      <NavLinks>
        <div>
          <span className="Logo" ><Link to="/"><img src="assets/images/logo.png"/></Link></span>
          <span><Link to="/">CATEGORÍAS</Link></span>
          <span><Link to="/">ARTISTAS</Link></span>
          <span><Link to="/">IGLESIAS</Link></span>
        </div>
        <span className="add-activity">
          <Button className="our-green">AGREGAR ACTIVIDAD</Button>
        </span>
      </NavLinks>
    )
  }
}

export default Nav