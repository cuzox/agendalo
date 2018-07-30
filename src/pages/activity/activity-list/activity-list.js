import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import uuidv4 from 'uuid/v4'
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
      { key: 0, value: 0, text: "Esta semana"},
      { key: 1, value: 1, text: "Proxima semana"},
      { key: 2, value: 2, text: "Este mes"},
      { key: 3, value: 3, text: "Proximo mes"},
    ]

  }
  
  componentDidMount(){
    this.props.fetchActivities()
  }

  render(){
    let { visible, categories } = this.props
    categories = JSON.parse(JSON.stringify(categories))
    let allId = uuidv4()
    categories.unshift({ key: allId, value: allId, text: "Todas" })

    return(
      <MainContainer style={{justifyContent: "initial"}}>
        <Dimmer active={false}>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <StdFilter className="filter">
              <Input onInput={e => this.props.searchActivities(e.target.value)} size={"medium"} icon='search' placeholder='Buscar...'/>
              <Dropdown size={"medium"} value={allId} placeholder='Categoría...' selection options={categories || []} />
              <Dropdown size={"medium"} value={0} placeholder='Cuando...' selection options={this.times || []} />
            </StdFilter>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xxl={8} lg={10} md={12} sm={15} xs={20}>
            { visible.length ? (
                visible.map((activity, i) => 
                  <Link key={activity.id} to={{pathname: "/actividades/"+activity.id, state: {activity}}}>
                    <ActivityItem {...{activity}}/>
                    { (i+1)%3 == 0 && i!=0 && (
                      <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px"}}></div>
                    )}
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