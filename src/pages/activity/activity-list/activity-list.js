import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { Link } from 'react-router-dom'

import { MainContainer} from '../../../global.styled'

import { fetchActivities, filterActivities } from '../../../_actions/activityActions'
import ActivityItem from '../../../components/activity/activity-item/activity-item'

import { Dimmer, Loader, Input, Dropdown, Pagination } from 'semantic-ui-react'
import { Row, Col } from 'antd';
import { StdFilter } from './activity-list.styled'

class ActivityList extends Component {
  dates = [
    { key: 1, value: 1, text: "Esta semana"},
    { key: 2, value: 2, text: "Este mes"},
    { key: 3, value: 3, text: "Proximo mes"}
  ]
  updatedCategories = false
  state = {
    categoryId: 0,
    date: 1,
    categories: []
  }
  
  componentDidMount(){
    this.props.fetchActivities()
  }

  handleChange(name, value){
    let build = { [name]: value }
    this.setState(build)
    this.props.filterActivities(build)
  }

  componentDidUpdate(){
    if(this.props.categories.length && !this.updatedCategories){
      this.updatedCategories = true;
      this.setState({ 
        categories: [
          { key: 0, value: 0, text: "Todas" },
          ...this.props.categories
        ] 
      })
    }
  }

  render(){
    let { visible } = this.props
    let { categoryId, date, categories } = this.state

    return(
      <MainContainer className="more-space" style={{justifyContent: "initial"}}>
        <Dimmer active={false}>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col xl={12} lg={16} md={18} sm={20} xs={22}>
            <StdFilter className="filter">
              <Input onInput={e => this.props.filterActivities({ name: e.target.value })} size={"medium"} icon='search' placeholder='Buscar...'/>
              <Dropdown size={"medium"}
                onChange={(e, d)=> this.handleChange('categoryId', d.value) } 
                value={categoryId} placeholder='Categoría...' 
                selection options={categories || []} 
              />
              <Dropdown size={"medium"} 
                onChange={(e, d)=> this.handleChange('date', d.value) }
                value={date} placeholder='Cuando...' 
                selection options={this.dates || []} 
              />
            </StdFilter>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          { [0,1].map(n =>
            <Col xxl={6} lg={8} md={11} sm={20} xs={20} key={n}>
              { visible.length ? (
                  visible.map((activity, i) => ((i+n) % 2 == 0) && 
                    <Link key={activity.id} to={{pathname: "/actividades/"+activity.id, state: {activity}}}>
                      <ActivityItem {...{activity}} margin/>
                      {/* { (i+1)%3 == 0 && i!=0 && (
                        <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px"}}></div>
                      )} */}
                    </Link>
                  )
                ) : (
                  (n == 0) && 
                    <div style={{textAlign: "center", marginTop: "20px"}} >
                      No hay actividades para mostrar
                    </div>
                )
              }
            </Col>
          )}
        </Row>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Pagination defaultActivePage={5} totalPages={10}/>
        </div>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    activities: state.activity.activities,
    visible: state.activity.visible,
    categories: state.category.categories,
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivities,
    filterActivities
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)