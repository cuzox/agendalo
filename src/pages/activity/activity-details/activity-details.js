import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { StdMain as MainContainer, StdActivityList } from './activity-details.styled'
import { fetchActivity, fetchActivitySucc, fetchActivities } from '../../../_actions/activityActions'

import { Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import { Row, Col } from 'antd';

import ActivityItem from '../../../components/activity/activity-item/activity-item'

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    window.scroll({
      top: 0, 
      left: 0
    });
    let { state } = this.props.location
    if( state && state.activity ) this.props.fetchActivitySucc(state.activity)
    else this.props.fetchActivity(this.props.match.params.id)
    if(!this.props.actitivies) this.props.fetchActivities()
  }


  agendalo(e){
    e.stopPropagation()
    e.preventDefault()
  }

  render(){
    let { activity } = this.props
    return activity && (
      <MainContainer>
        <Row type="flex" justify="center">
          <Col className="column" xl={12} lg={16} md={18} sm={20} xs={22}> 
            <img alt="" src={activity && activity.photos.length ? activity.photos[0] : '/assets/images/placeholder.jpg'}/>
            <div className="body">
              <div>
                <h3 className="body-title">
                  { activity.name } 
                  {activity.category && activity.category.name ? 
                    <span style={{color: "gray", fontSize: "0.7em"}}>&nbsp; | &nbsp;&nbsp;&nbsp;{activity.category.name}</span> : null
                  }
                </h3>
                <h4 className="body-text">
                  <Icon className="home"></Icon>
                  { activity.organizer }
                </h4>
                <h4 className="body-text">
                  <Icon className="map marker alternate"></Icon>
                  { activity.address }
                </h4>
                <h4 className="body-text">
                  <Icon className="dollar"></Icon>
                  {!!activity.fee ? activity.fee : "Gratis"}
                </h4>
                { activity.seating ? (
                    <h4 className="body-text">
                      <Icon className="users"></Icon>
                      { activity.seating }
                    </h4>
                  ) : null
                }
                { activity.description ? (
                    <h4 className="body-text">
                      <Icon className="info circle"></Icon>
                      {activity.description}
                    </h4>
                  ) : null
                }
              </div>
              <Button basic style={{ padding: "5px 10px" }} onClick={e => this.agendalo(e)}>
                <img style={{height: "30px", width: "auto", margin: "0 auto"}} src="/assets/images/logo_sm_darkb.png" />
              </Button>
            </div>
          </Col>
        </Row>
        <h2 style={{marginTop: "50px", paddingLeft: "10px"}}>Más Actividades</h2>
        <StdActivityList>
          { this.props.activities.map(act =>(
              <ActivityItem compact profile key={act.id} activity={act}/>
            ))
          }
        </StdActivityList>
      </MainContainer>
    ) || null
  }
}

const mapStateToProps = state => {
  return ({
    activity: state.activity.activity,
    activities: state.activity.activities
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivity, fetchActivitySucc, fetchActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)