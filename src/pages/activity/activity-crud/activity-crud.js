import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'

import { Row, Col, notification } from 'antd'
import { Form, Input, Button, TextArea, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { MainContainer } from '../../../global.styled'
import FaEdit from 'react-icons/lib/fa/edit'
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEye from 'react-icons/lib/fa/eye'
import { DatePicker, TimePicker, Modal } from 'antd'
import { PhotoUpload, PhotoList } from './activity-crud.styled'
import { withRouter } from 'react-router-dom'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import { createActivity, reset, createNotLoggedIn } from '../../../_actions/activityActions'

import uuidv4 from 'uuid/v4'
import moment from 'moment'

const confirm = Modal.confirm;



class ActivityCrud extends Component{
  constructor(props){
    super(props)
    this.imagesInput = React.createRef()
    this.imageDropArea = React.createRef()
    this.dropdownValue = {}
    this.state = { open: false, activityImages: [], activity: {}}
  }

  componentDidMount(){
    this.form = ReactDOM.findDOMNode(this.refs.form)
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

    if(!this.props.loggedIn && this.props.loaded) {
      notification['warning']({
        message: '¡Primero debes iniciar sesión!',
      })
      this.props.createNotLoggedIn(true)
    }
  }

  componentDidUpdate(){
    if(this.props.createFailed){
      notification['error']({
        message: 'Error creando actividad',
        description: 'Trata mas tarde'
      })
      this.props.reset()
    }
    if(this.props.createSuccess){
      notification['success']({
        message: 'Actividad creada con exito'
      })
      this.props.reset()
    }
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
    let files = e.dataTransfer ? [...e.dataTransfer.files] : [...e.target.files]
    if(files && files.length) {
      Array.prototype.forEach.call(files, file =>{
        if ( /\.(jpe?g|png)$/i.test(file.name) ) {
          var reader = new FileReader();
          reader.onload = e =>{
            this.setState({
              activityImages: this.state.activityImages.concat([{
                key: uuidv4(),
                file: file,
                src: e.target.result
              }])
            })
          }
    
          reader.readAsDataURL(file);
        }
      })
    }
    e.target.value = ""
  }

  create(){
    let activity = { ...this.state.activity }
    ;[].forEach.call(this.form, el =>{
      if(el.name) activity[el.name] = el.value
    })
    this.setState({activity: activity})
    this.props.createActivity(this.props.accountId, activity, this.state.activityImages.map(img => img.file))
  }
  
  render(){
    return (
      <MainContainer>
        { !this.props.loggedIn && this.props.loaded && <Redirect push to="/login"/> }
        { this.props.createSuccess && <Redirect push to="/actividades"/> }
        <Dimmer active={this.props.creating}>
          <Loader> Creando actividad... </Loader>  
        </Dimmer>
        <Form ref="form">
          <Row type="flex" justify="center">
            <Col lg={7} md={10} sm={13} xs={18} style={{display: "flex", flexDirection: "column"}} className="col-space">
                <div className="center-text" style={{textAlign: "center"}}>
                  <FaEdit/>
                  <span> AGREGA TU ACTIVIDAD </span>
                </div>
                <Input name="name" size="medium" placeholder='Nombre*'/>
                <Input name="phone" size="medium" placeholder='Iglesia/Organizador*' />
                <Input name="address" size="medium" placeholder='Dirección*' />
                <div style={{display: "flex"}}>
                  <Input style={{width: "calc(50% - 5px)", marginRight: "5px"}} name="fee" size="medium" placeholder='Costo' type="number"/>
                  <Input style={{width: "calc(50% - 5px)", marginLeft: "5px"}} name="seating" size="medium" placeholder='Cupo' type="number"/>
                </div>
                <TextArea name="description" autoHeight placeholder='Descripción' />
                <Dropdown size="medium" placeholder='Categoría*' search selection options={this.props.categories} onChange={(e, d)=>this.setState({activity: Object.assign(this.state.activity, {categoryId: d.value})})} />
                <div style={{display: "flex"}}>
                  <DatePicker onChange={(e, d)=>this.setState({activity: {...this.state.activity, date: e.toDate()}})}  format="DD-MM-YYYY" placeholder="Fecha*" style={{width: "calc(50% - 5px)", marginRight: "5px"}} size="default" />
                  <TimePicker
                    size="default" 
                    minuteStep={5} 
                    use12Hours format="h:mm A"
                    defaultOpenValue={moment('12:00 AM', 'HH:mm A')}
                    open={this.state.open}
                    onOpenChange={this.handleOpenChange}
                    onChange={(e, d)=>this.setState({activity: {...this.state.activity, time: e.toDate()}})}
                    addon={() => (
                      <Button size="small" type="primary" onClick={this.handleClose} content="Ok"/>
                    )}
                    placeholder="Hora*" style={{width: "calc(50% - 5px)", marginLeft: "5px"}}
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
                        <div key={el.key}>
                          <img alt="" src={ el.src }/>
                          <FaTrash onClick={()=>this.showDeleteConfirm(el.key)} className="trash"/>
                          {/* <FaEye className="eye"/> */}
                        </div>
                      )
                    }
                  </PhotoList>
                </div>
                <Button onClick={()=>this.create()} style={{color: "white"}} content="¡Crear!" className="our-green"/>
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
    creating: state.activity.creating || state.activity.updating || state.activity.uploading,
    createSuccess: state.activity.createSuccess && state.activity.updateSuccess && state.activity.uploadSuccess,
    createFailed: state.activity.createFailed || state.activity.updateFailed || state.activity.uploadFailed,
    accountId: state.user.id,
    loggedIn: state.user.loggedIn,
    loaded: state.app.loaded
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    createActivity, reset, createNotLoggedIn
  }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivityCrud)
)