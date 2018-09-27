import React, { Component } from 'react'
import { Table, Button } from 'element-react'
import { Row, Col } from 'antd';
import HttpClient from '../../../_helper/http-client';
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import Ad from './ad'

export default class Advert extends Component {
  columns = [
    {
      type: 'expand',
      expandPannel: data => {
        return (
          <Table 
            style={{width: '100%'}} 
            emptyText="No hay publicidades para esta pantalla" 
            columns={this.subColumn}
            data={data.advertisements}
          />
        )
      }
    },
    {
      label: "Pantalla",
      prop: "name",
      minWidth: 200
    },
    {
      label: "URL",
      prop: "url",
      minWidth: 200
    },
    {
      label: "Acciones",
      minWidth: 100,
      render: data => {
        return(
          <Button plain={true} size="small" type="info" onClick={()=>this.setState({...this.state, visible: true})}>
            <FaPlus />
          </Button>
        )
      }
    }
  ]

  subColumn = [
    {
      label: 'Nombre',
      prop: 'name',
      minWidth: 100
    },
    {
      label: 'Inicio',
      prop: 'begin',
      minWidth: 100,
    },
    {
      label: 'Fin',
      prop: 'end',
      minWidth: 100,
    },
    {
      label: "Acciones",
      minWidth: 100,
      render: data => {
        return(
          <Button plain={true} size="small" type="info" >
            <FaEdit />
          </Button>
        )
      }
    }
  ]
  state = {
    ads: [],
    visible: false
  }

  hide(){
    this.setState({...this.state, visible: false})
  }

  componentDidMount(){
    HttpClient.get('adScreens', { include: 'advertisements' }).then(r => r.data).then(adScreens => {
      this.setState({ads: adScreens})
    })
  }

  render(){
    return (
      <Row type="flex" justify="center" style={{marginTop: "20px"}}>
        <Col span={12}>
          <Table style={{width: '100%'}} emptyText="No hay datos" columns={this.columns} data={this.state.ads}/>
          <Ad model={{}} visible={this.state.visible} hide={()=>this.hide()}/>
        </Col>
      </Row>
    )
  }
}