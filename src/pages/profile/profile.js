import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { MainContainer} from '../../global.styled'
import { fetchMyActivities, fetchScheduledActivities } from '../../_actions/activityActions'
import ActivityItem from '../../components/activity/activity-item/activity-item'
import ActivityList from '../activity/activity-list/activity-list'
import { StdActivityList } from './profile.styled'

import { Row, Col } from 'antd'


import { Dimmer, Loader, Tab } from 'semantic-ui-react'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.fetchMyActivities()
    this.props.fetchScheduledActivities()
  }

  render(){
    let panes = [
      { menuItem: 'MIS AGENDADAS', render: () => 
        <Tab.Pane attached={false}>
          <StdActivityList >
            { this.props.scheduled.length ? (
                this.props.scheduled.map(act =>(
                  <ActivityItem compact unschedule key={act.id} activity={act}/>
                ))
              ) : (
                <b>No has publicado actividades</b>
              )
            }
          </StdActivityList>
        </Tab.Pane> 
      },
      { menuItem: 'MIS PUBLICADAS', render: () => 
        <Tab.Pane attached={false}>
          <StdActivityList >
          { this.props.myActivities.length ? (
              this.props.myActivities.map(act =>(
                <ActivityItem compact edit key={act.id} activity={act}/>
              ))
            ) : (
              <b>No has agendado actividades</b>
            )
          }
          </StdActivityList>
        </Tab.Pane> 
      }
    ]
    return(
      <MainContainer>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", marginBottom: "20px"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{ height: "100px", width: "100px" }}src="/assets/images/user.png"/>
            <span><b>{this.props.userName}</b></span>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "20px"}}>
            <span style={{fontSize: "16px", padding: "8px"}} >
              <b>Agendadas: {this.props.scheduled.length}</b>
            </span>
            <span style={{fontSize: "16px", padding: "8px"}}>
              <b>Publicadas: {this.props.myActivities.length}</b>
            </span>
          </div>
        </div>
        <Row type="flex" justify="center">
          <Col xxl={16} xl={18} lg={20} md={20} sm={18} xs={22}>
            <Tab menu={{ secondary: true, pointing: true }} {...{ panes}} />
          </Col>
        </Row>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    userName: `${state.user.firstName} ${state.user.lastName}`,
    loaded: state.app.loaded,
    myActivities: state.activity.myActivities,
    scheduled: state.activity.scheduledActivities,
    fetching: state.activity.fetching
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchMyActivities, fetchScheduledActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)