import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { Modal } from 'antd'
import { DateRangePicker } from 'element-react'
import { Row, Col } from 'antd';

export default class Ad extends Component{
  render(){
    let { model, visible } = this.props
    return (
      <Modal title="Crear Publicidad" onCancel={this.props.hide} visible={visible}>
        <Row>
          <Col>
            <Input placeholder="Nombre"/>
          </Col>
          <Col>
            <DateRangePicker />
          </Col>
          <Col>
            <Input placeholder="Imagen"/>
          </Col>
          <Col>
            <Input placeholder="Url"/>
          </Col>
        </Row>
      </Modal>
    )
  }
}