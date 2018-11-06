import React, { Component } from 'react';

import {  Month as StdMonth } from './home.styled'
import { Button, Input, Select} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const dates = [
  { key: 1, value: 'todas', text: "Todas"},
  { key: 2, value: 'semana', text: "Esta semana"},
  { key: 3, value: 'mes', text: "Este mes"},
  { key: 4, value: 'proximo', text: "Proximo mes"}
]

export default class Month extends Component{
  state = {
    search: '',
    date: 'todas'
  }
  render(){
    let { search, date } = this.state
    return(
      <StdMonth>
        <Input style={{width: "100%"}}
          onInput={e => this.setState({ search: e.target.value })}
          type='text' placeholder='Search...' value={search} action>
          <input style={{width: "40%"}} />
          <Select
            style={{width: "40%", whiteSpace: "nowrap"}}
            onChange={(e, d)=> this.setState({date: d.value })}
            compact options={dates} defaultValue={'todas'}
          />
          <Button style={{width: "20%"}} type='submit'>
            <Link to={{pathname:"/actividades", search: `?search=${search}&date=${date}`}}>
                BUSCAR
            </Link>
          </Button>
        </Input>
      </StdMonth>
    )
  }
}