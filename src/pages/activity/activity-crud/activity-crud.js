import React, { Component } from 'react'

import Footer from '../../../components/footer'
import Nav from '../../../components/nav/nav'
import { Row, Col } from 'antd'
import { Form, Input, Checkbox, Button, TextArea, Dropdown } from 'semantic-ui-react'
import { MainContainer } from '../../../components/global.styled'
import FaEdit from 'react-icons/lib/fa/edit'
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'
import { DatePicker, TimePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/es_ES'
import { PhotoUpload, PhotoList } from './styled-crud.styled'
import { withRouter } from 'react-router-dom'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'


import { addImage } from '../../../actions/activityActions'
import { fetchCategories } from '../../../actions/categoryActions'



class ActivityCrud extends Component{
  constructor(props){
    super(props)
    this.imagesInput = React.createRef()
    this.imageDropArea = React.createRef()
    this.activityImages = []
  }

  componentDidMount(){
    this.props.fetchCategories()
    ;['ondrag','ondragstart','ondragend','ondragover','ondragenter','ondragleave','ondrop'].forEach(event =>
      this.imageDropArea.current[event] = e => e.preventDefault() && e.stopPropagation()
    )
    ;['dragover', 'dragenter'].forEach(event =>
      this.imageDropArea.current.addEventListener(event, () => this.imageDropArea.current.classList.add('green-border'))
    )
    ;['dragleave', 'dragend', 'drop'].forEach(event =>
      this.imageDropArea.current.addEventListener(event, () => this.imageDropArea.current.classList.remove('green-border'))
    )
    this.imageDropArea.current.addEventListener('click', () => this.addImages())
    this.imageDropArea.current.addEventListener('drop', e => this.dropImages(e))
  }

  addImages(){
    this.imagesInput.current.click()
  }

  dropImages(e){
    let files = e.dataTransfer.files
    if(files) this.activityImages.concat(files)
    console.log(files)
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
                  <Input size="medium" placeholder='Costo' type="number" />
                  <TextArea placeholder='Descripción' />
                  <Dropdown size="medium" placeholder='Categorías' search selection options={this.props.categories} />
                  <div style={{display: "flex"}}>
                    <DatePicker format="DD-MM-YYYY" locale={locale} placeholder="Fecha" style={{width: "calc(50% - 5px)", marginRight: "5px"}} size="default" />
                    <TimePicker placeholder="Hora" style={{width: "calc(50% - 5px)", marginLeft: "5px"}} use12Hours format="h:mm A" minuteStep={5} size="default" />
                  </div>
                  <div style={{display: "flex"}}>
                    <PhotoUpload innerRef={this.imageDropArea}>
                      <FaCloudUpload style={{width: "30px", height: "30px", color: "#b1b1b1"}}/>
                      <span style={{fontSize: "0.8em", color: "#b1b1b1", textAlign: "center"}}>Arrastra imagenes o haz click aquí</span>
                      <input ref={this.imagesInput} type="file" style={{display: "none"}} multiple/>
                    </PhotoUpload>
                    <PhotoList>
                      {
                        this.activityImages.map( el =>
                          <div>
                            
                          </div>
                        )
                      }
                    </PhotoList>
                  </div>
              </Col>
            </Row>
          </Form>
        </MainContainer>
        <Footer/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return ({
    categories: state.category.categories
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    addImage,
    fetchCategories
  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivityCrud)
)