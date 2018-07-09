import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../../global.styled'

import { fetchActivities } from '../../../_actions/activityActions'
import ActivityItem from '../../../components/activity/activity-item/activity-item'

import { Dimmer, Loader } from 'semantic-ui-react'
import { Row, Col } from 'antd';

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.fetchActivities({order: "created desc"})
  }

  render(){
    return(
      <MainContainer style={{alignItems: "center", justifyContent: "initial"}}>
        <React.Fragment>
          <Dimmer active={false}>
            <Loader />  
          </Dimmer>
          <Row type="flex" justify="center">
            <Col sm={10} xs={15}>
              { this.props.activities.map(activity => <ActivityItem key={activity.id} {...{activity}}/>)}
            </Col>
          </Row>
        </React.Fragment>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    activities: state.activity.activities
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)