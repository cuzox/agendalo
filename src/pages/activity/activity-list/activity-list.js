import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { Link } from 'react-router-dom'

import { MainContainer} from '../../../global.styled'

import { fetchActivities, searchActivities } from '../../../_actions/activityActions'
import ActivityItem from '../../../components/activity/activity-item/activity-item'

import { Dimmer, Loader, Input, Dropdown } from 'semantic-ui-react'
import { Row, Col } from 'antd';

import { StdFilter } from './activity-list.styled'

class ActivityList extends Component {
  constructor(props) {
    super(props)
    this.times = [
      { key: 1, value: 1, text: "Esta semana"},
      { key: 2, value: 2, text: "Proxima semana"},
      { key: 3, value: 3, text: "Este mes"},
      { key: 4, value: 4, text: "Proximo mes"},
    ]
  }

  componentDidMount(){
    this.props.fetchActivities({order: "created desc"})
  }

  render(){
    let { visible } = this.props
    return(
      <MainContainer style={{justifyContent: "initial"}}>
        <Dimmer active={false}>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <StdFilter className="filter">
              <Input onInput={e => this.props.searchActivities(e.target.value)} size='large' icon='search' placeholder='Buscar...'/>
              <Dropdown size='large' value={0} placeholder='Categoría...' selection options={this.props.categories || []} />
              <Dropdown size='large' value={1} placeholder='Cuando...' selection options={this.times || []} />
            </StdFilter>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col lg={10} md={12} sm={15} xs={17}>
            { visible.length ? (
                visible.map(activity => 
                  <Link key={activity.id} style={{textDecoration: "none"}} to={"/actividades/"+activity.id}>
                    <ActivityItem {...{activity}}/>
                  </Link>
                )
              ) : (
                <div style={{textAlign: "center", marginTop: "20px"}} >
                  No hay actividades para mostrar
                </div>
              )
            }
          </Col>
        </Row>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    activities: state.activity.activities,
    visible: state.activity.visible,
    categories: state.category.categories,
    search: state.activity.search
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivities,
    searchActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)