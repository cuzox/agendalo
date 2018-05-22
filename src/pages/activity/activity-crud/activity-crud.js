import React, { Component } from 'react'
import styled from "styled-components"

import Footer from '../../../components/footer'
import Nav from '../../../components/nav/nav'
import { Row, Col } from 'antd';
import { Form, Input, Checkbox, Button, TextArea, Dropdown } from 'semantic-ui-react'
import { MainContainer } from '../../../components/global.styled'
import FaEdit from 'react-icons/lib/fa/edit';
import { DatePicker, TimePicker } from 'antd';


class ActivityCrud extends Component{
  constructor(props){
    super(props)
    this.categorias = [
      {
        key: "testing2",
        value: "testing",
        text: "Test"
      },
      {
        key: "testing",
        value: "testing2",
        text: "Test2"
      }
    ]
  }
  
  render(){
    return (
      <React.Fragment>
        <Nav/>
        <MainContainer style={{backgroundColor: "rgb(233, 236, 240)"}}>
          <Form>
            <Row type="flex" justify="center">
              <Col lg={7} md={10} sm={13} xs={18} style={{display: "flex", flexDirection: "column"}} className="col-space">
                  <div className="center-text" style={{textAlign: "center"}}>
                    <FaEdit/>
                    <span> AGREGA TU ACTIVIDAD </span>
                  </div>
                  <Input size="medium" placeholder='Nombre' />
                  <Input size="medium" placeholder='Teléfono' />
                  <Input size="medium" placeholder='Dirección' />
                  <Input size="medium" placeholder='$' />
                  <TextArea placeholder='Descripción' />
                  <Dropdown size="medium" placeholder='Categorías' search selection options={this.categorias} />
                  <DatePicker size="default" />
                  <TimePicker use12Hours format="h:mm A" minuteStep={5} size="default" />
              </Col>
            </Row>
          </Form>
        </MainContainer>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default ActivityCrud