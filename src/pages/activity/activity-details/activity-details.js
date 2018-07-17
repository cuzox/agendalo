import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../../global.styled'

import { fetchActivity, fetchActivitySucc } from '../../../_actions/activityActions'

import { Dimmer, Loader, Input, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'antd';

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    let { state } = this.props.location
    if( state ) this.props.fetchActivitySucc(state.activity)
    else this.props.fetchActivity(this.props.match.params.id)
  }

  render(){
    let { activity } = this.props
    return(
      <MainContainer>
        <h3 className="title">
          {activity.name}
        </h3>
        <h4 className="body">
          {activity.description}
        </h4>
        <img alt="" src={activity && activity.photos.length ? activity.photos[0] : '/assets/images/placeholder.jpg'}/>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    activity: state.activity.activity
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivity, fetchActivitySucc
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)