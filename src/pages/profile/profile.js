import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { MainContainer} from '../../global.styled'
import { fetchMyActivities } from '../../_actions/activityActions'
import ActivityItem from '../../components/activity/activity-item/activity-item'
import { StdActivityList } from './profile.styled'

import { Row, Col } from 'antd'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetched: false
    }
  }

  componentDidUpdate(){
    if(this.props.loaded && !this.state.fetched ){
      this.setState({fetched: true})
      this.props.fetchMyActivities()
    }
  }

  render(){
    return(
      <MainContainer style={{alignItems: "center", justifyContent: "initial"}}>
        <img style={{ height: "100px", width: "100px" }}src="/assets/images/user.png"/>
        <span>{this.props.userName}</span>
        <Row type="flex" justify="center">
          <Col xl={18} lg={20} md={20} sm={18} xs={22}>
            <h2><b>MIS PUBLICADAS</b></h2>
            <StdActivityList >
            { this.props.myActivities.map(act =>(
                <ActivityItem compact key={act.id} activity={act}/>
              ))
            }
            </StdActivityList>
            <h2 style={{marginTop: "20px"}}><b>MIS AGENDADAS</b></h2>
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