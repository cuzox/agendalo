import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { StdCard } from './activity-item.styled'
import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { scheduleActivity, reset, removeScheduledActivity, removeActivity, fetchActivities } from '../../../_actions/activityActions'
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
      message: '¡Actividad quitada!',
    })
  }
  
  remove(id){
    this.props.removeActivity(id)
  }
  
  getButton(type){
    let { activity } = this.props

    switch(type){
      case 'edit':
        return (
          <Button basic className="action-button" onClick={e => this.edit(e)}>
            <Link to={{pathname: "/agregar/"+activity.id, state: {activity}}} >
              <div style={{color: "#469c56"}} className="action-icon">
                <Icon 
                  style={{margin: "0", width: "30px", fontSize: "25px"}} 
                  className="edit outline">
                </Icon>
              </div>
            </Link> 
          </Button>
        )
      case 'unschedule':
        return (
          <Button basic className="action-button" onClick={e => this.edit(e)}>
            <Popconfirm placement="top" title={"¿Quitar de tu agenda?"} 
              onConfirm={()=>this.unschedule()} okText="Si" cancelText="No">
              <div className="action-icon">
                  <Icon
                    style={{margin: "0", fontSize: "20px"}} 
                    className="calendar times outline">
                  </Icon>
              </div>
            </Popconfirm>
          </Button>
        )
      case 'remove':
        return (
          <Button basic className="action-button" onClick={e => this.edit(e)}>
            <Popconfirm placement="top" title={"¿Borrar actividad?"}
              onConfirm={()=>this.remove(activity.id)} okText="Si" cancelText="No">
              <div style={{color: "#f94141"}} className="action-icon">
                <Icon
                  style={{margin: "0", fontSize: "20px"}}
                  className="trash">
                </Icon>
              </div>
            </Popconfirm>
          </Button> 
        )
      default: /* schedule */
        return (
          <Button basic className="action-button" onClick={e => this.edit(e)}>
            <div style={{top: 0}} className="action-icon" onClick={()=>this.props.scheduleActivity(activity.id)}>
              <img 
                style={{height: "30px", width: "auto"}} 
                src="/assets/images/logo_sm_darkb.png"
              />
            </div>
          </Button> 
        )
    }
  }
  
  render(){
    let { activity, compact, margin, buttons = [] } = this.props
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
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <span style={{color: "black"}}>{moment(activity.fromDate).utcOffset('-0400').format('D [de] MMMM')}</span>
              <span style={{color: "black"}}>{moment(activity.fromDate).utcOffset('-0400').format('dddd[,] H:mm A')}</span>
              <span style={{color: "black"}}>{activity.category && "#" + activity.category.name}</span>
            </div>
            <div style={{display: "flex"}}>
              { buttons.length ? buttons.map(btn => this.getButton(btn)) : this.getButton() }
            </div>
          </div>
        </div>
      </StdCard>
    )
  }
}

const mapStateToProps = state => {
  return ({
    scheduleSucc: state.activity.scheduleSucc,
    scheduleFail: state.activity.scheduleFail,
    removing: state.activity.removing,
    removeSucc: state.activity.removeSucc
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    scheduleActivity, 
    reset, 
    removeScheduledActivity, 
    removeActivity,
    fetchActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityItem)