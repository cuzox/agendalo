import React, { Component } from 'react'

import { Row, Col } from 'antd'
import { Form, Input, Checkbox, Button, TextArea, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { MainContainer } from '../../../components/global.styled'
import FaEdit from 'react-icons/lib/fa/edit'
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEye from 'react-icons/lib/fa/eye'
import { DatePicker, TimePicker, Modal } from 'antd'
import locale from 'antd/lib/date-picker/locale/es_ES'
import { PhotoUpload, PhotoList } from './styled-crud.styled'
import { withRouter } from 'react-router-dom'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'

const confirm = Modal.confirm;



class ActivityCrud extends Component{
  constructor(props){
    super(props)
    this.imagesInput = React.createRef()
    this.imageDropArea = React.createRef()
    this.state = { open: false, activityImages: [] }
  }

  componentDidMount(){
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
    this.imageDropArea.current.addEventListener('change', e => this.dropImages(e))
  }

  showDeleteConfirm(key) {
    let that = this;
    confirm({
      title: 'Borrar foto?',
      content: '',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        that.setState({
          activityImages: that.state.activityImages.filter(el => el.key !== key)
        })
      }
    });
  }

  handleOpenChange = (open) => this.setState({ open })

  handleClose = () => this.setState({ open: false })

  addImages(){
    this.imagesInput.current.click()
  }

  dropImages(e){
    let files = e.dataTransfer && e.dataTransfer.files || e.target.files
    if(files && files.length) {
      ;[].forEach.call(files, file =>{
        if ( /\.(jpe?g|png)$/i.test(file.name) ) {
          var reader = new FileReader();
    
          reader.onload = e =>{
            this.setState({
              activityImages: this.state.activityImages.concat([{
                key: this.state.activityImages.length,
                file: file,
                src: e.target.result
              }])
            })
          }
    
          reader.readAsDataURL(file);
        }
      })
    }
  }
  
  render(){
    return (
      <MainContainer>
        <Dimmer active={this.props.creatingActivity}>
          <Loader/>  
        </Dimmer>
        <Form>
          <Row type="flex" justify="center">
            <Col lg={7} md={10} sm={13} xs={18} style={{display: "flex", flexDirection: "column"}} className="col-space">
                <div className="center-text" style={{textAlign: "center"}}>
                  <FaEdit/>
                  <span> AGREGA TU ACTIVIDAD </span>
                </div>
                <Input name="name" size="medium" placeholder='Nombre' />
                <Input name="phone" size="medium" placeholder='Teléfono' />
                <Input name="address" size="medium" placeholder='Dirección' />
                <Input name="fee" size="medium" placeholder='Costo' type="number" />
                <TextArea name="description" placeholder='Descripción' />
                <Dropdown size="medium" placeholder='Categorías' search selection options={this.props.categories} />
                <div style={{display: "flex"}}>
                  <DatePicker format="DD-MM-YYYY" locale={locale} placeholder="Fecha" style={{width: "calc(50% - 5px)", marginRight: "5px"}} size="default" />
                  <TimePicker
                    size="default" 
                    minuteStep={5} 
                    use12Hours format="h:mm A" 
                    open={this.state.open}
                    onOpenChange={this.handleOpenChange}
                    addon={() => (
                      <Button size="small" type="primary" onClick={this.handleClose} content="Ok"/>
                    )}
                    placeholder="Hora" style={{width: "calc(50% - 5px)", marginLeft: "5px"}}
                  />
                </div>
                <div style={{display: "flex"}}>
                  <PhotoUpload innerRef={this.imageDropArea}>
                    <FaCloudUpload style={{width: "30px", height: "30px", color: "#b1b1b1"}}/>
                    <span style={{fontSize: "0.8em", color: "#b1b1b1", textAlign: "center"}}>Arrastra imagenes o haz click aquí</span>
                    <input ref={this.imagesInput} type="file" style={{display: "none"}} multiple/>
                  </PhotoUpload>
                  <PhotoList>
                    {
                      this.state.activityImages.map( (el, key) =>
                        <div>
                          <img src={ el.src }/>
                          <FaTrash onClick={()=>this.showDeleteConfirm(el.key)} className="trash"/>
                          {/* <FaEye className="eye"/> */}
                        </div>
                      )
                    }
                  </PhotoList>
                </div>
                <Button style={{color: "white"}} content="¡Crear!" className="our-green"/>
            </Col>
          </Row>
        </Form>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    categories: state.category.categories,
    creatingActivity: state.activity.creating,
    createdActivity: state.activity.createdActivity
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivityCrud)
)