import React, { Component } from 'react'
import { Table, Button } from 'element-react'
import { Row, Col, Popconfirm } from 'antd';
import HttpClient from '../../../_helper/http-client';
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlus from 'react-icons/lib/fa/plus'
import FaTrash from 'react-icons/lib/fa/trash'
import Ad from './ad'
import moment from 'moment'

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
          <Button
            plain={true}
            size="small"
            type="info"
            onClick={()=>this.setState({...this.state, visible: true, adScreenId: data.id, selected: {}})}
          >
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
      render: data => moment(data.begin).utcOffset('-0400').format('D [de] MMMM')
    },
    {
      label: 'Fin',
      prop: 'end',
      minWidth: 100,
      render: data => moment(data.end).utcOffset('-0400').format('D [de] MMMM')
    },
    {
      label: "Acciones",
      minWidth: 100,
      render: data => {
        return(
          <React.Fragment>
            <Button
            plain={true} size="small" type="info"
            onClick={()=>this.setState({...this.state, visible: true, adScreenId: null, selected: data})}>
              <FaEdit />
            </Button>
            <Popconfirm placement="top" title={"¿Borrar publicidad?"} onConfirm={()=>this.remove(data.id)} okText="Si" cancelText="No">
              <Button plain={true} size="small" type="info">
                <div style={{color: "#f94141"}} className="action-icon">
                  <FaTrash />
                </div>
              </Button>
            </Popconfirm>
          </React.Fragment>
        )
      }
    }
  ]
  state = {
    ads: [],
    visible: false,
    currentAd: {}
  }

  hide(){
    this.setState({...this.state, visible: false})
  }

  ok(){
    this.setState({...this.state, visible: false})
    this.componentDidMount()
  }

  remove(id){
    HttpClient.delete(`advertisements/${id}`).then(()=>{
      this.componentDidMount()
    })
  }

  componentDidMount(){
    HttpClient.get('adScreens', { include: 'advertisements' }).then(r => r.data).then(adScreens => {
      this.setState({ads: adScreens})
    })
  }

  render(){
    let { selected, adScreenId } = this.state
    return (
      <Row type="flex" justify="center" style={{marginTop: "20px"}}>
        <Col xl={15} lg={18} md={20} sm={22} xs={22}>
          <Table style={{width: '100%'}} emptyText="No hay datos" columns={this.columns} data={this.state.ads}/>
          <Ad model={ selected } adScreenId={adScreenId} visible={this.state.visible} hide={()=>this.hide()} ok={()=>this.ok()}/>
        </Col>
      </Row>
    )
  }
}