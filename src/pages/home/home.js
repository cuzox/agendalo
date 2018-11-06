import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

/** UI */
import { MainContainer } from '../../global.styled'
import { Row, Col } from 'antd'
import { Carousel } from 'element-react'
import { Link } from 'react-router-dom'

import debounce from 'lodash/debounce'
import Media from "react-media";

import HttpClient from '../../_helper/http-client';

import { fetchActivities } from '../../_actions/activityActions'
import { StdActivityList } from '../activity/activity-details/activity-details.styled'
import ActivityItem from '../../components/activity/activity-item/activity-item'

import Header from './header'
import Newsletter from './newsletter'
import MonthFilter from './month-filter'

class Home extends Component{
  state = {
    carousel_height: '400px',
    homeAds: {
      advertisements: []
    },
    runOnce: false,
  }

  debounceResize = debounce(this.getCarouselHeight.bind(this), 300)

  getCarouselHeight(){
    setTimeout(()=>{
      let img = document.querySelectorAll('.carousel_image')
      this.setState({ 
        carousel_height: Math.max(...Array.from(img).map( i => i.clientHeight)) + 'px'
      })
    })
  }

  componentWillMount(){
    if(!this.props.actitivies) this.props.fetchActivities()
    HttpClient.get('adScreens', {include: 'advertisements', where: {name: 'Home'}})
    .then(r => r.data)
    .then(adScreens =>{
      this.setState({ homeAds: adScreens[0] })
    })
    window.addEventListener('resize', this.debounceResize)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.debounceResize)
  }

  render(){
    let { carousel_height, homeAds } = this.state
    return (
      <MainContainer className={"no-trans"} style={{paddingTop: "0px" }}>
        <Header loggedIn={this.props.loggedIn}/>
        <Row type="flex" justify="center">
          <Col xxl={6} xl={8} lg={10} md={12} sm={18} xs={20}>
            <MonthFilter/>
          </Col>
        </Row>
        { homeAds.advertisements.length &&
          <Row type="flex" justify="center">
            <Col id="carousel-col" xxl={18} xl={18} lg={18} md={18} sm={20} xs={22} 
              style={{overflow: "hidden", margin: "25px 0"}}>
              <Media query={{ maxWidth: 900 }}>
                {matches => (
                  <Carousel interval="4000" arrow="always" type={matches ? undefined :"card"} height={carousel_height}>
                    { homeAds.advertisements.map((ad, i) => 
                        <Carousel.Item key={i}>
                          <img className="carousel_image"
                            src={ad.image}
                            width="100%"
                            style={{objectFit: "cover"}}
                            onLoad={()=>this.getCarouselHeight()}
                          />
                        </Carousel.Item>
                      )
                    }
                  </Carousel>
                )}
              </Media>
            </Col>
          </Row>
        }
        <Row type="flex" justify="center">
          <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22} style={{marginBottom: "25px"}}>
            <a href="mailto:info@agendalo.com">
              <img 
                width="100%" 
                src="https://www.dropbox.com/s/n0i39uuagpspcra/90599174-8d91-43ea-b932-f32864603130.jpeg?raw=1"
                // onClick={e => {e.preventDefault(); window.open(promotion, '_blank')}}
              />
            </a>
            {/* <div style={{backgroundColor: "black", borderRadius: "8px", height: "150px"}}></div> */}
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{marginBottom: '25px'}}>
          <Col xxl={18} xl={18} lg={18} md={18} sm={20} xs={22}>
            <StdActivityList>
              { this.props.activities.map(act =>(
                <Link key={act.id} to={{pathname: "/actividades/"+act.id, state: {act}}}>
                  <ActivityItem compact activity={act}/>
                </Link>
                ))
              }
            </StdActivityList>
          </Col>
        </Row>
        { !this.props.loggedIn &&
          <Row  type="flex" justify="center">
            <Col xxl={10} xl={12} lg={14} md={18} sm={20} xs={22}>
              <Newsletter/>
            </Col>
          </Row>
        }
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return ({
    loggedIn: state.user.loggedIn,
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
)(Home)