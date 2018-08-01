import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { MainContainer} from '../../global.styled'
import { fetchMyActivities } from '../../_actions/activityActions'
import ActivityItem from '../../components/activity/activity-item/activity-item'
import { StdActivityList } from './profile.styled'

import { Row, Col } from 'antd'


import { Tab } from 'semantic-ui-react'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

    componentDidMount(){
      this.props.fetchMyActivities()
  }

  render(){
    let panes = [
      { menuItem: 'MIS AGENDADAS', render: () => 
        <Tab.Pane attached={false}>
          <StdActivityList >
            No has agendado actividades
          </StdActivityList>
        </Tab.Pane> 
      },
      { menuItem: 'MIS PUBLICADAS', render: () => 
        <Tab.Pane attached={false}>
          <StdActivityList >
          { this.props.myActivities.map(act =>(
              <ActivityItem compact profile key={act.id} activity={act}/>
            ))
          }
          </StdActivityList>
        </Tab.Pane> 
      }
    ]
    return(
      <MainContainer>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e7e7e7", padding: "20px", marginBottom: "20px"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{ height: "100px", width: "100px" }}src="/assets/images/user.png"/>
            <span><b>{this.props.userName}</b></span>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "20px"}}>
            <span style={{fontSize: "16px", padding: "8px"}} >
              <b>Agendadas: {0}</b>
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
    myActivities: state.activity.myActivities
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchMyActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)