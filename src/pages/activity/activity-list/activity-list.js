import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { MainContainer} from '../../../global.styled'

import { fetchActivities } from '../../../_actions/activityActions'
import ActivityItem from '../../../components/activity/activity-item/activity-item'

import { Dimmer, Loader, Input, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'antd';

import { StdFilter } from './activity-list.styled'

class ActivityList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.fetchActivities({order: "created desc"})
    this.times = [
      { key: 1, value: 1, text: "Esta semana"},
      { key: 2, value: 2, text: "Proxima semana"},
      { key: 3, value: 3, text: "Este mes"},
      { key: 4, value: 4, text: "Proximo mes"},
    ]
  }

  render(){
    return(
      <MainContainer>
        <Dimmer active={false}>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <StdFilter className="filter">
              <Input size='large' icon='search' placeholder='Buscar...'/>
              <Dropdown size='large' value={0} placeholder='Categoría...' selection options={this.props.categories} />
              <Dropdown size='large' value={1} placeholder='Cuando...' selection options={this.times} />
            </StdFilter>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col lg={10} md={12} sm={15} xs={17}>
            { this.props.activities.map(activity => <ActivityItem key={activity.id} {...{activity}}/>)}
          </Col>
        </Row>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    activities: state.activity.activities,
    categories: state.category.categories
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