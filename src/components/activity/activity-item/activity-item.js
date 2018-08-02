import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { StdCard } from './activity-item.styled'
import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { scheduleActivity, reset, removeScheduledActivity } from '../../../_actions/activityActions'

import {  Popconfirm, notification } from 'antd'


class ActivityItem extends Component{
  componentDidUpdate(){
    if(this.props.scheduleSucc){
      notification['success']({
        message: '¡Actividad agendada!',
      })
      this.props.reset()
    }
    if(this.props.scheduleFail){
      notification['error']({
        message: 'Error de registro',
        description: 'Trata mas tarde'
      })
      this.props.reset()
    }
  }

  edit(e){
    e.stopPropagation()
    e.preventDefault()
  }

  unschedule(){
    this.props.removeScheduledActivity(this.props.activity.id)
    notification['success']({
      message: '¡Actividad borrada!',
    })
  }
  
  getButton(){
    let { activity, edit, unschedule } = this.props
    let type =  (edit && "edit") || (unschedule && "unschedule") || ""

    switch(type){
      case 'edit':
        return (
          <Link to={{pathname: "/agregar/"+activity.id, state: {activity}}} >
            <Icon 
              style={{margin: "0", width: "30px", fontSize: "25px"}} 
              className="edit outline">
            </Icon>
          </Link>
        )
      case 'unschedule':
        return (
          <Popconfirm placement="top" title={"¿Quitar de tu agenda?"} 
            onConfirm={()=>this.unschedule()} okText="Si" cancelText="No">
            <Icon 
              style={{margin: "0", width: "30px", fontSize: "25px"}} 
              className="calendar times outline">
            </Icon>
          </Popconfirm>
        )
      default: /* schedule */
        return (
          <img onClick={()=>this.props.scheduleActivity(activity.id)}
            style={{height: "30px", width: "auto"}} 
            src="/assets/images/logo_sm_darkb.png"
          />
        )
    }
  }
  
  render(){
    let { activity, compact, margin } = this.props
    return (
      <StdCard className={compact ? "compact":"" + margin ? " margin":""}>
        { this.props.scheduleSucc && <Redirect push to="/perfil"/> }
        <img alt="" src={activity.photos.length ? activity.photos[0] : '/assets/images/placeholder.jpg'}/>
        <div className="card-content">
          <h3 className="title">
            {activity.name}
          </h3>
          <h4 className="body">
            {activity.description}
          </h4>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <span style={{color: "black"}}>{moment(activity.date[0]).format('dddd M, H:mm A')}</span>
              <span style={{color: "black"}}>{activity.category && "#" + activity.category.name}</span>
            </div>
            <Button basic style={{ padding: "5px 10px" }} onClick={e => this.edit(e)}>
              { this.getButton() }
            </Button>
          </div>
        </div>
      </StdCard>
    )
  }
}

const mapStateToProps = state => {
  return ({
    scheduleSucc: state.activity.scheduleSucc,
    scheduleFail: state.activity.scheduleFail
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    scheduleActivity, reset, removeScheduledActivity
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityItem)