import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { MainContainer} from '../../global.styled'
import { fetchMyActivities, fetchScheduledActivities } from '../../_actions/activityActions'
import ActivityList from '../activity/activity-list/activity-list'

import { Row, Col } from 'antd'
import uuid from 'uuid/v4'

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
      { menuItem: 'Mis Agendadas', render: () => 
        <Tab.Pane attached={false}>
          { this.props.scheduled.length ? (
              <ActivityList key={uuid()} nocls panel compact buttons={["unschedule"]} list={ this.props.scheduled }/>
            ) : (
              <b>No has publicado actividades</b>
            )
          }
        </Tab.Pane> 
      },
      { menuItem: 'Mis Publicadas', render: () => 
        <Tab.Pane attached={false}>
          { this.props.myActivities.length ? (
                <ActivityList key={uuid()} nocls panel compact buttons={["edit", "remove"]} list={ this.props.myActivities }/>
            ) : (
              <b>No has agendado actividades</b>
            )
          }
        </Tab.Pane> 
      }
    ]
    return(
      <MainContainer className="pad">
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
          <Col xxl={16} xl={18} lg={20} md={20} sm={22} xs={22}>
            <Tab menu={{ pointing: true }} {...{ panes}} />
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