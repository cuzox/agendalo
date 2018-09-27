import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import { Link } from 'react-router-dom'

import { MainContainer} from '../../../global.styled'

import { fetchActivities, filterActivities, fetchActivitiesSucc } from '../../../_actions/activityActions'
import ActivityItem from '../../../components/activity/activity-item/activity-item'

import { Dimmer, Loader, Input, Dropdown, Pagination, Label } from 'semantic-ui-react'
import { Row, Col } from 'antd';
import { StdFilter } from './activity-list.styled'

import query from 'query-string'
import store from '../../../store'

class ActivityList extends Component {
  dates = [
    { key: 1, value: 'todas', text: "Todas las fechas"},
    { key: 2, value: 'semana', text: "Esta semana"},
    { key: 3, value: 'mes', text: "Este mes"},
    { key: 4, value: 'proximo', text: "Proximo mes"}
  ]
  updatedCategories = false
  state = {
    categoryId: 0,
    fromDate: 'todas',
    categories: [],
    activePage: 1,
    name: ''
  }
  
  componentDidMount(){
    const { list } = this.props
    if(list) this.props.fetchActivitiesSucc(list)
    else this.props.fetchActivities()

    this.componentDidUpdate()

    if(this.props.location && this.props.location.search){
      const unsub = store.subscribe(() => {
        let { visible } = store.getState().activity
        if(visible.length){
          unsub()
          const { search, date } = query.parse(this.props.location.search)
          if(search) this.handleChange('name', search )
          if(date) this.handleChange('fromDate', date )
        }
      })
    }
  }

  handleChange(name, value){
    let build = { [name]: value }
    this.setState(build)
    this.props.filterActivities({filter: build, list: this.props.list})
  }

  

  componentDidUpdate(){    
    if(this.props.categories.length && !this.updatedCategories){
      this.updatedCategories = true;
      this.setState({ 
        categories: [
          { key: 0, value: 0, text: "Todas las categorías" },
          ...this.props.categories
        ] 
      })
    }
  }

  render(){
    const { visible, panel, compact, buttons, nocls } = this.props
    const { categoryId, fromDate, categories, activePage, name } = this.state
    const cols = {xl: 12, lg: 12, md: 24, sm: 24, xs: 24}
    const compactCols = { xxl: 8, xl: 8, lg: 12, md: 11, sm: 11, xs: 20 }
    const cls = compact ? compactCols : cols
    const mainCls =  nocls ? {} : {
      xl: {span: 16, offset: 4}, 
      lg: {span: 18, offset: 3}, 
      md: {span: 18, offset: 3}, 
      sm: {span: 22, offset: 1}, 
      xs: {span: 20, offset: 2}
    }
    const ipp = 6


    return(
      <MainContainer className={panel ? "standalone" : "more-space" }>
        <Dimmer active={false}>
          <Loader />  
        </Dimmer>
        <Row type="flex" justify="center">
          <Col xl={12} lg={18} md={18} sm={20} xs={22}>
            <StdFilter className="filter">
              <Input onInput={e => this.handleChange('name', e.target.value )} 
                size={"medium"} icon='search' placeholder='Buscar...'
                value={name}
              />
              <div style={{display: "flex", flexDirection: "column"}}>
                <Dropdown size={"medium"}
                  onChange={(e, d)=> this.handleChange('categoryId', d.value) }
                  value={categoryId} placeholder='Categoría...' 
                  selection options={categories || []}
                />
              </div>
              <div style={{display: "flex", flexDirection: "column"}}>
                <Dropdown size={"medium"}
                  onChange={(e, d)=> this.handleChange('fromDate', d.value) }
                  value={fromDate} placeholder='Cuando...'
                  selection options={this.dates || []}
                />
              </div>
            </StdFilter>
          </Col>
        </Row>
        <Row type="flex" justify="flex-start" style={{minHeight: "590px"}}>
          <Col {...mainCls} >
            <Row type="flex" justify="flex-start" gutter={15}>
              { visible.length ? (
                  visible.slice(
                    ((activePage-1)*ipp), ((activePage-1)*ipp) + ipp
                  ).map((activity, i) =>  
                    <Col key={activity.id} {...cls}>
                      <Link to={{pathname: "/actividades/"+activity.id, state: {activity}}}>
                        <ActivityItem {...{activity, compact, buttons}} remove={panel} margin/>
                        {/* { (i+1)%3 == 0 && i!=0 && (
                          <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px"}}></div>
                        )} */}
                      </Link>
                    </Col>
                  )
                ) : (
                  <div style={{textAlign: "center", marginTop: "20px"}} >
                    No hay actividades para mostrar
                  </div>
                )
              }
            </Row>
          </Col>
        </Row>
        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
          <Pagination {...{activePage}} 
            totalPages={Math.ceil(visible.length/ipp)} 
            boundaryRange={0} ellipsisItem={null}
            onPageChange={(e, { activePage }) => this.setState({ activePage })}
          />
        </div>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    visible: state.activity.visible,
    categories: state.category.categories,
  })
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchActivities,
    filterActivities,
    fetchActivitiesSucc
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList)