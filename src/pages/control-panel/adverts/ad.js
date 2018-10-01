import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { DatePicker, Modal } from 'antd'
import { Row, Col } from 'antd';
import HttpClient from '../../../_helper/http-client';
import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default class Ad extends Component{
  baseModel = {
    name: "",
    image: "",
    url: "",
    begin: "",
    end: ""
  }

  state = {
    model: {}
  }

  componentDidUpdate(nextProps){
    if(!isEqual(this.props, nextProps)) this.init()
  }

  init(){
    let { adScreenId, model } = this.props
    if(adScreenId) this.setState({ model: { ...this.baseModel }})
    else if(model) this.setState({ model: {
      ...model,
      begin: moment(model.begin),
      end: moment(model.end)
    }})
  }

  submit(){
    let { model } = this.state
    let { ok, adScreenId } = this.props
    if(adScreenId)
      HttpClient.post('advertisements', {
        ...model,
        begin: model.begin.toDate(),
        end: model.end.toDate(),
        adScreenId
      }).then(()=>[
        ok()
      ])
    else
      HttpClient.patch(`advertisements/${model.id}`, {
        ...model,
        begin: model.begin.toDate(),
        end: model.end.toDate(),
      }).then(()=>[
        ok()
      ])
  }

  render(){
    let { visible, hide } = this.props
    let { model } = this.state
    return (
      <Modal 
        title="Crear Publicidad" 
        onCancel={hide}
        onOk={()=>this.submit()}
        visible={visible}
      >
        <Row style={{marginBottom: "10px"}}>
          <Col span={24}>
            <Input
              value={model.name}
              style={{width: "100%"}}
              placeholder="Nombre"
              size="medium"
              onChange={ e => this.setState({model: {...model, name: e.target.value}}) }
            />
          </Col>
        </Row>
        <Row style={{marginBottom: "10px"}}>
          <Col span={24}>
            <Input
              value={model.image}
              style={{width: "100%"}}
              placeholder="Imagen"
              onChange={ e => this.setState({model: {...model, image: e.target.value}}) }
            />
          </Col>
        </Row>
        { model.image &&
          <Row style={{marginBottom: "10px"}}>
            <Col span={24}>
              <img style={{ width: "100%" }} src={model.image}/>
            </Col>
          </Row>
        }
        <Row style={{marginBottom: "10px"}}>
          <Col span={24}>
            <Input 
              value={model.url}
              style={{width: "100%"}}
              placeholder="Url"
              onChange={ e => this.setState({model: {...model, url: e.target.value}}) }
            />
          </Col>
        </Row>
        <Row style={{marginBottom: "10px"}}>
          <Col span={12}>
            <DatePicker
              value={model.begin}
              style={{width: "calc(100% - 5px)", marginRight: "5px"}}
              placeholder="Desde*" size="default"
              onChange={ e => this.setState({model: {...model, begin: e}}) }
            />
          </Col>
          <Col span={12}>
            <DatePicker
              value={model.end}
              style={{width: "calc(100% - 5px)", marginLeft: "5px"}}
              placeholder="Hasta*" size="default"
              onChange={ e => this.setState({model: {...model, end: e}}) }
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}